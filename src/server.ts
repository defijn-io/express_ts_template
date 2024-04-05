import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import nocache from "nocache";

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
    throw new Error("Missing required environment variables");
}

const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

const app: Express = express();

app.use(express.json());
app.set("json spaces", 2);

/**
 * App Configuration
 */

// Security headers
app.use(
    helmet({
        hsts: {
            maxAge: 31536000,
        },
        contentSecurityPolicy: {
            useDefaults: false,
            directives: {
                "default-src": ["'none'"],
                "frame-ancestors": ["'none'"],
            },
        },
        frameguard: {
            action: "deny",
        },
    }),
);

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
        maxAge: 86400,
    }),
);

// Health Check
app.get("/", (req, res) => {
    res.json({
        message: "🎉 Express is running and healthy",
    });
});

/**
 * Route Definitions Start
 * Add your routes below
 */

/**
 * Route Definitions End
 * Add your routes above
 */

// Guard route
app.use((req, res, next) => {
    const error = {
        status: 404,
        message: "Route not found",
    };

    next(error);
});

// Server starter - You can use this to start any other services that needs to be running before the server starts
async function startServer() {
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}`);
    });
}

startServer();
