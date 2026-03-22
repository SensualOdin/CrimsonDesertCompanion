import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Menu, X, ArrowUp } from "lucide-react"
import { guideData } from "@/data/guide-data"
import { categories } from "@/data/categories"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { HomePage } from "@/components/home/HomePage"
import { GuidePage } from "@/components/guide/GuidePage"

/* Read page key from URL on initial load */
const _initKey = new URLSearchParams(window.location.search).get("page")
const INIT_PAGE = _initKey && guideData[_initKey] ? _initKey : null

function buildCollapsed(key) {
  const s = {}
  if (key && guideData[key]) {
    guideData[key].content.forEach((b, i) => {
      if (b.type === "heading") s[i] = true
    })
  }
  return s
}

export default function App() {
  const [activePage, setActivePage] = useState(INIT_PAGE)
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedCats, setExpandedCats] = useState(() =>
    INIT_PAGE ? { [guideData[INIT_PAGE].category]: true } : {}
  )
  const [collapsed, setCollapsed] = useState(() => buildCollapsed(INIT_PAGE))
  const [showTop, setShowTop] = useState(false)
  const [allCol, setAllCol] = useState(!!INIT_PAGE)
  const [hlIdx, setHlIdx] = useState(null)
  const [hasNavigated, setHasNavigated] = useState(false)
  const contentRef = useRef(null)
  const bRefs = useRef({})
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!isMobile) setSidebarOpen(true)
  }, [isMobile])

  function toggleCat(cat) {
    setExpandedCats((prev) => ({ ...prev, [cat]: !prev[cat] }))
  }

  /* ── Navigation ───────────────────────────────────────────── */
  const navigateTo = useCallback(
    (key, bi) => {
      if (key && !guideData[key]) return
      setActivePage(key)
      if (key) setHasNavigated(true)

      // Build collapsed state — all sections collapsed
      const colState = buildCollapsed(key)

      // Auto-expand the section that contains the highlighted block
      if (key && bi !== undefined) {
        const blocks = guideData[key].content
        for (let i = bi; i >= 0; i--) {
          if (blocks[i]?.type === "heading") {
            colState[i] = false // expand this section
            break
          }
        }
      }

      setCollapsed(colState)
      setAllCol(bi === undefined && !!key)
      setHlIdx(bi !== undefined ? bi : null)
      if (isMobile) setSidebarOpen(false)

      // Push browser history
      const url = key
        ? `?page=${encodeURIComponent(key)}`
        : window.location.pathname
      history.pushState({ page: key || null }, "", url)
    },
    [isMobile]
  )

  /* ── Browser history (back / forward + initial state) ───── */
  useEffect(() => {
    // Replace current entry so first back-press works correctly
    history.replaceState(
      { page: INIT_PAGE },
      "",
      INIT_PAGE
        ? `?page=${encodeURIComponent(INIT_PAGE)}`
        : window.location.pathname
    )

    function onPopState() {
      const p = new URLSearchParams(window.location.search).get("page")
      const page = p && guideData[p] ? p : null
      setActivePage(page)
      setCollapsed(buildCollapsed(page))
      setAllCol(!!page)
      setHlIdx(null)
    }

    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  /* ── Keyboard shortcuts ──────────────────────────────────── */
  useEffect(() => {
    function onKeyDown(e) {
      // Ctrl/Cmd + K → focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        const input = document.getElementById("journal-search")
        if (input) {
          if (isMobile) setSidebarOpen(true)
          // Small delay for mobile sidebar animation
          setTimeout(() => input.focus(), isMobile ? 260 : 0)
        }
      }
      // Escape → clear search or close mobile sidebar
      if (e.key === "Escape") {
        if (searchQuery) {
          setSearchQuery("")
        } else if (isMobile && sidebarOpen) {
          setSidebarOpen(false)
        }
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [searchQuery, isMobile, sidebarOpen])

  // Scroll tracking
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    function h() {
      setShowTop(el.scrollTop > 400)
    }
    el.addEventListener("scroll", h, { passive: true })
    return () => el.removeEventListener("scroll", h)
  }, [])

  // Highlight flash + scroll reset
  useEffect(() => {
    bRefs.current = {}
    if (!contentRef.current) return
    if (hlIdx !== null) {
      setTimeout(() => {
        const ref = bRefs.current[hlIdx]
        if (ref) {
          ref.scrollIntoView({ behavior: "smooth", block: "center" })
          ref.classList.add("hl-flash")
          setTimeout(() => ref.classList.remove("hl-flash"), 2200)
        }
      }, 100)
    } else {
      contentRef.current.scrollTop = 0
    }
  }, [activePage, hlIdx])

  const pageData = activePage ? guideData[activePage] : null

  function toggleSection(hi) {
    setCollapsed((prev) => ({ ...prev, [hi]: !prev[hi] }))
  }

  function isVisible(bi) {
    if (!pageData || !pageData.content) return true
    let lh = null
    for (let i = bi - 1; i >= 0; i--) {
      if (pageData.content[i].type === "heading") {
        lh = i
        break
      }
    }
    if (lh !== null && collapsed[lh]) return false
    return true
  }

  function getCatNav() {
    if (!pageData || !pageData.category) return { prev: null, next: null }
    const cp = categories[pageData.category] || []
    const idx = cp.findIndex((p) => p.key === activePage)
    return {
      prev: idx > 0 ? cp[idx - 1] : null,
      next: idx < cp.length - 1 ? cp[idx + 1] : null,
    }
  }

  function scrollToTop() {
    if (contentRef.current)
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" })
  }

  function toggleAll() {
    if (!pageData) return
    const newState = {}
    const shouldCollapse = !allCol
    pageData.content.forEach((b, i) => {
      if (b.type === "heading") newState[i] = shouldCollapse
    })
    setCollapsed(newState)
    setAllCol(shouldCollapse)
  }

  function setRef(i) {
    return (el) => {
      bRefs.current[i] = el
    }
  }

  const catNav = getCatNav()

  return (
    <TooltipProvider>
      <div className="relative flex h-screen overflow-hidden bg-bark">
        {/* Hamburger */}
        <Button
          variant="default"
          size="icon"
          className="fixed top-2.5 z-[200] rounded-md shadow-lg"
          style={{ left: isMobile ? 10 : sidebarOpen ? 280 : 10 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Sidebar */}
        <AppSidebar
          activePage={activePage}
          navigateTo={navigateTo}
          expandedCats={expandedCats}
          toggleCat={toggleCat}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Main content */}
        <div
          ref={contentRef}
          className="parchment-surface relative flex-1 overflow-y-auto bg-parchment"
          style={{
            padding: isMobile ? "56px 18px 28px" : "28px 44px 28px 60px",
          }}
        >
          {!activePage ? (
            <HomePage
              navigateTo={navigateTo}
              setExpandedCats={setExpandedCats}
              isMobile={isMobile}
            />
          ) : pageData ? (
            <GuidePage
              pageData={pageData}
              activePage={activePage}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              allCol={allCol}
              toggleAll={toggleAll}
              toggleSection={toggleSection}
              isVisible={isVisible}
              navigateTo={navigateTo}
              setRef={setRef}
              bRefs={bRefs}
              catPrev={catNav.prev}
              catNext={catNav.next}
              isMobile={isMobile}
              setSidebarOpen={setSidebarOpen}
              hasNavigated={hasNavigated}
            />
          ) : null}
        </div>

        {/* Back to top */}
        {showTop && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="fixed bottom-5 right-5 z-50 rounded-full shadow-lg transition-transform hover:scale-110"
                onClick={scrollToTop}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Back to top</TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  )
}
