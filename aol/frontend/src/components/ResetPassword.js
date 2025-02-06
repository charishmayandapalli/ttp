import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the access token from the URL
    const hash = window.location.hash; // Example: #access_token=xyz&type=recovery
    console.log("URL Hash:", hash); // Log the hash for debugging

    if (hash && hash.includes("type=recovery")) {
      const params = new URLSearchParams(hash.substring(1)); // Remove the # and parse
      const access_token = params.get("access_token");

      if (access_token) {
        // Authenticate the user with the token
        supabase.auth.setSession({ access_token }).catch((error) => {
          console.error("Error setting session:", error.message);
          setMessage("Error: Unable to authenticate with the provided token.");
        });
      } else {
        setMessage("Invalid or missing access token.");
      }
    } else {
      setMessage("This link is invalid or has expired.");
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      }
    } catch (error) {
      setMessage("An error occurred while resetting the password.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
