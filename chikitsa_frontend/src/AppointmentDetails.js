import React, { useState, useEffect } from 'react';

const AppointmentDetails = ({ appointment_id }) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const url = 'http://192.168.193.8:8000/';
  const appointmentDetailsURL = url + `api/appointment/get/details/?appointment_id=${appointment_id}`;

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await fetch(appointmentDetailsURL);
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

  return (
    <div>
      <h2>Appointment Details</h2>
      <table>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{appointmentDetails.id}</td>
          </tr>
          <tr>
            <td>Date and Time:</td>
            <td>{appointmentDetails.datetime}</td>
          </tr>
          <tr>
            <td>Appointment Created At:</td>
            <td>{appointmentDetails.appointment_created_at}</td>
          </tr>
          <tr>
            <td>Remarks:</td>
            <td>{appointmentDetails.remarks}</td>
          </tr>
          <tr>
            <td>Diagnosis Duration (Days):</td>
            <td>{appointmentDetails.diagnosis_duration_days}</td>
          </tr>
          <tr>
            <td>Patient ID:</td>
            <td>{appointmentDetails.patient}</td>
          </tr>
          <tr>
            <td>Doctor ID:</td>
            <td>{appointmentDetails.doctor}</td>
          </tr>
          <tr>
            <td>Symptoms:</td>
            <td>{JSON.stringify(appointmentDetails.symptoms)}</td>
          </tr>
          <tr>
            <td>Medicines:</td>
            <td>{JSON.stringify(appointmentDetails.medicines)}</td>
          </tr>
          <tr>
            <td>Tests:</td>
            <td>
              <ul>
                {appointmentDetails.tests.map((test) => (
                  <li key={test.id}>{test.name}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentDetails;
