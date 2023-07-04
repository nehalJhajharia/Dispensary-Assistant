import React, { useState } from 'react';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [mobilePersonal, setMobilePersonal] = useState('');
  const [mobileEmergency, setMobileEmergency] = useState('');
  const [dob, setDob] = useState('');
  const [sex, setSex] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [hypertensionSelf, setHypertensionSelf] = useState(false);
  const [hypertensionFather, setHypertensionFather] = useState(false);
  const [hypertensionMother, setHypertensionMother] = useState(false);
  const [diabetesSelf, setDiabetesSelf] = useState(false);
  const [diabetesFather, setDiabetesFather] = useState(false);
  const [diabetesMother, setDiabetesMother] = useState(false);
  const [prevOperationInjury, setPrevOperationInjury] = useState('');
  const [chronicDisease, setChronicDisease] = useState('');
  const [allergicMedicine, setAllergicMedicine] = useState('');
  const [isStaff, setIsStaff] = useState(false);
  const [staffOrRelative, setStaffOrRelative] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [course, setCourse] = useState('');
  const [admissionNum, setAdmissionNum] = useState('');
  const [hostelNumAndName, setHostelNumAndName] = useState('');
  const [roomNum, setRoomNum] = useState('');
  const [fatherOccupation, setFatherOccupation] = useState('');
  const [motherOccupation, setMotherOccupation] = useState('');
  const [fatherMobile, setFatherMobile] = useState('');
  const [motherMobile, setMotherMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data object
    const userData = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      address,
      mobile_personal: mobilePersonal,
      mobile_emergency: mobileEmergency,
      dob,
      sex,
      blood_group: bloodGroup,
      hypertension_self: hypertensionSelf,
      hypertension_father: hypertensionFather,
      hypertension_mother: hypertensionMother,
      diabetes_self: diabetesSelf,
      diabetes_father: diabetesFather,
      diabetes_mother: diabetesMother,
      prev_operation_injury: prevOperationInjury,
      chronic_disease: chronicDisease,
      allergic_medicine: allergicMedicine,
      staff_or_student: isStaff,
      staff_or_relative: staffOrRelative,
      employee_code: employeeCode,
      course,
      admission_num: admissionNum,
      hostel_num_and_name: hostelNumAndName,
      room_num: roomNum,
      father_occupation: fatherOccupation,
      mother_occupation: motherOccupation,
      father_mobile: fatherMobile,
      mother_mobile: motherMobile,
    };

    // You can send the userData to the backend for further processing
    console.log(userData);

    // Reset the form fields
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setAddress('');
    setMobilePersonal('');
    setMobileEmergency('');
    setDob('');
    setSex('');
    setBloodGroup('');
    setHypertensionSelf(false);
    setHypertensionFather(false);
    setHypertensionMother(false);
    setDiabetesSelf(false);
    setDiabetesFather(false);
    setDiabetesMother(false);
    setPrevOperationInjury('');
    setChronicDisease('');
    setAllergicMedicine('');
    setIsStaff(false);
    setStaffOrRelative('');
    setEmployeeCode('');
    setCourse('');
    setAdmissionNum('');
    setHostelNumAndName('');
    setRoomNum('');
    setFatherOccupation('');
    setMotherOccupation('');
    setFatherMobile('');
    setMotherMobile('');
  };

  return (
    <div className="container" style={{overflow:'auto', maxHeight:'100vh'}}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor="middle_name">Middle Name:</label>
        <input type="text" id="middle_name" name="middle_name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />

        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <label htmlFor="mobile_personal">Personal Mobile:</label>
        <input type="tel" id="mobile_personal" name="mobile_personal"
          value={mobilePersonal}
          onChange={(e) => setMobilePersonal(e.target.value)}
          required
        />

        <label htmlFor="mobile_emergency">Emergency Mobile:</label>
        <input type="tel" id="mobile_emergency" name="mobile_emergency"
          value={mobileEmergency}
          onChange={(e) => setMobileEmergency(e.target.value)}
          required
        />

        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

        <label htmlFor="sex">Sex:</label>
        <select id="sex" name="sex"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="blood_group">Blood Group:</label>
        <input type="text" id="blood_group" name="blood_group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
        />

        <label htmlFor="hypertension_self">Hypertension (Self):</label>
        <select id="hypertension_self" name="hypertension_self"
          value={hypertensionSelf}
          onChange={(e) => setHypertensionSelf(e.target.value === 'true')}
          required
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label htmlFor="hypertension_father">Hypertension (Father):</label>
        <select id="hypertension_father" name="hypertension_father"
          value={hypertensionFather}
          onChange={(e) => setHypertensionFather(e.target.value === 'true')}
          required
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label htmlFor="hypertension_mother">Hypertension (Mother):</label>
        <select id="hypertension_mother" name="hypertension_mother"
          value={hypertensionMother}
          onChange={(e) => setHypertensionMother(e.target.value === 'true')}
          required
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label htmlFor="diabetes_self">Diabetes (Self):</label>
        <select id="diabetes_self" name="diabetes_self" value={diabetesSelf}
          onChange={(e) => setDiabetesSelf(e.target.value === 'true')}
          required
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label htmlFor="diabetes_father">Diabetes (Father):</label>
        <select id="diabetes_father" name="diabetes_father"
          value={diabetesFather}
          onChange={(e) => setDiabetesFather(e.target.value === 'true')}
          required
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label htmlFor="diabetes_mother">Diabetes (Mother):</label>
        <select id="diabetes_mother" name="diabetes_mother"
          value={diabetesMother}
          onChange={(e) => setDiabetesMother(e.target.value === 'true')}
          required
        >
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label htmlFor="prev_operation_injury">
          Previous Operation/Injury:
        </label>
        <input type="text" id="prev_operation_injury" name="prev_operation_injury"
          value={prevOperationInjury}
          onChange={(e) => setPrevOperationInjury(e.target.value)}
        />

        <label htmlFor="chronic_disease">Chronic Disease:</label>
        <input type="text" id="chronic_disease"
          name="chronic_disease"
          value={chronicDisease}
          onChange={(e) => setChronicDisease(e.target.value)}
        />

        <label htmlFor="allergic_medicine">Allergic to Medicine:</label>
        <input type="text" id="allergic_medicine"
          name="allergic_medicine"
          value={allergicMedicine}
          onChange={(e) => setAllergicMedicine(e.target.value)}
        />

        <label htmlFor="staff_or_student">Are you a staff or a student?</label>
        <select id="staff_or_student" name="staff_or_student"
          value={isStaff}
          onChange={(e) => setIsStaff(e.target.value === 'true')}
          required
        >
          <option value="">Select</option>
          <option value="true">Staff</option>
          <option value="false">Student</option>
        </select>

        {isStaff && (
          <>
            <label htmlFor="staff_or_relative">Staff or Relative:</label>
            <input type="text" id="staff_or_relative" name="staff_or_relative"
              value={staffOrRelative}
              onChange={(e) => setStaffOrRelative(e.target.value)}
              required
            />

            <label htmlFor="employee_code">Employee Code:</label>
            <input type="text" id="employee_code" name="employee_code"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              required
            />
          </>
        )}

        {!isStaff && (
          <>
            <label htmlFor="course">Course:</label>
            <select id="course" name="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="btech">B.Tech</option>
              <option value="mtech">M.Tech</option>
              <option value="phd">PhD</option>
              <option value="msc">M.Sc</option>
            </select>

            <label htmlFor="admission_num">Admission Number:</label>
            <input type="text" id="admission_num" name="admission_num"
              value={admissionNum}
              onChange={(e) => setAdmissionNum(e.target.value)}
              required
            />

            <label htmlFor="hostel_num_and_name">Hostel Number and Name:</label>
            <input type="text" id="hostel_num_and_name" name="hostel_num_and_name"
              value={hostelNumAndName}
              onChange={(e) => setHostelNumAndName(e.target.value)}
              required
            />

            <label htmlFor="room_num">Room Number:</label>
            <input type="text" id="room_num" name="room_num"
              value={roomNum}
              onChange={(e) => setRoomNum(e.target.value)}
              required
            />

            <label htmlFor="father_occupation">Father's Occupation:</label>
            <input type="text" id="father_occupation" name="father_occupation"
              value={fatherOccupation}
              onChange={(e) => setFatherOccupation(e.target.value)}
              required
            />

            <label htmlFor="mother_occupation">Mother's Occupation:</label>
            <input type="text" id="mother_occupation" name="mother_occupation"
              value={motherOccupation}
              onChange={(e) => setMotherOccupation(e.target.value)}
              required
            />

            <label htmlFor="father_mobile">Father's Mobile:</label>
            <input type="tel" id="father_mobile" name="father_mobile"
              value={fatherMobile}
              onChange={(e) => setFatherMobile(e.target.value)}
              required
            />

            <label htmlFor="mother_mobile">Mother's Mobile:</label>
            <input type="tel" id="mother_mobile" name="mother_mobile"
              value={motherMobile}
              onChange={(e) => setMotherMobile(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit">Submit</button>
        {/* <button type="button" onClick={handleReset}>
          Reset
        </button> */}
      </form>
    </div>
  );
}

export default SignupPage;
