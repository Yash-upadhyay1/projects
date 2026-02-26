// Import mongoose to connect MongoDB
const mongoose = require("mongoose");

// Create async function to connect database
const connectDB = async () => {
    try {
        // Try connecting using MONGO_URI from .env
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // If connection successful, print database host
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If error occurs, print error
        console.error("Database connection failed:", error.message);

        // Exit process if database fails
        process.exit(1);
    }
};

// Export function so we can use it in server.js
module.exports = connectDB;