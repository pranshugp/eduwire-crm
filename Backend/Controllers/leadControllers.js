const Lead = require('../Model/lead');
const User = require('../Model/user');
const { Parser } = require('json2csv');

exports.createLead = async (req, res) => {
  const lead = await Lead.create({ ...req.body, createdBy: req.user._id });
  res.json(lead);
};

exports.getAllLeads = async (req, res) => {
  const leads = await Lead.find().populate('assignedTo').populate('createdBy');
  const total = await Lead.countDocuments();
  res.json(leads,total);
};

exports.getMyLeads = async (req, res) => {
  const leads = await Lead.find({ assignedTo: req.user._id });
  res.json(leads);
};

exports.updateLead = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(lead);
};

exports.addFollowUp = async (req, res) => {
  const { notes } = req.body;
  const lead = await Lead.findById(req.params.id);
  lead.followups.push({ notes });
  await lead.save();
  res.json({ message: 'Follow-up added', lead });
};

exports.requestEdit = async (req, res) => {
  const { message } = req.body;
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  lead.editRequest = message;
  await lead.save();
  res.json({ message: 'Edit request submitted' });
};
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.exportCSV = async (req, res) => {
  try {
    const leads = await Lead.find().lean();
    const fields = ['name', 'email', 'phone', 'countryofinterest', 'course', 'status', 'source'];
    const parser = new Parser({ fields });
    const csv = parser.parse(leads);

    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export leads to CSV.' });
  }
};