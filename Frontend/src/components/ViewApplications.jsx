import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';

const ViewApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get('/applications').then(res => setApps(res.data));
  }, []);

  return (
    <div className='p-20'>
      <h1 >Applications</h1>
      {apps.map(app => (
        <div key={app._id}>
          <p>{app.personalDetails?.firstName} - {app.courseDetails?.course}</p>
          <Link to={`/applications/edit/${app._id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default ViewApplications;