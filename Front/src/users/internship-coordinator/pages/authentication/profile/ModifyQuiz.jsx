import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../config';
import { useNavigate, useParams } from 'react-router-dom';

function ModifyQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const offerId = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const accessToken = 'YOUR_ACCESS_TOKEN';
        const response = await axios.get(`${API_URL}/internshipOffers/${offerId}/quizQuestions`, {
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

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuizData = [...quizData];
    updatedQuizData[index][name] = value;
    setQuizData(updatedQuizData);
  };

  const handleAddQuestion = () => {
    setQuizData([...quizData, { question: '', answer: '' }]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuizData = quizData.filter((_, i) => i !== index);
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
        {quizData.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`question-${index}`}>
              Question {index + 1}
            </label>
            <input
              type="text"
              id={`question-${index}`}
              name="question"
              value={question.question}
              onChange={(e) => handleChange(e, index)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`answer-${index}`}>
              Answer
            </label>
            <input
              type="text"
              id={`answer-${index}`}
              name="answer"
              value={question.answer}
              onChange={(e) => handleChange(e, index)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={() => handleRemoveQuestion(index)}
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
