const express = require('express');
const router = express.Router({ mergeParams: true });
const { authenticate } = require('../middleware/auth');
const { getBudget, addBudgetItem, deleteBudgetItem } = require('../controllers/budget.controller');

router.use(authenticate);

// Nested under /api/trips/:tripId/budget
router.get('/', getBudget);
router.post('/', addBudgetItem);
router.delete('/:itemId', deleteBudgetItem);

module.exports = router;
