import { ChevronLeft } from "lucide-react"
import {
  Swords, Diamond, TrendingUp, Skull, Shield, Puzzle,
  CookingPot, Compass, Coins, Home, Sparkles, Globe,
  Star, Settings,
} from "lucide-react"
import { guideData } from "@/data/guide-data"
import { categories, categoryIcons } from "@/data/categories"
import { Divider } from "@/components/decorative/Divider"

const iconMap = {
  Swords, Diamond, TrendingUp, Skull, Shield, Puzzle,
  CookingPot, Compass, Coins, Home, Sparkles, Globe,
  Star, Settings,
}

function getIntro(pageKey) {
  const page = guideData[pageKey]
  if (!page) return ""
  const intro = page.content.find((b) => b.type === "intro")
  if (!intro) return ""
  const text = intro.text
  if (text.length <= 120) return text
  return text.slice(0, 117).replace(/\s+\S*$/, "") + "\u2026"
}

function getHeadingCount(pageKey) {
  const page = guideData[pageKey]
  if (!page) return 0
  return page.content.filter((b) => b.type === "heading").length
}

export function CategoryPage({ category, navigateTo, goHome, isMobile }) {
  const pages = categories[category] || []
  const iconName = categoryIcons[category]
  const Icon = iconMap[iconName] || Star

  return (
    <div className="relative z-[5] mx-auto max-w-[700px] anim-page-enter">
      {/* Back nav */}
      <button
        onClick={goHome}
        className="mb-2 flex min-h-[32px] items-center gap-1 bg-transparent border-none p-0 font-sans text-[11px] font-semibold uppercase tracking-widest text-crimson cursor-pointer hover:text-crimson-dark transition-colors"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Journal Home
      </button>

      {/* Category header */}
      <div className="mb-1 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 shadow-sm">
          <Icon className="h-5 w-5 text-gold" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold leading-tight text-crimson-dark md:text-[34px]">
            {category}
          </h1>
          <p className="font-body text-sm italic text-ink-faded">
            {pages.length} {pages.length === 1 ? "page" : "pages"} in this section
          </p>
        </div>
      </div>
      <Divider className="mb-4" />

      {/* Page cards */}
      <div className="grid gap-2.5 anim-stagger">
        {pages.map((page, idx) => {
          const intro = getIntro(page.key)
          const sections = getHeadingCount(page.key)
          return (
            <button
              key={page.key}
              onClick={() => navigateTo(page.key)}
              className="card-lift group flex items-start gap-3.5 rounded-md border border-border bg-parchment-light/60 p-3.5 text-left cursor-pointer"
            >
              <span className="index-circle mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full font-sans text-[11px] font-bold text-gold">
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-sans text-sm font-semibold text-foreground group-hover:text-crimson transition-colors">
                  {page.title}
                </div>
                {intro && (
                  <div className="mt-0.5 font-body text-[12px] italic leading-snug text-ink-faded">
                    {intro}
                  </div>
                )}
                {sections > 0 && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className="h-1 flex-1 max-w-[60px] rounded-full bg-gold/15 overflow-hidden">
                      <div className="h-full rounded-full bg-gold/40" style={{ width: `${Math.min(sections * 12, 100)}%` }} />
                    </div>
                    <span className="font-sans text-[10px] text-ink-faded/60">
                      {sections} {sections === 1 ? "section" : "sections"}
                    </span>
                  </div>
                )}
              </div>
              <ChevronLeft className="mt-1 h-4 w-4 flex-shrink-0 rotate-180 text-gold/20 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
            </button>
          )
        })}
      </div>

      <Divider className="mt-5" />
    </div>
  )
}
