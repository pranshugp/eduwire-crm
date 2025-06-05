import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';

const AdminCounsellorList = () => {
  const [counsellors, setCounsellors] = useState([]);

  useEffect(() => {
    const fetchCounsellors = async () => {
      const res = await axios.get('/users/counsellors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCounsellors(res.data);
    };

    fetchCounsellors();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Counsellors</h1>
      <ul className="space-y-3">
        {counsellors.map((c) => (
          <li key={c._id} className="border p-3 rounded">
            <p><strong>{c.name}</strong> ({c.email})</p>
            <Link to={`/admin/counsellors/${c._id}`} className="text-blue-500 underline">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCounsellorList;
