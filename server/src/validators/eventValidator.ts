import { z } from "zod";
import { EventType, EventStatus } from "../models/Event";
import { TicketStatus } from "../models/EventTicket";

export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(10),
    date: z.string().datetime(), // Expect ISO string
    location: z.string().min(2),
    type: z.enum([
      EventType.CLEANUP,
      EventType.WORKSHOP,
      EventType.SEMINAR,
      EventType.RALLY,
      EventType.OTHER,
    ]),
    capacity: z.number().int().positive(),
    pointsRequired: z.number().int().min(0).optional(),
    image: z.string().optional(),
  }),
});

export const updateEventSchema = z.object({
  body: z.object({
    title: z.string().min(5).max(100).optional(),
    description: z.string().min(10).optional(),
    date: z.string().datetime().optional(),
    location: z.string().min(2).optional(),
    type: z.enum([
      EventType.CLEANUP,
      EventType.WORKSHOP,
      EventType.SEMINAR,
      EventType.RALLY,
      EventType.OTHER,
    ]).optional(),
    capacity: z.number().int().positive().optional(),
    pointsRequired: z.number().int().min(0).optional(),
    status: z.enum([
      EventStatus.UPCOMING,
      EventStatus.ONGOING,
      EventStatus.COMPLETED,
      EventStatus.CANCELLED,
    ]).optional(),
    image: z.string().optional(),
  }),
});

export const updateTicketStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      TicketStatus.APPROVED,
      TicketStatus.REJECTED,
      TicketStatus.ATTENDED,
    ]),
  }),
});

export const createPostSchema = z.object({
  body: z.object({
    content: z.string().min(1).max(1000),
    parentPost: z.string().optional(), // ID of parent post if reply
  }),
});
