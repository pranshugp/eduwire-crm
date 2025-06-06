const express = require('express');
const router = express.Router();
const multer = require('multer');
const institutionController = require('../Controllers/institutionControllers');

const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads/contracts/';
    fs.mkdirSync(uploadPath, { recursive: true }); // ensure directory exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });
// GET route to fetch all institutions
router.get('/', institutionController.getAllInstitutions);

// POST route for creating institution with file upload
router.post('/', upload.single('contractCopy'), institutionController.createInstitution);

module.exports = router;
