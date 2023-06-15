// TestList.js
import React from 'react';
import './testList.css';

const TestList = () => {

  const testListEntries = [
    {
      id: 1,
      patient_id: 1,
      test_name: 'Blood Test',
      date: '2022-03-10',
      remarks: 'Normal',
      img: 'blood_test.jpg',
    },
    {
      id: 2,
      patient_id: 1,
      test_name: 'X-Ray',
      date: '2022-06-05',
      remarks: 'No abnormalities found',
      img: 'x_ray.jpg',
    },
    // Add more entries as needed
  ];

  return (
    <div className="test-list-container">
      <h3>Test List</h3>
      {/* Medical test history entries */}
      {testListEntries.map((entry) => (
        <div key={entry.id} className="test-list-entry">
          <h4>{entry.test_name}</h4>
          <p>Date: {entry.date}</p>
          <p>Remarks: {entry.remarks}</p>
          <img src={entry.img} alt={entry.test_name} />
        </div>
      ))}
    </div>
  );
};

export default TestList;
