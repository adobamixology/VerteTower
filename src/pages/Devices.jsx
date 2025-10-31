// import React, { useEffect, useState } from 'react'
// import { getUserDevices } from '../api/deviceApi'
// import { Link } from 'react-router-dom'
// import { toast } from 'react-toastify'

// export default function DevicesList() {
//   const userid = localStorage.getItem('userid')
//   const [devices, setDevices] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     if (!userid) {
//       setError('User ID not found. Please log in again.')
//       setLoading(false)
//       return
//     }

//     const fetchDevices = async () => {
//       try {
//         setLoading(true)
//         const response = await getUserDevices(userid)
//         console.log('API Response:', response) // Debug log
//         setDevices(response.data || [])
//         toast.success('Devices loaded successfully')
//       } catch (err) {
//         console.error('Error fetching devices:', err)
//         setError('Failed to load devices. Please try again.')
//         toast.error('Failed to load devices')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDevices()
//   }, [userid])

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-semibold">Devices</h2>
//           <Link to="/devices/register" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition duration-300">
//             Register Device
//           </Link>
//         </div>
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
//           <span className="ml-3 text-gray-600">Loading devices...</span>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="max-w-6xl mx-auto p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-semibold">Devices</h2>
//           <Link to="/devices/register" className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition duration-300">
//             Register Device
//           </Link>
//         </div>
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//           <div className="text-red-600 mb-4">{error}</div>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-900">My Devices</h2>
//           <p className="text-gray-600 mt-1">Manage your registered devices and view sensor data</p>
//         </div>
//         <Link to="/devices/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 font-medium">
//           + Register Device
//         </Link>
//       </div>

//       {devices.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//           <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
//           </svg>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
//           <p className="text-gray-500 mb-4">You haven't registered any devices yet.</p>
//           <Link to="/devices/register" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
//             Register Your First Device
//           </Link>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {devices.map(device => (
//             <DeviceCard key={device.auid} device={device} />
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// // Device Card Component
// function DeviceCard({ device }) {
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-4">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 truncate">
//               {device.nickname || device.serial || 'Unnamed Device'}
//             </h3>
//             <p className="text-sm text-gray-500 mt-1">AUID: {device.auid}</p>
//           </div>
//           <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//             device.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//           }`}>
//             {device.isActive ? 'Online' : 'Offline'}
//           </span>
//         </div>

//         {/* Device Details */}
//         <div className="space-y-2 mb-4">
//           {device.serial && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Serial:</span>
//               <span className="font-medium">{device.serial}</span>
//             </div>
//           )}
          
//           {device.location && Array.isArray(device.location) && device.location.length === 2 && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Location:</span>
//               <span className="font-medium">
//                 {device.location[0]?.toFixed(4)}, {device.location[1]?.toFixed(4)}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex space-x-2">
//           <Link 
//             to={`/devices/${device.auid}`}
//             className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700 transition duration-300 text-center"
//           >
//             View Details
//           </Link>
//           <Link 
//             to={`/devices/${device.auid}/readings`}
//             className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition duration-300 text-center"
//           >
//             Sensor Data
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { findRegisteredDevice } from '../api/deviceApi'

export default function DeviceDetails() {
  const { deviceId } = useParams()
  const [device, setDevice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError('')
        const resp = await findRegisteredDevice(deviceId)
        setDevice(resp?.data || null)
      } catch (e) {
        const status = e?.response?.status
        if (status === 404) setError('Device not found')
        else if (status === 401) setError('Unauthorized. Please log in again.')
        else setError(e?.message || 'Failed to load device')
      } finally {
        setLoading(false)
      }
    }
    if (deviceId) load()
  }, [deviceId])

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading device…</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <Link to="/devices" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">Back to devices</Link>
        </div>
      </div>
    )
  }

  if (!device) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center text-gray-600">No device data</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 truncate">{device.nickname || device.serial || 'Device'}</h1>
              <p className="text-sm text-gray-500 mt-1">AUID: {device.auid}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${device.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {device.isActive ? 'Online' : 'Offline'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {device.serial && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Serial</span>
                <span className="font-medium">{device.serial}</span>
              </div>
            )}
            {device.model && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Model</span>
                <span className="font-medium">{device.model}</span>
              </div>
            )}
            {Array.isArray(device.location) && device.location.length === 2 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location</span>
                <span className="font-medium">{device.location[0]?.toFixed(4)}, {device.location[1]?.toFixed(4)}</span>
              </div>
            )}
            {device.owner?.userid && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Owner</span>
                <span className="font-medium">{device.owner.userid}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Link to={`/devices/${device.auid}/readings`} className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition duration-300 text-center">Sensor Data</Link>
            <Link to="/devices" className="flex-1 bg-gray-100 text-gray-800 py-2 px-3 rounded text-sm font-medium hover:bg-gray-200 transition duration-300 text-center">Back to Devices</Link>
          </div>
        </div>
      </div>
    </div>
  )
}