import React, { useState } from 'react'
import { signup as apiSignup } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register(){
  const [form, setForm] = useState({contact:'', email:'', password:'', username:'', firstName:'', lastName:'', invitationId:''})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      await apiSignup(form)
      toast.success('Signup success. Check your email for OTP.')
      navigate('/verify-otp', { state: { email: form.email } })
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Signup failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" type="email" required />
        <input name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" type="password" required />
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full p-2 border rounded" required />
        <div className="grid md:grid-cols-2 gap-2">
          <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <input name="invitationId" placeholder="Invitation ID (optional)" value={form.invitationId} onChange={handleChange} className="w-full p-2 border rounded" />
        <button className="bg-primary text-white px-4 py-2 rounded w-full" disabled={loading}>{loading ? 'Submitting...' : 'Sign Up'}</button>
      </form>
    </div>
  )
}
