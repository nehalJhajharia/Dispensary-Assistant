import React, { useState, useEffect } from 'react';

const AppointmentDetails = ({ appointment }) => { 
  const appointment_id = 101;
  console.log(appointment);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const url = 'http://192.168.193.8:8000/';
  const appointmentDetailsURL = url + `api/appointment/get/details/?appointment_id=${appointment_id}`;

  useEffect(() => {
    fetchAppointmentDetails();
  },[]);

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


  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <ul>
          {value.map((item) => (
            <li key={item.id}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      );
    }

    if (typeof value === 'object' && value !== null) {
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
    <div style={{overflow:'auto', maxHeight:'100vh'}}>
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