const Workshop = require('../models/Workshops');

// Controller for creating a new workshop
const createWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.create(req.body);
    res.status(201).json({ success: true, data: workshop });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Controller for getting all workshops
const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.status(200).json({ success: true, data: workshops });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Controller for getting a single workshop by ID
const getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ success: false, error: 'Workshop not found' });
    }
    res.status(200).json({ success: true, data: workshop });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Controller for updating a workshop by ID
const updateWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!workshop) {
      return res.status(404).json({ success: false, error: 'Workshop not found' });
    }
    res.status(200).json({ success: true, data: workshop });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Controller for deleting a workshop by ID
const deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndDelete(req.params.id);
    if (!workshop) {
      return res.status(404).json({ success: false, error: 'Workshop not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
createWorkshop,
getAllWorkshops,
getWorkshopById,
updateWorkshop,
deleteWorkshop
};