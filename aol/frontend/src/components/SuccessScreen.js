import React from "react";
import { useNavigate } from "react-router-dom"; 

const SuccessScreen = () => {
  const navigate = useNavigate(); 

  const handleLoginRedirect = () => {
    navigate("/auth"); // Now it correctly navigates to the login page
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="checkmark">&#10004;</div>
        <h2 className="success-message">Password Saved Successfully</h2>
        <button className="login-buttons" onClick={handleLoginRedirect}>
          Login Now &gt;
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
