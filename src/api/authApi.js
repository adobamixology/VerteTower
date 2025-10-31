import client from './axiosClient'

export const signup = (payload) => client.post('/auth/signup', payload)
export const login = (payload) => client.post('/auth/login', payload)
export const refreshToken = (payload) => client.post('/auth/refresh-token', payload)
export const verifyOtpSignup = (payload) => client.post('/auth/verify-otp-signup', payload)
export const resendOtp = (payload) => client.post('/auth/resend-otp', payload)
export const forgotPassword = (payload) => client.post('/auth/forgot-password', payload)
export const verifyOtpReset = (payload) => client.post('/auth/verify-otp-reset-password', payload)
