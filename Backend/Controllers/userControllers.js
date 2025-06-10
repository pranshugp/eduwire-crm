const User = require('../Model/user');
const bcrypt = require('bcrypt');
const sendWhatsApp = require('../utils/whatsappSender')
  // import your User model here

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


exports.createCounsellor = async (req, res) => {
  try {
    const { name, email, password,phoneno } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new counsellor
    const newCounsellor = new User({
      name,
      email,
      password: hashedPassword,
      role: 'counsellor',
      phoneno,
    });

    await newCounsellor.save();
     await sendWhatsApp(phoneno, `Hi ${name}, welcome to EduWire! You can now log in.`);

    // Send response without password
    const { password: _, ...counsellorData } = newCounsellor.toObject();
    res.status(201).json(counsellorData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating counsellor' });
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



