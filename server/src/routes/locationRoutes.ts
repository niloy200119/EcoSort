import { Router } from "express";
import locationController from "../controllers/locationController";
import { authenticate, authorize } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { UserRole } from "../models/User";
import {
  createLocationSchema,
  updateLocationSchema,
  getLocationSchema,
  findNearbyLocationsSchema,
  searchLocationsSchema,
} from "../validators/locationValidator";

const router = Router();

router.get(
  "/",
  validate(searchLocationsSchema),
  locationController.getAllLocations,
);

router.get(
  "/nearby",
  validate(findNearbyLocationsSchema),
  locationController.findNearbyLocations,
);

router.get(
  "/:id",
  validate(getLocationSchema),
  locationController.getLocationById,
);

router.post(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(createLocationSchema),
  locationController.createLocation,
);

router.put(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(updateLocationSchema),
  locationController.updateLocation,
);

router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(getLocationSchema),
  locationController.deleteLocation,
);

export default router;
