import { UniqueConstraintError } from "sequelize";
import AppError from "./AppError";
import logger from "../logger/logger";
import { NextFunction, Request, Response } from "express";
import { buildErrorResponse } from "../types/ApiResponse";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let message = "";
    let status = 500;
    if (err instanceof UniqueConstraintError) {
        status = 409;
        message = err.original.message;
    }
    else if (err instanceof AppError) {
        status = err.statusCode;
        message = err.message;
    }
    else if ((err as any).isJoi) {
        status = 400;
        message = err.message
    }
    else {
        status = (err as any).status || 500;
        message = err.message;
    }
    logger.error(`[${req.method}] ${req.url} - ${message}`); // binding to winston logging. Change this
    res.status(status).send(buildErrorResponse(message, err));
};
