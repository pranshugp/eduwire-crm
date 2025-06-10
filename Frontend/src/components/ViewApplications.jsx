// src/pages/ViewApplications.jsx
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.get('/applications').then((res) => setApplications(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Applications</h2>
      <Link to="/applications/new" className="bg-green-600 text-white px-4 py-2 rounded">
  + New Application
</Link>
      <div className="grid gap-4">
        {applications.map((app) => (
          <div key={app._id} className="p-4 border rounded shadow-sm bg-white">
            <p>
              <strong>Name:</strong> {app.personalDetails?.firstName} {app.personalDetails?.lastName}
            </p>
            <p>
              <strong>Course:</strong> {app.courseDetails?.course} in {app.courseDetails?.country}
            </p>
            <Link
              to={`/applications/edit/${app._id}`}
              className="inline-block mt-2 text-blue-600 hover:underline"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplications;
