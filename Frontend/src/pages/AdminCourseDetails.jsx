import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../axios';

const AdminCounsellorDetails = () => {
  const { id } = useParams();
  const [counsellor, setCounsellor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounsellor = async () => {
      try {
        const res = await axios.get(`/users/counsellors/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(res.data)
        setCounsellor(res.data);
      } catch (err) {
        console.error("Error fetching counsellor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounsellor();
  }, [id]);

  if (loading) {
    return <div className="pl-64 p-6 text-center text-gray-500">Loading...</div>;
  }

  if (!counsellor) {
    return <div className="pl-64 p-6 text-red-600">Counsellor not found.</div>;
  }

  return (
    <div className="pl-64 p-6 bg-gray-50 min-h-screen">
      <Link to="/admin/counsellors" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Counsellor List
      </Link>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Counsellor Profile</h1>
        <p><strong>Name:</strong> {counsellor.name}</p>
        <p><strong>Email:</strong> {counsellor.email}</p>
        <p><strong>Phone:</strong> {counsellor.phone}</p>
        <p><strong>Assigned Leads:</strong> {counsellor.assignedLeads?.length || 0}</p>
      </div>

      {counsellor.assignedLeads?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Assigned Leads</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {counsellor.assignedLeads.map(lead => (
                  <tr key={lead._id} className="border-t">
                    
                    <td className="p-2 border">{lead.fullname || 'N/A'}</td>
                    <td className="p-2 border">{lead.email || 'N/A'}</td>
                    <td className="p-2 border">{lead.role || 'N/A'}</td>
                    <td className="p-2 border">{lead.status || 'Pending'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCounsellorDetails;
