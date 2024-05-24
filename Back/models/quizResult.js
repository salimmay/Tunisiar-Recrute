// models/QuizResult.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  internshipOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InternshipOffer",
  },
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "QuizQuestion",
    required: true,
  },
  givenAnswer: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const quizResultSchema = new Schema({
  internId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  answers: [answerSchema],
});

const QuizResult = mongoose.model("QuizResult", quizResultSchema);
module.exports = QuizResult;
