const { supabaseAdmin } = require('../config/supabase');

// GET /api/trips/:tripId/budget
const getBudget = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;

    // Fetch manual budget items
    const { data: items, error } = await supabaseAdmin
      .from('budget_items')
      .select('*')
      .eq('trip_id', tripId)
      .order('created_at', { ascending: true });

    if (error) return res.status(400).json({ error: error.message });

    // Fetch auto-calculated costs from stop_activities
    const { data: stopActivities } = await supabaseAdmin
      .from('stop_activities')
      .select(`
        id, custom_cost, scheduled_date,
        activities ( name, cost, type ),
        stops!inner ( trip_id, cities ( name ) )
      `)
      .eq('stops.trip_id', tripId);

    // Build category breakdown
    const breakdown = {};
    const activityCosts = (stopActivities || []).map((sa) => ({
      label: sa.activities?.name,
      amount: sa.custom_cost ?? sa.activities?.cost ?? 0,
      category: sa.activities?.type || 'activities',
      city: sa.stops?.cities?.name,
      date: sa.scheduled_date,
    }));

    const allItems = [
      ...items,
      ...activityCosts,
    ];

    allItems.forEach((item) => {
      const cat = item.category || 'other';
      breakdown[cat] = (breakdown[cat] || 0) + Number(item.amount || 0);
    });

    const totalSpend = Object.values(breakdown).reduce((a, b) => a + b, 0);

    // Fetch trip budget limit
    const { data: trip } = await supabaseAdmin
      .from('trips')
      .select('total_budget, start_date, end_date')
      .eq('id', tripId)
      .single();

    const tripDays = trip?.start_date && trip?.end_date
      ? Math.max(1, Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24)))
      : 1;

    res.json({
      budget: {
        total_budget: trip?.total_budget || 0,
        total_spend: totalSpend,
        average_per_day: +(totalSpend / tripDays).toFixed(2),
        is_over_budget: totalSpend > (trip?.total_budget || Infinity),
        breakdown,
        items,
        activity_costs: activityCosts,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/trips/:tripId/budget
const addBudgetItem = async (req, res, next) => {
  try {
    const { stop_id, category, label, amount } = req.body;
    if (!label || amount === undefined) {
      return res.status(400).json({ error: 'label and amount are required.' });
    }

    const { data, error } = await supabaseAdmin
      .from('budget_items')
      .insert({ trip_id: req.params.tripId, stop_id, category, label, amount })
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Budget item added.', item: data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/budget/:itemId
const deleteBudgetItem = async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin
      .from('budget_items')
      .delete()
      .eq('id', req.params.itemId);

    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Budget item deleted.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBudget, addBudgetItem, deleteBudgetItem };
