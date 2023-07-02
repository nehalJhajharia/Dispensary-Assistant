import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar';
import Profile from './Profile';
import Appointments from './Appointments';
import MedicalHistory from './MedicalHistory';
import VaccinationHistory from './VaccinationHistory';
import TestList from './TestList';
import Login from './Login';
import AllMedicines from './AllMedicines';
import { UserContext } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.css';
import './profilePage.css';

const ProfilePage = () => {
  const [currentPage, setCurrentPage] = useState('profile');
  const [profileData, setProfileData] = useState(null);
  const url = 'http://192.168.193.8:8000/';
  const user_uri = url + 'api/user/get/?id=';
  const {user_id} = useContext(UserContext);

  useEffect(() => {
    fetchProfileData();
  },[]);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${user_uri}${user_id}`);
      const jsonData = await response.json();
      setProfileData(jsonData);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile profileData={profileData}/>;
      case 'appointments':
        return <Appointments user_id={user_id} userType={profileData && profileData.patient_or_doc}/>;
      case 'medicalHistory':
        return <MedicalHistory user_id={user_id}/>;
      case 'vaccinationHistory':
        return <VaccinationHistory />;
      case 'testList':
        return <TestList user_id={user_id}/>;
      case 'logout':
        return <Login />;
        case 'all-medicine':
          return <AllMedicines/>;
      default:
        return <Profile />;
    }
  };


  return (
<div>

  <div class="container-fluid px-0">
    <div class="row g-0">
    <Navbar onPageChange={handlePageChange} userType={profileData && profileData.patient_or_doc} />
      <div class="col-lg-6 vh-100">
      {renderPageContent()}
      </div>

    </div>
  </div>

</div>

  );
};

export default ProfilePage;
