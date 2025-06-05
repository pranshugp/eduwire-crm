



const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');
const {
  createLead,
  getAllLeads,
  getMyLeads,
  updateLead,
  addFollowUp,
  requestEdit,
  exportCSV,
  getLeadById
} = require('../Controllers/leadControllers');

router.use(protect);

router.post('/leads', permit('admin', 'counsellor'), createLead);
router.get('/leads', permit('admin'), getAllLeads);
router.get('/leads/mine', permit('counsellor'), getMyLeads);
router.get('/leads/:id', permit('admin', 'counsellor'), getLeadById);
router.put('/leads/:id', permit('admin', 'counsellor'), updateLead);
router.put('/leads/:id/follow-up', permit('admin', 'counsellor'), addFollowUp);
router.put('/leads/:id/request-edit', permit('student'), requestEdit);
router.get('/export/csv', permit('admin'), exportCSV);




module.exports = router;