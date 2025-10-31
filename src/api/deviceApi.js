// import client from './axiosClient'
// export const registerDevice = (payload) => client.post('/devices/register-device', payload)
// export const getUserDevices = (userid) => client.get(`/devices/user/${encodeURIComponent(userid)}/registered-devices`)
// export const findRegisteredDevice = (auid) => client.get(`/devices/find-registered-device/${encodeURIComponent(auid)}`)



import client from './axiosClient'

// Get all registered and shared devices of a user
export const getUserDevices = (userid) => {
  return client.get(`/devices/user/${encodeURIComponent(userid)}/registered-devices`)
}

// Get telemetry data for a specific device
export const getDeviceTelemetry = (userid, auid) => {
  return client.get(`/telemetry/${encodeURIComponent(userid)}/device/${encodeURIComponent(auid)}`)
}

// Fallback: Get telemetry by model/auid from DB route
export const getDeviceTelemetryByModel = (model, auid) => {
  return client.get(`/telemetry/db/${encodeURIComponent(model)}/${encodeURIComponent(auid)}`)
}

// Find a registered device by AUID
export const findRegisteredDevice = (auid) => {
  return client.get(`/devices/find-registered-device/${encodeURIComponent(auid)}`)
}

// Register a new device
export const registerDevice = (payload) => {
  return client.post('/devices/register-device', payload)
}