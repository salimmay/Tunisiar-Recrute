import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../config';
import { useNavigate, useParams } from 'react-router-dom';

function ModifyQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: offerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const accessToken = 'YOUR_ACCESS_TOKEN';
        const response = await axios.get(`${API_URL}/quizQuestions/internship/${offerId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setQuizData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [offerId]);

  const handleChange = (e, questionIndex, optionIndex = null) => {
    const { name, value } = e.target;
    const updatedQuizData = [...quizData];
    if (optionIndex === null) {
      updatedQuizData[questionIndex][name] = value;
    } else {
      updatedQuizData[questionIndex].options[optionIndex] = value;
    }
    setQuizData(updatedQuizData);
  };

  const handleAddQuestion = () => {
    setQuizData([...quizData, { questionText: '', options: ['', ''], correctOption: '' }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuizData = quizData.filter((_, i) => i !== index);
    setQuizData(updatedQuizData);
  };

  const handleAddOption = (index) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[index].options.push('');
    setQuizData(updatedQuizData);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuizData = [...quizData];
    updatedQuizData[questionIndex].options = updatedQuizData[questionIndex].options.filter((_, i) => i !== optionIndex);
    setQuizData(updatedQuizData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = 'YOUR_ACCESS_TOKEN';
      await axios.put(`${API_URL}/internshipOffers/${offerId}/quizQuestions`, quizData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate(`/ManageInternshipOffer/ModifyOffer/${offerId}`);
    } catch (error) {
      setError(error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Modify Quiz</h1>
      <form onSubmit={handleSubmit}>
        {quizData.map((question, questionIndex) => (
          <div key={questionIndex} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`question-${questionIndex}`}>
              Question {questionIndex + 1}
            </label>
            <input
              type="text"
              id={`question-${questionIndex}`}
              name="questionText"
              value={question.questionText}
              onChange={(e) => handleChange(e, questionIndex)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleChange(e, questionIndex, optionIndex)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Remove Option
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddOption(questionIndex)}
              className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Option
            </button>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`correctOption-${questionIndex}`}>
              Correct Answer
            </label>
            <input
              type="text"
              id={`correctOption-${questionIndex}`}
              name="correctOption"
              value={question.correctOption}
              onChange={(e) => handleChange(e, questionIndex)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={() => handleRemoveQuestion(questionIndex)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Remove Question
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Question
        </button>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModifyQuiz;
