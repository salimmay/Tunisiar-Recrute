const asyncHandler = require('express-async-handler');
const QuizQuestion = require('../models/quizQuestion');

const getQuizQuestions = asyncHandler(async (req, res) => {
  try {
    const quizQuestions = await QuizQuestion.find();
    res.json(quizQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

const createQuizQuestions = asyncHandler(async (req, res) => {
  try {
    const internshipOfferId = req.body.internshipOfferId;
    const questions = req.body.questions.map(question => ({
      ...question,
      internshipOffer: internshipOfferId
    }));
    const quizQuestions = await QuizQuestion.insertMany(questions);
    res.status(201).json(quizQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
