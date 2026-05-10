const { supabaseAdmin } = require('../config/supabase');

// GET /api/trips/:tripId/stops
const getStops = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('stops')
      .select(`
        *,
        cities ( * ),
        stop_activities (
          *,
          activities ( * )
        )
      `)
      .eq('trip_id', req.params.tripId)
      .order('order_index', { ascending: true });

    if (error) return res.status(400).json({ error: error.message });
    res.json({ stops: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/trips/:tripId/stops
const addStop = async (req, res, next) => {
  try {
    const { city_id, arrival_date, departure_date, notes } = req.body;
    if (!city_id) return res.status(400).json({ error: 'city_id is required.' });

    // Get current max order_index for this trip
    const { data: existing } = await supabaseAdmin
      .from('stops')
      .select('order_index')
      .eq('trip_id', req.params.tripId)
      .order('order_index', { ascending: false })
      .limit(1);

    const nextIndex = existing?.length ? existing[0].order_index + 1 : 0;

    const { data, error } = await supabaseAdmin
      .from('stops')
      .insert({
        trip_id: req.params.tripId,
        city_id,
        order_index: nextIndex,
        arrival_date,
        departure_date,
        notes,
      })
      .select(`*, cities(*)`)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Stop added.', stop: data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/stops/:stopId
const updateStop = async (req, res, next) => {
  try {
    const { city_id, arrival_date, departure_date, notes } = req.body;

    const { data, error } = await supabaseAdmin
      .from('stops')
      .update({ city_id, arrival_date, departure_date, notes })
      .eq('id', req.params.stopId)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Stop updated.', stop: data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/stops/:stopId
const deleteStop = async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from('stops')
      .delete()
      .eq('id', req.params.stopId);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Stop deleted.' });
  } catch (err) {
    next(err);
  }
};

// PUT /api/trips/:tripId/stops/reorder
// Body: { order: [{ id: "stop_uuid", order_index: 0 }, ...] }
const reorderStops = async (req, res, next) => {
  try {
    const { order } = req.body;
    if (!Array.isArray(order)) return res.status(400).json({ error: 'order must be an array.' });

    const updates = order.map(({ id, order_index }) =>
      supabaseAdmin.from('stops').update({ order_index }).eq('id', id)
    );

    await Promise.all(updates);
    res.json({ message: 'Stops reordered.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/stops/:stopId/activities
const addActivityToStop = async (req, res, next) => {
  try {
    const { activity_id, scheduled_date, scheduled_time, custom_cost } = req.body;
    if (!activity_id) return res.status(400).json({ error: 'activity_id is required.' });

    const { data, error } = await supabaseAdmin
      .from('stop_activities')
      .insert({
        stop_id: req.params.stopId,
        activity_id,
        scheduled_date,
        scheduled_time,
        custom_cost,
      })
      .select(`*, activities(*)`)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Activity added to stop.', stop_activity: data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/stops/:stopId/activities/:activityId
const removeActivityFromStop = async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from('stop_activities')
      .delete()
      .eq('stop_id', req.params.stopId)
      .eq('id', req.params.activityId);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Activity removed from stop.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getStops,
  addStop,
  updateStop,
  deleteStop,
  reorderStops,
  addActivityToStop,
  removeActivityFromStop,
};
