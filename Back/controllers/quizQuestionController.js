const asyncHandler = require('express-async-handler');
const QuizQuestion = require('../models/quizQuestion');

// Get all quiz questions
const getQuizQuestions = asyncHandler(async (req, res) => {
  try {
    const quizQuestions = await QuizQuestion.find();
    res.json(quizQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single quiz question by ID
const getQuizQuestion = asyncHandler(async (req, res) => {
  try {
    const quizQuestion = await QuizQuestion.findById(req.params.id);
    if (!quizQuestion) {
      return res.status(404).json({ message: 'Quiz question not found' });
    }
    res.json(quizQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new quiz questions
const createQuizQuestions = asyncHandler(async (req, res) => {
  try {
    const quizQuestions = await QuizQuestion.insertMany(req.body.questions);
    res.status(201).json(quizQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a quiz question
const updateQuizQuestion = asyncHandler(async (req, res) => {
  try {
    const updatedQuizQuestion = await QuizQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuizQuestion) {
      return res.status(404).json({ message: 'Quiz question not found' });
    }
    res.json({ message: 'Quiz question updated', updatedQuizQuestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a quiz question
const deleteQuizQuestion = asyncHandler(async (req, res) => {
  try {
    const deletedQuizQuestion = await QuizQuestion.findByIdAndDelete(req.params.id);
    if (!deletedQuizQuestion) {
      return res.status(404).json({ message: 'Quiz question not found' });
    }
    res.json({ message: 'Quiz question deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  getQuizQuestions,
  getQuizQuestion,
  createQuizQuestions,
  updateQuizQuestion,
  deleteQuizQuestion
};
