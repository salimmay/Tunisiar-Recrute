const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctOption: String,
  internshipOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InternshipOffer",
  },
});

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
