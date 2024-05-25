  const mongoose = require('mongoose');

  const workshopSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    attendees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    meetLink: {
      type: String,
      required: true
    }
  });

  const Workshop = mongoose.model('Workshop', workshopSchema);

  module.exports = Workshop;
