import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  CheckCircle,
  ArrowLeft,
  User,
  Phone,
  Upload,
  X,
  MapPin
} from 'lucide-react'

// Import from react-icons for better travel icons
import { 
  FaPlane, 
  FaMapMarkerAlt, 
  FaPassport, 
  FaSuitcase,
  FaGlobe,
  FaCompass,
  FaGoogle,
  FaGithub
} from 'react-icons/fa'
import { MdOutlineTravelExplore } from 'react-icons/md'

// Country list for dropdown
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
]

const FloatingIcon = ({ Icon, delay, x, y, size = 48 }) => (
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
    <Icon size={size} className="text-indigo-400" />
  </motion.div>
)

// Password strength checker
const checkPasswordStrength = (password) => {
  let strength = 0
  if (password.length >= 8) strength++
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
  if (password.match(/\d/)) strength++
  if (password.match(/[^a-zA-Z\d]/)) strength++
  return strength
}

const getStrengthLabel = (strength) => {
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']
  return { label: labels[strength], color: colors[strength] }
}

const SignupPage = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    termsAccepted: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [profilePreview, setProfilePreview] = useState(null)
  const [focusedField, setFocusedField] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const { signup } = useAuth()

  const passwordStrength = checkPasswordStrength(formData.password)
  const strengthInfo = getStrengthLabel(passwordStrength)
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== ''

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size should be less than 5MB' }))
        return
      }
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    setProfilePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (passwordStrength < 2) newErrors.password = 'Password is too weak'
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.country) newErrors.country = 'Please select your country'
    if (!formData.termsAccepted) newErrors.terms = 'You must accept the terms and conditions'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    setApiError('')
    const full_name = `${formData.firstName} ${formData.lastName}`.trim()
    const result = await signup(
      formData.email,
      formData.password,
      full_name,
      formData.phone,
      formData.country,
      profilePreview || null
    )
    setLoading(false)
    if (result.success) {
      setSuccessMsg('Account created! Please check your email to verify, then log in.')
    } else {
      setApiError(result.error || 'Signup failed. Please try again.')
    }
  }

  const handleGoogleSignup = () => {
    console.log('Google signup')
  }

  const handleGithubSignup = () => {
    console.log('GitHub signup')
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

      {/* Back to Login Button */}
      <Link to="/login" className="fixed top-6 left-6 z-20 inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors glass-card px-4 py-2 rounded-full bg-[rgba(15,25,45,0.4)] backdrop-blur-md">
        <ArrowLeft size={18} />
        Back to Login
      </Link>

      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon Icon={FaPlane} delay={0} x="5%" y="10%" size={40} />
        <FloatingIcon Icon={FaMapMarkerAlt} delay={1.5} x="90%" y="20%" size={40} />
        <FloatingIcon Icon={FaPassport} delay={2.5} x="10%" y="80%" size={40} />
        <FloatingIcon Icon={FaSuitcase} delay={3} x="85%" y="70%" size={40} />
        <FloatingIcon Icon={FaGlobe} delay={4} x="95%" y="50%" size={40} />
        <FloatingIcon Icon={FaCompass} delay={0.8} x="3%" y="45%" size={35} />
        <FloatingIcon Icon={MdOutlineTravelExplore} delay={1.2} x="88%" y="85%" size={35} />
      </div>

      {/* World Map Glow Effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl"
        >
          <div className="glass-card rounded-3xl backdrop-blur-xl bg-[rgba(15,25,45,0.5)] border border-[rgba(108,99,255,0.3)] shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Left Side - Brand Section */}
              <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-indigo-900/30 to-violet-900/30 p-8 border-r border-[rgba(255,255,255,0.1)]">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gradient-primary mb-6">Traveloop</div>
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold font-playfair text-white">Join the Community</h2>
                      <p className="text-gray-300">
                        Create your account and start planning unforgettable multi-city adventures with our intelligent travel planner.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <CheckCircle size={16} className="text-indigo-400" />
                      </div>
                      <span className="text-sm">Smart itinerary builder</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <CheckCircle size={16} className="text-indigo-400" />
                      </div>
                      <span className="text-sm">Budget tracking & analytics</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <CheckCircle size={16} className="text-indigo-400" />
                      </div>
                      <span className="text-sm">Shareable travel plans</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                    <div className="text-xs text-gray-400">Join 10,000+ happy travelers</div>
                    <div className="flex -space-x-2 mt-2">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 border-2 border-[rgba(15,25,45,0.5)]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Signup Form */}
              <div className="md:col-span-3 p-6 md:p-8">
                <div className="text-center mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold font-playfair text-gradient-hero">
                    Create Your Travel Account
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Start planning your multi-city adventures effortlessly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Profile Image Upload */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-[rgba(15,25,45,0.8)] flex items-center justify-center overflow-hidden">
                          {profilePreview ? (
                            <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User size={40} className="text-gray-400" />
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-colors"
                      >
                        <Upload size={14} className="text-white" />
                      </button>
                      {profilePreview && (
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'firstName' ? 'scale-[1.02]' : ''}`}>
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('firstName')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.firstName ? 'border-red-500 focus:ring-red-500/20' : 'border-[rgba(108,99,255,0.3)] focus:border-indigo-500 focus:ring-indigo-500/20'
                          }`}
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'lastName' ? 'scale-[1.02]' : ''}`}>
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('lastName')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.lastName ? 'border-red-500 focus:ring-red-500/20' : 'border-[rgba(108,99,255,0.3)] focus:border-indigo-500 focus:ring-indigo-500/20'
                          }`}
                          placeholder="Doe"
                        />
                      </div>
                      {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-[rgba(108,99,255,0.3)] focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                        placeholder="traveler@example.com"
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'phone' ? 'scale-[1.02]' : ''}`}>
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-[rgba(108,99,255,0.3)] focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  {/* Country Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Country
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'country' ? 'scale-[1.02]' : ''}`}>
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('country')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 appearance-none cursor-pointer ${
                          errors.country ? 'border-red-500 focus:ring-red-500/20' : 'border-[rgba(108,99,255,0.3)] focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                      >
                        <option value="" className="bg-gray-900">Select your country</option>
                        {countries.map(country => (
                          <option key={country.code} value={country.code} className="bg-gray-900">
                            {country.flag} {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-[rgba(108,99,255,0.3)] focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[0,1,2,3,4].map((index) => (
                            <div
                              key={index}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                index < passwordStrength ? strengthInfo.color : 'bg-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">
                          Password strength: <span className={strengthInfo.color.replace('bg-', 'text-')}>{strengthInfo.label}</span>
                        </p>
                      </div>
                    )}
                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'confirmPassword' ? 'scale-[1.02]' : ''}`}>
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('confirmPassword')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.confirmPassword ? 'border-red-500 focus:ring-red-500/20' : 'border-[rgba(108,99,255,0.3)] focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {formData.confirmPassword && formData.password && !passwordsMatch && (
                      <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                    )}
                    {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 rounded border-[rgba(108,99,255,0.5)] bg-transparent checked:bg-indigo-500 focus:ring-indigo-500"
                    />
                    <label className="text-sm text-gray-400">
                      I agree to the{' '}
                      <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.terms && <p className="text-red-400 text-xs">{errors.terms}</p>}

                  {apiError && (
                    <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400 text-sm text-center">
                      {apiError}
                    </div>
                  )}
                  {successMsg && (
                    <div className="p-3 bg-green-500/20 border border-green-500/40 rounded-xl text-green-400 text-sm text-center">
                      {successMsg}
                    </div>
                  )}

                  {/* Sign Up Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[rgba(255,255,255,0.1)]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-[rgba(15,25,45,0.5)] text-gray-400">OR</span>
                    </div>
                  </div>

                  {/* Social Signup Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleGoogleSignup}
                      className="w-full flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] text-white font-medium py-3 rounded-xl transition-all duration-300"
                    >
                      <FaGoogle size={20} />
                      Continue with Google
                    </motion.button>

                    {/* <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleGithubSignup}
                      className="w-full flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] text-white font-medium py-3 rounded-xl transition-all duration-300"
                    >
                      <FaGithub size={20} />
                      Continue with GitHub
                    </motion.button> */}
                  </div>

                  {/* Login Link */}
                  <div className="text-center pt-4">
                    <p className="text-gray-400">
                      Already have an account?{' '}
                      <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SignupPage