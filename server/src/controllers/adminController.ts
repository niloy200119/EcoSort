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

  seedData = asyncHandler(async (req: AuthRequest, res: Response) => {
    // Seed Recycling Locations
    const locationCount = await RecyclingLocation.countDocuments();
    if (locationCount === 0) {
      const locations = [
        {
          name: "Dhaka North Recycling Hub",
          type: "recycling_center",
          address: "Plot 23, Road 11, Banani, Dhaka",
          coordinates: { type: "Point", coordinates: [90.4043, 23.7937] },
          hours: "9:00 AM - 6:00 PM",
          phone: "+8801711223344"
        },
        {
          name: "Sylhet Eco Park Drop-off",
          type: "collection_point",
          address: "Eco Park Road, Sylhet",
          coordinates: { type: "Point", coordinates: [91.8687, 24.8949] },
          hours: "8:00 AM - 5:00 PM",
          phone: "+8801755667788"
        },
        {
            name: "Gulshan E-Waste Center",
            type: "ewaste_dropoff",
            address: "Gulshan 2 Circle, Dhaka",
            coordinates: { type: "Point", coordinates: [90.4125, 23.7925] },
            hours: "10:00 AM - 8:00 PM",
            phone: "+8801811223344"
        },
        {
            name: "Mirpur Organic Compost",
            type: "compost_facility",
            address: "Mirpur 14, Dhaka",
            coordinates: { type: "Point", coordinates: [90.3700, 23.8200] },
            hours: "7:00 AM - 4:00 PM",
            phone: "+8801911223344"
        }
      ];
      await RecyclingLocation.insertMany(locations);
    }

    // Seed Waste Items
    const wasteCount = await WasteItem.countDocuments();
    if (wasteCount === 0) {
      const adminUser = req.user!._id;
      const items = [
        {
          name: "Plastic Bottles (PET)",
          category: "plastic",
          description: "Clear plastic bottles used for water/soda. Rinse and remove cap.",
          properDisposalMethod: "Recycle",
          isRecyclable: true,
          createdBy: adminUser
        },
        {
          name: "Food Scraps",
          category: "organic",
          description: "Vegetable peels, fruit scraps, coffee grounds, leftovers. Add to compost bin/green waste.",
          properDisposalMethod: "Compost",
          isRecyclable: false,
          createdBy: adminUser
        },
        {
          name: "Cardboard Boxes",
          category: "paper",
          description: "Clean cardboard packaging. Flatten boxes.",
          properDisposalMethod: "Recycle",
          isRecyclable: true,
          createdBy: adminUser
        },
        {
          name: "Batteries",
          category: "hazardous",
          description: "Used AA/AAA/Lithium batteries. Never throw in regular trash. Take to designated collection.",
          properDisposalMethod: "Special Collection",
          isRecyclable: false,
          createdBy: adminUser
        },
        {
          name: "Glass Jars",
          category: "glass",
          description: "Clean glass jars/bottles. Rinse and remove lids.",
          properDisposalMethod: "Recycle",
          isRecyclable: true,
          createdBy: adminUser
        },
        {
          name: "Pizza Boxes",
          category: "paper",
          description: "Greasy parts cannot be recycled. Compost soiled parts, recycle clean lids.",
          properDisposalMethod: "Compost/Trash",
          isRecyclable: false,
          createdBy: adminUser
        },
        {
          name: "Aluminum Cans",
          category: "metal",
          description: "Beverage cans, food tins. Rinse and crush.",
          properDisposalMethod: "Recycle",
          isRecyclable: true,
          createdBy: adminUser
        },
        {
          name: "Old Electronics",
          category: "ewaste",
          description: "Broken phones, cables, chargers. Take to e-waste center.",
          properDisposalMethod: "E-Waste Center",
          isRecyclable: true,
          createdBy: adminUser
        },
        {
          name: "Plastic Bags",
          category: "plastic",
          description: "Grocery bags, wrappers. Return to store drop-off if available.",
          properDisposalMethod: "Special Recycling",
          isRecyclable: true,
          createdBy: adminUser
        },
        {
          name: "Newspapers",
          category: "paper",
          description: "Keep dry. Place in paper recycling bin.",
          properDisposalMethod: "Recycle",
          isRecyclable: true,
          createdBy: adminUser
        },
        {
          name: "Styrofoam",
          category: "plastic",
          description: "Foam packaging, cups. Most facilities do not recycle this.",
          properDisposalMethod: "Trash",
          isRecyclable: false,
          createdBy: adminUser
        },
        {
          name: "Garden Waste",
          category: "organic",
          description: "Leaves, grass clippings, branches.",
          properDisposalMethod: "Compost",
          isRecyclable: false,
          createdBy: adminUser
        }
      ];
      await WasteItem.insertMany(items);
    }

    return ApiResponse.ok(res, "Database seeded successfully");
  });
}

export default new AdminController();
