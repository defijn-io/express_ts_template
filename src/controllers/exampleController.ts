import express, { Request, Response } from "express";
import { example } from "@/services/exampleService";
import { responseFormatter } from "@/utils/responseFormatter";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "@/utils/asyncWrapper";
import { ExampleCustomError } from "@/utils/errorClasses";

const router = express.Router();

const getExample = async (_req: Request, res: Response) => {
    const result = await example();

    if (!result) {
        throw new ExampleCustomError("Failed to get example", "getExample");
    }

    return responseFormatter(
        res,
        StatusCodes.OK,
        result,
        "Example fetched successfully",
    );
};
router.get("/", asyncWrapper(getExample));

export const exampleController = router;
