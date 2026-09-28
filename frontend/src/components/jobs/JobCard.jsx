import { ArrowUpRight, Building2, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatLevel, getJobInitials } from '../../utils/jobs.js'

export function JobCard({ job }) {
  return (
    <article className="group relative rounded-3xl border border-line bg-surface p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card sm:p-6">
      <Link to={`/jobs/${job.id}`} className="absolute inset-0 rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand" aria-label={`Ver vacante: ${job.titulo} en ${job.empresa}`} />
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft text-sm font-extrabold tracking-tight text-brand">{getJobInitials(job.empresa)}</div>
        <span className="grid size-9 place-items-center rounded-full border border-line text-muted transition group-hover:border-brand group-hover:bg-brand group-hover:text-white"><ArrowUpRight size={17} aria-hidden="true" /></span>
      </div>
      <div className="mt-6">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-muted"><Building2 size={15} aria-hidden="true" />{job.empresa}</p>
        <h2 className="mt-2 text-xl leading-tight font-extrabold tracking-[-0.035em] text-ink">{job.titulo}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">{job.descripcion}</p>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-canvas px-3 py-1.5 text-xs font-semibold text-muted"><MapPin size={13} aria-hidden="true" />{job.ubicacion}</span>
        <span className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand">{formatLevel(job.data?.nivel)}</span>
      </div>
    </article>
  )
}
