import React from "react"

export const IntroBlock = React.forwardRef(({ text }, ref) => (
  <div
    ref={ref}
    className="relative z-[5] mb-4 rounded-sm border border-border bg-gradient-to-br from-parchment-warm/50 to-parchment-warm/30 p-3.5 text-sm leading-7 text-ink-light italic border-l-4 border-l-crimson"
  >
    {text}
  </div>
))
IntroBlock.displayName = "IntroBlock"
