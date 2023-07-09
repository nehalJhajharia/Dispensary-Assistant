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
    <div>
      <h2>All Medicines</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Count</th>
            <th>Date of Manufacturing</th>
            <th>Date of Expiry</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {medicineList.map((medicine) => (
            <tr key={medicine.id}>
              <td>{medicine.id}</td>
              <td>{medicine.name}</td>
              <td>{medicine.count}</td>
              <td>{medicine.date_of_mfg}</td>
              <td>{medicine.date_of_expiry}</td>
              <td>{medicine.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMedicines;
