//MedicalHistory
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UrlContext from './context/UrlContext';
import 'bootstrap/dist/css/bootstrap.css';

function MedicalHistory ({user_id}) {
  const navigate = useNavigate();
  const [medicalData, setMedicalData] = useState([]);
  const url = useContext(UrlContext);
  const user_uri = url + 'api/patient/get/medical-history/?patient_id=';

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      const response = await fetch(`${user_uri}${user_id}`);
      if(response.ok){
        const jsonData = await response.json();
        setMedicalData(jsonData);
      }else{
        console.error('Error fetching medical history:', response.status);
      }
    } catch (error) {
      console.error('Error fetching medical history:', error);
    }
  };

  return (
    <div>
      <h2 className='mt-3 text-center'>Medical History</h2>
      <div>
      <table className='table table-sm'>
        <tbody>
          <h5>Self</h5> 
          <tr>
            <td>Hypertension (Self)</td>
            <td>{medicalData.hypertension_self ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Diabetes (Self)</td>
            <td>{medicalData.diabetes_self ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Allergic Medicine</td>
            <td>{medicalData.allergic_medicine}</td>
          </tr>
          <tr>
            <td>Chronic Disease</td>
            <td>{medicalData.chronic_disease}</td>
          </tr>
          <tr>
            <td>Previous Operation Injury</td>
            <td>{medicalData.prev_operation_injury}</td>
          </tr>
          <br />
          <h5>Father</h5>
          <tr>
            <td>Hypertension (Father)</td>
            <td>{medicalData.hypertension_father ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Diabetes (Father)</td>
            <td>{medicalData.diabetes_father ? 'Yes' : 'No'}</td>
          </tr>
          <br />
          <h5>Mother</h5>
          <tr>
            <td>Hypertension (Mother)</td>
            <td>{medicalData.hypertension_mother ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Diabetes (Mother)</td>
            <td>{medicalData.diabetes_mother ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>
      <button className='mt-3 w-100 mx-auto' style={{position:'relative',}} onClick={() =>
        navigate("/edit-medical-history", {state: medicalData})
      }>Edit</button>
      </div>
    </div>
  );
};

export default MedicalHistory;
