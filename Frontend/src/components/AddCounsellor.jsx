// src/pages/admin/AddCounsellor.jsx
import { useState } from "react";
import axios from "../axios"; // Adjust if your file is elsewhere
import { useNavigate } from "react-router-dom";

const AddCounsellor = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneno:'',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/counsellors", formData);
      alert("Counsellor created successfully");
      navigate("/admin/counsellors");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating counsellor");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Counsellor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phoneno"
          placeholder="Phone no"
          value={formData.phoneno}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddCounsellor;
