import { Router } from "express";
import managerController from "../controllers/managerController";
import { authenticate, authorize } from "../middlewares/auth";
import { UserRole } from "../models/User";

const router = Router();

router.use(authenticate, authorize(UserRole.WASTE_MANAGER));

router.get("/dashboard", managerController.getDashboardStats);
router.get("/schedule", managerController.getSchedule);
router.get("/vehicles", managerController.getVehicles);
router.get("/requests", managerController.getRequests);

export default router;
