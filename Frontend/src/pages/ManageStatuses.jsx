import React, { useEffect, useState } from 'react';
import axios from '../axios';  // your configured axios instance
import { useParams } from 'react-router-dom';

const ManageStatuses = () => {
  const { countryId } = useParams();  // Get countryId from URL params
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (!countryId) return;

    const fetchStatuses = async () => {
      try {
        const res = await axios.get(`/representing-countries/${countryId}/statuses`);
        setStatuses(res.data);
      } catch (error) {
        console.error('Failed to fetch statuses:', error);
      }
    };

    fetchStatuses();
  }, [countryId]);

  const handleAdd = async () => {
    if (!newStatus.trim()) return;

    try {
      const res = await axios.post(`/representing-countries/${countryId}/statuses`, {
        name: newStatus,
        stepNumber: statuses.length + 1,
        country: countryId
      });
      setStatuses([...statuses, res.data]);
      setNewStatus('');
    } catch (err) {
      console.error('Error adding status:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/statuses/${id}`);
      setStatuses(statuses.filter((s) => s._id !== id));
    } catch (err) {
      console.error('Error deleting status:', err);
    }
  };

  if (!countryId) return <p>No country selected.</p>;

  return (
    <div style={{ padding: '40px' }}>
      <h2>Manage Statuses for Country ID: {countryId}</h2>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Enter new status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
        <button onClick={handleAdd} style={{ padding: '8px 16px' }}>Add</button>
      </div>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f0f8ff' }}>
          <tr>
            <th>S. No.</th>
            <th>Step Number</th>
            <th>Status Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status, index) => (
            <tr key={status._id} style={{ textAlign: 'center' }}>
              <td>{index + 1}</td>
              <td>{status.stepNumber}</td>
              <td>{status.name}</td>
              <td>
                <button onClick={() => handleDelete(status._id)} style={{ color: 'red' }}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStatuses;
