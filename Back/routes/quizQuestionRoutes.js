const express = require('express');
const {
  getQuizQuestions,
  getQuizQuestion,
  createQuizQuestions,
  updateQuizQuestion,
  deleteQuizQuestion,
  getInternshipQuizQuestion
} = require('../controllers/quizQuestionController');

const router = express.Router();

router.get('/', getQuizQuestions);
router.get('/:id', getQuizQuestion);
router.get('/internship/:id', getInternshipQuizQuestion);
router.post('/quiz-results', createQuizQuestions);
router.put('/:id', updateQuizQuestion);
router.delete('/:id', deleteQuizQuestion);

module.exports = router;
