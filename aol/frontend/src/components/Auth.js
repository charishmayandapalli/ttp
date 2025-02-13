import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import supabase from "../supabaseClient";
import logo from "../assets/logo.png";
import indiaFlag from "../assets/india.png";
import languageIcon from "../assets/lang.jpg";

const Auth = () => {
  const navigate = useNavigate();
  const [teacherCode, setTeacherCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: teacherCode,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="logo-container">
        <img src={logo} alt="The Art of Living" className="aol-logo" />
      </div>

      <div className="language-container">
        <div className="dropdown-container">
          <img src={indiaFlag} alt="India Flag" className="dropdown-icon" />
          <select className="dropdown">
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
          </select>
        </div>
        <div className="dropdown-container">
          <img src={languageIcon} alt="Language Icon" className="dropdown-icon" />
          <select className="dropdown">
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Teacher Code"
          value={teacherCode}
          onChange={(e) => setTeacherCode(e.target.value)}
          required
        />

        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {showPassword ? (
            <FaEyeSlash className="eye-icon" onClick={togglePasswordVisibility} />
          ) : (
            <FaEye className="eye-icon" onClick={togglePasswordVisibility} />
          )}
        </div>

        {error && <p className="error">{error}</p>}

        <p className="forgot-password" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>

        <button type="submit" className="login-button">LOGIN</button>
        <button className="faq-button">Frequently Asked Questions</button>
      </form>

      <div className="support-container">
        <div className="support-box">
          <p className="support-text">For Any Support</p>
          <hr className="horizontal-line" />
          <p className="contact-info">
            📞 <a href="tel:+918951950850">+91-8951 950 850</a>
            <br /> [10:00 AM - 9:00 PM IST]
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
