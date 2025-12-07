import { Router } from "express";
import adminController from "../controllers/adminController";
import { authenticate, authorize } from "../middlewares/auth";
import { UserRole } from "../models/User";

const router = Router();

router.use(authenticate, authorize(UserRole.ADMIN));

router.get("/dashboard", adminController.getDashboardStats);

router.get("/top-users", adminController.getTopUsers);

router.get("/users", adminController.getAllUsers);

router.delete("/users/:id", adminController.deleteUser);

router.post("/seed", adminController.seedData);

export default router;
