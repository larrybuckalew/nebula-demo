export type Keyframe = { p: number; pos: [number, number, number]; target: [number, number, number] }

export const keyframes: Keyframe[] = [
  { p: 0, pos: [0, 1.2, 8], target: [0, 0.2, 0] },
  { p: 0.15, pos: [2.5, 1.5, 7], target: [0, 0, 0] },
  { p: 0.3, pos: [0, 0.5, 6], target: [0, 0, -1] },
  { p: 0.5, pos: [0, 0.2, 5], target: [0, 0, 0] },
  { p: 0.65, pos: [0, 2.5, 9], target: [0, 0, 0] },
  { p: 0.78, pos: [-1.5, 0.8, 6], target: [0, 0.5, 0] },
  { p: 1, pos: [0, 1.2, 8], target: [0, 0.2, 0] },
]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

export function sampleTimeline(progress: number) {
  const p = Math.min(1, Math.max(0, progress))
  let i = 0
  while (i < keyframes.length - 1 && p > keyframes[i + 1].p) i++
  const a = keyframes[i]
  const b = keyframes[Math.min(i + 1, keyframes.length - 1)]
  const denom = b.p - a.p || 1
  const t = Math.min(1, Math.max(0, (p - a.p) / denom))
  const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  return {
    pos: [lerp(a.pos[0], b.pos[0], e), lerp(a.pos[1], b.pos[1], e), lerp(a.pos[2], b.pos[2], e)] as [number, number, number],
    target: [lerp(a.target[0], b.target[0], e), lerp(a.target[1], b.target[1], e), lerp(a.target[2], b.target[2], e)] as [number, number, number],
  }
}
