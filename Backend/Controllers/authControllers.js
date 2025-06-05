const User = require('../Model/user');
const generateToken = require('../utils/generateTokem');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await User.create({ name, email, password, role });
  res.json({ user, token: generateToken(user) });
};

exports.login = async (req, res) => {
  console.log("LOGIN REQ BODY:", req.body); // 🐞 Debug line

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await user.comparePassword(password)) {
    res.json({ user, token: generateToken(user) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
