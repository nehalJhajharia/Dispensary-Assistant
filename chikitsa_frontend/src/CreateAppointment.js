import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';

const CreateAppointment = () => {
  const [date, setDate] = useState('');
  const url = 'http://192.168.193.8:8000/';
  const user_uri = url + 'api/patient/create/appointment/';
  const a = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data
    const patientId = a.user_id;
    const doctorId = '1';

    // Create an object with the appointment data
    const appointmentData = {
      patient_id: patientId,
      doctor_id: doctorId,
      datetime: date,
    };

    // Send the data to the server
    try {
      const response = await fetch(`${user_uri}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      })
      .then()
      .catch(Error);
      
      console.log(appointmentData);

      if (response.ok) {
        console.log(response);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAppointment;