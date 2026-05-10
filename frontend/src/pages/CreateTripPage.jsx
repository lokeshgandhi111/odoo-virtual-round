import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useTrips from '../hooks/useTrips';
import { citiesAPI } from '../services/api';
import { 
  Calendar, 
  MapPin, 
  ArrowLeft, 
  Users, 
  Clock, 
  Sparkles,
  Star,
  ChevronRight,
  Plane,
  Utensils,
  Mountain,
  Sun,
  Moon,
  Coffee,
  TrendingUp,
  Camera,
  Music,
  Briefcase,
  Heart,
  Shield,
  Award,
  X,
  Check
} from 'lucide-react';

const CreateTripPage = () => {
  const navigate = useNavigate();
  const { createTrip } = useTrips();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [place, setPlace] = useState('');
  const [tripName, setTripName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [cities, setCities] = useState([]);
  const [showSuggestions] = useState(true);
  const [selectedSuggestion] = useState(null);

  useEffect(() => {
    citiesAPI.getAll().then(({ data }) => {
      setCities((data.cities || []).slice(0, 4));
    }).catch(() => {});
  }, []);

  const suggestions = [
    { id: 1, name: 'Morning Yoga at Sunrise', icon: Sun, time: '6:00 AM', duration: '1 hour', type: 'Wellness', rating: 4.8, price: '$25' },
    { id: 2, name: 'Coffee Tasting Tour', icon: Coffee, time: '10:00 AM', duration: '2 hours', type: 'Food', rating: 4.9, price: '$45' },
    { id: 3, name: 'Mountain Hiking', icon: Mountain, time: '1:00 PM', duration: '3 hours', type: 'Adventure', rating: 4.7, price: '$60' },
    { id: 4, name: 'Local Market Exploration', icon: MapPin, time: '4:00 PM', duration: '2 hours', type: 'Culture', rating: 4.6, price: '$30' },
    { id: 5, name: 'Sunset Dinner Cruise', icon: Utensils, time: '6:30 PM', duration: '2.5 hours', type: 'Dining', rating: 4.9, price: '$120' },
    { id: 6, name: 'Stargazing Experience', icon: Moon, time: '9:00 PM', duration: '1.5 hours', type: 'Night', rating: 4.8, price: '$50' },
  ];

  const userSuggestions = [
    { name: 'Proud Horse', role: 'Adventure Guide', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop', expertise: 'Mountain Trekking', rating: 4.9 },
    { name: 'Venerated Ibex', role: 'Travel Expert', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', expertise: 'Cultural Tours', rating: 4.8 },
    { name: 'Accomplished Eel', role: 'Local Specialist', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', expertise: 'Hidden Gems', rating: 4.9 },
    { name: 'Trustworthy Scorpion', role: 'Activity Curator', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', expertise: 'Adventure Sports', rating: 4.7 },
    { name: 'Stunning Sparrow', role: 'Wellness Coach', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', expertise: 'Yoga & Meditation', rating: 4.9 },
    { name: 'Silky Caterpillar', role: 'Guest', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', expertise: 'Community Member', rating: 4.5 },
  ];

  const popularDestinations = [
    { name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&h=150&fit=crop', trips: 1245 },
    { name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=200&h=150&fit=crop', trips: 982 },
    { name: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=200&h=150&fit=crop', trips: 876 },
    { name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&h=150&fit=crop', trips: 654 },
  ];

  const handleCreateTrip = async () => {
    if (!startDate || !endDate || !place) {
      setError('Please fill in destination, start date and end date.');
      return;
    }
    setError('');
    setIsCreating(true);
    const result = await createTrip({
      name: tripName || `Trip to ${place}`,
      destination: place,
      start_date: startDate,
      end_date: endDate,
    });
    setIsCreating(false);
    if (result.success) {
      navigate('/my-trips');
    } else {
      setError(result.error || 'Failed to create trip. Try again.');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const calculateTripDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays + 1;
    }
    return 0;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0c1a] via-[#030518] to-[#01010f]">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#6C63FF] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FF6584] opacity-10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6C63FF] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors glass-card px-4 py-2 rounded-xl"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </motion.button>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-block mb-4">
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-[#FF6584] font-medium flex items-center gap-2">
                <Sparkles size={14} />
                Plan a new trip
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-playfair bg-gradient-to-r from-white via-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent mb-4">
            Create Your Journey
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let's craft an unforgettable adventure tailored just for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Form - Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Trip Details</h2>
              
              <div className="space-y-6">
                {/* Trip Name */}
                <div className="group">
                  <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    Trip Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. European Summer Adventure"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                  />
                </div>
                {/* Start Date */}
                <div className="group">
                  <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                  />
                </div>

                {/* End Date */}
                <div className="group">
                  <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                  />
                </div>

                {/* Trip Duration Display */}
                {startDate && endDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-indigo-500/10 rounded-xl p-3 border border-indigo-500/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Trip Duration</span>
                      <span className="text-indigo-400 font-semibold">{calculateTripDuration()} days</span>
                    </div>
                  </motion.div>
                )}

                {/* Select a Place */}
                <div className="group">
                  <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    Destination
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Where would you like to go? (e.g., Paris, Tokyo, Bali)"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Create Trip Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreateTrip}
                disabled={isCreating}
                className="mt-8 w-full relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-2xl font-bold text-white shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Trip...
                  </>
                ) : (
                  <>
                    <Plane className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Create My Trip
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Popular Destinations Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-pink-400" />
                Popular Destinations
              </h3>
              <div className="space-y-3">
                {(cities.length > 0 ? cities : [
                  { name: 'Paris, France', image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&h=150&fit=crop', popularity_score: 98 },
                  { name: 'Tokyo, Japan', image_url: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=200&h=150&fit=crop', popularity_score: 97 },
                ]).map((dest, idx) => (
                  <div
                    key={idx}
                    onClick={() => setPlace(dest.name || dest.city_name)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] transition-all cursor-pointer group"
                  >
                    <img src={dest.image_url || dest.image} alt={dest.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium group-hover:text-indigo-400 transition-colors">{dest.name}</p>
                      <p className="text-gray-500 text-xs">{dest.popularity_score} popularity score</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Suggestions Section */}
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-pink-400" />
                  Activity Suggestions
                </h3>
                <p className="text-gray-500 text-sm mt-1">Popular activities based on your destination</p>
              </div>
              <button className="text-indigo-400 hover:text-pink-400 transition-colors text-sm flex items-center gap-1">
                View all suggestions <ChevronRight size={14} />
              </button>
            </div>

            {/* Activity Suggestions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {suggestions.map((suggestion, idx) => {
                const Icon = suggestion.icon;
                return (
                  <motion.div
                    key={suggestion.id}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="glass-card rounded-xl p-4 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                        <Icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                          {suggestion.name}
                        </h4>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {suggestion.time}
                          </span>
                          <span>{suggestion.duration}</span>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400">
                            {suggestion.type}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-400">{suggestion.rating}</span>
                          </div>
                          <span className="text-indigo-400 text-sm font-medium">{suggestion.price}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Travel Experts Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Meet Your Travel Experts
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {userSuggestions.map((user, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="glass-card rounded-xl p-4 text-center cursor-pointer group"
                  >
                    <div className="relative mb-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 p-0.5 group-hover:scale-105 transition-transform">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      {user.role === 'Guest' && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      )}
                      {user.rating && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-black/60 rounded-full px-1.5 py-0.5">
                          <div className="flex items-center gap-0.5">
                            <Star size={8} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-white text-xs">{user.rating}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold text-white text-sm group-hover:text-indigo-400 transition-colors">
                      {user.name}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">{user.role}</p>
                    <p className="text-gray-600 text-xs mt-1">{user.expertise}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Travel Tips Section */}
            <motion.div
              variants={itemVariants}
              className="mt-8 glass-card rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/20">
                  <Shield size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Pro Travel Tips</h4>
                  <p className="text-gray-400 text-sm mt-1">
                    • Book flights and accommodation at least 3 months in advance for best prices<br />
                    • Travel insurance is highly recommended for international trips<br />
                    • Download offline maps before your journey<br />
                    • Learn a few basic phrases in the local language
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(15, 25, 45, 0.5);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(108, 99, 255, 0.3);
          transition: all 0.3s ease;
        }
        
        .glass-card:hover {
          border-color: rgba(108, 99, 255, 0.6);
          box-shadow: 0 20px 40px rgba(108, 99, 255, 0.1);
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.6;
          cursor: pointer;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default CreateTripPage;