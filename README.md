# Express TypeScript Template 🚀

Welcome to the ultimate Express TypeScript Template, designed to jumpstart your backend projects with ease and efficiency! Tailored for developers by developers, this template leverages the power of Express in a TypeScript environment, offering a solid foundation for building robust and scalable applications.

## Introduction ⚡️

This template serves as a comprehensive starting point for building Express-based applications using TypeScript. It simplifies the setup process, incorporating best practices and common middleware to get you up and running quickly. With a focus on security, performance, and developer experience, it includes everything you need to kick off your project on the right foot.

## Unique Attributes 🚨

- Type Safety: Leveraging TypeScript for a safer, more predictable development experience.
- Pre-configured Middleware: Essential middleware for security, logging, and CORS pre-setup.
- Development Efficiency: Custom scripts to streamline common tasks, from building to running the dev server.

## Getting Started 🦅

- Clone the Repository: `git clone https://github.com/your-repo/express_ts_template.git`
- Install Dependencies: Run `npm install` or `yarn` in the project directory.
- Running the Project:
    - For development: `npm run dev` or `yarn dev`
    - For production: Build the project with `npm run build` or `yarn run build` and then start it with `npm run start` or `yarn start`.

## Included Packages 📦

- `bcryptjs & @types/bcryptjs`: For hashing passwords.
- `cookie-parser`: For parsing Cookie header and populating req.cookies.
- `cors & @types/cors`: To enable Cross-Origin Resource Sharing.
- `dotenv`: To manage environment variables.
- `express & @types/express`: Core framework.
- `helmet`: For securing HTTP headers.
- `morgan & @types/morgan`: HTTP request logger.
- `nocache`: To disable client-side caching.
- `swagger-ui-express & @types/swagger-ui-express`: For documenting the API.

## Scripts 📜

- `build`: `npx tsc` - Compiles the TypeScript code.
- `start`: `node dist/server.js` - Starts the built application.
- `dev`: `nodemon src/server.ts` - Runs the application in development mode with hot reloading.
- `create:mvc`: Automates the creation of an MVC structure.

## Exploring `server.ts` 🔬

The server.ts file acts as the backbone of your Express application, orchestrating everything from configuring environment variables to defining middleware and starting the server. Let's break down each section:

### Importing Modules 🛠️

```typescript
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import nocache from "nocache";
import cookieParser from "cookie-parser";
```

- express: The core framework used to build the server.
- dotenv: A module to load environment variables from a .env file into process.env.
- morgan: HTTP request logger middleware for node.js.
- cors: Middleware to enable CORS (Cross-Origin Resource Sharing).
- helmet: Helps secure your apps by setting various HTTP headers.
- nocache: Middleware to disable client-side caching.
- cookieParser: Middleware to parse cookies.

### Environment Variables 💾

```typescript
# Required Environment Variables
PORT=3000                      # The port the server will run on
CLIENT_ORIGIN_URL=            # The allowed origin for CORS
POSTGRES_PASSWORD=            # Database password for PostgreSQL

# Optional Environment Variables (if using)
# Add any additional environment variables your app needs
```

Make sure to create a `.env` file in the root directory with these variables before starting the application.

### Express Application Initialization 🔌

```typescript
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("json spaces", 2);
```

- Creates an Express application instance.
- Configures the app to parse JSON bodies in requests.
- Sets pretty-printing of JSON responses to 2 spaces.

### App Configuration: Middleware 🧰

The template comes with a robust middleware setup for security, logging, and request handling:

```typescript
app.use(helmet()); // HTTP headers security
app.use(nocache()); // Disable client-side caching
app.use(morgan("combined"));
app.use(
    cors({
        origin: CLIENT_ORIGIN_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
        maxAge: 86400,
    }),
);
```

### Error Handling 🚨

The template includes a centralized error handling system:

- Custom error classes for different types of errors
- Error middleware that formats and sends appropriate error responses
- Async wrapper utility to handle promise rejections
- Standardized error responses with proper HTTP status codes

### Graceful Shutdown 🔌

The server includes graceful shutdown handling:

```typescript
process.on("SIGINT", () => {
    // Cleanup operations
    process.exit();
});
```

This ensures that your application can clean up resources (database connections, file handles, etc.) before shutting down.

### Health Check Route ⛑️

```

```
