import React, { useState, useEffect, useContext } from 'react';
import UrlContext from './context/UrlContext';
import { updateAppointmentStatus } from './Appointment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

const AppointmentDetails = ({appointment_id}) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const url = useContext(UrlContext);
  const appointmentDetailsURL = url + `api/appointment/get/details/?appointment_id=${appointment_id}`;
  const check = <FontAwesomeIcon icon={faCheck} />;

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

  const renderMedicines = (medicines) => {
    if (Array.isArray(medicines) && medicines.length > 0) {
      return (
        <table className='table table-sm'>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>After Food</th>
              <th>Morning</th>
              <th>Noon</th>
              <th>Evening</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.after_food ? 'Yes' : 'No'}</td>
                <td>{medicine.morning ? 'Yes' : 'No'}</td>
                <td>{medicine.noon ? 'Yes' : 'No'}</td>
                <td>{medicine.evening ? 'Yes' : 'No'}</td>
                <td>{medicine.start_date}</td>
                <td>{medicine.end_date}</td>
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
        <table className='table table-sm'>
          <thead>
            <tr>
              <th>Test</th>
              <th>Date</th>
              <th>Remarks</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr key={test.id}>
                <td>{test.name}</td>
                <td>{test.date}</td>
                <td>{test.remarks || 'No remarks'}</td>
                <td>{test.details}</td>
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
          <table className='table table-sm'>
            <thead>
              <tr>
                <th>Symptom</th>
                <th>Value</th>
              </tr>
            </thead>  
            <tbody>
              <tr>
                <td>Fever</td>
                <td>{symptoms.fever}</td>
              </tr>
              <tr>
                <td>Recorded Temperature</td>
                <td>{symptoms.recorded === 0 ? 'No' : symptoms.recorded}</td>
              </tr>
              <tr>
                <td>Continuous Fever</td>
                <td>{symptoms.continuous_fever ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Intermittent Fever</td>
                <td>{symptoms.intermittent_fever ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Shivering</td>
                <td>{symptoms.shivering ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Vomiting</td>
                <td>{symptoms.vomiting ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Nausea</td>
                <td>{symptoms.nausea ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Headache</td>
                <td>{symptoms.headache ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Body Pain</td>
                <td>{symptoms.body_pain ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Joint Pain</td>
                <td>{symptoms.joint_pain ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Weakness</td>
                <td>{symptoms.weakness ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Cold</td>
                <td>{symptoms.cold ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Runny Nose</td>
                <td>{symptoms.runny_nose ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Sneezing</td>
                <td>{symptoms.sneezing ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Throat Pain</td>
                <td>{symptoms.throat_pain ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Ear Ache</td>
                <td>{symptoms.ear_ache ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Ear Discharge</td>
                <td>{symptoms.ear_discharge ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Cough</td>
                <td>{symptoms.cough ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Dry Cough</td>
                <td>{symptoms.dry_cough ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Wet Cough</td>
                <td>{symptoms.wet_cough ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Breathlessness</td>
                <td>{symptoms.breathlessness ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Appetite</td>
                <td>{symptoms.appetite ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Abdomen Pain</td>
                <td>{symptoms.abdomen_pain ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Loose Motions</td>
                <td>{symptoms.loose_motions ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Urine Color</td>
                <td>{symptoms.urine_color}</td>
              </tr>
              <tr>
                <td>Other</td>
                <td>{symptoms.other}</td>
              </tr>
            </tbody>
          </table>
        );
      }
    }

    return <p>No symptoms recorded.</p>;
  };

  return (
    <div className='w-100'>
      <table className='table table-sm'>
        <tbody>
          <tr>
            <td>Patient</td>
            <td>{appointmentDetails.patient}</td>
          </tr>
          <tr>
            <td>Doctor</td>
            <td>{appointmentDetails.doctor}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{formatDate(appointmentDetails.datetime)}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{formatTime(appointmentDetails.datetime)} (24-hours)</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{getStatusString(appointmentDetails.status)}</td>
          </tr>
          <tr>
            <td>Diagnosis Duration (Days)</td>
            <td>{appointmentDetails.diagnosis_duration_days}</td>
          </tr>
          <tr>
            <td>Remarks</td>
            <td>{appointmentDetails.remarks}</td>
          </tr>
        </tbody>
      </table>
      <h4>Symptoms</h4>
      <div>{renderSymptoms(appointmentDetails.symptoms)}</div>
      <h4>Medicines</h4>
      <div>{renderMedicines(appointmentDetails.medicines)}</div>
      <h4>Tests</h4>
      <div>{renderTests(appointmentDetails.tests)}</div>
    </div>
  );  
};

export default AppointmentDetails;
