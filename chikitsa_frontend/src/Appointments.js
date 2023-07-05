import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './appointments.css';

const Appointments = ({ user_id, userType }) => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const url = 'http://192.168.193.8:8000/';
  const patientAppointmentsURL = url + 'api/patient/get/appointments/?patient_id=';
  const doctorAppointmentsURL = url + 'api/doctor/get/appointments/?doctor_id=';

  useEffect(() => {
    fetchAppointmentsList();
  }, []);

  const fetchAppointmentsList = async () => {
    try {
      const response = await fetch(
        userType === true ? `${patientAppointmentsURL}${user_id}` : `${doctorAppointmentsURL}${user_id}`
      );
      if (response.ok) {
        const jsonData = await response.json();
        const key = Object.keys(jsonData)[0];
        setAppointmentsList(jsonData[key]);
      } else {
        console.error('Error fetching appointments list:', response.status);
      }
    } catch (error) {
      console.error('Error fetching appointments list:', error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString();
  };

  return (
    <div>
      <h2>Appointments</h2>
      {userType === true && (
        <Link to={`/create-appointment`} className="create-appointment-button" >
          Create New Appointment
        </Link>      
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Doctor ID</th>
            <th>Date and Time</th>
            <th>Remarks</th>
            <th>Diagnosis Duration (Days)</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsList.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patient}</td>
              <td>{appointment.doctor}</td>
              <td>{formatDateTime(appointment.datetime)}</td>
              <td>{appointment.remarks}</td>
              <td>{appointment.diagnosis_duration_days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
