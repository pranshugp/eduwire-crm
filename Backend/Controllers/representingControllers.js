// controllers/representingCountryController.js
const RepresentingCountry = require('../Model/RepresentingCountries');

exports.getAllRepresentingCountries = async (req, res) => {
  try {
    const countries = await RepresentingCountry.find().populate('country').sort({ createdAt: -1 });
    res.status(200).json(countries);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addRepresentingCountry = async (req, res) => {
  try {
    const {
      country,
      monthlyLivingCost,
      visaRequirements,
      partTimeWorkDetails,
      countryBenefits,
      applicationProcess,
    } = req.body;

    const alreadyExists = await RepresentingCountry.findOne({ country });
    if (alreadyExists) {
      return res.status(400).json({ error: 'Country already represented' });
    }

    const newCountry = new RepresentingCountry({
      country,
      monthlyLivingCost,
      visaRequirements,
      partTimeWorkDetails,
      countryBenefits,
      applicationProcess,
    });

    await newCountry.save();
    res.status(201).json({ message: 'Representing country added successfully', data: newCountry });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add representing country' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await RepresentingCountry.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};
