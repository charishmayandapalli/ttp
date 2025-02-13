// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Log out logic
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>This is your home page after logging in successfully.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
