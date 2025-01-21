import { Request, Response, NextFunction } from "express";

type AsyncRequestHandler<T = void> = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<T>;

export const asyncWrapper = <T>(fn: AsyncRequestHandler<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
