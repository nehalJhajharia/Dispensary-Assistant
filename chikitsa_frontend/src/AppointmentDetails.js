import React, { useState, useEffect, useContext } from 'react';
import UrlContext from './context/UrlContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import getCurrentAppoinment from './local-data/AppointmentGet';
import { convertDate, separateDateTime } from './SeparateDateTime';
import { Modal } from 'react-bootstrap';
import Age from './Age';

const AppointmentDetails = () => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const url = useContext(UrlContext);
  const appointment_id = getCurrentAppoinment();
  const appointmentDetailsURL = url + `api/appointment/get/details/?appointment_id=${appointment_id}`;
  const user_uri_master_test = url + 'api/master/get/all-tests/';
  const user_uri_create_test = url + 'api/patient/create/test/';
  const user_uri_create_med = url + 'api/patient/create/medicine/';
  const user_uri_master_med = url + 'api/master/get/all-medicines/';
  const add_icon = <FontAwesomeIcon icon={faPlus} />;
  const minus_icon = <FontAwesomeIcon icon={faMinus} />;
  const check_icon = <FontAwesomeIcon icon={faCheck} />;
  const [allTests, setAllTests] = useState([]);
  const [date, setDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [testName , setTestName] = useState('');
  const [allMedicines, setAllMedicines] = useState([]);
  const [startDate , setStartDate] = useState('');
  const [endDate , setEndDate] = useState('');
  const [morning , setMorning] = useState('false');
  const [noon , setNoon] = useState('false');
  const [evening , setEvening] = useState('false');
  const [afterFood , setAfterFood] = useState('false');
  const [medName , setMedName] = useState('');

  const [showTest, setShowTest] = useState(false);
  const handleTestClose = () => setShowTest(false);
  const handleTestShow = () => setShowTest(true);
  const [showMed, setShowMed] = useState(false);
  const handleMedClose = () => setShowMed(false);
  const handleMedShow = () => setShowMed(true);

  useEffect(() => {
    fetchTestMaster();
    fetchMedMaster();
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

  const fetchTestMaster = async () => {
    try {
      const response = await fetch(`${user_uri_master_test}`);
      if (response.ok) {
        const jsonData = await response.json();
        setAllTests(jsonData);
        console.log(allTests);
      } else {
        console.error('Error fetching tests master list:', response.status);
      }
    } catch (error) {
      console.error('Error fetching tests master list:', error);
    }
  };

  const fetchMedMaster = async () => {
    try {
      const response = await fetch(`${user_uri_master_med}`);
      if (response.ok) {
        const jsonData = await response.json();
        const data = jsonData[0];
        const key = Object.keys(data)[0]
        setAllMedicines(data[key]);
        console.log('allMedicines here');
        console.log(allMedicines);
      } else {
        console.error('Error fetching medicine list:', response.status);
      }
    } catch (error) {
      console.error('Error fetching medicine list:', error);
    }
  };

  const handleTestSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('appointment_id', appointment_id);
    formData.append('test_master_id', testName);
    formData.append('date', date);
    formData.append('remarks', remarks);

    // Send the data to the server
    try {
      const response = await fetch(`${user_uri_create_test}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Test created successfully');
        fetchAppointmentDetails();
      } else {
        console.log('Failed to create test');
      }
    } catch (error) {
      console.error('Error creating test:', error);
    }
    handleTestClose();
  };

  const handleMedSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('appointment_id', appointment_id);
    formData.append('med_master_id', medName);
    formData.append('start_date', startDate);
    formData.append('end_date', endDate);
    formData.append('morning', morning);
    formData.append('noon', noon);
    formData.append('evening', evening);
    formData.append('after_food', afterFood);

    // Send the data to the server
    try {
      const response = await fetch(`${user_uri_create_med}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Medicine created successfully');
        fetchAppointmentDetails();
      } else {
        console.log('Failed to create medicine');
      }
    } catch (error) {
      console.error('Error creating medicine:', error);
    }
    handleMedClose();
  };

  if (!appointmentDetails) {
    return <div>Loading appointment details...</div>;
  }

  const getStatusString = (status) => {
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

  const renderMedicines = (medicines) => {
    if (Array.isArray(medicines) && medicines.length > 0) {
      return (
        <div>
          <h2 className='text-center'>Medicines</h2>
          <table className='table table-sm'>
            <thead>
              <tr className='text-center'>
                <th>Medicine</th>
                <th>After Food</th>
                <th>Morning</th>
                <th>Noon</th>
                <th>Evening</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr className='text-center' key={medicine.id}>
                  <td>{medicine.name}</td>
                  <td>{medicine.after_food ? 'Yes' : 'No'}</td>
                  <td>{medicine.morning ? 'Yes' : 'No'}</td>
                  <td>{medicine.noon ? 'Yes' : 'No'}</td>
                  <td>{medicine.evening ? 'Yes' : 'No'}</td>
                  <td>{convertDate(medicine.start_date)}</td>
                  <td>{convertDate(medicine.end_date)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan='7'>
                  <button onClick={handleMedShow} className='w-100 btn btn-success'>{add_icon}</button>
                </td>
              </tr>
            </tbody>
            <Modal show={showMed} onHide={handleMedClose}>
              <Modal.Header closeButton>
                <Modal.Title><strong>Add Medicine</strong></Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div>
                  <form onSubmit={handleMedSubmit}>
                    <label htmlFor="medName">Medicine</label>
                    <select
                      id="medName"
                      value={medName}
                      onChange={(e) => setMedName(e.target.value)}>

                      <option value="">Select a medicine</option>
                      {allMedicines.map((med) => (
                        <option key={med.id} value={med.id}>
                          {med.name}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="startDate">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />

                    <label htmlFor="endDate">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />

                    <div className='my-3' style={{ display:'flex', justifyContent:'space-between' }}>
                      <div style={{ display:'grid', placeItems:'center' }}>
                        <label htmlFor="morning">Morning</label>
                        <input 
                          className='form-check-input form-check-input-lg' 
                          type="checkbox" 
                          name="morning" 
                          id="morning"
                          value={morning}
                          onChange={(e) => setMorning(e.target.checked ? 'true' : 'false')}
                        />
                      </div>
                      <div style={{ display:'grid', placeItems:'center' }}>
                        <label htmlFor="noon">Noon</label>
                        <input 
                          className='form-check-input form-check-input-lg' 
                          type="checkbox" 
                          name="noon" 
                          id="noon"
                          value={noon}
                          onChange={(e) => setNoon(e.target.checked ? 'true' : 'false')}
                        />
                      </div>
                      <div style={{ display:'grid', placeItems:'center' }}>
                        <label htmlFor="evening">Evening</label>
                        <input 
                          className='form-check-input form-check-input-lg' 
                          type="checkbox" 
                          name="evening" 
                          id="evening"
                          value={evening}
                          onChange={(e) => setEvening(e.target.checked ? 'true' : 'false')}
                        />
                      </div>
                      <div style={{ display:'grid', placeItems:'center' }}>
                        <label htmlFor="afterFood">After Food</label>
                        <input 
                          className='form-check-input form-check-input-lg' 
                          type="checkbox" 
                          name="afterFood" 
                          id="afterFood"
                          value={afterFood}
                          onChange={(e) => setAfterFood(e.target.checked ? 'true' : 'false')}
                        />
                      </div>
                    </div>

                    <button className='mt-4 btn btn-success' type="submit">Submit</button>
                  </form>
                </div>
              </Modal.Body>
            </Modal>
          </table>
        </div>
      );
    }
    return <p>No medicines prescribed.</p>;
  };

  const renderTests = (tests) => {
    if (Array.isArray(tests) && tests.length > 0) {
      return (
        <div>
          <h2 className='mt-3 text-center'>Tests</h2>
          <table className='table table-sm'>
            <thead>
              <tr className='text-center'>
                <th>Test</th>
                <th>Date</th>
                <th>Remarks</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr className='text-center' key={test.id}>
                  <td>{test.name}</td>
                  <td>{convertDate(test.date)}</td>
                  <td>{test.remarks || 'No remarks'}</td>
                  <td>{test.details}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="4">
                  <button onClick={handleTestShow} className='w-100 btn btn-success'>{add_icon}</button>
                </td>
              </tr>
            </tbody>
            <Modal show={showTest} onHide={handleTestClose}>
              <Modal.Header closeButton>
                <Modal.Title><strong>Add Test</strong></Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div>
                  <form onSubmit={handleTestSubmit}>
                    <label htmlFor="name">Test</label>
                    <select
                      id="testName"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}>

                      <option value="">Select a test</option>
                      {allTests.map((test) => (
                        <option key={test.id} value={test.id}>
                          {test.name}
                        </option>
                      ))}
                    </select>

                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />

                    <label htmlFor="remarks">Remarks</label>
                    <textarea
                      id="remarks"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    ></textarea>

                    <button className='mt-4 btn btn-success' type="submit">Submit</button>
                  </form>
                </div>
              </Modal.Body>
            </Modal>
          </table>
        </div>
      );
    }

    return <p>No tests conducted.</p>;
  };

  const renderSymptoms = (symptoms) => {
    if (typeof symptoms === 'object' && symptoms !== null) {
      const symptomEntries = Object.entries(symptoms);

      if (symptomEntries.length > 0) {
        return (
          <div>
            <h2 className='mt-3 text-center'>Symptoms</h2>
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
          </div>
        );
      }
    }

    return <p>No symptoms recorded.</p>;
  };

  const renderMedHistory = (history) => {
    return (
      <div>
        <h2 className='mt-3 text-center'>Medical History</h2>
        <div>
          <table className='table table-sm'>
            <tbody>
              <h5>Self</h5> 
              <tr>
                <td>Hypertension (Self)</td>
                <td>{history.hypertension_self ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Diabetes (Self)</td>
                <td>{history.diabetes_self ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Allergic Medicine</td>
                <td>{history.allergic_medicine}</td>
              </tr>
              <tr>
                <td>Chronic Disease</td>
                <td>{history.chronic_disease}</td>
              </tr>
              <tr>
                <td>Previous Operation Injury</td>
                <td>{history.prev_operation_injury}</td>
              </tr>
              <br />
              <h5>Father</h5>
              <tr>
                <td>Hypertension (Father)</td>
                <td>{history.hypertension_father ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Diabetes (Father)</td>
                <td>{history.diabetes_father ? 'Yes' : 'No'}</td>
              </tr>
              <br />
              <h5>Mother</h5>
              <tr>
                <td>Hypertension (Mother)</td>
                <td>{history.hypertension_mother ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Diabetes (Mother)</td>
                <td>{history.diabetes_mother ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <>
    <div className='w-100 my-3' style={{ display:'flex', overflow:'hidden', position:'absolute', top:0, left:0, justifyContent:'space-evenly' }}>
      <div>
        <div>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <h2>{appointmentDetails.patient_first_name} {appointmentDetails.patient_last_name}</h2>
            <h3>Dr. {appointmentDetails.doctor_first_name} {appointmentDetails.doctor_last_name}</h3>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <p>{appointmentDetails.sex}</p>
              <p className='mx-3'>{Age(appointmentDetails.dob)}</p>
              <p>({appointmentDetails.blood_group})</p>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <p className='mx-3'>{separateDateTime(appointmentDetails.datetime).time}</p>
              <p>{separateDateTime(appointmentDetails.datetime).date}</p>
            </div>
          </div>
          <p className='text-end' style={{ color: getStatusString(appointmentDetails.status).textColor }}>{getStatusString(appointmentDetails.status).statusText}</p>

          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <p>Diagnosis Duration</p>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <div><button className='btn btn-outline-danger'>{minus_icon}</button></div>
              <button className='mx-3 btn'><h5>{appointmentDetails.diagnosis_duration_days}</h5></button>
              <div><button className='btn btn-outline-success'>{add_icon}</button></div>
            </div>
          </div>
          <div>
            <p>Remarks </p>
            <div className='w-100' style={{ display:'flex', justifyContent:'space-between' }}>
              <textarea 
                type="text" 
                style={{ width:'80%' }}
                >{appointmentDetails.remarks} 
              </textarea>
              <div><button className='px-4 py-2 btn btn-primary'>{check_icon}</button></div>
            </div>
          </div>
        </div>
        <div>{renderMedicines(appointmentDetails.medicines)}</div>
        <div>{renderTests(appointmentDetails.tests)}</div>
      </div>
      <div>{renderMedHistory(appointmentDetails.medical_history)}</div>
      <div>{renderSymptoms(appointmentDetails.symptoms)}</div>
    </div>
    </>
  );  
};

export default AppointmentDetails;
