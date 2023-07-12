import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './appointments.css';
import Appointment from './Appointment';
import UrlContext from './context/UrlContext';
import loadUserData from './local-data/UserGet';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Appointments = () => {
  const [appointmentsList, setAppointmentsList] = useState([]);
  const url = useContext(UrlContext);
  const user = loadUserData();
  const patientAppointmentsURL = url + 'api/patient/get/appointments/?patient_id=';
  const doctorAppointmentsURL = url + 'api/doctor/get/appointments/?doctor_id=';
  const check_uri = url + 'api/patient/get/standing-appointment/?patient_id=';
  const plus = <FontAwesomeIcon icon={faPlus} />;
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchAppointmentsList();
  }, []);

  const fetchAppointmentsList = async () => {
    try {
      const response = await fetch(
        user.patient_or_doc === true ? `${patientAppointmentsURL}${user.id}` : `${doctorAppointmentsURL}${user.id}`
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

  const handleNewAppointment = async () => {
    try {
      const response = await fetch(`${check_uri}${user.id}`);
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        const appointment_exists = jsonData === true;
        console.log(appointment_exists);

        if (appointment_exists) {
          handleShow();
        } else {
          navigate('/create-appointment');
        }
      } else {
        console.error('Error checking URL:', response.status);
      }
    } catch (error) {
      console.error('Error checking URL:', error);
    }
  };

  return (
    <div>
      <div className='mt-3' style={{display:'flex', justifyContent:'space-between'}}>
        <h2>Appointments</h2>
        {user.patient_or_doc === true && (
        <button 
          className='px-3 btn btn-success' 
          style={{position:'relative', alignItems:'center'}}
          onClick={handleNewAppointment}
          ><strong>{plus} New Appointment</strong>
          </button>    
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointmentsList.map((appointment) => (
            <Appointment key={appointment.id} appointment={appointment} userType={user.patient_or_doc}/>
          ))}
        </tbody>
      </table>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Body>
          <div>
            <p>Standing appointment</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Appointments;
