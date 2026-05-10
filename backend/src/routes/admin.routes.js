const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getStats, getTopCities, getTopActivities, getUsers } = require('../controllers/admin.controller');

// All admin routes protected (in production, add role check middleware)
router.use(authenticate);

router.get('/stats', getStats);
router.get('/top-cities', getTopCities);
router.get('/top-activities', getTopActivities);
router.get('/users', getUsers);

module.exports = router;
