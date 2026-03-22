import { cn } from "@/lib/utils"

export function TableOfContents({
  headings,
  collapsed,
  setCollapsed,
  allCol,
  toggleAll,
  bRefs,
}) {
  if (headings.length < 3) return null

  return (
    <div className="relative z-[5] mb-3 flex flex-wrap gap-1 rounded-sm border border-border bg-parchment-warm/35 p-2">
      {headings.map((h) => (
        <button
          key={h.index}
          onClick={() => {
            if (collapsed[h.index]) {
              setCollapsed((p) => ({ ...p, [h.index]: false }))
            }
            setTimeout(() => {
              const el = bRefs.current[h.index]
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
            }, 50)
          }}
          className="whitespace-nowrap rounded-sm border border-parchment-warm px-2 py-0.5 font-sans text-[10.5px] text-ink-light transition-colors hover:border-crimson hover:bg-parchment-light/60 hover:text-crimson"
        >
          {h.text}
        </button>
      ))}
      <button
        onClick={toggleAll}
        className="ml-auto whitespace-nowrap rounded-sm border border-parchment-warm px-2 py-0.5 font-sans text-[10px] text-ink-light transition-colors hover:border-crimson hover:bg-parchment-light/60 hover:text-crimson"
      >
        {allCol ? "Expand All" : "Collapse All"}
      </button>
    </div>
  )
}
