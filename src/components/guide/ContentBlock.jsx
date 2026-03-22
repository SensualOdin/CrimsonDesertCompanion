import { IntroBlock } from "./blocks/IntroBlock"
import { HeadingBlock } from "./blocks/HeadingBlock"
import { SubheadingBlock } from "./blocks/SubheadingBlock"
import { TipBlock } from "./blocks/TipBlock"
import { StatBlock } from "./blocks/StatBlock"
import { TableBlock } from "./blocks/TableBlock"
import { LinksBlock } from "./blocks/LinksBlock"

export function ContentBlock({
  block,
  index,
  isVisible,
  isCollapsed,
  onToggleSection,
  onNavigate,
  setRef,
}) {
  if (!isVisible && block.type !== "heading") return null

  switch (block.type) {
    case "intro":
      return <IntroBlock ref={setRef(index)} text={block.text} />
    case "heading":
      return (
        <HeadingBlock
          ref={setRef(index)}
          text={block.text}
          index={index}
          isCollapsed={isCollapsed}
          onToggle={() => onToggleSection(index)}
        />
      )
    case "subheading":
      return <SubheadingBlock ref={setRef(index)} text={block.text} />
    case "stat":
      return <StatBlock ref={setRef(index)} text={block.text} />
    case "tip":
    case "warning":
    case "location":
      return (
        <TipBlock ref={setRef(index)} text={block.text} variant={block.type} />
      )
    case "table":
      if (block.headers && block.rows) {
        return (
          <TableBlock
            ref={setRef(index)}
            headers={block.headers}
            rows={block.rows}
          />
        )
      }
      return null
    case "links":
      if (block.pages) {
        return (
          <LinksBlock
            ref={setRef(index)}
            pages={block.pages}
            onNavigate={onNavigate}
          />
        )
      }
      return null
    default:
      return null
  }
}
