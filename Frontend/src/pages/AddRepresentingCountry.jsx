import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const AddRepresentingCountry = () => {
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({
    country: '',
    monthlyLivingCost: '',
    visaRequirements: '',
    partTimeWorkDetails: '',
    countryBenefits: '',
    applicationProcess: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/countries').then(res => setCountries(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/representing-countries/add', form);
    navigate('/representing-countries');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Representing Country</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required className="w-full border p-2">
          <option value="">Select Country</option>
          {countries.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input type="text" placeholder="Monthly Living Cost" required className="w-full border p-2" onChange={(e) => setForm({ ...form, monthlyLivingCost: e.target.value })} />
        <textarea placeholder="Visa Requirements" required className="w-full border p-2" onChange={(e) => setForm({ ...form, visaRequirements: e.target.value })} />
        <textarea placeholder="Part-Time Work Details" required className="w-full border p-2" onChange={(e) => setForm({ ...form, partTimeWorkDetails: e.target.value })} />
        <textarea placeholder="Country Benefits" required className="w-full border p-2" onChange={(e) => setForm({ ...form, countryBenefits: e.target.value })} />
        <textarea placeholder="Application Process" required className="w-full border p-2" onChange={(e) => setForm({ ...form, applicationProcess: e.target.value })} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add</button>
      </form>
    </div>
  );
};

export default AddRepresentingCountry;
