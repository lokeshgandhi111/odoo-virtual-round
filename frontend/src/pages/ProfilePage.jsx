import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar,
  Edit2,
  Save,
  Camera,
  X,
  TrendingUp,
  Plane,
  Calendar as CalendarIcon,
  DollarSign,
  Award,
  Star,
  Clock,
  Heart,
  Plus,
  ChevronRight,
  CheckCircle,
  Users,
  Briefcase,
  Coffee
} from 'lucide-react'
import useAuth from '../hooks/useAuth'
import useTrips from '../hooks/useTrips'

const ProfilePage = () => {
  const { user } = useAuth()
  const { trips } = useTrips()

  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [profilePreview, setProfilePreview] = useState(null)
  const fileInputRef = useRef(null)

  const [profileData, setProfileData] = useState({
    fullName: user?.full_name || 'Traveler',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 123-4567',
    country: user?.country || 'United States',
    city: user?.city || 'New York',
    travelPreference: user?.travel_preference || 'Luxury & Adventure',
    bio: user?.bio || 'Passionate traveler exploring the world one city at a time. Love discovering hidden gems and experiencing local cultures.',
    joinDate: new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  })

  const [editableData, setEditableData] = useState({ ...profileData })

  // Real trips
  const plannedTrips = trips.filter(t => t.status === 'planning' || t.status === 'upcoming')
  const previousTrips = trips.filter(t => t.status === 'completed')

  // Statistics data
  const statistics = [
    { icon: Plane, label: 'Total Trips', value: trips.length.toString(), color: 'indigo', gradient: 'from-indigo-600 to-indigo-400' },
    { icon: CalendarIcon, label: 'Upcoming Trips', value: plannedTrips.length.toString(), color: 'pink', gradient: 'from-pink-600 to-pink-400' },
    { icon: CheckCircle, label: 'Completed Trips', value: previousTrips.length.toString(), color: 'green', gradient: 'from-green-600 to-green-400' },
    { icon: Globe, label: 'Countries Visited', value: '0', color: 'purple', gradient: 'from-purple-600 to-purple-400' },
    { icon: DollarSign, label: 'Total Spent', value: '$0', color: 'amber', gradient: 'from-amber-600 to-amber-400' },
  ]

  // Wishlist destinations
  const wishlist = [
    { name: 'Swiss Alps', country: 'Switzerland', icon: Mountain },
    { name: 'Northern Lights', country: 'Norway', icon: Star },
    { name: 'Safari Adventure', country: 'Kenya', icon: Compass },
  ]

  // Activity timeline
  const activities = [
    { action: 'Created new itinerary', detail: 'European Summer Tour', time: '2 hours ago', icon: Plane },
    { action: 'Added budget section', detail: 'Paris trip budget updated', time: '1 day ago', icon: DollarSign },
    { action: 'Shared trip', detail: 'Shared with travel group', time: '3 days ago', icon: Users },
    { action: 'Updated profile', detail: 'Changed profile picture', time: '1 week ago', icon: User },
  ]

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setProfileData({ ...editableData })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditableData({ ...profileData })
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setEditableData(prev => ({ ...prev, [field]: value }))
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
    <div className="space-y-8 pb-8">
      {/* Profile Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          {/* Profile Image */}
          <div className="relative group">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-[rgba(15,25,45,0.8)] flex items-center justify-center overflow-hidden">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-gray-400" />
                )}
              </div>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
            >
              <Camera size={14} className="text-white" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{profileData.fullName}</h1>
                <p className="text-gray-400 mt-1">{profileData.email}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-indigo-400" />
                    {profileData.city}, {profileData.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-pink-400" />
                    Member since {profileData.joinDate}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white font-medium flex items-center gap-2 hover:shadow-lg transition-all"
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-5 py-2 bg-green-600 rounded-xl text-white font-medium flex items-center gap-2 hover:shadow-lg transition-all"
                    >
                      <Save size={16} /> Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-5 py-2 bg-red-600/20 border border-red-500/50 rounded-xl text-red-400 font-medium flex items-center gap-2 hover:bg-red-600/30 transition-all"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Bio */}
            {!isEditing && (
              <p className="mt-4 text-gray-300 max-w-2xl">{profileData.bio}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Edit Form - Shows when editing */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Edit Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Full Name</label>
              <input
                type="text"
                value={editableData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input
                type="email"
                value={editableData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Phone</label>
              <input
                type="tel"
                value={editableData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Country</label>
              <input
                type="text"
                value={editableData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">City</label>
              <input
                type="text"
                value={editableData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Travel Preference</label>
              <select
                value={editableData.travelPreference}
                onChange={(e) => handleChange('travelPreference', e.target.value)}
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              >
                <option>Luxury & Adventure</option>
                <option>Budget Backpacking</option>
                <option>Family Travel</option>
                <option>Solo Adventure</option>
                <option>Cultural Explorer</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-1">Bio</label>
              <textarea
                value={editableData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows="3"
                className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Statistics Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {statistics.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card rounded-2xl p-5 hover:border-indigo-500/50 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} opacity-20 flex items-center justify-center mb-3`}>
              <stat.icon className={`text-${stat.color}-400`} size={24} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Planned Trips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Upcoming Adventures</h2>
            <p className="text-gray-400 text-sm mt-1">Your planned trips and itineraries</p>
          </div>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plannedTrips.length === 0 && <p className="text-gray-400 text-sm">No upcoming trips.</p>}
          {plannedTrips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden bg-indigo-900/30 flex items-center justify-center">
                <Plane size={48} className="text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-1 text-white">
                    <Users size={14} />
                    <span className="text-sm">1 traveler</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-lg mb-1 line-clamp-1">{trip.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{trip.destination}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {trip.start_date?.slice(0, 10)}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={12} /> {trip.budget || '—'}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Planning Progress</span>
                    <span>10%</span>
                  </div>
                  <div className="h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" style={{ width: `10%` }} />
                  </div>
                </div>
                <button className="w-full py-2 bg-[rgba(255,255,255,0.05)] rounded-xl text-indigo-400 text-sm font-medium hover:bg-indigo-500/20 transition-all">
                  View Trip Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Previous Trips & Activity Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Previous Trips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Travel Memories</h2>
              <p className="text-gray-400 text-sm mt-1">Your completed journeys</p>
            </div>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
              View All <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {previousTrips.length === 0 && <p className="text-gray-400 text-sm">No completed trips.</p>}
            {previousTrips.map((trip, idx) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="glass-card rounded-2xl p-4 cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="sm:w-32 h-24 rounded-xl overflow-hidden bg-indigo-900/30 flex items-center justify-center">
                    <Plane size={32} className="text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-white line-clamp-1">{trip.name}</h3>
                        <p className="text-sm text-gray-400">{trip.destination}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {trip.start_date?.slice(0, 10)}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={12} /> {trip.budget || '—'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award size={12} /> {new Date(trip.start_date).getFullYear() || '—'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Activity Timeline & Wishlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Activity Timeline */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock size={18} className="text-indigo-400" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <activity.icon size={14} className="text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-xs">{activity.detail}</p>
                    <p className="text-gray-600 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wishlist / Future Destinations */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Heart size={18} className="text-pink-400" />
                Dream Destinations
              </h3>
              <button className="p-1 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                <Plus size={16} className="text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              {wishlist.map((dest, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500/20 to-pink-500/20 flex items-center justify-center">
                      <dest.icon size={14} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{dest.name}</p>
                      <p className="text-gray-500 text-xs">{dest.country}</p>
                    </div>
                  </div>
                  <button className="text-indigo-400 hover:text-indigo-300 text-xs">Plan →</button>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Stats Badge */}
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
              <Award size={32} className="text-white" />
            </div>
            <h4 className="text-white font-bold">Travel Explorer</h4>
            <p className="text-gray-400 text-sm mt-1">Level 7 Traveler</p>
            <div className="mt-3 h-1 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
            </div>
            <p className="text-gray-500 text-xs mt-2">700/1000 XP to next level</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Import missing icons
const Mountain = () => <div />
const Compass = () => <div />

export default ProfilePage