import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UrlContext from './context/UrlContext';

const Appointment = ({ appointment , userType}) => {
  const appointment_id = appointment.id;
  const [status, setStatus]  = useState(appointment.status);
  const url = useContext(UrlContext);
  const user_uri = url + 'api/doctor/update/appointment-status/';

  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
  };
  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString();
  };

  const getStatusString = (status) => {
    if(status === -1){
      return 'Rejected';
    }else if(status === 0){
      return 'Pending';
    }else if(status === 1){
      return 'Confirmed';
    }else if(status === 2){
      return 'Completed';
    }else{
      return 'Unknown';
    }
  };

  const updateAppointmentStatus = async (status) => {
    const formData = new FormData();
    formData.append('appointment_id', appointment_id);
    formData.append('status', status);
    try {
      const response = await fetch(`${user_uri}`,
        {
          method: 'PUT',
          body: formData,
        }
      );
  
      if (response.ok) {
        setStatus(status);
      } else {
        console.error('Error updating appointment status:', response.status);
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  return (
    <tr>
      <td>{appointment.patient}</td>
      <td>{appointment.doctor}</td>
      <td>{formatDate(appointment.datetime)}</td>
      <td>{formatTime(appointment.datetime)}</td>
      <td>{getStatusString(status)}</td>
      <td>
        <Link to={`/appointment-details/${appointment_id}`}>View</Link>
      </td>
      {userType === false && appointment.status === 0 && (
        <td>
          <div style={{display:'flex'}}>
          <button onClick={()=>updateAppointmentStatus(1)}>✓</button>
          <button onClick={()=>updateAppointmentStatus(-1)}>✕</button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default Appointment;
