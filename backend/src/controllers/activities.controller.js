const { supabaseAdmin } = require('../config/supabase');

// GET /api/activities  – filter by city_id, type, max_cost (public)
const getActivities = async (req, res, next) => {
  try {
    const { city_id, type, max_cost, search, limit = 50 } = req.query;

    let query = supabaseAdmin
      .from('activities')
      .select('*, cities(id, name, country)')
      .limit(Number(limit));

    if (city_id) query = query.eq('city_id', city_id);
    if (type) query = query.eq('type', type);
    if (max_cost) query = query.lte('cost', Number(max_cost));
    if (search) query = query.ilike('name', `%${search}%`);

    const { data, error } = await query;
    if (error) return res.status(400).json({ error: error.message });
    res.json({ activities: data });
  } catch (err) {
    next(err);
  }
};

// GET /api/activities/:id
const getActivityById = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('activities')
      .select('*, cities(id, name, country)')
      .eq('id', req.params.id)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Activity not found.' });
    res.json({ activity: data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getActivities, getActivityById };
