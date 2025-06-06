import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const ViewRepresentingCountries = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/representing-countries');
        setData(res.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const res = await axios.put(`/representing-countries/status/${id}`, {
        status: updatedStatus,
      });

      // Update state after success
      setData((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: res.data.status } : item
        )
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <div className="p-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Representing Countries</h2>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item._id} className="bg-blue-500 text-white rounded shadow-md p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={item.country.flag}
                  alt={item.country.name}
                  className="w-8 h-6 object-cover border rounded-sm"
                />
                <h3 className="text-lg font-bold uppercase">
                  {item.country.name} ({item.totalApplications || 0})
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="underline hover:text-gray-300"
                  onClick={() => navigate(`/representing-countries/edit/${item._id}`)}
                >
                  Edit
                </button>
                <div
                  onClick={() => toggleStatus(item._id, item.status)}
                  className={`w-12 h-6 flex items-center bg-gray-300 rounded-full cursor-pointer ${
                    item.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${
                      item.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white text-black mt-3 rounded p-3 text-sm space-y-1">
              <p className="flex flex-wrap gap-x-2 gap-y-1">
                <span
                  className="text-blue-700 font-medium cursor-pointer hover:underline"
                  onClick={() => navigate(`/representing-countries/${item._id}/application-process`)}
                >
                  View Application Process
                </span> |
                <span>Country Added: {new Date(item.createdAt).toLocaleDateString("en-GB")}</span> |
                <span
                  className="text-blue-700 cursor-pointer hover:underline"
                  onClick={() => navigate(`/representing-countries/${item._id}/manage-status`)}
                >
                  Manage Status
                </span> |
                <span
                  className="text-blue-700 cursor-pointer hover:underline"
                  onClick={() => navigate(`/representing-countries/${item._id}/status-notes`)}
                >
                  Status Notes
                </span> |
                <span
                  className="text-blue-700 cursor-pointer hover:underline"
                  onClick={() => navigate(`/representing-countries/${item._id}/reorder-steps`)}
                >
                  Reorder Steps
                </span> |
                <span
                  className="text-blue-700 cursor-pointer hover:underline"
                  onClick={() => navigate(`/representing-countries/${item._id}/add-status`)}
                >
                  Add New Status
                </span> |
                <span
                  className="text-blue-700 cursor-pointer hover:underline"
                  onClick={() => navigate(`/representing-countries/${item._id}/add-institution`)}
                >
                  Add Representing Institution
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRepresentingCountries;
