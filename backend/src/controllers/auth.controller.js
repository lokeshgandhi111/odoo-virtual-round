const { supabase, supabaseAdmin } = require("../config/supabase");

// POST /api/auth/signup
const signup = async (req, res, next) => {
	try {
		const { email, password, full_name, phone, country, avatar_url } = req.body;
		if (!email || !password || !full_name || !phone || !country) {
			return res
				.status(400)
				.json({
					error: "email, password, full_name, phone, and country are required.",
				});
		}

		const { data, error } = await supabase.auth.signUp(
			{ email, password },
			{ data: { full_name, phone, country, avatar_url } },
		);
		if (error) return res.status(400).json({ error: error.message });

		// Ensure the profile record exists or is updated if the DB trigger already created it
		if (data.user) {
			await supabaseAdmin.from("profiles").upsert(
				[
					{
						id: data.user.id,
						full_name,
						email,
						phone,
						country,
						avatar_url,
					},
				],
				{ onConflict: "id" },
			);
		}

		res.status(201).json({
			message: "Signup successful. Check your email for verification.",
			user: { id: data.user?.id, email: data.user?.email },
			session: data.session,
		});
	} catch (err) {
		next(err);
	}
};

// POST /api/auth/login
const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ error: "email and password are required." });
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) return res.status(401).json({ error: error.message });

		res.json({
			message: "Login successful.",
			user: { id: data.user.id, email: data.user.email },
			session: data.session,
			access_token: data.session.access_token,
		});
	} catch (err) {
		next(err);
	}
};

// POST /api/auth/logout
const logout = async (req, res, next) => {
	try {
		const { error } = await supabase.auth.signOut();
		if (error) return res.status(400).json({ error: error.message });
		res.json({ message: "Logged out successfully." });
	} catch (err) {
		next(err);
	}
};

// POST /api/auth/forgot-password
const forgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		if (!email) return res.status(400).json({ error: "email is required." });

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
		});
		if (error) return res.status(400).json({ error: error.message });

		res.json({ message: "Password reset email sent." });
	} catch (err) {
		next(err);
	}
};

module.exports = { signup, login, logout, forgotPassword };
