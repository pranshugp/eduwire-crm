// src/pages/ApplicationForm.jsx
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
  const { id } = useParams(); // used for edit
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
    },
    courseDetails: {
      country: '',
      course: '',
    },
  });

  useEffect(() => {
    if (id) {
      axios.get(`/applications/${id}`).then((res) => setFormData(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    const [section, field] = e.target.name.split('.');
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`/applications/${id}`, { formData });
    } else {
      await axios.post('/applications', { formData });
    }
    navigate('/applications');
  };

  return (
    <div className="max-w-2xl mx-auto p-20 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit' : 'New'} Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">First Name</label>
          <input
            name="personalDetails.firstName"
            value={formData.personalDetails?.firstName || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Last Name</label>
          <input
            name="personalDetails.lastName"
            value={formData.personalDetails?.lastName || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            name="personalDetails.email"
            value={formData.personalDetails?.email || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
            type="email"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Course</label>
          <input
            name="courseDetails.course"
            value={formData.courseDetails?.course || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Country</label>
          <input
            name="courseDetails.country"
            value={formData.courseDetails?.country || ''}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
