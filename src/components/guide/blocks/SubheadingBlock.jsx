import React from "react"

export const SubheadingBlock = React.forwardRef(({ text }, ref) => (
  <h3
    ref={ref}
    className="relative z-[5] mt-4 mb-2 font-sans text-xs font-semibold uppercase tracking-wider text-gold"
  >
    {text}
  </h3>
))
SubheadingBlock.displayName = "SubheadingBlock"
