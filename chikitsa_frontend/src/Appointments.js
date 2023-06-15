// Appointments.js
import React from 'react';
import './appointments.css';

const Appointments = () => {
  // Fetch the appointment data from the API or backend

  // Sample appointment data
  const appointments = [
    {
      id: 1,
      date: '2023-05-20',
      // Add other appointment details here
    },
    {
      id: 2,
      date: '2023-05-22',
      // Add other appointment details here
    },
    {
      id: 3,
      date: '2023-05-23',
      // Add other appointment details here
    },
    // Add more appointments as needed
  ];

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>
      <div className="appointments-list">
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-item">
            <p>Appointment ID: {appointment.id}</p>
            <p>Date: {appointment.date}</p>
            {/* Add other appointment details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
