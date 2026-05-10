const express = require('express');
const router = express.Router({ mergeParams: true });
const { authenticate } = require('../middleware/auth');
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/notes.controller');

router.use(authenticate);

// Nested under /api/trips/:tripId/notes
router.get('/', getNotes);
router.post('/', addNote);
router.put('/:noteId', updateNote);
router.delete('/:noteId', deleteNote);

module.exports = router;
