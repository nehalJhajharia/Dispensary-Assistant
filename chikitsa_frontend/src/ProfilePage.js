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
import loadUserData from './local-data/UserGet';
import setPage from './local-data/CurrentPageSet';
import getPage from './local-data/CurrentPageGet';
import saveUserData from './local-data/UserSet';
import CreateAppointment from './CreateAppointment';

const ProfilePage = () => {
  const [currentPage, setCurrentPage] = useState(getPage());
  const [profileData, setProfileData] = useState(null);
  const url = useContext(UrlContext);
  const user_uri = url + 'api/user/get/?id=';
  let {user_id} = useContext(UserContext);

  useEffect(() => {
    const user = loadUserData();
    user_id = user.id;
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
    setPage(page);
    const curr_page = getPage();
    console.log(curr_page);
    setCurrentPage(curr_page);
  };

  const renderPageContent = () => {
    if (currentPage === 'profile') {
      if (profileData) {
        let user = loadUserData();
        user.patient_or_doc = profileData.patient_or_doc;
        saveUserData(user);
        if (profileData.patient_or_doc & profileData.staff_or_student) {
          return (
            <div className='w-50 mx-auto' style={{ position: 'relative' }}>
              <StaffProfile profileData={profileData} />
            </div>);
        } else if (profileData.patient_or_doc) {
          return (
            <div className='w-50 mx-auto' style={{ position: 'relative' }}>
              <StudentProfile profileData={profileData} />
            </div>);
        } else {
          return (
            <div  className='w-50 mx-auto' style={{ position: 'relative' }}>
              <DoctorProfile profileData={profileData} />
              </div>);
        }
      } else {
        return (
          <div className='w-50 mx-auto' style={{ position: 'relative' }}>
            <Profile profileData={profileData} />
          </div>);
      }

    } else {
      switch (currentPage) {
        case 'newAppointment':
          return (
          <div className='w-50 mx-auto' style={{ position: 'relative' }}>
            <CreateAppointment />
          </div>);
        case 'appointments':
          return (
            <div className='w-75 mx-auto' style={{ position: 'relative' }}>
              <Appointments />
            </div>
          );
        case 'medicalHistory':
          return (
          <div className='w-50 mx-auto' style={{ position: 'relative' }}>
            <MedicalHistory />
          </div>);
        case 'vaccinationHistory':
          return (
          <div className='w-50 mx-auto' style={{ position: 'relative' }}>
            <VaccinationHistory />
          </div>);
        case 'testList':
          return (
          <div className='w-50 mx-auto' style={{ position: 'relative' }}>
            <TestList />
          </div>);
        case 'logout':
          return (
          <div className='w-50 mx-auto' style={{ position: 'relative' }}>
            <Login />
          </div>);
        case 'all-medicine':
          return (
          <div className='w-50 mx-auto' style={{ position: 'relative' }}>
            <AllMedicines />
          </div>);
        default:
          return (
          <div  className='w-50 mx-auto' style={{ position: 'relative' }}>
            <Profile />
          </div>);
      }
    }
  };
  

  return (
    <div style={{width:'100%',top:'0',left:'0', position:'absolute', overflow:'hidden'}}>
      <div style={{width:'100%',top:'0',left:'0', position:'relative'}}>
        <Navbar onPageChange={handlePageChange} userType={profileData && profileData.patient_or_doc} />
      </div>
      <div className='w-100 mx-auto' style={{position:'relative',}}>
        {renderPageContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
