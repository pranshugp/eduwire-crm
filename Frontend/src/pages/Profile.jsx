import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from '../axios';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ ...user });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.put(`/students/profile`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      console.error(error);
      alert('Error updating profile');
    }
  };

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow mt-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {/* Common Info */}
      <div className="mb-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* Admin View */}
      {user.role === 'admin' && (
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Admin Controls</h2>
          <p>Admins have full access to users, leads, and exports.</p>
        </div>
      )}

      {/* Counsellor View */}
      {user.role === 'counsellor' && (
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Counsellor Controls</h2>
          <p>Counsellors manage their assigned leads and follow-ups.</p>
        </div>
      )}

      {/* Student View */}
      {user.role === 'student' && (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mt-4">
            <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} disabled={!editing} placeholder="Phone" className="input" />
            <input type="text" name="address" value={formData.address || ''} onChange={handleChange} disabled={!editing} placeholder="Address" className="input" />
            <input type="text" name="highSchoolMarks" value={formData.highSchoolMarks || ''} onChange={handleChange} disabled={!editing} placeholder="High School Marks" className="input" />
            <input type="text" name="graduationMarks" value={formData.graduationMarks || ''} onChange={handleChange} disabled={!editing} placeholder="Graduation Marks" className="input" />

            {editing && (
              <>
                <label>Upload Passport:</label>
                <input type="file" name="passportImage" accept="image/*" onChange={handleChange} />
                <label>Upload Marksheet:</label>
                <input type="file" name="marksheetImage" accept="image/*" onChange={handleChange} />
              </>
            )}

            {!editing ? (
              <button type="button" onClick={() => setEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
            ) : (
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
