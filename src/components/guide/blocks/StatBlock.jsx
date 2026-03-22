import React from "react"
import { Diamond } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Parse stat text into structured key-value pairs.
 * Handles patterns like:
 *   "Lv1: description. Lv2: description."
 *   "S+ — Bare Hands: description. S — Greatsword: description."
 *   "Artifacts 1-8: description."
 */
function parseStatEntries(text) {
  // Try splitting on common stat patterns
  const kvPattern = /(?:^|(?<=\.\s))([A-Z][A-Za-z0-9+\-–—\s]*?(?:Lv\d+|Tier\s*\d+|Artifacts?\s*[\d\-–]+|[SABCDF][+\-]?\s*[—–-]\s*[^:]+?)):\s*(.+?)(?=(?:\.\s+[A-Z][A-Za-z0-9+\-–—\s]*?(?:Lv\d+|Tier\s*\d+|Artifacts?\s*[\d\-–]+|[SABCDF][+\-]?\s*[—–-]):|$))/g

  const entries = []
  let match
  while ((match = kvPattern.exec(text)) !== null) {
    entries.push({
      label: match[1].trim(),
      value: match[2].trim().replace(/\.$/, ""),
    })
  }

  // If we couldn't parse structured entries, try simple sentence split
  if (entries.length === 0) {
    const parts = text
      .split(/(?<=[.!]) (?=[A-Z])/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    if (parts.length >= 2) {
      return parts.map((p) => {
        const colonIdx = p.indexOf(":")
        if (colonIdx > 0 && colonIdx < 40) {
          return {
            label: p.slice(0, colonIdx).trim(),
            value: p.slice(colonIdx + 1).trim().replace(/\.$/, ""),
          }
        }
        return { label: null, value: p.replace(/\.$/, "") }
      })
    }
    // Single entry - still show as a card
    const colonIdx = text.indexOf(":")
    if (colonIdx > 0 && colonIdx < 40) {
      return [
        {
          label: text.slice(0, colonIdx).trim(),
          value: text.slice(colonIdx + 1).trim().replace(/\.$/, ""),
        },
      ]
    }
    return null
  }

  return entries
}

export const StatBlock = React.forwardRef(({ text }, ref) => {
  const entries = parseStatEntries(text)

  // Fallback: render as simple card if parsing fails
  if (!entries) {
    return (
      <div
        ref={ref}
        className="relative z-[5] -mt-px flex items-start gap-2.5 rounded-sm border border-stat/20 bg-stat/[0.04] px-3 py-2.5 text-[13px] leading-relaxed text-ink"
      >
        <Diamond className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-stat" />
        <span>{text}</span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="relative z-[5] -mt-px overflow-hidden rounded-sm border border-stat/20 stat-accent shadow-sm"
    >
      {entries.map((entry, i) => (
        <div
          key={i}
          className={cn(
            "flex items-start gap-3 px-3 py-2",
            i > 0 && "border-t border-stat/10"
          )}
        >
          <Diamond className="mt-0.5 h-3 w-3 flex-shrink-0 text-stat/60" />
          <div className="flex-1 min-w-0">
            {entry.label && (
              <span className="mr-2 inline-block font-sans text-[11px] font-bold uppercase tracking-wide text-stat">
                {entry.label}
              </span>
            )}
            <span className="text-[13px] leading-relaxed text-ink">
              {entry.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
})
StatBlock.displayName = "StatBlock"
