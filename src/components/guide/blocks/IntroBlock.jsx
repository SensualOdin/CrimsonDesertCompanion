import React from "react"

export const IntroBlock = React.forwardRef(({ text }, ref) => (
  <div
    ref={ref}
    className="relative z-[5] mb-5 overflow-hidden rounded-sm border border-border/80 bg-gradient-to-br from-parchment-warm/50 to-parchment-warm/20 p-4 text-sm leading-7 text-ink-light italic border-l-4 border-l-crimson shadow-sm"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-crimson/[0.03] to-transparent pointer-events-none" />
    <p className="relative drop-cap">{text}</p>
  </div>
))
IntroBlock.displayName = "IntroBlock"
