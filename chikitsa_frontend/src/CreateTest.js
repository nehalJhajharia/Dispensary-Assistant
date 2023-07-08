import React, { useContext, useState } from 'react';
import UrlContext from './context/UrlContext';

const CreateTest = () => {
  const [appointmentId, setAppointmentId] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [image, setImage] = useState(null);

  const url = useContext(UrlContext);
  const user_uri = url + 'api/patient/create/test/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('appointment_id', appointmentId);
    formData.append('name', name);
    formData.append('date', date);
    formData.append('remarks', remarks);
    formData.append('image', image);

    // Send the data to the server
    try {
      const response = await fetch(`${user_uri}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Test created successfully');
      } else {
        console.log('Failed to create test');
      }
    } catch (error) {
      console.error('Error creating test:', error);
    }
  };

  return (
    <div>
      <h2>Create Test</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="appointmentId">Appointment ID:</label>
        <input
          type="text"
          id="appointmentId"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
          required
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="remarks">Remarks:</label>
        <textarea
          id="remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        ></textarea>

        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTest;
