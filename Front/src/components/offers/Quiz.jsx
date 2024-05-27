import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Quiz.css";
import { API_URL } from "../../config";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch quiz questions from the API
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_URL}/quizQuestions/internship/${id}`);
        const data = await response.json();
        setQuestions(data);
        setAnswers(data.reduce((acc, _, idx) => ({ ...acc, [idx]: "" }), {}));
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };
    fetchQuestions();
  }, [id]);

  const [reply , setReply]= useState();
  const handleChange = (e, index) => {
    const { value } = e.target;
    setReply(value);
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    const filteredAnswers = Object.fromEntries(
      Object.entries(answers).filter(([_, value]) => value !== "")
    );
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data={
        user:user.userId, 
        internshipOffer:id,
        questionId:questions[0]._id,
        givenAnswer:reply,
        isCorrect:questions[0].correctOption === reply,
      }
      console.log(data);

      const response = await fetch(`${API_URL}/quizResults/quiz-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Quiz submission failed");
      }

      console.log("Quiz results submitted successfully");
      alert("Application Submitted, You will be hearing from us soon");
      navigate("/");
    } catch (error) {
      console.error("Error submitting quiz results:", error);
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
    </section>
  );
};

export default Quiz;
