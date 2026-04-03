import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import prisma from "./utils/prisma";

const app = express();

// 1. CORS CONFIGURATION
// Place this at the very top. The cors() middleware handles OPTIONS 
// automatically for all routes, so we don't need app.options anymore.
const corsOptions = {
  origin: ["http://localhost:3000",
  "https:task-manage-app-frontend.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// 2. MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// 3. HEALTH CHECK / TEST ROUTE
app.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ message: "API working", userCount: users.length });
  } catch (err) {
    res.status(500).json({ message: "DB Connection Error", error: err });
  }
});

// 4. ROUTES
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// 5. GLOBAL ERROR HANDLER
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("SERVER_ERROR:", err.stack);
  
  // Hardcoded headers here as a safety net for crashes
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

export default app;