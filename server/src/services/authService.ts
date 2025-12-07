import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/env";
import User, { IUser, UserRole } from "../models/User";
import ApiError from "../utils/ApiError";

interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn,
    } as SignOptions);
  }

  generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    } as SignOptions);
  }

  generateTokens(user: IUser): AuthTokens {
    const payload: TokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  async register(
    name: string,
    email: string,
    password: string,
    nid: string,
    location: string,
    role: UserRole = UserRole.CITIZEN,
    organization?: string,
    designation?: string,
  ): Promise<{ user: IUser; tokens: AuthTokens }> {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(409, "Email already registered");
    }

    const existingNid = await User.findOne({ nid });
    
    if (existingNid) {
        throw new ApiError(409, "NID already registered");
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      nid,
      location,
      organization,
      designation,
    });

    const tokens = this.generateTokens(user);

    await User.findByIdAndUpdate(user._id, {
      refreshToken: tokens.refreshToken,
    });

    return { user, tokens };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ user: IUser; tokens: AuthTokens }> {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const tokens = this.generateTokens(user);

    await User.findByIdAndUpdate(user._id, {
      refreshToken: tokens.refreshToken,
    });

    user.password = undefined as any;

    return { user, tokens };
  }

  async logout(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        config.jwt.refreshSecret,
      ) as TokenPayload;

      const user = await User.findById(decoded.id).select("+refreshToken");

      if (!user || user.refreshToken !== refreshToken) {
        throw new ApiError(401, "Invalid refresh token");
      }

      const tokens = this.generateTokens(user);

      await User.findByIdAndUpdate(user._id, {
        refreshToken: tokens.refreshToken,
      });

      return tokens;
    } catch (error: any) {
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError"
      ) {
        throw new ApiError(401, "Invalid or expired refresh token");
      }
      throw error;
    }
  }
}

export default new AuthService();
