import { z } from "zod";
import { WasteCategory } from "../models/WasteItem";

export const createWasteItemSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Item name must be at least 2 characters")
      .max(200, "Item name cannot exceed 200 characters")
      .trim(),
    category: z.enum([
      WasteCategory.PLASTIC,
      WasteCategory.PAPER,
      WasteCategory.METAL,
      WasteCategory.GLASS,
      WasteCategory.ORGANIC,
      WasteCategory.EWASTE,
      WasteCategory.HAZARDOUS,
      WasteCategory.TEXTILE,
      WasteCategory.OTHER,
    ]),
    description: z
      .string()
      .min(5, "Description must be at least 10 characters")
      .max(1000, "Description cannot exceed 1000 characters")
      .trim(),
    properDisposalMethod: z
      .string()
      .min(5, "Disposal method must be at least 10 characters")
      .max(1000, "Disposal method cannot exceed 1000 characters")
      .trim(),
    isRecyclable: z.boolean(),
  }),
});

export const updateWasteItemSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid waste item ID"),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, "Item name must be at least 2 characters")
      .max(200, "Item name cannot exceed 200 characters")
      .trim()
      .optional(),
    category: z
      .enum([
        WasteCategory.PLASTIC,
        WasteCategory.PAPER,
        WasteCategory.METAL,
        WasteCategory.GLASS,
        WasteCategory.ORGANIC,
        WasteCategory.EWASTE,
        WasteCategory.HAZARDOUS,
        WasteCategory.TEXTILE,
        WasteCategory.OTHER,
      ])
      .optional(),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description cannot exceed 1000 characters")
      .trim()
      .optional(),
    properDisposalMethod: z
      .string()
      .min(10, "Disposal method must be at least 10 characters")
      .max(1000, "Disposal method cannot exceed 1000 characters")
      .trim()
      .optional(),
    isRecyclable: z.boolean().optional(),
  }),
});

export const getWasteItemSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid waste item ID"),
  }),
});

export const searchWasteItemsSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    category: z
      .enum([
        WasteCategory.PLASTIC,
        WasteCategory.PAPER,
        WasteCategory.METAL,
        WasteCategory.GLASS,
        WasteCategory.ORGANIC,
        WasteCategory.EWASTE,
        WasteCategory.HAZARDOUS,
        WasteCategory.TEXTILE,
        WasteCategory.OTHER,
      ])
      .optional(),
    isRecyclable: z.enum(["true", "false"]).optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});
