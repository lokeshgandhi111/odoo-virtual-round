import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  CheckSquare,
  Square,
  Plus,
  RotateCcw,
  Share2,
  FileText,
  Shirt,
  Smartphone,
  Package,
  Briefcase,
  Loader2
} from 'lucide-react'
import useTrips from '../hooks/useTrips'
import useChecklist from '../hooks/useChecklist'

// Map backend category strings → icons
const CATEGORY_ICONS = {
  documents: FileText,
  clothing: Shirt,
  electronics: Smartphone,
  toiletries: Package,
  other: Briefcase,
}

const CATEGORIES = ['documents', 'clothing', 'electronics', 'toiletries', 'other']

const ChecklistPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newItemName, setNewItemName] = useState('')
  const [newItemCategory, setNewItemCategory] = useState('documents')

  const { trips, loading: tripsLoading } = useTrips()
  const [selectedTripId, setSelectedTripId] = useState('')

  // When trips load, pre-select the first one
  React.useEffect(() => {
    if (trips.length > 0 && !selectedTripId) {
      setSelectedTripId(trips[0].id)
    }
  }, [trips, selectedTripId])

  const { items, loading, stats, addItem, toggleItem, deleteItem, resetAll } = useChecklist(selectedTripId)

  // Group items by category
  const groupedItems = React.useMemo(() => {
    let filtered = [...items]

    if (activeFilter === 'packed') filtered = filtered.filter(i => i.is_packed)
    if (activeFilter === 'unpacked') filtered = filtered.filter(i => !i.is_packed)
    if (searchQuery) {
      filtered = filtered.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (sortBy === 'az') filtered.sort((a, b) => a.label.localeCompare(b.label))
    if (sortBy === 'za') filtered.sort((a, b) => b.label.localeCompare(a.label))

    const groups = {}
    CATEGORIES.forEach(cat => { groups[cat] = [] })
    filtered.forEach(item => {
      const cat = groups[item.category] !== undefined ? item.category : 'other'
      groups[cat].push(item)
    })
    return groups
  }, [items, activeFilter, searchQuery, sortBy])

  const handleAddItem = async () => {
    if (!newItemName.trim()) return
    await addItem(newItemName.trim(), newItemCategory)
    setNewItemName('')
    setShowAddModal(false)
  }

  const handleResetAll = async () => {
    if (window.confirm('Reset all checklist items to unpacked?')) {
      await resetAll()
    }
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
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gradient-hero">
          Packing Checklist
        </h1>
        <p className="text-gray-400 mt-2">Never forget an essential item for your journey</p>
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
              placeholder="Search checklist items..."
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <select
              value={activeFilter}
              onChange={e => setActiveFilter(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">Filter: All Items</option>
              <option value="packed">Packed</option>
              <option value="unpacked">Unpacked</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="az">A to Z</option>
              <option value="za">Z to A</option>
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </motion.div>

      {/* Packing Checklist Main Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        {/* Header with Trip Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white">Packing Checklist</h2>
          <div className="relative">
            <select
              value={selectedTripId}
              onChange={e => setSelectedTripId(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer min-w-[220px]"
            >
              {tripsLoading && <option>Loading trips…</option>}
              {trips.length === 0 && !tripsLoading && <option>No trips found</option>}
              {trips.map(trip => (
                <option key={trip.id} value={trip.id}>{trip.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 text-sm">{stats.packed}/{stats.total} items packed</span>
            <span className="text-indigo-400 text-sm font-medium">{Math.round(stats.percentage)}%</span>
          </div>
          <div className="h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.percentage}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
            <span className="ml-3 text-gray-400">Loading checklist…</span>
          </div>
        )}

        {/* No trip selected */}
        {!selectedTripId && !tripsLoading && (
          <p className="text-center text-gray-400 py-8">Select a trip above to view its checklist.</p>
        )}

        {/* Empty state */}
        {!loading && selectedTripId && items.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-white/10 mx-auto mb-3" />
            <p className="text-gray-400">No checklist items yet. Add your first item!</p>
          </div>
        )}

        {/* Checklist Categories */}
        {!loading && items.length > 0 && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
            {CATEGORIES.map(cat => {
              const catItems = groupedItems[cat] || []
              if (catItems.length === 0) return null
              const Icon = CATEGORY_ICONS[cat] || Briefcase
              const packedCount = catItems.filter(i => i.is_packed).length
              return (
                <motion.div key={cat} variants={itemVariants} className="glass-card rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <Icon size={16} className="text-indigo-400" />
                      </div>
                      <h3 className="font-semibold text-white capitalize">{cat}</h3>
                    </div>
                    <span className="text-sm text-gray-400">{packedCount}/{catItems.length}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {catItems.map(item => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition-all cursor-pointer group"
                        onClick={() => toggleItem(item.id, item.is_packed)}
                      >
                        <div className="flex-shrink-0">
                          {item.is_packed
                            ? <CheckSquare size={20} className="text-green-400" />
                            : <Square size={20} className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
                          }
                        </div>
                        <span className={`text-sm flex-1 ${item.is_packed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          disabled={!selectedTripId}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl font-medium text-white shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
          Add Item
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={handleResetAll}
          disabled={!selectedTripId}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] rounded-xl font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw size={18} />
          Reset All
        </motion.button>
      </motion.div>

      {/* Add Item Modal */}
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
              className="glass-card rounded-2xl max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Add New Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Item Name</label>
                  <input
                    type="text"
                    value={newItemName}
                    onChange={e => setNewItemName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddItem()}
                    placeholder="e.g., Sunscreen, Travel Pillow"
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={e => setNewItemCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="capitalize">{cat}</option>
                    ))}
                  </select>
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
                  onClick={handleAddItem}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-medium text-white hover:shadow-lg transition-all"
                >
                  Add Item
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChecklistPage