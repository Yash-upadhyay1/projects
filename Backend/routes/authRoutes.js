// Import express
const express = require("express");
// Create router
const router = express.Router();
// Import controller functions
const { registerUser, loginUser ,logoutUser} = require("../controllers/authController");

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);
// logout route
router.post("/logout", logoutUser);

// Export router
module.exports = router;