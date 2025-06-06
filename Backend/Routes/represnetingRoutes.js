// routes/representingCountryRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllRepresentingCountries,
  addRepresentingCountry,
  updateStatus,
} = require('../Controllers/representingControllers');

// GET all
router.get('/', getAllRepresentingCountries);

// POST add
router.post('/add', addRepresentingCountry);

// PUT update status
router.put('/status/:id', updateStatus);

module.exports = router;
