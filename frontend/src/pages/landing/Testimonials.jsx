import React from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  { name: "Jessica M.", initials: "JD", rating: 5, text: "Traveloop transformed our chaotic 6-city trip into a flawless journey. The budget tracker saved us 20%!" },
  { name: "Mark K.", initials: "MK", rating: 5, text: "The smart itinerary builder is next-level. I planned 3 weeks across Asia in just 2 hours." },
  { name: "Sofia R.", initials: "SR", rating: 5, text: "Beautiful UI, smooth collaboration with my friends. Best travel planning tool ever!" },
]

const Testimonials = () => {
  return (
    <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-12 section-fade">
        <span className="text-indigo-300 text-sm uppercase">Travel stories</span>
        <h2 className="text-4xl md:text-5xl font-bold font-playfair">Trusted by global explorers</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -6 }}
            className="glass-card p-6 rounded-2xl transition-all duration-300 cursor-pointer"
            style={{ borderColor: 'rgba(255, 101, 132, 0.3)' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-500 flex items-center justify-center text-white font-bold">
                {testimonial.initials}
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <div className="flex text-yellow-300 text-xs">
                  {'★'.repeat(testimonial.rating)}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-300 italic">"{testimonial.text}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials