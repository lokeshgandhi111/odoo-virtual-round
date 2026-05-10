import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit2, 
  MapPin, 
  Hotel, 
  Plane, 
  Coffee, 
  Mountain,
  Clock,
  Users,
  X,
  Check,
  Save,
  AlertCircle,
  TrendingUp,
  Briefcase,
  Camera,
  Sunset,
  Utensils,
  Train,
  Ship,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const BuildItineraryPage = () => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  
  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Travel to Bali',
      description: 'Flight from JFK to DPS with layover in Singapore. Singapore Airlines business class with premium lounge access.',
      type: 'travel',
      startDate: '2024-06-15',
      endDate: '2024-06-16',
      budget: 1200,
      location: 'New York → Bali',
      icon: 'Plane',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Hotel Stay at Blue Gazelle Resort',
      description: 'Luxury beachfront resort with ocean view suite. Includes breakfast and dinner buffet. Spa access included.',
      type: 'hotel',
      startDate: '2024-06-16',
      endDate: '2024-06-22',
      budget: 2100,
      location: 'Seminyak, Bali',
      icon: 'Hotel',
      host: 'Krishna Kumar Gupta',
      status: 'booked'
    },
    {
      id: 3,
      title: 'Cultural Tour & Activities',
      description: 'Guided tour to Ubud Monkey Forest, Rice Terraces, and Tanah Lot Temple. Private car and local guide included.',
      type: 'activity',
      startDate: '2024-06-17',
      endDate: '2024-06-18',
      budget: 450,
      location: 'Ubud, Bali',
      icon: 'Mountain',
      status: 'pending'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newSection, setNewSection] = useState({
    title: '',
    description: '',
    type: 'travel',
    startDate: '',
    endDate: '',
    budget: '',
    location: ''
  });

  const sectionTypes = [
    { value: 'travel', label: 'Travel', icon: Plane, color: '#6C63FF', bgColor: 'indigo' },
    { value: 'hotel', label: 'Hotel', icon: Hotel, color: '#FF6584', bgColor: 'pink' },
    { value: 'activity', label: 'Activity', icon: Mountain, color: '#10B981', bgColor: 'green' },
    { value: 'dining', label: 'Dining', icon: Utensils, color: '#F59E0B', bgColor: 'amber' },
    { value: 'sightseeing', label: 'Sightseeing', icon: Camera, color: '#8B5CF6', bgColor: 'purple' },
    { value: 'transport', label: 'Transport', icon: Train, color: '#06B6D4', bgColor: 'cyan' }
  ];

  const iconMap = {
    Plane: Plane,
    Hotel: Hotel,
    Mountain: Mountain,
    Coffee: Coffee,
    Camera: Camera,
    Utensils: Utensils,
    Train: Train,
    Ship: Ship
  };

  const getTypeConfig = (type) => {
    return sectionTypes.find(t => t.value === type) || sectionTypes[0];
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'booked': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const handleAddSection = () => {
    if (newSection.title && newSection.startDate && newSection.endDate) {
      const typeConfig = getTypeConfig(newSection.type);
      setSections([
        ...sections,
        {
          id: Date.now(),
          ...newSection,
          budget: parseFloat(newSection.budget) || 0,
          icon: typeConfig.icon.name,
          status: 'pending'
        }
      ]);
      setNewSection({
        title: '',
        description: '',
        type: 'travel',
        startDate: '',
        endDate: '',
        budget: '',
        location: ''
      });
      setShowAddModal(false);
    }
  };

  const handleUpdateSection = () => {
    if (editData && editData.title) {
      setSections(sections.map(section => 
        section.id === editData.id ? { ...editData, icon: section.icon } : section
      ));
      setEditingId(null);
      setEditData(null);
    }
  };

  const handleDeleteSection = (id) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      setSections(sections.filter(section => section.id !== id));
    }
  };

  const handleEditClick = (section) => {
    setEditingId(section.id);
    setEditData({ ...section });
  };

  const totalBudget = sections.reduce((sum, section) => sum + (section.budget || 0), 0);
  const totalDays = sections.length;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Animation variants
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

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-block mb-4">
            <div className="glass-card px-4 py-2 rounded-full">
              <span className="text-[#FF6584] font-medium flex items-center gap-2">
                <Briefcase size={14} />
                ✨ Victorious Viper
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-playfair bg-gradient-to-r from-white via-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent mb-4">
            Build Your Itinerary
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Organize your journey section by section. Add travel, hotels, activities, and more.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Budget</p>
                <p className="text-2xl font-bold text-white mt-1">${totalBudget.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <DollarSign className="text-indigo-400" size={24} />
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Sections</p>
                <p className="text-2xl font-bold text-white mt-1">{sections.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                <Briefcase className="text-pink-400" size={24} />
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Trip Duration</p>
                <p className="text-2xl font-bold text-white mt-1">{totalDays} days</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Calendar className="text-green-400" size={24} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Itinerary Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence>
            {sections.map((section) => {
              const Icon = iconMap[section.icon] || MapPin;
              const typeConfig = getTypeConfig(section.type);
              const isExpanded = expandedId === section.id;
              const isEditing = editingId === section.id;
              
              return (
                <motion.div
                  key={section.id}
                  variants={itemVariants}
                  exit={{ opacity: 0, x: -100 }}
                  layout
                  className="glass-card rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300"
                >
                  {isEditing ? (
                    // Edit Mode
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Edit Section</h3>
                        <button onClick={() => { setEditingId(null); setEditData(null); }} className="text-gray-400 hover:text-white">
                          <X size={20} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editData?.title || ''}
                          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                          placeholder="Title"
                        />
                        <textarea
                          value={editData?.description || ''}
                          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                          rows="3"
                          className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                          placeholder="Description"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="date"
                            value={editData?.startDate || ''}
                            onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                            className="bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white"
                          />
                          <input
                            type="date"
                            value={editData?.endDate || ''}
                            onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                            className="bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-4 py-2 text-white"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button onClick={handleUpdateSection} className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 py-2 rounded-xl text-white font-semibold flex items-center justify-center gap-2">
                            <Save size={16} /> Save Changes
                          </button>
                          <button onClick={() => { setEditingId(null); setEditData(null); }} className="px-4 py-2 bg-[rgba(255,255,255,0.05)] rounded-xl text-gray-400">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => toggleExpand(section.id)}>
                            <div className={`w-12 h-12 rounded-xl bg-${typeConfig.bgColor}-500/20 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                              <Icon className={`w-6 h-6 text-${typeConfig.bgColor}-400`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                                  {section.title}
                                </h3>
                                <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(section.status)}`}>
                                  {section.status}
                                </span>
                              </div>
                              <p className="text-gray-500 text-sm mt-1">
                                {typeConfig.label} Section
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleEditClick(section)}
                              className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-indigo-500/20 transition-all group/edit"
                            >
                              <Edit2 className="w-4 h-4 text-gray-400 group-hover/edit:text-indigo-400" />
                            </button>
                            <button 
                              onClick={() => handleDeleteSection(section.id)}
                              className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-red-500/20 transition-all group/delete"
                            >
                              <Trash2 className="w-4 h-4 text-gray-400 group-hover/delete:text-red-400" />
                            </button>
                            <button onClick={() => toggleExpand(section.id)} className="p-2">
                              {isExpanded ? <ChevronUp className="text-gray-400" size={18} /> : <ChevronDown className="text-gray-400" size={18} />}
                            </button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {/* Description */}
                              <p className="text-gray-300 text-sm mb-4 pl-16">
                                {section.description}
                              </p>

                              {/* Details Grid */}
                              <div className="pl-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                  <Calendar className="w-4 h-4 text-indigo-400" />
                                  <span>
                                    {section.startDate && new Date(section.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
                                    {section.endDate && ` → ${new Date(section.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
                                  </span>
                                </div>

                                {section.location && (
                                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <MapPin className="w-4 h-4 text-pink-400" />
                                    <span>{section.location}</span>
                                  </div>
                                )}

                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                  <DollarSign className="w-4 h-4 text-green-400" />
                                  <span>Budget: <span className="text-white font-medium">${section.budget?.toLocaleString()}</span></span>
                                </div>

                                {section.host && (
                                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Users className="w-4 h-4 text-purple-400" />
                                    <span>Host: {section.host}</span>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Add Section Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => setShowAddModal(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 glass-card hover:border-indigo-500 rounded-2xl font-medium text-white transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300 text-indigo-400" />
            <span>Add Another Section</span>
          </button>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center gap-4"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 rounded-xl border border-white/20 text-gray-400 hover:bg-white/5 transition-all"
          >
            Save Draft
          </button>
          <button
            onClick={() => console.log('Finalize itinerary:', sections)}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-bold text-white shadow-lg hover:shadow-indigo-500/50 transition-all hover:scale-105"
          >
            Finalize Itinerary
          </button>
        </motion.div>
      </div>

      {/* Add Section Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl max-w-lg w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Add New Section</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Section Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {sectionTypes.map(type => {
                      const TypeIcon = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => setNewSection({ ...newSection, type: type.value })}
                          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                            newSection.type === type.value
                              ? `bg-${type.bgColor}-500/20 border border-${type.bgColor}-400/50`
                              : 'bg-[rgba(255,255,255,0.05)] border border-transparent hover:bg-[rgba(255,255,255,0.1)]'
                          }`}
                        >
                          <TypeIcon size={20} className={`text-${type.bgColor}-400`} />
                          <span className="text-xs text-white">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Flight to Paris, Hotel Stay"
                    value={newSection.title}
                    onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                  <textarea
                    placeholder="Add details about this section..."
                    value={newSection.description}
                    onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      value={newSection.startDate}
                      onChange={(e) => setNewSection({ ...newSection, startDate: e.target.value })}
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">End Date</label>
                    <input
                      type="date"
                      value={newSection.endDate}
                      onChange={(e) => setNewSection({ ...newSection, endDate: e.target.value })}
                      className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="City, Country or Venue"
                    value={newSection.location}
                    onChange={(e) => setNewSection({ ...newSection, location: e.target.value })}
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Budget (USD)</label>
                  <input
                    type="number"
                    placeholder="Estimated cost"
                    value={newSection.budget}
                    onChange={(e) => setNewSection({ ...newSection, budget: e.target.value })}
                    className="w-full px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-white/20 text-gray-400 hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSection}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl font-medium text-white hover:shadow-lg transition-all"
                >
                  Add Section
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuildItineraryPage;