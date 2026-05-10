import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MapPin, 
  Star, 
  Clock, 
  DollarSign,
  Globe,
  Heart,
  Share2,
  TrendingUp,
  Map,
  Compass
} from 'lucide-react';
import api from '../services/api';

const CitySearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const res = await api.get('/cities');
        setCities(res.data.cities || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching cities:', err);
        setError('Failed to load cities.');
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  // Filter results based on search query, group, and sort
  const getFilteredResults = () => {
    let filtered = [...cities];
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(city => 
        (city.city_name && city.city_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (city.country && city.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (city.description && city.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (city.region && city.region.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Group by
    if (activeGroup === 'location') {
      filtered = [...filtered].sort((a, b) => (a.country || '').localeCompare(b.country || ''));
    } else if (activeGroup === 'price') {
      filtered = [...filtered].sort((a, b) => (a.average_daily_cost || 0) - (b.average_daily_cost || 0));
    }
    
    // Sort by
    if (sortBy === 'price_low') {
      filtered = [...filtered].sort((a, b) => (a.average_daily_cost || 0) - (b.average_daily_cost || 0));
    } else if (sortBy === 'price_high') {
      filtered = [...filtered].sort((a, b) => (b.average_daily_cost || 0) - (a.average_daily_cost || 0));
    } else if (sortBy === 'popularity') {
      filtered = [...filtered].sort((a, b) => (b.popularity_score || 0) - (a.popularity_score || 0));
    }
    
    return filtered;
  };

  const filteredResults = getFilteredResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B2B] via-[#1A1A3E] to-[#2D1B4E]">
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#6C63FF] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-[#FF6584] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#6C63FF] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="glass-effect px-4 py-2 rounded-full">
              <span className="text-[#FF6584] font-medium">✨ Destination Search</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-[#6C63FF] to-[#FF6584] bg-clip-text text-transparent mb-4">
            Explore The World
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover popular cities, average costs, and exciting regions for your next trip.
          </p>
        </div>

        {/* Search Bar */}
        <div className="glass-effect rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search by city, country, region, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#6C63FF] transition-all"
              />
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <div className="relative">
                <select
                  value={activeGroup}
                  onChange={(e) => setActiveGroup(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-[#1A1A3E] border border-white/10 rounded-xl focus:outline-none focus:border-[#6C63FF] cursor-pointer text-white"
                >
                  <option value="all">Group by: All</option>
                  <option value="location">Country</option>
                  <option value="price">Daily Cost</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>
              
              <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 hover:bg-white/10 transition-all group flex items-center gap-2">
                <Filter className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Filter
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-[#1A1A3E] border border-white/10 rounded-xl focus:outline-none focus:border-[#6C63FF] cursor-pointer text-white"
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="price_low">Cost: Low to High</option>
                  <option value="price_high">Cost: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count & Loading State */}
        <div className="mb-6">
          {loading ? (
            <p className="text-white/60 text-sm">Loading destinations...</p>
          ) : error ? (
            <p className="text-red-400 text-sm">{error}</p>
          ) : (
            <p className="text-white/60 text-sm">
              Found <span className="text-[#6C63FF] font-semibold">{filteredResults.length}</span> destinations
            </p>
          )}
        </div>

        {/* Search Results Grid */}
        <div className="space-y-6">
          {!loading && !error && filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="glass-effect rounded-2xl p-8 max-w-lg mx-auto">
                <Search className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 text-lg">No destinations found for "{searchQuery}"</p>
                <p className="text-white/40 text-sm mt-2">Try searching with different keywords</p>
              </div>
            </div>
          ) : (
            filteredResults.map((city) => (
              <div
                key={city.id}
                onClick={() => navigate(`/create-trip?city=${encodeURIComponent(city.city_name)}`)}
                className="group glass-effect rounded-2xl overflow-hidden hover-glow transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col md:flex-row">
                  {/* City Image */}
                  <div className="md:w-80 h-48 md:h-auto overflow-hidden relative">
                    <img
                      src={city.image_url || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80'}
                      alt={city.city_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        Score: {city.popularity_score || 'N/A'}
                      </span>
                    </div>
                    <button className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-sm rounded-full hover:bg-[#FF6584] transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  {/* City Details */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-white group-hover:text-[#6C63FF] transition-colors">
                            {city.city_name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-4 h-4 text-[#FF6584]" />
                            <p className="text-white/60 text-sm font-medium">{city.country} • {city.region}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#6C63FF]">
                            ${city.average_daily_cost || 0}
                          </p>
                          <p className="text-white/40 text-xs">avg. daily cost</p>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {city.description || 'A beautiful destination waiting to be explored. Plan your itinerary, track your budget, and build unforgettable memories.'}
                      </p>
                    </div>
                    
                    {/* Actions / Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-2">
                      <div className="flex items-center gap-4 text-white/50 text-sm">
                         <div className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            <span>Explore</span>
                         </div>
                         <div className="flex items-center gap-1">
                            <Map className="w-4 h-4" />
                            <span>Plan Trip</span>
                         </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-lg text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                         <Compass className="w-4 h-4" /> Start Planning
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(108, 99, 255, 0.3);
          border-color: rgba(108, 99, 255, 0.3);
          transform: translateY(-2px);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CitySearchPage;