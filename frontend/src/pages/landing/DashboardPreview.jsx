import React from 'react'
import { motion } from 'framer-motion'
import { MoreHorizontal, Calendar, PieChart, ListChecks, Map } from 'lucide-react'

const DashboardPreview = () => {
  return (
    <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-12 section-fade">
        <h2 className="text-4xl md:text-5xl font-bold font-playfair">
          Designed for travelers, <span className="text-indigo-300">loved by planners</span>
        </h2>
        <p className="text-gray-300 mt-3">Real-time dashboard: trip cards, budgets & interactive timeline</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-[rgba(20,28,48,0.6)] to-[rgba(10,16,32,0.8)] backdrop-blur-[10px] rounded-3xl p-5 md:p-8 border border-[rgba(108,99,255,0.3)]"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-black/30 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
            <div className="flex justify-between items-center">
              <span className="font-bold text-indigo-300">🌍 Euro Summer</span>
              <MoreHorizontal size={16} />
            </div>
            <p className="text-xs text-gray-400">Paris → Rome → Barcelona</p>
            <div className="mt-3 h-2 w-full bg-gray-700 rounded-full">
              <div className="w-2/3 h-2 bg-indigo-500 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-300 mt-2 inline-block">Budget: $2,450 / $3,200</span>
          </div>
          <div className="bg-black/30 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
            <div className="flex justify-between">
              <span className="font-bold text-pink-300">🌆 Asia Explorer</span>
              <MoreHorizontal size={16} />
            </div>
            <p className="text-xs text-gray-400">Tokyo → Seoul → Bangkok</p>
            <div className="mt-3 flex gap-2">
              <Calendar size={14} />
              <span className="text-xs">12 days · 6 activities</span>
            </div>
          </div>
          <div className="bg-black/30 rounded-2xl p-4 backdrop-blur-sm border border-white/10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <PieChart size={18} className="text-indigo-400" />
              <span className="text-sm font-medium">Budget Analytics</span>
            </div>
            <div className="h-12 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full w-full opacity-70"></div>
            <div className="flex justify-between text-xs">
              <span>Flight 45%</span>
              <span>Hotel 30%</span>
              <span>Activities 25%</span>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-900/20 rounded-xl p-3 flex items-center gap-3">
            <ListChecks size={16} />
            <span className="text-sm">Itinerary: Day 1 - Louvre, Eiffel Tower</span>
          </div>
          <div className="bg-indigo-900/20 rounded-xl p-3 flex items-center gap-3">
            <Map size={16} />
            <span className="text-sm">Activity: Seine River Cruise, 7pm</span>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-5">
          ✨ Interactive dashboard preview — track everything in one place
        </div>
      </motion.div>
    </section>
  )
}

export default DashboardPreview