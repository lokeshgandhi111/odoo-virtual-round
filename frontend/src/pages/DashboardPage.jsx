import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowUpDown,
  MapPin,
  Calendar,
  Users,
  Clock,
  Star,
  MoreHorizontal,
  ChevronRight,
  Plane,
  Hotel,
  Utensils,
  Camera
} from 'lucide-react'
import useTrips from '../hooks/useTrips'
import useAuth from '../hooks/useAuth'
import { useNavigate as useNav } from 'react-router-dom'

const DashboardPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { trips, loading } = useTrips()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  // Derive trip sections from real data
  const allTrips = trips
  const upcomingTrips = trips.filter(t => t.status === 'planning' || t.status === 'upcoming')
  const previousTrips = trips.filter(t => t.status === 'completed')

  const filteredTrips = allTrips.filter(t => {
    const matchSearch = !searchQuery || t.name?.toLowerCase().includes(searchQuery.toLowerCase()) || t.destination?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchFilter = activeFilter === 'all' || t.status === activeFilter
    return matchSearch && matchFilter
  })

  const topRegions = [
    { id: 1, name: 'European Wonders', countries: 'France, Italy, Spain', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=300&fit=crop', trips: 124, rating: 4.8 },
    { id: 2, name: 'Asian Explorer', countries: 'Japan, Thailand, Vietnam', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&h=300&fit=crop', trips: 98, rating: 4.9 },
    { id: 3, name: 'Americas Adventure', countries: 'USA, Canada, Mexico', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&h=300&fit=crop', trips: 156, rating: 4.7 },
  ]

  const filters = [
    { id: 'all', label: 'All Trips' },
    { id: 'planning', label: 'Planning' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden h-64 md:h-80"
      >
        {/* Banner Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-violet-900/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=500&fit=crop"
          alt="Travel Banner"
          className="w-full h-full object-cover"
        />
        
        {/* Banner Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {user ? `Welcome back, ${user.email?.split('@')[0]}!` : 'Ready for Your Next Adventure?'}
            </h1>
            <p className="text-gray-200 mb-6">
              Discover new destinations and plan your perfect multi-city journey
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/50">
              <Plus size={18} />
              Plan a Trip
            </button>
          </div>
        </div>

        {/* User Profile Badge */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-3 bg-black/30 backdrop-blur-md rounded-full px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">{user?.email?.[0]?.toUpperCase() || 'T'}</span>
          </div>
          <span className="text-white text-sm font-medium hidden sm:inline">{user?.email?.split('@')[0] || 'Traveler'}</span>
        </div>
      </motion.div>

      {/* Search and Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 rounded-2xl"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your trips, destinations, or activities..."
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-[rgba(255,255,255,0.05)] rounded-lg">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm text-gray-300">Group by</span>
            </div>
            
            <select className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500">
              <option>Filter</option>
              <option>By Date</option>
              <option>By Status</option>
              <option>By Budget</option>
            </select>

            <select className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500">
              <option>Sort by...</option>
              <option>Most Recent</option>
              <option>Oldest</option>
              <option>Highest Budget</option>
              <option>Lowest Budget</option>
            </select>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                  : 'bg-[rgba(255,255,255,0.05)] text-gray-400 hover:bg-[rgba(255,255,255,0.1)]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Top Regional Selections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Top Regional Selections</h2>
            <p className="text-gray-400 text-sm mt-1">Most popular multi-city routes this season</p>
          </div>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRegions.map((region, idx) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={region.image} 
                  alt={region.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-white text-sm">{region.rating}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white mb-1">{region.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{region.countries}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{region.trips} trips planned</span>
                  <button className="text-indigo-400 hover:text-indigo-300 transition-colors">Explore →</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Trips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center justify-between mb-4 mt-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Upcoming Trips</h2>
            <p className="text-gray-400 text-sm mt-1">Get ready for your next adventure</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading && <p className="text-gray-400 text-sm">Loading trips...</p>}
          {!loading && upcomingTrips.length === 0 && (
            <div className="col-span-1 md:col-span-2 glass-card rounded-2xl p-8 text-center">
              <Calendar className="mx-auto mb-3 text-gray-600" size={40} />
              <p className="text-gray-400">No upcoming trips planned. Time to explore!</p>
            </div>
          )}
          {upcomingTrips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/trip/${trip.id}`)}
              className="glass-card rounded-2xl p-4 cursor-pointer group"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-indigo-900/30 flex items-center justify-center shrink-0">
                  <Plane size={32} className="text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors line-clamp-1">{trip.name}</h3>
                    <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs shrink-0 ml-2">Planning</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 mb-2 text-sm text-gray-400">
                    <MapPin size={14} className="text-indigo-400" />
                    <span className="truncate">{trip.destination}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{trip.start_date?.slice(0,10)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Previous Trips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Previous Trips</h2>
            <p className="text-gray-400 text-sm mt-1">Relive your past adventures</p>
          </div>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="space-y-4">
          {loading && <p className="text-gray-400 text-sm">Loading trips...</p>}
          {!loading && previousTrips.length === 0 && (
            <div className="glass-card rounded-2xl p-8 text-center">
              <Plane className="mx-auto mb-3 text-gray-600" size={40} />
              <p className="text-gray-400">No completed trips yet. Start planning!</p>
              <button onClick={() => navigate('/create-trip')} className="mt-4 px-4 py-2 bg-indigo-600 rounded-xl text-white text-sm">Plan a Trip</button>
            </div>
          )}
          {previousTrips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="glass-card rounded-2xl p-4 cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-32 h-24 rounded-xl overflow-hidden bg-indigo-900/30 flex items-center justify-center">
                  <Plane size={32} className="text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-white text-lg">{trip.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin size={14} className="text-indigo-400" />
                        <span className="text-sm text-gray-400">{trip.destination}</span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Completed</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-300">{trip.start_date?.slice(0,10)} → {trip.end_date?.slice(0,10)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-indigo-400 font-semibold">${trip.budget || '—'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Plan a Trip CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative rounded-2xl overflow-hidden mt-6"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 backdrop-blur-sm" />
        <div className="relative p-6 md:p-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                Ready to create your next adventure?
              </h3>
              <p className="text-gray-300">Start planning your perfect multi-city journey today</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 whitespace-nowrap"
            >
              <Plus size={18} />
              Plan a Trip
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <button className="glass-card p-4 rounded-xl text-center hover:border-indigo-500 transition-all duration-300 group">
          <Plane className="mx-auto mb-2 text-indigo-400 group-hover:scale-110 transition-transform" size={24} />
          <p className="text-sm font-medium text-white">Find Flights</p>
        </button>
        <button className="glass-card p-4 rounded-xl text-center hover:border-indigo-500 transition-all duration-300 group">
          <Hotel className="mx-auto mb-2 text-indigo-400 group-hover:scale-110 transition-transform" size={24} />
          <p className="text-sm font-medium text-white">Book Hotels</p>
        </button>
        <button className="glass-card p-4 rounded-xl text-center hover:border-indigo-500 transition-all duration-300 group">
          <Utensils className="mx-auto mb-2 text-indigo-400 group-hover:scale-110 transition-transform" size={24} />
          <p className="text-sm font-medium text-white">Find Restaurants</p>
        </button>
        <button className="glass-card p-4 rounded-xl text-center hover:border-indigo-500 transition-all duration-300 group">
          <Camera className="mx-auto mb-2 text-indigo-400 group-hover:scale-110 transition-transform" size={24} />
          <p className="text-sm font-medium text-white">Activities</p>
        </button>
      </motion.div>
    </div>
  )
}

export default DashboardPage