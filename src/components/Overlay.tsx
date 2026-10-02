import { useEffect, useState } from "react"

function useReveal(progress: number, from: number, to: number) {
  const t = Math.min(1, Math.max(0, (progress - from) / (to - from || 1)))
  const visible = progress >= from - 0.03 && progress <= to + 0.04
  return { t, visible, opacity: visible ? (t < 0.5 ? t * 2 : 1) : 0 }
}

export function Overlay({ progress, onJump }: { progress: number; onJump: (p: number) => void }) {
  const s1 = progress < 0.16
  const s2 = useReveal(progress, 0.14, 0.31)
  const s3 = useReveal(progress, 0.28, 0.51)
  const s4 = useReveal(progress, 0.49, 0.66)
  const s5 = useReveal(progress, 0.64, 0.79)
  const s6 = useReveal(progress, 0.77, 0.89)
  const s7 = progress > 0.87

  return (
    <div id="scroll-root" className="relative z-10">
      <section className="flex h-[100vh] flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl" style={{ opacity: s1 ? 1 : 0, transform: `translateY(${s1 ? 0 : 8}px)`, transition: "all 400ms" }}>
          <p className="mb-4 text-xs tracking-[0.45em] text-white/60">EST. 2026 — ABSTRACT LUXURY</p>
          <h1 className="font-display text-5xl font-bold leading-[0.9] md:text-7xl lg:text-8xl">BEYOND<br />REALITY.</h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-base">We craft digital luxury for brands that dare to be unforgettable. Scroll to enter the experience — drag, hover, feel.</p>
          <button onClick={() => onJump(0.18)} className="glass mt-8 rounded-full px-7 py-3 text-xs tracking-[0.25em] hover:bg-white hover:text-black transition">ENTER EXPERIENCE ↓</button>
        </div>
        <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/40 md:flex">
          <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          <span className="h-10 w-px bg-white/20" />
        </div>
      </section>

      <section className="flex h-[100vh] items-center px-6 md:px-16 lg:px-24">
        <div className="max-w-xl rounded-2xl glass p-8 md:p-10" style={{ opacity: s2.opacity, transform: `translateY(${(1 - s2.t) * 16}px)`, transition: "all 300ms", pointerEvents: s2.visible ? "auto" : "none" }}>
          <p className="text-xs tracking-[0.3em] text-white/50">01 — PHILOSOPHY</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">We craft digital luxury.</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">Floating monoliths, glass, particle fields — code-generated geometry that whispers premium. Hover the monoliths in the scene to feel the pulse.</p>
          <p className="mt-3 text-xs tracking-wide text-[#7fb0ff]">↗ Interactive island #1 — hover the 3D monoliths</p>
        </div>
      </section>

      <section className="flex min-h-[100vh] items-center px-6 py-16 md:px-16 lg:px-24">
        <div className="grid w-full max-w-5xl gap-5 md:grid-cols-3" style={{ opacity: s3.opacity, transition: "opacity 300ms", pointerEvents: s3.visible ? "auto" : "none" }}>
          <GlassCard title="Strategy" desc="Positioning that cuts through noise. Narrative, audience, moat — defined before a pixel is pushed." delay={0} />
          <GlassCard title="Craft" desc="Obsessive detail. Glass, motion, light — tuned until it feels edible on retina and mobile." delay={80} />
          <GlassCard title="Scale" desc="Performant by default. Adaptive quality, 60fps targets, re-skinnable tokens for any client." delay={160} />
        </div>
      </section>

      <section className="flex h-[100vh] items-center justify-center px-6 text-center">
        <div className="max-w-2xl" style={{ opacity: s4.opacity, transform: `translateY(${(1 - s4.t) * 12}px)`, transition: "all 300ms", pointerEvents: s4.visible ? "auto" : "none" }}>
          <p className="text-xs tracking-[0.35em] text-white/50">02 — MATERIAL STUDY</p>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">Touch the impossible.</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">Drag to rotate the transmission sphere. Click to cycle materials — glass → iridescent → obsidian.</p>
          <p className="mt-2 text-xs tracking-wide text-[#7fb0ff]">↗ Interactive island #2 — drag & click the blob</p>
        </div>
      </section>

      <section className="flex h-[100vh] items-center px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl" style={{ opacity: s5.opacity, transition: "opacity 300ms", pointerEvents: s5.visible ? "auto" : "none" }}>
          <div className="grid grid-cols-3 gap-6 md:gap-10">
            <Stat value="400+" label="Launches" />
            <Stat value="98%" label="Client retention" />
            <Stat value="60fps" label="Target perf" />
          </div>
          <p className="mt-8 text-xs tracking-[0.3em] text-white/40">PARTICLES CONDENSE — SCROLL TO FEEL THE GRID</p>
        </div>
      </section>

      <section className="flex h-[100vh] items-center justify-center px-6 text-center">
        <blockquote className="max-w-3xl" style={{ opacity: s6.opacity, transform: `translateY(${(1 - s6.t) * 10}px)`, transition: "all 300ms", pointerEvents: s6.visible ? "auto" : "none" }}>
          <p className="font-serif text-2xl italic leading-relaxed text-white md:text-4xl">“It felt like walking into the future. We won the pitch before we finished scrolling.”</p>
          <footer className="mt-6 text-xs tracking-[0.25em] text-white/50">— CREATIVE DIRECTOR, FORTUNE 100 BRAND</footer>
        </blockquote>
      </section>

      <section className="flex min-h-[100vh] items-center px-6 py-16 md:px-16 lg:px-24">
        <div className="grid w-full max-w-6xl gap-10 md:grid-cols-2" style={{ opacity: s7 ? 1 : 0, transform: `translateY(${s7 ? 0 : 12}px)`, transition: "all 400ms", pointerEvents: s7 ? "auto" : "none" }}>
          <div>
            <p className="text-xs tracking-[0.35em] text-white/50">CONTACT</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Make it yours.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">This is a demo — re-skin colors, copy, and geometry tokens in minutes for any client. Move your cursor here to trail particles (island #3).</p>
            <div className="mt-8 flex flex-wrap gap-3 text-xs tracking-wide">
              <span className="rounded-full border border-white/15 px-4 py-2 text-white/70">Vite + R3F + GSAP</span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-white/70">Mobile + reduced-motion ready</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs tracking-[0.2em] text-white/35 md:px-16">
        NEBULA — BEYOND REALITY • DEMO • RE-SKIN GUIDE IN src/index.css TOKENS
      </footer>
    </div>
  )
}

function GlassCard({ title, desc, delay }: { title: string; desc: string; delay: number }) {
  return (
    <div className="glass rounded-2xl p-7 transition hover:-translate-y-1 hover:bg-white/[0.09]" style={{ transitionDelay: `${delay}ms` }}>
      <h3 className="font-display text-lg font-bold tracking-wide">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/65">{desc}</p>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-6 text-center">
      <div className="font-display text-3xl font-bold md:text-4xl">{value}</div>
      <div className="mt-2 text-[10px] tracking-[0.3em] text-white/50">{label.toUpperCase()}</div>
    </div>
  )
}

function ContactForm() {
  const [toast, setToast] = useState<string | null>(null)
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2800); return () => clearTimeout(t) } }, [toast])
  return (
    <form
      className="glass rounded-2xl p-6 md:p-8"
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget as HTMLFormElement)
        if (!String(fd.get("email") || "").includes("@")) { setToast("Please enter a valid email."); return }
        setToast("Demo submitted — no backend. Re-skin & connect your API.")
        ;(e.target as HTMLFormElement).reset()
      }}
    >
      <div className="grid gap-4">
        <input name="name" placeholder="Name" className="rounded-xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 placeholder:text-white/40 focus:ring-white/25" />
        <input name="email" placeholder="Email" className="rounded-xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 placeholder:text-white/40 focus:ring-white/25" />
        <textarea name="message" placeholder="Tell us about the pitch…" rows={3} className="rounded-xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 placeholder:text-white/40 focus:ring-white/25" />
        <button type="submit" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold tracking-wide text-black hover:bg-white/90 transition">SEND INQUIRY</button>
      </div>
      {toast && <div className="mt-4 rounded-xl bg-[#3b82f6] px-4 py-3 text-sm text-white">{toast}</div>}
      <p className="mt-4 text-center text-[10px] tracking-[0.2em] text-white/30">DEMO FORM — NO DATA SENT</p>
    </form>
  )
}
