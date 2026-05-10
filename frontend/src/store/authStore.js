import { create } from "zustand";
import { authAPI, profileAPI } from "../services/api";

const useAuthStore = create((set) => ({
	user: JSON.parse(localStorage.getItem("traveloop_user") || "null"),
	token: localStorage.getItem("traveloop_token") || null,
	loading: false,
	error: null,

	signup: async (email, password, full_name, phone, country, avatar_url) => {
		set({ loading: true, error: null });
		try {
			const { data } = await authAPI.signup({
				email,
				password,
				full_name,
				phone,
				country,
				avatar_url,
			});
			set({ loading: false });
			return { success: true, message: data.message };
		} catch (err) {
			const msg = err.response?.data?.error || "Signup failed";
			set({ loading: false, error: msg });
			return { success: false, error: msg };
		}
	},

	login: async (email, password) => {
		set({ loading: true, error: null });
		try {
			const { data } = await authAPI.login({ email, password });
			const token = data.session?.access_token;
			const user = data.user;
			localStorage.setItem("traveloop_token", token);
			localStorage.setItem("traveloop_user", JSON.stringify(user));
			set({ user, token, loading: false });
			return { success: true };
		} catch (err) {
			const msg = err.response?.data?.error || "Login failed";
			set({ loading: false, error: msg });
			return { success: false, error: msg };
		}
	},

	logout: async () => {
		try {
			await authAPI.logout();
		} catch (_) {}
		localStorage.removeItem("traveloop_token");
		localStorage.removeItem("traveloop_user");
		set({ user: null, token: null });
	},

	fetchProfile: async () => {
		try {
			const { data } = await profileAPI.get();
			set({ user: data.profile });
			localStorage.setItem("traveloop_user", JSON.stringify(data.profile));
		} catch (_) {}
	},

	clearError: () => set({ error: null }),
	isAuthenticated: () => !!localStorage.getItem("traveloop_token"),
}));

export default useAuthStore;
