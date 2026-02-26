// Import mongoose to create schema
const mongoose = require("mongoose");

// Create a schema (structure of user document)
const userSchema=new mongoose.Schema({
//Name field
name:{
    type:String,
    required:true
},
// Email field
    email: {
        type: String,
        required: true,
        unique: true           // No two users can have same email
    },
    // Password field
    password: {
        type: String,
        required: true
    }
},
{
    timestamps:true    // Automatically adds createdAt and updatedAt
}

);

// Create a model from schema
// "User" → collection name will become "users" in MongoDB
const User=mongoose.model("User",userSchema);

// Export model so we can use it in controllers
module.exports = User;