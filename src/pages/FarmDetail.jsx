import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getFarmById, listFarmDevices, addDeviceToFarm } from '../api/deploymentsApi'
import { useAuth } from '../auth/useAuth'
import useRealtimeTelemetry from '../hooks/useRealtimeTelemetry'

export default function FarmDetail() {
  const { deploymentId } = useParams()
  const { user } = useAuth()
  const [farm, setFarm] = useState(null)
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [newAuid, setNewAuid] = useState('')
  const [adding, setAdding] = useState(false)

  const userid = user?.userid

  const load = async () => {
    try {
      setLoading(true)
      setError('')
      const [f, d] = await Promise.all([
        getFarmById(deploymentId),
        listFarmDevices(deploymentId),
      ])
      setFarm(f?.data || null)
      const list = Array.isArray(d?.data) ? d.data : []
      setDevices(list)
      if (!selected && list.length > 0) setSelected(list[0])
    } catch (e) {
      setError(e?.message || 'Failed to load farm')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (deploymentId) load() }, [deploymentId])

  const model = useMemo(() => (selected?.model || selected?.deviceModel || selected?.type), [selected])
  const auid = useMemo(() => (selected?.auid || selected?.deviceId || selected?.id), [selected])
  const realtime = useRealtimeTelemetry({ userid, auid, model, intervalMs: 5000 })

  const onAddDevice = async (e) => {
    e.preventDefault()
    if (!newAuid.trim()) return
    try {
      setAdding(true)
      await addDeviceToFarm(deploymentId, { auid: newAuid.trim() })
      setNewAuid('')
      await load()
    } catch (e) {
      console.error(e)
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading farm…</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4">{error}</div>
      </div>
    )
  }

  if (!farm) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-gray-600">Farm not found.</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{farm.name || 'Farm'}</h1>
          {farm.description && <p className="text-gray-600">{farm.description}</p>}
        </div>
        <Link to="/farms" className="text-sm text-gray-600 hover:underline">Back to Farms</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Devices</h2>
            {devices.length === 0 ? (
              <div className="text-sm text-gray-600">No devices in this farm yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {devices.map(d => (
                  <button
                    key={d.auid}
                    onClick={() => setSelected(d)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${selected?.auid === d.auid ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-gray-900 truncate">{d.nickname || d.serial || d.auid}</div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${d.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {d.isActive ? 'Online' : 'Offline'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">AUID: {d.auid}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onAddDevice} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Add Device to Farm</h3>
            <div className="flex space-x-2">
              <input
                value={newAuid}
                onChange={e => setNewAuid(e.target.value)}
                placeholder="Device AUID"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <button disabled={adding} className="bg-green-600 disabled:opacity-50 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
                {adding ? 'Adding…' : 'Add Device'}
              </button>
            </div>
          </form>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Live Readings</h2>
              <span className="text-xs text-gray-500">{realtime.lastUpdated ? new Date(realtime.lastUpdated).toLocaleTimeString() : '—'}</span>
            </div>
            {!selected ? (
              <div className="text-sm text-gray-600">Select a device to view readings.</div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-gray-700">{selected.nickname || selected.serial || selected.auid}</div>
                {!realtime.data ? (
                  <div className="text-sm text-gray-500">No sensor data yet.</div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {realtime.data.t !== undefined && (
                      <Metric title="Temperature" value={realtime.data.t} unit="°C" />
                    )}
                    {realtime.data.h !== undefined && (
                      <Metric title="Humidity" value={realtime.data.h} unit="%" />
                    )}
                    {realtime.data.l !== undefined && (
                      <Metric title="Light" value={realtime.data.l} unit="lux" />
                    )}
                    {realtime.data.b !== undefined && (
                      <Metric title="Battery" value={realtime.data.b} unit="%" />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({ title, value, unit }) {
  return (
    <div className="border border-gray-200 rounded p-3">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-lg font-semibold text-gray-900">{value}{unit ? ` ${unit}` : ''}</div>
    </div>
  )
}


