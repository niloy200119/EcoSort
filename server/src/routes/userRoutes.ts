import { Router } from "express";
import userController from "../controllers/userController";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

router.get("/dashboard", userController.getDashboardStats);
router.get("/waste-items", userController.getWasteItems);

export default router;
