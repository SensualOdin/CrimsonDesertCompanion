import { guideData } from "./guide-data"

export const categories = {}
Object.entries(guideData).forEach(function ([key, val]) {
  if (!categories[val.category]) categories[val.category] = []
  categories[val.category].push({ key, title: val.title })
})

export const categoryOrder = [
  "Combat",
  "Characters & Builds",
  "Skills & Progression",
  "Boss Fights",
  "Gear & Equipment",
  "Puzzles",
  "Cooking & Crafting",
  "Exploration",
  "Economy & Reputation",
  "Base Building",
  "Side Content",
  "World Guide",
  "Tips & Tricks",
  "Technical",
]

export const categoryIcons = {
  Combat: "Swords",
  "Characters & Builds": "Diamond",
  "Skills & Progression": "TrendingUp",
  "Boss Fights": "Skull",
  "Gear & Equipment": "Shield",
  Puzzles: "Puzzle",
  "Cooking & Crafting": "CookingPot",
  Exploration: "Compass",
  "Economy & Reputation": "Coins",
  "Base Building": "Home",
  "Side Content": "Sparkles",
  "World Guide": "Globe",
  "Tips & Tricks": "Star",
  Technical: "Settings",
}
