const Internship = require("../models/Internship");

// Create internship
const createInternship = async (req, res) => {
  try {
    const { companyName, role, status } = req.body;

    if (!companyName || !role) {
      return res.status(400).json({
        message: "Company name and role are required",
      });
    }

    const internship = await Internship.create({
      companyName,
      role,
      status,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Internship added",
      internship,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get internships
const getInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ user: req.user._id });

    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update internship
const updateInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, role, status } = req.body;

    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found",
      });
    }

    if (internship.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    internship.companyName = companyName || internship.companyName;
    internship.role = role || internship.role;
    internship.status = status || internship.status;

    await internship.save();

    res.status(200).json({
      message: "Internship updated",
      internship,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete internship
const deleteInternship = async (req, res) => {
  try {
    const { id } = req.params;

    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({
        message: "Internship not found",
      });
    }

    if (internship.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await internship.deleteOne();

    res.status(200).json({
      message: "Internship deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createInternship,
  getInternships,
  updateInternship,
  deleteInternship,
};