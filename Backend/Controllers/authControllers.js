const User = require('../Model/user');
const generateToken = require('../utils/generateTokem');
const sendEmail = require('../utils/sendEmail');
const sendWhatsapp = require('../utils/whatsappSender');
const bcrypt = require('bcrypt')


const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ================= Register =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phoneno } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const newUser = await User.create({
      name,
      email,
      password,
      role,
      phoneno,
      otp,
      otpExpiry,
      isVerified: false,
    });

    await sendEmail(email, "Verify Your Email", `Your OTP is:${otp}`);
    await sendWhatsapp(phoneno, `👋 Hi ${name}, your EduWire OTP is: ${otp}`);
      if (role === 'student') {
      const welcomeMsg = `Welcome ${name} to our Consultancy! We’ll keep you updated on your application.`;

      await sendEmail(email, "Welcome to Our Consultancy", welcomeMsg);
      await sendWhatsapp(phoneno, welcomeMsg);
    }

    res.status(201).json({
      message: "Registration successful. OTP sent to email.",
      userId: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.login = async (req, res) => {

  console.log("LOGIN REQ BODY:", req.body); 
  const { email, password } = req.body;
  console.log("Login attempt with:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: 'Invalid  password' });
    }

   if (!user.isVerified) {
    console.log("Email not verified")
      return res.status(401).json({ message: "Please verify your email before logging in." });
    }

    const token = generateToken(user._id);
    console.log("✅ Login successful");
    res.status(200).json({ user, token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};


// ================= Verify OTP =================
// controllers/authController.js



exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.isVerified) return res.status(400).json({ message: "Already verified." });

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("OTP Verify error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.isVerified) return res.status(400).json({ message: "User already verified." });

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendEmail(user.email, "Your new OTP", `<p>Your new OTP is: <strong>${otp}</strong></p>`);
    await sendWhatsapp(user.phoneno, `🔁 Your new OTP for EduWire is: ${otp}`);

    res.status(200).json({ message: "OTP resent successfully." });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // <-- define here

  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000;

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  await sendEmail(user.email, 'Reset your password', `Your OTP is: ${otp}`);

  res.status(200).json({ message: 'OTP sent to your email.' });
};



exports.resetpassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ msg: "Invalid or expired OTP" });
  }

  user.password = newPassword;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.json({ msg: "Password reset successful" });
}

