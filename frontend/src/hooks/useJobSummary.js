import { useCallback, useEffect, useRef, useState } from 'react'
import { streamJobSummary } from '../api/aiApi.js'

export function useJobSummary(jobId) {
  const [summary, setSummary] = useState('')
  const [error, setError] = useState(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const controllerRef = useRef(null)

  useEffect(() => {
    const controller = controllerRef
    return () => controller.current?.abort()
  }, [])

  const generateSummary = useCallback(async () => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setSummary('')
    setError(null)
    setIsStreaming(true)

    try {
      await streamJobSummary(jobId, {
        signal: controller.signal,
        onChunk: (chunk) => setSummary((currentSummary) => currentSummary + chunk),
      })
    } catch (streamError) {
      if (streamError.name !== 'AbortError') setError(streamError)
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null
        setIsStreaming(false)
      }
    }
  }, [jobId])

  const stopSummary = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
    setIsStreaming(false)
  }, [])

  return { summary, error, isStreaming, generateSummary, stopSummary }
}
