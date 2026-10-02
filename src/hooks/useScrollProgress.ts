import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useScrollProgress() {
  const progressRef = useRef(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const st = ScrollTrigger.create({
      trigger: "#scroll-root",
      start: "top top",
      end: "bottom bottom",
      scrub: reduce ? 0 : 0.6,
      onUpdate: (self) => {
        progressRef.current = self.progress
        setProgress(self.progress)
      },
    })
    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      st.kill()
    }
  }, [])

  return { progress, progressRef }
}
