import React, { useState } from 'react';
import axios from '../axios'; // or just 'axios'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const RequestEdit = () => {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  const { id } = useParams(); // lead ID from URL

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user|| !token) {
      alert("You must be logged in to send a request.");
      return;
    }

    try {
      await axios.put(`/leads/${id}/request-edit`, 
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setSuccess(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Request Profile Edit</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your edit request here..."
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Request
        </button>
      </form>
      {success && <p className="text-green-600 mt-2">Edit request submitted!</p>}
    </div>
  );
};

export default RequestEdit;
