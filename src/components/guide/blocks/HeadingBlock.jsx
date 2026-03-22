import React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export const HeadingBlock = React.forwardRef(
  ({ text, isCollapsed, onToggle, index }, ref) => (
    <h2
      ref={ref}
      id={`s-${index}`}
      className={cn(
        "relative z-[5] mt-5 mb-2 flex cursor-pointer select-none items-center rounded-t-sm border-b-2 border-border px-3 py-1.5 font-display text-base font-bold text-crimson-dark transition-colors",
        "bg-gradient-to-br from-parchment-warm/40 to-parchment-warm/20 hover:bg-parchment-warm/50"
      )}
      onClick={onToggle}
    >
      <span className="flex-1">{text}</span>
      <ChevronRight
        className={cn(
          "h-3.5 w-3.5 text-crimson-dark/30 transition-transform duration-200",
          !isCollapsed && "rotate-90"
        )}
      />
    </h2>
  )
)
HeadingBlock.displayName = "HeadingBlock"
