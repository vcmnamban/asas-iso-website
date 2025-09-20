import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Ensure NODE_ENV is set for proper environment detection
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = "development";
    }

    log(`Starting server in ${process.env.NODE_ENV} mode...`);

    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      log(`Error handling request: ${message}`);
      res.status(status).json({ message });
      
      // Only throw in development to see stack traces
      if (process.env.NODE_ENV === "development") {
        throw err;
      }
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (process.env.NODE_ENV === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Use PORT environment variable for production, fallback to 5000 for development
    // In Cloud Run and other production environments, PORT is provided by the platform
    const port = parseInt(process.env.PORT || "5000", 10);
    const host = "0.0.0.0";
    
    // Validate port number
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error(`Invalid port number: ${process.env.PORT}`);
    }
    
    server.listen({
      port,
      host,
      reusePort: process.env.NODE_ENV !== "production",
    }, () => {
      log(`Server serving on ${host}:${port} in ${process.env.NODE_ENV} mode`);
    }).on("error", (err: Error) => {
      log(`Failed to start server: ${err.message}`);
      if (err.message.includes("EADDRINUSE")) {
        log(`Port ${port} is already in use. Please check if another process is running on this port.`);
      }
      process.exit(1);
    });

  } catch (error) {
    log(`Server initialization failed: ${error instanceof Error ? error.message : String(error)}`);
    console.error("Full error details:", error);
    process.exit(1);
  }
})().catch((error) => {
  log(`Unhandled error during server startup: ${error instanceof Error ? error.message : String(error)}`);
  console.error("Full error details:", error);
  process.exit(1);
});
