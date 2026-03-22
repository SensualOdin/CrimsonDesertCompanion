import React from "react"
import {
  ChevronRight,
  AlertTriangle,
  MapPin,
  Diamond,
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
  stat: {
    border: "border-l-stat",
    bg: "bg-stat/[0.04]",
    icon: Diamond,
    iconColor: "text-stat",
  },
}

export const TipBlock = React.forwardRef(({ text, variant = "tip" }, ref) => {
  const v = variants[variant] || variants.tip
  const Icon = v.icon

  return (
    <div
      ref={ref}
      className={cn(
        "relative z-[5] mb-1 flex items-start gap-2.5 rounded-r-sm border-l-[3px] px-3 py-2 text-[13px] leading-relaxed text-ink transition-colors",
        v.border,
        v.bg
      )}
    >
      <Icon className={cn("mt-0.5 h-3.5 w-3.5 flex-shrink-0", v.iconColor)} />
      <span>{text}</span>
    </div>
  )
})
TipBlock.displayName = "TipBlock"
