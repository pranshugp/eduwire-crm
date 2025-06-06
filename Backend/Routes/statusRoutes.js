const express = require('express');
const router = express.Router();

const  protect  = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware')
const {
  getStatusesByCountry,
  addStatus,
  updateStatus,
  deleteStatus,
  reorderStatuses
} = require('../Controllers/statusControllers');

// Routes
router.get('/:countryId/statuses', protect, permit('admin'), getStatusesByCountry);
router.post('/:countryId/statuses', protect, permit('admin'), addStatus);
router.put('/:id', protect, permit('admin'), updateStatus);
router.delete('/:id', protect, permit('admin'), deleteStatus);
router.post('/reorder', protect, permit('admin'), reorderStatuses);

module.exports = router;
