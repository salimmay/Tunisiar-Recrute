const express = require('express');
const {
  getQuizResults,
  getQuizResult,
  createQuizResult
} = require('../controllers/quizResultController');

const router = express.Router();

router.get('/quiz-results', getQuizResults);
router.get('/quiz-results/:id', getQuizResult);
router.post('/quiz-results', createQuizResult);

module.exports = router;
