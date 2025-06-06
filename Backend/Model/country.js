// models/Country.js
const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  isoCode: { type: String }, // optional for flag support
});

module.exports = mongoose.model('Country', countrySchema);
