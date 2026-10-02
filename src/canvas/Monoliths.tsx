import { Float } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

function Monolith({ position, hovered, onHover }: { position: [number, number, number]; hovered: boolean; onHover: (v: boolean) => void }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    const mat = ref.current.material as THREE.MeshStandardMaterial
    const target = hovered ? 0.9 : 0.05
    mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, target, delta * 6)
  })
  return (
    <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.6}>
      <mesh
        ref={ref}
        position={position}
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
        castShadow={false}
      >
        <boxGeometry args={[0.9, 2.2, 0.22]} />
        <meshStandardMaterial
          color="#cbd5e1"
          metalness={0.85}
          roughness={0.18}
          emissive="#3b82f6"
          emissiveIntensity={0.05}
          transparent
          opacity={0.92}
        />
      </mesh>
    </Float>
  )
}

export function Monoliths() {
  const [h, setH] = useState<boolean[]>([false, false, false])
  return (
    <group>
      <Monolith position={[-1.8, 0.1, -1]} hovered={h[0]} onHover={(v) => setH((p) => [v, p[1], p[2]])} />
      <Monolith position={[0, 0.25, -0.4]} hovered={h[1]} onHover={(v) => setH((p) => [p[0], v, p[2]])} />
      <Monolith position={[1.8, -0.05, -0.9]} hovered={h[2]} onHover={(v) => setH((p) => [p[0], p[1], v])} />
      <Float speed={1.1} floatIntensity={1}>
        <mesh position={[0, 0.45, 0.6]}>
          <torusGeometry args={[0.95, 0.18, 24, 64]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.12} emissive="#60a5fa" emissiveIntensity={0.2} />
        </mesh>
      </Float>
    </group>
  )
}
