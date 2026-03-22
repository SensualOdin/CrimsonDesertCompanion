import { useMemo } from "react"

export function Embers({ count = 12 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${1.5 + Math.random() * 3}px`,
      duration: `${6 + Math.random() * 10}s`,
      delay: `${Math.random() * 8}s`,
      drift: `${-30 + Math.random() * 60}px`,
    })),
    [count]
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]" aria-hidden>
      {particles.map((p) => (
        <div
          key={p.id}
          className="ember"
          style={{
            left: p.left,
            bottom: "-10px",
            "--size": p.size,
            "--duration": p.duration,
            "--delay": p.delay,
            "--drift": p.drift,
          }}
        />
      ))}
    </div>
  )
}
