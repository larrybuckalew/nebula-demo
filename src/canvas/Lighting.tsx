export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 4]} intensity={1.2} />
      <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#8bb4ff" />
      <pointLight position={[0, 3, 2]} intensity={12} distance={10} color="#3b82f6" />
      <fog attach="fog" args={["#07070a", 8, 22]} />
    </>
  )
}
