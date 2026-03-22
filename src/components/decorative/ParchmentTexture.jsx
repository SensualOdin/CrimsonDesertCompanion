export function ParchmentTexture() {
  return (
    <>
      {/* Paper noise texture */}
      <div className="parchment-texture pointer-events-none absolute inset-0 z-[1]" />

      {/* Vignette */}
      <div className="parchment-vignette pointer-events-none absolute inset-0 z-[3]" />

      {/* Subtle ink mark */}
      <div
        className="pointer-events-none absolute z-[2] opacity-60"
        style={{
          top: "8%",
          left: "10%",
          width: 40,
          height: 35,
          background:
            "radial-gradient(ellipse at 40% 50%, rgba(50,25,5,.1) 0%, rgba(50,25,5,.04) 40%, transparent 70%)",
          borderRadius: "60% 40% 55% 45%",
          transform: "rotate(20deg)",
        }}
      />

      {/* Torn left edge */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[4] w-2"
        style={{
          background:
            "linear-gradient(90deg, rgba(70,45,15,.08) 0%, rgba(70,45,15,.03) 40%, transparent 100%)",
        }}
      />

      {/* Subtle burn top/bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-2"
        style={{
          background:
            "linear-gradient(180deg, rgba(70,40,10,.1) 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-2"
        style={{
          background:
            "linear-gradient(0deg, rgba(70,40,10,.1) 0%, transparent 100%)",
        }}
      />
    </>
  )
}
