import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Divider } from "@/components/decorative/Divider"
import { ContentBlock } from "./ContentBlock"
import { TableOfContents } from "./TableOfContents"
import { CategoryNav } from "./CategoryNav"
import { ChevronLeft, Menu } from "lucide-react"

export function GuidePage({
  pageData,
  activePage,
  collapsed,
  setCollapsed,
  allCol,
  toggleAll,
  toggleSection,
  isVisible,
  navigateTo,
  navigateToCat,
  setRef,
  bRefs,
  catPrev,
  catNext,
  isMobile,
  setSidebarOpen,
  hasNavigated,
}) {
  const headings = useMemo(() => {
    if (!pageData) return []
    return pageData.content
      .map((b, i) => (b.type === "heading" ? { text: b.text, index: i } : null))
      .filter(Boolean)
  }, [pageData])

  return (
    <div className="relative z-[5] mx-auto max-w-[700px]">
      {/* Back nav */}
      <div className="mb-2 flex min-h-[32px] items-center gap-1 font-sans text-[11px] font-semibold uppercase tracking-widest">
        <button
          onClick={() => navigateTo(null)}
          className="flex items-center gap-1 bg-transparent border-none p-0 text-crimson cursor-pointer hover:text-crimson-dark transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Journal
        </button>
        <span className="text-ink-faded/40">/</span>
        <button
          onClick={() => navigateToCat(pageData.category)}
          className="bg-transparent border-none p-0 text-crimson cursor-pointer hover:text-crimson-dark transition-colors"
        >
          {pageData.category}
        </button>
      </div>

      {/* Category + title */}
      <Badge
        variant="default"
        className="mb-1.5 cursor-pointer"
        onClick={() => navigateToCat(pageData.category)}
      >
        {pageData.category}
      </Badge>
      <h1 className="mb-1 font-display text-2xl font-bold leading-tight text-crimson-dark md:text-[34px]">
        {pageData.title}
      </h1>
      <Divider className="mb-3" />

      {/* Table of contents */}
      <TableOfContents
        headings={headings}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        allCol={allCol}
        toggleAll={toggleAll}
        bRefs={bRefs}
      />

      {/* Content blocks */}
      {pageData.content.map((block, i) => (
        <ContentBlock
          key={i}
          block={block}
          index={i}
          isVisible={isVisible(i)}
          isCollapsed={collapsed[i]}
          onToggleSection={toggleSection}
          onNavigate={navigateTo}
          setRef={setRef}
        />
      ))}

      {/* Mobile browse button — only on first page visit */}
      {isMobile && !hasNavigated && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="relative z-[5] mt-3.5 w-full rounded-md border border-border bg-parchment-warm/40 p-2.5 text-center font-sans text-xs font-semibold text-crimson cursor-pointer transition-colors hover:bg-parchment-warm/60"
        >
          <Menu className="mr-1.5 inline h-3.5 w-3.5" />
          Browse All Pages
        </button>
      )}

      <Divider className="mt-4" />

      {/* Category navigation */}
      <CategoryNav
        catPrev={catPrev}
        catNext={catNext}
        category={pageData.category}
        isMobile={isMobile}
        onNavigate={navigateTo}
      />
    </div>
  )
}
