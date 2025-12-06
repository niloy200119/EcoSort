import { Router } from "express";
import wasteItemController from "../controllers/wasteItemController";
import { authenticate, authorize } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { UserRole } from "../models/User";
import {
  createWasteItemSchema,
  updateWasteItemSchema,
  getWasteItemSchema,
  searchWasteItemsSchema,
} from "../validators/wasteItemValidator";

const router = Router();

router.get(
  "/",
  validate(searchWasteItemsSchema),
  wasteItemController.getAllWasteItems,
);

router.get("/search", wasteItemController.searchWasteItems);

router.get(
  "/:id",
  validate(getWasteItemSchema),
  wasteItemController.getWasteItemById,
);

router.post(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(createWasteItemSchema),
  wasteItemController.createWasteItem,
);

router.put(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(updateWasteItemSchema),
  wasteItemController.updateWasteItem,
);

router.delete(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(getWasteItemSchema),
  wasteItemController.deleteWasteItem,
);

export default router;
