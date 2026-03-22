import { cn } from "@/lib/utils"

export function Divider({ className }) {
  return (
    <div
      className={cn(
        "relative z-[5] text-center text-xs tracking-[6px] text-gold my-1.5 ornament-glow select-none",
        className
      )}
    >
      <span className="inline-block">
        {"\u2500\u2500\u2500 \u2726 \u2500\u2500\u2500"}
      </span>
    </div>
  )
}
