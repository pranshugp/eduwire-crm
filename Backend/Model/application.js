// --- models/Application.js ---
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
});

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  permanentAddress: addressSchema,
  correspondenceAddress: addressSchema,

  feeDetails: {
    scholarshipOffered: String,
    proofFile: String,
    totalFee: Number,
    feePaid: Number,
    firstYearFee: Number,
    paymentMethod: String,
    referenceNumber: String,
    paymentDate: Date,
  },

  personalDetails: {
    gender: String,
    title: String,
    firstName: String,
    lastName: String,
    dob: Date,
    maritalStatus: String,
    nationality: String,
    passportNumber: String,
    passportIssueDate: Date,
    passportExpiryDate: Date,
    hasValidPassport: Boolean,
    phoneCountryCode: String,
    phoneAreaCode: String,
    phoneNumber: String,
    mobile: String,
    email: String,
  },

  courseDetails: {
    country: String,
    institute: String,
    course: String,
    intakeMonth: String,
    intakeYear: String,
    currency: String,
    paymentMethod: String,
    referenceNumber: String,
    paymentDate: Date,
    applicationFee: Number,
    sourceOfLead: String,
    remarks: String,
  }
});

module.exports = mongoose.model('Application', applicationSchema);