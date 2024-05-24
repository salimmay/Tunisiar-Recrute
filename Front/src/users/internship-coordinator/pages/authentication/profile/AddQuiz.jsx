import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../config';

const AddQuiz = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/quizQuestions/`, {
        question,
        options,
        correctOption
      });
      console.log(response.data);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Quiz Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block font-semibold">Question</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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
        <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Add Another Question</button>
        <button type="submit" className="ml-10 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Submit Offer</button>
 
      </form>
    </div>
  );
};

export default AddQuiz;
