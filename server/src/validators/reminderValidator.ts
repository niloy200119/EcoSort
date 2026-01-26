import { z } from "zod";

export const createReminderSchema = z.object({
  body: z.object({
    dayOfWeek: z
      .number()
      .int()
      .min(0, "Day of week must be between 0 (Sunday) and 6 (Saturday)")
      .max(6, "Day of week must be between 0 (Sunday) and 6 (Saturday)"),
    notes: z
      .string()
      .max(500, "Notes cannot exceed 500 characters")
      .trim()
      .optional(),
  }),
});

export const getReminderSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid reminder ID"),
  }),
});
