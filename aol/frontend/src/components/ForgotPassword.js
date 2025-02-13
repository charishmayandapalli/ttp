import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import supabase from "../supabaseClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://192.168.3.65:3001/reset-password", // Use your local IP
    });
    
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setEmailSent(true);
    }
  };

  if (emailSent) {
    return (
      <div className="forgot-password-container">
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="green"
            viewBox="0 0 16 16"
          >
            <path d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM7.292 10.707L4.586 8l-.707.707 3.414 3.414 6.414-6.414L12.707 5l-5.415 5.707z" />
          </svg>
          <h2>Email Sent</h2>
          <p>Check your email and open the link we sent to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <p>
        <strong>
          Enter your email and we'll send you a link to reset your password.
        </strong>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="input"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <ul className="info-list">
          <li>Enter your CRM teacher email address.</li>
        </ul>
        <button type="submit" className="submit-button">
          Send Link to mail
        </button>
      </form>
      {message && (
        <p className={`message ${message.includes("Error") ? "error" : ""}`}>
          {message}
        </p>
      )}
      {/* Add onClick to navigate back to login */}
      <button className="back-button" onClick={() => navigate("/auth")}>
        
        Back
      </button>
    </div>
  );
};

export default ForgotPassword;
