import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserContext';
import UrlContext from './context/UrlContext';

const CreateAppointment = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const {url} = useContext(UrlContext);
  const user_uri = url + 'api/patient/create/appointment/';
  const {user_id} = useContext(UserContext);
  const [fever, setFever] = useState(0);
  const [recorded, setRecorded] = useState(0);
  const [continuousFever, setContinuousFever] = useState(false);
  const [intermittentFever, setIntermittentFever] = useState(false);
  const [shivering, setShivering] = useState(false);
  const [vomiting, setVomiting] = useState(false);
  const [nausea, setNausea] = useState(false);
  const [headache, setHeadache] = useState(false);
  const [bodyPain, setBodyPain] = useState(false);
  const [jointPain, setJointPain] = useState(false);
  const [weakness, setWeakness] = useState(false);
  const [cold, setCold] = useState(false);
  const [runnyNose, setRunnyNose] = useState(false);
  const [sneezing, setSneezing] = useState(false);
  const [throatPain, setThroatPain] = useState(false);
  const [earAche, setEarAche] = useState(false);
  const [earDischarge, setEarDischarge] = useState(false);
  const [cough, setCough] = useState(false);
  const [dryCough, setDryCough] = useState(false);
  const [wetCough, setWetCough] = useState(false);
  const [breathlessness, setBreathlessness] = useState(false);
  const [appetite, setAppetite] = useState(false);
  const [abdomenPain, setAbdomenPain] = useState(false);
  const [looseMotions, setLooseMotions] = useState(false);
  const [urineColor, setUrineColor] = useState('');
  const [other, setOther] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctorId = '1';

    const formData = new FormData();
    formData.append('patient_id', user_id);
    formData.append('doctor_id', doctorId);
    formData.append('datetime', `${date}T${time}:00Z`);
    formData.append('fever', fever);
    formData.append('recorded', recorded);
    formData.append('continuous_fever', continuousFever);
    formData.append('intermittent_fever', intermittentFever);
    formData.append('shivering', shivering);
    formData.append('vomiting', vomiting);
    formData.append('nausea', nausea);
    formData.append('headache', headache);
    formData.append('body_pain', bodyPain);
    formData.append('joint_pain', jointPain);
    formData.append('weakness', weakness);
    formData.append('cold', cold);
    formData.append('runny_nose', runnyNose);
    formData.append('sneezing', sneezing);
    formData.append('throat_pain', throatPain);
    formData.append('ear_ache', earAche);
    formData.append('ear_discharge', earDischarge);
    formData.append('cough', cough);
    formData.append('dry_cough', dryCough);
    formData.append('wet_cough', wetCough);
    formData.append('breathlessness', breathlessness);
    formData.append('appetite', appetite);
    formData.append('abdomen_pain', abdomenPain);
    formData.append('loose_motions', looseMotions);
    formData.append('urine_color', urineColor);
    formData.append('other', other);


    console.log(formData);

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
      <select id="fever" name="fever" value={fever} onChange={(e) => setFever(e.target.value)}>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">Strong</option>
      </select>
    </div>

    <div>
      <label htmlFor="recorded">Recorded:</label>
      <input type="number" id="recorded" name="recorded" min="0" max="200"
        value={recorded}
        onChange={(e) => setRecorded(e.target.value)}
      />
    </div>

    {/* radio button for fever type */}
    <div>
      <label htmlFor="continuousFever">Fever Type:</label>
      <div>
        <input type="radio" id="continuousFever" name="feverType" value="continuous"
          checked={continuousFever}
          onChange={() => setContinuousFever(!continuousFever)}
        />
        <label htmlFor="continuousFever">Continuous</label>
      </div>
      <div>
        <input type="radio" id="intermittentFever" name="feverType" value="intermittent"
          checked={intermittentFever}
          onChange={() => setIntermittentFever(!intermittentFever)}
        />
        <label htmlFor="intermittentFever">Intermittent</label>
      </div>
    </div>

    <div>
      <label htmlFor="shivering">Shivering:</label>
      <input type="checkbox" id="shivering" name="shivering"
        checked={shivering}
        onChange={() => setShivering(!shivering)}
      />
    </div>

    <div>
      <label htmlFor="vomiting">Vomiting:</label>
      <input type="checkbox" id="vomiting" name="vomiting"
        checked={vomiting}
        onChange={() => setVomiting(!vomiting)}
      />
    </div>

    <div>
      <label htmlFor="nausea">Nausea:</label>
      <input type="checkbox" id="nausea" name="nausea" 
        checked={nausea}
        onChange={() => setNausea(!nausea)}
      />
    </div>

    <div>
      <label htmlFor="headache">Headache:</label>
      <input type="checkbox" id="headache" name="headache"
        checked={headache}
        onChange={() => setHeadache(!headache)}
      />
    </div>

    <div>
      <label htmlFor="bodyPain">Body Pain:</label>
      <input type="checkbox" id="bodyPain" name="bodyPain"
        checked={bodyPain}
        onChange={() => setBodyPain(!bodyPain)}
      />
    </div>

    <div>
      <label htmlFor="jointPain">Joint Pain:</label>
      <input type="checkbox" id="jointPain" name="jointPain"
        checked={jointPain}
        onChange={() => setJointPain(!jointPain)}
      />
    </div>

    <div>
      <label htmlFor="weakness">Weakness:</label>
      <input type="checkbox" id="weakness" name="weakness"
        checked={weakness}
        onChange={() => setWeakness(!weakness)}
      />
    </div>

    <div>
      <label htmlFor="cold">Cold:</label>
      <input type="checkbox" id="cold" name="cold"
        checked={cold}
        onChange={() => setCold(!cold)}
      />
    </div>

    <div>
      <label htmlFor="runnyNose">Runny Nose:</label>
      <input type="checkbox" id="runnyNose" name="runnyNose"
        checked={runnyNose}
        onChange={() => setRunnyNose(!runnyNose)}
      />
    </div>

    <div>
      <label htmlFor="sneezing">Sneezing:</label>
      <input type="checkbox" id="sneezing" name="sneezing"
        checked={sneezing}
        onChange={() => setSneezing(!sneezing)}
      />
    </div>

    <div>
      <label htmlFor="throatPain">Throat Pain:</label>
      <input type="checkbox" id="throatPain" name="throatPain"
        checked={throatPain}
        onChange={() => setThroatPain(!throatPain)}
      />
    </div>

    <div>
      <label htmlFor="earAche">Ear Ache:</label>
      <input type="checkbox" id="earAche" name="earAche"
        checked={earAche}
        onChange={() => setEarAche(!earAche)}
      />
    </div>

    <div>
      <label htmlFor="earDischarge">Ear Discharge:</label>
      <input type="checkbox" id="earDischarge" name="earDischarge"
        checked={earDischarge}
        onChange={() => setEarDischarge(!earDischarge)}
      />
    </div>

    <div>
      <label htmlFor="cough">Cough:</label>
      <input type="checkbox" id="cough" name="cough"
        checked={cough}
        onChange={() => setCough(!cough)}
      />
    </div>

    <label htmlFor="coughType">Cough Type:</label>
    <div>
      <input type="radio" id="dryCough" name="coughType" value="dry"
        checked={dryCough}
        onChange={() => setDryCough(!dryCough)}
      />
      <label htmlFor="dryCough">Dry Cough</label>
    </div>
    <div>
      <input type="radio" id="wetCough" name="coughType" value="wet"
        checked={wetCough}
        onChange={() => setWetCough(!wetCough)}
      />
      <label htmlFor="wetCough">Wet Cough</label>
    </div>

    <div>
      <label htmlFor="breathlessness">Breathlessness:</label>
      <input type="checkbox" id="breathlessness" name="breathlessness"
        checked={breathlessness}
        onChange={() => setBreathlessness(!breathlessness)}
      />
    </div>

    <div>
      <label htmlFor="appetite">Appetite:</label>
      <input type="checkbox" id="appetite" name="appetite"
        checked={appetite}
        onChange={() => setAppetite(!appetite)}
      />
    </div>

    <div>
      <label htmlFor="abdomenPain">Abdomen Pain:</label>
      <input type="checkbox" id="abdomenPain" name="abdomenPain"
        checked={abdomenPain}
        onChange={() => setAbdomenPain(!abdomenPain)}
      />
    </div>

    <div>
      <label htmlFor="looseMotions">Loose Motions:</label>
      <input type="checkbox" id="looseMotions" name="looseMotions"
        checked={looseMotions}
        onChange={() => setLooseMotions(!looseMotions)}
      />
    </div>

    <div>
      <label htmlFor="urineColor">Urine Color:</label>
      <input type="text" id="urineColor" name="urineColor"
        value={urineColor}
        onChange={(e) => setUrineColor(e.target.value)}
      />
    </div>

    <div>
      <label htmlFor="other">Other:</label>
      <input type="text" id="other" name="other"
        value={other}
        onChange={(e) => setOther(e.target.value)}
      />
    </div>
    <button type="submit">Submit</button>
    </form>
  </div>
  );
};

export default CreateAppointment;