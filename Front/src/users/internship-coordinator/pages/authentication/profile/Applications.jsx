import React, { useState, useEffect } from "react";
import ApplicationModal from "./ApplicationModal";
import { API_URL } from "../../../../../config";

function ApplicationsDetails() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [statusChange, setStatusChange] = useState({ id: null, newStatus: "" });

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/applications`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApplications(data);
        setFilteredApplications(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); // Call the function to fetch data when component mounts
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterApplications(e.target.value);
  };

  const filterApplications = (term) => {
    const filtered = applications.filter(
      (application) =>
        application.firstName.toLowerCase().includes(term.toLowerCase()) ||
        application.lastName.toLowerCase().includes(term.toLowerCase()) ||
        application.status.toLowerCase().includes(term.toLowerCase()) ||
        application.department.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredApplications(filtered);
  };

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  const handleStatusChangeRequest = (id, newStatus) => {
    setStatusChange({ id, newStatus });
    setConfirmationOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    const { id, newStatus } = statusChange;
    try {
      const response = await fetch(`${API_URL}/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedApplication = await response.json();
      const updatedApplications = applications.map((application) =>
        application._id === id ? updatedApplication : application
      );
      setApplications(updatedApplications);
      setFilteredApplications(
        updatedApplications.filter(
          (application) =>
            application.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.department.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } catch (error) {
      console.error('Error updating application status:', error);
    }
    setConfirmationOpen(false);
  };

  const handleCancelStatusChange = () => {
    setConfirmationOpen(false);
    setStatusChange({ id: null, newStatus: "" });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name, status, or department"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-20 p-2 border border-gray-300 rounded-md"
      />
      <ul>
        {filteredApplications.map((application) => (
          <li
            key={application._id}
            className="p-4 border-b border-gray-200 cursor-pointer rounded-md shadow-md hover:shadow-lg"
            onClick={() => handleApplicationClick(application)}
          >
            <div className="flex justify-between">
              <div>
                <div className="font-medium">
                  {application.firstName} {application.lastName}
                </div>
                <div className="font-medium text-gray-400">{application.department}</div>
              </div>
              <div className="text-gray-500">
                <select
                  value={application.status}
                  onClick={(e) => e.stopPropagation()} // Prevent the modal from opening when changing the status
                  onChange={(e) =>
                    handleStatusChangeRequest(application._id, e.target.value)
                  }
                  className="pl-2 rounded-md border border-gray-300 shadow-sm focus:ring-red-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
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
          setOpen={setOpen}
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

export default ApplicationsDetails;
