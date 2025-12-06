import { Router } from "express";
import reminderController from "../controllers/reminderController";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import {
  createReminderSchema,
  getReminderSchema,
} from "../validators/reminderValidator";

const router = Router();

router.get("/", authenticate, reminderController.getUserReminders);

router.get(
  "/:id",
  authenticate,
  validate(getReminderSchema),
  reminderController.getReminderById,
);

router.post(
  "/",
  authenticate,
  validate(createReminderSchema),
  reminderController.createReminder,
);

router.delete(
  "/:id",
  authenticate,
  validate(getReminderSchema),
  reminderController.deleteReminder,
);

export default router;
