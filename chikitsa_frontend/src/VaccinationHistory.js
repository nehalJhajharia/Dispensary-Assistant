import React, { useState, useEffect } from 'react';
import './vaccinationHistory.css';
import { Link } from 'react-router-dom';

const VaccinationHistory = ({ user_id }) => {
  const [vaccinationHistoryEntries, setVaccinationHistoryEntries] = useState([]);
  const url = 'http://192.168.193.8:8000/';
  const user_uri = url + 'api/patient/get/vaccines/?patient_id=';

  useEffect(() => {
    fetchVaccinationHistory();
  }, []);

  const fetchVaccinationHistory = async () => {
    try {
      const response = await fetch(`${user_uri}${user_id}`);
      const jsonData = await response.json();
      const key = Object.keys(jsonData)[0];
      setVaccinationHistoryEntries(jsonData[key]);
    } catch (error) {
      console.error('Error fetching vaccination history:', error);
    }
  };

  return (
    <div className='vaccination-history-container'>
      <h3>Vaccination History Entry</h3>
      <Link to={`/create-vaccine`} className='create-vaccine-button'>Add Vaccine</Link>
      <table className='vaccination-history-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Vaccine Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {vaccinationHistoryEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.patient}</td>
              <td>{entry.name}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VaccinationHistory;
