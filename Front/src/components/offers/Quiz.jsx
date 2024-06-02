import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Quiz.css";
import { API_URL } from "../../config";
import axios from "axios";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${API_URL}/quizQuestions/internship/${id}`
        );
        const data = await response.json();
        setQuestions(data);
        setAnswers(data.reduce((acc, _, idx) => ({ ...acc, [idx]: "" }), {}));
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };
    fetchQuestions();
  }, [id]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [index]: value,
    }));
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = {
        user: user.userId,
        internshipOffer: id,
        answers: questions.map((question, index) => ({
          questionId: question._id,
          givenAnswer: answers[index] || "", // Ensure `givenAnswer` is included
          isCorrect: question.correctOption === answers[index],
        })),
      };

      console.log("Submitting quiz data:", data); // Log the data being sent
      const response = await fetch(`${API_URL}/quizResults/quiz-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // include token if needed for authorization
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData); // Log the server response
        throw new Error(
          `Quiz submission failed: ${errorData.message || response.statusText}`
        );
      }
      console.log("Quiz results submitted successfully");
      alert("Application Submitted, You will be hearing from us soon");
      navigate("/");
    } catch (error) {
      console.error("Error submitting quiz results:", error.message);
      alert(
        `There was an error submitting your quiz: ${error.message}. Please try again.`
      );
    }
  };
  return (
    <section className="bg-white pt-20">
      <div className="question-container">
        <h2 className="quiz-title">Quiz</h2>
        <form onSubmit={handleSubmitQuiz}>
          {questions.map((question, index) => (
            <div key={index} className="question-block">
              <p className="question-text">{question.questionText}</p>
              <div className="options-container">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option-block">
                    <input
                      type="radio"
                      id={`option-${index}-${optionIndex}`}
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <label
                      className="option-label"
                      htmlFor={`option-${index}-${optionIndex}`}
                    >
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
    </section>
  );
};

export default Quiz;
