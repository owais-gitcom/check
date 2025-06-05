import React, { useState } from "react";
import "./LoginPopup.css";
import ErrorPopup from '../Register/ErrorPopup';

const LoginPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
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
      console.log("Sending login request with:", formData);
      const res = await fetch("http://localhost/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Raw response status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("Parsed JSON response:", result);

      if (result.status === "success") {
        setFormData({ email: "", password: "" });
        setShowError(false);
        onClose();
        window.location.href = result.redirect_url;
      } else {
        setErrorMessage(result.message || "Login failed");
        setShowError(true);
      }
    } catch (err) {
      console.error("Fetch or server error:", err);
      setErrorMessage("Server error or network problem");
      setShowError(true);
    }
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="login-form">
          <button className="close-btn" onClick={onClose}>&times;</button>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
          </form>
        </div>
      </div>

      {showError && (
        <ErrorPopup message={errorMessage} onClose={() => setShowError(false)} />
      )}
    </>
  );
};

export default LoginPopup;
