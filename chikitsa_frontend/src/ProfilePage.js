import React, { useState } from 'react';
import Navbar from './Navbar';
import ProfileSidebar from './ProfileSidebar';
import Appointments from './Appointments';
import MedicalHistory from './MedicalHistory';
import VaccinationHistory from './VaccinationHistory';
import TestList from './TestList';
import Login from './Login';
import './profilePage.css';

const ProfilePage = () => {
  const [currentPage, setCurrentPage] = useState('appointments');
  const user_id = 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'appointments':
        return <Appointments />;
      case 'medicalHistory':
        return <MedicalHistory user_id={user_id}/>;
      case 'vaccinationHistory':
        return <VaccinationHistory />;
      case 'testList':
        return <TestList />;
      case 'logout':
        return <Login />;
      default:
        return <Appointments />;
    }
  };

  return (
    <div className="profile-container">
      <Navbar onPageChange={handlePageChange} />
      <div className="sidebar-appointments-container">
        <div className="sidebar-container">
          <ProfileSidebar user_id={user_id}/>
        </div>
        <div className="appointments-container">
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
