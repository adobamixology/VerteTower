import React, { useState, useEffect, useRef } from 'react'
import { getUserDevices, getDeviceTelemetry, getDeviceTelemetryByModel } from '../api/deviceApi'
import useRealtimeTelemetry from '../hooks/useRealtimeTelemetry'
import { toast } from 'react-toastify'
import { useAuth } from '../auth/useAuth'

// Simple Chart.js import
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

export default function Dashboard() {
  const { user } = useAuth()
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [readings, setReadings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview') // 'overview', 'analytics', 'devices'
  const [stats, setStats] = useState({
    totalDevices: 0,
    onlineDevices: 0,
    offlineDevices: 0,
    avgTemperature: 0,
    avgHumidity: 0
  })

  // State for historical data for charts
  const [historicalData, setHistoricalData] = useState({
    temperature: [],
    humidity: [],
    light: [],
    battery: [],
    pressure: [],
    ph: [],
    conductivity: []
  })

  const chartRef = useRef(null)

  // Debug: Log user data
  useEffect(() => {
    console.log('👤 User context:', user)
  }, [user])

  // Debug: Log selected device changes
  useEffect(() => {
    console.log('📱 Selected device changed:', selectedDevice)
  }, [selectedDevice])

  const getUserId = () => {
    if (user && user.userid) {
      return user.userid
    }
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

  // Enhanced realtime telemetry with better debugging
  const realtime = useRealtimeTelemetry({
    userid: user?.userid,
    auid: selectedDevice?.auid,
    model: selectedDevice?.model,
    intervalMs: 5000,
  })

  // Update historical data when new readings come in
  useEffect(() => {
    if (realtime.data && selectedDevice) {
      const newReading = {
        ...realtime.data,
        timestamp: Date.now()
      }

      setHistoricalData(prev => {
        const maxDataPoints = 20
        
        return {
          temperature: [...prev.temperature.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString(),
            y: newReading.t
          }],
          humidity: [...prev.humidity.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString(),
            y: newReading.h
          }],
          light: [...prev.light.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString(),
            y: newReading.l
          }],
          battery: [...prev.battery.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString(),
            y: newReading.b
          }],
          pressure: [...prev.pressure.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString(),
            y: newReading.p
          }],
          ph: newReading.ph ? [...prev.ph.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString(),
            y: newReading.ph
          }] : prev.ph,
          conductivity: newReading.ec ? [...prev.conductivity.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString(),
            y: newReading.ec
          }] : prev.conductivity
        }
      })
    }
  }, [realtime.data, selectedDevice])

  useEffect(() => {
    if (realtime.data) {
      setReadings(realtime.data)
    }
  }, [realtime.data])

  const fetchDevices = async () => {
    try {
      setLoading(true)
      
      const userid = getUserId()
      
      if (!userid) {
        toast.error('Please log in to view devices')
        return
      }

      const response = await getUserDevices(userid)
      const devicesData = response.data || []
      
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
      console.error('❌ Error fetching devices:', error)
      toast.error('Failed to load devices')
    } finally {
      setLoading(false)
    }
  }

  // Chart configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    },
    animation: {
      duration: 0
    }
  }

  const createChartData = (data, label, borderColor, backgroundColor) => ({
    labels: data.map(d => d.x),
    datasets: [
      {
        label,
        data: data.map(d => d.y),
        borderColor,
        backgroundColor,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
      },
    ],
  })

  // Components
  const StatCard = ({ title, value, subtitle, icon, color = 'green', trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend.value}</span>
              <svg className={`w-4 h-4 ml-1 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
          {icon}
        </div>
      </div>
    </div>
  )

  const SensorGauge = ({ title, value, unit, min = 0, max = 100, color = 'green' }) => {
    const percentage = ((value - min) / (max - min)) * 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100)

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-200">
        <h3 className="text-sm font-medium text-gray-600 mb-4">{title}</h3>
        <div className="relative inline-block">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#f3f4f6"
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

  const DeviceCard = ({ device, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border-2 text-left transition-all duration-200 w-full ${
        isSelected
          ? 'border-green-500 bg-green-50 shadow-sm'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900 truncate">
          {device.nickname || device.serial}
        </h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          device.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {device.isActive ? 'Online' : 'Offline'}
        </span>
      </div>
      <div className="space-y-1 text-xs text-gray-500">
        <p>Model: {device.model || 'N/A'}</p>
        <p className="font-mono truncate">ID: {device.auid}</p>
      </div>
    </button>
  )

  const NavigationTabs = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-6">
      <nav className="flex space-x-1">
        {[
          { id: 'overview', name: 'Overview', icon: '📊' },
          { id: 'analytics', name: 'Analytics', icon: '📈' },
          { id: 'devices', name: 'Devices', icon: '🔧' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  )

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Devices"
          value={stats.totalDevices}
          subtitle="Registered"
          icon="📱"
          color="blue"
          trend={{ value: '+2%', isPositive: true }}
        />
        <StatCard
          title="Online Devices"
          value={stats.onlineDevices}
          subtitle="Active now"
          icon="🟢"
          color="green"
        />
        <StatCard
          title="Avg Temperature"
          value={`${stats.avgTemperature}°C`}
          subtitle="Optimal range"
          icon="🌡️"
          color="orange"
        />
        <StatCard
          title="Avg Humidity"
          value={`${stats.avgHumidity}%`}
          subtitle="60-70% optimal"
          icon="💧"
          color="cyan"
        />
      </div>

      {/* Device Grid and Sensor Data */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Device Selection */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Devices</h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {devices.length} devices
              </span>
            </div>
            <div className="space-y-3">
              {devices.map(device => (
                <DeviceCard
                  key={device.auid}
                  device={device}
                  isSelected={selectedDevice?.auid === device.auid}
                  onClick={() => setSelectedDevice(device)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sensor Readings */}
        <div className="xl:col-span-2">
          {selectedDevice && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedDevice.nickname || selectedDevice.serial}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Real-time sensor monitoring
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Live Data
                  </span>
                  <span className="text-xs text-gray-500">
                    {realtime.lastUpdated ? new Date(realtime.lastUpdated).toLocaleTimeString() : '—'}
                  </span>
                </div>
              </div>

              {realtime.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  Failed to refresh data
                </div>
              )}

              {readings ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                    title="Light"
                    value={readings.l}
                    unit="lux"
                    min={0}
                    max={2000}
                    color="yellow"
                  />
                  <SensorGauge
                    title="Battery"
                    value={readings.b}
                    unit="%"
                    min={0}
                    max={100}
                    color="green"
                  />
                  <SensorGauge
                    title="Pressure"
                    value={readings.p}
                    unit="hPa"
                    min={900}
                    max={1100}
                    color="purple"
                  />
                  {readings.ph && (
                    <SensorGauge
                      title="pH Level"
                      value={readings.ph}
                      unit=""
                      min={0}
                      max={14}
                      color="pink"
                    />
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 text-gray-400 mx-auto mb-4">📊</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
                  <p className="text-gray-500">Waiting for sensor readings...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const AnalyticsTab = () => (
    <div className="space-y-6">
      {historicalData.temperature.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Trend</h3>
              <div className="h-64">
                <Line
                  data={createChartData(
                    historicalData.temperature,
                    'Temperature (°C)',
                    'rgb(249, 115, 22)',
                    'rgba(249, 115, 22, 0.1)'
                  )}
                  options={chartOptions}
                />
              </div>
            </div>

            {/* Humidity Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Humidity Trend</h3>
              <div className="h-64">
                <Line
                  data={createChartData(
                    historicalData.humidity,
                    'Humidity (%)',
                    'rgb(6, 182, 212)',
                    'rgba(6, 182, 212, 0.1)'
                  )}
                  options={chartOptions}
                />
              </div>
            </div>

            {/* Light Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Light Intensity</h3>
              <div className="h-64">
                <Line
                  data={createChartData(
                    historicalData.light,
                    'Light (lux)',
                    'rgb(234, 179, 8)',
                    'rgba(234, 179, 8, 0.1)'
                  )}
                  options={chartOptions}
                />
              </div>
            </div>

            {/* Battery Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Battery Level</h3>
              <div className="h-64">
                <Line
                  data={createChartData(
                    historicalData.battery,
                    'Battery (%)',
                    'rgb(34, 197, 94)',
                    'rgba(34, 197, 94, 0.1)'
                  )}
                  options={{
                    ...chartOptions,
                    scales: {
                      ...chartOptions.scales,
                      y: { ...chartOptions.scales.y, min: 0, max: 100 }
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          {(historicalData.ph.length > 0 || historicalData.conductivity.length > 0) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {historicalData.ph.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">pH Level</h3>
                  <div className="h-64">
                    <Line
                      data={createChartData(
                        historicalData.ph,
                        'pH Level',
                        'rgb(236, 72, 153)',
                        'rgba(236, 72, 153, 0.1)'
                      )}
                      options={{
                        ...chartOptions,
                        scales: {
                          ...chartOptions.scales,
                          y: { ...chartOptions.scales.y, min: 0, max: 14 }
                        }
                      }}
                    />
                  </div>
                </div>
              )}
              {historicalData.conductivity.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Conductivity</h3>
                  <div className="h-64">
                    <Line
                      data={createChartData(
                        historicalData.conductivity,
                        'Conductivity (µS/cm)',
                        'rgb(99, 102, 241)',
                        'rgba(99, 102, 241, 0.1)'
                      )}
                      options={chartOptions}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 text-gray-400 mx-auto mb-4">📈</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analytics Data</h3>
          <p className="text-gray-500 mb-6">Analytics will appear as data is collected from your devices.</p>
        </div>
      )}
    </div>
  )

  const DevicesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Device Management</h2>
            <p className="text-gray-500 mt-1">Manage and monitor all your connected devices</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center">
            <span className="mr-2">+</span>
            Add Device
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map(device => (
            <div key={device.auid} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{device.nickname || device.serial}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  device.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {device.isActive ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Model:</span>
                  <span className="font-medium">{device.model || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Serial:</span>
                  <span className="font-mono text-xs">{device.serial}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={device.isActive ? 'text-green-600' : 'text-gray-500'}>
                    {device.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-200">
                  View Details
                </button>
                <button className="flex-1 bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm hover:bg-blue-200 transition-colors duration-200">
                  Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Farm Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor and manage your hydroponic systems</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <NavigationTabs />
        
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
        {activeTab === 'devices' && <DevicesTab />}
      </div>
    </div>
  )
}