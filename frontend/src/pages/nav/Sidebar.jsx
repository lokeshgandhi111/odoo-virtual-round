import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  MapPin,
  PlusCircle,
  CalendarClock,
  CalendarDays,
  PiggyBank,
  NotebookPen,
  CheckSquare,
  Share2,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plane,
  Users 
} from 'lucide-react'

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/my-trips', icon: MapPin, label: 'My Trips' },
  { path: '/create-trip', icon: PlusCircle, label: 'Create Trip' },
  { path: '/itinerary', icon: CalendarClock, label: 'Itinerary Builder' },
  { path: '/activities', icon: CalendarDays, label: 'Activities' },
  { path: '/budget', icon: PiggyBank, label: 'Budget' },
  { path: '/notes', icon: NotebookPen, label: 'Notes' },
  { path: '/city-search', icon: MapPin, label: 'City Search' },
  { path: '/community', icon: Users, label: 'Community' }, 
  { path: '/checklist', icon: CheckSquare, label: 'Checklist' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...')
  }

  const handleNavigation = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? '80px' : '280px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[rgba(15,25,45,0.95)] to-[rgba(8,12,25,0.98)] backdrop-blur-xl border-r border-[rgba(108,99,255,0.2)] z-50 flex flex-col ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-300 md:translate-x-0`}
        style={{ width: isCollapsed ? '80px' : '280px' }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.1)]">
          <NavLink to="/dashboard" className="flex items-center gap-2" onClick={handleNavigation}>
            <Plane className="text-indigo-400" size={32} />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold text-gradient-primary"
              >
                Traveloop
              </motion.span>
            )}
          </NavLink>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) => `
                  relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-white shadow-lg shadow-indigo-500/10' 
                    : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 w-1 h-8 bg-gradient-to-b from-indigo-500 to-pink-500 rounded-r-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                    <item.icon size={20} className={isActive ? 'text-indigo-400' : 'group-hover:text-indigo-400 transition-colors'} />
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-sm font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-3 pb-6 border-t border-[rgba(255,255,255,0.1)]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
          >
            <LogOut size={20} className="group-hover:text-red-400" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar