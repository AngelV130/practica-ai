import { useEffect, useState } from 'react'
import { getJobById } from '../api/jobsApi.js'

export function useJob(jobId) {
  const [state, setState] = useState({ job: null, isLoading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    async function loadJob() {
      try {
        const job = await getJobById(jobId, { signal: controller.signal })
        setState({ job, isLoading: false, error: null })
      } catch (error) {
        if (error.cause?.code !== 'ERR_CANCELED') setState({ job: null, isLoading: false, error })
      }
    }
    loadJob()
    return () => controller.abort()
  }, [jobId])

  return state
}
