import { Request, Response } from "express";
import RecyclingLocation from "../models/RecyclingLocation";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/auth";
import pointsService, { PointsAction } from "../services/pointsService";

class LocationController {
  createLocation = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { name, type, address, longitude, latitude, hours, phone } = req.body;

    const location = await RecyclingLocation.create({
      name,
      type,
      address,
      coordinates: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      hours,
      phone,
    });

    return ApiResponse.created(res, "Recycling location created successfully", {
      location,
    });
  });

  getAllLocations = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const query: any = {};

    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.q) {
      query.$text = { $search: req.query.q as string };
    }

    const total = await RecyclingLocation.countDocuments(query);
    const locations = await RecyclingLocation.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return ApiResponse.ok(
      res,
      "Locations retrieved successfully",
      { locations },
      {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    );
  });

  getLocationById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const location = await RecyclingLocation.findById(id);

    if (!location) {
      throw new ApiError(404, "Location not found");
    }

    // Award points for viewing (only for authenticated users)
    if (req.user) {
      await pointsService.addPoints(
        req.user._id.toString(),
        PointsAction.VIEW_LOCATION,
      );
    }

    return ApiResponse.ok(res, "Location retrieved successfully", { location });
  });

  updateLocation = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { name, type, address, longitude, latitude, hours, phone } = req.body;

    const updates: any = {};
    if (name) updates.name = name;
    if (type) updates.type = type;
    if (address) updates.address = address;
    if (hours !== undefined) updates.hours = hours;
    if (phone !== undefined) updates.phone = phone;

    if (longitude !== undefined && latitude !== undefined) {
      updates.coordinates = {
        type: "Point",
        coordinates: [longitude, latitude],
      };
    }

    const location = await RecyclingLocation.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!location) {
      throw new ApiError(404, "Location not found");
    }

    return ApiResponse.ok(res, "Location updated successfully", { location });
  });

  deleteLocation = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const location = await RecyclingLocation.findByIdAndDelete(id);

    if (!location) {
      throw new ApiError(404, "Location not found");
    }

    return ApiResponse.ok(res, "Location deleted successfully");
  });

  findNearbyLocations = asyncHandler(async (req: Request, res: Response) => {
    const { longitude, latitude, maxDistance, type } = req.query;

    const long = parseFloat(longitude as string);
    const lat = parseFloat(latitude as string);
    const maxDist = parseInt(maxDistance as string) || 5000; // Default 5km in meters

    const query: any = {
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat],
          },
          $maxDistance: maxDist,
        },
      },
    };

    if (type) {
      query.type = type;
    }

    const locations = await RecyclingLocation.find(query).limit(20);

    return ApiResponse.ok(res, "Nearby locations retrieved successfully", {
      locations,
    });
  });
}

export default new LocationController();
