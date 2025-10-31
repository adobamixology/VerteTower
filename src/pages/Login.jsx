import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as apiLogin } from '../api/authApi'
import { useAuth } from '../auth/useAuth'
import { toast } from 'react-toastify'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const user = await login(email, password)
      toast.success('Logged in')
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow mb-8">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full p-2 border rounded" />
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <div className="mt-4 text-sm">Don't have an account? <a href="/register" className="text-primary">Sign up</a></div>
    </div>
  )
}
