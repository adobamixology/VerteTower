import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './auth/AuthContext'
import 'react-toastify/dist/ReactToastify.css'

// Global error handler to suppress WebSocket/Socket.IO errors
// These errors can occur from cached code, browser extensions, or dependencies
// Since we're using polling (not WebSockets), these errors can be safely ignored
if (typeof window !== 'undefined') {
  const originalError = console.error
  console.error = (...args) => {
    const errorMessage = args.join(' ')
    // Filter out WebSocket connection errors
    if (
      errorMessage.includes('WebSocket connection') ||
      errorMessage.includes('websocket error') ||
      errorMessage.includes('TransportError') ||
      errorMessage.includes('socket.io')
    ) {
      // Silently ignore or log at a lower level
      console.debug('🔇 Suppressed WebSocket error (using polling instead):', ...args)
      return
    }
    originalError.apply(console, args)
  }

  // Also handle unhandled promise rejections related to WebSockets
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason
    if (
      error?.message?.includes('websocket') ||
      error?.message?.includes('WebSocket') ||
      error?.name === 'TransportError' ||
      error?.constructor?.name === 'TransportError'
    ) {
      console.debug('🔇 Suppressed WebSocket promise rejection (using polling instead):', error)
      event.preventDefault() // Prevent the error from being logged
    }
  })
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
