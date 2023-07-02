// Home.js
import React from 'react';
import './home.css'; 
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-container">
      <a>
          <img src='https://www.svnit.ac.in/conference/frsm2023/hit/svnit_logo.png' alt="logo"
          height="100px" className="navbar-img"></img>
        </a>
      <h1 className="home-title">SVNIT Dispensary</h1>
      <div className="signin-section">
        <h2 className="signin-title">Sign Up / Login</h2>
        <Link to="/login" className='signin-link'> Sign Up</Link>
        <Link to="/login" className='signin-link'> Sign In</Link>
      </div>
    </div>
  );
};

export default HomePage;
