const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams for :tripId
const { authenticate } = require('../middleware/auth');
const {
  getStops,
  addStop,
  updateStop,
  deleteStop,
  reorderStops,
  addActivityToStop,
  removeActivityFromStop,
} = require('../controllers/stops.controller');

router.use(authenticate);

// Nested under /api/trips/:tripId/stops
router.get('/', getStops);
router.post('/', addStop);
router.put('/reorder', reorderStops);

// Standalone stop operations mounted separately in app.js as /api/stops
router.put('/:stopId', updateStop);
router.delete('/:stopId', deleteStop);

// Stop activities
router.post('/:stopId/activities', addActivityToStop);
router.delete('/:stopId/activities/:activityId', removeActivityFromStop);

module.exports = router;
