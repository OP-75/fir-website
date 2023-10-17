import React from 'react';
import Modal from 'react-modal';
import './notification.css'; // Import your CSS styles for the notification modal here

Modal.setAppElement('#root'); // Set the root element as the app element for accessibility

export default function NotificationModal({ isOpen, onClose, caseDetails }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="notification-modal"
      overlayClassName="notification-modal-overlay"
    >
      <div className="notification-content">
        <h2>Case Details</h2>
        <p>Case ID: {caseDetails._id}</p>
        <p>Plaintiff's Name: {caseDetails.userName}</p>
        <p>Victim's Name: {caseDetails.victimName}</p>
        <p>Crime Committed: {caseDetails.crimeType}</p>
        <p>City of Crime: {caseDetails.crimeArea}</p>
        <p>Place of Crime: {caseDetails.crimeAddress}</p>
        <p>Time of Incident: {caseDetails.crimeDateTime}</p>
        <p>Assigned Officer's ID: {caseDetails.assignedOfficer}</p>
        <p>Assigned Officer's Name: {caseDetails.assignedOfficerName}</p>
        <p>Case Status: {caseDetails.caseStatus}</p>
        {/* Add more case details as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
}
