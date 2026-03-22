import { useState, useEffect } from "react"
import { ChevronRight, Search, X } from "lucide-react"
import {
  Swords, Diamond, TrendingUp, Skull, Shield, Puzzle,
  CookingPot, Compass, Coins, Home, Sparkles, Globe,
  Star, Settings,
} from "lucide-react"
import { guideData } from "@/data/guide-data"
import { categories, categoryOrder, categoryIcons } from "@/data/categories"
import { useSearch } from "@/hooks/use-search"
import { SearchResults } from "@/components/search/SearchResults"
import { cn } from "@/lib/utils"

const iconMap = {
  Swords, Diamond, TrendingUp, Skull, Shield, Puzzle,
  CookingPot, Compass, Coins, Home, Sparkles, Globe,
  Star, Settings,
}

export function AppSidebar({
  activePage,
  navigateTo,
  expandedCats,
  toggleCat,
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  searchQuery,
  setSearchQuery,
}) {
  const searchResults = useSearch(searchQuery)
  const pgCount = Object.keys(guideData).length

  const sidebarStyle = {
    transform: !isMobile || sidebarOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform .25s ease",
  }

  if (!sidebarOpen && isMobile) return null

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-[90] bg-bark-deep/55 backdrop-blur-[2px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={cn(
          "flex h-screen flex-col overflow-hidden border-r border-sidebar-border shadow-[inset_-6px_0_12px_rgba(0,0,0,.2)]",
          isMobile
            ? "fixed inset-y-0 left-0 z-[100] w-[85vw] max-w-[320px] shadow-[4px_0_30px_rgba(0,0,0,.4)]"
            : "relative w-[270px] min-w-[270px]"
        )}
        style={{
          ...sidebarStyle,
          background:
            "linear-gradient(160deg, hsl(27 30% 14%) 0%, hsl(27 30% 18%) 30%, hsl(27 28% 13%) 70%, hsl(27 30% 10%) 100%)",
        }}
      >
        {/* Header */}
        <div className="shrink-0 border-b border-sidebar-border px-3.5 py-4">
          <div
            className="cursor-pointer"
            onClick={() => navigateTo(null)}
          >
            <div className="font-sans text-[9px] font-bold uppercase tracking-[3px] text-gold">
              AN EXPLORER'S
            </div>
            <div className="font-display text-xl font-bold leading-tight text-gold-muted">
              Field Journal
            </div>
            <div className="mt-0.5 font-body text-[11px] italic text-ink-faded">
              {pgCount} pages of Pywel
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-2.5">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faded/50" />
            <input
              type="text"
              value={searchQuery}
              placeholder="Search the journal\u2026"
              id="journal-search"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm border border-sidebar-border bg-bark-deep py-2 pl-8 pr-8 font-body text-[13px] italic text-sidebar-foreground placeholder:text-ink-faded/40 outline-none transition-colors focus:border-gold/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none p-1 text-ink-faded cursor-pointer hover:text-sidebar-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-0.5">
          {searchResults ? (
            <SearchResults results={searchResults} onSelect={navigateTo} />
          ) : (
            categoryOrder
              .filter((c) => categories[c])
              .map((cat) => {
                const iconName = categoryIcons[cat]
                const Icon = iconMap[iconName] || Star
                return (
                  <div key={cat}>
                    <button
                      onClick={() => toggleCat(cat)}
                      className="flex w-full cursor-pointer items-center gap-2.5 border-none bg-transparent px-3.5 py-2.5 text-left font-sans text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/70 transition-colors hover:bg-bark-light hover:text-gold-light"
                    >
                      <Icon className="h-4 w-4 flex-shrink-0 text-gold" />
                      <span className="flex-1">{cat}</span>
                      <span className="text-[9px] text-ink-faded">
                        {categories[cat].length}
                      </span>
                      <ChevronRight
                        className={cn(
                          "h-3 w-3 text-gold/30 transition-transform duration-200",
                          expandedCats[cat] && "rotate-90"
                        )}
                      />
                    </button>
                    {expandedCats[cat] &&
                      categories[cat].map((page) => (
                        <button
                          key={page.key}
                          onClick={() => navigateTo(page.key)}
                          className={cn(
                            "flex w-full cursor-pointer items-center border-none bg-transparent border-l-2 border-l-transparent px-3.5 py-1.5 pl-9 text-left font-body text-[13px] italic text-ink-faded/80 transition-colors hover:border-l-gold hover:bg-bark hover:text-gold-light min-h-[36px]",
                            activePage === page.key &&
                              "border-l-gold-light bg-bark font-semibold not-italic text-gold-light"
                          )}
                        >
                          {page.title}
                        </button>
                      ))}
                  </div>
                )
              })
          )}
        </div>
      </div>
    </>
  )
}
