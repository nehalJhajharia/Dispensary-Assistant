import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import UrlContext from "./context/UrlContext";
import 'bootstrap/dist/css/bootstrap.css';

const EditMedicalHistory = () => {
  const { state } = useLocation();
  const url = useContext(UrlContext);
  const url_uri = url + 'api/patient/update/medical-history/';
  const [formValues, setFormValues] = useState({
    med_hist_id : state.id,
    hypertension_self: state.hypertension_self,
    hypertension_father: state.hypertension_father,
    hypertension_mother: state.hypertension_mother,
    diabetes_self: state.diabetes_self,
    diabetes_father: state.diabetes_father,
    diabetes_mother: state.diabetes_mother,
    prev_operation_injury: state.prev_operation_injury,
    chronic_disease: state.chronic_disease,
    allergic_medicine: state.allergic_medicine,
  });

  useEffect(() => {
    console.log(state);
  }, []);

  const handleBooleanChange = (e) => {
    const { name } = e.target;
    const value = e.target.checked;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('med_hist_id', formValues.med_hist_id);
    formData.append('hypertension_self', formValues.hypertension_self);
    formData.append('hypertension_father', formValues.hypertension_father);
    formData.append('hypertension_mother', formValues.hypertension_mother);
    formData.append('diabetes_self', formValues.diabetes_self);
    formData.append('diabetes_father', formValues.diabetes_father);
    formData.append('diabetes_mother', formValues.diabetes_mother);
    formData.append('prev_operation_injury', formValues.prev_operation_injury);
    formData.append('chronic_disease', formValues.chronic_disease);
    formData.append('allergic_medicine', formValues.allergic_medicine);
    console.log(formValues);
    try {
      const response = await fetch(`${url_uri}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Medical data updated successfully');
      } else {
        console.error('Error updating medical data:', response.status);
      }
    } catch (error) {
      console.error('Error updating medical data:', error);
    }
  };
  

  return (
    <div style={{width:'100%',top:'0',left:'0', position:'absolute', overflow:'hidden'}}>
      <form className='w-50 mx-auto' style={{position:'relative'}} onSubmit={handleSubmit} >
      <h2 className="mt-3 text-center">Editing Medical History</h2>
      <table className='table table-sm'>
        <tbody>
          <h5>Self</h5>
          <tr>
            <td>Hypertension (Self)</td>
            <td><input type="checkbox" name="hypertension_self" value="true" checked={formValues.hypertension_self} onChange={handleBooleanChange} /></td>
          </tr>
          <tr>
            <td>Diabetes (Self)</td>
            <td><input type="checkbox" name="diabetes_self" value="true" checked={formValues.diabetes_self} onChange={handleBooleanChange} /></td>
          </tr>
          <tr>
            <td>Allergic Medicine</td>
            <td><input type="text" name="allergic_medicine" value={formValues.allergic_medicine} onChange={handleTextChange}/></td>
          </tr>
          <tr>
            <td>Chronic Disease</td>
            <td><input type="text" name="chronic_disease" value={formValues.chronic_disease} onChange={handleTextChange}/></td>
          </tr>
          <tr>
            <td>Previous Operation Injury</td>
            <td><input type="text" name="prev_operation_injury" value={formValues.prev_operation_injury} onChange={handleTextChange}/></td>
          </tr>
          <br />
          <h5>Father</h5>
          <tr>
            <td>Hypertension (Father)</td>
            <td><input type="checkbox" name="hypertension_father" value="true" checked={formValues.hypertension_father} onChange={handleBooleanChange} /></td>
          </tr>
          <tr>
            <td>Diabetes (Father)</td>
            <td><input type="checkbox" name="diabetes_father" value="true" checked={formValues.diabetes_father} onChange={handleBooleanChange} /></td>
          </tr>
          <br />
          <h5>Mother</h5>
          <tr>
            <td>Hypertension (Mother)</td>
            <td><input type="checkbox" name="hypertension_mother" value="true" checked={formValues.hypertension_mother} onChange={handleBooleanChange} /></td>
          </tr>
          <tr>
            <td>Diabetes (Mother)</td>
            <td><input type="checkbox" name="diabetes_mother" value="true" checked={formValues.diabetes_mother} onChange={handleBooleanChange} /></td>
          </tr>
        </tbody>
      </table>
      <button className='mt-3 mb-5' type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditMedicalHistory;
