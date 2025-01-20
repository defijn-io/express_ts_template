import express, { Request, Response } from "express";
import { example } from "../services";

const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
    const message = await example();
    res.status(200).json({
        message: message,
    });
});

export const exampleController = router;
