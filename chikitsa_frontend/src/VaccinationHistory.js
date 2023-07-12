import React, { useState, useEffect, useContext } from 'react';
import UrlContext from './context/UrlContext';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import loadUserData from './local-data/UserGet';

const VaccinationHistory = () => {
  const [vaccinationHistoryEntries, setVaccinationHistoryEntries] = useState([]);
  const [vaccineName, setVaccineName] = useState('');
  const [allVaccines, setAllVaccines] = useState([]);
  const [date, setDate] = useState('');
  const user = loadUserData();
  const url = useContext(UrlContext);
  const user_uri = url + 'api/patient/get/vaccines/?patient_id=';
  const user_uri_create = url + 'api/patient/create/vaccine/';
  const user_uri_master = url + 'api/master/get/all-vaccines/';

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //fetching vaccination history for patient
  useEffect(() => {
    fetchVaccinationHistory();
  }, []);

  const fetchVaccinationHistory = async () => {
    try {
      const response = await fetch(`${user_uri}${user.id}`);
      const jsonData = await response.json();
      const key = Object.keys(jsonData)[0];
      setVaccinationHistoryEntries(jsonData[key]);
    } catch (error) {
      console.error('Error fetching vaccination history:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('patient_id', user.id);
    formData.append('vaccine_master_id', vaccineName);
    formData.append('date', date);
    // Send the data to the server
    try {
      const response = await fetch(`${user_uri_create}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Vaccine created successfully');
        fetchVaccinationHistory();
      } else {
        console.log('Failed to create vaccine');
      }
    } catch (error) {
      console.error('Error creating vaccine:', error);
    }
    handleClose();
  };

  //access master of vaccines
  useEffect(() => {
    fetchVaccineMaster();
  }, []);
  const fetchVaccineMaster = async () => {
    try {
      const response = await fetch(`${user_uri_master}`);
      if (response.ok) {
        const jsonData = await response.json();
        setAllVaccines(jsonData);
        console.log(allVaccines);
      } else {
        console.error('Error fetching vaccines master list:', response.status);
      }
    } catch (error) {
      console.error('Error fetching vaccines master list:', error);
    }
  };

  return (
    <div>
      <h2 className='mt-3 text-center'>Vaccination History</h2>
      <table className='table table-sm'>
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {vaccinationHistoryEntries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.date}</td>
              <td>{entry.details}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleShow} className='mt-3 w-100 mx-auto btn btn-success' style={{position:'relative',}}>Add Vaccine</button>

      <Modal size="sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Create Vaccine</strong></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="vaccineName">Vaccine</label>
              <select
                id="vaccineName"
                value={vaccineName}
                onChange={(e) => setVaccineName(e.target.value)}
              >
                <option value="">Select a vaccine</option>
                {allVaccines.map((vaccine) => (
                  <option key={vaccine.id} value={vaccine.id}>
                    {vaccine.name}
                  </option>
                ))}
              </select>

              <label className='mt-3' htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <button className='mt-4 btn btn-success' type="submit">Submit</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VaccinationHistory;
