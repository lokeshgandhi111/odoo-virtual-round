import { useState, useEffect, useCallback } from 'react'
import { notesAPI } from '../services/api'

const useNotes = (tripId) => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchNotes = useCallback(async () => {
    if (!tripId) return
    setLoading(true)
    setError(null)
    try {
      const { data } = await notesAPI.getAll(tripId)
      setNotes(data.notes || [])
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load notes')
    } finally {
      setLoading(false)
    }
  }, [tripId])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const addNote = async (content, stop_id = null) => {
    try {
      const { data } = await notesAPI.add(tripId, { content, stop_id })
      setNotes(prev => [data.note, ...prev])
      return { success: true, note: data.note }
    } catch (err) {
      return { success: false, error: err.response?.data?.error }
    }
  }

  const updateNote = async (noteId, content) => {
    try {
      const { data } = await notesAPI.update(tripId, noteId, { content })
      setNotes(prev => prev.map(n => n.id === noteId ? data.note : n))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.error }
    }
  }

  const deleteNote = async (noteId) => {
    setNotes(prev => prev.filter(n => n.id !== noteId))
    try {
      await notesAPI.delete(tripId, noteId)
    } catch (err) {
      fetchNotes()
    }
  }

  return { notes, loading, error, addNote, updateNote, deleteNote, refetch: fetchNotes }
}

export default useNotes
