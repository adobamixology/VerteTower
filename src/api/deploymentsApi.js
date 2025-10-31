import client from './axiosClient'

export const listUserFarms = (userid) => {
  return client.get(`/devices/users/${encodeURIComponent(userid)}/deployments`)
}

export const createFarm = (payload) => {
  // Expected payload: { name, description? }
  return client.post('/devices/create-deployments', payload)
}

export const getFarmById = (deploymentId) => {
  return client.get(`/devices/deployments/${encodeURIComponent(deploymentId)}`)
}

export const deleteFarm = (deploymentId) => {
  return client.delete(`/devices/deployments/${encodeURIComponent(deploymentId)}`)
}

export const listFarmDevices = (deploymentId) => {
  return client.get(`/devices/deployments/${encodeURIComponent(deploymentId)}/devices`)
}

export const addDeviceToFarm = (deploymentId, payload) => {
  // Expected payload: { auid } (and possibly metadata)
  return client.post(`/devices/deployments/${encodeURIComponent(deploymentId)}/devices`, payload)
}

export const removeDeviceFromFarm = (deploymentId, auid) => {
  return client.delete(`/devices/deployments/${encodeURIComponent(deploymentId)}/devices/${encodeURIComponent(auid)}`)
}

