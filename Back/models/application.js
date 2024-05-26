const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InternshipOffer',
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  internshipOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InternshipOffer'
  },
  quizResult : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quizResult'
  }
});

// Define the MongoDB model
const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
