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
  // Truncate long intros
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
    <div className="relative z-[5] mx-auto max-w-[700px]">
      {/* Back nav */}
      <button
        onClick={goHome}
        className="mb-2 flex min-h-[32px] items-center gap-1 bg-transparent border-none p-0 font-sans text-[11px] font-semibold uppercase tracking-widest text-crimson cursor-pointer hover:text-crimson-dark transition-colors"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Journal Home
      </button>

      {/* Category header */}
      <div className="mb-1 flex items-center gap-2.5">
        <Icon className="h-6 w-6 text-gold" />
        <h1 className="font-display text-2xl font-bold leading-tight text-crimson-dark md:text-[34px]">
          {category}
        </h1>
      </div>
      <p className="mb-0 font-body text-sm italic text-ink-faded">
        {pages.length} {pages.length === 1 ? "page" : "pages"} in this section
      </p>
      <Divider className="mb-3" />

      {/* Page cards */}
      <div className="grid gap-2">
        {pages.map((page, idx) => {
          const intro = getIntro(page.key)
          const sections = getHeadingCount(page.key)
          return (
            <button
              key={page.key}
              onClick={() => navigateTo(page.key)}
              className="group flex items-start gap-3 rounded-md border border-border bg-parchment-light/60 p-3 text-left transition-all hover:border-gold hover:shadow-sm cursor-pointer"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 font-sans text-[11px] font-bold text-gold group-hover:bg-gold/20">
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
                  <div className="mt-1 font-sans text-[10px] text-ink-faded/60">
                    {sections} {sections === 1 ? "section" : "sections"}
                  </div>
                )}
              </div>
              <ChevronLeft className="mt-1 h-3.5 w-3.5 flex-shrink-0 rotate-180 text-gold/30 group-hover:text-gold transition-colors" />
            </button>
          )
        })}
      </div>

      <Divider className="mt-4" />
    </div>
  )
}
