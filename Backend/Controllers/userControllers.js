const User = require('../Model/user');  // import your User model here

exports.getUsersByRole = async (req, res) => {
  const role = req.query.role;
  if (!role) {
    return res.status(400).json({ message: 'Role query is required' });
  }

  try {
    const users = await User.find({ role }, 'name _id');  // Use User, not users
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};


// controllers/userController.js

exports.getAllCounsellors = async (req, res) => {
  const counsellors = await User.find({ role: 'counsellor' }).select('-password');
  res.json(counsellors);
};

exports.getCounsellorById = async (req, res) => {
  const counsellor = await User.findById(req.params.id).select('-password');
  if (!counsellor || counsellor.role !== 'counsellor') {
    return res.status(404).json({ message: 'Counsellor not found' });
  }
  res.json(counsellor);
};



