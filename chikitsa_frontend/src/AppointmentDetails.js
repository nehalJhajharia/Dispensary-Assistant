import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UrlContext from './context/UrlContext';

const AppointmentDetails = () => {
  const { appointment_id } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const url = useContext(UrlContext);
  const appointmentDetailsURL = url + `api/appointment/get/details/?appointment_id=${appointment_id}`;

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await fetch(`${appointmentDetailsURL}`);
      if (response.ok) {
        const appointmentData = await response.json();
        setAppointmentDetails(appointmentData);
      } else {
        console.error('Error fetching appointment details:', response.status);
      }
    } catch (error) {
      console.error('Error fetching appointment details:', error);
    }
  };

  if (!appointmentDetails) {
    return <div>Loading appointment details...</div>;
  }

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString();
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

  const renderMedicines = (medicines) => {
    if (Array.isArray(medicines) && medicines.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>Medicine ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Morning</th>
              <th>Noon</th>
              <th>Evening</th>
              <th>After Food</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.medicine_master}</td>
                <td>{medicine.start_date}</td>
                <td>{medicine.end_date}</td>
                <td>{medicine.morning ? 'Yes' : 'No'}</td>
                <td>{medicine.noon ? 'Yes' : 'No'}</td>
                <td>{medicine.evening ? 'Yes' : 'No'}</td>
                <td>{medicine.after_food ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return <p>No medicines prescribed.</p>;
  };

  const renderTests = (tests) => {
    if (Array.isArray(tests) && tests.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>Test ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.id}>
                <td>{test.id}</td>
                <td>{test.test_master}</td>
                <td>{test.date}</td>
                <td>{test.remarks || 'No remarks'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <p>No tests conducted.</p>;
  };

  const renderSymptoms = (symptoms) => {
    if (typeof symptoms === 'object' && symptoms !== null) {
      const symptomEntries = Object.entries(symptoms);

      if (symptomEntries.length > 0) {
        return (
          <table>
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Value</th>
              </tr>
            </thead>  
            <tbody>
              {symptomEntries.map(([symptom, value]) => (
                <tr key={symptom}>
                  <td>{symptom}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
    }

    return <p>No symptoms recorded.</p>;
  };

  return (
    <div style={{ overflow: 'auto', maxHeight: '100vh' }}>
      <h2>Appointment Details</h2>
      <table>
        <tbody>
          <tr>
            <td>Date and Time:</td>
            <td>{formatDateTime(appointmentDetails.datetime)}</td>
          </tr>
          <tr>
            <td>Appointment Created At:</td>
            <td>{formatDateTime(appointmentDetails.appointment_created_at)}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{getStatusString(appointmentDetails.status)}</td>
          </tr>
          <tr>
            <td>Remarks:</td>
            <td>{appointmentDetails.remarks}</td>
          </tr>
          <tr>
            <td>Diagnosis Duration (Days):</td>
            <td>{appointmentDetails.diagnosis_duration_days}</td>
          </tr>
          <tr>
            <td>Patient:</td>
            <td>{appointmentDetails.patient}</td>
          </tr>
          <tr>
            <td>Doctor:</td>
            <td>{appointmentDetails.doctor}</td>
          </tr>
          <br></br>
          <tr>
            <td><h4>Symptoms</h4></td>
          </tr>
          <tr>
            <td>{renderSymptoms(appointmentDetails.symptoms)}</td>
          </tr>
          <br></br>
          <tr>
            <td><h4>Medicines</h4></td>
          </tr>
          <tr>
            <td>{renderMedicines(appointmentDetails.medicines)}</td>
          </tr>
          <br></br>
          <tr>
            <td><h4>Tests</h4></td>
          </tr>
          <tr>
            <td>{renderTests(appointmentDetails.tests)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );  
};

export default AppointmentDetails;
