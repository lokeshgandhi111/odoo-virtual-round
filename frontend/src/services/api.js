import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

// Axios instance
const api = axios.create({ baseURL: BASE_URL })

// Auto-attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('traveloop_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('traveloop_token')
      localStorage.removeItem('traveloop_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ── AUTH ────────────────────────────────────────────────────────────────────
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
}

// ── PROFILE ─────────────────────────────────────────────────────────────────
export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
  delete: () => api.delete('/profile'),
}

// ── TRIPS ───────────────────────────────────────────────────────────────────
export const tripsAPI = {
  getAll: () => api.get('/trips'),
  get: (id) => api.get(`/trips/${id}`),
  create: (data) => api.post('/trips', data),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
  copy: (id) => api.post(`/trips/${id}/copy`),
  getShared: (token) => api.get(`/trips/share/${token}`),
}

// ── STOPS ───────────────────────────────────────────────────────────────────
export const stopsAPI = {
  getAll: (tripId) => api.get(`/trips/${tripId}/stops`),
  create: (tripId, data) => api.post(`/trips/${tripId}/stops`, data),
  update: (stopId, data) => api.put(`/stops/${stopId}`, data),
  delete: (stopId) => api.delete(`/stops/${stopId}`),
  reorder: (tripId, order) => api.put(`/trips/${tripId}/stops/reorder`, { order }),
  addActivity: (stopId, data) => api.post(`/stops/${stopId}/activities`, data),
  removeActivity: (stopId, activityId) => api.delete(`/stops/${stopId}/activities/${activityId}`),
}

// ── CITIES ──────────────────────────────────────────────────────────────────
export const citiesAPI = {
  getAll: (params) => api.get('/cities', { params }),
  get: (id) => api.get(`/cities/${id}`),
  search: (query) => api.get('/cities', { params: { search: query } }),
}

// ── ACTIVITIES ──────────────────────────────────────────────────────────────
export const activitiesAPI = {
  getAll: (params) => api.get('/activities', { params }),
  get: (id) => api.get(`/activities/${id}`),
  getByCity: (cityId) => api.get('/activities', { params: { city_id: cityId } }),
}

// ── BUDGET ──────────────────────────────────────────────────────────────────
export const budgetAPI = {
  get: (tripId) => api.get(`/trips/${tripId}/budget`),
  add: (tripId, data) => api.post(`/trips/${tripId}/budget`, data),
  delete: (tripId, itemId) => api.delete(`/trips/${tripId}/budget/${itemId}`),
}

// ── CHECKLIST ───────────────────────────────────────────────────────────────
export const checklistAPI = {
  getAll: (tripId) => api.get(`/trips/${tripId}/checklist`),
  add: (tripId, data) => api.post(`/trips/${tripId}/checklist`, data),
  update: (tripId, itemId, data) => api.put(`/trips/${tripId}/checklist/${itemId}`, data),
  delete: (tripId, itemId) => api.delete(`/trips/${tripId}/checklist/${itemId}`),
  reset: (tripId) => api.put(`/trips/${tripId}/checklist/reset`),
}

// ── NOTES ───────────────────────────────────────────────────────────────────
export const notesAPI = {
  getAll: (tripId, stopId) => api.get(`/trips/${tripId}/notes`, { params: stopId ? { stop_id: stopId } : {} }),
  add: (tripId, data) => api.post(`/trips/${tripId}/notes`, data),
  update: (tripId, noteId, data) => api.put(`/trips/${tripId}/notes/${noteId}`, data),
  delete: (tripId, noteId) => api.delete(`/trips/${tripId}/notes/${noteId}`),
}

// ── ADMIN ───────────────────────────────────────────────────────────────────
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getTopCities: () => api.get('/admin/top-cities'),
  getTopActivities: () => api.get('/admin/top-activities'),
  getUsers: () => api.get('/admin/users'),
}

export default api
