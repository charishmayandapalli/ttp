//Auth.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa"; // Import icons
import supabase from "../supabaseClient"; // Make sure this path is correct based on where supabaseClient.js is located
import logo from "../assets/logo.png"; // Path to your logo
import indiaFlag from "../assets/india.png"; // Path to the flag image
import languageIcon from "../assets/lang.jpg"; // Path to the language icon

const Auth = () => {
  const navigate = useNavigate();
  const [teacherCode, setTeacherCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);

    // Supabase login
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: teacherCode, // Assuming teacherCode is used as the email
        password: password,
      });

      if (error) {
        setError(error.message); // Show error message if login fails
      } else {
        navigate("/home"); // Navigate to the home page after successful login
      }
    } catch (error) {
      setError(error.message); // Catch unexpected errors
    }
  };

  return (
    <div className="auth-container">
      {/* AOL Logo */}
      <div className="logo-container">
        <img src={logo} alt="The Art of Living" className="aol-logo" />
      </div>

      {/* Country & Language */}
      <div className="language-container">
        {/* Country Dropdown */}
        <div className="dropdown-container">
          <div className="icon-text-box">
            <img src={indiaFlag} alt="India Flag" className="dropdown-icon" />
          
          </div>
          <select className="dropdown">
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
          </select>
        </div>

        {/* Language Dropdown */}
        <div className="dropdown-container">
          <div className="icon-text-box">
            <img src={languageIcon} alt="Language Icon" className="dropdown-icon" />
          </div>
          <select className="dropdown">
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>

      {/* Teacher Code and Password */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <FaUser className="input-icon" /> {/* Teacher Code Icon */}
          <input
            type="text"
            className="input"
            placeholder="Teacher Code"
            value={teacherCode}
            onChange={(e) => setTeacherCode(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <FaLock className="input-icon" /> {/* Password Icon */}
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>
        <button type="submit" className="login-button">
          LOGIN
        </button>
        <button className="faq-button">Frequently Asked Questions</button>
      </form>

      {/* Support Section */}
      <div className="support-container">
        <div className="support-box">
          <p className="support-text">For Any Support</p>
          <hr className="horizontal-line" />
          <p className="contact-info">
            📞 <a href="tel:+918951950850">+91-8951 950 850</a> [10:00 AM - 9:00 PM IST]
          </p>
          <p className="contact-info">
            📧 <a href="mailto:infinityapp@in.artofliving.org">infinityapp@in.artofliving.org</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
