import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../../config';

const AddQuiz = () => {
  const { internshipId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/quizQuestions/`, {
        questions: [
          ...questions,
          { questionText, options, correctOption }
        ],
        internshipOfferId: internshipId
      });
      // Reset the form for next question
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectOption('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addAnotherQuestion = () => {
    setQuestions([...questions, { questionText, options, correctOption }]);
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectOption('');
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Quiz Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="questionText" className="block font-semibold">Question</label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="mb-2">
            <label htmlFor={`option${index}`} className="block font-semibold">{`Option ${index + 1}`}</label>
            <input
              type="text"
              id={`option${index}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        ))}
        <div className="mb-4">
          <label htmlFor="correctOption" className="block font-semibold">Correct Option</label>
          <input
            type="text"
            id="correctOption"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <button type="button" onClick={addAnotherQuestion} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Add Another Question</button>
        <button type="submit" className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Submit Quiz</button>
      </form>
    </div>
  );
};

export default AddQuiz;
