import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Plane, 
  MapPin, 
  Globe,
  Luggage,
  CheckCircle,
  ArrowLeft,
  Compass,
  Briefcase
} from 'lucide-react'

import { FaGithub, FaGoogle } from 'react-icons/fa'

const FloatingIcon = ({ Icon, delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: 0.15, 
      y: [0, -15, 0],
      x: [0, 8, 0]
    }}
    transition={{ 
      duration: 5, 
      delay, 
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }}
    className="absolute"
    style={{ top: y, left: x }}
  >
    <Icon size={48} className="text-indigo-400" />
  </motion.div>
)

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, loading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()
    const result = await login(email, password)
    if (result.success) navigate('/dashboard')
  }

  const handleGoogleLogin = () => {
    console.log('Google login')
    // Implement Google OAuth
  }

  const handleGithubLogin = () => {
    console.log('GitHub login')
    // Implement GitHub OAuth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0c1a] via-[#030518] to-[#01010f] overflow-hidden relative">
      {/* Animated Background Gradient */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 40%, rgba(108,99,255,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 60%, rgba(255,101,132,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(108,99,255,0.15) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Back to Home Button */}
      <Link to="/" className="fixed top-6 left-6 z-20 inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors glass-card px-4 py-2 rounded-full bg-[rgba(15,25,45,0.4)] backdrop-blur-md">
        <ArrowLeft size={18} />
        Back to Home
      </Link>

      {/* Floating Icons Background - Using only valid Lucide icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon Icon={Plane} delay={0} x="10%" y="15%" />
        <FloatingIcon Icon={MapPin} delay={1.5} x="85%" y="25%" />
        <FloatingIcon Icon={Compass} delay={2.5} x="15%" y="70%" />
        <FloatingIcon Icon={Luggage} delay={3} x="75%" y="80%" />
        <FloatingIcon Icon={Globe} delay={4} x="90%" y="60%" />
        <FloatingIcon Icon={Briefcase} delay={0.8} x="5%" y="45%" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Visual Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="glass-card p-8 rounded-3xl backdrop-blur-xl bg-[rgba(15,25,45,0.3)] border border-[rgba(108,99,255,0.3)]">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                    className="flex justify-center mb-8"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full blur-2xl opacity-50" />
                      <img 
                        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                        alt="Travel World Map"
                        className="relative rounded-2xl w-full max-w-md mx-auto opacity-80 object-cover"
                      />
                    </div>
                  </motion.div>
                  
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl font-bold font-playfair bg-gradient-to-r from-indigo-300 via-white to-violet-300 bg-clip-text text-transparent">
                      Welcome Back, Traveler
                    </h2>
                    <p className="text-gray-300 text-lg">
                      Continue your journey where you left off. Plan multi-city adventures, track budgets, and create unforgettable experiences.
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-indigo-500/20">
                      <div>
                        <div className="text-2xl font-bold text-indigo-400">10K+</div>
                        <div className="text-xs text-gray-400">Active Travelers</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-pink-400">150+</div>
                        <div className="text-xs text-gray-400">Countries</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-400">50K+</div>
                        <div className="text-xs text-gray-400">Trips Planned</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md mx-auto md:max-w-full"
            >
              <div className="glass-card p-6 md:p-8 rounded-3xl backdrop-blur-xl bg-[rgba(15,25,45,0.5)] border border-[rgba(108,99,255,0.3)] shadow-2xl">
                <div className="text-center mb-8">
                  <div className="text-3xl font-bold text-gradient-primary mb-2">Traveloop</div>
                  <div className="text-sm text-gray-400">Multi-City Travel Planner</div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 text-center">Sign In</h3>
                <p className="text-gray-400 text-sm text-center mb-8">
                  Access your travel dashboard and continue planning
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                        placeholder="traveler@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(108,99,255,0.3)] rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 border border-[rgba(108,99,255,0.5)] rounded-md bg-transparent peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all duration-300"></div>
                        <CheckCircle className="absolute top-0 left-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none" size={16} />
                      </div>
                      <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        Remember me
                      </span>
                    </label>
                    <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                      Forgot Password?
                    </a>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </motion.button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[rgba(255,255,255,0.1)]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-[rgba(15,25,45,0.5)] text-gray-400">OR</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] text-white font-medium py-3 rounded-xl transition-all duration-300"
                  >
                    <FaGoogle size={20} />
                    Continue with Google
                  </motion.button>

                  {/* <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGithubLogin}
                    className="w-full flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] text-white font-medium py-3 rounded-xl transition-all duration-300"
                  >
                    <FaGithub size={20} />
                    Continue with GitHub
                  </motion.button> */}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                      Sign Up
                    </Link>
                  </p>
                </div>

                <p className="text-center text-xs text-gray-500 mt-6">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

export default LoginPage