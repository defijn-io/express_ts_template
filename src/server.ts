import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import nocache from "nocache";
import api from "@/routes/api";
import { StatusCodes } from "http-status-codes";
import { errorMiddleware } from "@/middleware/errorMiddleware";
import logger from "./utils/logger";
import cookieParser from "cookie-parser";

dotenv.config();

if (!process.env.POSTGRES_PASSWORD) {
    throw new Error("Missing required environment variables");
}

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
    throw new Error("Missing required environment variables");
}

const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

const app: Express = express();

async function startServer() {
    try {
        logger.info("Starting server initialization");

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.set("json spaces", 2);

        // Security headers
        app.use(helmet());

        // Logger
        app.use(morgan("combined"));

        // Disable caching
        app.use(nocache());

        // Cors settings
        app.use(
            cors({
                origin: CLIENT_ORIGIN_URL,
                methods: ["GET", "POST", "PUT", "DELETE"],
                allowedHeaders: ["Authorization", "Content-Type"],
                credentials: true,
                maxAge: 86400,
            }),
        );

        // Using Redis? Connect to Redis here
        logger.info("Redis connection established");

        // Rate limiting? Set up rate limiting here
        logger.info("Rate limiting initialized");

        // Metics? Set up metrics here
        logger.info("Metrics initialized");

        app.get("/", (req, res) => {
            res.status(StatusCodes.OK).json({
                message: "🎉 Express is running and healthy",
                request: req.headers,
            });
        });

        // API routes
        app.use("/api", api);

        // Guard route
        app.use((req, res, next) => {
            const error = {
                status: StatusCodes.NOT_FOUND,
                req: req.header,
                res: res.header,
                message: "Route not found",
            };
            next(error);
        });

        app.use(errorMiddleware);

        app.listen(PORT, () => {
            logger.info(`🚀  Server successfully started on port ${PORT}`);
        });
    } catch (error) {
        logger.error("‼️  Error starting server: ", error);
        process.exit(1);
    }
}

startServer();
process.on("SIGINT", () => {
    logger.info("Shutting down...");
    // If using posthog, initialize it in the startServer function and ensure you shutdown it here
    // posthog.shutdown();
    process.exit();
});
