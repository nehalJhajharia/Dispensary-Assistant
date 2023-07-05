import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AppointmentDetails = () => {
  const { appointment_id } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const url = 'http://192.168.193.8:8000/';
  const appointmentDetailsURL = url + `api/appointment/get/details/?appointment_id=${appointment_id}`;

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await fetch(`${appointmentDetailsURL}`);
      if (response.ok) {
        const appointmentData = await response.json();
        setAppointmentDetails(appointmentData);
      } else {
        console.error('Error fetching appointment details:', response.status);
      }
    } catch (error) {
      console.error('Error fetching appointment details:', error);
    }
  };

  if (!appointmentDetails) {
    return <div>Loading appointment details...</div>;
  }

  const renderMedicines = (medicines) => {
    if (Array.isArray(medicines) && medicines.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>Medicine ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Morning</th>
              <th>Noon</th>
              <th>Evening</th>
              <th>After Food</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.medicine}</td>
                <td>{medicine.start_date}</td>
                <td>{medicine.end_date}</td>
                <td>{medicine.morning ? 'Yes' : 'No'}</td>
                <td>{medicine.noon ? 'Yes' : 'No'}</td>
                <td>{medicine.evening ? 'Yes' : 'No'}</td>
                <td>{medicine.after_food ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <p>No medicines prescribed.</p>;
  };

  const renderTests = (tests) => {
    if (Array.isArray(tests) && tests.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>Test ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.id}>
                <td>{test.id}</td>
                <td>{test.name}</td>
                <td>{test.date}</td>
                <td>{test.remarks || 'No remarks'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <p>No tests conducted.</p>;
  };

  const renderSymptoms = (symptoms) => {
    if (typeof symptoms === 'object' && symptoms !== null) {
      const symptomEntries = Object.entries(symptoms);

      if (symptomEntries.length > 0) {
        return (
          <table>
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Value</th>
              </tr>
            </thead>  
            <tbody>
              {symptomEntries.map(([symptom, value]) => (
                <tr key={symptom}>
                  <td>{symptom}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
    }

    return <p>No symptoms recorded.</p>;
  };

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <p>No data available.</p>;
      }

      if (value[0].hasOwnProperty('medicine')) {
        return renderMedicines(value);
      }

      if (value[0].hasOwnProperty('name')) {
        return renderTests(value);
      }
    }

    if (typeof value === 'object' && value !== null) {
      if (value.hasOwnProperty('fever')) {
        return renderSymptoms(value);
      }

      return (
        <ul>
          {Object.entries(value).map(([key, val]) => (
            <li key={key}>
              <strong>{key}:</strong> {val}
            </li>
          ))}
        </ul>
      );
    }

    return value;
  };

  return (
    <div style={{ overflow: 'auto', maxHeight: '100vh' }}>
      <h2>Appointment Details</h2>
      <table>
        <tbody>
          {Object.entries(appointmentDetails).map(([key, value]) => (
            <tr key={key}>
              <td>{key}:</td>
              <td>{renderValue(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentDetails;
