import { cn } from "@/lib/utils"

export function CategoryNav({ catPrev, catNext, category, isMobile, onNavigate }) {
  return (
    <div
      className={cn(
        "relative z-[5] mt-2.5 flex gap-2",
        isMobile ? "flex-col" : "flex-row justify-between"
      )}
    >
      {catPrev ? (
        <button
          onClick={() => onNavigate(catPrev.key)}
          className="card-lift flex-1 rounded-md border border-border bg-parchment-light/60 p-3 text-left cursor-pointer"
        >
          <div className="font-sans text-[9px] uppercase tracking-widest text-ink-faded">
            {"\u2190"} Prev in {category}
          </div>
          <div className="mt-1 font-body text-xs font-semibold italic text-crimson-dark">
            {catPrev.title}
          </div>
        </button>
      ) : (
        !isMobile && <div className="flex-1" />
      )}
      {catNext ? (
        <button
          onClick={() => onNavigate(catNext.key)}
          className={cn(
            "card-lift flex-1 rounded-md border border-border bg-parchment-light/60 p-3 cursor-pointer",
            isMobile ? "text-left" : "text-right"
          )}
        >
          <div className="font-sans text-[9px] uppercase tracking-widest text-ink-faded">
            Next in {category} {"\u2192"}
          </div>
          <div className="mt-1 font-body text-xs font-semibold italic text-crimson-dark">
            {catNext.title}
          </div>
        </button>
      ) : (
        !isMobile && <div className="flex-1" />
      )}
    </div>
  )
}
