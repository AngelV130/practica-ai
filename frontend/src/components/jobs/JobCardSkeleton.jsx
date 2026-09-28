export function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-line bg-white p-6" aria-hidden="true">
      <div className="size-12 rounded-2xl bg-line/70" />
      <div className="mt-6 h-4 w-1/3 rounded-full bg-line/70" />
      <div className="mt-3 h-6 w-4/5 rounded-full bg-line/70" />
      <div className="mt-5 space-y-2"><div className="h-3 rounded-full bg-line/70" /><div className="h-3 rounded-full bg-line/70" /><div className="h-3 w-2/3 rounded-full bg-line/70" /></div>
      <div className="mt-7 h-8 w-2/5 rounded-full bg-line/70" />
    </div>
  )
}
