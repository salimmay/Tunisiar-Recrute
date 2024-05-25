import React, { useEffect, useRef, useState } from 'react';
import API from '../../../../../service/api';

function ApplicationModal({ application, onClose }) {
  const [quizResults, setQuizResults] = useState(null);
  const [status, setStatus] = useState(application.status);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const response = await API.get(`/quizResults/${application.id}`);
        setQuizResults(response.data);
      } catch (error) {
        setQuizResults(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, [application.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div
        ref={modalRef}
        className="bg-white w-3/4 h-full shadow-xl transform transition-transform translate-x-full sm:translate-x-0 sm:w-full sm:max-w-2xl"
        role="dialog"
        aria-modal="true"
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-5 bg-gray-50 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Application Details</h3>
          </div>
          <div className="px-4 py-5 sm:p-6 flex-1 overflow-y-auto">
            <p className="text-sm text-gray-500">First Name: {application.firstName}</p>
            <p className="text-sm text-gray-500">Last Name: {application.lastName}</p>
            <p className="text-sm text-gray-500">Email: {application.email}</p>
            <p className="text-sm text-gray-500">University: {application.university}</p>
            <p className="text-sm text-gray-500">Phone Number: {application.phoneNumber}</p>
            <p className="text-sm text-gray-500">Cover Letter: {application.coverLetter}</p>
            <p className="text-sm text-gray-500">Resume: {application.resume}</p>
            <p className="text-sm text-gray-500">About Yourself: {application.aboutYourself}</p>
            <p className="text-sm text-gray-500">Status: {status}</p>
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700">Quiz Results</h4>
              {quizResults ? (
                <div className="text-sm text-gray-500">Score: {quizResults.quizScore}</div>
              ) : (
                <div className="text-sm text-gray-500">No quiz results found.</div>
              )}
            </div>
          </div>
          <div className="px-4 py-4 bg-gray-50 sm:px-6">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationModal;
