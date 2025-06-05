import React from "react";
import "./ErrorPopup.css";

const ErrorPopup = ({ message, onClose }) => {
  return (
    <div className="error-popup">
      <div className="error-popup-content">
        <span className="error-close-btn" onClick={onClose}>&times;</span>
        <h3>Registration Failed</h3>
        <p dangerouslySetInnerHTML={{ __html: message }}></p>
      </div>
    </div>
  );
};

export default ErrorPopup;
