import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Moon,
  Sun
} from 'lucide-react'

const Navbar = ({ setIsMobileOpen, pageTitle }) => {
  const location = useLocation()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const dropdownRef = useRef(null)
  const notificationRef = useRef(null)

  const notifications = [
    { id: 1, title: 'Trip reminder', message: 'Your Paris trip starts in 3 days', time: '2 hours ago', read: false },
    { id: 2, title: 'Budget alert', message: 'You\'re over budget on activities', time: '5 hours ago', read: false },
    { id: 3, title: 'New shared trip', message: 'Emma shared a trip with you', time: '1 day ago', read: true },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    console.log('Logging out...')
  }

  const getPageTitle = () => {
    if (pageTitle) return pageTitle
    const path = location.pathname
    const titles = {
      '/dashboard': 'Dashboard',
      '/my-trips': 'My Trips',
      '/create-trip': 'Create New Trip',
      '/itinerary': 'Itinerary Builder',
      '/activities': 'Activities Planner',
      '/budget': 'Budget Tracker',
      '/notes': 'Notes',
      '/checklist': 'Packing Checklist',
      '/shared': 'Shared Trips',
      '/profile': 'Profile Settings',
      '/settings': 'Settings'
    }
    return titles[path] || 'Traveloop'
  }

  return (
    <nav className="fixed top-0 right-0 left-0 md:left-auto z-40 bg-[rgba(8,12,25,0.8)] backdrop-blur-xl border-b border-[rgba(108,99,255,0.2)]">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        {/* Left Section - Mobile Menu & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold font-playfair text-gradient-primary">
            {getPageTitle()}
          </h1>
        </div>

        {/* Center Section - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trips, activities, or destinations..."
              className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-[rgba(15,25,45,0.98)] backdrop-blur-xl border border-[rgba(108,99,255,0.2)] rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-[rgba(255,255,255,0.1)]">
                    <h3 className="font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`p-4 border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer ${!notif.read ? 'bg-indigo-500/5' : ''}`}>
                        <p className="text-sm font-medium text-white">{notif.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">JD</span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-[rgba(15,25,45,0.98)] backdrop-blur-xl border border-[rgba(108,99,255,0.2)] rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-[rgba(255,255,255,0.1)]">
                    <p className="text-sm font-semibold text-white">John Doe</p>
                    <p className="text-xs text-gray-400">john@traveloop.com</p>
                  </div>
                  <div className="py-2">
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                      <User size={16} />
                      My Profile
                    </Link>
                    <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                      <Settings size={16} />
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar