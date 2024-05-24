const asyncHandler = require('express-async-handler');
const Application = require('../models/application');

// Get all applications
const getApplications = asyncHandler(async (req, res) => {
  try {
    const { user } = req.query;
    let applications;
    if (user) {
      applications = await Application.find({ user });
    } else {
      applications = await Application.find();
    }
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single application by ID
const getApplication = asyncHandler(async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new application
const createApplication = asyncHandler(async (req, res) => {
  try {
    const newApplication = await Application.create(req.body);
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an application
const updateApplication = asyncHandler(async (req, res) => {
  try {
    const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application updated', updatedApplication });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an application
const deleteApplication = asyncHandler(async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all pending applications
const getPendingApplications = asyncHandler(async (req, res) => {
  try {
    const pendingApplications = await Application.find({ status: 'pending' });
    res.json(pendingApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
  getPendingApplications
};
