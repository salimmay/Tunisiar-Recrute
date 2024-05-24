import React, { useState, useEffect } from 'react';
import API from '../../../../../service/api';
import ApplicationModal from './ApplicationModal';

function Applications() {
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [statusChange, setStatusChange] = useState({ id: null, status: '' });

  useEffect(() => {
    const fetchAcceptedApplications = async () => {
      try {
        const response = await API.get('/applications?status=accepted');
        setAcceptedApplications(response.data);
        setFilteredApplications(response.data);
      } catch (error) {
        console.error('Error fetching accepted applications:', error);
      }
    };

    fetchAcceptedApplications();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredApplications(
      acceptedApplications.filter((application) => {
        const { firstName = '', lastName = '', department = '', status = '' } = application;
        return (
          firstName.toLowerCase().includes(value) ||
          lastName.toLowerCase().includes(value) ||
          department.toLowerCase().includes(value) ||
          status.toLowerCase().includes(value)
        );
      })
    );
  };

  const handleStatusChangeRequest = (id, status) => {
    setStatusChange({ id, status });
    setConfirmationOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    try {
      await API.put(`/applications/${statusChange.id}`, { status: statusChange.status });
      setAcceptedApplications((prev) =>
        prev.map((application) =>
          application.id === statusChange.id
            ? { ...application, status: statusChange.status }
            : application
        )
      );
      setFilteredApplications((prev) =>
        prev.map((application) =>
          application.id === statusChange.id
            ? { ...application, status: statusChange.status }
            : application
        )
      );
      setConfirmationOpen(false);
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleCancelStatusChange = () => {
    setConfirmationOpen(false);
  };

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    setSelectedApplication(null);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title, status, or department"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-20 p-2 border border-gray-300 rounded-md"
      />
            <h1 className='text-font-bold'>Accepted Applicants</h1>

      <ul>
        {filteredApplications.map((application) => (
          <li
            key={application.id}
            onClick={() => handleApplicationClick(application)}
            className="p-4 border-b border-gray-200 cursor-pointer"
          >
            <div className="flex justify-between">
              <div>
                <div className="font-medium">
                  {application.firstName} {application.lastName}
                </div>
                <div className="font-medium text-gray-400">{application.department}</div>
              </div>
              <div className="text-gray-500">
                <button
                  className="mr-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplicationClick(application);
                  }}
                >
                  Details
                </button>
                <select
                  value={application.status}
                  onChange={(e) =>
                    handleStatusChangeRequest(application.id, e.target.value)
                  }
                  className="w-30 pl-6 rounded-md border-red-300 shadow-sm focus:red-red-500 focus:ring-red-500 sm:text-sm"
                >
                  <option value="Approved">Approve</option>
                  <option value="Rejected">Reject</option>
                </select>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedApplication && (
        <ApplicationModal
          application={selectedApplication}
          open={open}
          onClose={handleModalClose}
        />
      )}
      {confirmationOpen && (
        <div className="confirmation">
          <div className="text-right confirmation-content">
            <p>Are you sure you want to change the status?</p>
            <div className="confirmation-buttons">
              <button
                onClick={handleConfirmStatusChange}
                className="bg-red-600 p-3 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Yes
              </button>
              <button
                onClick={handleCancelStatusChange}
                className="bg-gray-300 p-3 ml-5 text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;
