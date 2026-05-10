const express = require('express');
const router = express.Router();
const { authenticate, optionalAuth } = require('../middleware/auth');
const {
  getTrips,
  createTrip,
  getTripById,
  updateTrip,
  deleteTrip,
  getSharedTrip,
  copyTrip,
} = require('../controllers/trips.controller');

// Public route — shared itinerary (no auth needed)
router.get('/share/:token', getSharedTrip);

// All routes below require authentication
router.use(authenticate);

router.get('/', getTrips);
router.post('/', createTrip);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);
router.post('/:id/copy', copyTrip);

module.exports = router;
