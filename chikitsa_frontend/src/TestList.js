// TestList.js
import React, { useState, useEffect } from 'react';
import './testList.css';

function TestList({user_id}) {
  const [testList, setTestList] = useState([]);
  const url = 'http://192.168.193.8:8000/';
  const testListUrl = url + 'api/patient/tests/?appointment_id=';

  useEffect(() => {
    fetchTestList();
  }, []);

  const fetchTestList = async () => {
    try {
      const response = await fetch(`${testListUrl}${user_id}`);
      if (response.ok) {
        const jsonData = await response.json();
        const key = Object.keys(jsonData)[0]
        setTestList(jsonData[key]);
      } else {
        console.error('Error fetching test list:', response.status);
      }
    } catch (error) {
      console.error('Error fetching test list:', error);
    }
  };

  return (
    <div className='test-container'>
      <h2>Test List</h2>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Appointment ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Remarks</th>
          <th>Image</th>
        </tr>
        {testList.map((item)=>(
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.appointment_id}</td>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{item.remarks}</td>
            <td>
              {item.img && (
                <a href={test.img} target="_blank" rel="noopener noreferrer">
                  View Image
                </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default TestList;