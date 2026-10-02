import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import { sampleTimeline } from "../lib/scrollTimeline"

export function CameraRig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0.2, 0))
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useFrame((_, delta) => {
    const { pos, target: t } = sampleTimeline(progressRef.current)
    const k = reduce ? 1 : Math.min(1, delta * 6)
    camera.position.lerp(new THREE.Vector3(...pos), k)
    target.current.lerp(new THREE.Vector3(...t), k)
    ;(camera as THREE.PerspectiveCamera).lookAt(target.current)
    if (!reduce) {
      const mx = ((window as unknown as { __mx?: number }).__mx ?? 0) * 0.15
      const my = ((window as unknown as { __my?: number }).__my ?? 0) * 0.1
      camera.position.x += mx
      camera.position.y += my
    }
  })
  return null
}
