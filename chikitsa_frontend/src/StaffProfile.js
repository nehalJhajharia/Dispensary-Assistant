import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Address from './Address';
import Age from './Age';

const StaffProfile = ({ profileData }) => {
  return (
    <div style={{margin:'1%'}}>
      <div style={{ alignItems:'baseline', justifyContent:'flex-start' }}>
        <h4>{(profileData.first_name).toUpperCase()} {(profileData.last_name).toUpperCase()} </h4>
        <strong><p className='text-secondary'>{profileData.staff_or_relative ? 'STAFF' : 'RELATIVE'}</p></strong>
      </div>

      <div>
        <table className='table table-sm'>
          <tbody>
            <tr>
              <td>Employee Code</td>
              <td>{profileData.employee_code}</td>
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
              <td>Personal Mobile</td>
              <td>{profileData.mobile_personal}</td>
            </tr>
            <tr>
              <td>Emergency Mobile</td>
              <td>{profileData.mobile_emergency}</td>
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

export default StaffProfile;
