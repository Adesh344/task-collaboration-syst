const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const globalErrorHandler = require("./middlewares/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// Body parser
app.use(express.json({ limit: "10kb" }));

// Inject socket.io into req
app.use((req, res, next) => {
  req.io = app.get("io");
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/analytics", analyticsRoutes);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// 404
app.use((req, res) => res.status(404).json({ success: false, message: "Route not found" }));

// Global error handler
app.use(globalErrorHandler);

module.exports = app;