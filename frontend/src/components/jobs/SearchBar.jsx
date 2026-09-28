import { Search, X } from 'lucide-react'

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-muted" size={20} aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Busca por puesto, tecnología o ubicación"
        aria-label="Buscar vacantes"
        className="h-15 w-full rounded-2xl border border-line bg-white pr-14 pl-13 text-[15px] font-medium shadow-card outline-none transition placeholder:font-normal placeholder:text-muted/75 focus:border-brand focus:ring-4 focus:ring-brand/10"
      />
      {value && (
        <button type="button" onClick={() => onChange('')} className="absolute top-1/2 right-4 grid size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-muted transition hover:bg-brand-soft hover:text-brand focus-visible:outline-2 focus-visible:outline-brand" aria-label="Limpiar búsqueda">
          <X size={17} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
