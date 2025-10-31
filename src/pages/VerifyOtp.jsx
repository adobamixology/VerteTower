import React, { useState } from 'react'
import { verifyOtpSignup, resendOtp } from '../api/authApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function VerifyOtp(){
  const loc = useLocation()
  const nav = useNavigate()
  const [email, setEmail] = useState(loc.state?.email || '')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  const handleVerify = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      await verifyOtpSignup({ email, otp: Number(otp) })
      toast.success('Verified. You can now login.')
      nav('/login')
    } catch (err) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Verification failed')
    } finally { setLoading(false) }
  }

  const handleResend = async () => {
    try {
      await resendOtp({ contact: email })
      toast.success('OTP resent')
    } catch (err) {
      toast.error('Failed to resend OTP')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Verify your account</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        <input placeholder="OTP" value={otp} onChange={e=>setOtp(e.target.value)} className="w-full p-2 border rounded" required />
        <button className="bg-primary text-white px-4 py-2 rounded w-full" disabled={loading}>{loading ? 'Verifying...' : 'Verify'}</button>
      </form>
      <div className="mt-4 text-sm">Didn't get a code? <button onClick={handleResend} className="text-primary">Resend</button></div>
    </div>
  )
}
