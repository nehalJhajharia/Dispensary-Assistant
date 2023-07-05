import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';

const CreateVaccine = () => {
  const [vaccineName, setVaccineName] = useState('');
  const [date, setDate] = useState('');
  const url = 'http://192.168.193.8:8000/';
  const user_uri = url + 'api/patient/create/vaccine/';
  const { user_id } = useContext(UserContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the vaccine data
    // const vaccineData = {
    //   patient_id: user_id,
    //   name: vaccineName,
    //   date: date,
    // };

    const formData = new FormData();
    formData.append('patient_id', user_id);
    formData.append('name', vaccineName);
    formData.append('date', date);

    // Send the data to the server
    try {
      const response = await fetch(`${user_uri}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Vaccine created successfully');
      } else {
        console.log('Failed to create vaccine');
      }
    } catch (error) {
      console.error('Error creating vaccine:', error);
    }
  };

  return (
    <div>
      <h2>Create Vaccine</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="vaccineName">Vaccine Name:</label>
        <input
          type="text"
          id="vaccineName"
          value={vaccineName}
          onChange={(e) => setVaccineName(e.target.value)}
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateVaccine;
