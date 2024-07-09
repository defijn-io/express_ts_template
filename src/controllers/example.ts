import express, { Request, Response } from "express";
import { example } from "../services";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const message = await example();
    return res.status(200).json({
        message: message,
    });
});

export default router;
