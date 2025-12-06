import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";
import ApiError from "../utils/ApiError";

interface ErrorResponse {
  success: boolean;
  message: string;
  stack?: string;
  errors?: any;
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let error = err;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ApiError(404, message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    error = new ApiError(409, message);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    error = new ApiError(400, "Validation Error");
    error.errors = errors;
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  const response: ErrorResponse = {
    success: false,
    message,
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  // Include stack trace in development
  if (config.env === "development") {
    response.stack = error.stack;
  }

  // Log error
  console.error(
    `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );

  if (config.env === "development") {
    console.error(error.stack);
  }

  res.status(statusCode).json(response);
};

export const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};
