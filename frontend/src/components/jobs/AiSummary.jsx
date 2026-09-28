import { AlertCircle, Sparkles, Square } from 'lucide-react'
import { Streamdown } from 'streamdown'
import 'streamdown/styles.css'
import { useJobSummary } from '../../hooks/useJobSummary.js'

export function AiSummary({ jobId }) {
  const { summary, error, isStreaming, generateSummary, stopSummary } = useJobSummary(jobId)
  const hasSummary = summary.length > 0

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-brand/15 bg-brand-soft" aria-labelledby="ai-summary-title">
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-start gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-sm">
            <Sparkles size={19} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">Asistente con IA</p>
            <h2 id="ai-summary-title" className="mt-1 text-xl font-black tracking-[-0.03em]">Resumen inteligente</h2>
            {!hasSummary && !error && (
              <p className="mt-1 text-sm leading-6 text-muted">Obtén los puntos clave de esta vacante en unos segundos.</p>
            )}
          </div>
        </div>

        {isStreaming ? (
          <button
            type="button"
            onClick={stopSummary}
            className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border border-brand/20 bg-white px-4 py-2.5 text-sm font-bold text-brand transition hover:border-brand/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Square size={14} fill="currentColor" aria-hidden="true" />
            Detener
          </button>
        ) : (
          <button
            type="button"
            onClick={generateSummary}
            className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Sparkles size={16} aria-hidden="true" />
            {hasSummary ? 'Generar de nuevo' : 'Generar resumen'}
          </button>
        )}
      </div>

      {(hasSummary || error || isStreaming) && (
        <div className="border-t border-brand/10 bg-white px-6 py-6 sm:px-7" aria-live="polite">
          {error && (
            <div className="flex items-start gap-3 text-sm text-red-700" role="alert">
              <AlertCircle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
              <div>
                <p className="font-bold">No pudimos generar el resumen</p>
                <p className="mt-1 text-red-700/80">{error.message}</p>
              </div>
            </div>
          )}

          {hasSummary && (
            <Streamdown
              animated
              isAnimating={isStreaming}
              className="ai-summary-content text-[15px] leading-7 text-muted"
            >
              {summary}
            </Streamdown>
          )}

          {isStreaming && !hasSummary && (
            <div className="flex items-center gap-3 text-sm font-semibold text-muted">
              <span className="size-2 animate-pulse rounded-full bg-brand" />
              Preparando el resumen…
            </div>
          )}
        </div>
      )}
    </section>
  )
}
