import { AdaptiveDpr, PerformanceMonitor, Preload } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing"
import { Suspense, useState } from "react"
import { CameraRig } from "./CameraRig"
import { Lighting } from "./Lighting"
import { Monoliths } from "./Monoliths"
import { MorphBlob } from "./MorphBlob"
import { Particles } from "./Particles"

export function Scene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const [dpr, setDpr] = useState<[number, number]>([1, 2])
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      camera={{ fov: 45, position: [0, 1.2, 8] }}
      style={{ background: "#07070a" }}
    >
      <color attach="background" args={["#07070a"]} />
      <PerformanceMonitor
        onIncline={() => setDpr([1, 2])}
        onDecline={() => setDpr([0.7, 1.2])}
      />
      <Suspense fallback={null}>
        <Lighting />
        <Monoliths />
        <MorphBlob />
        <Particles progressRef={progressRef} />
        <CameraRig progressRef={progressRef} />
        {!isMobile && (
          <EffectComposer enabled>
            <Bloom intensity={0.45} luminanceThreshold={0.85} mipmapBlur />
            <Vignette darkness={0.45} offset={0.35} />
          </EffectComposer>
        )}
        <Preload all />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
