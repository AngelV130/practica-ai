function getApiUrl(path) {
  const baseUrl = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '')
  return `${baseUrl}${path}`
}

async function getErrorMessage(response) {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    const payload = await response.json()
    return payload.error?.message || payload.message
  }

  return response.text()
}

export async function streamJobSummary(jobId, { signal, onChunk }) {
  const response = await fetch(getApiUrl(`/ai/summary/${encodeURIComponent(jobId)}`), {
    method: 'GET',
    headers: { Accept: 'text/plain' },
    signal,
  })

  if (!response.ok) {
    const message = await getErrorMessage(response)
    const error = new Error(message || 'No fue posible generar el resumen.')
    error.status = response.status
    throw error
  }

  if (!response.body) {
    throw new Error('El navegador no pudo abrir el stream del resumen.')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      if (chunk) onChunk(chunk)
    }

    const finalChunk = decoder.decode()
    if (finalChunk) onChunk(finalChunk)
  } finally {
    reader.releaseLock()
  }
}
