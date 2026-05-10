import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Users, 
  MapPin, 
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  DollarSign,
  Star,
  Clock,
  Eye,
  ThumbsUp,
  MessageCircle,
  Share2,
  Award,
  Crown,
  Zap,
  Shield,
  Settings,
  Bell,
  Download,
  RefreshCw,
  MoreHorizontal,
  UserPlus,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Globe,

} from 'lucide-react';


const AdminPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [activeTab, setActiveTab] = useState('users');

  // Sample Users Data
  const users = [
    { id: 1, name: 'Purple Hornet', email: 'purple.hornet@email.com', trips: 12, joinDate: '2024-01-15', status: 'active', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop', location: 'New York, USA', activities: 23, reviews: 45, rating: 4.8 },
    { id: 2, name: 'Blue Gazelle', email: 'blue.gazelle@email.com', trips: 8, joinDate: '2024-02-20', status: 'active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', location: 'London, UK', activities: 15, reviews: 28, rating: 4.9 },
    { id: 3, name: 'Red Phoenix', email: 'red.phoenix@email.com', trips: 5, joinDate: '2024-03-10', status: 'inactive', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop', location: 'Sydney, Australia', activities: 9, reviews: 12, rating: 4.5 },
    { id: 4, name: 'Golden Eagle', email: 'golden.eagle@email.com', trips: 15, joinDate: '2023-11-05', status: 'active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', location: 'Toronto, Canada', activities: 31, reviews: 67, rating: 4.9 },
    { id: 5, name: 'Silver Fox', email: 'silver.fox@email.com', trips: 3, joinDate: '2024-04-18', status: 'pending', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', location: 'Berlin, Germany', activities: 5, reviews: 8, rating: 4.2 },
  ];

  // Popular Cities Data
  const popularCities = [
    { name: 'Bali, Indonesia', visitors: 12450, growth: 23, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&h=200&fit=crop', rating: 4.9, activities: 342 },
    { name: 'Paris, France', visitors: 11230, growth: 18, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=200&fit=crop', rating: 4.8, activities: 456 },
    { name: 'Tokyo, Japan', visitors: 9870, growth: 32, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop', rating: 4.9, activities: 389 },
    { name: 'Swiss Alps', visitors: 8760, growth: 15, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&h=200&fit=crop', rating: 4.7, activities: 234 },
  ];

  // Popular Activities Data
  const popularActivities = [
    { name: 'Paragliding', bookings: 3450, growth: 45, revenue: 517500, icon: '🪂', color: 'from-orange-500/20 to-red-500/20' },
    { name: 'City Tours', bookings: 8920, growth: 28, revenue: 446000, icon: '🏛️', color: 'from-blue-500/20 to-cyan-500/20' },
    { name: 'Adventure Sports', bookings: 5670, growth: 52, revenue: 850500, icon: '🧗', color: 'from-green-500/20 to-emerald-500/20' },
    { name: 'Cultural Experiences', bookings: 6780, growth: 34, revenue: 339000, icon: '🎭', color: 'from-purple-500/20 to-pink-500/20' },
    { name: 'Food Tours', bookings: 4450, growth: 41, revenue: 267000, icon: '🍜', color: 'from-yellow-500/20 to-orange-500/20' },
    { name: 'Water Sports', bookings: 5120, growth: 38, revenue: 614400, icon: '🏄', color: 'from-indigo-500/20 to-blue-500/20' },
  ];

  // Analytics Data
  const analytics = {
    totalUsers: 12450,
    activeUsers: 8920,
    totalTrips: 45670,
    totalRevenue: 12450000,
    userGrowth: 23,
    tripGrowth: 18,
    revenueGrowth: 32,
    avgRating: 4.7
  };

  // Filter and sort functions
  const getFilteredUsers = () => {
    let filtered = [...users];
    
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeGroup === 'status') {
      filtered = [...filtered].sort((a, b) => a.status.localeCompare(b.status));
    } else if (activeGroup === 'trips') {
      filtered = [...filtered].sort((a, b) => b.trips - a.trips);
    }
    
    if (sortBy === 'recent') {
      filtered = [...filtered].sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate));
    } else if (sortBy === 'trips') {
      filtered = [...filtered].sort((a, b) => b.trips - a.trips);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }
    
    return filtered;
  };

  const filteredUsers = getFilteredUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B2B] via-[#1A1A3E] to-[#2D1B4E]">
    
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-[#6C63FF] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-[#FF6584] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#6C63FF] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="glass-effect px-4 py-2 rounded-full">
              <span className="text-[#FF6584] font-medium">✨ Admin Panel</span>
            </div>
          </div>
          
        </div>

        {/* Search and Filters */}
        <div className="glass-effect rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search users, cities, or activities..."
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
                  className="appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#6C63FF] cursor-pointer"
                  style={{ color: '#6C63FF' }}
                >
                  <option value="all" style={{ color: '#6C63FF' }}>Group by: All</option>
                  <option value="status" style={{ color: '#6C63FF' }}>Status</option>
                  <option value="trips" style={{ color: '#6C63FF' }}>Trip Count</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#6C63FF' }} />
              </div>
              
              <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/90 hover:bg-white/10 transition-all group flex items-center gap-2">
                <Filter className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Filter
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#6C63FF] cursor-pointer"
                  style={{ color: '#6C63FF' }}
                >
                  <option value="recent" style={{ color: '#6C63FF' }}>Sort by: Recent</option>
                  <option value="trips" style={{ color: '#6C63FF' }}>Most Trips</option>
                  <option value="rating" style={{ color: '#6C63FF' }}>Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#6C63FF' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-effect rounded-xl p-4 hover-glow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white mt-1">{analytics.totalUsers.toLocaleString()}</p>
                <p className="text-green-400 text-xs mt-1">↑ {analytics.userGrowth}% growth</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#6C63FF]" />
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 hover-glow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Trips</p>
                <p className="text-2xl font-bold text-white mt-1">{analytics.totalTrips.toLocaleString()}</p>
                <p className="text-green-400 text-xs mt-1">↑ {analytics.tripGrowth}% growth</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#FF6584]/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#FF6584]" />
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 hover-glow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white mt-1">${(analytics.totalRevenue / 1000000).toFixed(1)}M</p>
                <p className="text-green-400 text-xs mt-1">↑ {analytics.revenueGrowth}% growth</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-4 hover-glow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-white mt-1">{analytics.avgRating}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-3 h-3 ${i <= Math.floor(analytics.avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                  ))}
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab('cities')}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'cities'
                ? 'bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Popular Cities
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'activities'
                ? 'bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" />
            Popular Activities
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-gradient-to-r from-[#6C63FF] to-[#FF6584] text-white shadow-lg'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Analytics
          </button>
        </div>

        {/* Manage Users Section */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <button className="px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-xl text-white text-sm flex items-center gap-2 hover:scale-105 transition-transform">
                <UserPlus className="w-4 h-4" />
                Add User
              </button>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Manage user accounts, view their trips, and monitor activity
            </p>
            
            {filteredUsers.map((user) => (
              <div key={user.id} className="glass-effect rounded-xl p-4 hover-glow transition-all">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#FF6584] p-0.5">
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{user.name}</h3>
                      <p className="text-white/50 text-sm">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          user.status === 'inactive' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {user.status}
                        </span>
                        <span className="text-white/40 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {user.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="text-center">
                      <p className="text-white/50 text-xs">Trips</p>
                      <p className="text-white font-semibold">{user.trips}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/50 text-xs">Activities</p>
                      <p className="text-white font-semibold">{user.activities}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/50 text-xs">Reviews</p>
                      <p className="text-white font-semibold">{user.reviews}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/50 text-xs">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-semibold">{user.rating}</span>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Popular Cities Section */}
        {activeTab === 'cities' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Popular Destinations</h2>
            <p className="text-white/60 text-sm mb-4">
              Top cities based on user visits and engagement trends
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularCities.map((city) => (
                <div key={city.name} className="glass-effect rounded-xl overflow-hidden hover-glow transition-all group">
                  <div className="h-40 overflow-hidden">
                    <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white">{city.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-white/50 text-sm">Visitors</p>
                        <p className="text-white font-semibold">{city.visitors.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-sm">Activities</p>
                        <p className="text-white font-semibold">{city.activities}</p>
                      </div>
                      <div>
                        <p className="text-white/50 text-sm">Growth</p>
                        <p className="text-green-400 font-semibold">↑ {city.growth}%</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white">{city.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Activities Section */}
        {activeTab === 'activities' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Trending Activities</h2>
            <p className="text-white/60 text-sm mb-4">
              Most booked activities based on current user trends
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularActivities.map((activity) => (
                <div key={activity.name} className={`glass-effect rounded-xl p-4 hover-glow transition-all bg-gradient-to-br ${activity.color}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-3xl mb-2">{activity.icon}</div>
                      <h3 className="font-bold text-white">{activity.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-xs">Bookings</p>
                      <p className="text-white font-semibold text-xl">{activity.bookings.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      <p className="text-white/50 text-xs">Revenue</p>
                      <p className="text-white font-semibold">${(activity.revenue / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="text-green-400 text-sm flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      ↑ {activity.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Section */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">User Trends & Analytics</h2>
            <p className="text-white/60 text-sm mb-4">
              Comprehensive analysis of platform performance and user behavior
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Growth Chart Placeholder */}
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">User Growth Trend</h3>
                <div className="h-64 flex items-end gap-2">
                  {[65, 72, 80, 78, 85, 92, 88, 95, 102, 108, 115, 124].map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-gradient-to-t from-[#6C63FF] to-[#FF6584] rounded-t-lg transition-all hover:opacity-80" style={{ height: `${value * 2}px` }}></div>
                      <span className="text-white/40 text-xs">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/40 text-sm text-center mt-4">Monthly user acquisition (in hundreds)</p>
              </div>
              
              {/* Revenue Distribution */}
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Revenue by Category</h3>
                <div className="space-y-3">
                  {popularActivities.slice(0, 4).map((activity, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-white/70">{activity.name}</span>
                        <span className="text-white">${(activity.revenue / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#6C63FF] to-[#FF6584] rounded-full" style={{ width: `${(activity.revenue / 850500) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Key Insights */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Key Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Fastest Growing City</p>
                    <p className="text-white/60 text-sm">Tokyo, Japan • 32% growth</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Crown className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Most Active User</p>
                    <p className="text-white/60 text-sm">Purple Hornet • 15 trips</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Top Activity</p>
                    <p className="text-white/60 text-sm">Paragliding • 3,450 bookings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-white/30 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Delightful • Accurate • Zero Errors
          </p>
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
      `}</style>
    </div>
  );
};

export default AdminPage;