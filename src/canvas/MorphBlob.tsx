import { Float, MeshTransmissionMaterial, PresentationControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

const mats = [
  { color: "#dbeafe", bg: "#07070a", trans: 1 },
  { color: "#fde68a", bg: "#0a0a0f", trans: 0.9 },
  { color: "#0f172a", bg: "#0f172a", trans: 0.7 },
] as const

export function MorphBlob() {
  const [idx, setIdx] = useState(0)
  const m = mats[idx]
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const s = 1 + Math.sin(t * 0.7) * 0.06
    ref.current.scale.set(s, s * (1 + Math.cos(t * 0.5) * 0.03), s)
  })
  return (
    <Float speed={0.7} rotationIntensity={0.35} floatIntensity={0.8}>
      <PresentationControls snap global rotation={[0, 0, 0]} polar={[-0.35, 0.35]} azimuth={[-0.9, 0.9]} enabled>
        <mesh ref={ref} onClick={() => setIdx((i) => (i + 1) % mats.length)}>
          <icosahedronGeometry args={[1.15, 5]} />
          <MeshTransmissionMaterial
            color={m.color}
            background={new THREE.Color(m.bg)}
            transmission={m.trans}
            thickness={0.35}
            roughness={0.12}
            chromaticAberration={0.06}
            distortion={0.35}
            temporalDistortion={0.15}
          />
        </mesh>
      </PresentationControls>
    </Float>
  )
}
