import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onPageChange }) => {
  return (
    <nav className="navbar">
      <img src="https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" alt="logo"
      height="40px" className="navbar-img"></img>
      <button className="navbar-button" onClick={() => onPageChange('appointments')}>
        Appointments
      </button>
      <button className="navbar-button" onClick={() => onPageChange('medicalHistory')}>
        Medical History
      </button>
      <button className="navbar-button" onClick={() => onPageChange('vaccinationHistory')}>
        Vaccination History
      </button>
      <button className="navbar-button" onClick={() => onPageChange('testList')}>
        Test List
      </button>
      <Link to="/login" className='navbar-button'>logout</Link>
    </nav>
  );
};

export default Navbar;