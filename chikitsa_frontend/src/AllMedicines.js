import React, { useState, useEffect, useContext } from 'react';
import UrlContext from './context/UrlContext';

const AllMedicines = () => {
  const [medicineList, setMedicineList] = useState([]);
  const url = useContext(UrlContext)
  const user_uri = url + 'api/master/get/all-medicines/';

  useEffect(() => {
    fetchMedicineList();
  }, []);

  const fetchMedicineList = async () => {
    try {
      const response = await fetch(`${user_uri}`);
      if (response.ok) {
        const jsonData = await response.json();
        const data = jsonData[0];
        const key = Object.keys(data)[0]
        setMedicineList(data[key]);
      } else {
        console.error('Error fetching medicine list:', response.status);
      }
    } catch (error) {
      console.error('Error fetching medicine list:', error);
    }
  };

  return (
    <div className='mt-3' style={{alignContent:'center'}}>
      <h2 style={{textAlign:'center'}}>MEDICINE CATALOG</h2>
      <table className='table table-sm'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Count</th>
            <th>Date of Mfg</th>
            <th>Date of Exp</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {medicineList.map((medicine) => (
            <tr key={medicine.id}>
              <td>{medicine.name}</td>
              <td>{medicine.type}</td>
              <td>{medicine.count}</td>
              <td>{medicine.date_of_mfg}</td>
              <td>{medicine.date_of_expiry}</td>
              <td>{medicine.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMedicines;
