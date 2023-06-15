// VaccinationHistory.js
import React from 'react';
import './vaccinationHistory.css';

const VaccinationHistory = () => {

  const vaccinationHistoryEntries = [
    {
      id: 1,
      patient_id: 1,
      vaccine_name: 'Typhoid',
      date: '2022-01-15',
    },
    {
      id: 2,
      patient_id: 1,
      vaccine_name: 'Hepatitis',
      date: '2022-05-20',
    },
    {
      id: 3,
      patient_id: 1,
      vaccine_name: 'Thalassemia',
      date: '2022-10-10',
    },
    // Add more entries as needed
  ];

  return (
    <div className='vaccination-history-container'>
      <h3>Vaccination History Entry</h3>
      {/* Vaccination history entries */}
      {vaccinationHistoryEntries.map((entry) => (
        <div key={entry.id} className='vaccination-history-entry'>
          <p>Vaccine Name: {entry.vaccine_name}</p>
          <p>Date: {entry.date}</p>
        </div>
      ))}
    </div>
  );
};

export default VaccinationHistory;
