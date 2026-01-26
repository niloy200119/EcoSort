import { Router } from "express";
import eventController from "../controllers/eventController";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import {
  createEventSchema,
  updateEventSchema,
  updateTicketStatusSchema,
  createPostSchema,
} from "../validators/eventValidator";

const router = Router();

// Public routes
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.get("/:id/forum", eventController.getEventPosts);

// Protected routes (Any authenticated user)
router.post(
  "/",
  authenticate,
  validate(createEventSchema),
  eventController.createEvent
);
router.put(
  "/:id",
  authenticate,
  validate(updateEventSchema),
  eventController.updateEvent
);
router.delete("/:id", authenticate, eventController.deleteEvent);

// Ticket routes
router.post("/:id/join", authenticate, eventController.applyForEvent);
router.get("/tickets/my", authenticate, eventController.getMyTickets);

// Organizer routes
router.get("/:id/tickets", authenticate, eventController.getEventTickets);
router.put(
    "/tickets/:ticketId/status",
    authenticate,
    validate(updateTicketStatusSchema),
    eventController.updateTicketStatus
);

// Forum routes
router.post(
    "/:id/forum",
    authenticate,
    validate(createPostSchema),
    eventController.createPost
);

export default router;
