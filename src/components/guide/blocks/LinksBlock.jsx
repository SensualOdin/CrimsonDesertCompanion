import React from "react"
import { guideData } from "@/data/guide-data"

export const LinksBlock = React.forwardRef(({ pages, onNavigate }, ref) => (
  <div
    ref={ref}
    className="relative z-[5] mt-3.5 mb-1.5 flex flex-wrap items-center gap-1.5 rounded-sm border border-border bg-parchment-warm/35 p-2.5"
  >
    <span className="mr-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-gold">
      See Also:
    </span>
    {pages
      .filter((p) => guideData[p])
      .map((p) => (
        <button
          key={p}
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(p)
          }}
          className="whitespace-nowrap rounded-sm border border-gold/40 bg-parchment-light/70 px-2 py-0.5 font-body text-xs italic text-crimson transition-colors hover:border-gold hover:bg-bark hover:text-gold-light"
        >
          {guideData[p].title}
        </button>
      ))}
  </div>
))
LinksBlock.displayName = "LinksBlock"
