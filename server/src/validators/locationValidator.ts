import { z } from "zod";
import { LocationType } from "../models/RecyclingLocation";

export const createLocationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Location name must be at least 2 characters")
      .max(200, "Location name cannot exceed 200 characters")
      .trim(),
    type: z.enum([
      LocationType.RECYCLING_CENTER,
      LocationType.COMPOST_SITE,
      LocationType.EWASTE_DROPOFF,
      LocationType.HAZARDOUS_WASTE,
      LocationType.COLLECTION_POINT,
    ]),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(500, "Address cannot exceed 500 characters")
      .trim(),
    longitude: z
      .number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
    latitude: z
      .number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
    hours: z
      .string()
      .max(200, "Hours cannot exceed 200 characters")
      .trim()
      .optional(),
    phone: z
      .string()
      .regex(/^[+]?[\d\s-()]+$/, "Invalid phone number format")
      .max(20, "Phone number cannot exceed 20 characters")
      .trim()
      .optional(),
  }),
});

export const updateLocationSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid location ID"),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, "Location name must be at least 2 characters")
      .max(200, "Location name cannot exceed 200 characters")
      .trim()
      .optional(),
    type: z
      .enum([
        LocationType.RECYCLING_CENTER,
        LocationType.COMPOST_SITE,
        LocationType.EWASTE_DROPOFF,
        LocationType.HAZARDOUS_WASTE,
        LocationType.COLLECTION_POINT,
      ])
      .optional(),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(500, "Address cannot exceed 500 characters")
      .trim()
      .optional(),
    longitude: z
      .number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180")
      .optional(),
    latitude: z
      .number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90")
      .optional(),
    hours: z
      .string()
      .max(200, "Hours cannot exceed 200 characters")
      .trim()
      .optional(),
    phone: z
      .string()
      .regex(/^[+]?[\d\s-()]+$/, "Invalid phone number format")
      .max(20, "Phone number cannot exceed 20 characters")
      .trim()
      .optional(),
  }),
});

export const getLocationSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid location ID"),
  }),
});

export const findNearbyLocationsSchema = z.object({
  query: z.object({
    longitude: z.string().regex(/^-?\d+\.?\d*$/, "Invalid longitude"),
    latitude: z.string().regex(/^-?\d+\.?\d*$/, "Invalid latitude"),
    maxDistance: z.string().regex(/^\d+$/, "Invalid max distance").optional(),
    type: z
      .enum([
        LocationType.RECYCLING_CENTER,
        LocationType.COMPOST_SITE,
        LocationType.EWASTE_DROPOFF,
        LocationType.HAZARDOUS_WASTE,
        LocationType.COLLECTION_POINT,
      ])
      .optional(),
  }),
});

export const searchLocationsSchema = z.object({
  query: z.object({
    q: z.string().optional(),
    type: z
      .enum([
        LocationType.RECYCLING_CENTER,
        LocationType.COMPOST_SITE,
        LocationType.EWASTE_DROPOFF,
        LocationType.HAZARDOUS_WASTE,
        LocationType.COLLECTION_POINT,
      ])
      .optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});
