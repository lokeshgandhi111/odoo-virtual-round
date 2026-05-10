const { supabaseAdmin } = require('../config/supabase');

// GET /api/trips/:tripId/notes
const getNotes = async (req, res, next) => {
  try {
    const { stop_id } = req.query;
    let query = supabaseAdmin
      .from('trip_notes')
      .select('*')
      .eq('trip_id', req.params.tripId)
      .order('created_at', { ascending: false });

    if (stop_id) query = query.eq('stop_id', stop_id);

    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });
    res.json({ notes: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/trips/:tripId/notes
const addNote = async (req, res, next) => {
  try {
    const { content, stop_id } = req.body;
    if (!content) return res.status(400).json({ error: 'content is required.' });

    const { data, error } = await supabaseAdmin
      .from('trip_notes')
      .insert({ trip_id: req.params.tripId, stop_id: stop_id || null, content })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Note added.', note: data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/trips/:tripId/notes/:noteId
const updateNote = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'content is required.' });

    const { data, error } = await supabaseAdmin
      .from('trip_notes')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', req.params.noteId)
      .eq('trip_id', req.params.tripId)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Note updated.', note: data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/trips/:tripId/notes/:noteId
const deleteNote = async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from('trip_notes')
      .delete()
      .eq('id', req.params.noteId)
      .eq('trip_id', req.params.tripId);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Note deleted.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getNotes, addNote, updateNote, deleteNote };
