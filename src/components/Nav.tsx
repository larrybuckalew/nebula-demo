const chapters = ["Hero", "Philosophy", "Services", "Craft", "Numbers", "Quote", "Contact"] as const

export function Nav({ progress, onJump }: { progress: number; onJump: (p: number) => void }) {
  const active = Math.min(6, Math.floor(progress * 7.01))
  const positions = [0, 0.15, 0.3, 0.5, 0.65, 0.78, 0.92]
  return (
    <>
      <div className="fixed left-0 top-0 z-30 h-0.5 w-full bg-white/10">
        <div className="h-full bg-[#3b82f6] transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>
      <nav className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {chapters.map((c, i) => (
          <button
            key={c}
            aria-label={`Go to ${c}`}
            onClick={() => onJump(positions[i])}
            className={`group flex items-center gap-3 ${active === i ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
          >
            <span className={`h-2 w-2 rounded-full ${active === i ? "bg-white" : "bg-white/60"} group-hover:bg-white`} />
            <span className={`text-[10px] tracking-[0.2em] ${active === i ? "text-white" : "text-white/0 group-hover:text-white/80"}`}>{c.toUpperCase()}</span>
          </button>
        ))}
      </nav>
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-4 md:px-8">
        <span className="font-display text-sm font-bold tracking-[0.35em]">NEBULA</span>
        <span className="hidden text-xs tracking-[0.2em] text-white/50 md:block">BEYOND REALITY — DEMO</span>
      </div>
    </>
  )
}
