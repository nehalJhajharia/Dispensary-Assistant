import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onPageChange, userType }) => {
  return (
    <nav>
      <div>  
        <a href='https://www.google.com/'>
          <img src='https://www.svnit.ac.in/conference/frsm2023/hit/svnit_logo.png' alt="logo"
          height="40px"></img>
        </a>
        <button>SVNIT Dispensary</button>

        <div>
              <button href="#" onClick={() => onPageChange('profile')}>Profile</button>
              <button href="#" onClick={() => onPageChange('appointments')}>Appointments</button>
            {userType ? (
              <>
                <button href="#"  onClick={() => onPageChange('medicalHistory')}>Medical History</button>
                <button href="#" onClick={() => onPageChange('vaccinationHistory')}>Vaccination History</button>
                <button href="#" onClick={() => onPageChange('testList')}>Test List</button>
              </>  
            ) : (
            <button href="#" onClick={() => onPageChange('all-medicine')}>All Medicines</button>
            )}
              <button>
                <Link to="/login" className='nav-link'>logout</Link>
              </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;