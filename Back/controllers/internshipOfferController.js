const asyncHandler = require("express-async-handler");
const InternshipOffer = require("../models/internshipOffer");

// Get all internship offers
const getInternshipOffers = asyncHandler(async (req, res) => {
  try {
    await InternshipOffer.find({})
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// Get a single internship offer by ID
const getInternshipOffer = asyncHandler(async (req, res) => {
  try {
    const internshipOffer = await InternshipOffer.findById(req.params.id);
    if (!internshipOffer) {
      return res.status(404).json({ message: "Internship offer not found" });
    }
    res.json(internshipOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new internship offer
const createInternshipOffer = asyncHandler(async (req, res) => {
  try {
    const newInternshipOffer = await InternshipOffer.create(req.body);
    res.status(201).json(newInternshipOffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an internship offer
const updateInternshipOffer = asyncHandler(async (req, res) => {
  try {
    const updatedInternshipOffer = await InternshipOffer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInternshipOffer) {
      return res.status(404).json({ message: "Internship offer not found" });
    }
    res.json({ message: "Internship offer updated", updatedInternshipOffer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an internship offer
const deleteInternshipOffer = asyncHandler(async (req, res) => {
  try {
    const deletedInternshipOffer = await InternshipOffer.findByIdAndDelete(
      req.params.id
    );
    if (!deletedInternshipOffer) {
      return res.status(404).json({ message: "Internship offer not found" });
    }
    res.json({ message: "Internship offer deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  getInternshipOffers,
  getInternshipOffer,
  createInternshipOffer,
  updateInternshipOffer,
  deleteInternshipOffer,
};
