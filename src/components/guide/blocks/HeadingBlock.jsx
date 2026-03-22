import React from "react"
import { ChevronRight, Swords, Shield, Zap, Heart, Map, Crown, Flame, Target, Crosshair, Mountain, Wrench, Star, Skull, Sparkles, Compass, Waypoints, Users, Eye, Dumbbell, CircleDot } from "lucide-react"
import { cn } from "@/lib/utils"

/* keyword → icon mapping for section headings */
const headingIcons = [
  [/kill chain|combo|rotation|dual|mounted|strike/i, Swords],
  [/parr|block|dodge|armor|defend|guard/i, Shield],
  [/stagger|finish|stun|break/i, Target],
  [/stamina|spirit|resource|mana/i, Zap],
  [/heal|food|cook|recipe|potion|elixir|palmar/i, Heart],
  [/map|region|travel|tower|bell/i, Map],
  [/tier|rank|best|priority|top/i, Crown],
  [/fire|flame|element|imbue|burn|lightning|ice/i, Flame],
  [/range|bow|archery|rifle|pistol|shoot/i, Crosshair],
  [/environ|terrain|climb|travers|catapult|mount/i, Mountain],
  [/craft|refine|smith|upgrade|socket|mech/i, Wrench],
  [/core|philos|overview|intro|basic|general|control/i, Star],
  [/boss|enemy|threat|danger/i, Skull],
  [/skill|artifact|learn|observ|tree|progress/i, Sparkles],
  [/explor|hidden|secret|cave|ruin/i, Compass],
  [/quest|chapter|mission|story/i, Waypoints],
  [/companion|party|npc|faction|ally/i, Users],
  [/stealth|sneak|detect|disguis|mask|infiltr|vision/i, Eye],
  [/strength|stat|build|weapon|gear|armor setup/i, Dumbbell],
  [/force|axiom|palm|nature|snare|flash|bracelet/i, CircleDot],
]

function getHeadingIcon(text) {
  for (const [re, Icon] of headingIcons) {
    if (re.test(text)) return Icon
  }
  return null
}

export const HeadingBlock = React.forwardRef(
  ({ text, isCollapsed, onToggle, index }, ref) => {
    const Icon = getHeadingIcon(text)
    return (
      <h2
        ref={ref}
        id={`s-${index}`}
        className={cn(
          "heading-sweep relative z-[5] mt-6 mb-3 flex cursor-pointer select-none items-center gap-2 overflow-hidden rounded-t-sm border-b-2 border-border px-3 py-2.5 font-display text-base font-bold text-crimson-dark transition-all duration-200",
          "bg-gradient-to-br from-parchment-warm/40 to-parchment-warm/15 hover:from-parchment-warm/55 hover:to-parchment-warm/30",
          !isCollapsed && "border-b-crimson/30"
        )}
        onClick={onToggle}
      >
        {Icon && (
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-crimson/10">
            <Icon className="h-3.5 w-3.5 text-crimson/60" />
          </span>
        )}
        <span className="flex-1">{text}</span>
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 text-crimson-dark/30 transition-transform duration-200",
            !isCollapsed && "rotate-90"
          )}
        />
      </h2>
    )
  }
)
HeadingBlock.displayName = "HeadingBlock"
