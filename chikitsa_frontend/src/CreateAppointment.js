import React, { useContext, useState, useEffect } from 'react';
import UrlContext from './context/UrlContext';
import loadUserData from './local-data/UserGet';
import { useNavigate } from 'react-router-dom';

const CreateAppointment = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [allDoctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [time, setTime] = useState('');
  const url = useContext(UrlContext);
  const user_uri = url + 'api/patient/create/appointment/';
  const all_docs_uri = url + 'api/doctor/get/all-doctors/';
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
  const user = loadUserData();

  // get all doctors
  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${all_docs_uri}`);
      if (response.ok) {
        const jsonData = await response.json();
        setDoctors(jsonData);
      } else {
        console.error('Error fetching doctors:', response.status);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('patient_id', user.id);
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
        // handle error
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }

    navigate(`/profile`);
  };

  return (
    <div style={{width:'100%',top:'0',left:'0', position:'absolute', overflow:'hidden'}}>
      <form className='w-50 mx-auto' style={{position:'relative'}} onSubmit={handleSubmit}>
      <h2 className="mt-3 text-center">Create Appointment</h2>
      <table className='table table-sm'>
        <tbody>
          <tr>
            <td>Doctor</td>
            <td>
              <div className='w-50 form-floating-sm'>
                <select
                  className='form-control'
                  id="docName"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}>
                  <option value="">Select a doctor</option>
                  {allDoctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.first_name} {doctor.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>Date</td>
            <td>
            <input
              type="date"
              id="date"
              className="form-control-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            </td>
          </tr>
          <tr>
            <td>Time</td>
            <td><input className="form-control-sm" type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required /></td>
          </tr>
          <br />
          <h5>Symptoms</h5>
          <tr>
            <td>Fever</td>
            <td><select className="form-control-sm" id="fever" name="fever" value={fever} onChange={(e) => setFever(e.target.value)}>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">Strong</option>
            </select></td>
          </tr>
          <tr>
            <td>Recorded Fever</td>
            <td><input className="form-control-sm" type="number" id="recorded" name="recorded" min="0" max="200"
              value={recorded}
              onChange={(e) => setRecorded(e.target.value)}
            /></td>
          </tr>
          <tr>
            <td>Fever Type</td>
            <td>
              <tr>
                <input className='form-check-input form-check-input-lg' type="radio" id="continuousFever" name="feverType" value="continuous"
                checked={continuousFever}
                onChange={() => setContinuousFever(!continuousFever)}
              /><label htmlFor="continuousFever">Continuous</label>
              </tr>
              <tr>
                <input className='form-check-input form-check-input-lg' type="radio" id="intermittentFever" name="feverType" value="intermittent"
                checked={intermittentFever}
                onChange={() => setIntermittentFever(!intermittentFever)}
              /><label htmlFor="intermittentFever">Intermittent</label>
              </tr>
            </td>
          </tr>

          <tr>
            <td>Shivering</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="shivering" name="shivering"
              checked={shivering}
              onChange={() => setShivering(!shivering)}
            /></td>
          </tr>
          <tr>
            <td>Vomiting</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="vomiting" name="vomiting"
              checked={vomiting}
              onChange={() => setVomiting(!vomiting)}
            /></td>
          </tr>
          <tr>
            <td>Nausea</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="nausea" name="nausea"
              checked={nausea}
              onChange={() => setNausea(!nausea)}
            /></td>
          </tr>
          <tr>
            <td>Headache</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="headache" name="headache"
              checked={headache}
              onChange={() => setHeadache(!headache)}
            /></td>
          </tr>
          <tr>
            <td>Body Pain</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="bodyPain" name="bodyPain"
              checked={bodyPain}
              onChange={() => setBodyPain(!bodyPain)}
            /></td>
          </tr>
          <tr>
            <td>Joint Pain</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="jointPain" name="jointPain"
              checked={jointPain}
              onChange={() => setJointPain(!jointPain)}
            /></td>
          </tr>
          <tr>
            <td>Weakness</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="weakness" name="weakness"
              checked={weakness}
              onChange={() => setWeakness(!weakness)}
            /></td>
          </tr>
          <tr>
            <td>Cold</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="cold" name="cold"
              checked={cold}
              onChange={() => setCold(!cold)}
            /></td>
          </tr>
          <tr>
            <td>Runny Nose</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="runnyNose" name="runnyNose"
              checked={runnyNose}
              onChange={() => setRunnyNose(!runnyNose)}
            /></td>
          </tr>
          <tr>
            <td>Sneezing</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="sneezing" name="sneezing"
              checked={sneezing}
              onChange={() => setSneezing(!sneezing)}
            /></td>
          </tr>
          <tr>
            <td>Throat Pain</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="throatPain" name="throatPain"
              checked={throatPain}
              onChange={() => setThroatPain(!throatPain)}
            /></td>
          </tr>
          <tr>
            <td>Ear Ache</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="earAche" name="earAche"
              checked={earAche}
              onChange={() => setEarAche(!earAche)}
            /></td>
          </tr>
          <tr>
            <td>Ear Discharge</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="earDischarge" name="earDischarge"
              checked={earDischarge}
              onChange={() => setEarDischarge(!earDischarge)}
            /></td>
          </tr>
          <tr>
            <td>Cough</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="cough" name="cough"
              checked={cough}
              onChange={() => setCough(!cough)}
            /></td>
          </tr>

          <tr>
            <td>Cough Type</td>
            <td>
              <tr>
              <input className='form-check-input form-check-input-lg' type="radio" id="dryCough" name="coughType" value="dry"
                checked={dryCough}
                onChange={() => setDryCough(!dryCough)}
              />
              <label htmlFor="dryCough">Dry Cough</label>
              </tr>
              <tr>
              <input className='form-check-input form-check-input-lg' type="radio" id="wetCough" name="coughType" value="wet"
                checked={wetCough}
                onChange={() => setWetCough(!wetCough)}
              />
              <label htmlFor="wetCough">Wet Cough</label>
              </tr>
            </td>
          </tr>

          <tr>
            <td>Breathlessness</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="breathlessness" name="breathlessness"
              checked={breathlessness}
              onChange={() => setBreathlessness(!breathlessness)}
            /></td>
          </tr>
          <tr>
            <td>Appetite</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="appetite" name="appetite"
              checked={appetite}
              onChange={() => setAppetite(!appetite)}
            /></td>
          </tr>
          <tr>
            <td>Abdomen Pain</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="abdomenPain" name="abdomenPain"
              checked={abdomenPain}
              onChange={() => setAbdomenPain(!abdomenPain)}
            /></td>
          </tr>
          <tr>
            <td>Loose Motions</td>
            <td><input className='form-check-input form-check-input-lg' type="checkbox" id="looseMotions" name="looseMotions"
              checked={looseMotions}
              onChange={() => setLooseMotions(!looseMotions)}
            /></td>
          </tr>
          <tr>
            <td>Urine Color</td>
            <td><input className="form-control-lg" type="text" id="urineColor" name="urineColor"
              checked={urineColor}
              onChange={(e) => setUrineColor(e.target.urineColor)}
            /></td>
          </tr>
          <tr>
            <td>other</td>
            <td><input className="form-control-lg" type="text" id="other" name="other"
              checked={other}
              onChange={(e) => setOther(e.target.value)}
            /></td>
          </tr>
        </tbody>
      </table>
      <button className='mt-3 mb-5 btn btn-success' type="submit">Submit</button>
      </form>
    </div>
    );
}

export default CreateAppointment;