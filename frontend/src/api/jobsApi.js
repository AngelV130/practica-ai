import { httpClient } from './httpClient.js'

export async function getJobs({ signal } = {}) {
  const response = await httpClient.get('/jobs', { signal })
  return response.data.data
}

export async function getJobById(jobId, { signal } = {}) {
  const response = await httpClient.get(`/jobs/${jobId}`, { signal })
  return response.data.data
}
