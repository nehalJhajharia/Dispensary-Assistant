import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UrlContext from './context/UrlContext';
import { Modal } from 'react-bootstrap';
import AppointmentDetails from './AppointmentDetails';
import separateDateTime from './SeparateDateTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

const Appointment = ({ appointment , userType}) => {
  const [status, setStatus]  = useState(appointment.status);
  const [updatingStatus, setUpdatingStatus] = useState(true);
  const url = useContext(UrlContext);
  const user_uri = url + 'api/doctor/update/appointment-status/';
  const view_icon = <FontAwesomeIcon icon={faEye} />;
  const check = <FontAwesomeIcon icon={faCheck} />;
  const cross = <FontAwesomeIcon icon={faXmark} />;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getStatus = (status) => {
    let statusText = '';
    let textColor = '';

    if (status === -2) {
      statusText = 'Cancelled';
      textColor = '#c46210'; // Change text color to orange for cancelled status
    } else if (status === -1) {
      statusText = 'Rejected';
      textColor = 'red'; // Change text color to red for rejected status
    } else if (status === 0) {
      statusText = 'Pending';
      textColor = 'blue'; // Change text color to blue for pending status
    } else if (status === 1) {
      statusText = 'Confirmed';
      textColor = 'green'; // Change text color to green for confirmed status
    } else if (status === 2) {
      statusText = 'Completed';
      textColor = 'black'; // Change text color to black for completed status
    } else {
      statusText = 'Unknown';
      textColor = 'gray'; // Change text color to gray for unknown status
    }

    return {
      statusText,
      textColor,
    };
  };

  const handleAppointmentComplete = (status) => {
    if (status == 1) {
      updateAppointmentStatus(2);
    }
    handleClose();
  }

  const updateAppointmentStatus = async (status) => {
    const formData = new FormData();
    formData.append('appointment_id', appointment.id);
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
        setUpdatingStatus(false);
      } else {
        console.error('Error updating appointment status:', response.status);
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };
  const { statusText, textColor } = getStatus(status);

  return (
    <tr>
      <td>{appointment.patient_first_name} {appointment.patient_last_name}</td>
      <td>Dr. {appointment.doctor_first_name} {appointment.doctor_last_name}</td>
      <td>{separateDateTime(appointment.datetime).date}</td>
      <td>{separateDateTime(appointment.datetime).time}</td>
      <td style={{ color: textColor }}>{statusText}</td>
      <td>
        <button onClick={handleShow} className='px-3 py-1 mx-auto btn btn-success' style={{position:'relative'}}>{view_icon}</button>
        <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Appointment Details</strong></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <AppointmentDetails appointment_id={ appointment.id }/>
            <div style={{display:'flex'}}>
              <button className='px-5 py-3 mx-auto btn btn-success' onClick={()=>handleAppointmentComplete(status)}>{check}</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      </td>
        <td>
          {userType === false && appointment.status === 0 && updatingStatus && (
            <div style={{display:'flex'}}>
              <button 
                className='px-3 py-1 btn btn-success' 
                onClick={()=>updateAppointmentStatus(1)}
                >{check}
              </button>
              <button 
                className='px-3 py-1 mx-1 btn btn-danger' 
                onClick={()=>updateAppointmentStatus(-1)}
                >{cross}
              </button>
            </div>
          )}
          {userType === true && (appointment.status === 0 || appointment.status === 1) && updatingStatus && (
            <div style={{display:'flex'}}>
              <button 
                className='px-3 py-1 btn btn-warning' 
                onClick={()=>updateAppointmentStatus(-2)}
                style={{color:'white'}}
                >{cross}
              </button>
            </div>
          )}
      </td>
    </tr>
  );
};

export default Appointment;
