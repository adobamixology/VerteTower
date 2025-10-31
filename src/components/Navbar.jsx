import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import logo from '../assets/vtlogo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Verte Tower Logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Marketing Links - Always visible */}
            <Link to="/" className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Services</Link>
            <Link to="/team" className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Team</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Contact</Link>
            
            {/* Conditional Auth Links */}
            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                <Link to="/dashboard" className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Dashboard</Link>
                <Link to="/devices" className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Devices</Link>
                <Link to="/farms" className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Farms</Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                <Link to="/login" className="text-gray-700 hover:text-green-600 transition duration-300 font-medium">Login</Link>
                <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 font-medium">
                  Get Started
                </Link>
              </div>
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
            {/* Marketing Links */}
            <Link to="/" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/services" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/team" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={() => setIsOpen(false)}>Team</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={() => setIsOpen(false)}>Contact</Link>
            
            {/* Conditional Auth Links */}
            {user ? (
              <>
                <div className="border-t pt-3 mt-3">
                  <Link to="/dashboard" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={() => setIsOpen(false)}>Dashboard</Link>
                  <Link to="/devices" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={() => setIsOpen(false)}>Devices</Link>
                  <Link to="/farms" className="block text-gray-700 hover:text-green-600 transition duration-300 font-medium py-2" onClick={() => setIsOpen(false)}>Farms</Link>
                  <button 
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 font-medium mt-2"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t pt-3 mt-3 space-y-2">
                <Link to="/login" className="block text-center text-gray-700 border border-gray-300 hover:border-green-600 hover:text-green-600 transition duration-300 font-medium py-2 rounded-lg" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="block text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 font-medium" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}