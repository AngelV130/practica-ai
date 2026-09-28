import { useEffect, useState } from 'react'
import { getJobs } from '../api/jobsApi.js'

export function useJobs() {
  const [state, setState] = useState({ jobs: [], isLoading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()
    async function loadJobs() {
      try {
        const jobs = await getJobs({ signal: controller.signal })
        setState({ jobs, isLoading: false, error: null })
      } catch (error) {
        if (error.cause?.code !== 'ERR_CANCELED') setState({ jobs: [], isLoading: false, error })
      }
    }
    loadJobs()
    return () => controller.abort()
  }, [])

  return state
}
