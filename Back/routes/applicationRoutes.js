const express = require('express');
const router = express.Router();
const uploadFiles = require('../middleware/multer');
const {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication
} = require('../controllers/applicationController');

// Define routes
router.get('/', getApplications);
router.get('/:userId', getApplication);
router.post('/', uploadFiles, createApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
