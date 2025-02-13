import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // For toggle visibility icons
import supabase from "../supabaseClient"; // Import your Supabase client

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [successScreen, setSuccessScreen] = useState(false); // Success message state
  const [errorMessage, setErrorMessage] = useState(""); // For error messages

  const handleSave = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      // Update the password in Supabase
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setErrorMessage(`Error: ${error.message}`);
      } else {
        setSuccessScreen(true); // Show success screen
      }
    } catch (error) {
      setErrorMessage(`Unexpected Error: ${error.message}`);
    }
  };

  if (successScreen) {
    return (
      <div className="success-container">
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="green"
            viewBox="0 0 16 16"
          >
            <path d="M16 8a8 8 0 1 1-16 0 8 8 0 0 1 16 0zM7.292 10.707L4.586 8l-.707.707 3.414 3.414 6.414-6.414L12.707 5l-5.415 5.707z" />
          </svg>
          <h2>Password Updated Successfully</h2>
          <p>You can now log in with your new password.</p>
          <button
            className="reset-button"
            onClick={() => (window.location.href = "/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-container">
      <div className="reset-card">
        {/* Error Message */}
        {errorMessage && <p className="error">{errorMessage}</p>}

        {/* New Password Section */}
        <div className="password-section">
          <h3 className="reset-subtitle">New Password</h3>
          <p className="reset-description">
            Password must contain at least 7 letters and 1 number.
          </p>
          <div className="password-field">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="reset-input"
            />
            <span
              className="toggle-visibility"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        {/* Confirm Password Section */}
        <div className="password-section">
          <h3 className="reset-subtitle">Confirm Password</h3>
          <p className="reset-description">
            Please re-enter your password for confirmation.
          </p>
          <div className="password-field">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="reset-input"
            />
            <span
              className="toggle-visibility"
              onClick={() =>
                setConfirmPasswordVisible(!confirmPasswordVisible)
              }
            >
              {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        {/* Save Button */}
        <button type="submit" className="reset-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
