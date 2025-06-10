const Application = require('../Model/application');
const User = require('../Model/user');

exports.createApplication = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { formData } = req.body;
  
  const application = new Application({
    userId: user._id,
    ...formData
  });
  await application.save();
  res.status(201).json(application);
};

exports.getApplications = async (req, res) => {
  const apps = await Application.find({ userId: req.user.id });
  res.json(apps);
};

exports.getApplicationById = async (req, res) => {
  const app = await Application.findById(req.params.id);
  res.json(app);
};

exports.updateApplication = async (req, res) => {
  const { formData } = req.body;
  const updated = await Application.findByIdAndUpdate(req.params.id, formData, { new: true });
  res.json(updated);
};