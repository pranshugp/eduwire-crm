import React, { useEffect, useState } from 'react';
import axios from '../axios'; // adjust path as needed
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaPlusCircle } from 'react-icons/fa';

const ViewInstitutions = () => {
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const res = await axios.get('/institutions');
        setInstitutions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInstitutions();
  }, []);

  return (
    <div className="p-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">View Representing Institutions</h2>
        <Link to="/institutions/add" className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
          <FaPlusCircle /> Add Representing Institution
        </Link>
      </div>

      <div className="space-y-4">
        {institutions.map((inst) => (
          <div key={inst._id} className="bg-white border rounded shadow p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold uppercase">{inst.institutionName} ({inst._id})</h3>
              <div className="space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <FaEye />
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <FaEdit />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-700 mt-1">
              <strong>Institute Type:</strong> {inst.instituteType} | 
              <strong> Country:</strong> {inst.country} | 
              <strong> Campus:</strong> {inst.campus}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Contact:</strong> {inst.email} | {inst.website}
            </p>
            <p className="text-sm mt-1">
              <strong>Status:</strong> 
              <span className={`ml-2 px-2 py-1 text-white rounded ${inst.status ? 'bg-green-500' : 'bg-red-500'}`}>
                {inst.status ? 'Active' : 'Inactive'}
              </span>
              <span className="ml-4"><strong>Contract Expiry:</strong> {new Date(inst.contractExpiryDate).toLocaleDateString()}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewInstitutions;
