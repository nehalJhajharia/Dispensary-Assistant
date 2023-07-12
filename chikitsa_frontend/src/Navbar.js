import React from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import deleteLocalData from './local-data/ClearLocalData';

const Navbar = ({ onPageChange, userType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteLocalData();
    navigate(`/`);
  }

  return (
    <nav className='bg-success'>
      <div className='container-fluid' style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <a href='#'>
            <img src={require('./images/logo.png').default} alt="logo" style={{height:'32px'}} />
          </a>
            <h4 className='mx-2 my-auto text-white navbar-brand'><strong>SVNIT Dispensary</strong></h4>
        </div>

        <div style={{justifyContent:'space-between'}}>
          <button className='btn text-white' href="#" onClick={() => onPageChange('profile')}><strong>Profile</strong></button>
          <button className='btn text-white' href="#" onClick={() => onPageChange('appointments')}><strong>Appointments</strong></button>
          {userType ? (
            <>
              <button className='btn text-white' href="#" onClick={() => onPageChange('medicalHistory')}><strong>Medical History</strong></button>
              <button className='btn text-white' href="#" onClick={() => onPageChange('vaccinationHistory')}><strong>Vaccines</strong></button>
              <button className='btn text-white' href="#" onClick={() => onPageChange('testList')}><strong>Tests</strong></button>
            </>  
          ) : (
          <button className='btn text-white' href="#" onClick={() => onPageChange('all-medicine')}><strong>All Medicines</strong></button>
          )}
          <button className='btn text-white' onClick={handleLogout}>
            <strong>Logout</strong>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;