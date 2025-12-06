import { Request, Response } from "express";
import WasteItem from "../models/WasteItem";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/auth";
import pointsService, { PointsAction } from "../services/pointsService";

class WasteItemController {
  createWasteItem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, category, description, properDisposalMethod, isRecyclable } =
      req.body;
    const createdBy = req.user!._id;

    const wasteItem = await WasteItem.create({
      name,
      category,
      description,
      properDisposalMethod,
      isRecyclable,
      createdBy,
    });

    return ApiResponse.created(res, "Waste item created successfully", {
      wasteItem,
    });
  });

  getAllWasteItems = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.isRecyclable !== undefined) {
      query.isRecyclable = req.query.isRecyclable === "true";
    }

    if (req.query.q) {
      query.$text = { $search: req.query.q as string };
    }

    const total = await WasteItem.countDocuments(query);
    const wasteItems = await WasteItem.find(query)
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return ApiResponse.ok(
      res,
      "Waste items retrieved successfully",
      { wasteItems },
      {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    );
  });

  getWasteItemById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const wasteItem = await WasteItem.findById(id).populate(
      "createdBy",
      "name email",
    );

    if (!wasteItem) {
      throw new ApiError(404, "Waste item not found");
    }

    // Award points for viewing (only for authenticated users)
    if (req.user) {
      await pointsService.addPoints(
        req.user._id.toString(),
        PointsAction.VIEW_WASTE_ITEM,
      );
    }

    return ApiResponse.ok(res, "Waste item retrieved successfully", {
      wasteItem,
    });
  });

  updateWasteItem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    const wasteItem = await WasteItem.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("createdBy", "name email");

    if (!wasteItem) {
      throw new ApiError(404, "Waste item not found");
    }

    return ApiResponse.ok(res, "Waste item updated successfully", {
      wasteItem,
    });
  });

  deleteWasteItem = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const wasteItem = await WasteItem.findByIdAndDelete(id);

    if (!wasteItem) {
      throw new ApiError(404, "Waste item not found");
    }

    return ApiResponse.ok(res, "Waste item deleted successfully");
  });

  searchWasteItems = asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;

    if (!q) {
      throw new ApiError(400, "Search query is required");
    }

    const wasteItems = await WasteItem.find(
      { $text: { $search: q as string } },
      { score: { $meta: "textScore" } },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(20)
      .populate("createdBy", "name email");

    return ApiResponse.ok(res, "Search completed successfully", { wasteItems });
  });
}

export default new WasteItemController();
