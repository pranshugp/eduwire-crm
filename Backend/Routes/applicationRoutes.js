const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware'); // replaces authenticate
const permit = require('../middleware/roleMiddleware');  // replaces authorizeRoles

const {
  createApplication,
  getApplications,

  getApplicationById,
  updateApplication,
  
} = require('../Controllers/applicationController');

// Protect all routes (require authentication)
router.use(protect);

// Application routes with role-based permissions
router.post('/', permit('admin', 'counsellor'), createApplication);
router.get('/', permit('admin','counsellor'), getApplications);

router.get('/:id', permit('admin', 'counsellor'), getApplicationById);
router.put('/:id', permit('admin', 'counsellor'), updateApplication);


module.exports = router;
