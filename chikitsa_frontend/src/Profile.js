import React from 'react';

function Profile({profileData}) {
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
              <p>{profileData.degree}</p>
              <p><i>{profileData.specialization}</i></p>
            </div>
          )}
          <p>Address: {profileData.address_line} {profileData.district} {profileData.state}, {profileData.pincode}</p>
          <p>
            <div>
              <p>{profileData.address_line}</p>
              <p>{profileData.district} - {profileData.pincode}</p>
              <p>{profileData.state}</p>
            </div>
          </p>
          </div>
          </div>
      ) : (
        <p>Loading profile data...</p>
      )}
    </div>
  );
}

export default Profile;