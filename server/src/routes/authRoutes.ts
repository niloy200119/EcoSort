import { Router } from "express";
import authController from "../controllers/authController";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validators/authValidator";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);

router.post("/login", validate(loginSchema), authController.login);

router.post("/logout", authenticate, authController.logout);

router.post(
  "/refresh",
  validate(refreshTokenSchema),
  authController.refreshToken,
);

router.get("/profile", authenticate, authController.getProfile);

export default router;
