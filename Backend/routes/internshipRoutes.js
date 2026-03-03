const express = require("express");
const router = express.Router();

const {
  createInternship,
  getInternships,
  updateInternship,
  deleteInternship
} = require("../controllers/internshipController");

const isAuthenticated = require("../middleware/authMiddleware");
console.log("isAuthenticated:", typeof isAuthenticated);
console.log("createInternship:", typeof createInternship);
console.log("getInternships:", typeof getInternships);

// Protected routes
router.post("/", isAuthenticated, createInternship);
router.get("/", isAuthenticated, getInternships);
router.put("/:id", isAuthenticated, updateInternship);
router.delete("/:id", isAuthenticated, deleteInternship);


module.exports = router;