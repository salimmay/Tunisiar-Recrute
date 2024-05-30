import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../../config";
import ApplicationModal from "./ApplicationModal";

function SupervisorDashboard() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [UserId, setUserId] = useState(null); // Ensure UserId is not initially false
  const [modificationSuccess, setModificationSuccess] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log("Fetched user:", user); // Debug log
        setUserId(user.userId); // Set the user ID state
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchApprovedApplications = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/applications?status=approved`
        );
        console.log("Fetched applications:", response.data); // Debug log
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching approved applications:", error);
      }
    };
    fetchApprovedApplications();
  }, []);

  const handleSupervisionStatusChange = (id, supervisionStatus) => {
    console.log("Status change initiated:", { id, supervisionStatus }); // Debug log
    const selectedApp = applications.find(
      (application) => application._id === id
    );
    if (!selectedApp) {
      console.error("Selected application not found:", id); // Debug log
      return;
    }
    setSelectedApplication({
      ...selectedApp,
      supervisionStatus: supervisionStatus, // Update the supervisionStatus
    });
    setConfirmationOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    console.log("Confirm status change called"); // Debug log
    console.log("Selected application:", selectedApplication); // Debug log
    console.log("UserId:", UserId); // Debug log

    if (selectedApplication && UserId) {
      try {
        console.log("Updating supervision status for:", selectedApplication); // Debug log
        // Update the application's supervisionStatus
        await axios.put(`${API_URL}/applications/${selectedApplication._id}`, {
          supervisionStatus: selectedApplication.supervisionStatus,
        });
        const internID = selectedApplication.userId;
        console.log("Intern ID:", internID); // Debug log
        // Update the supervisor's supervisedInterns array with the intern's userId
        await axios.put(`${API_URL}/users/user/${UserId}`, {
          $push: { supervisedInterns: internID },
        });
        // Update the local state with the updated supervisionStatus
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application._id === selectedApplication._id
              ? {
                  ...application,
                  supervisionStatus: selectedApplication.supervisionStatus,
                }
              : application
          )
        );
        // Set modificationSuccess to true
        setModificationSuccess(true);
      } catch (error) {
        console.error("Error updating supervision status:", error);
      } finally {
        setConfirmationOpen(false);
        setSelectedApplication(null);
      }
    } else {
      console.error("Selected application or UserId is missing."); // Debug log
    }
  };
  useEffect(() => {
    if (modificationSuccess) {
      alert("Modification successful");
      window.location.reload();
    }
  }, [modificationSuccess]);

  const handleCancelStatusChange = () => {
    console.log("Status change cancelled"); // Debug log
    setConfirmationOpen(false);
    setSelectedApplication(null);
  };

  return (
    <div>
      <h1>Approved Applications</h1>
      <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3 w-full">
        {applications.map((application) => (
          <li
            key={application._id}
            className="p-4 border-b border-gray-200 cursor-pointer rounded-md shadow-md hover:shadow-lg"
            onClick={() => {
              setSelectedApplication(application);
              setOpen(true);
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">
                  {application.firstName} {application.lastName}
                </div>
                <div className="text-gray-400">{application.university}</div>
              </div>
              <select
                value={application.supervisionStatus}
                onClick={(e) => e.stopPropagation()} // Prevent the modal from opening when changing the status
                onChange={(e) =>
                  handleSupervisionStatusChange(application._id, e.target.value)
                }
                className="p-2 border border-gray-300 rounded-sm focus:ring-red-500"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approve Supervision</option>
                <option value="rejected">Reject Supervision</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
      {selectedApplication && open && (
        <ApplicationModal
          application={selectedApplication}
          onClose={() => setOpen(false)}
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

export default SupervisorDashboard;
