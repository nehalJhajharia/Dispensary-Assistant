import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Navbar = ({ onPageChange, userType }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-success navbar-dark">
      <div className="container-fluid">
        <a className='navbar-brand me-2'>
          <img src='https://www.svnit.ac.in/conference/frsm2023/hit/svnit_logo.png' alt="logo"
          height="40px" className="navbar-img"></img>
        </a>
        <a className='navbar-brand'>SVNIT Dispensary</a>

        {/* toggle button */}
        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars"></i>
        </button>

        {/* Collapsible wrapper */}
        <div className="collapse navbar-collapse" id='navbarSupportedContent'>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <a href="#" className="nav-link" onClick={() => onPageChange('profile')}>Profile</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" onClick={() => onPageChange('appointments')}>Appointments</a>
            </li>
            {userType ? (
              <>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={() => onPageChange('medicalHistory')}>Medical History</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={() => onPageChange('vaccinationHistory')}>Vaccination History</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={() => onPageChange('testList')}>Test List</a>
              </li>
              </>
            ) : (
              <>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={() => onPageChange('all-medicine')}>All Medicines</a>
              </li>
              </>
            )}
            <li className="nav-item">
              <Link to="/login" className='nav-link'>logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;