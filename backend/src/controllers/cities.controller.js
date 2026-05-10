const { supabaseAdmin } = require("../config/supabase");

// GET /api/cities  – search and filter cities (public)
const getCities = async (req, res, next) => {
	try {
		const { search, country, region, limit = 50 } = req.query;

		let query = supabaseAdmin
			.from("cities")
			.select("*")
			.limit(Number(limit))
			.order("popularity_score", { ascending: false });

		if (search) query = query.ilike("city_name", `%${search}%`);
		if (country) query = query.ilike("country", `%${country}%`);
		if (region) query = query.ilike("region", `%${region}%`);

		const { data, error } = await query;
		if (error) return res.status(400).json({ error: error.message });
		res.json({ cities: data });
	} catch (err) {
		next(err);
	}
};

// GET /api/cities/:id
const getCityById = async (req, res, next) => {
	try {
		const { data, error } = await supabaseAdmin
			.from("cities")
			.select("*, activities(*)")
			.eq("id", req.params.id)
			.single();

		if (error || !data)
			return res.status(404).json({ error: "City not found." });
		res.json({ city: data });
	} catch (err) {
		next(err);
	}
};

module.exports = { getCities, getCityById };
