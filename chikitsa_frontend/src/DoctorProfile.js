import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Address from "./Address";

const DoctorProfile = ({ profileData }) => {
    console.log(profileData);
  return (
    <div style={{margin:'1%'}}>
      <div>
        <h4 className="m-0"> Dr. {profileData.first_name} {profileData.last_name}</h4>
        <p className="m-0"><i>{profileData.specialization}</i></p>
        <p className="m-0">{profileData.degree}</p>
      </div>

      <div>
        <table className="table table-sm">
          <tbody>
          <tr><td></td><td></td></tr>
            <tr>
              <td>Mobile</td>
              <td>{profileData.mobile_personal}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td><Address profileData={profileData} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorProfile;
