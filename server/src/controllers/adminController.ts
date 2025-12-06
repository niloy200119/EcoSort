import { Response } from "express";
import User from "../models/User";
import WasteItem from "../models/WasteItem";
import RecyclingLocation from "../models/RecyclingLocation";
import Reminder from "../models/Reminder";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/auth";
import pointsService from "../services/pointsService";

class AdminController {
  getDashboardStats = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const [
      totalUsers,
      totalWasteItems,
      totalLocations,
      totalReminders,
      recyclableItems,
      nonRecyclableItems,
    ] = await Promise.all([
      User.countDocuments(),
      WasteItem.countDocuments(),
      RecyclingLocation.countDocuments(),
      Reminder.countDocuments(),
      WasteItem.countDocuments({ isRecyclable: true }),
      WasteItem.countDocuments({ isRecyclable: false }),
    ]);

    const stats = {
      users: {
        total: totalUsers,
      },
      wasteItems: {
        total: totalWasteItems,
        recyclable: recyclableItems,
        nonRecyclable: nonRecyclableItems,
      },
      locations: {
        total: totalLocations,
      },
      reminders: {
        total: totalReminders,
      },
    };

    return ApiResponse.ok(res, "Dashboard stats retrieved successfully", {
      stats,
    });
  });

  getTopUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;

    const topUsers = await pointsService.getTopUsers(limit);

    return ApiResponse.ok(res, "Top users retrieved successfully", {
      users: topUsers,
    });
  });

  getAllUsers = asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find()
      .select("-password -refreshToken")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return ApiResponse.ok(
      res,
      "Users retrieved successfully",
      { users },
      {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    );
  });

  deleteUser = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (id === req.user!._id.toString()) {
      return ApiResponse.badRequest(res, "Cannot delete your own account");
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return ApiResponse.notFound(res, "User not found");
    }

    await Reminder.deleteMany({ userId: id });

    return ApiResponse.ok(res, "User deleted successfully");
  });
}

export default new AdminController();
