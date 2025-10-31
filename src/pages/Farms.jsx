import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { listUserFarms, createFarm, deleteFarm } from '../api/deploymentsApi'
import { useAuth } from '../auth/useAuth'

export default function Farms() {
  const { user } = useAuth()
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)

  const userid = user?.userid

  const load = async () => {
    if (!userid) return
    try {
      setLoading(true)
      setError('')
      const resp = await listUserFarms(userid)
      const data = resp?.data || []
      setFarms(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e?.message || 'Failed to load farms')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [userid])

  const onCreate = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    try {
      setCreating(true)
      await createFarm({ name: name.trim() })
      toast.success('Farm created')
      setName('')
      await load()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to create farm')
    } finally {
      setCreating(false)
    }
  }

  const onDelete = async (deploymentId) => {
    if (!window.confirm('Delete this farm? This cannot be undone.')) return
    try {
      await deleteFarm(deploymentId)
      toast.success('Farm deleted')
      await load()
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to delete farm')
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading farms...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Farms</h1>
          <p className="text-gray-600">Group devices and view readings per farm</p>
        </div>
      </div>

      <form onSubmit={onCreate} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex space-x-2">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="New farm name"
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button disabled={creating} className="bg-green-600 disabled:opacity-50 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
            {creating ? 'Creating…' : 'Add Farm'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 mb-4 text-sm">{error}</div>
      )}

      {farms.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No farms found</h3>
          <p className="text-gray-500">Create your first farm to organize devices.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farms.map(farm => (
            <div key={farm.deploymentId || farm.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{farm.name || `Farm ${farm.deploymentId || farm.id}`}</h3>
                <button onClick={() => onDelete(farm.deploymentId || farm.id)} className="text-red-600 text-sm hover:underline">Delete</button>
              </div>
              {farm.description && <p className="text-sm text-gray-600 mb-3">{farm.description}</p>}
              <div className="flex space-x-2">
                <Link to={`/farms/${farm.deploymentId || farm.id}`} className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700 text-center">Open</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


