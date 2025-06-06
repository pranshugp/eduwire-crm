const Status = require('../Model/Status') 

exports.getStatusesByCountry = async (req, res) => {
  const { countryId } = req.params;
  const statuses = await Status.find({ country: countryId }).sort({ order: 1 });
  res.json(statuses);
};

exports.addStatus = async (req, res) => {
  const { country, name, stepNumber, autoEmailTemplate } = req.body;
  const count = await Status.countDocuments({ country });
  const newStatus = new Status({
    country,
    name,
    stepNumber,
    autoEmailTemplate,
    order: count // push to end
  });
  await newStatus.save();
  res.status(201).json(newStatus);
};

exports.updateStatus = async (req, res) => {
  const status = await Status.findById(req.params.id);
  if (!status) return res.status(404).json({ message: 'Status not found' });

  Object.assign(status, req.body);
  await status.save();
  res.json(status);
};

exports.deleteStatus = async (req, res) => {
  await Status.findByIdAndDelete(req.params.id);
  res.json({ message: 'Status deleted' });
};

exports.reorderStatuses = async (req, res) => {
  const { reordered } = req.body; // [{id, order}, {id, order}...]
  for (const { id, order } of reordered) {
    await Status.findByIdAndUpdate(id, { order });
  }
  res.json({ message: 'Order updated' });
};
