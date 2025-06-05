import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LeadTable({ leads, onDownload }) {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <button onClick={onDownload} className="mb-2 px-4 py-2 bg-green-500 text-white rounded">Download CSV</button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th>First</th><th>DOB</th><th>Email</th><th>Phone</th><th>Country</th><th>Course</th><th>Prefferd Coun.</th><th>Course</th><th>source</th><th>status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead._id} className="border">
              <td>{lead.fullname}</td>
              <td>{lead.DOB}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
            <td>{lead.countryofresidence}</td>
            <td>{lead.budget}</td>
              <td>{lead.preferencecountry}</td>
              <td>{lead.prefferredcourse}</td>
              <td>{lead.source}</td>
              <td>{lead.status}</td>
                <td>{lead.qualification}</td>
              <td>{lead.intake}</td>

              <td>{lead.counsellorname || 'Unassigned'}</td>
              <td>
                {lead.followUps?.map(f => <div key={f._id}>{f.notes}</div>)}
              </td>
              <td>
                <button className="text-blue-600 underline" onClick={() => navigate(`/leads/edit/${lead._id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
