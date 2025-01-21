import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public functionName: string,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.functionName = functionName;
    }
}

export class ExampleCustomError extends AppError {
    constructor(message: string, functionName: string) {
        super(StatusCodes.BAD_REQUEST, message, functionName);
    }
}
