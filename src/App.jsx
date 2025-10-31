import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// Remove this import: import Partners from './components/Partners'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'
import Dashboard from './pages/Dashboard'
import Devices from './pages/Devices'
import Farms from './pages/Farms'
import FarmDetail from './pages/FarmDetail'
import RegisterDevice from './pages/RegisterDevice'
import DeviceReadings from './pages/DeviceReadings'
import DevicesList from './pages/DevicesList'
import { useAuth } from './auth/useAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Protected({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function Public({ children }) {
  const { user } = useAuth()
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Marketing Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Pages - Redirect to dashboard if already logged in */}
          <Route path="/login" element={<Public><Login /></Public>} />
          <Route path="/register" element={<Public><Register /></Public>} />
          <Route path="/verify-otp" element={<Public><VerifyOtp /></Public>} />
          
          {/* Protected Dashboard Pages */}
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          
          {/* Device Management Routes */}
          <Route path="/devices" element={<Protected><DevicesList /></Protected>} />
          <Route path="/devices/register" element={<Protected><RegisterDevice /></Protected>} />
          <Route path="/devices/:deviceId/readings" element={<Protected><DeviceReadings /></Protected>} />
          <Route path="/devices/:deviceId" element={<Protected><Devices /></Protected>} />
          <Route path="/farms" element={<Protected><Farms /></Protected>} />
          <Route path="/farms/:deploymentId" element={<Protected><FarmDetail /></Protected>} />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* Remove this line: <Partners /> */}
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}