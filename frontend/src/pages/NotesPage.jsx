import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  BookOpen,
  X,
  Save,
  Clock,
  Loader2
} from 'lucide-react'
import useTrips from '../hooks/useTrips'
import useNotes from '../hooks/useNotes'

const NotesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  const { trips, loading: tripsLoading } = useTrips()
  const [selectedTripId, setSelectedTripId] = useState('')

  React.useEffect(() => {
    if (trips.length > 0 && !selectedTripId) {
      setSelectedTripId(trips[0].id)
    }
  }, [trips, selectedTripId])

  const { notes, loading, addNote, updateNote, deleteNote } = useNotes(selectedTripId)

  // Backend notes have only `content`. We store "Title\nContent" format.
  const parseNote = (note) => {
    const lines = (note.content || '').split('\n')
    return {
      ...note,
      title: lines[0] || 'Untitled Note',
      body: lines.slice(1).join('\n'),
    }
  }

  const filteredNotes = React.useMemo(() => {
    let filtered = notes.map(parseNote)
    if (searchQuery) {
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.body.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }
    return filtered
  }, [notes, searchQuery, sortBy])

  const handleAddNote = async () => {
    if (!newTitle.trim() && !newContent.trim()) return
    const combined = newTitle.trim()
      ? `${newTitle.trim()}\n${newContent.trim()}`
      : newContent.trim()
    await addNote(combined)
    setNewTitle('')
    setNewContent('')
    setShowAddModal(false)
  }

  const handleSaveEdit = async () => {
    if (!editingNote || !editContent.trim()) return
    await updateNote(editingNote.id, editContent.trim())
    setEditingNote(null)
    setEditContent('')
  }

  const handleStartEdit = (note) => {
    setEditingNote(note)
    setEditContent(note.content)
  }

  const handleDelete = async (noteId) => {
    if (window.confirm('Delete this note?')) {
      await deleteNote(noteId)
    }
  }

  const formatDate = (ds) => {
    if (!ds) return ''
    return new Date(ds).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gradient-hero">Trip Notes</h1>
        <p className="text-gray-400 mt-2">Capture memories, ideas, and important details for your journey</p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-4"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search notes by title or content..."
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="title">Sort: Title A-Z</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </motion.div>

      {/* Main Notes Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        {/* Header with Trip Selector & Add Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Trip Notes</h2>
            <div className="relative">
              <select
                value={selectedTripId}
                onChange={e => setSelectedTripId(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {tripsLoading && <option>Loading…</option>}
                {trips.length === 0 && !tripsLoading && <option>No trips found</option>}
                {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            disabled={!selectedTripId}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl font-medium text-white shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
            Add Note
          </motion.button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            <span className="ml-3 text-gray-400">Loading notes…</span>
          </div>
        )}

        {/* No trip */}
        {!selectedTripId && !tripsLoading && (
          <p className="text-center text-gray-400 py-8">Select a trip above to view its notes.</p>
        )}

        {/* Empty */}
        {!loading && selectedTripId && notes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-white/10 mx-auto mb-3" />
            <p className="text-gray-400">No notes yet. Add your first note!</p>
          </div>
        )}

        {/* Notes list */}
        {!loading && filteredNotes.length > 0 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
            <AnimatePresence>
              {filteredNotes.map(note => (
                <motion.div
                  key={note.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="glass-card rounded-xl p-5 hover:border-indigo-500/50 transition-all duration-300"
                >
                  {editingNote?.id === note.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        rows={4}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 resize-none"
                        placeholder="Note content (first line = title)"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button onClick={handleSaveEdit} className="px-3 py-1.5 bg-indigo-600 rounded-lg text-white text-sm flex items-center gap-1">
                          <Save size={14} /> Save
                        </button>
                        <button onClick={() => setEditingNote(null)} className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] rounded-lg text-gray-400 text-sm">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg mb-1">{note.title}</h3>
                        {note.body && <p className="text-gray-300 text-sm leading-relaxed mb-3">{note.body}</p>}
                        <div className="flex flex-wrap gap-4 text-xs">
                          <span className="flex items-center gap-1 text-gray-400">
                            <Clock size={12} />
                            {formatDate(note.created_at)}
                          </span>
                          {note.stop_id && (
                            <span className="flex items-center gap-1 text-gray-400">
                              <MapPin size={12} />
                              Stop linked
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleStartEdit(note)}
                          className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-indigo-500/20 transition-all"
                        >
                          <Edit2 size={16} className="text-gray-400 hover:text-indigo-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 size={16} className="text-gray-400 hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="glass-card rounded-2xl max-w-lg w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Add New Note</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="e.g., Hotel check-in details"
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    rows={4}
                    placeholder="Write your notes here..."
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-white/20 text-gray-400 hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-medium text-white hover:shadow-lg transition-all"
                >
                  Add Note
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotesPage