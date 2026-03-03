// Import express
const express = require("express");

// Create express app FIRST
const app = express();

// Import dotenv
const dotenv = require("dotenv");

// Import database connection
const connectDB = require("./config/db");

// Import cookie parser
const cookieParser = require("cookie-parser");

// Import cors
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");

// Import middleware
const isAuthenticated = require("./middleware/authMiddleware");

// Load environment variables
dotenv.config();

// Connect to DB
connectDB();

// MIDDLEWARES (after app is created)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);

app.get("/api/protected", isAuthenticated, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});