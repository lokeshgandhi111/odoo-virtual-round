import React from 'react'
import { motion } from 'framer-motion'

const CTA = () => {
  return (
    <section className="px-6 md:px-12 py-16 my-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto glass-card p-10 md:p-16 rounded-3xl text-center shadow-2xl"
      >
        <h2 className="text-4xl md:text-6xl font-bold font-playfair bg-gradient-to-r from-indigo-200 to-pink-200 bg-clip-text text-transparent">
          Start Your Next Adventure Today
        </h2>
        <p className="text-gray-300 text-lg mt-4">Join 10k+ savvy travelers who organize their multi-city trips smarter.</p>
        <div className="flex flex-wrap justify-center gap-5 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full text-lg font-semibold bg-indigo-600 hover:bg-indigo-500 transition shadow-xl shadow-indigo-500/50"
          >
            Create Free Account
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full text-lg font-medium border border-pink-500/60 hover:bg-pink-500/20 backdrop-blur-sm transition"
          >
            Plan Your First Trip
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

export default CTA