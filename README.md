# Express TypeScript Template 🚀

Welcome to the ultimate Express TypeScript Template, designed to jumpstart your backend projects with ease and efficiency! Tailored for developers by developers, this template leverages the power of Express in a TypeScript environment, offering a solid foundation for building robust and scalable applications.

## Introduction

This template serves as a comprehensive starting point for building Express-based applications using TypeScript. It simplifies the setup process, incorporating best practices and common middleware to get you up and running quickly. With a focus on security, performance, and developer experience, it includes everything you need to kick off your project on the right foot.

## Unique Attributes:

- Type Safety: Leveraging TypeScript for a safer, more predictable development experience.
- Pre-configured Middleware: Essential middleware for security, logging, and CORS pre-setup.
- Development Efficiency: Custom scripts to streamline common tasks, from building to running the dev server.

## Getting Started

- Clone the Repository: `git clone https://github.com/your-repo/express_ts_template.git`
- Install Dependencies: Run `npm install` or `yarn` in the project directory.
- Running the Project:
  - For development: `npm run dev` or `yarn dev`
  - For production: Build the project with `npm run build` or `yarn run build` and then start it with `npm run start` or `yarn start`.

## Included Packages 📦

- `bcryptjs & @types/bcryptjs`: For hashing passwords.
- `cors & @types/cors`: To enable Cross-Origin Resource Sharing.
- `dotenv`: To manage environment variables.
- `express & @types/express`: Core framework.
- `helmet`: For securing HTTP headers.
- `morgan & @types/morgan`: HTTP request logger.
- `nocache`: To disable client-side caching.
- `swagger-ui-express & @types/swagger-ui-express`: For documenting the API.

## Scripts 📜

`build`: `npx tsc` - Compiles the TypeScript code.
`start`: `node dist/server.js` - Starts the built application.
`dev`: `nodemon src/server.ts` - Runs the application in development mode with hot reloading.
`create:mvc`: Automates the creation of an MVC structure.

## Exploring `server.ts`

The server.ts file acts as the backbone of your Express application, orchestrating everything from configuring environment variables to defining middleware and starting the server. Let's break down each section:

### Importing Modules

```typescript
import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import nocache from "nocache";
```

- express: The core framework used to build the server.
- dotenv: A module to load environment variables from a .env file into process.env.
- morgan: HTTP request logger middleware for node.js.
- cors: Middleware to enable CORS (Cross-Origin Resource Sharing).
- helmet: Helps secure your apps by setting various HTTP headers.
- nocache: Middleware to disable client-side caching.

### Environment Variables

```typescript
dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error("Missing required environment variables");
}

const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
```

- Initializes environment variables using dotenv.config().
- Checks if the essential environment variables PORT and CLIENT_ORIGIN_URL are set, throwing an error if not.
- Parses the PORT environment variable to an integer and assigns it along with CLIENT_ORIGIN_URL to constants.

### Express Application Initialization

```typescript
const app: Express = express();

app.use(express.json());
app.set("json spaces", 2);
```

- Creates an Express application instance.
- Configures the app to parse JSON bodies in requests.
- Sets pretty-printing of JSON responses to 2 spaces.

### App Configuration: Middleware

```typescript
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
app.use(morgan("combined"));
app.use(nocache());
app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  }),
);
```

- helmet: Applies several middlewares to secure your app by setting various HTTP headers.
- morgan: Logs HTTP requests in the "combined" Apache format.
- nocache: Disables client-side caching to prevent serving stale content.
- cors: Configures Cross-Origin Resource Sharing with the specified origin, allowed methods, headers, and max age for the preflight request.

#### Helmet setup in more detail

`helmet` is a collection of smaller middleware functions that set HTTP response headers. Since browsers have built-in security features controlled by these headers, configuring them properly can help protect your app from various web vulnerabilities. Here’s a breakdown of the configurations shown in the server.ts:

- HTTP Strict Transport Security (HSTS): The hsts setting ensures that browsers only use HTTPS to communicate with your server, preventing SSL stripping attacks. The maxAge parameter defines how long browsers should remember that your site should only be accessed using HTTPS.

- Content Security Policy (CSP): By setting the contentSecurityPolicy, you define which dynamic resources are allowed to load. It helps prevent a wide range of attacks, including Cross-Site Scripting (XSS) and data injection. In the example, useDefaults: false disables the default policies, and custom directives are provided, essentially disallowing all sources by default ("default-src": ["'none'"]) and preventing the site from being framed ("frame-ancestors": ["'none'"]).

- X-Frame-Options: The frameguard setting controls whether your content can be embedded in other sites. Setting the action to deny prevents anyone from framing your site, which helps mitigate clickjacking attacks.

#### Cors setup in more detail

`cors` is a middleware that enables you to specify how your Express app should handle requests made from different origins. "Origin" here refers to the combination of protocol (HTTP/HTTPS), domain (or IP), and port from which a web page is served. CORS policies are a security feature enforced by browsers to prevent malicious websites from making requests to another domain without permission. Here’s what the configuration in the server.ts does:

- origin: Specifies which domains are allowed to access your resources. Setting it to CLIENT_ORIGIN_URL means only requests from this origin will be allowed. This is crucial for preventing unauthorized access to your API from other websites.

- methods: Defines which HTTP methods are allowed when accessing the resource. In this case, only GET requests are permitted, which might be restrictive for an API but is set for demonstration purposes.

- allowedHeaders: Lists the headers that can be included in requests made to the API. This example allows Authorization for authentication tokens and Content-Type to specify the media type of the request.

- maxAge: Indicates how long the results of a preflight request (which checks the CORS settings before sending the actual request) can be cached. The value is in seconds. Setting it to 86400 allows browsers to cache the preflight response for a day, reducing the need for preflight requests for subsequent requests.

### Health Check Route

```typescript
app.get("/", (req, res) => {
  res.json({
    message: "🎉 Express is running and healthy",
  });
});
```

- Defines a simple GET route at the root (/) that responds with a JSON message indicating the server is running and healthy.

### Guard Route

```typescript
app.use((req, res, next) => {
  const error = {
    status: 404,
    message: "Route not found",
  };

  next(error);
});
```

- A middleware that catches any requests that don't match the defined routes and responds with a 404 error.

### Starting the Server

```typescript
async function startServer() {
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
}

startServer();
```

- Defines an asynchronous function startServer to start the Express server on the specified port.
- Uses app.listen() to bind and listen for connections on the defined port.
- This file effectively sets up the server with security best practices, logging, CORS configuration, and a basic health check route. It ensures a solid starting point for further development and expansion of routes and functionalities within the Express application.

## Contributing

We welcome contributions! If you're looking to improve the template or add new features, please fork the repository and submit a pull request. Ensure your changes are well-documented and follow the existing code style.
