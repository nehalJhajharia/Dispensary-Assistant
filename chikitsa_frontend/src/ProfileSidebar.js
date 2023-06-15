import React, { useEffect, useState } from 'react';
import './profileSidebar.css';

function ProfileSidebar({user_id}) {
  const [profileData, setProfileData] = useState(null);
  const url = 'http://192.168.12.8:8000/';
  const user_uri = url + 'api/user/?id=';

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

  const formatDateAndTime = (dateTimeString) => {
    const dateObj = new Date(dateTimeString);
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString();
    return { formattedDate, formattedTime };
  };

  return (
    <div>
      {profileData ? (
        <div className='profile-sidebar'>
          <div className="header">
          <h2>{profileData.first_name} {profileData.last_name}</h2>
          <p> ({profileData.staff_or_student ? 'Staff' : profileData.patient_or_doc ? 'Student' : 'Doctor' })</p>
          </div>
          <div className="profile-sidebar-content">
          <p> <span>Mobile</span><span>:</span> <span>{profileData.mobile_personal}</span></p>
          {profileData.patient_or_doc && (
            <div>
              <p>Age: {profileData.age}</p>
              <p>Sex: {profileData.sex}</p>
              <p>Blood Group: {profileData.blood_group}</p>
              {profileData.staff_or_student ? (
                <div>
                <p>Employee Code: {profileData.employee_code}</p>
              </div>
              ) : (
                <div>
                  <p>Course: {profileData.course}</p>
                  <p>Admission Number: {profileData.admission_num}</p>
                  <p>Hostel Number and Name: {profileData.hostel_num_and_name}</p>
                  <p>Room Number: {profileData.room_num}</p>
                  <p>Father's Occupation: {profileData.father_occupation}</p>
                  <p>Mother's Occupation: {profileData.mother_occupation}</p>
                  <p>Father's Mobile: {profileData.father_mobile}</p>
                  <p>Mother's Mobile: {profileData.mother_mobile}</p>
                </div>
              )}
            </div>
          )}
          {profileData.staff_or_relative && (
            <div>
              <p>Staff or Relative: Staff</p>
              <p>Employee Code: {profileData.employee_code}</p>
            </div>
          )}
          {profileData.degree && (
            <div>
              <p>Degree: {profileData.degree}</p>
              <p>Specialization: {profileData.specialization}</p>
              <p>Experience: {profileData.experience} years</p>
            </div>
          )}
          <p>Address: {profileData.address_line} {profileData.district} {profileData.state}, {profileData.pincode}</p>
          <p>Registered on: {formatDateAndTime(profileData.datetime_of_reg).formattedDate} {formatDateAndTime(profileData.datetime_of_reg).formattedTime}</p>
        
          </div>
          </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
}

export default ProfileSidebar;