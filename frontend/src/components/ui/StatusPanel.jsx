import { AlertCircle, SearchX } from 'lucide-react'

export function StatusPanel({ type = 'empty', title, message, action }) {
  const Icon = type === 'error' ? AlertCircle : SearchX
  return (
    <div className="col-span-full rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><Icon size={22} aria-hidden="true" /></span>
      <h2 className="mt-4 text-lg font-extrabold tracking-tight">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{message}</p>
      {action}
    </div>
  )
}
