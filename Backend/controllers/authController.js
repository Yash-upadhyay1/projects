// Import User model to interact with database
const User = require("../models/User");
// Import bcrypt for password hashing
const bcrypt = require("bcryptjs");

// Create register controller function
const registerUser=async (req,res)=>{
    try {
         // Extract data from request body
         const{name,email,password}=req.body;
         // 1️⃣ Check if all fields are provided
         if(!name || !email || !password){
            return res.status(400).json({
                message:"please provide all fields"
            });
         }
          // 2️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
         
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        // 🔐 Generate salt (adds randomness)
        const salt = await bcrypt.genSalt(10);

         // 🔐 Hash password using salt
        const hashedPassword = await bcrypt.hash(password, salt);


        // 3️⃣ Create new user in database
        const newUser=await User.create({
            name,
            email,
            password:hashedPassword // (For now plain text, later we hash it)
        });
         // 4️⃣ Send success response
         // Send success response (never send password back)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
        }
        catch(error){
             // If any error occurs, send server error
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}
    // Login user function
    const LoginUser= async(req,res)=>{
        try {
            // Extract email and password from request body
        const{email,password}=req.body;

        //Validate input 
        if(!email || !password){
        return res.status(400).json({
            message:"please provide email and password"
        });
        }
        // Check if user exists in database
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"invalid credentials"
            });
        }
         // Compare entered password with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        // If everything is correct, send success response
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
        } catch (error) {
             res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }

    }


    // Export controller function
module.exports = {
    registerUser,
    LoginUser
    
    };