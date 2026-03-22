# Crimson Desert Companion Guide

A comprehensive, searchable guide for Crimson Desert with a field journal aesthetic. Built with React + Vite.

## Features

- **73 pages** across 14 categories covering every game system
- **1578+ content blocks** — tips, tables, warnings, stat breakdowns, cross-links
- **Explorer's Field Journal** design with parchment textures, ink splatters, and worn leather sidebar
- Full-text search with jump-to-match
- Category navigation with collapsible sections
- In-page table of contents for long guides
- Mobile responsive

## Content Coverage

| Category | Pages | Highlights |
|----------|-------|------------|
| Combat | 8 | Basics, parrying, weapons tier list, unarmed/wrestling, dual wield, ranged, stealth, Axiom Bracelet |
| Characters & Builds | 4 | Full Kliff/Damiane/Oongka loadouts with weapon progression tables |
| Skills & Progression | 7 | Complete skill tree, best skills priority, elemental combat, Abyss Artifact farming |
| Boss Fights | 5 | Every campaign boss with phase breakdowns, drops table, strategy |
| Gear & Equipment | 9 | Armor, weapons, accessories, mining, refinement, dyes, unique locations |
| Cooking & Crafting | 3 | Recipe tables, alchemy/elixirs, ingredient sourcing |
| Exploration | 7 | Horses, dragon & ATAG mech, bell towers, fast travel, mounts, pets, fishing |
| World Guide | 4 | Chapter-by-chapter walkthrough, regions, weather, lanterns |
| + 5 more categories | 26 | Economy, puzzles, base building, side content, technical |

## Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npx vercel --yes --prod
```

Or connect this repo to Vercel for automatic deployments on push.

## Tech Stack

- React 18
- Vite 5
- Google Fonts (Cormorant Garamond, Alegreya, Alegreya Sans)
- Zero external UI libraries — fully custom field journal design
