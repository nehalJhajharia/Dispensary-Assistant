import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Address from './Address';
import Age from './Age';

const StudentProfile = ({ profileData }) => {
  return (
    <div style={{margin:'5%'}}>
      <div style={{alignItems:'baseline', justifyContent:'flex-start' }}>
        <h4>{(profileData.first_name).toUpperCase()} {(profileData.last_name).toUpperCase()}</h4>
        <strong><p className='text-secondary'>Student</p></strong>
      </div>

      <div>
        <table className='table table-sm'>
          <tbody>
            <tr>
              <td>Admission Number</td>
              <td>{profileData.admission_num}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{Age(profileData.dob)}</td>
            </tr>
            <tr>
              <td>Sex</td>
              <td>{profileData.sex}</td>
            </tr>
            <tr>
              <td>Blood Group</td>
              <td>{profileData.blood_group}</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td>{profileData.mobile_personal}</td>
            </tr>
            <tr>
              <td>Emergency Mobile</td>
              <td>{profileData.mobile_emergency}</td>
            </tr>
            <tr>
              <td>Course</td>
              <td>{profileData.course}</td>
            </tr>
            <tr>
              <td>Hostel </td>
              <td>{profileData.room_num !== '-1' &&(
                <span>{profileData.room_num}, </span>
              )} 
              {profileData.hostel_num_and_name}</td>
            </tr>
            <tr>
              <td>Father's Occupation</td>
              <td>{profileData.father_occupation}</td>
            </tr>
            <tr>
              <td>Father's Mobile</td>
              <td>{profileData.father_mobile}</td>
            </tr>
            <tr>
              <td>Mother's Occupation</td>
              <td>{profileData.mother_occupation}</td>
            </tr>
            <tr>
              <td>Mother's Mobile</td>
              <td>{profileData.mother_mobile}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td><Address profileData={profileData}></Address></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentProfile;