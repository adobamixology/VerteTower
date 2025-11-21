import { useEffect, useRef, useState } from 'react'
import { getDeviceTelemetry, getDeviceTelemetryByModel } from '../api/deviceApi'

// Helper function to transform API response to dashboard format
const transformTelemetryData = (apiData) => {
  if (!apiData || !apiData.telemetry || apiData.telemetry.length === 0) {
    return null
  }

  // Get the latest telemetry entry (most recent reading)
  const latestReading = apiData.telemetry[0]
  
  console.log('🔄 Transforming telemetry data:', latestReading)

  // Map the API field names to your dashboard's expected format
  return {
    t: latestReading.temperature_ambient,  // temperature
    h: latestReading.humidity,             // humidity
    l: latestReading.lux,                  // light intensity
    b: latestReading.battery,              // battery level
    p: latestReading.pressure,             // pressure
    u: latestReading.uv || 0,              // UV index (if available)
    // Additional fields you might want to use:
    ec: latestReading.ec,                  // electrical conductivity
    ph: latestReading.ph,                  // pH level
    temp_water: latestReading.temperature_water, // water temperature
    turbidity: latestReading.turbidity,    // water turbidity
    voltage: latestReading.voltage,        // voltage
    current: latestReading.current,        // current
    timestamp: latestReading.timestamp     // timestamp
  }
}

export default function useRealtimeTelemetry({ 
  userid, 
  auid, 
  model, 
  intervalMs = 5000, 
  maxBackoffMs = 30000
}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const timerRef = useRef(null)
  const backoffRef = useRef(intervalMs)
  const stoppedRef = useRef(false)

  useEffect(() => {
    console.log('🔄 useRealtimeTelemetry useEffect triggered', { userid, auid, model })
    
    stoppedRef.current = false
    backoffRef.current = intervalMs

    async function fetchOnce() {
      if (!userid || !auid) {
        console.log('❌ Missing required parameters:', { userid, auid })
        return
      }
      
      console.log('📡 Fetching telemetry data...')
      setLoading(true)
      setError(null)
      
      try {
        // Primary per API docs
        console.log(`🔍 Trying primary endpoint: /telemetry/${userid}/device/${auid}`)
        const resp = await getDeviceTelemetry(userid, auid)
        console.log('✅ Primary endpoint response:', resp)
        const payload = resp?.data
        console.log('📊 Primary payload:', payload)
        
        if (payload && payload.telemetry && payload.telemetry.length > 0) {
          const transformedData = transformTelemetryData(payload)
          console.log('🎯 Transformed data:', transformedData)
          
          if (transformedData) {
            setData(transformedData)
            setLastUpdated(Date.now())
            backoffRef.current = intervalMs
            return
          }
        }
        
        console.log('⚠️ Primary endpoint returned no telemetry data, trying fallback...')
        
        // Fallback to DB by model (if provided)
        if (model) {
          console.log(`🔍 Trying fallback endpoint: /telemetry/db/${model}/${auid}`)
          const dbResp = await getDeviceTelemetryByModel(model, auid)
          console.log('✅ Fallback endpoint response:', dbResp)
          const dbPayload = dbResp?.data
          console.log('📊 Fallback payload:', dbPayload)
          
          if (dbPayload && dbPayload.telemetry && dbPayload.telemetry.length > 0) {
            const transformedData = transformTelemetryData(dbPayload)
            console.log('🎯 Transformed fallback data:', transformedData)
            
            if (transformedData) {
              setData(transformedData)
              setLastUpdated(Date.now())
              backoffRef.current = intervalMs
              return
            }
          }
        }
        
        console.log('❌ Both endpoints returned no transformable data')
        setError(new Error('No telemetry data available'))
        
      } catch (e) {
        // Filter out WebSocket/Socket.IO errors if we're using polling
        // These errors can occur from cached code or browser extensions
        const isWebSocketError = e?.message?.includes('websocket') || 
                                 e?.message?.includes('WebSocket') ||
                                 e?.name === 'TransportError' ||
                                 e?.constructor?.name === 'TransportError'
        
        if (isWebSocketError) {
          console.warn('⚠️ WebSocket error detected (can be safely ignored when using polling):', e.message)
          // Don't set error state for WebSocket errors when using polling
          // Continue with polling instead
        } else {
          console.error('💥 Error fetching telemetry:', e)
          setError(e)
        }
        
        // Progressive backoff on errors
        backoffRef.current = Math.min(backoffRef.current * 2, maxBackoffMs)
        console.log(`⏰ Backoff increased to: ${backoffRef.current}ms`)
      } finally {
        setLoading(false)
      }
    }

    async function loop() {
      await fetchOnce()
      if (stoppedRef.current) {
        console.log('🛑 Loop stopped')
        return
      }
      console.log(`⏰ Next fetch in: ${backoffRef.current}ms`)
      timerRef.current = setTimeout(loop, backoffRef.current)
    }

    // Start loop
    console.log('🚀 Starting telemetry loop')
    loop()

    return () => {
      console.log('🧹 Cleaning up telemetry hook')
      stoppedRef.current = true
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [userid, auid, model, intervalMs, maxBackoffMs])

  // Filter out WebSocket errors from the returned error state
  const filteredError = error && (
    error?.message?.includes('websocket') || 
    error?.message?.includes('WebSocket') ||
    error?.name === 'TransportError' ||
    error?.constructor?.name === 'TransportError'
  ) ? null : error

  console.log('🔄 useRealtimeTelemetry render state:', { data, loading, error: filteredError, lastUpdated })
  
  return { data, loading, error: filteredError, lastUpdated }
}