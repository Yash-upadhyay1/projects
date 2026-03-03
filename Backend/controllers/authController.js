// Import User model to interact with database
const User = require("../models/User");
// Import bcrypt for password hashing
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create register controller function
const registerUser = async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, password } = req.body;
    // 1️⃣ Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "please provide all fields",
      });
    }
    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    // 🔐 Generate salt (adds randomness)
    const salt = await bcrypt.genSalt(10);

    // 🔐 Hash password using salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3️⃣ Create new user in database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // (For now plain text, later we hash it)
    });
    // 4️⃣ Send success response
    // Send success response (never send password back)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    // If any error occurs, send server error
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// Login user function
const loginUser = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    //Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "please provide email and password",
      });
    }
    // Check if user exists in database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }
    // Compare entered password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    // If everything is correct, send success response
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "7d" }, // Expiry
    );

    // Send token inside httpOnly cookie
    res
      .cookie("token", token, {
        httpOnly: true, // JS cannot access cookie
        secure: false, // true in production (HTTPS)
        sameSite: "strict", // Prevent CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        success: true,
      });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
// Logout user
const logoutUser = (req, res) => {
  res
    .clearCookie("token") // Remove JWT cookie
    .status(200)
    .json({ message: "Logged out successfully" });
};

// Export controller function
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
