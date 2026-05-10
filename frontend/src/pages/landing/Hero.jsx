import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, MapPin, Luggage, Ticket, Plane, Compass } from 'lucide-react'

const Hero = () => {
  const floatingIcons = [
    { Icon: MapPin, className: "top-10 left-[8%] animate-float", size: 36 },
    { Icon: Luggage, className: "bottom-20 right-[12%] animate-float-reverse", size: 44 },
    { Icon: Ticket, className: "top-[40%] left-[85%] animate-float", size: 32 },
    { Icon: Plane, className: "top-[70%] left-[5%] animate-float-reverse", size: 48 },
    { Icon: Compass, className: "top-[20%] right-[20%] animate-float", size: 40 },
  ]

  return (
    <section className="relative px-6 md:px-12 py-16 md:py-28 max-w-7xl mx-auto">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map(({ Icon, className, size }, idx) => (
          <div key={idx} className={`absolute ${className} opacity-20`}>
            <Icon size={size} className="text-indigo-300" />
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-playfair leading-tight text-gradient-hero">
            Plan Your Perfect <br /><span className="text-indigo-300">Multi-City Journey</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mt-6 max-w-xl mx-auto lg:mx-0">
            Organize destinations, activities, budgets, and itineraries in one seamless travel experience.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3 rounded-full text-base font-semibold bg-indigo-600 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/40 flex items-center gap-2"
            >
              Start Planning <ArrowRight size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3 rounded-full text-base font-medium border border-indigo-500/60 hover:bg-indigo-500/20 backdrop-blur-sm transition-all flex items-center gap-2"
            >
              Explore Features <Sparkles size={18} />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Image/Map */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex justify-center relative"
        >
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-indigo-600/20 blur-3xl -z-10 animate-pulse" />
          <div className="relative glass-card p-4 rounded-3xl shadow-2xl">
            <img 
              src="https://placehold.co/600x500/1a1f33/6C63FF?text=Interactive+World+Map&font=montserrat" 
              alt="World Map Visualization"
              className="rounded-2xl opacity-90 w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero