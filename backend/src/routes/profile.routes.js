const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getProfile, updateProfile, deleteAccount } = require('../controllers/profile.controller');

// All profile routes require authentication
router.use(authenticate);

// GET /api/profile
router.get('/', getProfile);

// PUT /api/profile
router.put('/', updateProfile);

// DELETE /api/profile
router.delete('/', deleteAccount);

module.exports = router;
