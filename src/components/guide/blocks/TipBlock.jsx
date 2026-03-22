import React from "react"
import {
  ChevronRight,
  AlertTriangle,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"

const variants = {
  tip: {
    border: "border-l-tip",
    bg: "bg-parchment-light/60",
    icon: ChevronRight,
    iconColor: "text-tip",
  },
  warning: {
    border: "border-l-warning",
    bg: "bg-warning/[0.06]",
    icon: AlertTriangle,
    iconColor: "text-warning",
  },
  location: {
    border: "border-l-location",
    bg: "bg-location/[0.05]",
    icon: MapPin,
    iconColor: "text-location",
  },
}

/**
 * Parse text that contains multiple distinct points separated by periods
 * into bullet items for better scanability.
 * Only splits if there are 2+ logical sentences.
 */
function parseIntoBullets(text) {
  const parts = text
    .split(/(?<=[.!]) (?=[A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  if (parts.length < 2) return null
  return parts
}

export const TipBlock = React.forwardRef(({ text, variant = "tip" }, ref) => {
  const v = variants[variant] || variants.tip
  const Icon = v.icon
  const bullets = parseIntoBullets(text)

  return (
    <div
      ref={ref}
      className={cn(
        "relative z-[5] mb-2 flex items-start gap-2.5 rounded-r-sm border-l-[3px] px-3 py-2.5 text-[13px] leading-relaxed text-ink transition-colors",
        v.border,
        v.bg
      )}
    >
      <Icon className={cn("mt-0.5 h-3.5 w-3.5 flex-shrink-0", v.iconColor)} />
      {bullets ? (
        <ul className="flex-1 space-y-1 list-none p-0 m-0">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className={cn("mt-[7px] h-1 w-1 flex-shrink-0 rounded-full", v.iconColor, "bg-current opacity-50")} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : (
        <span>{text}</span>
      )}
    </div>
  )
})
TipBlock.displayName = "TipBlock"
