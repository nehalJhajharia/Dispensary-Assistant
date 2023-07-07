//MedicalHistory
import React, { useState, useEffect, useContext } from 'react';
import './medicalHistory.css';
import UrlContext from './context/UrlContext';

function MedicalHistory ({user_id}) {
  const [medicalData, setMedicalData] = useState([]);
  const {url} = useContext(UrlContext);
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
      <h2>Medical History</h2>
      <div>
      <table>
        <tbody>
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
          <tr>
            <td>Diabetes (Self)</td>
            <td>{String(medicalData.diabetes_self)}</td>
          </tr>
          <tr>
            <td>Diabetes (Mother)</td>
            <td>{String(medicalData.diabetes_mother)}</td>
          </tr>
          <tr>
            <td>Diabetes (Father)</td>
            <td>{String(medicalData.diabetes_father)}</td>
          </tr>
          <tr>
            <td>Hypertension (Self)</td>
            <td>{String(medicalData.hypertension_self)}</td>
          </tr>
          <tr>
            <td>Hypertension (Mother)</td>
            <td>{String(medicalData.hypertension_mother)}</td>
          </tr>
          <tr>
            <td>Hypertension (Mother)</td>
            <td>{String(medicalData.hypertension_father)}</td>
          </tr>
        </tbody>
      </table>  
      </div>
    </div>
  );
};

export default MedicalHistory;
