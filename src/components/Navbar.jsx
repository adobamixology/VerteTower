import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import logo from '../assets/vtlogo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    scrollToTop()
  }

  const handleLinkClick = () => {
    scrollToTop()
    setIsOpen(false)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex items-center">
            <img src={logo} alt="Verte Tower Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Conditional Rendering */}
            {!user ? (
              <>
                {/* Marketing Links for non-authenticated users */}
                <Link to="/" onClick={scrollToTop} className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Home</Link>
                <Link to="/about" onClick={scrollToTop} className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">About</Link>
                <Link to="/products" onClick={scrollToTop} className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Products</Link>
                <Link to="/team" onClick={scrollToTop} className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Team</Link>
                <Link to="/contact" onClick={scrollToTop} className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Contact</Link>
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                  <Link to="/login" onClick={scrollToTop} className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Login</Link>
                  <Link to="/register" onClick={scrollToTop} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 font-medium">
                    Get Started
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Authenticated user links only */}
                <Link to="/dashboard" onClick={scrollToTop} className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Dashboard</Link>
                <Link to="/devices" onClick={scrollToTop} className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Devices</Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white py-4 space-y-3 border-t">
            {!user ? (
              <>
                <Link to="/" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={handleLinkClick}>Home</Link>
                <Link to="/about" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={handleLinkClick}>About</Link>
                <Link to="/products" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={handleLinkClick}>Products</Link>
                <Link to="/team" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={handleLinkClick}>Team</Link>
                <Link to="/contact" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={handleLinkClick}>Contact</Link>

                <div className="border-t pt-3 mt-3 space-y-2">
                  <Link to="/login" className="block text-center text-gray-700 border border-gray-300 hover:border-green-600 hover:text-green-600 transition duration-300 font-medium py-2 rounded-lg" onClick={handleLinkClick}>Login</Link>
                  <Link to="/register" className="block text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 font-medium" onClick={handleLinkClick}>
                    Get Started
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={handleLinkClick}>Dashboard</Link>
                <Link to="/devices" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={handleLinkClick}>Devices</Link>
                <button 
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 font-medium mt-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
