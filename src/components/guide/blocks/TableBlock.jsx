import React from "react"
import { cn } from "@/lib/utils"

export const TableBlock = React.forwardRef(({ headers, rows }, ref) => (
  <div
    ref={ref}
    className="relative z-[5] my-3 overflow-x-auto rounded-sm border border-border/80 shadow-md"
  >
    <table className="w-full border-collapse font-sans text-xs">
      <thead>
        <tr>
          {headers.map((h, j) => (
            <th
              key={j}
              className="whitespace-nowrap border-b-2 border-gold/60 table-header-gradient px-3 py-2 text-left font-semibold tracking-wide text-gold-muted"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, j) => (
          <tr
            key={j}
            className="border-b border-parchment-warm/50 transition-all duration-150 hover:bg-gold/[0.07] even:bg-parchment-warm/15"
          >
            {row.map((cell, k) => (
              <td key={k} className={cn("px-3 py-2 text-ink", k === 0 && "font-medium")}>
                {cell || ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
))
TableBlock.displayName = "TableBlock"
