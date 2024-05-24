const express = require('express');
const {
  getQuizQuestions,
  getQuizQuestion,
  createQuizQuestions,
  updateQuizQuestion,
  deleteQuizQuestion
} = require('../controllers/quizQuestionController');

const router = express.Router();

router.get('/', getQuizQuestions);
router.get('/:id', getQuizQuestion);
router.post('/', createQuizQuestions);
router.put('/:id', updateQuizQuestion);
router.delete('/:id', deleteQuizQuestion);

module.exports = router;
