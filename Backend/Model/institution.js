const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  country: { type: String, required: true },
  name: { type: String, required: true },
  type: String,
  website: String,
  campus: String,
  fundsRequirement: String,
  applicationFee: String,
  currency: String,
  monthlyLivingCost: String,
  contractTerm: String,
  contractExpiry: Date,
  languageMandatory: Boolean,
  languageRequirement: String,
  qualityOfApplicant: String,
  additionalBenefits: String,
  partTimeWork: String,
  scholarships: String,
  statusNotes: String,
  logo: String,
  prospectus: String,
    contractCopy: String, 
  documents: [{ title: String, file: String }],
});

module.exports = mongoose.model('Institution', institutionSchema);
