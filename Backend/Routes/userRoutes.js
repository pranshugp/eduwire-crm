const express = require('express');
const router = express.Router();
const { getUsersByRole } = require('../Controllers/userControllers'); // ✅ correct usage
const  protect  = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware'); // ✅ correct usage

// Route: GET /api/users/counsellor
router.get('/', protect, permit('admin'), getUsersByRole);


module.exports = router;
