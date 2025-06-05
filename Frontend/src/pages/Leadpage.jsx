import React, { useEffect, useState, useMemo } from 'react';
import axios from '../axios';
import LeadTable from '../components/LeadTable';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !token) return;

    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = user.role === 'admin' ? '/leads' : '/leads/mine';
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeads(res.data);
      } catch (err) {
        console.error('Failed to fetch leads:', err);
        setError('Failed to fetch leads. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [user, token]);

  // Filter leads by search term (name/email)
  const filteredLeads = useMemo(() => {
    if (!searchTerm) return leads;
    const lower = searchTerm.toLowerCase();
    return leads.filter(
      (lead) =>
        (lead.firstname?.toLowerCase().includes(lower) ||
         lead.lastname?.toLowerCase().includes(lower) ||
         lead.email?.toLowerCase().includes(lower))
    );
  }, [leads, searchTerm]);

  const downloadCSV = () => {
    if (!filteredLeads.length) return;
    const headers = ['firstname','lastname','email','phone','countryofinterest','course','source','status','followUps'];
    const csvRows = [
      headers.join(','),
      ...filteredLeads.map(lead => {
        const followUpsText = (lead.followUps || [])
          .map(f => `${f.date?.slice(0,10)}: ${f.notes}`)
          .join(' | ');
        return headers
          .map(header => `"${(header === 'followUps' ? followUpsText : lead[header] ?? '').toString().replace(/"/g, '""')}"`)
          .join(',');
      }),
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
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <button
          onClick={() => navigate('/leads/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold shadow transition"
        >
          + New Enquiry
        </button>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search leads by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-72 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={downloadCSV}
            disabled={filteredLeads.length === 0}
            className={`px-4 py-2 rounded font-semibold text-white transition
              ${filteredLeads.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
            `}
            title={filteredLeads.length === 0 ? "No leads to download" : "Download CSV"}
          >
            Download CSV
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-10 text-blue-600 font-semibold">Loading leads...</div>
      )}

      {error && (
        <div className="text-center py-4 text-red-600 font-semibold">{error}</div>
      )}

      {!loading && !error && filteredLeads.length === 0 && (
        <p className="text-center py-8 text-gray-500 italic">
          No leads found{searchTerm ? ` for "${searchTerm}"` : '.'}
        </p>
      )}

      {!loading && !error && filteredLeads.length > 0 && (
        <LeadTable leads={filteredLeads} />
      )}
    </div>
  );
}
