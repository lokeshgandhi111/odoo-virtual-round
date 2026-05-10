import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Users, 
  MapPin, 
  Calendar,
  Image as ImageIcon,
  ChevronDown,
  Grid3x3,
  List,
  Star
} from 'lucide-react'

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGroup, setActiveGroup] = useState('recent')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('latest')

  // Sample community posts
  const communityPosts = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        location: 'Paris, France'
      },
      title: 'A Week in Paris: Hidden Gems',
      description: 'Just returned from an amazing week in Paris! Found some incredible hidden cafes away from tourist crowds. The sunset at Montmartre was absolutely breathtaking. Highly recommend taking a cooking class - learned to make authentic croissants!',
      tripImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
      date: '2 days ago',
      tags: ['Adventure', 'Food', 'Culture']
    },
    {
      id: 2,
      user: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        location: 'Tokyo, Japan'
      },
      title: 'Tokyo to Kyoto: Ultimate Guide',
      description: 'Spent 10 days exploring Japan. The bullet train experience was incredible! Kyoto temples are magical during cherry blossom season. Don\'t miss the street food in Osaka - takoyaki is life-changing!',
      tripImage: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&h=400&fit=crop',
      date: '5 days ago',
      tags: ['Adventure', 'Sightseeing', 'Food']
    },
    {
      id: 3,
      user: {
        name: 'Emma Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        location: 'Barcelona, Spain'
      },
      title: 'Solo Backpacking Through Spain',
      description: 'Just completed a 3-week solo trip across Spain! From Barcelona to Seville, every city had its unique charm. The architecture in Barcelona is stunning. Met amazing fellow travelers in hostels. Highly recommend the free walking tours!',
      tripImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop',
      date: '1 week ago',
      tags: ['Solo Travel', 'Backpacking', 'Adventure']
    },
    {
      id: 4,
      user: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        location: 'Bali, Indonesia'
      },
      title: 'Bali Digital Nomad Experience',
      description: 'Working remotely from Bali for a month has been amazing! Found the perfect coworking space in Canggu. Weekends exploring rice terraces and waterfalls. The local community is so welcoming. Definitely coming back!',
      tripImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
      date: '2 weeks ago',
      tags: ['Digital Nomad', 'Workation', 'Beach']
    }
  ]

  const filterOptions = [
    { id: 'all', label: 'All Posts' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'food', label: 'Food' },
    { id: 'culture', label: 'Culture' },
    { id: 'solo', label: 'Solo Travel' }
  ]

  const sortOptions = [
    { id: 'latest', label: 'Latest' },
    { id: 'oldest', label: 'Oldest' },
    { id: 'popular', label: 'Most Popular' }
  ]

  const groupOptions = [
    { id: 'recent', label: 'Recent Activity' },
    { id: 'destination', label: 'By Destination' },
    { id: 'traveler', label: 'By Traveler' }
  ]

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gradient-hero">
          Community Tab
        </h1>
        <p className="text-gray-400 mt-2">Discover travel experiences shared by fellow explorers</p>
      </motion.div>

      {/* Search & Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-4"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search travel experiences, destinations, or travelers..."
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>

          {/* Group By Button */}
          <div className="relative">
            <select
              value={activeGroup}
              onChange={(e) => setActiveGroup(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {groupOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Filter Button */}
          <div className="relative">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {filterOptions.map(option => (
                <option key={option.id} value={option.id}>Filter: {option.label}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>

          {/* Sort By Button */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>Sort: {option.label}</option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
      </motion.div>

      {/* Main Content Area with Feed and Side Panel */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Community Feed Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 space-y-4"
        >
          <AnimatePresence>
            {communityPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01, y: -2 }}
                className="glass-card rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="p-6">
                  {/* User Info Section */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={post.user.avatar} 
                        alt={post.user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/30"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="font-semibold text-white text-lg">{post.user.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin size={12} className="text-indigo-400" />
                            <span className="text-gray-400 text-xs">{post.user.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-gray-500" />
                          <span className="text-gray-500 text-xs">{post.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <h4 className="text-white font-semibold text-lg mb-2">{post.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.2)] rounded-full text-xs text-indigo-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Trip Image */}
                  {post.tripImage && (
                    <div className="rounded-xl overflow-hidden">
                      <img 
                        src={post.tripImage} 
                        alt={post.title}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Right Side Information Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:w-80 flex-shrink-0"
        >
          <div className="sticky top-24 glass-card rounded-2xl p-6">
            {/* Info Card Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500/20 to-pink-500/20 flex items-center justify-center">
                <Users size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white">About Community</h3>
            </div>

            {/* Info Content */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Welcome to the Traveloop Community! This is where travelers from around the world share their authentic travel experiences, discoveries, and adventures.
              </p>
              
              <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">
                <h4 className="text-white text-sm font-semibold mb-2">What you can do:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                    <span>Read real travel experiences</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                    <span>Discover hidden destinations</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5"></div>
                    <span>Get inspired for your next trip</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-[rgba(255,255,255,0.1)] pt-4">
                <h4 className="text-white text-sm font-semibold mb-2">Tips for using:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5"></div>
                    <span>Use search to find specific destinations</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5"></div>
                    <span>Filter by travel style or activity type</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5"></div>
                    <span>Sort posts to find the most relevant content</span>
                  </li>
                </ul>
              </div>

              {/* Quick Stats */}
              <div className="bg-[rgba(108,99,255,0.1)] rounded-xl p-4 border border-[rgba(108,99,255,0.2)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-xs">Community Posts</span>
                  <span className="text-white font-bold text-lg">{communityPosts.length}+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Active Travelers</span>
                  <span className="text-white font-bold text-lg">1.2K</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CommunityPage