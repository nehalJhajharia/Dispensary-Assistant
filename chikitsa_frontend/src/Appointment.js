import React from 'react';
import { Link } from 'react-router-dom';

const Appointment = ({ appointment }) => {
  const appointment_id = appointment.id;

  
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString();
  };

  return (
    <tr>
      <td>{appointment.id}</td>
      <td>{appointment.patient}</td>
      <td>{appointment.doctor}</td>
      <td>{formatDateTime(appointment.datetime)}</td>
      <td>{appointment.remarks}</td>
      <td>{appointment.diagnosis_duration_days}</td>
      <td>
        <Link to={`/appointment-details/${appointment_id}`}>View</Link>
      </td>
    </tr>
  );
};

export default Appointment;
