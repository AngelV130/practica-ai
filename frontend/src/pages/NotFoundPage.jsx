import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page-shell py-24 text-center">
      <p className="text-sm font-black tracking-[0.2em] text-brand uppercase">Error 404</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.05em]">Esta página no existe</h1>
      <p className="mt-3 text-muted">Pero tu próxima oportunidad puede estar a un clic.</p>
      <Link to="/" className="mt-7 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-dark">Explorar vacantes</Link>
    </div>
  )
}
