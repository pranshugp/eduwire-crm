import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from '../axios';
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ ...user });
  const [editing, setEditing] = useState(false);
  const [previewPic, setPreviewPic] = useState(user?.profileImage || '');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setPreviewPic(URL.createObjectURL(files[0]));
    }
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md mt-10 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={previewPic || 'https://via.placeholder.com/100'}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2"><FaUserCircle /> {user.name}</h2>
          <p className="text-gray-600 flex items-center gap-2"><FaEnvelope /> {user.email}</p>
          <p className="text-gray-600 mt-1 capitalize"><strong>Role:</strong> {user.role}</p>
        </div>
      </div>

      {/* Role-Specific Info */}
      {user.role === 'admin' && (
        <div className="bg-blue-100 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">Admin Controls</h2>
          <p>Admins have full access to users, leads, and system settings.</p>
        </div>
      )}

      {user.role === 'counsellor' && (
        <div className="bg-green-100 p-4 rounded mb-6">
          <h2 className="text-xl font-semibold mb-2">Counsellor Dashboard</h2>
          <p>Manage assigned leads, communication, and follow-ups.</p>
        </div>
      )}

      {/* Editable Student Info */}
      {user.role === 'student' && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">High School Marks</label>
              <input
                type="text"
                name="highSchoolMarks"
                value={formData.highSchoolMarks || ''}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Graduation Marks</label>
              <input
                type="text"
                name="graduationMarks"
                value={formData.graduationMarks || ''}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {editing && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Passport Image</label>
                  <input type="file" name="passportImage" accept="image/*" onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Marksheet Image</label>
                  <input type="file" name="marksheetImage" accept="image/*" onChange={handleChange} />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Profile Picture</label>
                  <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end gap-4">
            {!editing ? (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...user });
                    setEditing(false);
                    setPreviewPic(user?.profileImage || '');
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
