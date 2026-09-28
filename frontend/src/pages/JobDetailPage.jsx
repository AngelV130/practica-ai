import { ArrowLeft, Briefcase, Building2, MapPin } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StatusPanel } from '../components/ui/StatusPanel.jsx'
import { useJob } from '../hooks/useJob.js'
import { formatLevel, getJobInitials, toList } from '../utils/jobs.js'

const AiSummary = lazy(() =>
  import('../components/jobs/AiSummary.jsx').then((module) => ({ default: module.AiSummary })),
)

function DetailSkeleton() {
  return (
    <div className="animate-pulse py-12" aria-label="Cargando vacante">
      <div className="h-5 w-36 rounded-full bg-line" /><div className="mt-12 h-10 w-4/5 rounded-full bg-line" /><div className="mt-4 h-5 w-2/5 rounded-full bg-line" /><div className="mt-12 h-64 rounded-3xl bg-white" />
    </div>
  )
}

function ContentSection({ title, children }) {
  return <section className="border-b border-line py-7 last:border-0 last:pb-0"><h2 className="text-xl font-black tracking-[-0.03em]">{title}</h2><div className="mt-4">{children}</div></section>
}

export function JobDetailPage() {
  const { jobId } = useParams()
  const { job, isLoading, error } = useJob(jobId)

  if (isLoading) return <div className="page-shell"><DetailSkeleton /></div>
  if (error) {
    return (
      <div className="page-shell py-16">
        <StatusPanel
          type="error"
          title={error.status === 404 ? 'Esta vacante ya no está disponible' : 'No pudimos abrir la vacante'}
          message={error.message}
          action={<Link to="/" className="mt-5 inline-flex rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white">Ver todas las vacantes</Link>}
        />
      </div>
    )
  }

  return (
    <div className="page-shell py-8 sm:py-12">
      <Link to="/" className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-muted transition hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"><ArrowLeft size={17} aria-hidden="true" />Volver a vacantes</Link>
      <header className="mt-8 rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand-soft text-lg font-black text-brand">{getJobInitials(job.empresa)}</div>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-sm font-bold text-brand"><Building2 size={16} aria-hidden="true" />{job.empresa}</p>
            <h1 className="text-balance mt-2 text-3xl leading-tight font-black tracking-[-0.05em] sm:text-5xl">{job.titulo}</h1>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas px-3 py-2 text-xs font-semibold text-muted"><MapPin size={14} aria-hidden="true" />{job.ubicacion}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas px-3 py-2 text-xs font-semibold text-muted"><Briefcase size={14} aria-hidden="true" />{formatLevel(job.data?.nivel)}</span>
            </div>
          </div>
        </div>
      </header>

      <Suspense fallback={<div className="mt-6 h-40 animate-pulse rounded-3xl bg-brand-soft" aria-hidden="true" />}>
        <AiSummary key={job.id} jobId={job.id} />
      </Suspense>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="rounded-3xl border border-line bg-surface p-6 sm:p-9">
          <ContentSection title="Sobre la posición"><p className="leading-7 text-muted">{job.content?.description || job.descripcion}</p></ContentSection>
          <ContentSection title="Lo que harás"><ul className="content-list">{toList(job.content?.responsibilities).map((item) => <li key={item}>{item}</li>)}</ul></ContentSection>
          <ContentSection title="Lo que buscamos"><ul className="content-list">{toList(job.content?.requirements).map((item) => <li key={item}>{item}</li>)}</ul></ContentSection>
          <ContentSection title={`Acerca de ${job.empresa}`}><p className="leading-7 text-muted">{job.content?.about}</p></ContentSection>
        </article>

        <aside className="rounded-3xl bg-ink p-6 text-white lg:sticky lg:top-6">
          <p className="text-xs font-bold tracking-[0.15em] text-accent uppercase">Perfil de la vacante</p>
          <div className="mt-5 border-b border-white/15 pb-5"><p className="text-xs text-white/55">Modalidad / ubicación</p><p className="mt-1 font-bold">{job.ubicacion}</p></div>
          <div className="border-b border-white/15 py-5"><p className="text-xs text-white/55">Nivel</p><p className="mt-1 font-bold">{formatLevel(job.data?.nivel)}</p></div>
          <div className="pt-5"><p className="text-xs text-white/55">Tecnologías y habilidades</p><div className="mt-3 flex flex-wrap gap-2">{job.data?.technology?.map((technology) => <span key={technology} className="rounded-full bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white/85">{technology}</span>)}</div></div>
        </aside>
      </div>
    </div>
  )
}
