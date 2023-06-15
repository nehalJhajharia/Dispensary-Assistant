import React from 'react';
import './medicalHistory.css'

const MedicalHistory = ({user_id}) => {

    const medicalHistoryEntries = [
        {
          patient_id: 1,
          hypertension_self: true,
          hypertension_father: false,
          hypertension_mother: true,
          diabetes_self: true,
          diabetes_father: true,
          diabetes_mother: false,
          prev_operation_injury: 'Yes',
          chronic_disease: 'No',
          allergic_medicine: 'Penicillin',
        },
        // Add more entries as needed
      ];

  return (
    <div className='medical-history-container'>
      {/* Medical history entries */}
      {medicalHistoryEntries.map((entry) => (
      <div key={entry.patient_id} className='medical-history-entry'>
        <h3>Medical History Entry</h3>
        <p>Hypertension (Self): {entry.hypertension_self ? 'Yes' : 'No'}</p>
        <p>Hypertension (Father): {entry.hypertension_father ? 'Yes' : 'No'}</p>
        <p>Hypertension (Mother): {entry.hypertension_mother ? 'Yes' : 'No'}</p>
        <p>Diabetes (Self): {entry.diabetes_self ? 'Yes' : 'No'}</p>
        <p>Diabetes (Father): {entry.diabetes_father ? 'Yes' : 'No'}</p>
        <p>Diabetes (Mother): {entry.diabetes_mother ? 'Yes' : 'No'}</p>
        <p>Previous Operation/Injury: {entry.prev_operation_injury}</p>
        <p>Chronic Disease: {entry.chronic_disease}</p>
        <p>Allergic Medicine: {entry.allergic_medicine}</p>
      </div>
    ))}
    </div>
  );
};

export default MedicalHistory;
