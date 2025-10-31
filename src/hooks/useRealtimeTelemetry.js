import { useEffect, useRef, useState } from 'react'
import { getDeviceTelemetry, getDeviceTelemetryByModel } from '../api/deviceApi'

export default function useRealtimeTelemetry({ userid, auid, model, intervalMs = 5000, maxBackoffMs = 30000 }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const timerRef = useRef(null)
  const backoffRef = useRef(intervalMs)
  const stoppedRef = useRef(false)

  useEffect(() => {
    stoppedRef.current = false
    backoffRef.current = intervalMs

    async function fetchOnce() {
      if (!userid || !auid) return
      setLoading(true)
      setError(null)
      try {
        // Primary per API docs
        const resp = await getDeviceTelemetry(userid, auid)
        const payload = resp?.data
        if (payload && Object.keys(payload).length > 0) {
          setData(payload)
          setLastUpdated(Date.now())
          backoffRef.current = intervalMs
          return
        }
        // Fallback to DB by model (if provided)
        if (model) {
          const dbResp = await getDeviceTelemetryByModel(model, auid)
          const dbPayload = dbResp?.data
          if (dbPayload && Object.keys(dbPayload).length > 0) {
            setData(dbPayload)
            setLastUpdated(Date.now())
            backoffRef.current = intervalMs
            return
          }
        }
      } catch (e) {
        setError(e)
        // Progressive backoff on errors
        backoffRef.current = Math.min(backoffRef.current * 2, maxBackoffMs)
      } finally {
        setLoading(false)
      }
    }

    async function loop() {
      await fetchOnce()
      if (stoppedRef.current) return
      timerRef.current = setTimeout(loop, backoffRef.current)
    }

    // Start loop
    loop()

    return () => {
      stoppedRef.current = true
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [userid, auid, model, intervalMs, maxBackoffMs])

  return { data, loading, error, lastUpdated }
}


