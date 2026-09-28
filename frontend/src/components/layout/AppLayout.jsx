import { BriefcaseBusiness } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-line/80 bg-surface/90 backdrop-blur-md">
        <div className="page-shell flex h-18 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" aria-label="Talento, volver al inicio">
            <span className="grid size-9 place-items-center rounded-xl bg-brand text-white shadow-sm">
              <BriefcaseBusiness size={18} strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="text-lg font-extrabold tracking-[-0.03em]">talento</span>
          </Link>
          <span className="rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-semibold text-muted">Oportunidades abiertas</span>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="mt-18 border-t border-line py-8">
        <div className="page-shell flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Encuentra un lugar donde hacer tu mejor trabajo.</p>
          <p>Talento · Vacantes seleccionadas</p>
        </div>
      </footer>
    </div>
  )
}
