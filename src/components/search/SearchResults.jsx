export function SearchResults({ results, onSelect }) {
  return (
    <div>
      <div className="px-3.5 py-2 font-sans text-[10px] uppercase tracking-widest text-ink-faded">
        {results.length} result{results.length !== 1 ? "s" : ""}
      </div>
      {results.map((r) => (
        <div
          key={`${r.key}-${r.blockIndex}`}
          onClick={() =>
            onSelect(r.key, r.blockIndex >= 0 ? r.blockIndex : undefined)
          }
          className="cursor-pointer border-b border-bark-deep/50 px-3.5 py-2.5 transition-colors hover:bg-bark-light"
        >
          <div className="font-body text-[13px] font-semibold text-sidebar-foreground">
            {r.title}
          </div>
          <div className="mt-0.5 font-sans text-[10.5px] text-ink-faded">
            {r.category}
          </div>
          {r.snippet && (
            <div className="mt-1 font-body text-[11px] italic leading-snug text-ink-faded/80">
              {r.snippet}
            </div>
          )}
        </div>
      ))}
      {results.length === 0 && (
        <div className="px-3.5 py-5 text-center font-body text-[13px] italic text-ink-faded">
          Nothing found in these pages.
        </div>
      )}
    </div>
  )
}
