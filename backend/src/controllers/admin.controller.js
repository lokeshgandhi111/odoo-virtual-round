const { supabaseAdmin } = require('../config/supabase');

// GET /api/admin/stats
const getStats = async (req, res, next) => {
  try {
    const [tripsRes, profilesRes, citiesRes, activitiesRes] = await Promise.all([
      supabaseAdmin.from('trips').select('id, created_at, is_public', { count: 'exact' }),
      supabaseAdmin.from('profiles').select('id', { count: 'exact' }),
      supabaseAdmin.from('cities').select('id, name', { count: 'exact' }),
      supabaseAdmin.from('activities').select('id', { count: 'exact' }),
    ]);

    res.json({
      stats: {
        total_trips: tripsRes.count || 0,
        total_users: profilesRes.count || 0,
        total_cities: citiesRes.count || 0,
        total_activities: activitiesRes.count || 0,
        public_trips: (tripsRes.data || []).filter((t) => t.is_public).length,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/top-cities
const getTopCities = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('stops')
      .select('city_id, cities(name, country)')
      .limit(500);

    if (error) return res.status(400).json({ error: error.message });

    const counts = {};
    (data || []).forEach(({ city_id, cities }) => {
      if (!city_id) return;
      counts[city_id] = counts[city_id] || { city_id, name: cities?.name, country: cities?.country, count: 0 };
      counts[city_id].count++;
    });

    const topCities = Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({ top_cities: topCities });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/top-activities
const getTopActivities = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('stop_activities')
      .select('activity_id, activities(name, type)')
      .limit(500);

    if (error) return res.status(400).json({ error: error.message });

    const counts = {};
    (data || []).forEach(({ activity_id, activities }) => {
      if (!activity_id) return;
      counts[activity_id] = counts[activity_id] || {
        activity_id,
        name: activities?.name,
        type: activities?.type,
        count: 0,
      };
      counts[activity_id].count++;
    });

    const topActivities = Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    res.json({ top_activities: topActivities });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/users
const getUsers = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, email, created_at, language')
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.json({ users: data });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats, getTopCities, getTopActivities, getUsers };
