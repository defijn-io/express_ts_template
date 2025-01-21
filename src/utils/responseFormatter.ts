import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const responseFormatter = <T>(
    res: Response,
    statusCode: number,
    data: T | null,
    message: string,
) => {
    res.setHeader("Content-Type", "application/json");

    const responseBody = {
        status: statusCode < StatusCodes.BAD_REQUEST ? "success" : "error",
        message: message,
        data: data,
    };

    res.status(statusCode).json(responseBody);
};
