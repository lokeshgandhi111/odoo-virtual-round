import { create } from 'zustand'
import { tripsAPI } from '../services/api'

const useTripStore = create((set, get) => ({
  trips: [],
  currentTrip: null,
  loading: false,
  error: null,

  fetchTrips: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await tripsAPI.getAll()
      set({ trips: data.trips || [], loading: false })
    } catch (err) {
      set({ error: err.response?.data?.error || 'Failed to load trips', loading: false })
    }
  },

  createTrip: async (tripData) => {
    set({ loading: true, error: null })
    try {
      const { data } = await tripsAPI.create(tripData)
      set((s) => ({ trips: [data.trip, ...s.trips], loading: false }))
      return { success: true, trip: data.trip }
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to create trip'
      set({ error: msg, loading: false })
      return { success: false, error: msg }
    }
  },

  updateTrip: async (id, tripData) => {
    try {
      const { data } = await tripsAPI.update(id, tripData)
      set((s) => ({ trips: s.trips.map(t => t.id === id ? data.trip : t) }))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.error }
    }
  },

  deleteTrip: async (id) => {
    try {
      await tripsAPI.delete(id)
      set((s) => ({ trips: s.trips.filter(t => t.id !== id) }))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.error }
    }
  },

  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  clearError: () => set({ error: null }),
}))

export default useTripStore
