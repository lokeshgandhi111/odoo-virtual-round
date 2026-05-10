import { useState, useEffect, useCallback } from 'react'
import { checklistAPI } from '../services/api'

const useChecklist = (tripId) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchChecklist = useCallback(async () => {
    if (!tripId) return
    setLoading(true)
    setError(null)
    try {
      const { data } = await checklistAPI.getAll(tripId)
      setItems(data.checklist || [])
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load checklist')
    } finally {
      setLoading(false)
    }
  }, [tripId])

  useEffect(() => {
    fetchChecklist()
  }, [fetchChecklist])

  const addItem = async (label, category = 'other') => {
    try {
      const { data } = await checklistAPI.add(tripId, { label, category })
      setItems(prev => [...prev, data.item])
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.error }
    }
  }

  const toggleItem = async (itemId, currentPacked) => {
    // Optimistic update
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, is_packed: !currentPacked } : i))
    try {
      await checklistAPI.update(tripId, itemId, { is_packed: !currentPacked })
    } catch (err) {
      // Revert on failure
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, is_packed: currentPacked } : i))
    }
  }

  const deleteItem = async (itemId) => {
    setItems(prev => prev.filter(i => i.id !== itemId))
    try {
      await checklistAPI.delete(tripId, itemId)
    } catch (err) {
      fetchChecklist()
    }
  }

  const resetAll = async () => {
    setItems(prev => prev.map(i => ({ ...i, is_packed: false })))
    try {
      await checklistAPI.reset(tripId)
    } catch (err) {
      fetchChecklist()
    }
  }

  const stats = {
    total: items.length,
    packed: items.filter(i => i.is_packed).length,
    percentage: items.length > 0 ? (items.filter(i => i.is_packed).length / items.length) * 100 : 0,
  }

  return { items, loading, error, stats, addItem, toggleItem, deleteItem, resetAll, refetch: fetchChecklist }
}

export default useChecklist
