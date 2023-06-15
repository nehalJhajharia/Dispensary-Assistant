// Home.js
import React from 'react';
import './home.css'; 
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">SVNIT Dispensary</h1>
      <div className="signin-section">
        <h2 className="signin-title">Sign In</h2>
        <Link to="/login" className='signin-link'>Patient Sign In</Link>
        <Link to="/login" className='signin-link'>Doctor Sign In</Link>
      </div>
    </div>
  );
};

export default HomePage;
