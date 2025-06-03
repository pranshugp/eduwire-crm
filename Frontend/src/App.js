import React, { useEffect, useState } from 'react';
import axios from './axios'

export default function EnquiryManagement() {
 
 const [leads, setLeads] = useState([]);
 const [editingLead, setEditingLead] = useState(null);

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    countryofinterest: '',
    course: '',
    source: '',
    status: 'New'
  });

  const fetchLeads = async () => {
    try {
      const res = await axios.get('/leads');
      console.log(res.data)
      setLeads(res.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
//   const getLeadById = async (id) => {
//   try {
//     const res = await axios.get(`http://localhost:5000/api/leads/683d6d7902933c24a1d48b0c`);
//     console.log('Lead data:', res.data);
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching lead by ID:', error.response?.data || error.message);
//   }
// };

const downloadCSV = () => {
  if (!leads.length) return;

  const headers = [
    'firstname','lastname', 'email', 'phone', 'countryofinterest',
    'course', 'source', 'status', 'followUps'
  ];

  const csvRows = [
    headers.join(','), // header row
    ...leads.map(lead => {
      const followUpsText = (lead.followUps || [])
        .map(f => `${f.date?.slice(0, 10)}: ${f.notes}`)
        .join(' | ');
      return headers.map(header => {
        const value = header === 'followUps' ? followUpsText : lead[header] ?? '';
        return `"${value.toString().replace(/"/g, '""')}"`; // escape quotes
      }).join(',');
    })
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'leads_with_followups.csv';
  a.click();
  URL.revokeObjectURL(url);
};
const handleEdit = (lead) => {
  setEditingLead(lead);
  setForm({ ...lead }); // pre-fill form with existing lead data
};



const handleSubmit = async e => {
  e.preventDefault();

  try {
    if (editingLead) {
      // PUT request to update existing lead
      await axios.put(`/leads/${editingLead._id}`, form);
    } else {
      // POST request to create new lead
      await axios.post('/leads', form);
    }

    setForm({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      countryofinterest: '',
      course: '',
      source: '',
      status: 'New'
    });
    setEditingLead(null); // reset editing mode
    fetchLeads();
  } catch (error) {
    console.error('Error submitting lead:', error);
  }
};


  return (
    <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {/* Lead Form */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>New Lead</h2>
        <form  onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} required />
          <input name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
          <input name="countryofinterest" placeholder="Country of Interest" value={form.countryofinterest} onChange={handleChange} required />
          <input name="course" placeholder="Course" value={form.course} onChange={handleChange} required />
          <input name="source" placeholder="Source (e.g. Website)" value={form.source} onChange={handleChange} required />
          <input name="status" placeholder="Status (e.g New,In progress,followeup)" value={form.status} onChange={handleChange} required />
          <button  type="submit"  style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Submit Enquiry</button>
        </form>
      </div>
      {editingLead && (
  <button type="button" onClick={() => {
    setEditingLead(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      countryofinterest: '',
      course: '',
      source: '',
      status: 'New'
    });
  }}>
    Cancel Edit
  </button>
)}

      

      {/* Lead Table */}
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
        <button
  onClick={downloadCSV}
  style={{
    marginBottom: '10px',
    padding: '8px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px'
  }}
>
  Download CSV
</button>

        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>All Enquiries</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>First Name</th>
              <th style={thStyle}>Last Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Country</th>
              <th style={thStyle}>Course</th>
              <th style={thStyle}>Source</th>
              <th style={thStyle}>Status</th>
               <th style={thStyle}>Assigned to</th>
              <th style={thStyle}>Follow Ups</th>

              
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead._id}>
                <td style={tdStyle}>{lead.firstname}</td>
                <td style={tdStyle}>{lead.lastname}</td>
                <td style={tdStyle}>{lead.email}</td>
                <td style={tdStyle}>{lead.phone}</td>
                <td style={tdStyle}>{lead.countryofinterest}</td>
                
                <td style={tdStyle}>{lead.course}</td>
                <td style={tdStyle}>{lead.source}</td>
                <td style={tdStyle}>{lead.status}</td>
                <td style={tdStyle}>{lead.assignedTo || 'Unassigned'}</td>
                <td style={tdStyle}>
  {lead.followUps?.map(f => (
    <div key={f._id}>
      {f.notes}
    </div>
  ))}
</td>
<td><button onClick={() => handleEdit(lead)}>Edit</button>
</td>
              {/* <button style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }} onClick={getLeadById}>Student data</button> */}

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2'
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px'
};
