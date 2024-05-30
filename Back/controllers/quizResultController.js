const asyncHandler = require("express-async-handler");
const QuizResult = require("../models/quizResult");
const User = require("../models/user");

// Get all quiz results
const getQuizResults = asyncHandler(async (req, res) => {
  const quizResults = await QuizResult.find();
  res.json(quizResults);
});

// Get a single quiz result by ID
const getQuizResult = asyncHandler(async (req, res) => {
  const quizResult = await QuizResult.find({ "internId": req.params.id});
  if (!quizResult) {
    return res.status(404).json({ message: "Quiz result not found" });
  }
  res.json(quizResult);
});

// Create a new quiz result
const createQuizResult = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    console.log("Received quiz result data:", data); // Log the received data

    if (!data.user || !data.internshipOffer || !data.answers) {
      throw new Error("Missing required fields");
    }
    const quizResult = {
      internId: data.user,
      internshipOffer: data.internshipOffer,
      score: data.answers.filter(answer => answer.isCorrect).length,
      answers: data.answers,
    };
    const newQuizResult = await QuizResult.create(quizResult);
    console.log("Created new quiz result:", newQuizResult); // Log the created document
    res.status(200).json(newQuizResult);
  } catch (error) {
    console.error("Error creating quiz result:", error); // Log the error
    res.status(500).json({ message: error.message });
  }
});


module.exports = {
  getQuizResults,
  getQuizResult,
  createQuizResult,
};
