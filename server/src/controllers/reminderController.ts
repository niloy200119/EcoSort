import { Response } from "express";
import Reminder from "../models/Reminder";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/auth";
import pointsService, { PointsAction } from "../services/pointsService";

class ReminderController {
  createReminder = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { dayOfWeek, notes } = req.body;
    const userId = req.user!._id;

    // Check if reminder already exists for this day
    const existingReminder = await Reminder.findOne({ userId, dayOfWeek });

    if (existingReminder) {
      throw new ApiError(409, "Reminder already exists for this day of week");
    }

    const reminder = await Reminder.create({
      userId,
      dayOfWeek,
      notes,
    });

    // Award points for creating a reminder
    await pointsService.addPoints(
      userId.toString(),
      PointsAction.CREATE_REMINDER,
    );

    return ApiResponse.created(res, "Reminder created successfully", {
      reminder,
    });
  });

  getUserReminders = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.user!._id;

    const reminders = await Reminder.find({ userId }).sort({ dayOfWeek: 1 });

    return ApiResponse.ok(res, "Reminders retrieved successfully", {
      reminders,
    });
  });

  getReminderById = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!._id;

    const reminder = await Reminder.findOne({ _id: id, userId });

    if (!reminder) {
      throw new ApiError(404, "Reminder not found");
    }

    return ApiResponse.ok(res, "Reminder retrieved successfully", { reminder });
  });

  deleteReminder = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!._id;

    const reminder = await Reminder.findOneAndDelete({ _id: id, userId });

    if (!reminder) {
      throw new ApiError(404, "Reminder not found");
    }

    return ApiResponse.ok(res, "Reminder deleted successfully");
  });
}

export default new ReminderController();
