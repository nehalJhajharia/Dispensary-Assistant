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
import UrlContext from './context/UrlContext';
import StaffProfile from './StaffProfile';
import StudentProfile from './StudentProfile';
import DoctorProfile from './DoctorProfile';

const ProfilePage = () => {
  const [currentPage, setCurrentPage] = useState('profile');
  const [profileData, setProfileData] = useState(null);
  const url = useContext(UrlContext);
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

  // const renderPageContent = () => {
  //   switch (currentPage) {
  //     case 'profile':
  //       return <Profile profileData={profileData}/>;
  //     case 'appointments':
  //       return <Appointments user_id={user_id} userType={profileData && profileData.patient_or_doc}/>;
  //     case 'medicalHistory':
  //       return <MedicalHistory user_id={user_id}/>;
  //     case 'vaccinationHistory':
  //       return <VaccinationHistory user_id={user_id}/>;
  //     case 'testList':
  //       return <TestList user_id={user_id}/>;
  //     case 'logout':
  //       return <Login />;
  //       case 'all-medicine':
  //         return <AllMedicines/>;
  //     default:
  //       return <Profile />;
  //   }
  // };

  const renderPageContent = () => {

    if (currentPage === 'profile') {
    if (profileData) {
      if (profileData.patient_or_doc & profileData.staff_or_student) {
        return <StaffProfile profileData={profileData} />;
      }else if (profileData.patient_or_doc) {
        return <StudentProfile profileData={profileData} />;
      }else {
        return <DoctorProfile profileData={profileData} />;
      }
    } 
    else {
      return <Profile profileData={profileData} />;
    }

    }else{
      switch (currentPage) {
        case 'appointments':
          return <Appointments user_id={user_id} userType={profileData && profileData.patient_or_doc} />;
        case 'medicalHistory':
          return <MedicalHistory user_id={user_id} />;
        case 'vaccinationHistory':
          return <VaccinationHistory user_id={user_id} />;
        case 'testList':
          return <TestList user_id={user_id} />;
        case 'logout':
          return <Login />;
        case 'all-medicine':
          return <AllMedicines />;
        default:
          return <Profile />;
      }
    }
  };
  

  return (
<div style={{width:'100%',top:'0',left:'0', position:'absolute', overflow:'hidden'}}>
  <div style={{width:'100%',top:'0',left:'0', position:'relative'}}>
    <Navbar onPageChange={handlePageChange} userType={profileData && profileData.patient_or_doc} />
  </div>
  <div className='w-50 mx-auto' style={{position:'relative',}}>
    {renderPageContent()}
  </div>
</div>

  );
};

export default ProfilePage;
