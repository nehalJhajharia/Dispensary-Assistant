import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './appointments.css';
import Appointment from './Appointment';
import UrlContext from './context/UrlContext';

const Appointments = ({ user_id, userType }) => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const url = useContext(UrlContext);
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


  return (
    <div>
      <div className='mt-3' style={{display:'flex', justifyContent:'space-between'}}>
        <h2>Appointments</h2>
        {userType === true && (
        <Link to={`/create-appointment`} >
          <button style={{position:'relative', alignItems:'center'}}>New Appointment</button>
        </Link>      
      )}
      </div>
      
      <table className='table table-sm'>
        <thead>
          <tr>
            <th>Patient </th>
            <th>Doctor </th>
            <th>Date </th>
            <th>Time </th>
            <th>Status</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsList.map((appointment) => (
            <Appointment key={appointment.id} appointment={appointment} userType={userType}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
