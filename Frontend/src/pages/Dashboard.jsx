import React, { useEffect, useState } from 'react';
import axios from '../axios'; // Adjust path as needed
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      if (user?.role === 'admin' || user?.role === 'counsellor') {
        setLoading(true);
        setError(null);
        try {
          // If counsellor, fetch only assigned leads
          const endpoint = user.role === 'counsellor' ? '/leads/mine' : '/leads';

          const res = await axios.get(endpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.data)
          setLeads(res.data);
          setTotal(res.data.length);
        } catch (err) {
          setError('Failed to load leads. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLeads();
  }, [user, token]);

  // Toggle lead details
  const toggleLeadDetails = (id) => {
    setSelectedLeadId(selectedLeadId === id ? null : id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 capitalize">Welcome, {user?.name}</h1>
      <p className="mb-8 text-lg text-gray-700">
        Your role: <span className="font-semibold capitalize">{user?.role}</span>
      </p>

      {(user?.role === 'admin' || user?.role === 'counsellor') && (
        <>
          <div className="bg-gray-100 p-5 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-semibold">
              Total Leads: <span className="text-blue-600">{total}</span>
            </h2>
          </div>

          <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4">All Leads</h3>

            {loading && (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              </div>
            )}

            {error && <p className="text-red-600 mb-4">{error}</p>}

            {!loading && !error && leads.length === 0 && (
              <p className="text-gray-600">No leads found.</p>
            )}

            {!loading && !error && leads.length > 0 && (
              <table className="min-w-full border-collapse table-auto">
                <thead className="bg-gray-200 sticky top-0">
                  <tr>
                    <th className="border px-4 py-2 text-left">Name</th>
                    <th className="border px-4 py-2 text-left">Email</th>
                    <th className="border px-4 py-2 text-left">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, idx) => (
                    <React.Fragment key={lead._id}>
                      <tr
                        className={`
                          cursor-pointer
                          ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                          hover:bg-blue-50
                        `}
                        onClick={() => toggleLeadDetails(lead._id)}
                      >
                        <td className="border px-4 py-2">{lead.fullname}</td>
                        <td className="border px-4 py-2">{lead.email}</td>
                        <td className="border px-4 py-2">{lead.phone}</td>
                      </tr>

                      {selectedLeadId === lead._id && (
                        <tr className="bg-blue-50">
                          <td colSpan={3} className="border px-4 py-4 text-gray-700">
                            {/* Show more lead details here */}
                            <p><strong>Address:</strong> {lead.countryofresidence || 'N/A'}</p>
                            <p><strong>Assigned To:</strong> {lead.assignedTo.name || 'Unassigned'}</p>
                            <p><strong>Remarks:</strong> {lead.remarks || 'No additional notes.'}</p>
                            {/* Add any other relevant lead info */}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {user?.role === 'student' && (
        <p className="text-gray-600 text-center mt-20 italic">
          Students do not have access to lead summaries.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
