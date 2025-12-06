import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import ApiResponse from "../utils/apiResponse";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        return ApiResponse.badRequest(res, "Validation failed", errors);
      }
      return next(error);
    }
  };
};
