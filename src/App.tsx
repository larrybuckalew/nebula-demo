import { useEffect, useRef, useState } from "react"
import { Scene } from "./canvas/Scene"
import { Loader } from "./components/Loader"
import { Nav } from "./components/Nav"
import { Overlay } from "./components/Overlay"
import { useScrollProgress } from "./hooks/useScrollProgress"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

export default function App() {
  const { progress, progressRef } = useScrollProgress()
  const [ready, setReady] = useState(false)
  const raf = useRef(0)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        ;(window as unknown as { __mx: number; __my: number }).__mx = x
        ;(window as unknown as { __mx: number; __my: number }).__my = y
      })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const jump = (p: number) => {
    const root = document.getElementById("scroll-root")
    if (!root) return
    const h = root.offsetHeight - window.innerHeight
    gsap.to(window, { duration: 1.1, scrollTo: Math.max(0, h * p), ease: "power3.inOut" })
  }

  return (
    <div className="relative bg-[#07070a] text-zinc-50">
      <Loader ready={ready} />
      <div className="fixed inset-0">
        <Scene progressRef={progressRef} />
      </div>
      <Nav progress={progress} onJump={jump} />
      <Overlay progress={progress} onJump={jump} />
    </div>
  )
}
