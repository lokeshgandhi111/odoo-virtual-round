const { supabaseAdmin } = require('../config/supabase');

// GET /api/trips/:tripId/checklist
const getChecklist = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('checklist_items')
      .select('*')
      .eq('trip_id', req.params.tripId)
      .order('category')
      .order('created_at');

    if (error) return res.status(400).json({ error: error.message });
    res.json({ checklist: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/trips/:tripId/checklist
const addChecklistItem = async (req, res, next) => {
  try {
    const { label, category } = req.body;
    if (!label) return res.status(400).json({ error: 'label is required.' });

    const { data, error } = await supabaseAdmin
      .from('checklist_items')
      .insert({ trip_id: req.params.tripId, label, category: category || 'other' })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Item added.', item: data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/trips/:tripId/checklist/:itemId
const updateChecklistItem = async (req, res, next) => {
  try {
    const { label, category, is_packed } = req.body;

    const { data, error } = await supabaseAdmin
      .from('checklist_items')
      .update({ label, category, is_packed })
      .eq('id', req.params.itemId)
      .eq('trip_id', req.params.tripId)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Item updated.', item: data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/trips/:tripId/checklist/:itemId
const deleteChecklistItem = async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from('checklist_items')
      .delete()
      .eq('id', req.params.itemId)
      .eq('trip_id', req.params.tripId);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Item deleted.' });
  } catch (err) {
    next(err);
  }
};

// PUT /api/trips/:tripId/checklist/reset  – uncheck all items
const resetChecklist = async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from('checklist_items')
      .update({ is_packed: false })
      .eq('trip_id', req.params.tripId);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Checklist reset.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getChecklist, addChecklistItem, updateChecklistItem, deleteChecklistItem, resetChecklist };
