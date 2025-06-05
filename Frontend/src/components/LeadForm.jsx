import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { useSelector } from 'react-redux';

const initialFormState = {
  fullname: '',
  email: '',
  phone: '',
  DOB: '',
  gender: 'Male',
  countryofresidence: '',
  preferencecountry: '',
  prefferredcourse: '',
  intake: '',
  qualification: '',
  score: '',
  budget: '',
  source: '',
  status: 'New',
  counsellorname: '',
  assignedTo: '',
  remarks: '',
};

const LeadForm = ({ onSuccess, onCancel }) => {
  const { id } = useParams();
  const [form, setForm] = useState(initialFormState);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [counsellors, setCounsellors] = useState([]);

  const { user, token } = useSelector(state => state.auth);

  // Fetch counsellor list
  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        const res = await axios.get('/users?role=counsellor', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCounsellors(res.data);
      } catch (err) {
        console.error('Failed to fetch counsellors:', err);
      }
    };

    if (user.role !== 'counsellor') {
      fetchCounsellors();
    }
  }, [token, user.role]);

  // Prefill if counsellor is creating a lead
  useEffect(() => {
    if (!id && user.role === 'counsellor') {
      setForm(prev => ({
        ...prev,
        assignedTo: user._id,
        counsellorname: user.name,
      }));
    }
  }, [id, user]);

  // Fetch lead data on edit
  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await axios.get(`/leads/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setForm({ ...initialFormState, ...res.data });
      } catch (err) {
        setError('Failed to load lead data.');
      }
    };

    if (id) fetchLead();
  }, [id, token]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCounsellorChange = e => {
    const selectedId = e.target.value;
    const selectedCounsellor = counsellors.find(c => c._id === selectedId);
    setForm({
      ...form,
      assignedTo: selectedId,
      counsellorname: selectedCounsellor?.name || '',
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const payload = { ...form };

      if (user.role === 'counsellor') {
        delete payload.assignedTo;
      }

      if (id) {
        if (user.role === 'student') {
          await axios.put(`/leads/${id}/request-edit`, payload, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMessage('Edit request submitted successfully!');
        } else {
          await axios.put(`/leads/${id}`, payload, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setMessage('Lead updated successfully!');
        }
      } else {
        await axios.post('/leads', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Lead registered successfully!');
      }

      setForm(initialFormState);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-6">
      <h2 className="text-2xl font-semibold mb-4">{id ? 'Edit Lead' : 'Register Lead'}</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="fullname" value={form.fullname} onChange={handleChange} placeholder="Full Name" required className="input" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="input" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required className="input" />
        <input name="DOB" type="date" value={form.DOB?.slice(0, 10)} onChange={handleChange} required className="input" />

        <select name="gender" value={form.gender} onChange={handleChange} required className="input">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input name="countryofresidence" value={form.countryofresidence} onChange={handleChange} placeholder="Country of Residence" required className="input" />
        <input name="preferencecountry" value={form.preferencecountry} onChange={handleChange} placeholder="Preferred Country" required className="input" />
        <input name="prefferredcourse" value={form.prefferredcourse} onChange={handleChange} placeholder="Preferred Course" required className="input" />
        <input name="intake" value={form.intake} onChange={handleChange} placeholder="Intake (e.g. Fall 2025)" required className="input" />
        <input name="qualification" value={form.qualification} onChange={handleChange} placeholder="Qualification" required className="input" />
        <input name="score" type="number" value={form.score} onChange={handleChange} placeholder="Score (optional)" className="input" />
        <input name="budget" value={form.budget} onChange={handleChange} placeholder="Budget" required className="input" />
        <input name="source" value={form.source} onChange={handleChange} placeholder="Source (e.g. Website)" required className="input" />

        <select name="status" value={form.status} onChange={handleChange} className="input">
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Followed Up">Followed Up</option>
          <option value="Converted">Converted</option>
          <option value="Not Interested">Not Interested</option>
        </select>

        {/* Assigned To Dropdown or Display */}
        {user.role !== 'counsellor' ? (
          <select name="assignedTo" value={form.assignedTo} onChange={handleCounsellorChange} className="input">
            <option value="">-- Assign to Counsellor --</option>
            {counsellors.map(c => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        ) : (
          <input type="text" value={user.name} disabled className="input" />
        )}

        <textarea name="remarks" value={form.remarks} onChange={handleChange} placeholder="Remarks" className="input" rows="2" />

        <div className="col-span-full flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {id ? 'Update Lead' : 'Submit Lead'}
          </button>
          {id && (
            <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
