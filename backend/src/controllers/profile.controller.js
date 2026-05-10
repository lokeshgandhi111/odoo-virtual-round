const { supabaseAdmin } = require("../config/supabase");

// GET /api/profile
const getProfile = async (req, res, next) => {
	try {
		const { data, error } = await supabaseAdmin
			.from("profiles")
			.select("*")
			.eq("id", req.user.id)
			.single();

		if (error) return res.status(404).json({ error: "Profile not found." });
		res.json({ profile: data });
	} catch (err) {
		next(err);
	}
};

// PUT /api/profile
const updateProfile = async (req, res, next) => {
	try {
		const { full_name, avatar_url, language, phone, country } = req.body;

		const updates = {};
		if (full_name !== undefined) updates.full_name = full_name;
		if (avatar_url !== undefined) updates.avatar_url = avatar_url;
		if (language !== undefined) updates.language = language;
		if (phone !== undefined) updates.phone = phone;
		if (country !== undefined) updates.country = country;

		const { data, error } = await supabaseAdmin
			.from("profiles")
			.update(updates)
			.eq("id", req.user.id)
			.select()
			.single();

		if (error) return res.status(400).json({ error: error.message });
		res.json({ message: "Profile updated.", profile: data });
	} catch (err) {
		next(err);
	}
};

// DELETE /api/profile
const deleteAccount = async (req, res, next) => {
	try {
		// Delete profile row first
		await supabaseAdmin.from("profiles").delete().eq("id", req.user.id);
		// Delete auth user
		const { error } = await supabaseAdmin.auth.admin.deleteUser(req.user.id);
		if (error) return res.status(400).json({ error: error.message });
		res.json({ message: "Account deleted successfully." });
	} catch (err) {
		next(err);
	}
};

module.exports = { getProfile, updateProfile, deleteAccount };
