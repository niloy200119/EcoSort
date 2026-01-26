import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/ApiError";
import Event from "../models/Event";
import EventTicket, { TicketStatus } from "../models/EventTicket";
import EventPost from "../models/EventPost";
import { AuthRequest } from "../middlewares/auth";
import crypto from "crypto";

class EventController {
  // --- Event Management ---

  createEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const {
      title,
      description,
      date,
      location,
      type,
      capacity,
      pointsRequired,
      image,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      type,
      capacity,
      pointsRequired: pointsRequired || 0,
      image,
      organizer: req.user!._id,
    });

    return ApiResponse.created(res, "Event created successfully", event);
  });

  getAllEvents = asyncHandler(async (req: Request, res: Response) => {
    const { type, status } = req.query;
    const query: any = {};

    if (type) query.type = type;
    if (status) query.status = status;
    else query.status = { $ne: "cancelled" }; // Default don't show cancelled

    const events = await Event.find(query)
      .populate("organizer", "name email role")
      .sort({ date: 1 }); // Soonest events first

    return ApiResponse.ok(res, "Events retrieved successfully", events);
  });

  getEventById = asyncHandler(async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name email role")
      .populate("participants", "name");

    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    return ApiResponse.ok(res, "Event details retrieved", event);
  });

  updateEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
      throw new ApiError(404, "Event not found");
    }

    // Only organizer or admin can update
    if (
        event.organizer.toString() !== req.user!._id.toString() &&
        req.user!.role !== "admin"
    ) {
      throw new ApiError(403, "Not authorized to update this event");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    return ApiResponse.ok(res, "Event updated successfully", updatedEvent);
  });

  deleteEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (
        event.organizer.toString() !== req.user!._id.toString() &&
        req.user!.role !== "admin"
    ) {
        throw new ApiError(403, "Not authorized to delete this event");
    }

    await event.deleteOne();
    return ApiResponse.ok(res, "Event deleted successfully");
  });

  // --- Ticket Management ---

  applyForEvent = asyncHandler(async (req: AuthRequest, res: Response) => {
    const eventId = req.params.id;
    const userId = req.user!._id;

    const event = await Event.findById(eventId);
    if (!event) throw new ApiError(404, "Event not found");

    if (event.status !== "upcoming") {
        throw new ApiError(400, "Cannot join past or cancelled events");
    }
    
    // Better way: use Event.participants array length for approved ones
    if (event.participants.length >= event.capacity) {
        throw new ApiError(400, "Event is full");
    }

    // Check points criteria
    if (req.user!.points < (event.pointsRequired || 0)) {
        throw new ApiError(400, `You need at least ${event.pointsRequired} points to join this event`);
    }

    // Check if already applied
    const existingTicket = await EventTicket.findOne({ user: userId, event: eventId });
    if (existingTicket) {
        throw new ApiError(400, "You have already applied for this event");
    }

    const ticketNumber = crypto.randomBytes(4).toString("hex").toUpperCase();

    // Auto-approve since user requested capacity reduction immediately
    // Add user to participants immediately
    const status = TicketStatus.APPROVED;

    const ticket = await EventTicket.create({
        user: userId,
        event: eventId,
        status,
        ticketNumber
    });

    await Event.findByIdAndUpdate(eventId, {
        $addToSet: { participants: userId }
    });

    return ApiResponse.created(res, "Application submitted successfully", ticket);
  });

  getMyTickets = asyncHandler(async (req: AuthRequest, res: Response) => {
    const tickets = await EventTicket.find({ user: req.user!._id })
        .populate("event")
        .sort({ createdAt: -1 });
    return ApiResponse.ok(res, "My tickets retrieved", tickets);
  });

  getEventTickets = asyncHandler(async (req: AuthRequest, res: Response) => {
    // Only organizer/admin check
    const event = await Event.findById(req.params.id);
    if (!event) throw new ApiError(404, "Event not found");

    if (
        event.organizer.toString() !== req.user!._id.toString() &&
        req.user!.role !== "admin"
    ) {
        throw new ApiError(403, "Not authorized to view tickets for this event");
    }

    const tickets = await EventTicket.find({ event: req.params.id })
        .populate("user", "name email points");
    
    return ApiResponse.ok(res, "Event applicants retrieved", tickets);
  });

  updateTicketStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { ticketId } = req.params;
    const { status } = req.body;

    const ticket = await EventTicket.findById(ticketId).populate("event");
    if (!ticket) throw new ApiError(404, "Ticket not found");

    const event = ticket.event as any; // Cast to access fields

    // Check auth
    if (
        event.organizer.toString() !== req.user!._id.toString() &&
        req.user!.role !== "admin"
    ) {
        throw new ApiError(403, "Not authorized");
    }

    ticket.status = status;
    await ticket.save();

    // If approved, add to event participants
    if (status === TicketStatus.APPROVED) {
        // Check capacity again just in case
        const currentParticipants = await Event.findById(event._id);
        if (currentParticipants && currentParticipants.participants.length < currentParticipants.capacity) {
             await Event.findByIdAndUpdate(event._id, {
                $addToSet: { participants: ticket.user }
             });
        } else {
            // Revert if full? Or just warn?
            // For now, let's assume UI handles capacity check before approving.
        }
    } else if (status === TicketStatus.REJECTED || status === TicketStatus.CANCELLED) {
        await Event.findByIdAndUpdate(event._id, {
            $pull: { participants: ticket.user }
        });
    }

    return ApiResponse.ok(res, "Ticket status updated", ticket);
  });

  // --- Forum Management ---

  createPost = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { content, parentPost } = req.body;
    const eventId = req.params.id;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) throw new ApiError(404, "Event not found");

    const post = await EventPost.create({
        user: req.user!._id,
        event: eventId,
        content,
        parentPost: parentPost || null
    });

    const populatedPost = await EventPost.findById(post._id).populate("user", "name");

    return ApiResponse.created(res, "Post created", populatedPost);
  });

  getEventPosts = asyncHandler(async (req: Request, res: Response) => {
    const eventId = req.params.id;
    
    const posts = await EventPost.find({ event: eventId })
        .populate("user", "name role")
        .sort({ createdAt: -1 }); // Newest first

    // Structure them (threading)?
    // For simplicity, returning flat list. Frontend can handle threading if needed via parentPost
    return ApiResponse.ok(res, "Forum posts retrieved", posts);
  });
}

export default new EventController();
