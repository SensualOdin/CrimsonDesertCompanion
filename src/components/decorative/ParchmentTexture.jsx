export function ParchmentTexture() {
  return (
    <>
      {/* Paper noise texture */}
      <div className="parchment-texture pointer-events-none absolute inset-0 z-[1]" />

      {/* Vignette */}
      <div className="parchment-vignette pointer-events-none absolute inset-0 z-[3]" />
    </>
  )
}
