// TestList.js
import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UrlContext from './context/UrlContext';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext } from './context/UserContext';


function TestList() {
  const [testList, setTestList] = useState([]);
  const [testName , setTestName] = useState('');
  const [allTests, setAllTests] = useState([]);
  const [appointmentId, setAppointmentId] = useState('');
  const [date, setDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const {user_id} = useContext(UserContext);
  const url = useContext(UrlContext);
  const testListUrl = url + 'api/patient/get/all-tests/?patient_id=';
  const user_uri_create = url + 'api/patient/create/test/';
  const user_uri_master = url + 'api/master/get/all-tests/';

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //fetching test list for patient
  useEffect(() => {
    fetchTestList();
  }, []);

  const fetchTestList = async () => {
    try {
      const response = await fetch(`${testListUrl}${user_id}`);
      if (response.ok) {
        const jsonData = await response.json();
        const key = Object.keys(jsonData)[0]
        setTestList(jsonData[key]);
      } else {
        console.error('Error fetching test list:', response.status);
      }
    } catch (error) {
      console.error('Error fetching test list:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('appointment_id', appointmentId);
    formData.append('test_master_id', testName);
    formData.append('date', date);
    formData.append('remarks', remarks);

    // Send the data to the server
    try {
      const response = await fetch(`${user_uri_create}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Test created successfully');
        fetchTestList();
      } else {
        console.log('Failed to create test');
      }
    } catch (error) {
      console.error('Error creating test:', error);
    }
    handleClose();
  };

    //access master of tests
    useEffect(() => {
      fetchTestMaster();
    }, []);
    const fetchTestMaster = async () => {
      try {
        const response = await fetch(`${user_uri_master}`);
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

  return (
    <div>
      <h2 className='mt-3 text-center'>Test List</h2>
      <table className='table table-sm'>
      <tbody>
        <tr>
          <th>Appointment</th>
          <th>Test</th>
          <th>Date</th>
          <th>Remarks</th>
          <th>Details</th>
        </tr>
        {testList.map((item)=>(
          <tr key={item.id}>
            <td>{item.appointment}</td>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{item.remarks}</td>
            <td>{item.details}</td>
          </tr>
        ))}
      </tbody>
      </table>
      
      <button onClick={handleShow} className='mt-3 w-100 mx-auto' style={{position:'relative',}}>Add Test</button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Create Test</strong></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="appointmentId">Appointment ID</label>
              <input
                type="text"
                id="appointmentId"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
                required
              />

              <label htmlFor="name">Test</label>
              <select
                id="testName"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
              >
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

              <button className='mt-4' type="submit">Submit</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TestList;