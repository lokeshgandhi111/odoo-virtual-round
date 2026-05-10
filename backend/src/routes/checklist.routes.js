const express = require('express');
const router = express.Router({ mergeParams: true });
const { authenticate } = require('../middleware/auth');
const {
  getChecklist,
  addChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
  resetChecklist,
} = require('../controllers/checklist.controller');

router.use(authenticate);

// Nested under /api/trips/:tripId/checklist
router.get('/', getChecklist);
router.post('/', addChecklistItem);
router.put('/reset', resetChecklist);
router.put('/:itemId', updateChecklistItem);
router.delete('/:itemId', deleteChecklistItem);

module.exports = router;
