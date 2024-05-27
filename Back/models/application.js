const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  university: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  aboutYourself: {
    type: String,
    required: true
  },
  internshipOfferId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  supervisionStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  userId: {
    type: String,
    required: true
  },
  quizResult : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizResult'
  }
});

// Define the MongoDB model
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
