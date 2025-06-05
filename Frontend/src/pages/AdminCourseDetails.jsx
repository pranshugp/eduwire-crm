import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';

const AdminCounsellorDetails = () => {
  const { id } = useParams();
  const [counsellor, setCounsellor] = useState(null);

  useEffect(() => {
    const fetchCounsellor = async () => {
      const res = await axios.get(`/users/counsellors/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCounsellor(res.data);
    };

    fetchCounsellor();
  }, [id]);

  if (!counsellor) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Counsellor Details</h1>
      <p><strong>Name:</strong> {counsellor.name}</p>
      <p><strong>Email:</strong> {counsellor.email}</p>
      <p><strong>Phone:</strong> {counsellor.phone}</p>
      <p><strong>Assigned Leads:</strong> {counsellor.assignedLeads?.length || 0}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default AdminCounsellorDetails;
