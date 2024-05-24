import React, { useState } from "react";
import "./Quiz.css";

const Quiz = () => {
  const id = "1"; 
  const [questions] = useState([
    {
      questionText: "What does PHP stand for?",
      options: [
        "Personal Home Page",
        "Private Home Page",
        "PHP: Hypertext Preprocessor",
        "Preprocessor Home Page"
      ]
    },
    {
      questionText: "PHP server scripts are surrounded by which delimiters?",
      options: [
        "<script>...</script>",
        "<?php...?>",
        "<&...&>",
        "<?php?>"
      ]
    },
    {
      questionText: "Which version of PHP introduced the try/catch exception handling?",
      options: [
        "PHP 4",
        "PHP 5",
        "PHP 5.3",
        "PHP 7"
      ]
    }
  ]);
  const [answers, setAnswers] = useState({ 0: "", 1: "", 2: "" });

  const handleChange = (e, index) => {
    const { value } = e.target;
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    try {
      console.log("Quiz results:", { internshipOfferId: id, answers });
      // Handle success
      console.log("Quiz results submitted successfully");
    } catch (error) {
      console.error("Error submitting quiz results:", error);
    }
    alert("Application Submitted, You will be hearing from us soon");
    window.location.href = "/";
  };

  return (
    <div className="question-container ">
      <h2 className="question-title">Quiz</h2>
      <form onSubmit={handleSubmitQuiz}>
        {questions.map((question, index) => (
          <div key={index}>
            <p className="question-text">{question.questionText}</p>
            <div className="options-container">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    id={`option-${index}-${optionIndex}`}
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <label className="option-label" htmlFor={`option-${index}-${optionIndex}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="button-container">
          <button className="button-style" type="submit">
            Submit Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quiz;
