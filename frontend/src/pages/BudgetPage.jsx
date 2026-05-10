import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  PieChart,
  Hotel,
  Plane,
  Utensils,
  Car,
  Ticket,
  ShoppingBag,
  Plus,
  Trash2,
  Loader2,
  ChevronDown,
  AlertCircle
} from 'lucide-react'
import useTrips from '../hooks/useTrips'
import useBudget from '../hooks/useBudget'

const getCategoryIcon = (category) => {
  switch ((category || '').toLowerCase()) {
    case 'hotel': case 'accommodation': return Hotel
    case 'travel': case 'flight': case 'transport': return Plane
    case 'activities': case 'activity': return Ticket
    case 'dining': case 'food': return Utensils
    case 'car': case 'taxi': case 'transfer': return Car
    default: return ShoppingBag
  }
}

const BudgetPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newItem, setNewItem] = useState({ label: '', category: 'other', amount: '' })

  const { trips, loading: tripsLoading } = useTrips()
  const [selectedTripId, setSelectedTripId] = useState('')

  React.useEffect(() => {
    if (trips.length > 0 && !selectedTripId) {
      setSelectedTripId(trips[0].id)
    }
  }, [trips, selectedTripId])

  const { budget, loading, addItem, deleteItem } = useBudget(selectedTripId)

  const selectedTrip = trips.find(t => t.id === selectedTripId)

  // Combine manual items + activity costs for the table
  const allExpenses = React.useMemo(() => {
    if (!budget) return []
    const manual = (budget.items || []).map(i => ({ ...i, source: 'manual' }))
    const activities = (budget.activity_costs || []).map(a => ({
      id: `act-${a.label}`,
      label: a.label,
      category: a.category,
      amount: a.amount,
      city: a.city,
      source: 'activity',
    }))
    return [...manual, ...activities]
  }, [budget])

  const filteredExpenses = React.useMemo(() => {
    let filtered = [...allExpenses]
    if (searchQuery) {
      filtered = filtered.filter(e =>
        (e.label || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.category || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (activeFilter !== 'all') {
      filtered = filtered.filter(e => (e.category || '').toLowerCase() === activeFilter.toLowerCase())
    }
    return filtered
  }, [allExpenses, searchQuery, activeFilter])

  const handleAddItem = async () => {
    if (!newItem.label.trim() || !newItem.amount) return
    await addItem(newItem.label.trim(), newItem.category, Number(newItem.amount))
    setNewItem({ label: '', category: 'other', amount: '' })
    setShowAddModal(false)
  }

  const handleDelete = async (itemId) => {
    if (window.confirm('Delete this budget item?')) {
      await deleteItem(itemId)
    }
  }

  // Budget percentages
  const percentage = budget
    ? Math.min(100, Math.round((budget.total_spend / (budget.total_budget || 1)) * 100))
    : 0
  const isOverBudget = budget?.is_over_budget

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

  return (
    <div className="space-y-6 pb-8">
      {/* Back link */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/my-trips" className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors glass-card px-4 py-2 rounded-xl">
          <ArrowLeft size={18} />
          Back to My Trips
        </Link>
      </motion.div>

      {/* Trip Selector */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-white mb-1">Budget Overview</h2>
            <p className="text-gray-400 text-sm">Select a trip to view and manage its budget</p>
          </div>
          <div className="relative">
            <select
              value={selectedTripId}
              onChange={e => setSelectedTripId(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer min-w-[220px]"
            >
              {tripsLoading && <option>Loading trips…</option>}
              {trips.length === 0 && !tripsLoading && <option>No trips found</option>}
              {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          <span className="ml-3 text-gray-400">Loading budget…</span>
        </div>
      )}

      {/* No trip selected */}
      {!selectedTripId && !tripsLoading && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <PieChart className="w-16 h-16 text-white/10 mx-auto mb-3" />
          <p className="text-gray-400">Select a trip above to view its budget.</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && budget && (
        <>
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Budget Summary card */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">{selectedTrip?.name || 'Trip Budget'}</h3>

              {isOverBudget && (
                <div className="flex items-center gap-2 text-red-400 bg-red-500/10 rounded-xl p-3 mb-4">
                  <AlertCircle size={18} />
                  <span className="text-sm font-medium">You are over budget!</span>
                </div>
              )}

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Spent</span>
                  <span className={isOverBudget ? 'text-red-400 font-semibold' : 'text-indigo-400 font-semibold'}>{percentage}%</span>
                </div>
                <div className="h-3 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 0.6 }}
                    className={`h-full rounded-full ${isOverBudget ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-indigo-500 to-pink-500'}`}
                  />
                </div>
              </div>

              {/* Category breakdown */}
              {Object.keys(budget.breakdown || {}).length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(budget.breakdown).map(([cat, amount]) => {
                    const Icon = getCategoryIcon(cat)
                    return (
                      <div key={cat} className="flex items-center gap-3 p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                          <Icon size={14} className="text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium capitalize">{cat}</p>
                          <p className="text-gray-400 text-xs">${Number(amount).toLocaleString()}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Side Insights */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <PieChart size={20} className="text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Budget Insights</h3>
              </div>

              {/* Circular progress */}
              <div className="relative flex justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.1)" strokeWidth="12" fill="none" />
                    <circle
                      cx="64" cy="64" r="56"
                      stroke={isOverBudget ? '#ef4444' : 'url(#gradient)'}
                      strokeWidth="12" fill="none"
                      strokeDasharray={`${2 * Math.PI * 56 * Math.min(percentage, 100) / 100} ${2 * Math.PI * 56}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6C63FF" />
                        <stop offset="100%" stopColor="#FF6584" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-2xl font-bold ${isOverBudget ? 'text-red-400' : 'text-white'}`}>{percentage}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Budget</span>
                  <span className="text-white font-semibold">${Number(budget.total_budget || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Spent</span>
                  <span className={`font-semibold ${isOverBudget ? 'text-red-400' : 'text-pink-400'}`}>
                    ${Number(budget.total_spend || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Avg / Day</span>
                  <span className="text-indigo-400 font-semibold">${budget.average_per_day || 0}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[rgba(255,255,255,0.1)]">
                  <span className="text-gray-400 text-sm">Remaining</span>
                  <span className={`font-semibold ${isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
                    ${Math.max(0, Number(budget.total_budget || 0) - Number(budget.total_spend || 0)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Expense Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6"
          >
            {/* Table Header + Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-bold text-white">Expense Details</h3>
              <div className="flex gap-3 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search expenses..."
                    className="pl-9 pr-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <select
                  value={activeFilter}
                  onChange={e => setActiveFilter(e.target.value)}
                  className="appearance-none px-3 py-2 pr-8 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="hotel">Hotel</option>
                  <option value="travel">Travel</option>
                  <option value="activities">Activities</option>
                  <option value="dining">Dining</option>
                  <option value="transport">Transport</option>
                </select>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Plus size={16} />
                  Add Item
                </button>
              </div>
            </div>

            {filteredExpenses.length === 0 ? (
              <div className="text-center py-10">
                <DollarSign className="w-12 h-12 text-white/10 mx-auto mb-3" />
                <p className="text-gray-400">No expenses recorded yet.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[rgba(255,255,255,0.1)]">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">#</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Category</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Description</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Source</th>
                        <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Amount</th>
                        <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpenses.map((expense, idx) => {
                        const Icon = getCategoryIcon(expense.category)
                        return (
                          <tr
                            key={expense.id}
                            className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-400 text-sm">{idx + 1}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                  <Icon size={12} className="text-indigo-400" />
                                </div>
                                <span className="text-white text-sm capitalize">{expense.category}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-white text-sm">{expense.label}</td>
                            <td className="py-3 px-4">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${expense.source === 'activity' ? 'bg-pink-500/20 text-pink-300' : 'bg-indigo-500/20 text-indigo-300'}`}>
                                {expense.source === 'activity' ? 'Activity' : 'Manual'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right text-white font-medium text-sm">${Number(expense.amount || 0).toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">
                              {expense.source === 'manual' && (
                                <button
                                  onClick={() => handleDelete(expense.id)}
                                  className="p-1.5 rounded-lg hover:bg-red-500/20 transition-all"
                                >
                                  <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {filteredExpenses.map((expense, idx) => {
                    const Icon = getCategoryIcon(expense.category)
                    return (
                      <div key={expense.id} className="glass-card rounded-xl p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                              <Icon size={14} className="text-indigo-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{expense.label}</p>
                              <p className="text-gray-500 text-xs capitalize">{expense.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-white font-semibold">${Number(expense.amount || 0).toLocaleString()}</span>
                            {expense.source === 'manual' && (
                              <button onClick={() => handleDelete(expense.id)} className="ml-2 p-1 rounded hover:bg-red-500/20 transition-all">
                                <Trash2 size={12} className="text-gray-400 hover:text-red-400" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </motion.div>

          {/* Billing Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex justify-end"
          >
            <div className="glass-card rounded-2xl p-6 w-full md:w-96">
              <h3 className="text-lg font-bold text-white mb-4">Billing Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Budget</span>
                  <span className="text-white">${Number(budget.total_budget || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Total Spent</span>
                  <span className={isOverBudget ? 'text-red-400' : 'text-pink-400'}>${Number(budget.total_spend || 0).toLocaleString()}</span>
                </div>
                <div className="border-t border-[rgba(255,255,255,0.1)] pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-lg">Remaining</span>
                    <span className={`font-bold text-xl ${isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
                      ${Math.max(0, Number(budget.total_budget || 0) - Number(budget.total_spend || 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Add Budget Item Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
            className="glass-card rounded-2xl max-w-md w-full p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Add Budget Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                <input
                  type="text"
                  value={newItem.label}
                  onChange={e => setNewItem({ ...newItem, label: e.target.value })}
                  placeholder="e.g., Hotel Paris"
                  className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                <select
                  value={newItem.category}
                  onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="hotel">Hotel</option>
                  <option value="travel">Travel</option>
                  <option value="activities">Activities</option>
                  <option value="dining">Dining</option>
                  <option value="transport">Transport</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Amount ($)</label>
                <input
                  type="number"
                  min="0"
                  value={newItem.amount}
                  onChange={e => setNewItem({ ...newItem, amount: e.target.value })}
                  placeholder="e.g., 250"
                  className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
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
                onClick={handleAddItem}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-medium text-white hover:shadow-lg transition-all"
              >
                Add Item
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default BudgetPage