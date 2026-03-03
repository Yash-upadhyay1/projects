// Import mongoose
const mongoose = require("mongoose");
// Create Internship schema
const internshipSchema =new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
     role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Applied", "Interview", "Rejected", "Selected"],
        default: "Applied"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",     // Reference to User model
        required: true
    }
},
    {
        timestamps:true
    }


);

// Create model
const Internship = mongoose.model("Internship", internshipSchema);

// Export model
module.exports = Internship;