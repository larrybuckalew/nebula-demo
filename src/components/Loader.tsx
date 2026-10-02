export function Loader({ ready }: { ready: boolean }) {
  if (ready) return null
  return (
    <div className="fixed inset-0 z-[50] grid place-items-center bg-[#07070a] text-white">
      <div className="text-center">
        <div className="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <p className="font-display text-sm tracking-[0.35em]">NEBULA</p>
        <p className="mt-2 text-xs tracking-widest text-white/50">LOADING EXPERIENCE</p>
      </div>
    </div>
  )
}
