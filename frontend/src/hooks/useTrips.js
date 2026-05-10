import { useEffect } from 'react'
import useTripStore from '../store/tripStore'

const useTrips = () => {
  const { trips, currentTrip, loading, error, fetchTrips, createTrip, updateTrip, deleteTrip, setCurrentTrip, clearError } = useTripStore()

  useEffect(() => {
    fetchTrips()
  }, [])

  return { trips, currentTrip, loading, error, fetchTrips, createTrip, updateTrip, deleteTrip, setCurrentTrip, clearError }
}

export default useTrips
