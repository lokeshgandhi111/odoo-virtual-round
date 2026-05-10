import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  { number: 1, title: "Create Your Trip", desc: "Name, dates & travel style" },
  { number: 2, title: "Add Cities & Stops", desc: "Multi-city routing with durations" },
  { number: 3, title: "Plan Activities", desc: "Add sights, restaurants & bookings" },
  { number: 4, title: "Share Itinerary", desc: "Collaborate & export PDF" },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="px-6 md:px-12 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-14 section-fade">
        <span className="text-pink-400 uppercase tracking-wider text-sm font-semibold">Simple workflow</span>
        <h2 className="text-4xl md:text-5xl font-bold font-playfair">Create your trip in minutes</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`glass-card p-6 text-center relative ${idx < steps.length - 1 ? 'step-connector' : ''}`}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-black text-xl mx-auto mb-4">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks