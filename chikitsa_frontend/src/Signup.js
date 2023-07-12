import React, { useContext, useState } from 'react';
import UrlContext from './context/UrlContext';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState('');
  const [mobilePersonal, setMobilePersonal] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressLine, setAddressLine] = useState(null);
  const [mobileEmergency, setMobileEmergency] = useState('');
  const [dob, setDob] = useState('');
  const [sex, setSex] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [staffOrStudent, setStaffOrStudent] = useState(false);

  const [course, setCourse] = useState('');
  const [admissionNum, setAdmissionNum] = useState('');
  const [hostelNumAndName, setHostelNumAndName] = useState('');
  const [roomNum, setRoomNum] = useState('-1');
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [motherOccupation, setMotherOccupation] = useState('');
  const [fatherMobile, setFatherMobile] = useState('');
  const [motherMobile, setMotherMobile] = useState('');

  const [staffOrRelative, setStaffOrRelative] = useState(true);
  const [employeeCode, setEmployeeCode] = useState('');

  const url = useContext(UrlContext);
  const med_hist_uri = url + 'api/patient/create/medical-history/';
  const staff_uri = url + 'api/patient/create/staff/';
  const student_uri = url + 'api/patient/create/student/';

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Medical History Data object
    const medHistData = new FormData();
    medHistData.append('hypertension_self', 'false');
    medHistData.append('hypertension_self', 'false');
    medHistData.append('hypertension_father', 'false');
    medHistData.append('hypertension_mother', 'false');
    medHistData.append('diabetes_self', 'false');
    medHistData.append('diabetes_father', 'false');
    medHistData.append('diabetes_mother', 'false');
    medHistData.append('prev_operation_injury', 'nil');
    medHistData.append('chronic_disease', 'nil');
    medHistData.append('allergic_medicine', 'nil');

    // Prepare the data object
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('middle_name', middleName);
    formData.append('last_name', lastName);
    formData.append('mobile_personal', mobilePersonal);
    formData.append('patient_or_doc', true);
    formData.append('state', state);
    formData.append('district', district);
    formData.append('pincode', pincode);
    formData.append('address_line', addressLine);
    formData.append('mobile_emergency', mobileEmergency);
    formData.append('dob', dob);
    formData.append('sex', sex);
    formData.append('blood_group', bloodGroup);
    formData.append('staff_or_student', staffOrStudent);

    if (staffOrStudent) {
      formData.append('staff_or_relative', staffOrRelative);
      formData.append('employee_code', employeeCode);
    } else {
      formData.append('course', course);
      formData.append('admission_num', admissionNum);
      formData.append('hostel_num_and_name', hostelNumAndName);
      formData.append('room_num', roomNum);
      formData.append('father_occupation', fatherOccupation);
      formData.append('mother_occupation', motherOccupation);
      formData.append('father_mobile', fatherMobile);
      formData.append('mother_mobile', motherMobile);
    }

    // You can send the userData to the backend for further processing
    console.log(formData);

    // Send the data to the server
    try {
      const response = await fetch(staffOrStudent ? `${staff_uri}` : `${student_uri}`, {
        method: 'POST',
        body: formData,
      })
      .then()
      .catch(Error);
      
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        console.log('This is the response --------------------------');
        medHistData.append('patient_id', jsonData.id);
        console.log(medHistData);
        const user_response = await fetch(`${med_hist_uri}`, {
          method:'POST',
          body: medHistData,
        })
        .then()
        .catch(Error);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error creating patient:', error);
    }
    navigate(`/login`);

    // Reset the form fields
    setFirstName('');
    setMiddleName(null);
    setLastName('');
    setMobilePersonal('');
    setState('');
    setDistrict('');
    setPincode('');
    setAddressLine(null);
    setMobileEmergency('');
    setDob('');
    setSex('');
    setBloodGroup('');
    setStaffOrStudent(false);
    setCourse('');
    setAdmissionNum('');
    setHostelNumAndName('');
    setRoomNum('-1');
    setFatherOccupation('');
    setMotherOccupation('');
    setFatherMobile('');
    setMotherMobile('');
    setStaffOrRelative(true);
    setEmployeeCode('');
  };

  const stateOptions = [
    'Andaman and Nicobar Islands',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu and Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Puducherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal'
  ];

  return (
    <div style={{ width: '100%', top: '0', left: '0', position: 'absolute', overflow: 'hidden' }}>
      <div className='w-50 mx-auto' style={{ position: 'relative' }}>
        <h2 className='mx-auto my-3' style={{ position: 'relative', textAlign:'center' }}>SIGNUP</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-floating my-0'>
            <input
              className='form-control'
              type="text"
              id="first_name"
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              required
            />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className='form-floating my-0'>
            <input
              className='form-control'
              type="text"
              id="middle_name"
              name="middle_name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder='Middle Name'
            />
            <label htmlFor="middle_name">Middle Name</label>
          </div>
          <div className='form-floating my-0'>
            <input
              className='form-control'
              type="text"
              id="last_name"
              name="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last Name'
              required
            />
            <label htmlFor="last_name">Last Name</label>
          </div>
          <div className='form-floating my-0'>
            <input
              className='form-control'
              type="text"
              id="mobile_personal"
              name="mobile_personal"
              value={mobilePersonal}
              onChange={(e) => setMobilePersonal(e.target.value)}
              placeholder='Personal Mobile'
              required
            />
            <label htmlFor="mobile_personal">Personal Mobile</label>
          </div>
          <div className='form-floating my-0'>
            <input
              className='form-control'
              type="text"
              id="mobile_emergency"
              name="mobile_emergency"
              value={mobileEmergency}
              onChange={(e) => setMobileEmergency(e.target.value)}
              placeholder='Emergency Mobile'
              required
            />
            <label htmlFor="mobile_emergency">Emergency Mobile</label>
          </div>
          <div className='form-floating mb-3'>
            <select
              className='form-control'
              id="state"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Select State</option>
              {stateOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label htmlFor="state">State</label>
          </div>
          <div className='form-floating my-0'>
            <input
              className='form-control'
              type="text"
              id="district"
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder='District'
              required
            />
            <label htmlFor="district">District</label>
          </div>
          <div className='form-floating my-0'>
            <input
              className='form-control'
              type="text"
              id="pincode"
              name="pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder='Pincode'
              required
            />
            <label htmlFor="pincode">Pincode</label>
          </div>
          <div className='form-floating my-0'>
            <input
              className='form-control'
              type="text"
              id="address_line"
              name="address_line"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder='Address Line'
            />
            <label htmlFor="address_line">Address Line</label>
          </div>
          <div className='form-floating my-0'>
            <input
              className='form-control'
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder='Date of Birth'
              required
            />
            <label htmlFor="dob">Date of Birth</label>
          </div>
          <div className='form-floating my-3'>
            <select
              className='form-control'
              id="sex"
              name="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label htmlFor="sex">Sex</label>
          </div>
          <div className='form-floating my-0'>
            <input
              className='form-control'
              type="text"
              id="blood_group"
              name="blood_group"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              placeholder='Blood Group'
            />
            <label htmlFor="blood_group">Blood Group</label>
          </div>
          <div className='my-3' style={{position:'relative', display:'flex', justifyContent:"space-evenly"}}>
            <div>
              <input
                className='form-check-input form-check-input-lg'
                type="radio"
                id="staff"
                name="staff_or_student"
                value="true"
                checked={staffOrStudent === true}
                onChange={(e) => setStaffOrStudent(true)}
                required
              ></input>
              <label htmlFor="staff">Staff/Relative</label>
            </div>
            <div>
              <input
                className='form-check-input form-check-input-lg'
                type="radio"
                id="student"
                name="staff_or_student"
                value="false"
                checked={staffOrStudent === false}
                onChange={(e) => setStaffOrStudent(false)}
                required
              />
              <label htmlFor="student">Student</label>
            </div>
          </div>
          {/* Additional fields for students */}
          {!staffOrStudent && (
            <>
              <div className='form-floating my-0'>
                <input
                  className='form-control'
                  type="text"
                  id="course"
                  name="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder='Course'
                  required
                />
                <label htmlFor="course">Course</label>
              </div>
              <div className='form-floating my-0'>
                <input
                  className='form-control'
                  type="text"
                  id="admission_num"
                  name="admission_num"
                  value={admissionNum}
                  onChange={(e) => setAdmissionNum(e.target.value)}
                  placeholder='Admission Number'
                  required
                />
                <label htmlFor="admission_num">Admission Number</label>
              </div>
              <div className='form-floating my-0'>
                <input
                  className='form-control'
                  type="text"
                  id="hostel_num_and_name"
                  name="hostel_num_and_name"
                  value={hostelNumAndName}
                  onChange={(e) => setHostelNumAndName(e.target.value)}
                  placeholder='Hostel Number and Name'
                  required
                />
                <label htmlFor="hostel_num_and_name">Hostel Number and Name</label>
              </div>
              <div className='form-floating my-0'>
                <input
                  className='form-control'
                  type="text"
                  id="room_num"
                  name="room_num"
                  value={roomNum}
                  onChange={(e) => setRoomNum(e.target.value)}
                  placeholder='Room Number'
                  required
                />
                <label htmlFor="room_num">Room Number</label>
              </div>
              <div className='form-floating my-0'>
                <input
                  className='form-control'
                  type="text"
                  id="father_occupation"
                  name="father_occupation"
                  value={fatherOccupation}
                  onChange={(e) => setFatherOccupation(e.target.value)}
                  placeholder='Father Occupation'
                  required
                />
                <label htmlFor="father_occupation">Father Occupation</label>
              </div>
              <div className='form-floating my-0'>
                <input
                  className='form-control'
                  type="text"
                  id="mother_occupation"
                  name="mother_occupation"
                  value={motherOccupation}
                  onChange={(e) => setMotherOccupation(e.target.value)}
                  placeholder='Mother Occupation'
                  required
                />
                <label htmlFor="mother_occupation">Mother Occupation</label>
              </div>
              <div className='form-floating my-0'>
                <input
                  className='form-control'
                  type="text"
                  id="father_mobile"
                  name="father_mobile"
                  value={fatherMobile}
                  onChange={(e) => setFatherMobile(e.target.value)}
                  placeholder='Father Mobile'
                  required
                />
                <label htmlFor="father_mobile">Father Mobile</label>
              </div>
              <div className='form-floating my-0'>
                <input
                  className='form-control'
                  type="text"
                  id="mother_mobile"
                  name="mother_mobile"
                  value={motherMobile}
                  onChange={(e) => setMotherMobile(e.target.value)}
                  placeholder='Mother Mobile'
                  required
                />
                <label htmlFor="mother_mobile">Mother Mobile</label>
              </div>
            </>
          )}
          
          {/* Additional fields for staff */}
          {staffOrStudent && (
            <>
              <div className='form-floating my-0'>
                <input
                  className='form-control'
                  type="text"
                  id="employee_code"
                  name="employee_code"
                  value={employeeCode}
                  onChange={(e) => setEmployeeCode(e.target.value)}
                  placeholder='Employee Code'
                  required
                />
                <label htmlFor="employee_code">Employee Code</label>
              </div>
              <div className='my-3' style={{position:'relative', display:'flex', justifyContent:"space-evenly"}}>
                <div>
                  <input
                    className='form-check-input form-check-input-lg'
                    type="radio"
                    id="staff2"
                    name="staff_or_relative"
                    value="true"
                    checked={staffOrRelative === true}
                    onChange={(e) => setStaffOrRelative(true)}
                    required
                  ></input>
                  <label htmlFor="staff2">Staff</label>
                </div>
                <div>
                  <input
                    className='form-check-input form-check-input-lg'
                    type="radio"
                    id="relative"
                    name="staff_or_relative"
                    value="false"
                    checked={staffOrRelative === false}
                    onChange={(e) => setStaffOrRelative(false)}
                    required
                  />
                  <label htmlFor="relative">Relative</label>
                </div>
              </div>
            </>
          )}
          <button className='btn btn-success my-5' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
