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
    <div className="pl-64 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Counsellors</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {counsellors.map((c) => (
          <div key={c._id} className="border p-4 rounded-lg shadow bg-white">
            <p className="text-lg font-semibold">{c.name}</p>
            <p className="text-gray-600">{c.email}</p>
            <Link
              to={`/admin/counsellors/${c._id}`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCounsellorList;
