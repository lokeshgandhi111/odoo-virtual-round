import { useState, useEffect, useCallback } from 'react'
import { budgetAPI } from '../services/api'

const useBudget = (tripId) => {
  const [budget, setBudget] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchBudget = useCallback(async () => {
    if (!tripId) return
    setLoading(true)
    setError(null)
    try {
      const { data } = await budgetAPI.get(tripId)
      setBudget(data.budget)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load budget')
    } finally {
      setLoading(false)
    }
  }, [tripId])

  useEffect(() => {
    fetchBudget()
  }, [fetchBudget])

  const addItem = async (label, category, amount, stop_id = null) => {
    try {
      await budgetAPI.add(tripId, { label, category, amount: Number(amount), stop_id })
      await fetchBudget()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.error }
    }
  }

  const deleteItem = async (itemId) => {
    try {
      await budgetAPI.delete(tripId, itemId)
      await fetchBudget()
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.error }
    }
  }

  return { budget, loading, error, addItem, deleteItem, refetch: fetchBudget }
}

export default useBudget
