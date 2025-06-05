import React, { useEffect, useState } from 'react';
import axios from '../axios';
import LeadTable from '../components/LeadTable';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  // ✅ Get user and token from Redux
  const { user, token } = useSelector((state) => state.auth); // adjust "auth" if your slice name is different

  useEffect(() => {
    if (!user || !token) return;

    const endpoint = user.role === 'admin' ? '/leads' : '/leads/mine';

    axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setLeads(res.data))
    .catch(err => {
      console.error("Failed to fetch leads:", err);
    });
  }, [user, token]);

  const downloadCSV = () => {
    if (!leads.length) return;
    const headers = ['firstname','lastname','email','phone','countryofinterest','course','source','status','followUps'];
    const csvRows = [
      headers.join(','),
      ...leads.map(lead => {
        const followUpsText = (lead.followUps || []).map(f => `${f.date?.slice(0,10)}: ${f.notes}`).join(' | ');
        return headers.map(header => `"${(header === 'followUps' ? followUpsText : lead[header] ?? '').toString().replace(/"/g, '""')}"`).join(',');
      })
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/leads/new')}>+ New Enquiry</button>
      </div>
      <LeadTable leads={leads} onDownload={downloadCSV} />
    </div>
  );
}
