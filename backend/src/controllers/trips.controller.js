const { supabaseAdmin } = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');

// GET /api/trips  – List all trips for the logged-in user
const getTrips = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('trips')
      .select(`
        *,
        stops ( id, city_id, order_index, arrival_date, departure_date,
          cities ( id, name, country, image_url )
        )
      `)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.json({ trips: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/trips  – Create a new trip
const createTrip = async (req, res, next) => {
  try {
    const { name, description, start_date, end_date, cover_photo_url, total_budget } = req.body;
    if (!name) return res.status(400).json({ error: 'Trip name is required.' });

    const { data, error } = await supabaseAdmin
      .from('trips')
      .insert({
        user_id: req.user.id,
        name,
        description,
        start_date,
        end_date,
        cover_photo_url,
        total_budget,
        share_token: uuidv4(),
      })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Trip created.', trip: data });
  } catch (err) {
    next(err);
  }
};

// GET /api/trips/:id  – Get single trip with full nested data
const getTripById = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('trips')
      .select(`
        *,
        stops (
          *,
          cities ( * ),
          stop_activities (
            *,
            activities ( * )
          )
        )
      `)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Trip not found.' });
    res.json({ trip: data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/trips/:id  – Update trip
const updateTrip = async (req, res, next) => {
  try {
    const { name, description, start_date, end_date, cover_photo_url, total_budget, is_public } = req.body;

    const { data, error } = await supabaseAdmin
      .from('trips')
      .update({ name, description, start_date, end_date, cover_photo_url, total_budget, is_public })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    if (!data) return res.status(404).json({ error: 'Trip not found or unauthorized.' });
    res.json({ message: 'Trip updated.', trip: data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/trips/:id  – Delete trip (cascades to stops, activities, budget, checklist, notes)
const deleteTrip = async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from('trips')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Trip deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

// GET /api/trips/share/:token  – Public shared itinerary (no auth required)
const getSharedTrip = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('trips')
      .select(`
        id, name, description, cover_photo_url, start_date, end_date,
        stops (
          *,
          cities ( * ),
          stop_activities (
            *,
            activities ( * )
          )
        )
      `)
      .eq('share_token', req.params.token)
      .eq('is_public', true)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Shared itinerary not found or is private.' });
    res.json({ trip: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/trips/:id/copy  – Copy a public trip to the current user
const copyTrip = async (req, res, next) => {
  try {
    // Fetch source trip
    const { data: source, error: srcErr } = await supabaseAdmin
      .from('trips')
      .select(`
        *,
        stops (
          *,
          stop_activities ( * )
        )
      `)
      .eq('id', req.params.id)
      .eq('is_public', true)
      .single();

    if (srcErr || !source) return res.status(404).json({ error: 'Trip not found or is private.' });

    // Create new trip for current user
    const { data: newTrip, error: tripErr } = await supabaseAdmin
      .from('trips')
      .insert({
        user_id: req.user.id,
        name: `${source.name} (Copy)`,
        description: source.description,
        start_date: source.start_date,
        end_date: source.end_date,
        cover_photo_url: source.cover_photo_url,
        total_budget: source.total_budget,
        share_token: uuidv4(),
        is_public: false,
      })
      .select()
      .single();

    if (tripErr) return res.status(400).json({ error: tripErr.message });

    // Copy stops and their activities
    for (const stop of (source.stops || [])) {
      const { data: newStop } = await supabaseAdmin
        .from('stops')
        .insert({
          trip_id: newTrip.id,
          city_id: stop.city_id,
          order_index: stop.order_index,
          arrival_date: stop.arrival_date,
          departure_date: stop.departure_date,
          notes: stop.notes,
        })
        .select()
        .single();

      if (newStop && stop.stop_activities?.length) {
        const activitiesToInsert = stop.stop_activities.map((sa) => ({
          stop_id: newStop.id,
          activity_id: sa.activity_id,
          scheduled_date: sa.scheduled_date,
          scheduled_time: sa.scheduled_time,
          custom_cost: sa.custom_cost,
        }));
        await supabaseAdmin.from('stop_activities').insert(activitiesToInsert);
      }
    }

    res.status(201).json({ message: 'Trip copied successfully.', trip: newTrip });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTrips, createTrip, getTripById, updateTrip, deleteTrip, getSharedTrip, copyTrip };
