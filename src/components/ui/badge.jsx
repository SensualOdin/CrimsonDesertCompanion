import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-sans font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-gold/30 bg-gold/10 text-gold",
        crimson: "border-crimson/30 bg-crimson/10 text-crimson",
        outline: "border-border text-ink-faded",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
