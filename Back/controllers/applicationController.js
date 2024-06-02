const asyncHandler = require('express-async-handler');
const Application = require('../models/application');
const User = require('../models/user');

// Get all applications
const getApplications = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.query; 
    let applications;
    if (userId) {
      applications = await Application.find({ userId });
    } else {
      applications = await Application.find();
    }
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single application by User ID
const getApplication = asyncHandler(async (req, res) => {
  try {
    console.log('Request received for userId:', req.params.userId);
    const application = await Application.findOne({ userId: req.params.userId });
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new application
const createApplication = asyncHandler(async (req, res) => {
  try {
    // Ensure that both resume and coverLetter are provided
    if (!req.files || !req.files.resume || !req.files.coverLetter) {
      return res.status(400).json({ message: 'Resume and cover letter are required' });
    }
    // Access resume and coverLetter files from req.files
    const resume = req.files.resume;
    const coverLetter = req.files.coverLetter;
    // Create the application with resume and coverLetter buffers
    const newApplication = await Application.create({
      ...req.body,
      resume: resume.data, // Store file buffer
      coverLetter: coverLetter.data // Store file buffer
    });
    res.status(200).json({ message: 'Application created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update an application
const updateApplication = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { supervisionStatus } = req.body;
    const updatedApplication = await Application.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    if (supervisionStatus === 'approved') {
      const supervisor = await User.findById(req.user._id);
      if (!supervisor) {
        return res.status(404).json({ message: 'Supervisor not found' });
      }
      supervisor.supervisedInterns.push(updatedApplication.user);
      await supervisor.save();
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
