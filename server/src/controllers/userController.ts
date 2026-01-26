import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import User from "../models/User";
import WasteItem from "../models/WasteItem";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";

class UserController {
  getDashboardStats = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!._id;

    const user = await User.findById(userId);
    
    const totalScans = await WasteItem.countDocuments({ createdBy: userId });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const scansThisMonth = await WasteItem.countDocuments({
      createdBy: userId,
      createdAt: { $gte: startOfMonth },
    });

    const recentScans = await WasteItem.find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const currentPoints = user?.points || 0;
    const level = Math.floor(currentPoints / 1000) + 1;
    const nextLevelPoints = level * 1000;

    return ApiResponse.ok(res, "Dashboard stats retrieved successfully", {
      stats: {
        totalPoints: currentPoints,
        totalScans,
        scansThisMonth,
        recyclingRate: 84,
        level,
        nextLevelPoints,
      },
      recentScans: recentScans.map(item => ({
        id: item._id,
        item: item.name,
        method: item.properDisposalMethod,
        points: 10,
        date: item.createdAt,
        category: item.category
      })),
      user: {
        name: user?.name,
        email: user?.email,
        role: user?.role
      }
    });
  });

  getWasteItems = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const items = await WasteItem.find().sort({ name: 1 });

    const formattedItems = items.map(item => ({
        id: item._id,
        name: item.name,
        category: item.category,
        disposal: item.properDisposalMethod,
        instructions: item.description,
        canRecycle: item.isRecyclable,
    }));

    return ApiResponse.ok(res, "Waste items retrieved", { items: formattedItems });
  });
}

export default new UserController();
