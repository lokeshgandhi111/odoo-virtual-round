import React from 'react'
import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  const socialIcons = [FaTwitter, FaInstagram, FaGithub, FaLinkedin]

  return (
    <footer id="contact" className="border-t border-indigo-500/20 pt-12 pb-6 px-6 md:px-12 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-bold text-gradient-primary">Traveloop</div>
          <p className="text-gray-400 text-sm mt-2">Seamless multi-city travel planning with futuristic design.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Explore</h4>
          <ul className="mt-3 space-y-2 text-gray-400 text-sm">
            <li><a href="#features" className="hover:text-indigo-300 transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-indigo-300 transition-colors">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-indigo-300 transition-colors">Pricing</a></li>
            <li><a href="#contact" className="hover:text-indigo-300 transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Support</h4>
          <ul className="mt-3 space-y-2 text-gray-400 text-sm">
            <li>Help Center</li>
            <li>Community</li>
            <li>Status</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Connect</h4>
          <div className="flex gap-4 mt-3">
            {socialIcons.map((Icon, idx) => (
              <Icon key={idx} size={20} className="hover:text-indigo-400 cursor-pointer transition-colors" />
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">hello@traveloop.com</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs mt-12 pt-4 border-t border-indigo-500/10">
        © 2025 Traveloop — all rights reserved. Explore beyond limits.
      </div>
    </footer>
  )
}

export default Footer