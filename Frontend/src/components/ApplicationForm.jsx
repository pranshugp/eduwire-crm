import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = ({ applicationId }) => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (applicationId) {
      axios.get(`/applications/${applicationId}`).then(res => setFormData(res.data));
    }
  }, [applicationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (applicationId) {
      await axios.put(`/applications/${applicationId}`, { formData });
    } else {
      await axios.post('/applications', { formData });
    }
    navigate('/applications');
  };

  return (
    <form className='p-20' onSubmit={handleSubmit}>
      {/* Render inputs for address, fee, personal, course details */}
      <input name="personalDetails.firstName" value={formData.personalDetails?.firstName || ''} onChange={handleChange} placeholder="First Name" />
      {/* More fields like above */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplicationForm;