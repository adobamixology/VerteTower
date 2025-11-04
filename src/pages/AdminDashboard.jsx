import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { toast } from 'react-toastify'
import {
  getAllUsers,
  getAdminStats,
  getRecentActivities,
  getAllDevices,
  getActivityLogs,
  toggleUserStatus,
  deleteUser,
  getUserGrowth,
  getDeviceUsage
} from '../api/adminApi'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalDevices: 0,
    activeDevices: 0,
    recentSignups: 0,
    totalActivities: 0
  })
  const [users, setUsers] = useState([])
  const [devices, setDevices] = useState([])
  const [activities, setActivities] = useState([])
  const [userGrowth, setUserGrowth] = useState(null)
  const [deviceUsage, setDeviceUsage] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserModal, setShowUserModal] = useState(false)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user, activeTab])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      if (activeTab === 'overview') {
        const [statsRes, activitiesRes] = await Promise.all([
          getAdminStats().catch(() => ({ data: stats })),
          getRecentActivities(10).catch(() => ({ data: [] }))
        ])
        setStats(statsRes.data || stats)
        setActivities(activitiesRes.data || [])
        
        // Fetch analytics
        try {
          const [growthRes, usageRes] = await Promise.all([
            getUserGrowth('30d'),
            getDeviceUsage('30d')
          ])
          setUserGrowth(growthRes.data)
          setDeviceUsage(usageRes.data)
        } catch (e) {
          console.log('Analytics not available:', e)
        }
      } else if (activeTab === 'users') {
        const res = await getAllUsers()
        setUsers(res.data || [])
      } else if (activeTab === 'devices') {
        const res = await getAllDevices()
        setDevices(res.data || [])
      } else if (activeTab === 'activities') {
        const res = await getActivityLogs({ limit: 100 })
        setActivities(res.data || [])
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      toast.error('Failed to load dashboard data')
      // Set mock data for development
      setMockData()
    } finally {
      setLoading(false)
    }
  }

  const setMockData = () => {
    setStats({
      totalUsers: 45,
      activeUsers: 38,
      totalDevices: 127,
      activeDevices: 112,
      recentSignups: 8,
      totalActivities: 1245
    })
    setUsers([
      { id: 1, email: 'user1@example.com', firstName: 'John', lastName: 'Doe', isActive: true, createdAt: new Date().toISOString(), devicesCount: 3 },
      { id: 2, email: 'user2@example.com', firstName: 'Jane', lastName: 'Smith', isActive: true, createdAt: new Date().toISOString(), devicesCount: 5 },
    ])
    setDevices([
      { id: 1, serial: 'VT001', model: 'Tower-1', isActive: true, userId: 1, userEmail: 'user1@example.com' },
      { id: 2, serial: 'VT002', model: 'Tower-2', isActive: true, userId: 2, userEmail: 'user2@example.com' },
    ])
    setActivities([
      { id: 1, type: 'login', userId: 1, userEmail: 'user1@example.com', timestamp: new Date().toISOString(), description: 'User logged in' },
      { id: 2, type: 'device_registered', userId: 1, userEmail: 'user1@example.com', timestamp: new Date().toISOString(), description: 'Device VT001 registered' },
    ])
  }

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      await toggleUserStatus(userId, !currentStatus)
      toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'}`)
      fetchDashboardData()
    } catch (error) {
      toast.error('Failed to update user status')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    
    try {
      await deleteUser(userId)
      toast.success('User deleted')
      fetchDashboardData()
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Navigation Tabs
  const NavigationTabs = () => {
    const tabs = [
      { id: 'overview', name: 'Overview', icon: '📊' },
      { id: 'users', name: 'Users', icon: '👥' },
      { id: 'devices', name: 'Devices', icon: '📱' },
      { id: 'activities', name: 'Activities', icon: '📋' },
    ]

    return (
      <div className="glass-strong rounded-2xl shadow-sm border border-white/50 p-1.5 mb-6 animate-fade-in-up">
        <nav className="flex space-x-1.5">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-5 py-3 text-sm font-semibold rounded-xl smooth-transition relative ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
              }`}
            >
              <span className="mr-2 text-base">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    )
  }

  // Stat Card Component
  const StatCard = ({ title, value, subtitle, icon, color = 'blue', trend }) => {
    const colorMap = {
      blue: { bg: 'from-blue-500/10 to-indigo-500/5', iconBg: 'from-blue-500 to-indigo-600' },
      green: { bg: 'from-emerald-500/10 to-green-500/5', iconBg: 'from-emerald-500 to-green-600' },
      purple: { bg: 'from-purple-500/10 to-violet-500/5', iconBg: 'from-purple-500 to-violet-600' },
      orange: { bg: 'from-orange-500/10 to-amber-500/5', iconBg: 'from-orange-500 to-amber-600' },
    }
    const colors = colorMap[color] || colorMap.blue

    return (
      <div className="glass-strong rounded-2xl shadow-sm border border-white/50 p-6 hover:shadow-lg smooth-transition group animate-fade-in-up relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-50 group-hover:opacity-70 smooth-transition`}></div>
        <div className="relative flex items-start justify-between z-10">
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">{value}</p>
            {subtitle && <p className="text-xs text-gray-500 font-medium">{subtitle}</p>}
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br ${colors.iconBg} text-white shadow-lg group-hover:scale-110 smooth-transition`}>
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
      </div>
    )
  }

  // Overview Tab
  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          subtitle={`${stats.activeUsers} active`}
          icon="👥"
          color="blue"
        />
        <StatCard
          title="Total Devices"
          value={stats.totalDevices}
          subtitle={`${stats.activeDevices} online`}
          icon="📱"
          color="green"
        />
        <StatCard
          title="Recent Signups"
          value={stats.recentSignups}
          subtitle="Last 7 days"
          icon="📈"
          color="purple"
        />
        <StatCard
          title="Total Activities"
          value={stats.totalActivities}
          subtitle="All time"
          icon="📋"
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="glass-strong rounded-2xl shadow-sm border border-white/50 p-6 animate-fade-in-up">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
          {userGrowth ? (
            <div className="h-64">
              <Line
                data={{
                  labels: userGrowth.labels || [],
                  datasets: [{
                    label: 'New Users',
                    data: userGrowth.data || [],
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>

        {/* Device Usage Chart */}
        <div className="glass-strong rounded-2xl shadow-sm border border-white/50 p-6 animate-fade-in-up">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Usage</h3>
          {deviceUsage ? (
            <div className="h-64">
              <Bar
                data={{
                  labels: deviceUsage.labels || [],
                  datasets: [{
                    label: 'Active Devices',
                    data: deviceUsage.data || [],
                    backgroundColor: 'rgba(34, 197, 94, 0.6)',
                    borderColor: 'rgb(34, 197, 94)',
                    borderWidth: 1
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="glass-strong rounded-2xl shadow-sm border border-white/50 p-6 animate-fade-in-up">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {activities.slice(0, 10).map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.description || activity.type}</p>
                  <p className="text-xs text-gray-500">{activity.userEmail} • {formatDate(activity.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-center text-gray-400 py-8">No recent activities</p>
          )}
        </div>
      </div>
    </div>
  )

  // Users Tab
  const UsersTab = () => (
    <div className="space-y-6">
      <div className="glass-strong rounded-2xl shadow-sm border border-white/50 p-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            <p className="text-gray-500 mt-1">Manage all registered users</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 smooth-transition">
            + Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">User</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Devices</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 smooth-transition">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{user.email}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{user.devicesCount || 0}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{formatDate(user.createdAt)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                        className={`px-3 py-1 rounded text-xs font-medium smooth-transition ${
                          user.isActive
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="px-3 py-1 rounded text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 smooth-transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  // Devices Tab
  const DevicesTab = () => (
    <div className="space-y-6">
      <div className="glass-strong rounded-2xl shadow-sm border border-white/50 p-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Device Management</h2>
            <p className="text-gray-500 mt-1">All devices across all users</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div key={device.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md smooth-transition">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{device.serial || device.nickname}</h3>
                <span className={`w-2 h-2 rounded-full ${device.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Model: {device.model || 'N/A'}</p>
                <p>Owner: {device.userEmail || 'Unknown'}</p>
                <p className="text-xs text-gray-500">Status: {device.isActive ? 'Online' : 'Offline'}</p>
              </div>
            </div>
          ))}
          {devices.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400">
              No devices found
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Activities Tab
  const ActivitiesTab = () => (
    <div className="space-y-6">
      <div className="glass-strong rounded-2xl shadow-sm border border-white/50 p-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Activity Logs</h2>
            <p className="text-gray-500 mt-1">System-wide activity tracking</p>
          </div>
        </div>

        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 smooth-transition">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'login' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'device_registered' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {activity.type === 'login' ? '🔐' : activity.type === 'device_registered' ? '📱' : '📋'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.description || activity.type}</p>
                  <p className="text-xs text-gray-500">{activity.userEmail} • {formatDate(activity.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No activities found
            </div>
          )}
        </div>
      </div>
    </div>
  )

  if (loading && activeTab === 'overview') {
    return (
      <div className="min-h-screen bg-gradient-body flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="glass border-b border-white/30 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 font-medium">Manage users, devices, and system activities</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-medium hover:shadow-lg smooth-transition text-sm"
              >
                User Dashboard
              </Link>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{user?.email || 'Admin'}</p>
                <p className="text-xs text-gray-500 font-medium">Administrator</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 hover:scale-105 smooth-transition">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <NavigationTabs />
        
        <div className="animate-fade-in-up">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'devices' && <DevicesTab />}
          {activeTab === 'activities' && <ActivitiesTab />}
        </div>
      </div>
    </div>
  )
}

