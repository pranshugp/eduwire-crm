import React from 'react';
import { useNavigate } from 'react-router-dom';

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString();
};

export default function LeadTable({ leads }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 rounded-md table-auto">
        <thead className="bg-gray-200">
          <tr>
            <th scope="col" className="border px-3 py-2 text-left">Full Name</th>
            <th scope="col" className="border px-3 py-2 text-left">DOB</th>
            <th scope="col" className="border px-3 py-2 text-left">Email</th>
            <th scope="col" className="border px-3 py-2 text-left">Phone</th>
            <th scope="col" className="border px-3 py-2 text-left">Country</th>
            <th scope="col" className="border px-3 py-2 text-left">Budget</th>
            <th scope="col" className="border px-3 py-2 text-left">Preferred Country</th>
            <th scope="col" className="border px-3 py-2 text-left">Preferred Course</th>
            <th scope="col" className="border px-3 py-2 text-left">Source</th>
            <th scope="col" className="border px-3 py-2 text-left">Status</th>
            <th scope="col" className="border px-3 py-2 text-left">Qualification</th>
            <th scope="col" className="border px-3 py-2 text-left">Intake</th>
            <th scope="col" className="border px-3 py-2 text-left">Counsellor</th>
            <th scope="col" className="border px-3 py-2 text-left">Follow-ups</th>
            <th scope="col" className="border px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => navigate(`/leads/view/${lead._id}`)}
              title="Click to view lead details"
            >
              <td className="border px-3 py-2">{lead.fullname || 'N/A'}</td>
              <td className="border px-3 py-2">{formatDate(lead.DOB)}</td>
              <td className="border px-3 py-2">{lead.email || 'N/A'}</td>
              <td className="border px-3 py-2">{lead.phone || 'N/A'}</td>
              <td className="border px-3 py-2">{lead.countryofresidence || 'N/A'}</td>
              <td className="border px-3 py-2">{lead.budget || 'N/A'}</td>
              <td className="border px-3 py-2">{lead.preferencecountry || 'N/A'}</td>
              <td className="border px-3 py-2">{lead.prefferredcourse || 'N/A'}</td>
              <td className="border px-3 py-2">{lead.source || 'N/A'}</td>
              <td className="border px-3 py-2">{lead.status || 'N/A'}</td>
              <td className="border px-3 py-2">{lead.qualification || 'N/A'}</td>
              <td className="border px-3 py-2">{lead.intake ? formatDate(lead.intake) : 'N/A'}</td>
              <td className="border px-3 py-2">{lead.counsellorname || 'Unassigned'}</td>
              <td className="border px-3 py-2 max-w-xs truncate" title={lead.followUps?.map(f => f.notes).join('\n') || 'No follow-ups'}>
                {lead.followUps?.length ? `${lead.followUps.length} follow-up(s)` : 'None'}
              </td>
              <td className="border px-3 py-2 text-blue-600 underline cursor-pointer" onClick={(e) => { e.stopPropagation(); navigate(`/leads/edit/${lead._id}`); }}>
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
