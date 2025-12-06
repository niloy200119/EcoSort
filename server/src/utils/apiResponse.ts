import { Response } from "express";

interface ApiResponseData {
  success: boolean;
  message: string;
  data?: any;
  errors?: any;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

class ApiResponse {
  static success(
    res: Response,
    statusCode: number,
    message: string,
    data?: any,
    meta?: any,
  ): Response {
    const response: ApiResponseData = {
      success: true,
      message,
      data,
    };

    if (meta) {
      response.meta = meta;
    }

    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    statusCode: number,
    message: string,
    errors?: any,
  ): Response {
    const response: ApiResponseData = {
      success: false,
      message,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  static created(res: Response, message: string, data?: any): Response {
    return this.success(res, 201, message, data);
  }

  static ok(res: Response, message: string, data?: any, meta?: any): Response {
    return this.success(res, 200, message, data, meta);
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static badRequest(res: Response, message: string, errors?: any): Response {
    return this.error(res, 400, message, errors);
  }

  static unauthorized(
    res: Response,
    message: string = "Unauthorized",
  ): Response {
    return this.error(res, 401, message);
  }

  static forbidden(res: Response, message: string = "Forbidden"): Response {
    return this.error(res, 403, message);
  }

  static notFound(
    res: Response,
    message: string = "Resource not found",
  ): Response {
    return this.error(res, 404, message);
  }

  static conflict(res: Response, message: string): Response {
    return this.error(res, 409, message);
  }

  static internalError(
    res: Response,
    message: string = "Internal server error",
  ): Response {
    return this.error(res, 500, message);
  }
}

export default ApiResponse;
