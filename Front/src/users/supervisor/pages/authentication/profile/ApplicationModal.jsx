import React, { useState, useEffect } from 'react';
import API from '../../../../../service/api';

function ApplicationModal({ application, onClose }) {
  const [quizResults, setQuizResults] = useState(null);
  const [status, setStatus] = useState(application.status);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusChangeError, setStatusChangeError] = useState(null);

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

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await API.put(`/applications/${application.id}`, { status: newStatus });
      setStatus(response.data.status);
      setStatusChangeError(null); 
    } catch (error) {
      setStatusChangeError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Application Details</h3>
              <div className="mt-2">
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
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Change Status</label>
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                  >
                    <option value="accepted">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  {statusChangeError && <p className="text-sm text-red-500 mt-2">{statusChangeError}</p>}
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Quiz Results</h4>
                  {quizResults ? (
                    <div className="text-sm text-gray-500">Score: {quizResults.quizScore}</div>
                  ) : (
                    <div className="text-sm text-gray-500">No quiz results found.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
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
