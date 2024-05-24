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
        const response = await fetch(`${API_URL}/applications`,);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
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
  };

  const handleStatusChangeRequest = (id, newStatus) => {
    setStatusChange({ id, newStatus });
    setConfirmationOpen(true);
  };

  const handleConfirmStatusChange = () => {
    const { id, newStatus } = statusChange;
    const updatedApplications = applications.map((application) =>
      application.id === id ? { ...application, status: newStatus } : application
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
        placeholder="Search by title, status, or department"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-20 p-2 border border-gray-300 rounded-md"
      />
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
                className="mr-100"
                  onClick={(e) => {
                    setOpen(true);
                    setSelectedApplication(application);
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
                className="bg-gray-300 p-3 ml-5  text-gray-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
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
