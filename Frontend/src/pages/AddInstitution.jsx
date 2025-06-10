import React, { useState } from 'react';
import axios from '../axios';

const AddInstitution = () => {
  const [formData, setFormData] = useState({
    country: '',
    institutionName: '',
    instituteType: '',
    website: '',
    campus: '',
    visaFundRequirement: '',
    applicationFee: '',
    monthlyLivingCost: '',
    currency: '',
    contractTerm: '',
    contractExpiry: '',
    languageRequired: 'no',
    languageRequirementDetails: '',
    qualityOfApplicant: '',
    contractCopy: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post('/institutions', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        
      } , );
      console.log(res.data)
      alert('Institution added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding institution.');
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Representing Institution</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <div>
          <label className="block">Country *</label>
          <select
            name="country"
            required
            onChange={handleChange}
            value={formData.country}
            className="border p-2 w-full"
          >
            <option value="">Select Country</option>
            <option>India</option>
            <option>Australia</option>
          </select>
        </div>

        <div>
          <label className="block">Institution Name *</label>
          <input
            type="text"
            name="name"
            required
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <div>
          <label className="block">Institute Type</label>
          <select
            name="instituteType"
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.type}
          >
            <option value="">Select</option>
            <option value="Direct">Direct</option>
            <option value="Indirect">Indirect</option>
          </select>
        </div>

        <div>
          <label className="block">Website *</label>
          <input
            type="text"
            name="website"
            required
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.website}
          />
        </div>

        <div>
          <label className="block">Campus</label>
          <input
            type="text"
            name="campus"
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.campus}
          />
        </div>

        <div>
          <label className="block">Funds Requirement for Visa</label>
          <input
            type="text"
            name="visaFundRequirement"
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.visaFundRequirement}
          />
        </div>

        <div>
          <label className="block">Application Fee</label>
          <input
            type="text"
            name="applicationFee"
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.applicationFee}
          />
        </div>

        <div>
          <label className="block">Monthly Living Cost</label>
          <input
            type="text"
            name="monthlyLivingCost"
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.monthlyLivingCost}
          />
        </div>

        <div>
          <label className="block">Currency</label>
          <select
            name="currency"
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.currency}
          >
            <option value="">Select</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div>
          <label className="block">Contract Term</label>
          <input
            type="text"
            name="contractTerm"
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.contractTerm}
          />
        </div>

        <div>
          <label className="block">Contract Expiry Date</label>
          <input
            type="date"
            name="contractExpiryDate"
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.contractExpiry}
          />
        </div>

        <div>
          <label className="block">Is language mandatory?</label>
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                name="languageRequired"
                value="yes"
                onChange={handleChange}
                checked={formData.languageRequired === 'yes'}
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name="languageRequired"
                value="no"
                onChange={handleChange}
                checked={formData.languageRequired === 'no'}
              /> No
            </label>
          </div>
        </div>

        <div>
          <label className="block">Languages Requirement</label>
          <input
            type="text"
            name="languageRequirementDetails"
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.languageRequirementDetails}
          />
        </div>

        <div>
          <label className="block">Quality Of Applicant Desired</label>
          <input
            type="text"
            name="qualityOfApplicant"
            className="border p-2 w-full"
            onChange={handleChange}
            value={formData.qualityOfApplicant}
          />
        </div>

        <div>
          <label className="block">Upload Contract Copy</label>
          <input type="file" name="contractCopy" onChange={handleChange} />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddInstitution;
