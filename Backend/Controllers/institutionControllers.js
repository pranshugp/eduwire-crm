const Institution = require('../Model/institution');

exports.createInstitution = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.contractCopy = req.file.path; // save file path
    }

    const institution = new Institution(data);
    await institution.save();

    res.status(201).json({ message: 'Institution created', institution });
  } catch (error) {
    console.error('Error creating institution:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// New method to get all institutions
exports.getAllInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find();
    res.status(200).json(institutions);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
