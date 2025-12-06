import { Request, Response } from "express";
import authService from "../services/authService";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/auth";

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const { user, tokens } = await authService.register(name, email, password);

    return ApiResponse.created(res, "User registered successfully", {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { user, tokens } = await authService.login(email, password);

    return ApiResponse.ok(res, "Login successful", {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  });

  logout = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!._id.toString();

    await authService.logout(userId);

    return ApiResponse.ok(res, "Logout successful");
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    const tokens = await authService.refreshAccessToken(refreshToken);

    return ApiResponse.ok(res, "Token refreshed successfully", {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  });

  getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
    return ApiResponse.ok(res, "Profile retrieved successfully", {
      user: req.user,
    });
  });
}

export default new AuthController();
