import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Navbar = ({ onPageChange, userType }) => {
  return (
    <nav className='bg-success bg-gradient'>
      <div className='container-fluid' style={{display:'flex', justifyContent:'space-between'}}>

        <div>
          <a href='https://www.google.com/'>
            <img src='https://www.svnit.ac.in/conference/frsm2023/hit/svnit_logo.png' alt="logo" height="40px"></img>
          </a>
          <button className='btn navbar-brand'>SVNIT Dispensary</button>
        </div>

        <div style={{justifyContent:'space-between'}}>
          <button className='btn' href="#" onClick={() => onPageChange('profile')}>Profile</button>
          <button className='btn' href="#" onClick={() => onPageChange('appointments')}>Appointments</button>
          {userType ? (
            <>
              <button className='btn' href="#"  onClick={() => onPageChange('medicalHistory')}>Medical History</button>
              <button className='btn' href="#" onClick={() => onPageChange('vaccinationHistory')}>Vaccination History</button>
              <button className='btn' href="#" onClick={() => onPageChange('testList')}>Test List</button>
            </>  
          ) : (
          <button className='btn' href="#" onClick={() => onPageChange('all-medicine')}>All Medicines</button>
          )}
          <button className='btn'>
            <Link to="/login" className='nav-link'>Logout</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;