import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';

const CreateAppointment = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const url = 'http://192.168.193.8:8000/';
  const user_uri = url + 'api/patient/create/appointment/';
  const {user_id} = useContext(UserContext);
  const [symptoms, setSymptoms] = useState({
    fever:0,
    recorded:0,
    continuous_fever:false,
    intermittent_fever:false,
    shivering:false,
    vomiting:false,
    nausea:false,
    headache:false,
    bodyPain: false,
    jointPain: false,
    weakness: false,
    cold: false,
    runnyNose: false,
    sneezing: false,
    throatPain: false,
    earAche: false,
    earDischarge: false,
    cough: false,
    dryCough: false,
    wetCough: false,
    breathlessness: false,
    appetite: false,
    abdomenPain: false,
    looseMotions: false,
    urineColor: '',
    other:''
  })

  const handleSymptomsChange = (e) => {
    const { name, value, type, checked } = e.target;
    const convertedValue = name === 'fever' && type === 'select-one' ? parseInt(value, 10) : value;

    setSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      [name]: type === 'checkbox' ? checked : convertedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data
    const doctorId = '1';

    const formData = new FormData();
    formData.append('patient_id', user_id);
    formData.append('doctor_id', doctorId);
    formData.append('datetime', `${date}T${time}:00Z`);
    formData.append('symptoms', symptoms);

    // Send the data to the server
    try {
      const response = await fetch(`${user_uri}`, {
        method: 'POST',
        body: formData,
      })
      .then()
      .catch(Error);

      if (response.ok) {
        console.log(response);
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

return (
  <div style={{overflow:'auto', maxHeight:'100vh'}}>
  <h2>Create Appointment</h2>
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)}
          required
        />
    </div>

    <div>
      <label htmlFor="time">Time:</label>
      <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
    </div>

    <h4>Symptoms:</h4>
    <div>
      <label htmlFor="fever">Fever:</label>
      <select id="fever" name="fever" value={symptoms.fever} onChange={handleSymptomsChange}>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">Strong</option>
      </select>
    </div>
    <div>
      <label htmlFor="recorded">Recorded:</label>
      <input type="number" id="recorded" name="recorded" min="0" max="200"
        value={symptoms.recorded}
        onChange={handleSymptomsChange}
      />
    </div>

    {/* radio button for fever type */}
    <div>
      <label htmlFor="continuousFever">Fever Type:</label>
      <div>
        <input type="radio" id="continuousFever" name="feverType" value="continuous"
          checked={symptoms.continuousFever}
          onChange={handleSymptomsChange}
        />
      <label htmlFor="continuousFever">Continuous</label>
      </div>
      <div>
        <input type="radio" id="intermittentFever" name="feverType" value="intermittent"
            checked={symptoms.intermittentFever}
            onChange={handleSymptomsChange}
        />
      <label htmlFor="intermittentFever">Intermittent</label>
      </div>
    </div>

<div>
<label htmlFor="shivering">Shivering:</label>
<input type="checkbox" id="shivering" name="shivering"
  checked={symptoms.shivering}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="vomiting">Vomiting:</label>
<input type="checkbox" id="vomiting" name="vomiting"
  checked={symptoms.vomiting}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="nausea">Nausea:</label>
<input type="checkbox" id="nausea" name="nausea" 
  checked={symptoms.nausea}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="headache">Headache:</label>
<input type="checkbox" id="headache" name="headache"
  checked={symptoms.headache}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="bodyPain">Body Pain:</label>
<input type="checkbox" id="bodyPain" name="bodyPain"
  checked={symptoms.bodyPain}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="jointPain">Joint Pain:</label>
<input type="checkbox" id="jointPain" name="jointPain"
  checked={symptoms.jointPain}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="weakness">Weakness:</label>
<input type="checkbox" id="weakness" name="weakness"
  checked={symptoms.weakness}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="cold">Cold:</label>
<input type="checkbox" id="cold" name="cold"
  checked={symptoms.cold}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="runnyNose">Runny Nose:</label>
<input type="checkbox" id="runnyNose" name="runnyNose"
  checked={symptoms.runnyNose}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="sneezing">Sneezing:</label>
<input type="checkbox" id="sneezing" name="sneezing"
  checked={symptoms.sneezing}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="throatPain">Throat Pain:</label>
<input type="checkbox" id="throatPain" name="throatPain"
  checked={symptoms.throatPain}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="earAche">Ear Ache:</label>
<input type="checkbox" id="earAche" name="earAche"
  checked={symptoms.earAche}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="earDischarge">Ear Discharge:</label>
<input type="checkbox" id="earDischarge" name="earDischarge"
  checked={symptoms.earDischarge}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="cough">Cough:</label>
<input type="checkbox" id="cough" name="cough"
  checked={symptoms.cough}
  onChange={handleSymptomsChange}
/>
</div>

<label htmlFor="coughType">Cough Type:</label>
<div>
  <input type="radio" id="dryCough" name="coughType" value="dry"
    checked={symptoms.dryCough}
    onChange={handleSymptomsChange}
  />
  <label htmlFor="dryCough">Dry Cough</label>
</div>
<div>
  <input type="radio" id="wetCough" name="coughType" value="wet"
    checked={symptoms.wetCough}
    onChange={handleSymptomsChange}
  />
  <label htmlFor="wetCough">Wet Cough</label>
</div>

<div>
<label htmlFor="breathlessness">Breathlessness:</label>
<input type="checkbox" id="breathlessness" name="breathlessness"
  checked={symptoms.breathlessness}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="appetite">Appetite:</label>
<input type="checkbox" id="appetite" name="appetite"
  checked={symptoms.appetite}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="abdomenPain">Abdomen Pain:</label>
<input type="checkbox" id="abdomenPain" name="abdomenPain"
  checked={symptoms.abdomenPain}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="looseMotions">Loose Motions:</label>
<input type="checkbox" id="looseMotions" name="looseMotions"
  checked={symptoms.looseMotions}
  onChange={handleSymptomsChange}
/>
</div>

<div>
<label htmlFor="urineColor">Urine Color:</label>
<input type="text" id="urineColor" name="urineColor"
  value={symptoms.urineColor}
  onChange={handleSymptomsChange}
/>
</div>


<div>
<label htmlFor="other">Other:</label>
<input type="text" id="other" name="other"
  value={symptoms.other}
  onChange={handleSymptomsChange}
/>
</div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAppointment;