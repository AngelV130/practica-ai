import { Sparkles } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { JobCard } from '../components/jobs/JobCard.jsx'
import { JobCardSkeleton } from '../components/jobs/JobCardSkeleton.jsx'
import { SearchBar } from '../components/jobs/SearchBar.jsx'
import { StatusPanel } from '../components/ui/StatusPanel.jsx'
import { useJobs } from '../hooks/useJobs.js'
import { matchesJob } from '../utils/jobs.js'

export function JobsPage() {
  const { jobs, isLoading, error } = useJobs()
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const filteredJobs = useMemo(() => jobs.filter((job) => matchesJob(job, deferredQuery)), [jobs, deferredQuery])

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-surface">
        <div className="pointer-events-none absolute -top-28 right-[-8%] size-80 rounded-full bg-accent/35 blur-3xl" />
        <div className="page-shell relative py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-bold tracking-wide text-brand uppercase"><Sparkles size={14} aria-hidden="true" />Tu siguiente oportunidad</p>
            <h1 className="text-balance mt-5 text-4xl leading-[1.05] font-black tracking-[-0.055em] text-ink sm:text-6xl">Trabajo que encaja contigo, no al revés.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">Explora oportunidades seleccionadas y encuentra el equipo donde podrás crecer.</p>
          </div>
          <div className="mt-9 max-w-2xl"><SearchBar value={query} onChange={setQuery} /></div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-14" aria-labelledby="jobs-heading">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-brand uppercase">Vacantes disponibles</p>
            <h2 id="jobs-heading" className="mt-1 text-2xl font-black tracking-[-0.04em] sm:text-3xl">Encuentra tu lugar</h2>
          </div>
          {!isLoading && !error && <p className="shrink-0 text-sm font-semibold text-muted" aria-live="polite">{filteredJobs.length} {filteredJobs.length === 1 ? 'resultado' : 'resultados'}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && Array.from({ length: 6 }, (_, index) => <JobCardSkeleton key={index} />)}
          {error && (
            <StatusPanel
              type="error"
              title="No pudimos cargar las vacantes"
              message={error.message}
              action={<button type="button" onClick={() => window.location.reload()} className="mt-5 cursor-pointer rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark">Intentar de nuevo</button>}
            />
          )}
          {!isLoading && !error && filteredJobs.length === 0 && (
            <StatusPanel
              title="No encontramos coincidencias"
              message="Prueba con otro puesto, tecnología, empresa o ubicación."
              action={<button type="button" onClick={() => setQuery('')} className="mt-5 cursor-pointer text-sm font-bold text-brand underline decoration-brand/30 underline-offset-4">Limpiar búsqueda</button>}
            />
          )}
          {!isLoading && !error && filteredJobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      </section>
    </>
  )
}
