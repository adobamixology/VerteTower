import React, { createContext, useState, useEffect } from 'react'
import { login as apiLogin } from '../api/authApi'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const userData = JSON.parse(stored)
      // Development helper: Check for admin override
      const adminOverride = localStorage.getItem('adminOverride')
      if (adminOverride === 'true') {
        userData.isAdmin = true
        userData.role = 'admin'
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        setUser(userData)
      }
    }
  }, [])

  const login = async (email, password) => {
    const resp = await apiLogin({ email, password })
    const data = resp.data
    localStorage.setItem('accessToken', data.accessToken)
    if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken)
    const u = { 
      email: data.email || email, 
      userid: data.userid || data.userId || data.id,
      role: data.role || 'user',
      isAdmin: data.role === 'admin' || data.isAdmin || false
    }
    localStorage.setItem('user', JSON.stringify(u))
    setUser(u)
    return u
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
