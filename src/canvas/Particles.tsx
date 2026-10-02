import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import * as THREE from "three"

export function Particles({ progressRef, count = 2400 }: { progressRef: React.MutableRefObject<number>; count?: number }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  const n = isMobile ? Math.min(1200, count) : count
  const ref = useRef<THREE.Points>(null)
  const { positions, speeds } = useMemo(() => {
    const p = new Float32Array(n * 3)
    const s = new Float32Array(n)
    for (let i = 0; i < n; i++) {
      p[i * 3] = (Math.random() - 0.5) * 18
      p[i * 3 + 1] = (Math.random() - 0.5) * 14
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1
      s[i] = 0.2 + Math.random() * 0.8
    }
    return { positions: p, speeds: s }
  }, [n])

  useFrame((_, delta) => {
    const pts = ref.current
    if (!pts) return
    const prog = progressRef.current
    const gridStrength = prog > 0.62 && prog < 0.78 ? (1 - Math.abs(prog - 0.7) / 0.08) : 0
    const pos = (pts.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    for (let i = 0; i < n; i++) {
      let x = pos[i * 3]
      const y = pos[i * 3 + 1]
      let z = pos[i * 3 + 2]
      x += Math.sin(y * 0.3 + performance.now() * 0.0002 * speeds[i]) * 0.002
      z += Math.cos(x * 0.2 + performance.now() * 0.00015 * speeds[i]) * 0.002
      if (gridStrength > 0) {
        const gx = Math.round(x * 0.9) / 0.9
        const gz = Math.round(z * 0.9) / 0.9
        x += (gx - x) * gridStrength * delta * 2
        z += (gz - z) * gridStrength * delta * 2
      }
      pos[i * 3] = x
      pos[i * 3 + 2] = z
      if (Math.random() < 0.001) pos[i * 3 + 1] += (Math.random() - 0.5) * 0.02
    }
    ;(pts.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
    const mx = ((window as unknown as { __mx?: number }).__mx ?? 0)
    const my = ((window as unknown as { __my?: number }).__my ?? 0)
    if (prog > 0.88) {
      for (let i = 0; i < n; i++) {
        pos[i * 3] += mx * 0.0006 * speeds[i]
        pos[i * 3 + 1] -= my * 0.0006 * speeds[i]
      }
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} sizeAttenuation transparent opacity={0.55} color="#9ec1ff" depthWrite={false} />
    </points>
  )
}
