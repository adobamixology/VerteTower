import client from './axiosClient'

// User Management
export const getAllUsers = () => client.get('/admin/users')
export const getUserById = (userId) => client.get(`/admin/users/${userId}`)
export const updateUser = (userId, payload) => client.put(`/admin/users/${userId}`, payload)
export const deleteUser = (userId) => client.delete(`/admin/users/${userId}`)
export const createUser = (payload) => client.post('/admin/users', payload)
export const toggleUserStatus = (userId, isActive) => client.patch(`/admin/users/${userId}/status`, { isActive })

// Device Management
export const getAllDevices = (params = {}) => client.get('/admin/devices', { params })
export const getDeviceById = (deviceId) => client.get(`/admin/devices/${deviceId}`)
export const updateDevice = (deviceId, payload) => client.put(`/admin/devices/${deviceId}`, payload)
export const deleteDevice = (deviceId) => client.delete(`/admin/devices/${deviceId}`)

// Activity Logs
export const getActivityLogs = (params = {}) => client.get('/admin/activities', { params })
export const getActivityStats = () => client.get('/admin/activities/stats')

// Dashboard Statistics
export const getAdminStats = () => client.get('/admin/stats')
export const getRecentActivities = (limit = 10) => client.get(`/admin/activities/recent?limit=${limit}`)

// Analytics
export const getUserGrowth = (period = '30d') => client.get(`/admin/analytics/user-growth?period=${period}`)
export const getDeviceUsage = (period = '30d') => client.get(`/admin/analytics/device-usage?period=${period}`)
export const getSystemHealth = () => client.get('/admin/analytics/system-health')

