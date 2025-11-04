// App.jsx
import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Devices from './pages/Devices'
import RegisterDevice from './pages/RegisterDevice'
import DeviceReadings from './pages/DeviceReadings'
import DevicesList from './pages/DevicesList'
import { useAuth } from './auth/useAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'

function Protected({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AdminProtected({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!user.isAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

function Public({ children }) {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Simulate initial app loading
  useEffect(() => {
    // You can add actual loading logic here (checking auth status, preloading data, etc.)
    const timer = setTimeout(() => {
      // This ensures minimum loading time for better UX
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Marketing Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Products />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Pages - Redirect to dashboard if already logged in */}
          <Route path="/login" element={<Public><Login /></Public>} />
          <Route path="/register" element={<Public><Register /></Public>} />
          <Route path="/verify-otp" element={<Public><VerifyOtp /></Public>} />
          
          {/* Protected Dashboard Pages */}
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/admin" element={<AdminProtected><AdminDashboard /></AdminProtected>} />
          
          {/* Device Management Routes */}
          <Route path="/devices" element={<Protected><DevicesList /></Protected>} />
          <Route path="/devices/register" element={<Protected><RegisterDevice /></Protected>} />
          <Route path="/devices/:deviceId/readings" element={<Protected><DeviceReadings /></Protected>} />
          <Route path="/devices/:deviceId" element={<Protected><Devices /></Protected>} />
          
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}