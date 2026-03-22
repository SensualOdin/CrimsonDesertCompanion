import { useMemo } from "react"
import { guideData } from "@/data/guide-data"

export function useSearch(searchQuery) {
  return useMemo(() => {
    if (!searchQuery.trim()) return null
    const q = searchQuery.toLowerCase()
    const results = []

    Object.entries(guideData).forEach(([key, v]) => {
      const titleMatch = v.title.toLowerCase().includes(q)
      const tagMatch = v.tags.some((t) => t.includes(q))
      let blockIndex = -1
      let snippet = ""

      v.content.forEach((c, i) => {
        if (c.text && c.text.toLowerCase().includes(q) && blockIndex === -1) {
          blockIndex = i
          const idx = c.text.toLowerCase().indexOf(q)
          const s = Math.max(0, idx - 30)
          const e = Math.min(c.text.length, idx + q.length + 40)
          snippet =
            (s > 0 ? "\u2026" : "") +
            c.text.substring(s, e) +
            (e < c.text.length ? "\u2026" : "")
        }
        if (c.type === "table" && blockIndex === -1 && c.rows) {
          const found = c.rows.some((r) =>
            r.some((cl) => cl.toLowerCase().includes(q))
          )
          if (found) {
            blockIndex = i
            snippet = "Found in table"
          }
        }
      })

      if (titleMatch || tagMatch || blockIndex !== -1) {
        results.push({
          key,
          title: v.title,
          category: v.category,
          blockIndex,
          snippet,
        })
      }
    })

    return results
  }, [searchQuery])
}
