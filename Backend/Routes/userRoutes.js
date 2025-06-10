const express = require('express');
const router = express.Router();
const { getUsersByRole , getAllCounsellors,getCounsellorById,createCounsellor} = require('../Controllers/userControllers'); // ✅ correct usage
const  protect  = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware'); // ✅ correct usage

// Route: GET /api/users/counsellor
router.get('/', protect, permit('admin'), getUsersByRole);
// routes/userRoutes.js
router.get('/counsellors', protect, permit('admin'), getAllCounsellors);
router.get('/counsellors/:id', protect, permit('admin'), getCounsellorById);
router.post('/counsellors', protect, permit('admin'), createCounsellor);




module.exports = router;
