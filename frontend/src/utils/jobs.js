export function normalizeText(value = '') {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
}

export function matchesJob(job, query) {
  const searchableText = [job.titulo, job.empresa, job.ubicacion, job.descripcion, job.data?.nivel, ...(job.data?.technology ?? [])].join(' ')
  return normalizeText(searchableText).includes(normalizeText(query.trim()))
}

export function getJobInitials(company = '') {
  return company.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()
}

export function formatLevel(level = '') {
  return ({ junior: 'Junior', 'mid-level': 'Intermedio', senior: 'Senior' })[level.toLowerCase()] || level
}

export function toList(value = '') {
  return value.split('\n').map((item) => item.replace(/^[-•]\s*/, '').trim()).filter(Boolean)
}
