import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom' // Add this import

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate() // Add this for navigation

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['Features', 'How It Works', 'Pricing', 'Contact']

  // Handle navigation to login/signup
  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignupClick = () => {
    navigate('/signup')
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'navbar-blur' : 'bg-transparent'
    } px-6 md:px-12 py-4`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo - Link to home */}
        <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tight text-gradient-primary cursor-pointer">
          Traveloop
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} 
               className="hover:text-indigo-300 transition-colors duration-300">
              {link}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={handleLoginClick}
            className="text-sm font-medium px-5 py-2 rounded-full border border-indigo-400/50 hover:bg-indigo-500/20 transition-all duration-300"
          >
            Login
          </button>
          <button 
            onClick={handleSignupClick}
            className="text-sm font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/30 transition-all duration-300"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full navbar-blur py-4 px-6 flex flex-col gap-4">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
               className="text-gray-300 hover:text-indigo-300 transition-colors py-2"
               onClick={() => setIsMobileMenuOpen(false)}>
              {link}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false)
                handleLoginClick()
              }}
              className="flex-1 text-sm font-medium px-4 py-2 rounded-full border border-indigo-400/50"
            >
              Login
            </button>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false)
                handleSignupClick()
              }}
              className="flex-1 text-sm font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar