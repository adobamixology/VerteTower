import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../auth/useAuth'
import { getUserDevices } from '../api/deviceApi'

export default function DevicesList() {
  const { user } = useAuth()
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getUserId = () => {
    if (user && user.userid) {
      return user.userid
    }
    return null
  }

  // Using axios client via deviceApi; no CORS proxy needed

  const fetchUserDevices = async () => {
    try {
      setLoading(true)
      setError('')
      
      const userid = getUserId()
      if (!userid) {
        setError('User ID not found. Please log in again.')
        return
      }

      console.log('🚀 Fetching devices for user:', userid)
      const resp = await getUserDevices(userid)
      const data = resp?.data || []
      console.log('✅ Devices data received:', data)

      const list = Array.isArray(data) ? data : (data && typeof data === 'object' ? [data] : [])
      setDevices(list)
      if (list.length === 0) toast.info('No devices found for your account')
      else toast.success(`Loaded ${list.length} device(s)`) 

    } catch (err) {
      console.error('❌ Error fetching devices:', err)
      const status = err?.response?.status
      if (status === 404) {
        setDevices([])
        toast.info('No devices registered yet')
      } else if (status === 401) {
        setError('Authentication failed. Please log in again.')
        toast.error('Authentication failed. Please log in again.')
      } else {
        setError(err.message || 'Failed to load devices. Please try again.')
        toast.error(err.message || 'Failed to load devices')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserDevices()
    }
  }, [user])

  const handleRefresh = () => {
    fetchUserDevices()
  }

  const DebugInfo = () => {
    const userData = localStorage.getItem('user')
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-blue-800 font-semibold mb-2">Debug Info</h3>
        <div className="text-sm text-blue-600 space-y-1">
          <p>User ID: {getUserId() || 'Not found'}</p>
          <p>User Data: {userData ? 'Present' : 'Missing'}</p>
          <p>Devices Loaded: {devices.length}</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Devices</h2>
          <Link to="/devices/register" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition duration-300">
            Register Device
          </Link>
        </div>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading devices...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Devices</h2>
          <Link to="/devices/register" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition duration-300">
            Register Device
          </Link>
        </div>
        <DebugInfo />
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={handleRefresh} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">My Devices</h2>
          <p className="text-gray-600 mt-1">Manage your registered devices and view sensor data</p>
        </div>
        <Link to="/devices/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 font-medium">
          + Register Device
        </Link>
      </div>

      {devices.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
          <p className="text-gray-500 mb-4">You haven't registered any devices yet.</p>
          <Link to="/devices/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
            Register Your First Device
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map(device => (
            <DeviceCard key={device.auid} device={device} />
          ))}
        </div>
      )}
    </div>
  )
}

function DeviceCard({ device }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {device.nickname || device.serial || 'Unnamed Device'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">AUID: {device.auid}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            device.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {device.isActive ? 'Online' : 'Offline'}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {device.serial && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Serial:</span>
              <span className="font-medium">{device.serial}</span>
            </div>
          )}
          {device.location && Array.isArray(device.location) && device.location.length === 2 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{device.location[0]?.toFixed(4)}, {device.location[1]?.toFixed(4)}</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Link 
            to={`/devices/${device.auid}`}
            className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700 transition duration-300 text-center"
          >
            View Details
          </Link>
          <Link 
            to={`/devices/${device.auid}/readings`}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition duration-300 text-center"
          >
            Sensor Data
          </Link>
        </div>
      </div>
    </div>
  )
}
