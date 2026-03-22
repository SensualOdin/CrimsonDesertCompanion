# Crimson Desert Companion -- Full Refactor Plan

## Goal
Refactor the monolithic app into a proper component architecture using **Tailwind CSS + shadcn/ui**, while preserving and elevating the field journal / parchment aesthetic.

---

## Phase 1: Infrastructure Setup

1. Install Tailwind CSS (v4 via Vite plugin), shadcn/ui, and dependencies
2. Create `src/` directory structure, move entry point
3. Configure `tailwind.config.js` with custom parchment theme tokens
4. Configure `components.json` for shadcn
5. Create `src/globals.css` with CSS custom properties, font imports, base styles
6. Update `vite.config.js` with `@` path alias
7. Install shadcn components via CLI:
   - `sidebar`, `input`, `table`, `collapsible`, `scroll-area`, `card`, `badge`, `button`, `sheet`, `command`, `breadcrumb`, `tooltip`

## Phase 2: Data & Hooks Extraction

8. Extract `guideData` object (~2200 lines) into `src/data/guide-data.js`
9. Extract category constants/helpers into `src/data/categories.js`
10. Extract custom hooks:
    - `use-is-mobile.js` -- viewport detection
    - `use-guide-navigation.js` -- activePage, collapse/expand, category nav
    - `use-search.js` -- search query + memoized results
    - `use-scroll.js` -- back-to-top, highlight flash

## Phase 3: Build Components (bottom-up)

### New File Structure
```
src/
  main.jsx
  App.jsx                          -- root layout
  globals.css                      -- tailwind + custom properties + fonts
  lib/
    utils.js                       -- cn() helper
  data/
    guide-data.js                  -- all 73 pages of game data
    categories.js                  -- category ordering, icons, helpers
  hooks/
    use-is-mobile.js
    use-guide-navigation.js
    use-search.js
    use-scroll.js
  components/
    ui/                            -- shadcn primitives (auto-generated)
    layout/
      AppSidebar.jsx               -- sidebar: logo, search, category nav
      ContentArea.jsx              -- main content pane w/ parchment texture
      MobileHeader.jsx             -- hamburger + title bar
    home/
      HomePage.jsx                 -- landing: hero, starter cards, category grid
      CategoryCard.jsx             -- category tile
    guide/
      GuidePage.jsx                -- single article view
      TableOfContents.jsx          -- jump-links + collapse-all toggle
      ContentBlock.jsx             -- dispatcher for block types
      blocks/
        IntroBlock.jsx
        HeadingBlock.jsx
        TipBlock.jsx               -- handles tip/warning/location/stat via variant
        TableBlock.jsx
        LinksBlock.jsx
        SubheadingBlock.jsx
      CategoryNav.jsx              -- prev/next buttons
    search/
      SearchResults.jsx            -- sidebar search list
      SearchPalette.jsx            -- Cmd+K command palette
    decorative/
      ParchmentTexture.jsx         -- SVG noise, vignette, ink effects
      Divider.jsx                  -- ornamental divider
```

### shadcn Component Mapping

| Current UI Element | shadcn Component | Notes |
|---|---|---|
| Sidebar | `Sidebar` + `SidebarMenu` + `SidebarMenuItem` | Full sidebar system |
| Mobile sidebar overlay | `Sheet` (side="left") | Replaces manual transform/overlay |
| Search input | `Input` | Styled with parchment colors |
| Cmd+K search | `Command` / `CommandDialog` | New feature! |
| Category collapse | `Collapsible` | In sidebar nav |
| Section collapse | `Collapsible` | In content headings |
| Data tables | `Table` / `TableHeader` / `TableBody` | Styled with dark-header parchment |
| Landing page cards | `Card` | Starter cards + category grid |
| Category/tag labels | `Badge` | Custom parchment variant |
| All buttons | `Button` | Variants: default, outline, ghost |
| Breadcrumb | `Breadcrumb` | "Home > Category > Page" |
| Back-to-top | `Button` + `Tooltip` | Fixed position, icon-only |
| Content scroll | `ScrollArea` | Main content pane |

## Phase 4: Design Elevation ("Anti-AI-Slop" Moves)

### Typography System
- **Page titles**: `font-display text-3xl` (Cormorant Garamond)
- **Section headings**: `font-display text-xl font-semibold`
- **Body text**: `font-body text-sm` (Alegreya)
- **UI labels/badges**: `font-sans text-xs uppercase tracking-wider` (Alegreya Sans)
- No more ad-hoc pixel sizes

### Color Palette (CSS Custom Properties)
| Role | Hex | Token |
|---|---|---|
| Sidebar bg | `#2e2418` | `--sidebar-background` |
| Parchment surface | `#e8dcc8` | `--background` |
| Parchment card | `#f4ede0` | `--card` |
| Crimson accent | `#8b1a1a` | `--accent` |
| Gold accent | `#8b6914` | `--primary` |
| Border tan | `#c4b49a` | `--border` |
| Text dark | `#3d3020` | `--foreground` |
| Text muted | `#8a7d6b` | `--muted-foreground` |
| Tip (gold) | `#b8960b` | `--tip` |
| Warning (crimson) | `#8b1a1a` | `--warning` |
| Location (teal) | `#2e6b5e` | `--location` |
| Stat (purple) | `#5b3a8a` | `--stat` |

### Key Design Improvements
1. **Replace Unicode symbols** (▸ ⚠ ◆ ⊕) **with lucide-react icons** -- consistent rendering, proper sizing
2. **Decorative elements as CSS pseudo-elements** -- declutter DOM, keep vignette + subtle noise texture
3. **Reduce decorative excess** -- fewer ink splatters, one vignette, let content breathe
4. **Consistent spacing** via Tailwind scale -- no more `padding: "7px 13px"`
5. **Centralized colors** via CSS variables -- no hardcoded hex in components
6. **Proper hover/focus states** -- shadcn provides these out of the box
7. **Better content block cards** -- subtle borders, proper shadows, consistent padding

## Implementation Order

1. Infrastructure setup (Tailwind, shadcn, directory structure)
2. Extract data files (guide-data.js, categories.js)
3. Create lib/utils.js, globals.css with theme
4. Extract hooks
5. Build decorative components (ParchmentTexture, Divider)
6. Build content block components (IntroBlock, TipBlock, etc.)
7. Build GuidePage (assembles blocks + breadcrumb + nav)
8. Build AppSidebar + SearchResults
9. Build HomePage
10. Build SearchPalette (Cmd+K)
11. Build App.jsx (root layout combining everything)
12. Wire up main.jsx, test everything
13. Remove old CrimsonDesertGuide.jsx
