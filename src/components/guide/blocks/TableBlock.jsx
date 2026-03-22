import React from "react"

export const TableBlock = React.forwardRef(({ headers, rows }, ref) => (
  <div
    ref={ref}
    className="relative z-[5] my-2 overflow-x-auto rounded-sm border border-border shadow-sm"
  >
    <table className="w-full border-collapse font-sans text-xs">
      <thead>
        <tr>
          {headers.map((h, j) => (
            <th
              key={j}
              className="whitespace-nowrap border-b-2 border-gold bg-bark px-2.5 py-1.5 text-left font-semibold text-gold-muted"
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
            className="border-b border-parchment-warm/60 transition-colors hover:bg-gold/[0.06] even:bg-parchment-warm/20"
          >
            {row.map((cell, k) => (
              <td key={k} className="px-2.5 py-1.5 text-ink">
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
