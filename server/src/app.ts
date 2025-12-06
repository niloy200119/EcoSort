import express, { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";

import { config } from "./config/env";
import { errorHandler, notFound } from "./middlewares/errorHandler";

const app: Application = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "EcoSort API is running",
    timestamp: new Date().toISOString(),
    environment: config.env,
  });
});

app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to EcoSort API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      wasteItems: "/api/waste-items",
      locations: "/api/locations",
      reminders: "/api/reminders",
      admin: "/api/admin",
    },
  });
});

app.use(notFound);

app.use(errorHandler);

export default app;