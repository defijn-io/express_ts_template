import dotenv from "dotenv";
import winston from "winston";

dotenv.config();

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

winston.addColors(colors);

const isProduction = true;

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info: winston.Logform.TransformableInfo) => {
        const { timestamp, level, message, ...metadata } = info;
        const separator = "*".repeat(60);
        let output = `${separator}\n${timestamp} ${level}: ${message}`;

        if (Object.keys(metadata).length) {
            const filteredMetadata = { ...metadata };
            if (isProduction) {
                delete filteredMetadata.stack;
                if (
                    filteredMetadata.error &&
                    typeof filteredMetadata.error === "object"
                ) {
                    delete (filteredMetadata.error as Record<string, unknown>)
                        .stack;
                }
            }

            const metadataStr = JSON.stringify(
                filteredMetadata,
                (key: string, value: unknown) => {
                    if (
                        !isProduction &&
                        key === "stack" &&
                        typeof value === "string"
                    ) {
                        return value
                            .split("\n")
                            .map((line: string) => line.trim())
                            .join(" > ");
                    }
                    return value;
                },
                2,
            );
            output +=
                "\n" +
                metadataStr
                    .split("\n")
                    .map((line: string) => `${timestamp} ${line}`)
                    .join("\n");
        }

        return output;
    }),
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
    }),
    new winston.transports.File({ filename: "logs/all.log" }),
];

const logger = winston.createLogger({
    level: "debug",
    levels,
    format,
    transports,
});

export const logMessageFormatter = (
    functionName: string,
    message: string,
): string => {
    return `[${functionName}] ${message}`;
};

export default logger;
