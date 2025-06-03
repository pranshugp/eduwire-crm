const express = require('express');
const router = express.Router();
const Lead = require('../Model/lead');
const { Parser } = require('json2csv');
const fs = require('fs'); // Adjust the path to your Lead model

// Export leads to CSV
router.get('/leads/export/csv', async (req, res) => {
  try {
    const leads = await Lead.find().lean(); // `lean()` returns plain JS objects

    const fields = ['name', 'email', 'phone', 'countryofinterest', 'course', 'status', 'source'];
    const opts = { fields };

    const parser = new Parser(opts);
    const csv = parser.parse(leads);

    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export leads to CSV.' });
  }
});

const counsellors = ['Amit Sharma', 'Neha Verma', 'Suresh Patel'];


// Create a new lead and assign a random counsellor
router.post('/leads', async (req, res) => {
  try {
    const leadData = req.body;

    // Randomly assign counsellor
    const randomCounsellor = counsellors[Math.floor(Math.random() * counsellors.length)];
    leadData.assignedTo = randomCounsellor;

    const lead = new Lead(leadData);
    await lead.save();

    res.status(201).json({ message: 'Lead created with assigned counsellor', lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /leads/assigned/:counsellorName
router.get('/leads/assigned/:counsellorName', async (req, res) => {
  try {
    const counsellorName = req.params.counsellorName;

    const leads = await Lead.find({
      assignedTo: { $regex: new RegExp('^' + counsellorName + '$', 'i') }
    });

    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leads', details: err.message });
  }
});









// Get all leads
router.get('/leads', async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a lead by ID
router.get('/leads/:id', async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a lead by ID
router.put('/leads/:id', async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});






router.put('/leads/:id/follow-up', async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({ message: 'Follow-up notes are required.' });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.followUps.push({ notes }); // date will auto populate
    await lead.save();

    res.json({ message: 'Follow-up added', lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;