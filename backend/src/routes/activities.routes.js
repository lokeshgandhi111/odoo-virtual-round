const express = require('express');
const router = express.Router();
const { getActivities, getActivityById } = require('../controllers/activities.controller');

// Public routes
router.get('/', getActivities);
router.get('/:id', getActivityById);

module.exports = router;
