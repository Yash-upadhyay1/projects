// Import express library to create server
const express = require("express");

// Import dotenv to use environment variables
const dotenv = require("dotenv");

// Import database connection function
const connectDB = require("./config/db");

// Load environment variables from .env file into process.env
dotenv.config();

// Connect to MongoDB
connectDB();

// Create an express application instance
const app = express();

// Middleware to parse incoming JSON data from requests
app.use(express.json());

// Create a simple GET route for home
app.get("/", (req, res) => {
    // Send response back to client
    res.send("Server is running 🚀");
});

// Define port number from environment variable
// If PORT is not defined in .env, fallback to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});