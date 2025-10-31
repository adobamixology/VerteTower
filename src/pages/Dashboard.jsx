import React, { useState, useEffect } from 'react'
import { getUserDevices } from '../api/deviceApi'
import useRealtimeTelemetry from '../hooks/useRealtimeTelemetry'
import client from '../api/axiosClient'
import { toast } from 'react-toastify'
import { useAuth } from '../auth/useAuth'

export default function Dashboard() {
  const { user } = useAuth()
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [readings, setReadings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalDevices: 0,
    onlineDevices: 0,
    offlineDevices: 0,
    avgTemperature: 0,
    avgHumidity: 0
  })

  const getUserId = () => {
    if (user && user.userid) {
      console.log('🔍 Found user in auth context:', user)
      return user.userid
    }
    console.log('❌ No user found in auth context')
    return null
  }

  useEffect(() => {
    if (user) {
      fetchDevices()
    }
  }, [user])

  useEffect(() => {
    if (devices.length > 0 && !selectedDevice) {
      setSelectedDevice(devices[0])
    }
  }, [devices, selectedDevice])

  const realtime = useRealtimeTelemetry({
    userid: user?.userid,
    auid: selectedDevice?.auid || selectedDevice?.deviceId || selectedDevice?.id,
    model: selectedDevice?.model || selectedDevice?.deviceModel || selectedDevice?.type,
    intervalMs: 5000,
  })

  useEffect(() => {
    if (realtime?.data) setReadings(realtime.data)
  }, [realtime?.data])

  const fetchDevices = async () => {
    try {
      setLoading(true)
      
      const userid = getUserId()
      console.log('🚀 Fetching devices for user:', userid)
      
      if (!userid) {
        toast.error('Please log in to view devices')
        return
      }

      const response = await getUserDevices(userid)
      const devicesData = response.data || []
      console.log('✅ Devices response:', devicesData)
      
      setDevices(devicesData)

      const onlineCount = devicesData.filter(d => d.isActive).length
      setStats({
        totalDevices: devicesData.length,
        onlineDevices: onlineCount,
        offlineDevices: devicesData.length - onlineCount,
        avgTemperature: 25.6,
        avgHumidity: 65.2
      })

      if (devicesData.length > 0) {
        setSelectedDevice(devicesData[0])
      }
    } catch (error) {
      console.error('Error fetching devices:', error)
      toast.error('Failed to load devices')
    } finally {
      setLoading(false)
    }
  }

  // Legacy fetch helpers removed in favor of polling hook

  // Test all possible telemetry endpoint patterns
  // Test helpers removed

  // Manual test function for debugging
  const testTelemetryEndpointsManually = async () => {
    if (!selectedDevice) {
      toast.error('No device selected')
      return
    }

    const deviceId = selectedDevice.deviceId || selectedDevice.id || selectedDevice.auid
    const userid = getUserId()
    
    console.log('🧪 MANUAL TEST: Testing telemetry endpoints for device:', deviceId)
    console.log('👤 User ID:', userid)
    
    const result = await testAllTelemetryEndpoints(userid, deviceId)
    
    if (result) {
      toast.success('Telemetry data found!')
      setReadings(result)
    } else {
      toast.error('No telemetry endpoints worked')
    }
  }

  // Debug component
  const DebugInfo = () => {
    const userid = getUserId()
    
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-blue-800 font-semibold mb-2">Dashboard Debug Info</h3>
        <div className="text-sm text-blue-600 space-y-1">
          <p>User ID: {userid || 'Not found'}</p>
          <p>Devices Loaded: {devices.length}</p>
          <p>Selected Device: {selectedDevice ? (selectedDevice.nickname || selectedDevice.serial) : 'None'}</p>
          <p>Readings Data: {readings ? 'Available' : 'None'}</p>
          <p>User Data: {JSON.stringify(user)}</p>
        </div>
        <div className="mt-2 space-x-2">
          <button 
            onClick={fetchDevices}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Refresh Devices
          </button>
          <button 
            onClick={testTelemetryEndpointsManually}
            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
          >
            Test Telemetry Endpoints
          </button>
        </div>
      </div>
    )
  }

  // Your existing StatCard, SensorGauge components and JSX remain the same...
  const StatCard = ({ title, value, subtitle, icon, color = 'green' }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-lg bg-${color}-100 text-${color}-600`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  )

  const SensorGauge = ({ title, value, unit, min = 0, max = 100, color = 'green' }) => {
    const percentage = ((value - min) / (max - min)) * 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100)

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-4">{title}</h3>
        <div className="relative inline-block">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke={`var(--color-${color}-500)`}
              strokeWidth="8"
              fill="none"
              strokeDasharray="352"
              strokeDashoffset={352 - (352 * clampedPercentage) / 100}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">
              {value !== null && value !== undefined ? value : '--'}
            </span>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Farm Dashboard</h1>
        <p className="text-gray-600">Real-time monitoring of your hydroponic farm devices and sensor data</p>
      </div>

      {/* Debug Info - Remove this in production */}
      {/* <DebugInfo /> */}

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Devices"
          value={stats.totalDevices}
          subtitle="Registered devices"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          color="blue"
        />

        <StatCard
          title="Online Devices"
          value={stats.onlineDevices}
          subtitle="Active and reporting"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
          color="green"
        />

        <StatCard
          title="Avg Temperature"
          value={`${stats.avgTemperature}°C`}
          subtitle="Across all devices"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
          color="orange"
        />

        <StatCard
          title="Avg Humidity"
          value={`${stats.avgHumidity}%`}
          subtitle="Optimal range: 60-70%"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          }
          color="cyan"
        />
      </div>

      {/* Rest of your JSX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Device Selector and Sensor Readings */}
        <div className="lg:col-span-2">
          {/* Device Selector */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Device</h2>
            {devices.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Devices Found</h3>
                <p className="text-gray-500 mb-4">No devices are registered to your account.</p>
                <button 
                  onClick={fetchDevices}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {devices.map(device => (
                  <button
                    key={device.auid}
                    onClick={() => setSelectedDevice(device)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      selectedDevice?.auid === device.auid
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 truncate">
                        {device.nickname || device.serial}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        device.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {device.isActive ? 'Online' : 'Offline'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">AUID: {device.auid}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Real-time Sensor Readings */}
          {selectedDevice && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Real-time Sensor Data
                </h2>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">
                    {selectedDevice.nickname || selectedDevice.serial}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Live
                  </span>
                  <span className="text-xs text-gray-500">
                    {realtime.lastUpdated ? new Date(realtime.lastUpdated).toLocaleTimeString() : '—'}
                  </span>
                </div>
              </div>

              {realtime.error && (
                <div className="mb-4 text-sm text-red-600">Failed to refresh data</div>
              )}

              {readings ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <SensorGauge
                    title="Temperature"
                    value={readings.t}
                    unit="°C"
                    min={15}
                    max={35}
                    color="orange"
                  />
                  <SensorGauge
                    title="Humidity"
                    value={readings.h}
                    unit="%"
                    min={30}
                    max={90}
                    color="cyan"
                  />
                  <SensorGauge
                    title="Light Intensity"
                    value={readings.l}
                    unit="lux"
                    min={0}
                    max={2000}
                    color="yellow"
                  />
                  <SensorGauge
                    title="Battery Level"
                    value={readings.b}
                    unit="%"
                    min={0}
                    max={100}
                    color="green"
                  />
                  <SensorGauge
                    title="UV Index"
                    value={readings.u}
                    unit=""
                    min={0}
                    max={12}
                    color="purple"
                  />
                  <SensorGauge
                    title="Pressure"
                    value={readings.p}
                    unit="hPa"
                    min={900}
                    max={1100}
                    color="blue"
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Sensor Data</h3>
                  <p className="text-gray-500">This device hasn't reported any readings yet.</p>
                  <div className="mt-2 text-xs text-gray-400">Auto-refreshing…</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions and Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors duration-200">
                <span className="text-gray-700">Register New Device</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors duration-200">
                <span className="text-gray-700">View All Devices</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-colors duration-200">
                <span className="text-gray-700">Download Report</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Data Refresh</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API Connection</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Last Update</span>
                <span className="text-sm text-gray-500">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}