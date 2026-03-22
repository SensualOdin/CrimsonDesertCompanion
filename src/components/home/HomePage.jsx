import { Card } from "@/components/ui/card"
import { Divider } from "@/components/decorative/Divider"
import { Embers } from "@/components/decorative/Embers"
import { guideData } from "@/data/guide-data"
import { categories, categoryOrder, categoryIcons } from "@/data/categories"
import {
  Swords, Diamond, TrendingUp, Skull, Shield, Puzzle,
  CookingPot, Compass, Coins, Home, Sparkles, Globe,
  Star, Settings,
} from "lucide-react"

const iconMap = {
  Swords, Diamond, TrendingUp, Skull, Shield, Puzzle,
  CookingPot, Compass, Coins, Home, Sparkles, Globe,
  Star, Settings,
}

const starters = [
  { key: "beginner", icon: Star, desc: "First 10 hours survival guide" },
  { key: "combat-basics", icon: Swords, desc: "How fighting works" },
  { key: "kliff-builds", icon: Diamond, desc: "Build path for Kliff" },
]

export function HomePage({ navigateTo, navigateToCat, setExpandedCats, isMobile }) {
  const pgCount = Object.keys(guideData).length

  return (
    <div className="relative z-[5] mx-auto max-w-[820px] anim-page-enter">
      {/* Ambient embers */}
      <Embers count={isMobile ? 6 : 12} />

      {/* Hero */}
      <div className="mb-6 text-center">
        <div className="mb-1.5 font-sans text-[9px] font-bold uppercase tracking-[5px] text-gold md:text-[10px]">
          AN EXPLORER'S
        </div>
        <h1 className="mb-1.5 font-display text-4xl font-bold leading-none md:text-5xl text-shimmer">
          Field Journal
        </h1>
        <p className="mb-0.5 font-display text-base italic text-ink-light">
          Notes on the Continent of Pywel
        </p>
        <Divider />
        <p className="mt-1.5 font-body text-xs text-ink-faded italic">
          {pgCount} pages of hard-won knowledge
        </p>
      </div>

      {/* Starter cards */}
      <Card className="mb-5 border-2 border-crimson/30 p-3.5 shadow-md">
        <div className="mb-2.5 font-display text-sm font-bold text-crimson">
          <Star className="mr-1.5 inline h-4 w-4 text-crimson" />
          New to Pywel? Begin Here
        </div>
        <div className="grid gap-2 md:grid-cols-3">
          {starters.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.key}
                onClick={() => {
                  setExpandedCats((p) => ({
                    ...p,
                    [guideData[s.key].category]: true,
                  }))
                  navigateTo(s.key)
                }}
                className="card-lift flex items-center gap-3 rounded-md border border-border bg-parchment-light/60 p-2.5 text-left transition-all hover:border-crimson cursor-pointer"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-crimson/10">
                  <Icon className="h-4.5 w-4.5 text-crimson" />
                </span>
                <div>
                  <div className="font-sans text-xs font-semibold text-foreground">
                    {guideData[s.key].title}
                  </div>
                  <div className="font-body text-[11px] italic text-ink-faded">
                    {s.desc}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Category grid */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 anim-stagger">
        {categoryOrder
          .filter((c) => categories[c])
          .map((cat) => {
            const iconName = categoryIcons[cat]
            const Icon = iconMap[iconName] || Star
            return (
              <button
                key={cat}
                onClick={() => navigateToCat(cat)}
                className="card-lift group flex items-center gap-2.5 rounded-md border border-border bg-parchment-light/60 p-3 text-left cursor-pointer"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 transition-all group-hover:bg-gold/20 group-hover:shadow-[0_0_12px_hsl(var(--gold)/0.15)]">
                  <Icon className="h-4 w-4 text-gold" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-sans text-xs font-bold text-foreground">
                    {cat}
                  </div>
                  <div className="font-body text-[10.5px] italic text-ink-faded">
                    {categories[cat].length} pages
                  </div>
                </div>
              </button>
            )
          })}
      </div>

      <Divider className="mt-5" />
      <div className="text-center">
        <span className="font-body text-[11px] italic text-ink-faded">
          Tap headings to collapse sections &middot; <kbd className="rounded border border-border bg-parchment-warm/40 px-1 py-0.5 font-sans text-[10px]">Ctrl+K</kbd> to search
        </span>
      </div>
    </div>
  )
}
