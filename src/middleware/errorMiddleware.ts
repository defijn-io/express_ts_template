import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/errorClasses";
import logger from "@/utils/logger";
import { responseFormatter } from "@/utils/responseFormatter";
import { StatusCodes } from "http-status-codes";

export const errorMiddleware = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    logger.error(`Error: ${err.message}`, {
        error: err,
        stack: err.stack,
        url: req.url,
        method: req.method,
    });

    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof AppError) {
        return responseFormatter(res, err.statusCode, null, err.message);
    }

    return responseFormatter(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        null,
        err.message,
    );
};
