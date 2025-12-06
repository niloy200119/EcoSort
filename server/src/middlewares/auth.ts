import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import User, { IUser, UserRole } from "../models/User";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";

export interface AuthRequest extends Request {
  user?: IUser;
}

interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

export const authenticate = asyncHandler(
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access token is required");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, config.jwt.accessSecret) as JwtPayload;

      const user = await User.findById(decoded.id).select(
        "-password -refreshToken",
      );

      if (!user) {
        throw new ApiError(401, "User not found or token invalid");
      }

      req.user = user;
      next();
    } catch (error: any) {
      if (error.name === "JsonWebTokenError") {
        throw new ApiError(401, "Invalid token");
      }
      if (error.name === "TokenExpiredError") {
        throw new ApiError(401, "Token expired");
      }
      throw error;
    }
  },
);

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        "You do not have permission to perform this action",
      );
    }

    next();
  };
};
