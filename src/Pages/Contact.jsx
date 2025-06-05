import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    sending: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any previous errors when user starts typing
    if (status.error) {
      setStatus({ ...status, error: null });
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ ...status, error: "Name is required" });
      return false;
    }
    if (!formData.email.trim()) {
      setStatus({ ...status, error: "Email is required" });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ ...status, error: "Please enter a valid email address" });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ ...status, error: "Message is required" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus({ sending: true, success: false, error: null });

    try {
      await emailjs.send(
        'service_6cg4vbr',
        'template_ti5c0nb',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        },
        'mVtNqlVudTuh_IHzn'
      );

      setStatus({ sending: false, success: true, error: null });
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
      
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        sending: false,
        success: false,
        error: "Failed to send message. Please try again later."
      });
    }
  };

  return (
    <div className="contact-wrapper">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Name</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder=" "
            rows="5"
          />
          <label>Message</label>
        </div>

        {status.error && (
          <div className="error-message">{status.error}</div>
        )}

        {status.success && (
          <div className="success-message">
            Thank you, {formData.name}! Your message has been sent successfully.
          </div>
        )}

        <button 
          type="submit" 
          className="btn-submit" 
          disabled={status.sending}
        >
          {status.sending ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};

export default Contact;