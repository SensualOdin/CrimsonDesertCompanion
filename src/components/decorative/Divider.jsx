import { cn } from "@/lib/utils"

export function Divider({ className }) {
  return (
    <div
      className={cn(
        "relative z-[5] text-center text-xs tracking-[6px] text-gold opacity-50 my-1.5",
        className
      )}
    >
      {"\u2014 \u2726 \u2014"}
    </div>
  )
}
