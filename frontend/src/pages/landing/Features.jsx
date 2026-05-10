import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, CalendarClock, PiggyBank, Clock9, ClipboardCheck, Share2 } from 'lucide-react'

const features = [
  { icon: MapPin, title: "Multi-City Trip Planning", desc: "Seamlessly connect multiple destinations, manage flight transits & layovers." },
  { icon: CalendarClock, title: "Smart Itinerary Builder", desc: "AI-assisted scheduling, time optimization & real-time suggestions." },
  { icon: PiggyBank, title: "Budget Tracking", desc: "Expense split, currency converter & real-time budget alerts." },
  { icon: Clock9, title: "Activity Scheduling", desc: "Drag-and-drop timeline with weather & location insights." },
  { icon: ClipboardCheck, title: "Notes & Packing Checklist", desc: "Customizable lists, smart reminders & cloud sync." },
  { icon: Share2, title: "Shareable Travel Plans", desc: "Collaborate with friends, real-time updates & PDF export." },
]

const Features = () => {
  return (
    <section id="features" className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-14 section-fade">
        <span className="text-indigo-400 uppercase tracking-wider text-sm font-semibold">Premium Toolkit</span>
        <h2 className="text-4xl md:text-5xl font-bold font-playfair mt-2">Intelligent features for <br />modern travelers</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 rounded-2xl transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-5">
              <feature.icon size={32} className="text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold">{feature.title}</h3>
            <p className="text-gray-400 mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Features