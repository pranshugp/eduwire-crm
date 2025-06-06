import React, { useEffect, useState } from 'react';
import axios from '../axios';

const ViewCountries = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await axios.get('/countries');
      setCountries(res.data);
    };
    fetchCountries();
  }, []);

  return (
    <div className="p-20">
      <h2 className="text-xl font-bold mb-4">All Countries</h2>
      <ul className="list-disc ml-6">
        {countries.map((country) => (
          <li key={country._id}>{country.name} </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCountries;