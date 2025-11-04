import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getUserDevices, getDeviceTelemetry, getDeviceTelemetryByModel } from '../api/deviceApi'
import useRealtimeTelemetry from '../hooks/useRealtimeTelemetry'
import { toast } from 'react-toastify'
import { useAuth } from '../auth/useAuth'

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function Dashboard() {
  const { user } = useAuth()
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [readings, setReadings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
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

  // Professional chart colors with enhanced gradients
  const chartColors = {
    pressure: {
      gradient: 'rgba(139, 92, 246, 0.4)',
      gradientEnd: 'rgba(139, 92, 246, 0.05)',
      border: 'rgb(139, 92, 246)',
      point: 'rgb(139, 92, 246)',
      shadow: 'rgba(139, 92, 246, 0.2)'
    },
    temperature: {
      gradient: 'rgba(249, 115, 22, 0.4)',
      gradientEnd: 'rgba(249, 115, 22, 0.05)',
      border: 'rgb(249, 115, 22)',
      point: 'rgb(249, 115, 22)',
      shadow: 'rgba(249, 115, 22, 0.2)'
    },
    humidity: {
      gradient: 'rgba(6, 182, 212, 0.4)',
      gradientEnd: 'rgba(6, 182, 212, 0.05)',
      border: 'rgb(6, 182, 212)',
      point: 'rgb(6, 182, 212)',
      shadow: 'rgba(6, 182, 212, 0.2)'
    },
    light: {
      gradient: 'rgba(234, 179, 8, 0.4)',
      gradientEnd: 'rgba(234, 179, 8, 0.05)',
      border: 'rgb(234, 179, 8)',
      point: 'rgb(234, 179, 8)',
      shadow: 'rgba(234, 179, 8, 0.2)'
    },
    battery: {
      gradient: 'rgba(34, 197, 94, 0.4)',
      gradientEnd: 'rgba(34, 197, 94, 0.05)',
      border: 'rgb(34, 197, 94)',
      point: 'rgb(34, 197, 94)',
      shadow: 'rgba(34, 197, 94, 0.2)'
    },
    ph: {
      gradient: 'rgba(236, 72, 153, 0.4)',
      gradientEnd: 'rgba(236, 72, 153, 0.05)',
      border: 'rgb(236, 72, 153)',
      point: 'rgb(236, 72, 153)',
      shadow: 'rgba(236, 72, 153, 0.2)'
    },
    conductivity: {
      gradient: 'rgba(99, 102, 241, 0.4)',
      gradientEnd: 'rgba(99, 102, 241, 0.05)',
      border: 'rgb(99, 102, 241)',
      point: 'rgb(99, 102, 241)',
      shadow: 'rgba(99, 102, 241, 0.2)'
    }
  }

  // Mobile-optimized chart options
  const createChartOptions = (title, min = null, max = null) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        titleColor: '#111827',
        bodyColor: '#6b7280',
        borderColor: 'rgba(229, 231, 235, 0.8)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        padding: 12,
        boxPadding: 6,
        titleFont: {
          size: 12,
          weight: '600'
        },
        bodyFont: {
          size: 12,
          weight: '500'
        },
        callbacks: {
          label: function(context) {
            return `${title}: ${context.parsed.y.toFixed(1)}`
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 10,
            weight: '400'
          },
          maxRotation: 45,
          padding: 8
        }
      },
      y: {
        min: min,
        max: max,
        grid: {
          color: 'rgba(243, 244, 246, 0.6)',
          drawBorder: false,
          lineWidth: 1
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 10,
            weight: '400'
          },
          padding: 8
        },
        border: {
          display: false
        }
      }
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
        hoverBackgroundColor: '#ffffff',
        hoverBorderColor: chartColors[title.toLowerCase()]?.border || '#000',
        hoverBorderWidth: 2
      },
      line: {
        tension: 0.4,
        borderWidth: 2,
        fill: true,
        borderCapStyle: 'round',
        borderJoinStyle: 'round'
      }
    }
  })

  // Create enhanced gradient for chart background
  const createGradient = (ctx, chartArea, color, colorKey) => {
    const colors = chartColors[colorKey] || { gradient: color, gradientEnd: 'rgba(255, 255, 255, 0.05)' }
    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, colors.gradient)
    gradient.addColorStop(0.5, colors.gradientEnd || 'rgba(255, 255, 255, 0.1)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    return gradient
  }

  // Enhanced chart data with professional gradients
  const createChartData = (data, label, colorKey) => {
    const defaultColors = {
      gradient: 'rgba(156, 163, 175, 0.4)',
      gradientEnd: 'rgba(156, 163, 175, 0.05)',
      border: 'rgb(156, 163, 175)',
      point: 'rgb(156, 163, 175)',
      shadow: 'rgba(156, 163, 175, 0.2)'
    }

    const colors = chartColors[colorKey] || defaultColors
    const safeData = Array.isArray(data) ? data : []
    
    return {
      labels: safeData.map(d => d?.x || ''),
      datasets: [
        {
          label: label,
          data: safeData.map(d => d?.y || 0),
          borderColor: colors.border,
          backgroundColor: (context) => {
            const chart = context.chart
            const { ctx, chartArea } = chart
            if (!chartArea) return colors.gradient
            return createGradient(ctx, chartArea, colors.gradient, colorKey)
          },
          pointBackgroundColor: colors.point,
          pointBorderColor: '#ffffff',
          pointHoverBackgroundColor: '#ffffff',
          pointHoverBorderColor: colors.border,
          fill: true,
          tension: 0.4
        }
      ]
    }
  }

  // Mobile-optimized Navigation Tabs
  const NavigationTabs = () => {
    const tabs = [
      { id: 'overview', name: 'Overview', icon: '📊' },
      { id: 'analytics', name: 'Analytics', icon: '📈' },
      { id: 'devices', name: 'Devices', icon: '📱' },
    ]

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 mb-4 md:mb-6">
        <nav className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-3 py-2 md:px-4 md:py-3 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 flex-1 justify-center min-w-0 ${
                activeTab === tab.id
                  ? 'bg-green-100 text-green-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2 text-base">{tab.icon}</span>
              <span className="hidden xs:inline">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>
    )
  }

  // Mobile-optimized StatCard
  const StatCard = ({ title, value, subtitle, icon, color = 'green' }) => {
    const colorMap = {
      green: { bg: 'from-emerald-500/10 to-green-500/5', iconBg: 'from-emerald-500 to-green-600' },
      blue: { bg: 'from-blue-500/10 to-cyan-500/5', iconBg: 'from-blue-500 to-cyan-600' },
      orange: { bg: 'from-orange-500/10 to-amber-500/5', iconBg: 'from-orange-500 to-amber-600' },
      cyan: { bg: 'from-cyan-500/10 to-sky-500/5', iconBg: 'from-cyan-500 to-sky-600' }
    }
    const colors = colorMap[color] || colorMap.green

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 mb-1 truncate">{title}</p>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-1 truncate">{value}</p>
            {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
          </div>
          <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br ${colors.iconBg} text-white shadow-sm ml-3 flex-shrink-0`}>
            <span className="text-lg md:text-xl">{icon}</span>
          </div>
        </div>
      </div>
    )
  }

  // Mobile-optimized SensorGauge
  const SensorGauge = ({ title, value, unit, min = 0, max = 100, color = 'green' }) => {
    const percentage = ((value - min) / (max - min)) * 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100)

    const colorMap = {
      green: '#10b981',
      orange: '#f59e0b',
      cyan: '#06b6d4',
      yellow: '#eab308',
      purple: '#8b5cf6',
      pink: '#ec4899'
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
        <h3 className="text-sm font-medium text-gray-600 mb-3">{title}</h3>
        <div className="relative inline-block">
          <svg className="w-20 h-20 md:w-24 md:h-24 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#f3f4f6"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={colorMap[color]}
              strokeWidth="6"
              fill="none"
              strokeDasharray="176"
              strokeDashoffset={176 - (176 * clampedPercentage) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg md:text-xl font-bold text-gray-900">
              {value !== null && value !== undefined ? value : '--'}
            </span>
            <span className="text-xs text-gray-500">{unit}</span>
          </div>
        </div>
      </div>
    )
  }

  // Mobile-optimized DeviceCard
  const DeviceCard = ({ device, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg border-2 text-left transition-all duration-200 w-full ${
        isSelected
          ? 'border-green-500 bg-green-50 shadow-sm'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-sm truncate">
          {device.nickname || device.serial}
        </h3>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
          device.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {device.isActive ? 'Online' : 'Offline'}
        </span>
      </div>
      <div className="space-y-1 text-xs text-gray-500">
        <p className="truncate">Model: {device.model || 'N/A'}</p>
        <p className="font-mono truncate text-xs">ID: {device.auid}</p>
      </div>
    </button>
  )

  // Mobile-optimized Chart Container
  const ChartContainer = ({ title, children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2 text-xs text-gray-500 bg-green-50 px-2 py-1 rounded-full border border-green-100">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </div>
      <div className="relative">
        {children}
      </div>
    </div>
  )

  // Mobile-optimized Overview Tab
  const OverviewTab = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Devices"
          value={stats.totalDevices}
          subtitle={`${stats.onlineDevices} online`}
          icon="📱"
          color="blue"
        />
        <StatCard
          title="Avg Temp"
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
        <StatCard
          title="Status"
          value={stats.onlineDevices > 0 ? "Active" : "Offline"}
          subtitle={`${stats.onlineDevices}/${stats.totalDevices}`}
          icon="🟢"
          color="green"
        />
      </div>

      {/* Device Grid and Sensor Data */}
      <div className="space-y-4 md:space-y-6">
        {/* Device Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Devices</h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {devices.length} devices
            </span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
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

        {/* Sensor Readings */}
        <div>
          {selectedDevice && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {selectedDevice.nickname || selectedDevice.serial}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 truncate">
                    Real-time sensor monitoring
                  </p>
                </div>
                <div className="flex items-center space-x-2 ml-3 flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Live
                  </span>
                </div>
              </div>

              {realtime.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  Failed to refresh data
                </div>
              )}

              {readings ? (
                <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3">
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
                <div className="text-center py-8">
                  <div className="w-12 h-12 text-gray-400 mx-auto mb-3">📊</div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">No Data Available</h3>
                  <p className="text-gray-500 text-sm">Waiting for sensor readings...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Mobile-optimized Analytics Tab
  const AnalyticsTab = () => (
    <div className="space-y-4 md:space-y-6">
      {historicalData.temperature.length > 0 ? (
        <>
          {/* Main Charts */}
          <div className="space-y-4 md:space-y-6">
            <ChartContainer title="Temperature Trend">
              <div className="h-48 md:h-64">
                <Line
                  data={createChartData(historicalData.temperature, 'Temperature', 'temperature')}
                  options={createChartOptions('Temperature', 15, 35)}
                />
              </div>
            </ChartContainer>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <ChartContainer title="Humidity Trend">
                <div className="h-48 md:h-64">
                  <Line
                    data={createChartData(historicalData.humidity, 'Humidity', 'humidity')}
                    options={createChartOptions('Humidity', 30, 90)}
                  />
                </div>
              </ChartContainer>

              <ChartContainer title="Light Intensity">
                <div className="h-48 md:h-64">
                  <Line
                    data={createChartData(historicalData.light, 'Light', 'light')}
                    options={createChartOptions('Light', 0, 2000)}
                  />
                </div>
              </ChartContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <ChartContainer title="Battery Level">
                <div className="h-48 md:h-64">
                  <Line
                    data={createChartData(historicalData.battery, 'Battery', 'battery')}
                    options={createChartOptions('Battery', 0, 100)}
                  />
                </div>
              </ChartContainer>

              <ChartContainer title="Pressure">
                <div className="h-48 md:h-64">
                  <Line
                    data={createChartData(historicalData.pressure, 'Pressure', 'pressure')}
                    options={createChartOptions('Pressure', 900, 1100)}
                  />
                </div>
              </ChartContainer>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 text-gray-300 mx-auto mb-4">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analytics Data Yet</h3>
          <p className="text-gray-500 text-sm">Charts will appear as data is collected</p>
        </div>
      )}
    </div>
  )

  // Mobile-optimized Devices Tab
  const DevicesTab = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Device Management</h2>
            <p className="text-gray-500 text-sm mt-1">Manage your connected devices</p>
          </div>
          <button className="bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center text-sm">
            <span className="mr-1">+</span>
            <span className="hidden xs:inline">Add Device</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {devices.map(device => (
            <div key={device.auid} className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm truncate">{device.nickname || device.serial}</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                  device.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {device.isActive ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Model:</span>
                  <span className="font-medium truncate ml-2">{device.model || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Serial:</span>
                  <span className="font-mono text-xs truncate ml-2">{device.serial}</span>
                </div>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="flex-1 bg-gray-100 text-gray-700 py-1.5 px-2 rounded text-xs hover:bg-gray-200 transition-colors duration-200 truncate">
                  View Details
                </button>
                <button className="flex-1 bg-blue-100 text-blue-700 py-1.5 px-2 rounded text-xs hover:bg-blue-200 transition-colors duration-200 truncate">
                  Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Your existing useEffect hooks and functions remain the same...
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

  // Enhanced realtime telemetry
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
            x: new Date(newReading.timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            y: newReading.t
          }],
          humidity: [...prev.humidity.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            y: newReading.h
          }],
          light: [...prev.light.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            y: newReading.l
          }],
          battery: [...prev.battery.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            y: newReading.b
          }],
          pressure: [...prev.pressure.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            y: newReading.p
          }],
          ph: newReading.ph ? [...prev.ph.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            y: newReading.ph
          }] : prev.ph,
          conductivity: newReading.ec ? [...prev.conductivity.slice(-maxDataPoints), {
            x: new Date(newReading.timestamp).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
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
      {/* Mobile-optimized Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-green-800 truncate">
                Farm Dashboard
              </h1>
              <p className="text-gray-600 text-sm truncate">Monitor your hydroponic systems</p>
            </div>
            <div className="flex items-center space-x-2 ml-3">
              {user?.isAdmin || user?.role === 'admin' ? (
                <Link
                  to="/admin"
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors duration-200"
                >
                  Admin
                </Link>
              ) : null}
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <NavigationTabs />
        
        <div>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'analytics' && <AnalyticsTab />}
          {activeTab === 'devices' && <DevicesTab />}
        </div>
      </div>
    </div>
  )
}