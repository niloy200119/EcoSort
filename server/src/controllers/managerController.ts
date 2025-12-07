import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import WasteItem from "../models/WasteItem";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";

class ManagerController {
  getDashboardStats = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const activeVehicles = 4; // Mock for now
    const completedRoutes = 12; // Mock
    const pendingRequests = 5; // Mock

    return ApiResponse.ok(res, "Manager stats retrieved", {
        stats: {
            todayCollections: 15, // Mock
            completedRoutes,
            activeVehicles,
            pendingRequests,
            totalWasteToday: '3.5 tons', // Mock
            recyclingRate: '72%' // Mock
        }
    });
  });

  getSchedule = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const schedule = [
        { id: 1, zone: 'Zone 1 - Gulshan', time: '06:00 AM', status: 'completed', type: 'General Waste' },
        { id: 2, zone: 'Zone 2 - Banani', time: '07:00 AM', status: 'in-progress', type: 'Recyclables' },
        { id: 3, zone: 'Zone 3 - Dhanmondi', time: '08:00 AM', status: 'pending', type: 'General Waste' },
        { id: 4, zone: 'Zone 4 - Mirpur', time: '09:00 AM', status: 'pending', type: 'E-Waste' },
        { id: 5, zone: 'Zone 5 - Uttara', time: '10:00 AM', status: 'pending', type: 'Organic Waste' },
    ];
    return ApiResponse.ok(res, "Schedule retrieved", { schedule });
  });

  getVehicles = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const vehicles = [
        { id: 1, number: 'DHK-1234', status: 'active', driver: 'Karim Ahmed', location: 'Zone 2' },
        { id: 2, number: 'DHK-5678', status: 'active', driver: 'Rahim Khan', location: 'Zone 1' },
        { id: 3, number: 'DHK-9012', status: 'maintenance', driver: 'Salim Rahman', location: 'Depot' },
        { id: 4, number: 'DHK-3456', status: 'idle', driver: 'Habib Ali', location: 'Depot' },
    ];
    return ApiResponse.ok(res, "Vehicles retrieved", { vehicles });
  });

  getRequests = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const recentItems = await WasteItem.find().sort({ createdAt: -1 }).limit(5).populate('createdBy', 'name location');
    
    const formattedRequests = recentItems.map(item => ({
        id: item._id,
        name: (item.createdBy as any)?.name || 'Anonymous',
        request: `Pickup: ${item.name} (${item.category})`,
        address: (item.createdBy as any)?.location || 'Unknown Location',
        priority: item.category === 'hazardous' || item.category === 'ewaste' ? 'high' : 'medium',
        time: item.createdAt,
        status: 'pending'
    }));

    return ApiResponse.ok(res, "Requests retrieved", { requests: formattedRequests });
  });
}

export default new ManagerController();
