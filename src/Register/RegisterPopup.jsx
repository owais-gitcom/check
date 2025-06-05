import React, { useState } from "react";
import "./RegisterPopup.css";
import ErrorPopup from "./ErrorPopup"; // Import new component

const RegisterPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (result.status === "success") {
        onClose();
        setFormData({ fullname: "", email: "", password: "" });
        setShowError(false);
      } else {
        setErrorMessage(result.message || "Registration failed");
        setShowError(true);
      }
    } catch (err) {
      setErrorMessage("Server error");
      setShowError(true);
    }
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="register-form">
          <button className="close-btn" onClick={onClose}>&times;</button>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>

      {showError && (
        <ErrorPopup message={errorMessage} onClose={() => setShowError(false)} />
      )}
    </>
  );
};

export default RegisterPopup;
