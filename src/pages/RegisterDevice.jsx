import React, { useState } from 'react'
import { registerDevice } from '../api/deviceApi'

export default function RegisterDevice(){
  const [auid, setAuid] = useState('')
  const [serial, setSerial] = useState('')
  const [nickname, setNickname] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const userid = localStorage.getItem('userid') || ''

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await registerDevice({ auid, serial, nickname, userid, location: [parseFloat(lat), parseFloat(lng)] })
      alert('Registered')
    } catch (err) {
      alert('Failed')
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">Register Device</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={auid} onChange={e=>setAuid(e.target.value)} placeholder="AUID" className="w-full p-2 border rounded" required />
        <input value={serial} onChange={e=>setSerial(e.target.value)} placeholder="Serial" className="w-full p-2 border rounded" required />
        <input value={nickname} onChange={e=>setNickname(e.target.value)} placeholder="Nickname" className="w-full p-2 border rounded" required />
        <div className="grid grid-cols-2 gap-2">
          <input value={lat} onChange={e=>setLat(e.target.value)} placeholder="Latitude" className="w-full p-2 border rounded" required />
          <input value={lng} onChange={e=>setLng(e.target.value)} placeholder="Longitude" className="w-full p-2 border rounded" required />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  )
}
