const asyncHandler = require('express-async-handler');
const QuizResult = require('../models/quizResult');
const User = require('../models/user');

// Get all quiz results
const getQuizResults = asyncHandler(async (req, res) => {
  const quizResults = await QuizResult.find();
  res.json(quizResults);
});

// Get a single quiz result by ID
const getQuizResult = asyncHandler(async (req, res) => {
  const quizResult = await QuizResult.findById(req.params.id);
  if (!quizResult) {
    return res.status(404).json({ message: 'Quiz result not found' });
  }
  res.json(quizResult);
});

// Create a new quiz result
const createQuizResult = asyncHandler(async (req, res) => {
  const newQuizResult = await QuizResult.create(req.body);
  res.status(201).json(newQuizResult);
});

module.exports = {
  getQuizResults,
  getQuizResult,
  createQuizResult,
};
