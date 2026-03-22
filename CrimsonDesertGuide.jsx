import { useState, useMemo, useRef, useEffect } from "react";

const guideData = {
"combat-basics":{category:"Combat",title:"Combat Basics",
tags:["combat","basics","controls","kill chain","super armor","stamina","spirit","finisher","stagger","poise","healing","food"],
content:[
{type:"intro",text:"Combo-driven, fighting-game-inspired — not a Soulslike. Normal strikes are FREE (no stamina cost). Chain weapons, fists, kicks, grapples, and elemental magic into one continuous flow."},
{type:"heading",text:"Core Philosophy"},
{type:"tip",text:"Combat draws from Street Fighter and Samurai Shodown. Two-button combos trigger special moves. Directional inputs modify attacks. Learn inputs, not just timing."},
{type:"tip",text:"3 weapon slots active. Swap mid-combo seamlessly. Spear poke → dual sword flurry → greatsword finisher = one unbroken chain."},
{type:"tip",text:"Unarmed moves (kicks, grapples, slams) weave between ANY weapon combo. Always available, never need to unequip."},
{type:"warning",text:"Use a controller. Combat was designed around analog inputs. KB+M works but multi-button combos are harder to execute consistently."},
{type:"heading",text:"Controls Cheat Sheet"},
{type:"table",headers:["Action","Controller","KB+M"],
rows:[
["Light Attack","Square / X","Left Click"],
["Heavy Attack","Triangle / Y","Right Click"],
["Block/Parry","L1 / LB","CTRL"],
["Dodge","X / A (with direction)","Space"],
["Kick","Triangle / Y (context)","Shift+Right Click"],
["Grapple","Circle+Tri / B+Y","Q+E"],
["Lock On","R3 / RS Click","Tab"],
["Axiom Force","L2 / LT","Middle Click"],
["Force Palm","R3 charge","R charge"],
["Heal (Food)","Down D-pad","V"]
]},
{type:"heading",text:"Kill Chain System"},
{type:"tip",text:"Each kill briefly stuns nearby enemies. Rush kill-to-kill to keep the chain going. This is how you clear camps fast."},
{type:"tip",text:"Yellow combat XP bar (left of minimap) fills as you fight. Full bar = 1 Abyss Artifact. Never stop fighting."},
{type:"tip",text:"Blinding Flash (lantern + light attack): blinds group. Chain into Forward Slash spam with Nature's Echo clone = BFF combo."},
{type:"heading",text:"Stagger & Finishers"},
{type:"tip",text:"Bosses have a poise/stagger meter below health bar. Fills from hits + perfect parries."},
{type:"tip",text:"When stagger meter is full and boss kneels: press Light+Heavy simultaneously for devastating finishing blow."},
{type:"tip",text:"Unarmed skills (Lariat, Pump Kick, Meteor Kick) deal MORE stagger than weapon hits. Weave them into combos to stagger faster."},
{type:"tip",text:"Force Palm Expertise: stun bosses for finisher openings. The optimum boss strategy is stun → finisher loop."},
{type:"heading",text:"Super Armor"},
{type:"warning",text:"BLUE SPLASH on enemy = super armor active. Normal attacks bounce off. Need Rend Armor (Stab or Turning Slash upgrade) or guard-breakers to penetrate."},
{type:"tip",text:"When boss activates super armor: DISENGAGE. They usually follow with a heavy combo. Sprint to distance, wait for opening."},
{type:"heading",text:"Stamina & Spirit"},
{type:"tip",text:"Normal light/heavy attacks are FREE. Only dodges, blocks, special skills, and sprint drain Stamina."},
{type:"tip",text:"Spirit = mana. Powers Nature skills, Force Palm, elemental attacks. Regenerates on enemy kills (green glow on death)."},
{type:"tip",text:"Parrying regenerates BOTH Stamina and Spirit instantly. This is why parrying is the #1 fundamental."},
{type:"heading",text:"Healing & Food"},
{type:"tip",text:"Heal with food from inventory. No cooldown limit — eat as fast as you can press the button. Short animation."},
{type:"warning",text:"Grilled Meat meta: 1 cheap meat = 80 HP recovery. Buy cheap meats from Hernand vendor. Cook at pot to the right of vendor. 100 Grilled Meat = 8000 total HP. Costs almost nothing."},
{type:"tip",text:"Palmar Pills revive you on death. Keep 5+ in inventory for boss fights. Craft at alchemy table or buy from Witch."},
{type:"tip",text:"Higher-tier food (Hearty Grilled Meat: 220 HP) costs 12 meat each. WORSE value than cheap Grilled Meat. Quantity > quality."},
{type:"heading",text:"Environmental Combat"},
{type:"tip",text:"Topple structures onto enemies. Ignite oil traps. Launch cut trees. Ice arrows on water = platforms."},
{type:"tip",text:"Sprint + F/Y = flying kick knockdown. Works on horseback too."},
{type:"tip",text:"Force Palm on loose boulders/barrels = launch them into enemy groups. Environmental kills count for XP bar."},
{type:"heading",text:"Mounted Combat"},
{type:"tip",text:"Horseback: swing weapon with light/heavy attack. Charge through enemies. Horse can kick rear attackers."},
{type:"tip",text:"Bear mount: slash and bite attacks. High HP pool. Best ground combat mount."},
{type:"tip",text:"Dragon: Fireballs (R1, rapid) + Fire Breath (R2, sustained). Dive-bomb camps from above."},
{type:"tip",text:"ATAG mech: machine gun, cannon, EMP, ram. Walking tank for endgame encounters."},
{type:"links",pages:["parrying-dodging","unarmed-wrestling","dual-wield-weapons","ranged-combat","weapons-guide","best-skills"]}
]},
"parrying-dodging":{category:"Combat",title:"Parrying & Dodging",
tags:["parry","dodge","perfect dodge","keen senses","encounter","timing"],
content:[
{type:"intro",text:"Most important combat skill. Master this first."},
{type:"heading",text:"Parrying"},
{type:"tip",text:"LB/CTRL on impact. Interrupts combos, regenerates resources."},
{type:"tip",text:"Multi-hit combos: parry ONE hit to cancel entire combo."},
{type:"tip",text:"Lock-On auto-tracks teleporting enemies for timing focus."},
{type:"heading",text:"Keen Senses (TOP PRIORITY)"},
{type:"stat",text:"Lv1: Lock-on/guard (auto). Lv2: ENHANCED DODGE (generous i-frames). Lv3: ENCOUNTER (attack before hit = interrupt)."},
{type:"stat",text:"Lv2 perfect dodge has significantly more i-frames than basic dodge. First skill investment."},
{type:"heading",text:"Dodge"},
{type:"tip",text:"Costs stamina. Empty = can't evade = death. Invest Stamina stat early."}
]},
"weapons-guide":{category:"Combat",title:"Weapons Guide & Tier List",
tags:["weapons","sword","spear","axe","bow","pistol","rifle","hammer","dagger","mace","greatsword","knuckles","tier list","fated shadow","tauria","hwando","hollow visage","bekker"],
content:[
{type:"intro",text:"13 types. Equip 3, swap mid-combo. Every weapon is unique — no randomized stats, no duplicates. Named items with fixed properties."},
{type:"heading",text:"Tier List"},
{type:"table",headers:["Tier","Type","Notes"],
rows:[
["S+","Bare Hands","Best weapon. Wrestling extends every combo"],
["S","Greatsword","Massive cleave AoE. Kliff + Damiane"],
["S","Spear","Best poke. Broken Spear Evasive Slash = OP"],
["A","Sword & Shield","Safest all-around"],
["A","Rapier","Fastest DPS + bleed"],
["A","Bow","Focused Shot slow-mo"],
["A","Pistol","Dodge after shot, extends juggles"],
["B+","Axe","AoE cleave"],
["B","Hammer/Cannon/Rifle","Niche roles"],
["C","Mace/Dagger","Slow or stealth-only"]
]},
{type:"stat",text:"S+ — Bare Hands: Best weapon. Wrestling moves extend EVERY weapon's combos. Unmatched synergy."},
{type:"stat",text:"S — Greatswords: Massive cleaving AoE. Kliff + Damiane. S — Spears: Best poke. Broken Spear's Evasive Slash = OP."},
{type:"stat",text:"A — Sword & Shield: Safest all-around. A — Rapier: Fastest DPS + bleed. A — Bow: Focused Shot slow-mo. A — Pistol: Dodge after each shot, extends juggles."},
{type:"stat",text:"B+ — Axe: AoE cleave. B — Hammer/Cannon/Rifle: Niche roles."},
{type:"stat",text:"C — Mace: Slow, outclassed. C — Dagger: Stealth tool only, not combat."},
{type:"heading",text:"Best Weapons"},
{type:"table",headers:["Weapon","Type","Where","Key Feature"],
rows:[
["Fated Shadow","Sword (25 ATK)","Ch9 Goyen room side room","Highest base ATK. Greysoul Howling"],
["Tauria Curved Sword","Sword","Crowcaller drop (Ch5)","Best heavies. Crow's Pursuit"],
["Hwando","Sword","Lioncrest Manor (30c key)","Best early sword. Pre-loaded core"],
["Hollow Visage","Katana","Waterfall cave S of Reed Devil","Crit Rate + Atk Speed. Scales late"],
["Bekker Axes x2","Dual Axes","Underbridge after prologue","Instant dual-wield. New stance"],
["Sword of the Lord","Sword","Hornsplitter drop (Ch2)","Wind Slash gear extractable"],
["Absolution GS","Greatsword","Sanctum of Absolution (Ch5)","Wound of Darkness: wave on Turning Slash"]
]},
{type:"tip",text:"COMBO: Fated Shadow + Tauria gears = extra Turning Slash + ranged projectile heavies. Best DPS setup in the game."},
{type:"heading",text:"Mechanics"},
{type:"tip",text:"Weapon type changes stance, move tree, speed, stamina consumption, and range. Dual axes ≠ sword+axe ≠ one-handed. Important early decision."},
{type:"tip",text:"Keep ALL boss weapons. Extract Abyss Gears at Witch. Upgrade defaults first."},
{type:"location",text:"Wound of Darkness (Sanctum of Absolution greatsword, Ch5): projectile wave on Turning Slash."},
{type:"links",pages:["abyss-gears-witches","unique-gear-locations","kliff-builds"]}
]},
"axiom-bracelet":{category:"Combat",title:"Axiom Bracelet & Force",
tags:["axiom","force","force palm","telekinesis","elemental","blinding flash","nature snare","catapult"],
content:[
{type:"intro",text:"Elemental infusions, telekinesis — essential for combat, puzzles, gathering, and exploration."},
{type:"heading",text:"Axiom Force"},
{type:"tip",text:"L3: grab objects/enemies. Move, slam, throw. Environmental destruction."},
{type:"heading",text:"Force Palm"},
{type:"tip",text:"RS charge → punch. Activates mechanisms. Works CLIMBING + JUMPING."},
{type:"stat",text:"Lv3 shockwave = AoE hunting. Healing Palm (R3→L3/Tab) heals horse."},
{type:"tip",text:"Force Current (below Force Palm in tree): conduct energy through grapple → blow up ore deposits without pickaxe."},
{type:"heading",text:"Catapult Jump"},
{type:"tip",text:"Jump + R3 three times rapidly = launch upward. + Double Jump = massive height. Costs Spirit (recharge L3+R3/X)."},
{type:"heading",text:"Blinding Flash"},
{type:"tip",text:"Blinds enemies. Stuns boss charge attacks. Burns vegetation. Reveals cables. Spots Mysterious Energy."},
{type:"heading",text:"Nature's Snare"},
{type:"tip",text:"Absorbs ALL projectiles → fire back. Controller: Focus → rotate RS → press RS."},
{type:"heading",text:"Elements"},
{type:"tip",text:"Fire/Lightning/Ice on weapons. Ice arrows = water platforms. Boss weaknesses (White Horn = fire)."}
]},
"stealth-system":{category:"Combat",title:"Stealth & Infiltration",
tags:["stealth","sneak","crouch","dagger","backstab","disguise","mask","infiltration","detection","vision cone"],
content:[
{type:"intro",text:"Crimson Desert has a full stealth system with crouching, backstabs, disguises, and social infiltration. Not just for theft — many quests require stealth approaches."},
{type:"heading",text:"Stealth Controls"},
{type:"tip",text:"Crouch: L3 (controller) / C (PC). Reduces detection range. Move slowly through enemy camps."},
{type:"tip",text:"Stealth takedowns: approach unaware enemies from behind. Dagger = instant kill (stealth tool, not a combat weapon)."},
{type:"tip",text:"Distraction: throw objects (Axiom Force) to lure enemies away from posts."},
{type:"tip",text:"Vegetation cover: use bushes and tall grass for stealth approaches, especially when hunting wildlife."},
{type:"heading",text:"Detection System"},
{type:"tip",text:"Enemy vision cones shown on minimap. Stay out of the cone."},
{type:"tip",text:"Fog reduces enemy detection range — use weather to your advantage."},
{type:"tip",text:"Night reduces visibility for enemies (but also for you without lantern)."},
{type:"tip",text:"Caught = tossed out of restricted area (infiltration) or combat starts (camps)."},
{type:"heading",text:"Disguise System"},
{type:"tip",text:"Certain armor pieces grant faction disguises. Check inventory for 'Disguise' or 'Access: [Zone]' tag."},
{type:"tip",text:"Wearing correct faction attire = walk through restricted areas without alerting guards."},
{type:"tip",text:"Examples: Hernandian Attire for Hernand Castle, Scholastone Uniform for the Institute."},
{type:"tip",text:"Partial disguise sets give some benefit. Complete matching sets harder for enemies to see through."},
{type:"tip",text:"Disguise Cloak (Back Alley Shop, 20.88 Silver): Civilian Disguise effect for general stealth."},
{type:"heading",text:"Masks & Theft"},
{type:"tip",text:"Mask = gateway to crime. Equip via radial menu (F2/Left D-pad). Without mask, stealing is completely blocked."},
{type:"tip",text:"Mask on + crouch + hold interaction = steal objects. Red circle = active crime scene."},
{type:"tip",text:"Sprint into NPCs = pickpocket."},
{type:"warning",text:"UNEQUIP mask when done stealing — wearing mask also enables attacking NPCs, which can spiral badly."},
{type:"tip",text:"-5 Contribution per theft whether caught or not. Detected = bounty added."},
{type:"heading",text:"Infiltration Strategy"},
{type:"tip",text:"Key items can bypass guards entirely (visitor pass for St. Halssius House of Healing)."},
{type:"tip",text:"Windows = free alternative to locked doors. Climb exterior walls to find open windows."},
{type:"tip",text:"Observe NPC movement patterns. Wait for low-attention moments."},
{type:"tip",text:"Keep faction disguise armor in inventory even if stats are worse — many quests require specific disguises."},
{type:"tip",text:"Plan escape routes before attempting heists. Crowded areas = higher risk but better blend-in potential."},
{type:"links",pages:["crime","armor-system","hidden"]}
]},
"unarmed-wrestling":{category:"Combat",title:"Unarmed Combat & Wrestling",
tags:["unarmed","wrestling","grapple","Lariat","RKO","suplex","chokeslam","Body Slam","Pump Kick","Giant Swing","Clothesline","Dropkick","fists"],
content:[
{type:"intro",text:"Crimson Desert has a full WWE-inspired wrestling system. Grapples, kicks, and slams chain seamlessly into weapon combos. Bare hands are rated S+ tier — the best weapon in the game."},
{type:"heading",text:"Why Unarmed Matters"},
{type:"warning",text:"Unarmed skills deal MORE stagger damage than weapon attacks. Use them to break boss guards and open punish windows. Optimal loop: weapon pressure → unarmed stagger → weapon punish."},
{type:"tip",text:"Bare-handed strikes are always available. You never need to 'equip' fists. Chain them between any weapon combo seamlessly."},
{type:"tip",text:"Bare hands have their own damage stat. Upgradeable independently. Dedicated fists-only builds are viable through endgame with Force Palm + Elemental Imbue."},
{type:"heading",text:"Kick Moves (Always Available Row)"},
{type:"table",headers:["Move","Input","Stamina","Notes"],
rows:[
["Leg Sweep","Dodge toward + Circle/B","30","Default. Trips enemies."],
["Pump Kick","Triangle/Y while sprinting","40","Observe from Matthias. Flying double kick sends enemies flying."],
["Dropkick","X+Square / A+X while sprinting","50","Both feet forward. AoE knockback. Learn via observation."],
["Flying Kick","Triangle/Y in midair","40","Double kick from air. Gap closer."],
["Meteor Kick","Triangle/Y from high altitude","60","Devastating ground slam from above. Can Imbue with Lightning."],
["Vault","Triangle/Y near enemy","20","Hop over enemy, land behind. Repositioning tool."]
]},
{type:"heading",text:"Grappling Moves (Skill Tree)"},
{type:"table",headers:["Move","Input","Stamina","Unlock"],
rows:[
["Throw","Tri+Circle near enemy","40","Default. Grab and hurl."],
["Restrain","Tri+Circle during Stab","30","Default. Hostage/neck grab."],
["Lariat (RKO)","X+Square near enemy","60","Grappling Lv1. Slams enemy into ground."],
["Lariat Follow-up","X+Square during Lariat","60","Grappling Lv4. Chain a second slam."],
["Back Hang","X+Square near large enemy","10/sec","Grappling Lv2. Latch onto neck. Sustained damage on bosses."],
["Giant Swing","Tri+Circle during kick","20/sec","Grappling Lv3. Spin smaller enemies by legs, launch into allies."],
["Clothesline","X+Circle while sprinting","60","Observation (Black Bear faction, Paleon). Sprint slam."],
["Body Slam","Tri+Circle after Double Jump","60","Observation. Aerial grapple slam. Stuns if poise is low."]
]},
{type:"heading",text:"Unarmed Combat Skill (Blue Tree)"},
{type:"tip",text:"Unarmed Combat Lv1: basic punch combo + Leg Sweep. Lv2: Mastery I, proper punch chains with Triangle/Y."},
{type:"tip",text:"Lv3-5: Scissor Takedown, torrential barrage, advanced chains. Full investment = dedicated martial arts playstyle."},
{type:"tip",text:"Winch (Red Tree): use Axiom Force grappling hook to PULL enemies toward you, then immediately Clothesline or Lariat. Luchador playstyle."},
{type:"heading",text:"Wrestling Arenas"},
{type:"tip",text:"Kharonso Wrestling Pit: grapple-only matches. Basic strikes = instant disqualification. Use Lariat and Throws only."},
{type:"warning",text:"Beating the wrestling champion PERMANENTLY locks you out of the Kharonso pit. Throw matches on purpose first to practice and enjoy the moves."},
{type:"tip",text:"Goldenfist Arena: unarmed boxing. No leg sweeps, kicks, or body slams. Pure punching. Lock on immediately, sidestep left/right (never backward)."},
{type:"tip",text:"Defensive stats from your armor still apply in all arenas. Upgrade armor at smithy before entering."},
{type:"heading",text:"Boss Wrestling"},
{type:"tip",text:"Large bosses: cannot Giant Swing or throw. But Back Hang latches onto neck for sustained damage. Body Slam stuns if poise bar is low."},
{type:"tip",text:"Boss stagger: poise meter fills from attacks + perfect parries. When kneeling, press Light+Heavy for finishing blow."},
{type:"tip",text:"Optimal boss loop: parry → weapon combo → Lariat/Pump Kick (stagger) → Forward Slash chain (punish) → repeat."},
{type:"links",pages:["combat-basics","best-skills","weapons-guide","parrying-dodging"]}
]},
"dual-wield-weapons":{category:"Combat",title:"Dual Wielding & Weapon Swapping",
tags:["dual wield","weapon swap","Quick Swap","shield","two swords","moveset","Abyss Core","combo"],
content:[
{type:"intro",text:"Replace your shield with a second one-handed weapon for a completely different moveset. Or master Quick Swap to flow between 3 weapon types mid-combo."},
{type:"heading",text:"How to Dual Wield"},
{type:"tip",text:"Open radial menu (hold Left D-pad). Go to shield slot. Scroll to see your one-handed weapons. Select one to replace shield."},
{type:"tip",text:"Only one-handed weapons can dual wield. Two-handed weapons (greatswords, axes, hammers) cannot."},
{type:"tip",text:"Weapon combination does NOT affect moveset. Sword+Axe, Sword+Mace, Axe+Axe — all use the same dual-wield animations."},
{type:"heading",text:"Dual Wield vs Sword & Shield"},
{type:"table",headers:["","Dual Wield","Sword & Shield"],
rows:[
["Offense","Higher DPS, faster chains, more aggressive","Moderate DPS, combo into shield bash"],
["Defense","Can still block and parry (reduced vs shield)","Full block, better damage mitigation"],
["Best For","Camp clearing, mob fights, aggressive players","Boss fights, survivability, beginners"],
["Abyss Cores","Different core on each weapon = mixed effects","Core on weapon + shield core for defense"],
["Finishers","More brutal animations","Standard finishers"]
]},
{type:"tip",text:"Dual wielding rewards aggression. Hard-hitting R2/Heavy attacks and Finishers feel more devastating."},
{type:"warning",text:"For boss encounters, we recommend shield. Dual wield shines in open-world combat and camp raids."},
{type:"heading",text:"Oongka Dual Wield (Different)"},
{type:"tip",text:"Oongka's Dual Wielding Mastery (Armed Combat Lv4): wield TWO-HANDED weapons one-handed. Unique to Oongka."},
{type:"tip",text:"Equip Great Hammer in off-hand: buffs Rampage and Spinning Slash damage. His signature power combo."},
{type:"tip",text:"For Lava Myurdin boss: swap to two one-handed swords. Much faster than starting axe. Sword of the Lord casts wave attacks."},
{type:"heading",text:"Quick Swap (Armed Combat Lv5)"},
{type:"tip",text:"Instant weapon switch mid-combo with an attack transition. No animation pause. Pole vault kick when switching to spear."},
{type:"warning",text:"Kliff requires Quick Swap skill. Damiane and Oongka can swap by holding Left D-pad without the skill."},
{type:"tip",text:"Strategy: open with spear poke (range) → swap to dual swords (speed) → grapple throw → swap to greatsword (finisher). One seamless combo."},
{type:"heading",text:"Damiane Dual Wield"},
{type:"tip",text:"White Wind Rapier + Grace Rapier: double rapier setup. Swift I core + Destruction I core for speed + damage."},
{type:"tip",text:"Alternative: Rapier + Shield. Demenissian Gold-Plated Shield for survivability. Better for learning her kit."},
{type:"tip",text:"Rapier + Pistol (different from dual melee): Spencer Pistol for ranged fallback. Switch based on boss phase danger."},
{type:"links",pages:["weapons-guide","combat-basics","unarmed-wrestling","kliff-builds"]}
]},
"ranged-combat":{category:"Combat",title:"Ranged Combat & Archery",
tags:["ranged","bow","pistol","rifle","hand cannon","Focused Shot","Evasive Shot","archery","Charged Shot","Multishot"],
content:[
{type:"intro",text:"Bows, pistols, rifles, and hand cannons. Kliff is a melee fighter first, but ranged becomes powerful mid-game with the right skills."},
{type:"heading",text:"Weapon Types"},
{type:"table",headers:["Weapon","User","Style","Notes"],
rows:[
["Bow","Kliff","Precision, elemental arrows","Default ranged. Fire arrows = AoE explosion. Ice arrows = water platforms."],
["Pistol","Damiane","Quick shots, no aim needed","Fires without aiming. Fluid melee-to-ranged rotation."],
["Rifle","Kliff","High damage, slow reload","Two-handed. Sniper-style. Good for initiating."],
["Hand Cannon","Oongka","Heavy AoE, Scattershot","Easiest ranged weapon. Hits multiple targets in front."],
["Musket","Damiane","Long range, high single-hit","Two-handed. Best for hunting wildlife."]
]},
{type:"heading",text:"Key Ranged Skills"},
{type:"tip",text:"Archery Lv1: free (default). Upgrading improves draw time. Foundation for all bow combat."},
{type:"tip",text:"Focused Shot Lv3: PRIORITY ranged skill. Slow time while aiming. Mark multiple targets. Release = Charged Shot to each marked enemy. Spammable with enough Spirit."},
{type:"tip",text:"Evasive Shot Lv3: spin-dash while firing arrows in all directions. Mobile ranged combat. Prioritize Focused Shot first."},
{type:"tip",text:"Charged Shot: hold to charge, release for high-damage single arrow. Focus Charging Wind adds rapid follow-up arrows."},
{type:"tip",text:"Multishot: fires spread of arrows. Good for groups but less precise."},
{type:"tip",text:"Marksmanship: passive damage increase for all ranged weapons."},
{type:"heading",text:"Elemental Ranged"},
{type:"tip",text:"Switch to Fire element before bow volleys. Fire arrows EXPLODE on impact — AoE that hits clustered enemies."},
{type:"tip",text:"Ice arrows create temporary platforms on water surfaces. Exploration utility."},
{type:"tip",text:"Lightning arrows on wet enemies (rain, near water) = bonus damage + stun."},
{type:"tip",text:"Elemental Charged Shot and Elemental Scatter Shot: Oongka can modify hand cannon rounds with elements."},
{type:"heading",text:"Ranged Strategy"},
{type:"tip",text:"Early game: bow feels weak. Kliff is built for melee first. Skip heavy archery investment until mid-game."},
{type:"tip",text:"Mid-game with Focused Shot Lv3: ranged becomes extremely strong. Slow-mo multi-target is devastating."},
{type:"tip",text:"Use bow to pick off archers in guard towers before engaging melee. Stealth + ranged opener is efficient."},
{type:"tip",text:"Damiane's pistol is her best ranged tool. Focused Shot transforms it from poke tool into burst weapon."},
{type:"tip",text:"Oongka's Hand Cannon Scattershot: easiest ranged in the game. Point and blast. Good for interrupting."},
{type:"heading",text:"Hunting"},
{type:"tip",text:"Damiane's guns are best for hunting wildlife due to damage and range. Switch to her for farming meat/hides."},
{type:"tip",text:"Bow headshots on deer/elk = instant kill. Body shots = animal flees."},
{type:"tip",text:"Animals give 3-4 meat each. Groups of 5+ deer = 20 meat in seconds. Ride through woods on horseback."},
{type:"links",pages:["weapons-guide","best-skills","elemental-combat","cooking-recipes"]}
]},
"kliff-builds":{category:"Characters & Builds",title:"Kliff Build Guide",
tags:["Kliff","build","loadout","sword","shield","weapon","armor","Abyss Core","Ignir","Canta","Bolton","early","mid","late"],
content:[
{type:"intro",text:"Kliff is the main protagonist and only character for most quests. Versatile fighter who can sword-and-board, dual wield, go fists-only, or mix everything. Build him FIRST — neglecting Kliff cripples your playthrough."},
{type:"heading",text:"Weapon Progression"},
{type:"table",headers:["Phase","Weapon","ATK","Source","Notes"],
rows:[
["Prologue","Sword of the Wolf","8","Starting gear","Decent. Keep until Ch2."],
["Prologue","Bekker Axes (x2)","10 ea","Underbridge tree stump + rock","Unlocks dual-wield immediately. Fun but optional."],
["Ch2","Sword of the Lord","14","Hornsplitter drop","MAJOR upgrade. Wind Slash Abyss Gear. Use until Ch7."],
["Ch2","Hollow Visage","16","Waterfall cave near Reed Devil","Katana-style. Pre-loaded Abyss Core. Best early alt."],
["Ch4-5","Tauria Curved Sword","18","Crowcaller drop","Best heavy attack weapon. Core endgame with Nature's Echo."],
["Ch5","Fated Shadow","25","Ch9 Goyen side room","Highest raw ATK mid-game."],
["Ch7","Ignir Sword","20-45","Ludvig drop (Time to Face Justice)","BEST SWORD. 5 Abyss Core sockets. Endgame weapon."],
["Ch8","Shackle of Might","22","Fortain drop","Strong alt. Good Abyss Gear to extract."]
]},
{type:"heading",text:"Armor Setup"},
{type:"tip",text:"Bolton Plate Helm + Canta Plate Armor from Hernand Contribution vendor. Strong enough for the ENTIRE game. Upgrade to Tier 8+ at smithy."},
{type:"tip",text:"Plate Gloves of Fallen Kingdom: waterfall cave W of Hernand. No combat needed. Pre-loaded Abyss Cores (crit damage + ice resist). Scales well."},
{type:"tip",text:"Odeck's Protector Plate Boots: Sanctum of Temperance. 2 sockets. Solid defense."},
{type:"tip",text:"Paulenese Cloak: Pailune Contribution shop. Ice Resistance Lv3 — ESSENTIAL for Pailune/Demeniss regions."},
{type:"tip",text:"Lifsoth Large Shield: Witch's House 2F balcony. 12→35 DEF with refinement. 2 Abyss Core sockets. Best shield."},
{type:"warning",text:"No equip-load penalty in Crimson Desert. Plate armor does NOT slow you down. Always wear the heaviest armor available."},
{type:"heading",text:"Abyss Core Sockets"},
{type:"table",headers:["Priority","Core","Effect","Source"],
rows:[
["1","Crow's Pursuit","Crows track + damage enemies behind cover","Crowcaller boss weapons"],
["2","Wind Slash","Ranged projectile on heavy attacks","Sword of the Lord (extract at Witch)"],
["3","Groundsurge","Lava/rock eruption AoE","Myurdin Ch7 drop"],
["4","Swift","Attack speed increase","Sealed Artifact challenges"],
["5","Destruction","Attack power boost","Sealed Artifact challenges"],
["6","Fortification","Defense boost","Various drops"]
]},
{type:"tip",text:"Haste (movement speed) is NOT worth a socket. Kliff's base mobility is sufficient. Use the slot for offense or defense instead."},
{type:"tip",text:"Socket costs silver to create, but swapping cores is FREE once socketed. Experiment freely."},
{type:"heading",text:"Skill Spending Order"},
{type:"stat",text:"Artifacts 1-8: Health Lv4, Stamina Lv4 (alternate 1:1). Survival foundation."},
{type:"stat",text:"Artifacts 9-11: Keen Senses Lv3 (Dodge + Counter). Non-negotiable."},
{type:"stat",text:"Artifacts 12-14: Forward Slash Lv3 (Mastery = never miss)."},
{type:"stat",text:"Artifacts 15: Nature's Echo Lv1 (Echoing Forward Slash = free double damage)."},
{type:"stat",text:"Artifacts 16-20: Armed Combat Lv5 (Quick Swap), Grappling Lv2 (Lariat)."},
{type:"stat",text:"Mid-game: Imbue Elements, Force Palm Lv3+, Turning Slash Lv3 + Rend Armor."},
{type:"heading",text:"Combat Rotation"},
{type:"tip",text:"Mobs: Blinding Flash → Forward Slash spam (Nature's Echo clones each hit) → Lariat any stragglers → repeat."},
{type:"tip",text:"Bosses: parry/dodge → Force Palm (stagger) → 2x Heavy Attack → Quick Swap to Spear → punish → back off."},
{type:"tip",text:"Camps: Blinding Flash group → kill chain (each kill stuns nearby) → rush next target → repeat without stopping."},
{type:"links",pages:["best-skills","weapons-guide","accessories-shields","early-power-spike","boss-general"]}
]},
"damiane-builds":{category:"Characters & Builds",title:"Damiane Build Guide",
tags:["Damiane","build","rapier","pistol","glass cannon","Shield Sentinel","Smiting Bolt","Sword Flurry"],
content:[
{type:"intro",text:"Glass cannon swashbuckler. Rapier + pistol. Fastest attacks in the game but lowest defense. Unlocks Ch3. Absent for large story stretches — don't over-invest early."},
{type:"heading",text:"When You Play Damiane"},
{type:"tip",text:"Unlocks start of Ch3. Playable for select quests and free-roam. Some Ch8 fights force her (Lucian Bastier)."},
{type:"warning",text:"Focus resources on Kliff through Ch8. Damiane is unavailable for many story sections. Only invest in her once you have Kliff's core build solid."},
{type:"heading",text:"Weapon Setup"},
{type:"tip",text:"White Wind Rapier + Demenissian Gold-Plated Shield: starter setup. Reliable through mid-game."},
{type:"tip",text:"Dual Rapier: White Wind + Grace Rapier. Socket Swift I + Destruction I for speed + damage. Highest melee DPS."},
{type:"tip",text:"Spencer Pistol: ranged fallback. Fires without aiming. Switch to pistol during dangerous boss close-range phases."},
{type:"tip",text:"Musket: two-handed, long range. Best for hunting wildlife due to damage and range."},
{type:"heading",text:"Armor"},
{type:"tip",text:"Full Demenissian Elite Uniform (Ch3 starter set): solid through mid-game. Refine regularly to prevent damage fall-off."},
{type:"heading",text:"Key Skills"},
{type:"table",headers:["Priority","Skill","Why"],
rows:[
["S","Sword Flurry + Proficiency","Rapid melee burst. Gap-closing leap slash."],
["S","Piercing Light + Rend Armor","Gap closer + armor shred. Core melee kit."],
["S","Smiting Bolt + Sure Hit","Heavy attack = beam of light. Guaranteed accuracy = consistent ranged."],
["A","Shield Toss → Shield Sentinel Lv2","Floating sentry fires beams. Passive DPS with zero input."],
["A","Focused Shot + Evasive Shot","Pistol burst. Mark targets then volley."],
["A","Flurry of Kicks","Sets up finishers. Drives back groups."],
["B","Keen Senses Lv3","Dodge + Counter. Same priority as Kliff."],
["B","Skystep","Platforming upgrade. More of a requirement than a buff."]
]},
{type:"heading",text:"Combat Rotation"},
{type:"tip",text:"Rapier+Pistol: light attack gap close → 2 running attacks (4 hits) → dodge attack (Smite) → spam heavy attack (ranged AoE) → pistol Focused Shot when stamina depleted."},
{type:"tip",text:"Dual Rapier: charged Piercing Light gap close → running attack (3 hits) → dodge Smite → 2x heavy attack → repeat."},
{type:"tip",text:"Boss danger phase: switch to pistol mode. Spam Focused Shot from safe distance. Return to melee when opening appears."},
{type:"links",pages:["best-skills","dual-wield-weapons","ranged-combat"]}
]},
"oongka-builds":{category:"Characters & Builds",title:"Oongka Build Guide",
tags:["Oongka","build","axe","hammer","dual wield","Hand Cannon","Quaking Fury","Rampage","brute"],
content:[
{type:"intro",text:"Orc bruiser. Two-handed weapons. Highest raw damage but slowest. Unlocks end of Ch7. Some Ch8 bosses FORCE Oongka — keep him geared."},
{type:"heading",text:"When You Play Oongka"},
{type:"tip",text:"Unlocks after Lava Myurdin at Ashclaw Keep, end of Ch7 (Incomplete Victory)."},
{type:"warning",text:"Ch8: One-Armed Ludvig FORCES Oongka. If he's undergeared, you'll hit a wall. Keep his equipment refined even before you unlock him (stat upgrades carry over)."},
{type:"heading",text:"Weapon Setup"},
{type:"tip",text:"Starting Great Axe: TOO SLOW for Ludvig fight. Immediately swap to two one-handed swords."},
{type:"tip",text:"Sword of the Lord: give to Oongka for wave attacks during forced fights. It's in shared inventory."},
{type:"tip",text:"Two purple axes (auto in inventory): decent fallback. Faster than great axe."},
{type:"tip",text:"Endgame: Dual Wielding Mastery (Armed Combat Lv4) = wield TWO-HANDED weapons one-handed. Great Hammer off-hand buffs Rampage + Spinning Slash."},
{type:"tip",text:"Hand Cannon: easiest ranged weapon. Scattershot hits multiple targets. Good for interrupts."},
{type:"heading",text:"Key Skills"},
{type:"table",headers:["Priority","Skill","Why"],
rows:[
["S","Dual Wielding Mastery","Defining skill. Two-handed weapons one-handed. Off-hand Hammer buffs Rampage/Spinning."],
["S","Rampage + Sure Hit","Guaranteed accuracy on strongest moves. Essential boss DPS."],
["S","Quaking Fury + Rend Armor","AoE earthquake. Shatters defense. Boss-killer."],
["A","Explosive Strike","Devastating single-target. Full investment worthy."],
["A","Rage","Super Armor state. Ignore hits while charging. Pairs with slow Hammer attacks."],
["A","Keen Senses Lv3","Dodge + Counter. Same as other characters."],
["B","Vertical Flight","Rocket Pack control. Only if you've unlocked the jetpack via Gorthak research."],
["B","Hand Cannon + Scattershot","Ranged interrupts. Low priority vs melee focus."]
]},
{type:"heading",text:"Combat Style"},
{type:"tip",text:"Wide 360-degree arc attacks. Less precise aiming needed than Kliff or Damiane."},
{type:"tip",text:"Spinning axe + ground slams + shockwaves. Grab enemies and use them as weapons (projectiles into groups)."},
{type:"tip",text:"Ludvig fight: parry with weapon (no shield) → light attack combos. Dodge > block for his lightning phase. Heal while attacking."},
{type:"tip",text:"Most beginner-friendly character. Straightforward combos. High damage + survivability = wade into groups."},
{type:"links",pages:["best-skills","dual-wield-weapons","unarmed-wrestling","boss-mid-late"]}
]},
"companions-party":{category:"Characters & Builds",title:"Companion & Party System",
tags:["companion","party","summon","ally","follow","combat","damiane","oongka","character swap","trust","echoes"],
content:[
{type:"intro",text:"Up to 3 companions can travel and fight alongside Kliff. Summoning is easy but the game barely explains it. Cannot be used during main story quests or boss fights."},
{type:"heading",text:"How to Summon"},
{type:"tip",text:"F1 (PC) or hold Up D-pad (controller) to open Character Wheel. Select character with Right Stick. Press Space/X/A to summon."},
{type:"tip",text:"Press Options/Start/ESC to finalize. Screen goes black, companion spawns at your location."},
{type:"tip",text:"Can summon BOTH Damiane and Oongka at once. Use 'Gather' option (hold Start, scroll to bottom) to group them."},
{type:"tip",text:"Companions auto-engage enemies, call their own horses when you mount, and follow through exploration."},
{type:"tip",text:"To dismiss: open Character Wheel again, select character, press Space/A to disband."},
{type:"heading",text:"Limitations"},
{type:"warning",text:"Companions CANNOT be used during main story quests or major boss fights. Game forces you to dismiss them before triggering story missions."},
{type:"tip",text:"Designed for: open-world exploration, faction base clearing, stronghold liberation, side content."},
{type:"tip",text:"If a character is needed for an active quest, they won't be available to summon."},
{type:"heading",text:"Character Wheel"},
{type:"tip",text:"2 empty slots visible after unlocking everyone. Pearl Abyss hasn't confirmed what they're for — likely future DLC characters or hidden mounts."},
{type:"tip",text:"Switching characters (not just summoning) teleports you to wherever that character currently is in the world."},
{type:"heading",text:"Companion Trust"},
{type:"tip",text:"Built through: fighting together, sharing meals at camp, giving gifts, completing companion-specific quests, choices aligned with Greymane values."},
{type:"tip",text:"High trust = better dispatch missions, more useful combat AI, deeper personal backstory, access to Echoes of the Past flashback missions."},
{type:"tip",text:"Echoes of the Past: playable flashbacks revealing Greymane origins, formative battles, and Gian's original vision. Unlock at trust thresholds."},
{type:"heading",text:"Reunion Quests"},
{type:"tip",text:"After story events scatter the Greymanes, Kliff must track down each companion across Pywel."},
{type:"tip",text:"Reunion quests involve meaningful story content — companions may need convincing to rejoin. Pre-separation trust carries over."},
{type:"heading",text:"Strategy Tips"},
{type:"warning",text:"Abyss Artifacts are SHARED across all characters. Don't bankrupt Kliff by dumping points into Oongka/Damiane. Kliff fights all mandatory bosses alone."},
{type:"tip",text:"Companions draw aggro and soak damage — makes liberating bandit strongholds much easier."},
{type:"tip",text:"Station unused characters at useful locations (shops, blacksmiths) for character-swap teleporting."},
{type:"links",pages:["kliff-builds","damiane-builds","oongka-builds","respec"]}
]},
"skills-progression":{category:"Skills & Progression",title:"Skill Tree & Abyss Artifacts",
tags:["skill tree","abyss artifact","stamina","spirit","health","blue","green","red","branch","level up","progression","Falling Palm"],
content:[
{type:"intro",text:"NO traditional leveling. Abyss Artifacts fuel a three-branch skill tree. Each branch has stat nodes + combat skills. Complete one entire branch to unlock the devastating Falling Palm capstone."},
{type:"heading",text:"How Progression Works"},
{type:"tip",text:"Abyss Artifacts = your skill points. Spend them on stat boosts (Health/Stamina/Spirit) or unlock/upgrade combat abilities."},
{type:"tip",text:"Normal weapon strikes do NOT consume stamina. Only dodges, special skills, and advanced moves drain stamina. This keeps combat fast."},
{type:"tip",text:"Each character (Kliff, Damiane, Oongka) has their own separate skill tree. Stat upgrades carry across all characters, individual skills do NOT."},
{type:"warning",text:"Abyss Artifacts also used for max-level gear refinement. Don't spend them all on skills — save some for endgame weapon upgrades."},
{type:"heading",text:"Blue Branch (Stamina)"},
{type:"tip",text:"Stamina (up to Lv14): governs dodge, block, sprint, AND glide distance. Most important early stat alongside Health."},
{type:"tip",text:"Armed Combat (Lv5): bread-and-butter melee. Unlocks Evasive Slash, Charge, Rush, Quick Swap. Level 5 = Quick Swap (instant weapon switch mid-combo with attack)."},
{type:"tip",text:"Forward Slash (Lv3): your heavy attack chain. Improved Forward Slash I + Mastery = guaranteed hits. Core of the BFF combo."},
{type:"tip",text:"Turning Slash (Lv3): charge heavy attack. Proficiency lets you chain other skills into it. Rend Armor ignores enemy super armor."},
{type:"tip",text:"Stab + Rend Armor: raw damage increase + ignores boss defense. High priority for boss fights."},
{type:"tip",text:"Unarmed Combat (Lv5): punch combos, Scissor Takedown, torrential barrage. Fully invested = viable fists-only playstyle. S+ tier damage."},
{type:"tip",text:"Grappling (Lv5): wrestling moves. Throw, Lariat (ground slam, AoE), Back Hang, Clothesline (sprint slam), Body Slam (aerial)."},
{type:"tip",text:"Archery (Lv5): bow skills. Marksmanship, Multishot, Evasive Shot (dodge + shoot), Charged Shot."},
{type:"heading",text:"Green Branch (Spirit)"},
{type:"tip",text:"Spirit (up to Lv14): functions like mana. Regenerates on enemy kills (green glow). Powers Nature skills and Force Palm."},
{type:"tip",text:"Keen Senses (Lv3): MUST-HAVE. Lv1 = Parry. Lv2 = Dodge (timed invincibility). Lv3 = Counter (attack to interrupt). Foundation of survival."},
{type:"tip",text:"Nature's Echo (Lv3): phantom clone mimics your attacks. Doubles damage output. Requires Keen Senses Lv3 + Forward Slash Lv3."},
{type:"tip",text:"Sub-skills: Echoing Forward Slash (free damage on heavies), Echoing Spinning Slash, Echoing Stab. Level 1 is enough for the Forward Slash echo."},
{type:"tip",text:"Nature's Snare (Lv3): rotating energy barrier that blocks projectiles. Nature's Retribution = discharge stored energy as attack. Nature's Veil = anchor barrier in place."},
{type:"tip",text:"Focus: bullet-time. Low Spirit drain. Focused Insight = parry ANY melee attack during Focus. Kind of broken for bosses."},
{type:"tip",text:"Force Palm (Lv5): energy punch that reduces armor. Also a traversal tool. Lv5 + Double Jump = 6 total jumps (double jump + 4 palm strikes)."},
{type:"tip",text:"Force Current: channels Force Palm through Axiom Force grapple for long-range attack. Also destroys mineral deposits and trees faster than manual gathering."},
{type:"heading",text:"Red Branch (Health)"},
{type:"tip",text:"Health (up to Lv18): smallest branch but critical. Start with Health Lv4 minimum to survive early bosses."},
{type:"tip",text:"Fist of Flame: fire-imbued charge forward. Can cast during other skills. Unlocks from Tree of Slumber Abyss puzzle."},
{type:"tip",text:"Mantle of Frost: freezing protective barrier. Unlocks from Path of Trials Abyss puzzle (Pailune, Spire of Ringing Truth)."},
{type:"tip",text:"Surge of Sparks: electricity shock area on ground. Lightning stun is shorter than freeze but activates faster."},
{type:"tip",text:"Imbue Elements (Lv4): requires Fist of Flame + Mantle of Frost. Apply your active element to heavy attacks, charged shots, Force Palm, Meteor Kick."},
{type:"tip",text:"Flight + Swift Flight: gliding. Hovering in place = no stamina cost. Moving = drains stamina. Swift Flight = faster glide (costs more stamina)."},
{type:"tip",text:"Mystical Storage: seal objects in Kuku Iron Pot using Axiom Force. Puzzle utility."},
{type:"tip",text:"Veil of Fog: deploy smoke to escape line of sight. Stealth utility."},
{type:"heading",text:"Falling Palm (Capstone)"},
{type:"warning",text:"Center of tree where all 3 branches converge. Complete ANY one full branch to unlock. Consumes ALL remaining stamina for massive ground-slam. Higher Stamina pool = higher damage."},
{type:"heading",text:"Earning Abyss Artifacts"},
{type:"table",headers:["Source","Details","Notes"],
rows:[
["Combat XP Bar","Golden bar left of minimap. Fill by killing enemies = 1 Artifact","No limit. Farm Blockaded areas"],
["Sealed Artifacts","141 total on stone altars along roads. Purple minimap icon","Use Guiding Light (L1+R1) for blue shimmer"],
["Main Quests","Ch2, Ch4, major bosses","Guaranteed drops"],
["Greymane Rumors","Faction quests tab. Short escort missions","Most time-efficient source"],
["Abyss Puzzles","Floating island puzzles. Activate spire = 1 Artifact","Also unlock fast travel"],
["Witch Vendors","28.50 Silver each. Limited stock, no restock","Supplement only"],
["Patrigio","Wandering merchant on roads. Secret Shop. 28.50 Sv","Found near Springtide Mill Ch3"],
["Arm Wrestling","Beat all wrestlers at Hernand Tavern","One-time reward"]
]},
{type:"heading",text:"Priority Spending"},
{type:"stat",text:"First 10 Artifacts: Health Lv4, Stamina Lv4. Alternate 1:1. Survival first."},
{type:"stat",text:"Next 5: Keen Senses Lv3 (Dodge + Counter). Non-negotiable."},
{type:"stat",text:"Then: Armed Combat Lv3, Nature's Echo Lv1 (Echoing Forward Slash), Forward Slash Lv3."},
{type:"stat",text:"Mid-game: Grappling Lv2 (Lariat), Imbue Elements, Force Palm Lv3."},
{type:"stat",text:"Late: Fill Health to Lv10+, complete one branch for Falling Palm."},
{type:"tip",text:"Skip Archery early — Kliff is a melee fighter first. Ranged becomes good with Focused Shot Lv3 mid-game."},
{type:"links",pages:["best-skills","elemental-combat","observation-learning","respec","abyss-farming"]}
]},
"observation-learning":{category:"Skills & Progression",title:"Observation Learning",
tags:["observation","learn","free","watch","boss","skill","missable","Pump Kick","Evasive Roll","Clothesline"],
content:[
{type:"intro",text:"Learn skills for FREE by watching enemies perform them. Saves Abyss Artifacts. Some are permanently missable if you skip the encounter."},
{type:"heading",text:"How It Works"},
{type:"tip",text:"Time slows when Kliff observes a unique enemy maneuver. Camera must face the action. Hold L1/LB for 2-3 seconds."},
{type:"tip",text:"See the move a few times before it registers. A green flash confirms you learned it."},
{type:"tip",text:"If you already spent an Artifact on a skill you later learn through observation, the Artifact cost is REFUNDED."},
{type:"tip",text:"Learned skills survive respec. They cost nothing so they're never lost."},
{type:"heading",text:"Known Observation Skills"},
{type:"table",headers:["Skill","Source","Chapter","Notes"],
rows:[
["Pump Kick","Matthias (boss)","Prologue","Can cheese. Let him kick you repeatedly."],
["Evasive Roll","Hornsplitter (boss)","Ch2","Watch his dodge animation. Critical defensive skill."],
["Swift Stab","Reed Devil (boss)","Ch3","Watch quick thrust attacks."],
["Aerial Roll","Crowcaller (boss)","Ch5","Watch mid-air dodge maneuver."],
["Clothesline","Black Bear faction NPC","Ch5+","Paleon region. Let enemy perform it on you. Sprinting slam."],
["Counter","Hernand Guard","Ch1+","Arena near Lioncrest Manor. Watch guard spar."],
["Dropkick","Various enemies","Mid-game","Watch enemy NPCs in brawls."],
["Body Slam","Boss encounters","Varies","Watch boss grapple attacks."]
]},
{type:"heading",text:"Tips"},
{type:"warning",text:"Some observation skills ONLY appear during specific quests or boss fights. If you skip or rush, you miss them permanently."},
{type:"tip",text:"Always watch new bosses for 30 seconds before attacking. Let them cycle through their full moveset."},
{type:"tip",text:"Observation locations appear on your map with unique icons. Visit them during exploration."},
{type:"tip",text:"Priority: learn Evasive Roll (Hornsplitter) and Counter (Hernand Guard) ASAP. Both are essential and save 1 Artifact each."},
{type:"links",pages:["skills-progression","best-skills","respec","boss-general"]}
]},
"respec":{category:"Skills & Progression",title:"Respec & Skill Reset",
tags:["respec","reset","faded abyss artifact","skill tree","refund","craft","scholastone"],
content:[
{type:"intro",text:"Full skill tree reset using Faded Abyss Artifacts. Rare consumable — use strategically. Resets ALL three characters simultaneously."},
{type:"heading",text:"How to Respec"},
{type:"tip",text:"Skills menu → bottom right 'Reset All' → hold F (PC) / Square (PS5) / X (Xbox). Requires 1 Faded Abyss Artifact in inventory."},
{type:"tip",text:"All spent Abyss Artifacts refunded. Entire skill tree wiped clean across ALL characters."},
{type:"warning",text:"CANNOT reset individual skills or individual characters. It's all or nothing."},
{type:"tip",text:"Watch and Learn abilities are KEPT — they cost no Artifacts so they survive respec."},
{type:"heading",text:"CRITICAL WARNING"},
{type:"warning",text:"Resetting ONE character resets ALL THREE (Kliff, Damiane, Oongka). Must manually rebuild every character after each respec."},
{type:"tip",text:"ALWAYS manual save before respeccing. Test new build on low-level bandits. Hate it? Reload save instead of wasting another Faded Artifact."},
{type:"heading",text:"Finding Faded Abyss Artifacts"},
{type:"warning",text:"First one: Ch1 main quest 'Trace' — chest in Hernand Castle portal room. DON'T MISS IT."},
{type:"tip",text:"Second: completing Ch1 'Woman in White' quest reward."},
{type:"tip",text:"Sealed Abyss Artifact challenges: some reward Faded versions. Check Journal → Challenges."},
{type:"tip",text:"Abyss treasure chests: floating islands have unmarked chests with high chance of Faded Artifacts."},
{type:"tip",text:"Witch vendors: sell Faded Abyss Artifacts (2.85 Silver each, ~3 per vendor)."},
{type:"heading",text:"Crafting Your Own"},
{type:"tip",text:"Ch4: Visit Scholastone → complete main objective → lead researcher offers research projects."},
{type:"stat",text:"'Research on the Abyss Energy Restoration Phenomenon': 12 Silver, 8 hours → Faded Abyss Artifact BLUEPRINT."},
{type:"tip",text:"Craft at any Witch cauldron. Materials: 1x Abyss Cell (Abyss-corrupted creatures near Nexus teleporters) + 2x Mercury (freezing pools in Hexe Sanctuary/Silver Wolf Mountains)."},
{type:"heading",text:"When to Respec"},
{type:"tip",text:"Before a boss wall — redirect points into Health/Stamina/Keen Senses."},
{type:"tip",text:"When switching primary weapon type (each weapon changes entire moveset)."},
{type:"tip",text:"After learning several Watch and Learn skills — build around your free foundation."},
{type:"links",pages:["skills-progression","research-institutes","observation-learning"]}
]},
"best-skills":{category:"Skills & Progression",title:"Best Skills Priority Guide",
tags:["best skills","priority","BFF","Blinding Flash Finisher","Nature's Echo","Keen Senses","unlock order","combo"],
content:[
{type:"intro",text:"Recommended unlock order and the most impactful skills in the game. Built around the BFF combo that trivializes most encounters."},
{type:"heading",text:"The BFF Combo (Blinding Flash Finisher)"},
{type:"warning",text:"The single most powerful skill loop in Crimson Desert. Activate Blinding Flash (lantern + light attack) facing enemies. Enemies stunned. Spam heavy attack (Forward Slash) while stunned. Nature's Echo clones your Forward Slash for double damage. Works on mobs AND certain boss phases."},
{type:"stat",text:"Requirements: Blinding Flash (story unlock) + Forward Slash Lv3 + Nature's Echo Lv1. Total cost: ~8 Abyss Artifacts beyond prerequisites."},
{type:"heading",text:"Kliff Priority S-Tier"},
{type:"table",headers:["Skill","Why","Cost"],
rows:[
["Health Lv4+","Survive early bosses. Alternate with Stamina","4+ Artifacts"],
["Stamina Lv4+","Dodge, block, sprint, glide. Core resource","4+ Artifacts"],
["Keen Senses Lv3","Lv2 = Dodge. Lv3 = Counter. Foundation of defense","3 Artifacts"],
["Nature's Echo Lv1","Echoing Forward Slash. Free damage on every heavy attack","1 Artifact"],
["Forward Slash Lv3","Mastery = never miss. Feeds into BFF combo","3 Artifacts"],
["Armed Combat Lv5","Evasive Slash, Quick Swap. Quick Swap is a game-changer","5 Artifacts"],
["Grappling Lv2","Lariat = AoE ground slam. Destroys groups + structures","2 Artifacts"]
]},
{type:"heading",text:"Kliff A-Tier"},
{type:"tip",text:"Force Palm Expertise: stun bosses for finishers. Optimum boss strategy = stun → finisher loop."},
{type:"tip",text:"Focus + Focused Insight: parry ANY melee attack in Focus mode. Infinite uses. Kind of broken against bosses."},
{type:"tip",text:"Turning Slash Lv3 + Proficiency: chain other skills into it. Rend Armor bypasses super armor on elites."},
{type:"tip",text:"Stab + Rend Armor: raw damage boost + ignores boss defense. Pairs with Lariat for stagger chains."},
{type:"tip",text:"Force Current: long-range Force Palm via grapple. Destroys gathering nodes instantly. Huge QoL for mining/logging."},
{type:"tip",text:"Axiom Force Aerial Swing: better platforming. Check stamina cost — you might need more Stamina to use it."},
{type:"heading",text:"Kliff B-Tier (Mid-Late)"},
{type:"tip",text:"Swift Flight Lv2: faster glide. Great for traversal but stamina-hungry."},
{type:"tip",text:"Double Jump: inconsistent trigger. Sometimes Kliff glides instead. Still useful."},
{type:"tip",text:"Focused Shot Lv3: slow time, mark multiple targets, release volley. Strong ranged option mid-game."},
{type:"tip",text:"Evasive Shot Lv3: spin-dash while firing arrows. Mobile ranged combat. Prioritize Focused Shot first."},
{type:"tip",text:"Nature's Snare Lv3: blocks ALL projectiles. Discharge for damage. Essential vs spellcasters."},
{type:"heading",text:"Damiane Priority"},
{type:"tip",text:"Sword Flurry + Proficiency: rapid melee burst. Gap-closing leap slash."},
{type:"tip",text:"Piercing Light + Rend Armor: gap closer + armor shredding. Core of her melee kit."},
{type:"tip",text:"Smiting Bolt + Sure Hit: heavy attack = beam of light. Guaranteed accuracy = consistent ranged damage."},
{type:"tip",text:"Shield Toss → Shield Sentinel Lv2: floating sentry turret fires beams. Passive DPS with zero input."},
{type:"tip",text:"Focused Shot + Evasive Shot: pistol becomes a burst weapon. Mark targets then release volley."},
{type:"tip",text:"Flurry of Kicks: sets enemies up for finishers. Great for driving back groups."},
{type:"heading",text:"Oongka Priority"},
{type:"tip",text:"Dual Wielding Mastery (Armed Combat Lv4): wield two-handed weapons one-handed. Buffs Rampage + Spinning Slash. His DEFINING skill."},
{type:"tip",text:"Rampage + Sure Hit: guaranteed accuracy on his strongest moves. Essential for boss DPS."},
{type:"tip",text:"Quaking Fury + Rend Armor: AoE earthquake. Shatters defense. Boss-killer."},
{type:"tip",text:"Explosive Strike: devastating single-target. Worth full investment."},
{type:"tip",text:"Rage: Super Armor state. Ignore incoming hits while charging weapon. Pairs with slow Hammer/Axe attacks."},
{type:"tip",text:"Vertical Flight: Rocket Pack control. If you have Oongka's jetpack, this makes it usable."},
{type:"heading",text:"Universal Priority"},
{type:"warning",text:"Invest Health/Stamina/Spirit evenly across chapters. Raise all by 1 every couple chapters. Don't neglect stats for flashy skills."},
{type:"tip",text:"Check skill Stamina/Spirit costs BEFORE buying. Axiom Force Aerial Swing costs more Stamina than you might have early."},
{type:"tip",text:"Focus Kliff's tree through Ch8. Damiane is unavailable for large story stretches. Don't waste early resources on her."},
{type:"links",pages:["skills-progression","elemental-combat","kliff-builds","damiane-builds","oongka-builds"]}
]},
"elemental-combat":{category:"Skills & Progression",title:"Elemental Combat System",
tags:["elemental","fire","ice","frost","lightning","wind","imbue","Fist of Flame","Mantle of Frost","Surge of Sparks","element switching"],
content:[
{type:"intro",text:"5 elements channeled through the Axiom Bracelet. Switch mid-combat via D-pad radial dial. Each element changes enemy reactions and creates new combo opportunities."},
{type:"heading",text:"Elements Overview"},
{type:"table",headers:["Element","Effect","Best For","Unlock"],
rows:[
["Fire","DoT burn, AoE explosion on arrows, clears thorny terrain","Groups. Combo-heavy aggression (multiple hits to trigger stun)","Tree of Slumber Abyss puzzle"],
["Ice/Frost","Freezes enemies solid. No dodge/block while frozen","Crowd control. Creates vulnerability windows for follow-ups","Path of Trials (Pailune, Spire of Ringing Truth)"],
["Lightning","Stun/paralysis. Shorter than freeze but activates faster","Interrupting specific boss attacks. Wet enemies take bonus damage","Story progression / Abyss puzzle"],
["Wind","Knockback on impact. Launches enemies flying. Aerial dive kick launch","Crowd displacement. Launching Kliff for aerial combos","Abyss progression"],
["Nature","Afterimages on attacks (unconfirmed by Pearl Abyss)","Unknown — appears in elemental wheel","Unconfirmed"]
]},
{type:"heading",text:"How to Unlock Elements"},
{type:"tip",text:"Frost: complete Path of Trials in Pailune. Start at Spire of Ringing Truth — climb tower, destroy bell to reveal basement. Bring ice-resistant clothing or food."},
{type:"tip",text:"Fire: complete Tree of Slumber Abyss puzzle. Unlocks Flame Strike (Kliff), Flame Rush (Damiane), Flame Quake (Oongka)."},
{type:"warning",text:"Imbue Elements requires BOTH Fist of Flame AND Mantle of Frost. Unlock fire AND frost before you can apply elements to weapon attacks."},
{type:"heading",text:"Elemental Skills"},
{type:"tip",text:"Fist of Flame: fire-imbued charge. Can activate DURING other skills. Very flexible."},
{type:"tip",text:"Mantle of Frost: protective frost barrier. Freezes enemies that hit you."},
{type:"tip",text:"Surge of Sparks: ground-level electricity zone. Area denial."},
{type:"tip",text:"Imbue Elements Lv4: apply active element to Turning Slash, Charged Shot, Force Palm, Meteor Kick. Free DPS on top of existing combos."},
{type:"heading",text:"Elemental Combos"},
{type:"tip",text:"Fire + Greatsword/Axe: wide-arc weapons hit multiple targets. DoT stacks across group. Best AoE damage."},
{type:"tip",text:"Ice + Boss Fight: freeze → full Forward Slash chain → Nature's Echo clone. Massive damage window."},
{type:"tip",text:"Lightning + Wet Enemy: rain, water bodies, or shattered ice = bonus damage. Shorter stun but faster activation for interrupt timing."},
{type:"tip",text:"Wind + Aerial: knockback launches enemies. Follow with Flying Kick or Meteor Kick for devastating air combos."},
{type:"heading",text:"Switching Mid-Combat"},
{type:"tip",text:"Axiom Bracelet radial dial via D-pad. No pause, no menu. Switch elements on the fly based on enemy type."},
{type:"tip",text:"Fire arrows explode on impact — switch to fire before bow volleys for AoE."},
{type:"tip",text:"Environmental interaction: fire clears thorns, ice creates platforms on water, lightning chains through water."},
{type:"links",pages:["skills-progression","best-skills","combat-basics","axiom-bracelet"]}
]},
"abyss-farming":{category:"Skills & Progression",title:"Abyss Artifact Farming",
tags:["abyss artifact","farming","XP","skill points","sealed","grind","efficient","blockade","totem"],
content:[
{type:"intro",text:"Every skill, stat boost, and max-level gear refinement runs through Abyss Artifacts. Here is every source ranked by efficiency."},
{type:"heading",text:"Sources Ranked by Efficiency"},
{type:"table",headers:["Source","Efficiency","Repeatable?","Details"],
rows:[
["Combat XP Bar","High","Unlimited","Golden bar left of minimap. Kill enemies to fill. 1 Artifact per fill. No cap."],
["Blockaded Areas","High","Yes (respawn)","Open-world camps with dense enemy groups. Best XP per minute."],
["Ch3 Totem Farm","Very High","ONE-TIME","Mountain before Reed Devil. Totems spawn infinite enemies. Destroyed after boss kill."],
["Greymane Rumors","High","Limited","Faction quest tab. Short escort tasks. 1 Artifact each. Check after every fast travel."],
["Sealed Artifacts","Medium","141 total","Stone altars along roads. Complete challenge → use in inventory → get Artifact or Gear."],
["Main Quests","Medium","No","Ch2, Ch4, major bosses drop them. Play the story."],
["Abyss Puzzles","Medium","No","Each island puzzle = 1 Artifact + fast travel point."],
["Witch Vendors","Low","No restock","28.50 Silver each. Elowen + others. Buy only when 1-2 short of key unlock."],
["Patrigio","Low","Rare spawn","Wandering merchant. Secret Shop. 28.50 Silver. Found on roads."],
["Side Activities","Low","Some","Arm wrestling (Hernand Tavern), specific side quests."]
]},
{type:"heading",text:"Farming Tips"},
{type:"warning",text:"Ch3 Totem Farm is the best early-game opportunity. DO NOT kill Reed Devil until you have farmed enough. Totems are permanently destroyed after the boss fight."},
{type:"tip",text:"Never sprint past enemies during story wave-combat missions. Full clears = multiple Artifacts per mission."},
{type:"tip",text:"Rotate between uncleared Blockaded areas rather than repeating the same one. Enemy density doesn't always reset immediately."},
{type:"tip",text:"Sealed Artifacts: 90 percent are on stone cairns directly alongside primary roads. Use Guiding Light (L1+R1 / LB+RB) — blue shimmer through walls. Lantern also makes them emit white light rings at night."},
{type:"tip",text:"Sealed Artifact challenges: check Journal → Challenges. Tabs for Mastery, Combat, Life, Minigame. Rewards include Abyss Artifacts, Faded Artifacts, and Abyss Gears."},
{type:"heading",text:"How Many Do You Need?"},
{type:"stat",text:"Kliff full skill tree: ~80+ Artifacts. Damiane: ~40+. Oongka: ~40+. Plus max refinement on weapons = 160+ total needed."},
{type:"tip",text:"Don't try to max everything. Focus Kliff through Ch8, then invest in companions as you unlock them."},
{type:"tip",text:"Balance spending between skills and gear refinement. A weapon at Refine +5 might need Artifacts to push further."},
{type:"links",pages:["skills-progression","best-skills","respec","puzzles-sealed"]}
]},
"research-institutes":{category:"Skills & Progression",title:"Research Institutes",
tags:["research","scholastone","pororin","urdavah","gorthak","dewhaven","institute","blueprint","stat cap","ATAG","health cap"],
content:[
{type:"intro",text:"6 research institutes across Pywel. Fund projects for permanent stat cap increases, crafting blueprints, ATAG upgrades, and dispatch unlocks. Massive silver sink but essential for endgame."},
{type:"table",headers:["Institute","Key Project","Cost","Reward"],
rows:[
["Scholastone","Health Cap","130 Sv, 20h","Health Lv11→18"],
["Scholastone","Faded Artifact BP","12 Sv, 8h","Craft respecs"],
["Scholastone","Infinite Arrows","1.10 Sv","Never buy arrows again"],
["Urdavah","Stamina Cap","130 Sv","Break stamina limit"],
["Urdavah","Gold Vein Research","130 Sv, 8h","Reveal Gold Ore mines"],
["Pororin","Spirit Cap","130 Sv, 22h","Break spirit limit"],
["Pororin","Magic Tools","500 Sv","Scythe + Rod dispatch"]
]},
{type:"heading",text:"How Research Works"},
{type:"tip",text:"Find institute → bring lead researcher a required item → unlocks project tree. Projects cost Silver + time (6-22 in-game hours)."},
{type:"stat",text:"Row 1 projects prerequisite for Row 2/3. Same-row projects are independent. Column projects must complete sequentially."},
{type:"tip",text:"Some projects stall — travel to marked location and help the stuck researcher."},
{type:"tip",text:"'More Knowledge' required? Talk to other researchers in the area, observe objects, or repair machinery."},
{type:"tip",text:"Advance time via bed rest or cooking fire waits to skip project timers."},
{type:"heading",text:"Scholastone Institute (Ch4-5)"},
{type:"tip",text:"Lead researcher: Grunvar. Requires 1x Honey Tea (craft at cauldron: Honey + Water)."},
{type:"tip",text:"Faded Abyss Artifact Blueprint (12 Silver, 8 hrs) — craft respecs at Witch cauldrons. PRIORITY."},
{type:"stat",text:"Health cap increase: Lv11 → Lv18 (130 Silver, 20 hrs). ESSENTIAL for endgame bosses."},
{type:"tip",text:"Beekeeper's Gear Blueprint (1 Silver). Shadowleaf Disguise Blueprint + INFINITE ARROWS (1.10 Silver)."},
{type:"tip",text:"Palmar Pill alchemy recipe (7 Silver). Elixir formulas: Freya's, Meliara's, Haiden's (120 Silver)."},
{type:"tip",text:"Enhanced Cloudcart → Cloudcruiser dispatch."},
{type:"heading",text:"Pororin Village"},
{type:"tip",text:"Requires: 5x Lavender + complete 'Unreachable Village' quest."},
{type:"tip",text:"Spirit cap increase via Wild Ginseng Research (130 Silver, 22 hrs)."},
{type:"tip",text:"Palmar Leaf gathering location reveal (9 Silver). Additional plant gathering chance (70 Silver)."},
{type:"tip",text:"Magic Scythe + Pororin Fishing Rod dispatch (500 Silver — expensive but powerful tools)."},
{type:"heading",text:"Urdavah Palace (Crimson Desert Region)"},
{type:"tip",text:"Bottom of elevator shaft after main quest. 'Gold Vein Research': 130 Silver, 8 hrs → reveals Gold Ore mine locations."},
{type:"tip",text:"Stamina cap increase via Red Seaweed Research. Cooked food potency increase."},
{type:"tip",text:"ATAG Plating Mk. II and III dispatch. Accessory blueprints."},
{type:"heading",text:"Delesyia (3 Institutes)"},
{type:"location",text:"Gorthak Ironworks: ATAG weapons (Cannon, Laser, Pincers). Large-scale dispatch missions. Reduced crafting waste."},
{type:"location",text:"Dewhaven Keep: requires raw Diamond. Lightning Saw, Machine Workers, ATAG Fist/Machine Gun/Flamespitter/Welder."},
{type:"tip",text:"Third institute: more ATAG upgrades + Weapons of the World Vol. IV Blueprint."},
{type:"heading",text:"Priority Order"},
{type:"tip",text:"1. Scholastone: Faded Artifact blueprint + Health cap. 2. Urdavah: Stamina cap + Gold Ore. 3. Pororin: Spirit cap."},
{type:"tip",text:"Don't skip cheap Row 1 projects — they're prerequisites for the good stuff."},
{type:"tip",text:"Research is a massive silver sink. Budget 500+ Silver across all institutes."},
{type:"links",pages:["respec","alchemy-crafting","camp"]}
]},
"abyss-gears-witches":{category:"Gear & Equipment",title:"Abyss Gears & Witches",
tags:["abyss gears","abyss cores","witch","elowen","sylvia","sockets","embed"],
content:[
{type:"intro",text:"Equipment mods adding stats, buffs, active abilities. Managed by Witch NPCs."},
{type:"heading",text:"What They Do"},
{type:"tip",text:"Passive: speed, damage, healing, stamina regen, food enhancement. Active: shockwaves, extra strikes, projectiles."},
{type:"tip",text:"Boss weapons have unique gears. Extract at Witch → move to any weapon."},
{type:"heading",text:"Best Gears"},
{type:"table",headers:["Gear","Effect","Tier","Source"],
rows:[
["Wind Slash","Ranged slash skill","Early","Sword of the Lord"],
["Vigor","Stamina regen","Early","Various weapons"],
["Gourmet","Enhanced food healing (HP/Sta/Spi)","Early","Stack w/ Grilled Meat"],
["Momentum","+35% Turning Slash","Mid","Leather Helm of FK"],
["Groundsurge","Rock/lava eruption AoE","Mid","Myurdin (Ch7)"],
["Swift","Attack Speed Lv5","Late","Huge DPS boost"],
["Aegis","Damage reduction","Late","Odeck's Boots"],
["Vitality","Survivability boost","Late","Various"],
["Frostward","Ice Resist Lv5","Late","Cold region essential"],
["Greysoul Howling","Extra combo strikes","Late","Fated Shadow (Ch9)"],
["Crow's Pursuit","Ranged projectile heavies","Late","Tauria Sword (Ch5)"],
["Wound of Darkness","Wave on Turning Slash","Late","Absolution GS (Ch5)"],
["Haste","Movement speed","—","NOT worth a socket"]
]},
{type:"heading",text:"Witches"},
{type:"tip",text:"Sylvia (Ch3): Witchwoods rescue, roof hole entry. Day-1 patch added her north of Hernand."},
{type:"tip",text:"Elowen (Ch5): White bird letter → Missing Seal quest → rescue at Alfonso Estate."},
{type:"tip",text:"5 total. Another in Serpent Marsh, south Demeniss."},
{type:"heading",text:"Services"},
{type:"tip",text:"Embed (FREE). Extract (FREE). Create Socket (5-100+ Silver). Craft. Buy (recipes + Artifacts)."},
{type:"tip",text:"Sockets LOCKED on new gear (chain icons). Pay to unlock. Max per item varies. Cloaks/Accessories: NO sockets."},
{type:"heading",text:"CRITICAL"},
{type:"warning",text:"ALWAYS extract before selling gear. Embedded gears LOST PERMANENTLY on sale."},
{type:"heading",text:"Elowen Extras"},
{type:"tip",text:"Cauldron inside (best alchemy in Hernand). Tower next door: treasure chest at top (jump to closed window). 4 Sanctum quests → Kuku weapon blueprints."},
{type:"links",pages:["weapons-guide","armor-system","gear-refinement"]}
]},
"armor-system":{category:"Gear & Equipment",title:"Armor System & Best Sets",
tags:["armor","plate","leather","cloth","headgear","chest","gloves","footwear","cloak","bolton","canta","kairos","fallen kingdom","blackwing"],
content:[
{type:"intro",text:"5 slots, 3 weight classes, no set bonuses. Refinement level > specific piece."},
{type:"heading",text:"Slots"},
{type:"tip",text:"Headgear, Chest, Cloak, Gloves, Footwear. Equip all 5 for bonus stats."},
{type:"heading",text:"Weight Classes"},
{type:"tip",text:"Plate: highest defense, NO movement penalty. Always optimal. Leather: mid, stealth/gathering bonuses. Cloth: lowest, niche resistances (poison for swamps)."},
{type:"heading",text:"Sets"},
{type:"warning",text:"'Sets' = cosmetic matching only. NO set bonuses. Mix freely for best individual stats."},
{type:"tip",text:"Dye System: full cosmetic customization. Some pieces grant faction disguises for restricted areas."},
{type:"heading",text:"Progression Path"},
{type:"tip",text:"Kliff starts: Ynitium Leather (4pc medium). Bolton Plate + Bekker Axes = transitional (first few chapters)."},
{type:"tip",text:"Fallen Kingdom pieces + Hollow Visage = scale into late game (swappable pre-loaded gears)."},
{type:"tip",text:"Bolton Helm + Canta Plate (Hernand) = carries through ENTIRE game when refined."},
{type:"location",text:"Blackwing Leather Armor (Crowcaller Ch5) = best early chest, 3 sockets + defense + speed."},
{type:"heading",text:"Best Pieces + Locations"},
{type:"table",headers:["Piece","Slot","Location","Pre-loaded Gears"],
rows:[
["Leather Helm of FK","Head","Sanctum of Benediction (SW Icemoor)","Momentum (+35% Turning Slash)"],
["Odeck's Boots","Feet","Sanctum of Temperance","Aegis II + Haste I"],
["Plate Gloves of FK","Hands","Waterfall cave W of Hernand","Crit Damage + Ice Resist"],
["Blackwing Leather","Chest","Crowcaller drop (Ch5)","3 sockets + DEF + speed"],
["Sunset Reed Gloves","Hands","Reed Devil drop","2 sockets + HP regen"],
["Brass Warden Gloves","Hands","Lioncrest Manor basement","Defense focused"],
["Lifsoth Large Shield","Shield","Witch's House 2F balcony","12→35 DEF scaling"],
["Paulenese Cloak","Cloak","Pailune Contribution Shop","Ice Resist Lv3 (essential)"]
]},
{type:"heading",text:"Crafting"},
{type:"tip",text:"Plate = ores. Leather = hides + bones. Cloth = Cloth Pieces + Fleece. Non-unique: duplicates upgrade. Unique: specific materials."},
{type:"links",pages:["abyss-gears-witches","unique-gear-locations","gear-refinement"]}
]},
"gear-refinement":{category:"Gear & Equipment",title:"Gear Refinement",
tags:["refinement","upgrade","blacksmith","bloodstone"],
content:[
{type:"intro",text:"Refinement level matters more than specific gear choice."},
{type:"tip",text:"Blacksmith → Refinement. Lv0-10. Materials only (no coin). Gold ticks = level."},
{type:"tip",text:"Non-unique: materials or duplicates. Unique: specific materials."},
{type:"tip",text:"Inspect → Refinement Information: see stats at ALL levels before spending."},
{type:"tip",text:"Grindstone (weapons) + Anvil (armor) = temporary buffs. Use before EVERY boss. Thinker's Meadow has one."},
{type:"tip",text:"Reinforcement stat: sharpen/repair at Grindstone/Anvil to max it. Visible when hovering equipped gear."}
]},
"contribution-shops":{category:"Gear & Equipment",title:"Contribution Shops",
tags:["contribution","shop","faction","bolton","banners","hernand","demeniss"],
content:[
{type:"intro",text:"Every major city has a shop with exclusive gear for Contribution Points. Some of the best equipment."},
{type:"heading",text:"Earning Points"},
{type:"tip",text:"Faction Quests, liberating areas. -5 per theft, -30 per murder."},
{type:"heading",text:"Locations"},
{type:"table",headers:["City","Access","Notable Items"],
rows:[
["Hernand","Tower in Hernand Castle","Bolton Helm, Canta Armor. Scholastone shares pool"],
["Demeniss","3 shops. Castle = scale walls → 2F","Exclusive plate + cloaks"],
["Pailune","Requires liberation","Paulenese Cloak (Ice Resist Lv3)"],
["Delesyia","Requires Visione","Tommaso + Varnia use Tashkalp pool"]
]},
{type:"heading",text:"What They Sell"},
{type:"tip",text:"Exclusive plate armor, cloaks, horse bardings."},
{type:"tip",text:"Contribution Banners: massive faction flags usable as two-handed weapons. Peak gameplay."},
{type:"tip",text:"Bolton Helm + Canta Armor = carry through entire game. Extract gears before trading back."}
]},
"mining-gathering":{category:"Gear & Equipment",title:"Mining & Gathering Guide",
tags:["mining","ore","iron","copper","gold","diamonds","bloodstone","gathering","timber","farming","materials"],
content:[
{type:"intro",text:"Ore is the backbone of gear progression. Here's every material, where to find it, and the best farming routes."},
{type:"heading",text:"Tools"},
{type:"tip",text:"Pickaxe: buy from Provisioner in Hernand. Free one from Rhett's quest."},
{type:"tip",text:"Logging Axe: same shop. Or use Turning Slash skill on trees."},
{type:"tip",text:"Force Palm and Force Current can blow up ore deposits WITHOUT tools — massive time saver."},
{type:"tip",text:"Mining: hold CTRL/LB to aim. Focus point must turn BLUE (not red) before striking."},
{type:"heading",text:"Ore Identification"},
{type:"location",text:"Iron: grey rocks with metallic sheen. Most common."},
{type:"location",text:"Copper: bluish-green tint on cliff faces. Slightly harder to spot."},
{type:"tip",text:"Rare materials: crystal clusters inside caves. Faint glow."},
{type:"tip",text:"All mineral nodes have a subtle bluish glow in the environment."},
{type:"heading",text:"Best Farming Spots"},
{type:"table",headers:["Material","Location","Notes"],
rows:[
["Iron (14 nodes)","Hernand river cliffs","Best single spot. Up to 6 ore each"],
["Iron+Copper+Azurite","Anvil Hill base","Multi-material loop"],
["Copper","S Hernand near Goldenfist Arena","Bluish-green cliff deposits"],
["Garnet","Across river from Three Saints Falls",""],
["Azurite","W Hernand mountains / Deepwoods","Also at Anvil Hill"],
["Diamonds (x10)","Hernand Highlands Cavern","Below Dragon Stone Cavern"],
["Bismuth Ore","Stoneback crabs S of Anvil Hill","Under Abyss Cresset. Mid-game"],
["Bloodstone","Witchwoods SW of Hernand","Sells highest of all ores"],
["Gold Ore","Urdavah research (130 Sv)","Reveals mine locations after 8h"]
]},
{type:"heading",text:"Gold"},
{type:"location",text:"Gold Ore: Complete 'Gold Vein Research' at Urdavah palace (desert region). 130 Silver, 8 hours. Reveals mine locations."},
{type:"tip",text:"Gold Bars: crafted at Witch from Gold Ore. Multiple recipes. Used for Bank investments (= 500 Silver each)."},
{type:"tip",text:"Gold Bar recipe: Spire of Insight, south of Pororin Village."},
{type:"tip",text:"Traveling Treasure Goblins drop Gold Bars randomly."},
{type:"tip",text:"Golden Apples: discovered by hedgehogs. Watch for ground sparkles, follow trail."},
{type:"heading",text:"Organic Materials"},
{type:"tip",text:"Meat: Hunt deer (groups of 5+, 3-4 each). Mountain Goats = fastest kill for Fine Meat."},
{type:"tip",text:"Mythical Pelts: Shadow-Wolves at night (spawn after 20:00 in-game)."},
{type:"tip",text:"Crimson Ginseng: high altitude ONLY — tops of ruins and stone pillars."},
{type:"tip",text:"Hides/Bones: hunting. Small animals = small, large = large."},
{type:"heading",text:"Shopping"},
{type:"tip",text:"Rhett and Mineral Shops restock every 2-3 in-game days. Iron = 18 coins."},
{type:"tip",text:"Mineral Shops: unlock by liberating Cairn House + Karin Quarry (N/NE of Hernand). Stock 6 Iron each."},
{type:"heading",text:"Tips"},
{type:"tip",text:"Ore is HEAVY. Watch encumbrance. Can't fast travel overloaded."},
{type:"tip",text:"Get off roads — terrain exploration finds more nodes."},
{type:"tip",text:"Deposits respawn over time and stay marked on map once found."},
{type:"tip",text:"Use high ground + Blinding Flash to spot shining beacons (hidden gear/materials)."},
{type:"links",pages:["gear-refinement","economy","camp"]}
]},
"unique-gear-locations":{category:"Gear & Equipment",title:"Unique Gear Locations",
tags:["unique","gear","locations","treasure","hidden","hwando","hollow visage","lioncrest","sanctum","waterfall"],
content:[
{type:"intro",text:"Treasure map to the best unique weapons and armor hidden across Hernand. Exact locations and access requirements."},
{type:"heading",text:"Weapons"},
{type:"table",headers:["Weapon","Type","Location","How to Access"],
rows:[
["Hwando","Sword","Lioncrest Manor side bldg","Key (30c Back Alley), climb to glasless window"],
["Hollow Visage","Katana","Waterfall cave S of Reed Devil","Forward stab through waterfall"],
["Bekker Axes x2","Dual Axes","Underbridge after prologue","Tree stump + nearby rock"],
["Rhonid Shield","Shield","Lioncrest Manor interior","Middle window → steal key near tea → left door"],
["Absolution GS","Greatsword","Sanctum of Absolution (Ch5)","Wound of Darkness gear"]
]},
{type:"heading",text:"Armor"},
{type:"table",headers:["Armor","Slot","Location","Puzzle / Access"],
rows:[
["Leather Helm FK","Head","Sanctum of Benediction","Light lantern on statue → hidden door"],
["Odeck's Boots","Feet","Sanctum of Temperance","Stairs → ruins → wall hole → crouch"],
["Plate Gloves FK","Hands","Waterfall cave W of Hernand","Stab through water current"],
["Brass Warden Gloves","Hands","Lioncrest Manor","Downstairs → 1st right room → chest near bed"],
["Lifsoth Shield","Shield","Witch's House 2F","Balcony door access"]
]},
{type:"heading",text:"Scaling Note"},
{type:"tip",text:"Fallen Kingdom pieces + Hollow Visage scale into late game because pre-loaded Abyss Gears can be swapped for higher-tier ones as you progress."},
{type:"tip",text:"Bolton Armor + Bekker Axes = transitional. Replace once you reach later vendors and world bosses."},
{type:"tip",text:"Most loot blends with environment — what looks like decoration may be stealable/lootable. Use Blinding Flash from high ground to spot shining beacons."}
]},
"inventory-management":{category:"Gear & Equipment",title:"Inventory Management",
tags:["inventory","bags","storage","weight","slots"],
content:[
{type:"intro",text:"Starts at 50 slots. Can reach 200+ by endgame."},
{type:"tip",text:"Regional commission quests: 3 slots each (Hernand Commissions, etc.)."},
{type:"tip",text:"Buy Small/Medium Bags. Unlocking Damiane/Oongka adds equipment slots."},
{type:"tip",text:"Shared inventory. Station characters at towns for remote selling."},
{type:"tip",text:"Sell learned recipes (permanent knowledge, good silver). Overloaded = can't sprint/dodge/fast travel."},
{type:"tip",text:"Supply chest in Camp holds missed loot. Inventory PAUSES game — eat from it during bosses."},
{type:"tip",text:"No stash at launch. Everything carried. Ore is heaviest — watch weight on mining runs."}
]},
"dye-cosmetics":{category:"Gear & Equipment",title:"Dyes & Cosmetics",
tags:["dye","cosmetics","barber","hairstyle","tattoo","appearance","color","dyehouse","transmog","customization"],
content:[
{type:"intro",text:"Full appearance customization via Barber Shop and Dyehouse. No microtransaction cosmetics shop — everything earned through gameplay. No transmog system at launch."},
{type:"heading",text:"Barber Shop"},
{type:"tip",text:"Location: Greymane Camp (tent). Also found in some cities."},
{type:"tip",text:"Hairstyles: Kliff has 6+ options. Full color palette including vivid purples, greens, blues."},
{type:"tip",text:"Facial hair options for Kliff. Each character has distinct style options."},
{type:"tip",text:"Face and body tattoos available."},
{type:"tip",text:"Preview changes before confirming. Costs in-game currency."},
{type:"heading",text:"Dyehouse System"},
{type:"tip",text:"First Dyehouse: Theoric, SE of Hernand. Also at Hernand Farmhouse (colored clothes by river). Oliver becomes camp dye vendor after recruiting."},
{type:"tip",text:"Unlock quest: Naira's 'Brightening the Spirits' chain (after 'The Greymanes' New Fangs' pet quest)."},
{type:"tip",text:"Can actually use dyes BEFORE quest — just find/buy dye bottles and visit any dyer."},
{type:"heading",text:"How Dyes Work"},
{type:"tip",text:"Find/buy dye bottle in world or craft at cauldron using insects + flowers."},
{type:"tip",text:"Use dye from inventory = permanently LEARNS all shades of that color. Unlimited uses after."},
{type:"tip",text:"Per-section precision: target individual sections within each armor piece (main surface, cloth inlays, trim, metal hardware). Mix and match freely."},
{type:"tip",text:"Change material too — shinier, more metallic, etc. Purely cosmetic."},
{type:"heading",text:"What Can Be Dyed"},
{type:"tip",text:"Character armor (per-section), gloves, boots separately."},
{type:"tip",text:"Horse armor (head, body, saddle, stirrups)."},
{type:"tip",text:"War Robot/ATAG (chassis, limbs, major parts — most dyeable sections of anything in the game)."},
{type:"tip",text:"Weapons appear to have some customization via dye station menus."},
{type:"heading",text:"Crafting Dyes"},
{type:"tip",text:"Cauldron (NOT cooking pot). Can 'improvise' even without recipes."},
{type:"tip",text:"Dark Yellow: 10 Dunbaria + 3 Beetle + 1 Longhorn Beetle + 2 Stag Beetle."},
{type:"tip",text:"Bright Yellow: 10 Dunbaria + 3 Beetle + 3 Longhorn Beetle."},
{type:"tip",text:"Many dyes found by stealing from houses — bottles on shelves. Need mask."},
{type:"heading",text:"No Transmog"},
{type:"warning",text:"NO transmog/appearance overlay system at launch. Visual look = whatever gear you're wearing. Pearl Abyss hasn't announced transmog plans (BDO added it years post-launch)."},
{type:"tip",text:"Dye system compensates somewhat — change colors freely while keeping stat gear."},
{type:"tip",text:"Armor sets have no set bonuses, so mix-and-match for stats without visual penalty."},
{type:"links",pages:["armor-system","camp"]}
]},
"accessories-shields":{category:"Gear & Equipment",title:"Accessories & Shields",
tags:["accessories","rings","earrings","necklace","cloak","shield","kite shield","mask","backpack","eyewear"],
content:[
{type:"intro",text:"6 accessory slots plus shields. Most accessories have similar base stats early — just fill every slot. Special accessories with unique powers appear later."},
{type:"heading",text:"Accessory Slots"},
{type:"table",headers:["Slot","Count","Notes"],
rows:[
["Necklace","1","HP/Stamina/Spirit regen. Special ones change weather"],
["Rings","2","HP/Stamina/Spirit regen. Tarnished Rings from bandits = common early drops"],
["Earrings","2","Small stat bumps. Oath of Darkness (+2 DEF) from Bluemont Strongbox. Engraved Gold from Lioncrest"],
["Cloak","1","Elemental resistance + crit chance. Paulenese Cloak = Ice Resist Lv3 essential"]
]},
{type:"heading",text:"Also Equippable"},
{type:"tip",text:"Masks: for crime/stealth. Eyewear and Backpacks: late-game cosmetic + utility slots."},
{type:"heading",text:"Early Strategy"},
{type:"tip",text:"Fill ALL 6 slots immediately. Even Tarnished accessories give meaningful stat bumps."},
{type:"tip",text:"Farm bandits on roads — they commonly drop Tarnished Rings and Amulets."},
{type:"tip",text:"Upgrade Tarnished accessories at blacksmith. Maxed Tarnished gear carries through early-mid game."},
{type:"tip",text:"Don't hunt for specific accessories early. Just fill every empty slot with whatever drops."},
{type:"heading",text:"Notable Accessories"},
{type:"tip",text:"Oath of Darkness Earring: +2 DEF. Bluemont Manor owl strongbox puzzle. Solid early defensive pick."},
{type:"tip",text:"Engraved Gold Earring: Lioncrest Manor — parkour side window, solve lockbox. Part of early power spike route."},
{type:"tip",text:"Saint's Necklace: Hillside Manor strongbox. Temporary stamina boost on use."},
{type:"tip",text:"Weather-changing necklace: found later in campaign. Unique magical power."},
{type:"heading",text:"Shields"},
{type:"tip",text:"Off-hand weapon. Cannot dual-wield shields. Block + parry with LB/L1/CTRL."},
{type:"tip",text:"Grey Wolf Wooden Shield: starter. Same stats as most early shields — fine to keep."},
{type:"tip",text:"Kite Shield: Rhett's shop at 100 trust (greet daily + quests). Strong upgrade."},
{type:"tip",text:"Lifsoth Large Shield: Witch's House 2F balcony. 12 to 35 DEF scaling. Best early-mid shield."},
{type:"tip",text:"Rhonid Large Shield: Lioncrest Manor interior. Good defense + Abyss Core slots."},
{type:"tip",text:"Bekker Shield: reward from Turnali's Request commission."},
{type:"tip",text:"Replacing shield with 2nd weapon = dual-wield. Trades defense for faster attack chains."},
{type:"heading",text:"Cloaks"},
{type:"tip",text:"No direct defense stat. Evaluate based on elemental resistance and crit chance bonuses."},
{type:"tip",text:"Disguise Cloak (Back Alley, 20.88 Sv): Civilian Disguise for infiltration. Also 3 DEF + Ice Resist Lv3."},
{type:"tip",text:"Hernandian Banquet Cloak: Extinguishing the Last Flames quest reward."},
{type:"tip",text:"Keep faction disguise cloaks even with worse stats — many quests require specific disguises."},
{type:"links",pages:["armor-system","unique-gear-locations","puzzles-strongbox","stealth-system"]}
]},
"boss-general":{category:"Boss Fights",title:"General Boss Strategy",
tags:["boss","strategy","meat","healing","preparation"],
content:[
{type:"intro",text:"76 bosses. Universal strategy for all of them."},
{type:"table",headers:["Boss","Chapter","Key Drop / Teaches"],
rows:[
["Myurdin","Prologue","Scripted (winnable)"],
["Matthias","Ch1-2","Pump Kick"],
["Hornsplitter","Ch2","Sword of Lord / Evasive Roll"],
["Reed Devil","Ch3","Sunset Reed Gloves / Swift Stab"],
["Crowcaller","Ch4-5","Tauria Sword + Blackwing Armor / Aerial Roll"],
["Ludvig","Ch8","Two-phase teleport + lightning"],
["Fortain","Ch8","Blood Coronation sequence"],
["Lava Myurdin","Ch8","Fire/lava transformed"],
["Black Witch","Ch9","Weak to Blinding Flash"],
["Golden Star","Ch10","Mech ATAG battle"],
["Kearush","Final","3 health bars, invuln circles"]
]},
{type:"heading",text:"Grilled Meat Strategy"},
{type:"tip",text:"100+ GRILLED MEAT to every boss. #1 tip in the game."},
{type:"tip",text:"Cheapest (80 HP, 1 meat) >> Hearty (220 HP, 10 meat). 10 meat = 800 vs 220 HP."},
{type:"tip",text:"Eat every 2 sec, infinitely. Tank damage while attacking."},
{type:"tip",text:"Mountain Goats = fastest Fine Meat. Butcher restocks midnight."},
{type:"heading",text:"Gear"},
{type:"tip",text:"Heavy plate, max defense, no movement penalty. Grindstone + Anvil before every boss."},
{type:"heading",text:"Combat"},
{type:"tip",text:"Humanoid: parry → counter. Monster: dodge → punish recovery."},
{type:"tip",text:"READ OBJECTIVES on screen. Unique mechanics per boss (Queen Stoneback Crab = mid-air plunge attacks)."},
{type:"tip",text:"Elemental weaknesses exist (White Horn = fire). Experiment."},
{type:"tip",text:"Palmar Pills: 3+. Craft recipe at Shadow's Whisper Cave, north Hernand."},
{type:"heading",text:"Boss Weapons"},
{type:"tip",text:"KEEP ALL. Unique Abyss Gears with signature abilities. Extract at Witch. Some drop armor too."},
{type:"links",pages:["cooking-recipes","boss-reed-devil","boss-early"]}
]},
"boss-reed-devil":{category:"Boss Fights",title:"Reed Devil (Ch3)",
tags:["reed devil","boss","totems"],
content:[
{type:"intro",text:"First real wall. Full 3-phase breakdown."},
{type:"tip",text:"Setup: Mountain of Frozen Souls. Unlock Cresset before fight. Ride past minion spawns."},
{type:"tip",text:"Gear: Defense 20+. Bolton/Canta armor. Sword of Lord + Shield. 40+ Grilled Meat. Health/Stamina Lv4."},
{type:"heading",text:"Phase 1"},
{type:"tip",text:"Teleports + slash combos. Smoke puffs (2-4) before strike. Shield block → wait for sheathe → combo → dodge."},
{type:"tip",text:"Blinding Flash stuns sword draw. One parry cancels entire multi-hit combo."},
{type:"heading",text:"Phase 2"},
{type:"tip",text:"Destroy 5 totems. Turning Slash, Force Palm, or Explosive Arrows (best). Keep dodging — clones chase."},
{type:"heading",text:"Phase 3"},
{type:"tip",text:"Faster + crescent projectiles from field edge. Dodge laterally. Same parry works."},
{type:"tip",text:"Drops: Sunset Reed Cloth gloves (2 sockets, passive regen). Teaches Swift Stab."}
]},
"boss-early":{category:"Boss Fights",title:"Early Bosses (Prologue-Ch5)",
tags:["boss","Matthias","Hornsplitter","Kailok","Reed Devil","Crowcaller","Kearush","Tenebrum","Excavatron","early"],
content:[
{type:"intro",text:"First major bosses in story order. Difficulty ramps sharply from Ch2 onward. Bring food to every fight."},
{type:"heading",text:"Myurdin (Prologue)"},
{type:"tip",text:"Scripted loss. You CAN win the fight but Myurdin respawns in a cutscene regardless. Don't waste resources."},
{type:"heading",text:"Matthias (Ch1-2)"},
{type:"stat",text:"HP Bars: 2 | Difficulty: Easy | Location: Hernand Square | Teaches: Pump Kick"},
{type:"tip",text:"Knight with basic sword attacks and kicks. Easiest boss in the game."},
{type:"tip",text:"Cheese: spam Pump Kick (the move HE teaches you via Watch and Learn). Sends him flying into houses and bulletin boards repeatedly."},
{type:"tip",text:"Standard: 3x light attack → 3x heavy attack chain. This interrupts his combos. Very forgiving timing windows."},
{type:"heading",text:"Marni's Excavatron (Ch2 Side)"},
{type:"stat",text:"HP Bars: 1 | Difficulty: Medium | Location: Karin Quarry | Drops: Mining Knuckledrill + Gold Vein Map"},
{type:"tip",text:"Drill machine boss from Stolen Quarry quest. Massive damage if you get stunlocked by drills."},
{type:"warning",text:"KEY: Force Palm Lv3 (Expertise node) trivializes this fight. Three consecutive Force Palms = loud 'thonk' + Excavatron stunned. Free combo window."},
{type:"tip",text:"When it digs underground and chases: sprint to avoid drill stabs. Dodge before the final stab when it resurfaces."},
{type:"tip",text:"Kill 2 of the Bleed Bandit adds, leave 1 alive to prevent more spawning."},
{type:"heading",text:"Kailok the Hornsplitter (Ch2)"},
{type:"stat",text:"HP Bars: 1 | Difficulty: Medium-Hard | Location: Goldleaf Guildhouse | Teaches: Evasive Roll | Drops: Sword of the Lord"},
{type:"tip",text:"First real difficulty spike. Goblin boss with fast attacks and ground-wave flame cascade."},
{type:"tip",text:"Core strategy: shield parry his melee combos (green glow = successful parry). Follow with quick attack chain. Keep stamina for blocking wave attacks."},
{type:"tip",text:"Super armor (blue glow) = STOP ATTACKING. He's about to unleash ranged flame waves. Save stamina to dodge."},
{type:"tip",text:"Secret: wrestling moves work. He's small enough to physically grab and throw. Dropkick, Lariat, and Throw are devastating here."},
{type:"tip",text:"Drops Sword of the Lord — your best weapon for a long time. Keep it. Has Wind Slash Abyss Gear."},
{type:"heading",text:"Crowcaller (Ch4-5)"},
{type:"stat",text:"HP Bars: 1 (3 phases) | Difficulty: Hard | Location: After Spire of Soaring | Teaches: Aerial Roll | Drops: Tauria Curved Sword"},
{type:"tip",text:"Fast, aggressive, dissolves into black particles to reposition. Two fights: graveyard prelude (no reward) then main battle."},
{type:"tip",text:"Dive-bomb is his deadliest move. Phase 1: 1 aerial dodge before crash. Phase 2: 2 dodges. Phase 3: 3 dodges before landing. Count them, then dodge."},
{type:"tip",text:"Can parry his melee despite speed. Telegraph is visible. Standard parry → counter → combo loop works."},
{type:"tip",text:"Drops Tauria Curved Sword — best heavy attack weapon. Combined with Nature's Echo = the core endgame DPS setup."},
{type:"heading",text:"Kearush the Slayer (Ch4-5)"},
{type:"stat",text:"HP Bars: 3 (blue/green/red) | Difficulty: VERY HARD | Location: Hernand Castle banquet hall | Weakness: FIRE"},
{type:"warning",text:"Giant gorilla boss. Three full health bars. Hardest early-game boss by far. 100+ Grilled Meat MINIMUM. Blocking/parrying is useless — DODGE ONLY."},
{type:"tip",text:"Phase 1 (blue): 4 attacks → body slam → brief window to punish. Hang back, let attacks whiff, dodge last hits, punish slam recovery."},
{type:"tip",text:"Phase 2 (green): adds wall climb → RKO body slam from above. Easy to dodge — roll any direction when he leaps. Free punish when he lands."},
{type:"tip",text:"Phase 2+: immunity phase = chest beat + flurry punches + slam. Spam evade away. Can try Force Palm onto his back for Back Hang stabs (risky)."},
{type:"tip",text:"Phase 3 (red): faster, more aggressive, longer combo chains. Purely reactive. Dodge → 3 quick attacks → dodge. Don't get greedy."},
{type:"warning",text:"FIRE WEAKNESS: flame weapons (Fire Spear random drop) scorch his fur causing multi-second stun. Massive damage window if you have fire imbue."},
{type:"tip",text:"Plate Helm prevents roar stun. Get from Hernandian contribution vendor."},
{type:"tip",text:"Back Hang (Grappling Lv2): circle behind him → latch onto neck → stab repeatedly. Only works after his attack animation. High risk, high reward."},
{type:"tip",text:"Axiom Bracelet: grapple to walls for high ground to avoid slam attacks. Reposition, heal, re-engage."},
{type:"heading",text:"Tenebrum (Abyss Boss)"},
{type:"stat",text:"HP Bars: 1 | Difficulty: Medium | Location: Abyss realm"},
{type:"tip",text:"'Blinding Flash Weakness' prompt appears = USELESS, ignore it. When 'Approach' appears, FLY TOWARD it. Death = restart from checkpoint, not camp."},
{type:"links",pages:["boss-general","boss-reed-devil","boss-mid-late","weapons-guide"]}
]},
"boss-mid-late":{category:"Boss Fights",title:"Mid & Late Bosses (Ch6+)",
tags:["boss","Cassius Morten","Ludvig","Myurdin","Lava","Fortain","Cursed Knight","Black Witch","Hexe Marie","Golden Star","Kearush","final","mid","late"],
content:[
{type:"intro",text:"Complex multi-phase fights with unique mechanics. Keep all 3 characters geared — some fights force Damiane or Oongka."},
{type:"heading",text:"Cassius Morten (Ch6)"},
{type:"stat",text:"HP Bars: 1 | Difficulty: Medium | Location: Hernand Castle | Drops: Shield of Betrayal"},
{type:"tip",text:"First shield-wielding boss. Light attacks bounce off his guard. Equip Tauria Curved Sword + Nature's Echo."},
{type:"tip",text:"Strategy: spam R2 heavy attacks. Damages through shield. After 3 hits = interrupt → follow with light attack chain."},
{type:"tip",text:"Part of Traitor quest. Leads to revelation about Black Bear conspiracy and Grand General Basteri."},
{type:"heading",text:"Gregor the Halberd of Carnage (Ch8)"},
{type:"stat",text:"HP Bars: 1 | Difficulty: Medium-Hard | Location: Where the Wind Guides You quest"},
{type:"tip",text:"Spear-wielding warrior with environmental arrow attacks. Dodge his thrusts, punish recovery windows."},
{type:"heading",text:"One-Armed Ludvig (Ch8)"},
{type:"stat",text:"HP Bars: 2 (transforms after Phase 1) | Difficulty: Hard | Character: OONGKA FORCED"},
{type:"warning",text:"First Oongka boss fight. Make sure his equipment and skills are upgraded BEFORE entering Ch8. If neglected, go back and prep."},
{type:"tip",text:"Oongka tip: swap to two one-handed swords (NOT his starting two-handed axe, too slow). Sword of the Lord for wave attacks."},
{type:"tip",text:"Uses lightning damage. Focus on DODGING, not blocking/parrying. He teleports constantly — wait for missed combo, then light attack chains."},
{type:"tip",text:"Phase 2: faster, more erratic teleporting. Patience > aggression. Heal while attacking with quick combos."},
{type:"tip",text:"You'll likely be low on healing from prior fights — hunt animals around boss area for emergency meat."},
{type:"heading",text:"Fortain the Cursed Knight (Ch8)"},
{type:"stat",text:"HP Bars: 1 | Difficulty: VERY HARD | Location: Blood Coronation | Drops: Shackle of Might sword"},
{type:"warning",text:"Most mechanically complex boss. Giant shield blocks everything. Summons invincible ghost knight + ghost archer. Arena has musket soldiers on edges."},
{type:"tip",text:"Priority 1: kill musket soldiers on arena edges first. Their fireballs stagger + knock you down during the main fight."},
{type:"tip",text:"Fortain's shield: Force Palm to stagger → chain heavy attacks. Blinding Flash also creates openings. Nature's Echo duplicates your hits."},
{type:"tip",text:"Ghost melee spirit: does ground slam (unblockable). Dodge roll away when it appears. Ghost archer: fires arrow strafe (unblockable). Both disappear after 2-3 attacks."},
{type:"tip",text:"Special attack: Fortain plants shield + summons both spirits simultaneously for 5-second barrage. Pure survival — dodge everything, re-engage after."},
{type:"tip",text:"Aerial attack: flies up and dives. Hide behind pillars at arena corners. Counterattack when he lands."},
{type:"tip",text:"Crow's Pursuit Abyss Core is excellent here — crows follow Fortain and damage him even when he retreats behind shield."},
{type:"heading",text:"Lava Myurdin (Ch8)"},
{type:"stat",text:"HP Bars: 2 (transforms to fire/lava in Phase 2) | Difficulty: Hard | Location: Battle of Silverwolf Mountain"},
{type:"tip",text:"Phase 1: parry melee attacks. Use Tauria Curved Sword heavy attacks. Standard parry → punish loop."},
{type:"tip",text:"Phase 2: fire/lava transformation. Switch to DODGE focus. Lava ground attacks cover wide areas."},
{type:"warning",text:"100+ Grilled Meat minimum. Multiple boss fights in sequence during Silverwolf Mountain — stock up heavily."},
{type:"heading",text:"Hexe Marie (Ch9)"},
{type:"stat",text:"HP Bars: 1 | Difficulty: Medium-Hard | Location: Witch's Lair | Pre-fight: destroy totems guarded by Earthen beasts"},
{type:"tip",text:"Must clear surrounding totems first. Totem guardians (Earthen beasts) hit hard — the pre-fight is sometimes harder than Marie herself."},
{type:"tip",text:"Marie summons many smaller enemies. Focus crowd control. Blinding Flash to stun groups, then target Marie during openings."},
{type:"tip",text:"Defense matters more than offense here. Canta chestpiece refined to Tier 8 provides excellent sustained survivability."},
{type:"heading",text:"Golden Star Mecha Dragon (Ch11)"},
{type:"stat",text:"HP Bars: 2 | Difficulty: Hard | Location: Delesyia | Use: ATAG mech"},
{type:"tip",text:"Mechanical dragon with flame tornado and bombard barrage. Upgrade ATAG before this fight."},
{type:"tip",text:"Throw spears whenever Golden Star is immobile — highest damage window. Use ATAG cannon between spear throws."},
{type:"tip",text:"After depleting health, Blackstar (your dragon) swoops in to aid you. Cutscene transition."},
{type:"heading",text:"Final Boss (Ch12)"},
{type:"tip",text:"Story conclusion. Won't spoil details. Prepare as for Kearush: 100+ food, max gear, all characters upgraded."},
{type:"tip",text:"~150 hours of main story to reach this point. 200+ hours if doing side content."},
{type:"links",pages:["boss-general","boss-early","boss-reed-devil","unarmed-wrestling","elemental-combat"]}
]},
"boss-rewards":{category:"Boss Fights",title:"Boss Drops & Reward Table",
tags:["boss","drops","rewards","weapon","gear","Sword of Lord","Tauria","Shackle of Might","Abyss Artifact","unique"],
content:[
{type:"intro",text:"Every boss drops something worth keeping. Never sell or discard boss weapons — they carry unique Abyss Gears with signature abilities."},
{type:"heading",text:"Campaign Boss Drop Table"},
{type:"table",headers:["Boss","Chapter","Key Drop","Why It Matters"],
rows:[
["Matthias","Ch1-2","Abyss Artifact","Teaches Pump Kick (observation)"],
["Hornsplitter","Ch2","Sword of the Lord","Best early sword. Wind Slash Abyss Gear. Teaches Evasive Roll."],
["Excavatron","Ch2 Side","Mining Knuckledrill + Gold Vein Map","Unlocks gold mining locations. Fist weapon."],
["Reed Devil","Ch3","Sunset Reed Cloth gloves (2 sockets, passive regen)","Best early gloves. Teaches Swift Stab."],
["Crowcaller","Ch4-5","Tauria Curved Sword","Best heavy attack weapon. Core endgame DPS setup with Nature's Echo."],
["Kearush","Ch4-5","Abyss Artifact + armor piece","Major progression gate reward"],
["Cassius Morten","Ch6","Shield of Betrayal","Defense + unique shield bash properties"],
["Gregor","Ch8","Halberd weapon + Abyss Artifact","Strong spear option"],
["Ludvig","Ch8","Lightning-themed weapon","Oongka encounter reward"],
["Fortain","Ch8","Shackle of Might (sword) + Abyss Artifact","Strong mid-game sword"],
["Lava Myurdin","Ch8","Fire-themed weapon + armor","Phase transformation drops"],
["Hexe Marie","Ch9","Witch-themed gear","Dark magic accessories"],
["Golden Star","Ch11","Mech components + leads to Blackstar dragon","Unlocks dragon mount progression"]
]},
{type:"heading",text:"What to Do with Boss Weapons"},
{type:"tip",text:"Extract Abyss Gears at any Witch. Socket extracted gears into your main weapons for unique effects."},
{type:"tip",text:"Crow's Pursuit (from Crowcaller weapons): tracking crows that damage enemies even behind cover. Excellent for shield bosses."},
{type:"tip",text:"Wind Slash (Sword of the Lord): ranged projectile on heavy attacks. Can be moved to any weapon at Witch."},
{type:"tip",text:"Crimson Rose of Sin: DoT bleed effect. Stack with other cores for sustained damage."},
{type:"tip",text:"Keep Sword of the Lord available even late-game — Oongka can use it for wave attacks during forced boss fights."},
{type:"heading",text:"Abyss Artifact Drops"},
{type:"tip",text:"Major bosses always drop at least 1 Abyss Artifact. Some drop 2-3 for milestone story bosses."},
{type:"tip",text:"Boss XP also contributes heavily to combat XP bar — one boss fight can fill it 30-50 percent."},
{type:"links",pages:["boss-general","boss-early","boss-mid-late","weapons-guide","abyss-farming"]}
]},
"cooking-recipes":{category:"Cooking & Crafting",title:"Cooking Recipes & Food",
tags:["cooking","food","recipe","grilled meat","soup","skewer","heal","ingredients","bonfire","cooking pot","butcher"],
content:[
{type:"intro",text:"Food = your only healing. No potions, no magic heal. Cook at bonfires (grilled only) or cooking tools (advanced recipes). Stock up before every boss fight."},
{type:"heading",text:"Cooking Stations"},
{type:"tip",text:"Bonfire/campfire: grilled dishes only (single ingredient). Found everywhere."},
{type:"tip",text:"Cooking Tool (fire + pot): field grill and field pot recipes. Found at camps and settlements."},
{type:"tip",text:"Cauldron: alchemy recipes (elixirs, Palmar Pills). Found at Witch locations."},
{type:"tip",text:"Improvise option: cook without knowing recipe. Select ingredients manually. Cooking same dish multiple times learns the recipe."},
{type:"heading",text:"Best Recipes by Phase"},
{type:"table",headers:["Recipe","HP","Spirit","Other","Ingredients","Phase"],
rows:[
["Grilled Meat","80","—","—","1x any Meat","Early (SPAM THIS)"],
["Meat Skewers","120","+10","Fire Res Lv2","1x Meat + 1x Vegetable","Early-Mid"],
["Clear Soup","180","—","Ice Res Lv2 (30s)","1x Meat + 1x Grain + 1x Water","Mid (boss fights)"],
["Battered Meat","140","—","Fire Res Lv2","1x Meat + 1x Egg + 3x Oil","Mid"],
["Fruit Punch","140","+12","Fire Res Lv4 (1m)","1x Berry + 1x Barley + 1x Water","Mid"],
["Meat Soup","280","—","Ice Res","4x Meat + 1x Grain + 1x Salt + 3x Water","Late"],
["Fishball Soup","340","—","Ice Res","Fish + Grain + Salt + Water","Late (best single heal)"],
["Steamed Fish","280","+26","—","2x Pike + 1x Shineberry + 2x Barley + 3x Water","Late"],
["Vegetable Rice Cake","240","+22","Fire Res Lv4 (1m)","4x Vegetable + 2x Berry + 1x Egg + 2x Salt","Late"],
["Special Meal","—","+75%","Stam Cost -50% (3m)","2x Raspberry + 3x Lentils + 3x Skewers + 2x Boiled Meat","Endgame feast"]
]},
{type:"heading",text:"The Grilled Meat Meta"},
{type:"warning",text:"100+ Grilled Meat to every boss fight. 1 raw meat = 80 HP. Cheapest from Hernand butcher (restocks daily at midnight). Cook at pot right of vendor. 10 Grilled Meat = 800 HP. Hearty Grilled Meat (220 HP, costs 12 meat) is WORSE value."},
{type:"tip",text:"All meat types (Tough, Lean, Fine, Tender, Marbled) produce the same Grilled Meat. Buy cheapest."},
{type:"tip",text:"Raw meat restores only 40 HP. Always cook before eating — double the healing."},
{type:"heading",text:"Quality Tiers"},
{type:"tip",text:"Base → Filling → Satisfying → Hearty. Higher tiers = more ingredients of same type. Hearty versions provide best stats."},
{type:"tip",text:"Higher-quality ingredients or more skill can produce better tier automatically."},
{type:"heading",text:"Getting Ingredients"},
{type:"tip",text:"Meat: hunt animals (bow headshots = instant kill, 3-4 meat each) or buy from butcher."},
{type:"tip",text:"Vegetables: farms, wild plants, Grocer's Shop in Hernand (apple+carrot icon on map)."},
{type:"tip",text:"Grains (Lentils/Barley/Wheat/Peas): farm stands, shops. Substitutable in most recipes."},
{type:"tip",text:"Water: wells, water sources, merchant purchase. Base for all pot recipes."},
{type:"tip",text:"Salt/Oil/Sugar: seasoning shops (same shop as vegetables usually)."},
{type:"tip",text:"Dispatch missions return Wheat, Apples, Grapes, Wine, Eggs to Supply Box. Check it regularly."},
{type:"tip",text:"Camp farm + ranch (unlocked via Greymane quests) = self-sufficient ingredient supply."},
{type:"heading",text:"Recipe Locations"},
{type:"tip",text:"Fish Porridge: Renee's side quest at Butchery. Battered Meat and Fish: behind Hernand inn counter."},
{type:"tip",text:"Meat + Vegetable Porridge: Hernand Castle kitchen (The First Encounter quest). Fishball Soup: near Hernand Constabulary."},
{type:"tip",text:"Pan-Fried Rice Cakes / Braised Fish / Pickled Vegetable: purchase from Pailune Inn."},
{type:"tip",text:"Bird Soup: Pailune Inn (17 Silver — expensive but strong). Special Meal: Demeniss Castle kitchen."},
{type:"tip",text:"Lonnie at Greymane Camp: gives free Chewy Rice Cakes + Porridge daily. Resets every day — always check."},
{type:"links",pages:["alchemy-recipes","boss-general","greymane-camp","mining-gathering"]}
]},
"alchemy-crafting":{category:"Cooking & Crafting",title:"Alchemy Recipes & Elixirs",
tags:["alchemy","elixir","palmar pill","cauldron","recipe","potion","astrid","meliara","haiden","freya","platinum"],
content:[
{type:"intro",text:"Craft elixirs for combat buffs, revival pills, and valuable materials. Recipes found via exploration, theft, and research projects."},
{type:"heading",text:"Cauldron Locations"},
{type:"location",text:"Shadow's Whisper Cave (north Hernand, thin crack in cliff face near Three Saints Falls) — first accessible cauldron."},
{type:"tip",text:"Elowen's tower (inside her Witch house after Ch5) — best location in Hernand, near crafting and gear services."},
{type:"tip",text:"Additional cauldrons in each major region. Look for bubbling pot icons on map."},
{type:"heading",text:"Key Recipes"},
{type:"tip",text:"Palmar Pill: AUTO-REVIVE at 30% HP. Recipe on table inside Shadow's Whisper Cave. Materials: plant-based (Rosemary, Cotton, etc.)."},
{type:"tip",text:"Haiden's Lesser Elixir: 4 sec no Spirit consumption. Recipe in a Hernand house (no key needed). Great for extended Force ability use."},
{type:"tip",text:"Astrid's Lesser Elixir: 4 sec ignore stamina consumption. Huge for dodge-heavy boss fights."},
{type:"tip",text:"Meliara's Lesser Elixir: +75 HP + Attack Speed for 5 minutes. Recipe in Mudridge Cabin (north Pororin woods) — behind picture sliding puzzle door."},
{type:"tip",text:"Freya's Elixir: premium combat buff. Recipe from Scholastone Plant Combination Research (120 Silver) or House Roberts quest reward."},
{type:"tip",text:"Platinum: recipe at Scholastone. High-value crafting material."},
{type:"heading",text:"Research-Unlocked Recipes"},
{type:"location",text:"Scholastone: Faded Abyss Artifact, Palmar Pill, Beekeeper's Gear, Shadowleaf Disguise, all elixir formulas."},
{type:"tip",text:"Gold Bar crafting: Spire of Insight (south of Pororin Village). Multiple Witch recipes."},
{type:"heading",text:"Recipe Tips"},
{type:"tip",text:"Examine recipe scrolls to learn permanently → then SELL the scroll for silver + vendor trust."},
{type:"tip",text:"Books: open → find glowing blue text page → learn. Books take an inventory slot until read."},
{type:"tip",text:"Some recipes ONLY obtainable by stealing. Check locked rooms in manors."},
{type:"tip",text:"Improvisation: experiment with unknown ingredient combos at cooking pots. Cook 3x = permanently learned."},
{type:"tip",text:"Cauldron recipes ≠ cooking pot recipes. Cauldrons for alchemy/elixirs, pots for food."}
]},
"puzzles-abyss":{category:"Puzzles",title:"Abyss Puzzles",
tags:["abyss","puzzle","axiom force","force palm","skybridge","power core","kuku pot","CPU","laser","elevator"],
content:[
{type:"intro",text:"The Abyss is a floating sky island realm with dozens of interconnected puzzle areas. Each island is a self-contained brain teaser — solve it to activate a spire/totem and earn an Abyss Artifact."},
{type:"heading",text:"Core Mechanics"},
{type:"tip",text:"Axiom Force (L3): grab and move objects, rotate switches. Force Palm (RS charge): slam objects into sockets. Both work while climbing and jumping."},
{type:"tip",text:"Kuku Pot: grab power cores with Axiom Force → press Y/Triangle to pocket them. Carry cores between puzzle sections."},
{type:"tip",text:"SHEATHE WEAPONS for platforming. Targeted aiming locks ledges for reliable grabs."},
{type:"heading",text:"Skybridge Puzzles"},
{type:"tip",text:"Walk through triangular arch → Axiom Force on dial → rotate D-pad until charging sound + glow → STOP. Bridge powers up."},
{type:"tip",text:"Multiple skybridges chain together. Each requires the same dial-rotation mechanic."},
{type:"heading",text:"Abyss Cell Puzzles"},
{type:"tip",text:"Move floating blue cube (power core) to lantern slot using Axiom Force."},
{type:"tip",text:"Drop down → grab blue square → line up with matching slot → Force Palm to punch into place."},
{type:"tip",text:"Watch hologram animation after insertion to confirm correct placement."},
{type:"heading",text:"CPU Slot Puzzles"},
{type:"tip",text:"Large rooms with deactivated machines. Floating CPUs must go into ground-level slots."},
{type:"tip",text:"Some CPUs must be rearranged — pull one out, place it in a different slot, then fill the remaining."},
{type:"tip",text:"Finish with a downward Force Palm on the central gear to complete."},
{type:"heading",text:"Laser Block Puzzles"},
{type:"tip",text:"Rotate cubes to align laser beams with wall gems. Start from the side with 2 lasers."},
{type:"tip",text:"Some have guarded chests — use nearby blocks to physically block laser beams to reach the chest safely."},
{type:"tip",text:"Laser chests often contain Faded Abyss Fragments + Abyss Gears (e.g., Haste 2)."},
{type:"heading",text:"Elevator Puzzles"},
{type:"tip",text:"Symbols on walls show target positions. Climb wall and hang off triangular symbol to drop it to correct slot."},
{type:"tip",text:"If you drop a symbol too far, Force Palm it from below to push it back up. Then rehang to correct position."},
{type:"tip",text:"Circle and sideways-X symbols are often already correct after inserting Engraved Cubes."},
{type:"heading",text:"Wind & Platform Sections"},
{type:"tip",text:"Activating wind generators creates air currents for gliding between islands."},
{type:"tip",text:"Crumbling platforms — move FAST. No second chances."},
{type:"tip",text:"Catapult Jump (R3 x3) + Double Jump for reaching seemingly impossible heights."},
{type:"heading",text:"Post-Scholastone"},
{type:"tip",text:"Second set of Abyss puzzles requires arrows. Bring plenty."},
{type:"tip",text:"Complexity increases significantly — multi-room puzzles with power core transport between sections."},
{type:"links",pages:["puzzles-ancient-ruins","puzzles-sealed-artifacts","axiom-bracelet"]}
]},
"puzzles-ancient-ruins":{category:"Puzzles",title:"Ancient Ruins Challenges",
tags:["ancient ruins","abyss cresset","mysterious energy","dial","mural","angel statue","stepping stone","red light green light","bell","fountain"],
content:[
{type:"intro",text:"Scattered across Pywel. Each contains an Abyss Cresset (fast travel + Artifact). Appear as 'Mysterious Energy' fog-of-war with question marks on map. Use Blinding Flash from high ground to spot them."},
{type:"heading",text:"Puzzle Types"},
{type:"tip",text:"8 distinct types found so far. Track completed ones via Journal → Challenges → The Thread in the Forest."},
{type:"heading",text:"Angel Statue Puzzles"},
{type:"tip",text:"Angel Statue beam points at a side statue (sun, moon, vase, shield, horse, etc.)."},
{type:"tip",text:"Walk to stone plinth → Stab ability (R1+Triangle / RB+Y) to rotate selection dial to matching symbol."},
{type:"tip",text:"Round 1: match one symbol. Round 2: match two. Subsequent rounds add more."},
{type:"tip",text:"Need 'pixel perfect' alignment. Listen for audible stone-grating 'thunk' = locked in."},
{type:"location",text:"First one found south of St. Halssius House of Healing."},
{type:"heading",text:"Symbol Stepping Stone (S3) Puzzles"},
{type:"tip",text:"Step on initial plate → walk to matching symbol. Cannot step on other active symbols or same grey plate twice."},
{type:"tip",text:"3 rounds: Round 1 = 1 pair, Round 2 = 3 pairs, Round 3 = 5 pairs."},
{type:"tip",text:"Use lantern while walking to avoid accidentally stepping on wrong symbol."},
{type:"location",text:"First one found south of Fort Perwin near Scholastone."},
{type:"heading",text:"Mural Puzzles (Hardest)"},
{type:"tip",text:"Cracked wall shows map of real-world location. Travel there to find clue drawings on cliff faces."},
{type:"location",text:"Dragon's Stone Chamber: 3 rotating dials near Greymane Camp. Clues at Anvil Hillside Terrace cliff faces."},
{type:"location",text:"Dragon's Stone Solution: Left dial = Sun/Moon pointing UP. Middle dial = U-shape pointing LEFT (~10 o'clock). Right dial = X-shape in TOP RIGHT (~1 o'clock)."},
{type:"tip",text:"Rewards: Abyss Artifact + Memories of Abundance puzzle piece (goes in Kuku Pot)."},
{type:"location",text:"Azure Moon Labyrinth: Entrance at Phoniel Ranch — wooden shack with ladder (NOT the cave door). Fire traps inside."},
{type:"location",text:"Azure Moon mural depicts Pororin Forest village. Letters E, F, P with additional lines = code. Travel to Pororin to decode."},
{type:"heading",text:"Fountain Puzzles"},
{type:"tip",text:"Use Stab ability on fountain sockets → move sideways to rotate. Aim waterspouts until both fill the central basin."},
{type:"tip",text:"Found west of Hills of No Return."},
{type:"heading",text:"Bell/Mallet Puzzles"},
{type:"tip",text:"Pick up Mallet and equip it. Read symbol board. Strike bells 1st→6th ascending, then 4th→1st descending."},
{type:"location",text:"Found in Steel Mountains near Spire of Insight."},
{type:"heading",text:"Red Light Green Light"},
{type:"tip",text:"Step on stone plate → soldier statues raise swords. Approach king statue at far end."},
{type:"tip",text:"King turns around periodically with lit eyes. STOP MOVING when eyes light up. Red eyes = restart."},
{type:"location",text:"Found in Drakesfall Gorge near Hernand soldiers camp, on Demeniss border."},
{type:"heading",text:"Halssius Conflux"},
{type:"tip",text:"Move grid to match symbols. Statue-based grid puzzle south of St. Halssius House of Healing."}
]},
"puzzles-strongbox":{category:"Puzzles",title:"Strongbox Puzzles",
tags:["strongbox","treasure","safe","mechanical","owl","melody","piston","cylinder","manor","castle","recipe","loot"],
content:[
{type:"intro",text:"Locked containers inside manors and castles with unique mechanical puzzles. Contain rare accessories, recipes, and weapons. MUST wear mask to steal contents after solving. -5 Contribution per theft."},
{type:"heading",text:"All Known Locations"},
{type:"table",headers:["Location","Puzzle","Reward","Access"],
rows:[
["Bluemont N","Rotating owl (4 buttons)","Oath of Darkness earring (+2 DEF)","2F, no guards"],
["Bluemont S","Cylinder tumbler","Crafted Gold Necklace","2F balcony. Key needed"],
["Hernand Castle","Melody replication","Castle vault loot","Attire + key + mask"],
["Hillside Manor","Cylinder tumbler","Saint's Necklace (stamina)","SW window climb"],
["Lioncrest Manor","—","+ Hwando, Rhonid, Gloves","2F rear window"],
["Mudridge Cabin","2 painting puzzles","Meliara's Elixir Recipe","2nd opens hidden door"],
["Glenbright Manor","Combat first","Practice spot","Reed Devil attack on arrival"]
]},
{type:"heading",text:"Bluemont Manor — Owl Puzzle (North Building)"},
{type:"location",text:"Location: Western Hernand, 2nd floor southernmost room. No guards, no locked entrance."},
{type:"tip",text:"4 buttons rotate sections of hexagonal prism with owl image. Each button affects overlapping sets."},
{type:"tip",text:"Button 1 = sections 1-2-3. Button 2 = sections 2-3. Button 3 = section 3 only. Button 4 = sections 1 and 4."},
{type:"tip",text:"Solve order: Button 4 → align section 4. Button 1 → align section 1. Button 2 → align section 2. Button 3 → align section 3."},
{type:"tip",text:"Puzzle resets if you back out — no penalty for restarting."},
{type:"tip",text:"Reward: Oath of Darkness earring (+2 Defense, Antumbra follower item). May require Estate in Dismay quest progress."},
{type:"heading",text:"Bluemont Manor — Piston/Cylinder (South Building)"},
{type:"location",text:"Location: 2nd floor western room. Ground floor guarded but 2nd floor balcony unguarded. Door requires key."},
{type:"tip",text:"Cylinder tumbler: raise each cylinder so silver tops clear wood paneling line, golden bottoms stay below."},
{type:"tip",text:"Far left and far right cylinders need MOST elevation. Middle needs minor adjustment."},
{type:"tip",text:"Use right-side button to test alignment. Every 2 thumb movements = 1 segment."},
{type:"tip",text:"Reward: Crafted Gold Necklace."},
{type:"heading",text:"Hernand Castle — Melody Puzzle"},
{type:"tip",text:"Requires: castle access (Hernandian Attire) + room key + mask."},
{type:"tip",text:"Crank dial on right side of box until it slows and catches → release → melody plays."},
{type:"tip",text:"Crank again to replay. Copy the melody on the keys."},
{type:"tip",text:"Reward: Castle vault loot (see Crime guide for full heist details)."},
{type:"heading",text:"Hillside Manor — Cylinder Tumbler"},
{type:"tip",text:"Same cylinder mechanism as Bluemont South. Use southwest window climb to avoid guards."},
{type:"tip",text:"Reward: Saint's Necklace (temporary stamina boost)."},
{type:"heading",text:"Lioncrest Manor"},
{type:"tip",text:"Northwest outskirts of Hernand. Heavily guarded. Enter via 2nd floor rear window."},
{type:"tip",text:"Contains strongbox PLUS: Hwando (side building), Rhonid Shield, Brass Warden Gloves — see Unique Gear page."},
{type:"heading",text:"Mudridge Cabin"},
{type:"tip",text:"2 painting alignment puzzles. First = standard strongbox. Second opens hidden door."},
{type:"tip",text:"Hidden door reward: Meliara's Lesser Elixir Recipe — learn immediately."},
{type:"heading",text:"Glenbright Manor"},
{type:"tip",text:"Located south of Emberwind Workshop. During 'Traces in the Manor' quest."},
{type:"tip",text:"Body falls through gate → Reed Devil combat before you can explore interior."},
{type:"tip",text:"Good practice spot for strongbox mechanics before tackling harder ones."},
{type:"links",pages:["crime","puzzles-environmental","unique-gear-locations"]}
]},
"puzzles-environmental":{category:"Puzzles",title:"Environmental Puzzles",
tags:["environmental","secrets","hidden","vines","spire","treasure map","visione","memory fragment"],
content:[
{type:"intro",text:"The open world is packed with hidden interactions, environmental puzzles, and secret discoveries that reward exploration."},
{type:"heading",text:"Spire of the Stars"},
{type:"tip",text:"Insert Engraved Key → enter elevator shaft with 2 side rooms."},
{type:"tip",text:"Push against glowing symbols on walls in each room to spin them → receive Engraved Cube items."},
{type:"tip",text:"Insert cubes into 3 symbols along bottom of far wall → they rise to top."},
{type:"tip",text:"Hang off symbols to lower them to positions shown in side room walls. Circle and sideways-X may already be correct."},
{type:"tip",text:"If you lower one too far: Force Palm from below pushes it back up."},
{type:"heading",text:"Thinker's Meadow Abyss Nexus"},
{type:"tip",text:"Fast travel next to Greymane Camp at Howling Hill. Was ONLY way to teleport home before Day 1 patch added a new point."},
{type:"tip",text:"Still worth solving — adds second fast travel to your base area."},
{type:"tip",text:"Broken Nexus missing a component. Multi-step rebuild puzzle."},
{type:"heading",text:"Memory Fragments & Visione"},
{type:"tip",text:"Lantern pulses BLUE near Memory Fragments. Activate Visione to read them."},
{type:"tip",text:"Visione scenes: find location → light all lanterns → fragment unlocked."},
{type:"location",text:"Sanctum of Benediction (hidden door behind lit statue), Sanctum of Temperance (wall hole + crouch) — contain unique armor."},
{type:"heading",text:"Vegetation & Mechanisms"},
{type:"tip",text:"Blinding Flash: burns vines/vegetation blocking paths. Reveals hidden cables."},
{type:"tip",text:"Follow cables to mechanisms — Force Palm activates connected puzzles."},
{type:"tip",text:"Ice arrows create water platforms — cross rivers, reach island chests."},
{type:"heading",text:"Music Puzzles"},
{type:"tip",text:"Stand in cave light beam → RB+LB → LB to pick up instrument. Play sequence shown."},
{type:"heading",text:"Treasure Maps"},
{type:"tip",text:"Found on tables, in chests, purchased from vendors. Show hand-drawn locations."},
{type:"tip",text:"Treasure Map Piece 7: requires a very long walk to specific location."},
{type:"heading",text:"General Tips"},
{type:"tip",text:"High ground + Blinding Flash = spot shining beacons in the distance (gear, materials, puzzles)."},
{type:"tip",text:"What looks like environment decoration may be interactive. Stab/Force Palm anything suspicious."},
{type:"tip",text:"Some puzzle rewards go to Kuku Pot — check it at camp if rewards seem missing (or use lost item recovery)."}
]},
"puzzles-sealed-artifacts":{category:"Puzzles",title:"Sealed Artifact Challenges",
tags:["sealed","abyss artifact","challenges","combat challenge","mastery","roadside","shrine","lantern"],
content:[
{type:"intro",text:"141 Sealed Abyss Artifacts scattered across Pywel. The primary progression system — completing challenges earns Abyss Artifacts (skill points), Faded Artifacts (respec items), or Abyss Gears."},
{type:"heading",text:"Finding Them"},
{type:"tip",text:"Almost always on roadside shrines (small stone pedestals). Run with LANTERN OUT — they emit a ring of light visible from a distance."},
{type:"tip",text:"Best strategy: unfog the entire map FIRST by ringing all 8 bells, then systematically sweep each region."},
{type:"tip",text:"Track completed/incomplete via Journal → Challenges. Order in menu is fixed — easy to compare against guides."},
{type:"heading",text:"How They Work"},
{type:"tip",text:"Pick up artifact → check Journal → Challenges (or inventory) to see the requirement."},
{type:"tip",text:"Complete the challenge → interact with Sealed Artifact in inventory to claim reward."},
{type:"tip",text:"NOT all reward Abyss Artifacts. Some give Faded Abyss Fragments (respec) or Abyss Gears (equipment runes)."},
{type:"heading",text:"Challenge Types"},
{type:"tip",text:"Sword Mastery: 'Defeat 3 enemies without taking damage,' 'Kill 3 at once with Turning Slash,' etc."},
{type:"tip",text:"Bow Mastery: 'Take down 5 enemies with bow in 60 seconds,' 'Hit 3 mid-air targets,' 'Kill 5 at once from 20m+.'"},
{type:"tip",text:"Spear Mastery: 'Land 15 counterattacks in 30 seconds,' 'Hit enemies 50 times in 30 seconds,' 'Kill 3 with Leap Attack.'"},
{type:"tip",text:"Horse: Riding and mounted combat challenges spread across regions."},
{type:"tip",text:"Training: Movement and traversal challenges ('Keeping Balance on the Wind,' 'Steel Grip Against the Chest')."},
{type:"tip",text:"Life: Exploration challenges including the Pets challenge (tame 30 pets = most grindy)."},
{type:"tip",text:"Trade/Operations: Commerce and faction-related challenges."},
{type:"tip",text:"Challenges and Changes: Special multi-step challenges ('Consecutive Wins in Thrones,' 'Well-Informed Greymane,' etc.)."},
{type:"heading",text:"Priority Tips"},
{type:"tip",text:"Sword and Bow challenges easiest to complete passively while playing."},
{type:"tip",text:"Pets challenge (Life 9) = most grindy. Requires 100 trust with 30 different animals."},
{type:"tip",text:"Horse challenges require decent trust level — build trust first."},
{type:"tip",text:"Find the Witches' saddleries challenge: visit all 5 Witch locations."},
{type:"tip",text:"Grab the 2 at Meandering Hills bridge during Prologue — free early boost."}
]},
"horses-deep":{category:"Exploration",title:"Horse Taming & Trust",
tags:["horse","taming","trust","legendary","drifting","double jump","royler","rokade","camora","saddlery"],
content:[
{type:"intro",text:"Deep taming, trust levels 1-5, legendary horses, equipment, and mounted combat."},
{type:"heading",text:"Taming"},
{type:"tip",text:"Sprint after wild horse → mount → hold movement toward TAIL direction → fill rope icon before stamina depletes."},
{type:"tip",text:"Can't eat during taming. Fail = thrown off, retry unlimited."},
{type:"tip",text:"Hold back on stick, camera behind horse = conserves stamina."},
{type:"tip",text:"Wild = random stats (revealed after taming). Purchased = visible stats."},
{type:"heading",text:"Trust 1-5"},
{type:"stat",text:"Lv1: Walk + gallop. Lv2: Better speed. Lv3: DRIFT + Back Kick. Lv4: SPRINT. Lv5: Faster swimming."},
{type:"tip",text:"Legendary horses have different Lv5 skills."},
{type:"heading",text:"Building Trust"},
{type:"tip",text:"Pet: Hold L1/CTRL near horse → Pet prompt. Game DOESN'T tell you this."},
{type:"tip",text:"Feed: Sugarbeet, hay, sugar cubes (Saddlery). Max 3 feeds/day."},
{type:"tip",text:"Ride: passive gain. Mix all three for fastest leveling."},
{type:"heading",text:"3 Legendaries"},
{type:"tip",text:"Royler, Rokade, Camora. Unique skills and stats. Need 6+ stamina to tame."},
{type:"heading",text:"Equipment"},
{type:"tip",text:"Saddlery: Saddle, Horseshoe, Stirrups, Champron, Barding. Annabella's NE of Hernand."},
{type:"tip",text:"Horseshoes with stamina regen (Shabby Horseshoes) = huge for long rides."},
{type:"tip",text:"More items unlock at max merchant trust."},
{type:"heading",text:"Combat & Healing"},
{type:"tip",text:"Mounted combat fully supported. Drifting repositions. Healing Palm (R3→L3) heals horse."},
{type:"heading",text:"Management"},
{type:"tip",text:"Stables: buy (set stats), sell (profit from taming), switch, assign to characters."},
{type:"tip",text:"Abyss Tree has mount nodes (stamina/attributes). Different breeds suit different terrain."},
{type:"links",pages:["fast-travel","traversal","mounts-vehicles"]}
]},
"fast-travel":{category:"Exploration",title:"Fast Travel & Teleport Trick",
tags:["fast travel","teleport","character swap","abyss nexus"],
content:[
{type:"intro",text:"Two types + character swap exploit."},
{type:"tip",text:"Abyss Nexus (step on) and Abyss Cresset (puzzle). Map → double-click/Triangle/Y."},
{type:"tip",text:"Can't use mounted or overloaded. ~40% of Mysterious Energy zones = fast travel."},
{type:"tip",text:"First point often 20+ hours if not actively seeking."},
{type:"heading",text:"Character Swap Teleport"},
{type:"tip",text:"Game tracks each character independently. Switching = instant teleport."},
{type:"tip",text:"Park Damiane at shops, Oongka at blacksmith. 2 custom fast travel points anywhere."}
]},
"traversal":{category:"Exploration",title:"Traversal & Movement",
tags:["traversal","climbing","gliding","grapple","fall damage"],
content:[
{type:"intro",text:"~90 km² with varied traversal."},
{type:"tip",text:"Climbing: any surface (stamina). Force Palm while climbing. Double Jump extends massively."},
{type:"tip",text:"Gliding: Ch1 end. Swift Flight = faster. Catapult (R3 x3) + Double Jump = massive vertical."},
{type:"tip",text:"Fall damage: LETHAL. Always glide. Sprint + F/Y = knockdown opener."},
{type:"tip",text:"Targeted aiming: lock onto ledges for reliable grabs."}
]},
"bell-towers":{category:"Exploration",title:"Bell Towers & Map Guide",
tags:["bells","toll of pywel","map","fog","minimap","icons","shai","pororin guardians","fast travel","nexus","cresset"],
content:[
{type:"intro",text:"8 bells unfog the entire continent. Each counts toward the Toll of Pywel quest (Pororin Forest Guardians faction). TOP PRIORITY in every new region."},
{type:"table",headers:["#","Location","Region","Notes"],
rows:[
["1","Hernand Clocktower","Hernand","N of town, W of tavern. First and easiest"],
["2","Scholastone Institute","Hernand","SW mountains. Pagoda at end of upper courtyard garden. Ch4 story visit"],
["3","Calphade","Hernand/Demeniss","Unavailable DURING Ch6 (hostile). Ring before or after"],
["4","Demeniss Capital","Demeniss","Tallest clocktower. Hang from flagpole to lower bell. No map icon until activated"],
["5","Delesyia Capital","Delesyia","NW of town. Clocktower. Straightforward"],
["6","Tommaso","Tashkalp","Far NE. Tower in N of city. Climb outside to reach"],
["7","Pailune Town","Pailune","Red tower near docks. Ch7+ only (liberation required)"],
["8","Varnia","Crimson Desert","Far N. Highest dome of palace. Push handle to open dome top"]
]},
{type:"heading",text:"Mechanics"},
{type:"tip",text:"Interact with bell → Shai child cutscene → fog clears for surrounding region. If cutscene doesn't play, the bell didn't count (hostile area)."},
{type:"tip",text:"Bell icon appears on minimap when nearby — even before climbing. Watch for it entering new towns."},
{type:"tip",text:"All regions explorable from Ch1. Only Pailune (Ch7) and Calphade (not during Ch6) have restrictions."},
{type:"heading",text:"Minimap Icons"},
{type:"tip",text:"Orange dots = quest NPCs. Silver = side quests/faction quests. Purple = bounty boards + Sealed Artifacts."},
{type:"tip",text:"White search circle = undiscovered Abyss Nexus nearby. Step on stone platform disk to activate."},
{type:"tip",text:"Guiding Light ability (L1+R1 / LB+RB / CTRL+Click): blue glimmer when Sealed Artifacts nearby."},
{type:"heading",text:"Fast Travel Types"},
{type:"tip",text:"Abyss Nexus: stone platforms with pressure disk. Step on = permanent fast travel. Standard teleporters."},
{type:"tip",text:"Abyss Cresset: activated by solving puzzles at Ancient Ruins. Also permanent fast travel + yields Artifact."},
{type:"tip",text:"Map → double-click/Triangle/Y on any activated point to teleport. Can't use while mounted or overloaded."},
{type:"heading",text:"Abyss Skydive Trick"},
{type:"tip",text:"Open map → switch to sky view → fast travel to floating Abyss island → jump off edge → skydive to ground destination."},
{type:"tip",text:"Bypasses mountains, armies, and walking. Manage stamina while gliding — dip in/out to regen."},
{type:"tip",text:"If you run out of stamina mid-air: Axiom Force grapple suspends you. Pausing while suspended resets to checkpoint."},
{type:"links",pages:["fast-travel","puzzles-ancient-ruins","puzzles-sealed-artifacts"]}
]},
"mounts-vehicles":{category:"Exploration",title:"Other Mounts & Vehicles",
tags:["dragon","wagon","train","mech","ATAG","cloudcart"],
content:[
{type:"intro",text:"Beyond horses: dragons, mechs, wagons, trains, balloons."},
{type:"tip",text:"Dragon: late-game full flight."},
{type:"tip",text:"ATAG Mech (Ch10): machine gun, blast cannon, EMP, ramming. Upgradeable with lasers/pincers/plating."},
{type:"tip",text:"Wagons: Brice at Camp. Trade goods to Posts. Stolen wagons → Wagon Fence."},
{type:"tip",text:"Cloudcart: craftable balloon. Trains: Delesyia tracks, grapple on."}
]},
"dragon-atag":{category:"Exploration",title:"Dragon & ATAG Mech",
tags:["dragon","blackstar","ATAG","mech","fly","fireball","machine gun","cannon","EMP","upgrade","gorthak","delesyia"],
content:[
{type:"intro",text:"Two endgame power mounts that completely change gameplay. Dragon = flight + fire. ATAG = walking tank. Both are story-locked."},
{type:"heading",text:"Blackstar Dragon"},
{type:"tip",text:"First encounter: Ch9 Shattered Stars at Urdavah palace. Pull spear from wounded Blackstar in cutscene."},
{type:"tip",text:"Permanently unlocked: Ch11 Foreboding Shadow: Whispers in the Wind. Unmissable story reward."},
{type:"tip",text:"Requires Stamina Lv5+ during the Ch9 riding sequence. Upgrade before entering."},
{type:"heading",text:"Dragon Controls"},
{type:"tip",text:"Summon: Hold Down D-pad, select with Right Stick. Can also fly to Abyss islands."},
{type:"tip",text:"Fireballs (R1): rapid succession. Lock-on function for multi-target fireballs."},
{type:"tip",text:"Fire Breath (R2): sustained beam. Both drain stamina but it regens even in the air."},
{type:"tip",text:"Can dive-bomb enemy camps, clear outposts, and scorch fortresses from above."},
{type:"heading",text:"Dragon Limitations"},
{type:"warning",text:"Active for ~15 minutes per summon. Then 50 MINUTE real-time cooldown. Cannot reduce this timer."},
{type:"tip",text:"Cannot use in Abyss realm. Save dragon for when you truly need it — nuclear option."},
{type:"tip",text:"5 dragons total in the game. Blackstar is the first and guaranteed."},
{type:"heading",text:"ATAG Mech"},
{type:"tip",text:"Unlocks: Ch10 at Gorthak (Ironflame Orcs bastion in Delesyia). Story mission vs mecha creatures."},
{type:"tip",text:"After Ch10: speak to Marek at Zargan Tankworks to craft your own ATAG permanently."},
{type:"heading",text:"ATAG Weapons"},
{type:"table",headers:["Weapon","Type","Source"],
rows:[
["Machine Gun","Rapid-fire primary","Default"],
["Blast Cannon","Wide-area AoE","Default"],
["EMP Discharge","Stun all nearby","Default"],
["Ramming","Melee charge","Default"],
["ATAG Laser","Precision beam","Gorthak Ironworks research"],
["ATAG Cannon","Heavy artillery","Gorthak research (130 Sv, 23h)"],
["ATAG Pincers","Melee grab","Gorthak research"],
["ATAG Fist","Close combat","Dewhaven Keep research"],
["ATAG Machine Gun Mk2","Upgraded rapid-fire","Dewhaven research (130 Sv, 20h)"],
["ATAG Flamespitter","Fire AoE","Dewhaven research"],
["ATAG Boots Mk II/III","Mobility upgrade","Delesyia Castle research"]
]},
{type:"heading",text:"ATAG Tips"},
{type:"tip",text:"Battery = health pool. When charge depletes, ATAG is useless. Visit ATAG factories around Gorthak to get fresh mechs."},
{type:"tip",text:"Pull lever at any ATAG factory to spawn a new one. Regent's Rise has many available."},
{type:"tip",text:"Serves as your offensive mount between dragon cooldowns. Upgrade BEFORE the Golden Star boss fight."},
{type:"tip",text:"Save rare dyes for the War Robot — it has the most dyeable sections of anything in the game."},
{type:"heading",text:"Other Exotic Mounts"},
{type:"tip",text:"Bears: ground combat mount. Can slash and bite. High HP pool. Good for fights."},
{type:"tip",text:"Dinosaurs/Raptors: tall vantage point, heavily armored, slow but high stamina."},
{type:"tip",text:"Direwolf: rideable giant wolf (shown in launch trailer)."},
{type:"tip",text:"Trains: Delesyia railroad tracks. Grapple onto moving train, ride across countryside."},
{type:"tip",text:"Cloudcart: craftable balloon from Emberwind Workshop. Cloudcruiser upgrade via Scholastone research."},
{type:"tip",text:"29 total mounts in the game across horses, bears, raptors, lizards, dragons, mechs, and dinosaurs."},
{type:"links",pages:["horses-deep","mounts-vehicles","research-institutes"]}
]},
"pets":{category:"Exploration",title:"Pets & Companions Deep Dive",
tags:["pets","dogs","cats","trust","loot","auto loot","tame","clothes","cosmetics","pororin","30 pets"],
content:[
{type:"intro",text:"Hidden system the game never explains. Dogs and cats auto-loot enemies in combat. 30 unique pets for a Life Challenge (Natural Collector trophy). Here's everything."},
{type:"heading",text:"Trust System"},
{type:"tip",text:"Every animal starts at 0. Reach 100 Trust → 'Take In' prompt appears. Animal becomes permanent pet."},
{type:"tip",text:"Petting: +5 trust per pet, max 5x per in-game day = 25/day. Dogs: approach + hold button. Cats: pick up first (hold carry) → then pet."},
{type:"tip",text:"Feeding: drop food from inventory near animal. 3 feeds per day max."},
{type:"tip",text:"Dogs: meat = +35 trust per feed. Can reach 100 in ONE day with 3 fine meat feeds (+105) + petting (+25)."},
{type:"tip",text:"Cats: bird meat, fish, or milk only = +10 trust per feed. Takes 2-3 in-game days minimum."},
{type:"warning",text:"UNSUMMON active pet before feeding strays — your pet will steal the food. Other animals and NPCs can grab it too."},
{type:"heading",text:"Management"},
{type:"tip",text:"Inventory → Pets tab. Summon, unsummon, or Untie (release permanently)."},
{type:"tip",text:"Max 30 pets. Only ONE active at a time. They call on horseback if you summon while riding."},
{type:"tip",text:"Greymanes side quest 'The Greymanes' New Fangs' (Ch4+, Scattered Embers tab) = pet tutorial quest."},
{type:"heading",text:"Auto-Loot"},
{type:"tip",text:"Summoned pets sprint around battlefield looting corpses. Massively useful."},
{type:"warning",text:"NO loot filter — picks up EVERYTHING including junk. Expand inventory first or you'll be full constantly."},
{type:"tip",text:"Items go to YOUR inventory directly (no separate pet inventory)."},
{type:"tip",text:"Also loots from destructible objects and refining materials from ores/trees."},
{type:"heading",text:"Pet Cosmetics"},
{type:"tip",text:"Pet Tailor's Shops sell outfits, tiny armor, helmets."},
{type:"tip",text:"Milou's Shop in Pororin Forest Village (unlocked after 'Unreachable Village' quest / 'Trembling Woods' faction quest)."},
{type:"tip",text:"Second shop: SW of Demeniss Castle. Sells Puppy Plate Helmet, Rescue Puppy Outfit."},
{type:"heading",text:"Where to Find Animals"},
{type:"tip",text:"Dogs and cats in every major town. Animals stay in same general area but wander slightly."},
{type:"tip",text:"First encounter: bulldog on riverbank when Kliff wakes up at game start."},
{type:"tip",text:"Only dogs and cats can become pets. Other animals can be picked up but not tamed."},
{type:"heading",text:"Speed Tips"},
{type:"tip",text:"Dogs: 1 fine meat feed + petting = 60 trust/day. 2 days to tame."},
{type:"tip",text:"Cats: feed fish (catch bare-hand for free supply) + pet 5x = 55 trust/day. 2 days."},
{type:"tip",text:"Rest at cooking fires to skip time. Minimum 4 days pure petting, 2 days with optimal feeding."},
{type:"tip",text:"30 pets needed for Life 9 challenge — most grindy Sealed Artifact challenge in the game."},
{type:"links",pages:["fishing","side-activities","faction-quests"]}
]},
"crime":{category:"Economy & Reputation",title:"Crime System",
tags:["crime","stealing","mask","pickpocket","bounty","vault","keys"],
content:[
{type:"intro",text:"Full crime with consequences."},
{type:"heading",text:"Mask"},
{type:"tip",text:"Jeffrey bounty (Guard Station → tackle → return = free Mask). Or Back Alley Shop 10 Copper."},
{type:"heading",text:"Stealing"},
{type:"warning",text:"Equip mask → Lantern → steal. Red circle = crime scene. -5 Contribution even undetected."},
{type:"warning",text:"UNEQUIP mask when done — also enables attacking NPCs."},
{type:"tip",text:"Some Crafting Recipes ONLY obtainable by stealing."},
{type:"heading",text:"Keys"},
{type:"tip",text:"Back Alley: 30 Copper. Most locked doors. Windows = free alternative."},
{type:"heading",text:"Types"},
{type:"tip",text:"Item theft, pickpocketing (sprint into NPC), wagon theft (→Fence), livestock (→Black Market), vandalism."},
{type:"heading",text:"Bounties"},
{type:"tip",text:"Church → Writ of Absolution. Guard capture = brief jail. 1-2 quests offsets crime spree."},
{type:"heading",text:"Best Heists"},
{type:"tip",text:"Hernand Castle Vault: loot inside → wait timer → 90+ silver. Open strongboxes in inventory."},
{type:"tip",text:"Hernand Bank (west of inn): 40+ silver per chest. Glenbright Manor: practice spot."},
{type:"links",pages:["economy","vendors-shopping","faction-rep"]}
]},
"economy":{category:"Economy & Reputation",title:"Making Money",
tags:["money","silver","economy","bounty","bank","gold bars"],
content:[
{type:"intro",text:"Silver for gear, sockets, bags, investments."},
{type:"heading",text:"Fast Methods"},
{type:"tip",text:"Archery contests (best early). Bounties (repeatable, ~10 silver + drops). Fist fighting. Spear duelling."},
{type:"tip",text:"Gambling at Duo. Wagon trading. Sell stolen livestock. Sell read recipes."},
{type:"tip",text:"Castle vault: 90+ silver. Bank heist: 40+ per chest. Mining Bloodstone (Witchwoods) sells high."},
{type:"heading",text:"Bank Investments"},
{type:"tip",text:"Open account: 100 Silver at any Bank (universal). Deposit Gold Bars (= 500 Silver)."},
{type:"tip",text:"Low/Medium/High Risk strategies. High = biggest yield but can lose deposit."},
{type:"tip",text:"Traveling Treasure Goblins drop Gold Bars randomly."},
{type:"heading",text:"Hidden"},
{type:"tip",text:"CTRL/LB in shops = hidden buy options. Enemy drops sell for quick silver everywhere. Bandit camps = coin purses."},
{type:"links",pages:["crime","trading-wagons","gambling-minigames","vendors-shopping"]}
]},
"faction-rep":{category:"Economy & Reputation",title:"Faction Reputation",
tags:["reputation","contribution","faction"],
content:[
{type:"intro",text:"110 factions, 5 tiers."},
{type:"tip",text:"War → Hostile → Neutral → Friendly → Alliance."},
{type:"tip",text:"Affects areas, NPCs, services, quests, vendor prices."},
{type:"tip",text:"Contribution Shops have exclusive gear."},
{type:"tip",text:"Greymanes: 99 quests (34+38+27). Hernand: 9+ sub-factions."},
{type:"tip",text:"-5 per theft, -30 per murder. 1-2 quests offsets theft."}
]},
"trading-wagons":{category:"Economy & Reputation",title:"Trading & Wagons",
tags:["trading","wagon","trade goods","goldleaf","trading post","black market","carl","brice","pack","sell"],
content:[
{type:"intro",text:"Buy low, sell high across Pywel. Prices fluctuate on in-game weekly basis. Requires camp upgrades and a wagon for serious profit."},
{type:"heading",text:"Unlocking Trading"},
{type:"tip",text:"Ch2: After defeating Hornsplitter → unlocks Goldleaf Guildhouse access. Can sell unpackaged trade goods directly."},
{type:"tip",text:"Ch3: Rebuild camp → unlocks Carl (Camp Provisioner) for packaging."},
{type:"tip",text:"Wagon: Complete 'A Rumor in Glenbright Farm' → unlocks Brice (Wagonmaster) → do 'Brice's Request' → inspect Timberturner Wainwright."},
{type:"tip",text:"Need a Freesword with Engineering skill (Arnold from 'Rumor in St. Halssius' or Otto). Dispatch mission builds wagon."},
{type:"tip",text:"Full wagon access typically Ch4-5. System is somewhat buggy at launch."},
{type:"heading",text:"Packaging Goods"},
{type:"tip",text:"Talk to Carl → Camp Provisions → select inventory items → Package (100 camp funds per item)."},
{type:"tip",text:"Press P/L3 to package camp resources — every 1,000 becomes one packed trade good."},
{type:"tip",text:"Donate unwanted gear to Carl instead → converts to camp resources (not trade goods)."},
{type:"heading",text:"Selling"},
{type:"tip",text:"Load packed goods onto wagon via Brice → 'Load Supply to Wagon.' Drive wagon to Trading Post."},
{type:"location",text:"Goldleaf Guildhouse (east): minimum 25 stacks. Check buy/sell lists and value trend indicators on map."},
{type:"tip",text:"Royal Trading Post (north of Hernand Castle): accepts goods on arrival via cutscene."},
{type:"tip",text:"Black Market vendors: buy any item, no minimums. Faster than wagon runs — best efficiency for quick profit."},
{type:"tip",text:"Can also load packed goods onto horse for smaller deliveries."},
{type:"heading",text:"Trade Goods Sources"},
{type:"tip",text:"Blue background items in inventory = trade goods. Calligraphy paintings, tobacco, red ginseng, ceramics."},
{type:"tip",text:"Found by: stealing, chest looting, quest rewards, Dispatch missions (most reliable long-term), direct purchase at Goldleaf."},
{type:"heading",text:"Stolen Wagons"},
{type:"tip",text:"Can steal wagons from roads near Trading Centers and caravans. Special gloves = steal without witnesses."},
{type:"warning",text:"Stolen wagons can't be used for legitimate trading. Sell to Wagon Fence (black market) for decent coin."},
{type:"tip",text:"Wagon Fence: north of Unicorn Cliff."},
{type:"heading",text:"Tips"},
{type:"tip",text:"Watch value trends — sell when price is HIGH, buy when LOW. Don't sell during dips."},
{type:"tip",text:"Can sell individual trade goods to any black market vendor without wagon — less profit but way faster."},
{type:"tip",text:"Dispatch missions produce trade goods passively. Keep them running constantly."}
]},
"vendors-shopping":{category:"Economy & Reputation",title:"Vendors & Shopping Tips",
tags:["vendor","shop","merchant","buy","sell","restock","hidden","back alley","provisioner","trust"],
content:[
{type:"intro",text:"Vendor system has many hidden mechanics the game doesn't explain. Master these for huge advantages."},
{type:"heading",text:"Hidden Buy Options"},
{type:"tip",text:"CTRL/LB while inside shops = look closer at displayed items. Some have buy options NOT in the vendor inventory screen."},
{type:"tip",text:"This is how you find hidden weapons, recipes, and gear in shops. Check EVERY display."},
{type:"heading",text:"Restocking"},
{type:"tip",text:"Vendors restock every 2-3 in-game days at midnight. Rest/wait at fires to trigger restock."},
{type:"tip",text:"Mineral shops (Cairn House + Karin Quarry liberation): 6 iron each, restock regularly. Iron = 18 coins."},
{type:"heading",text:"Vendor Trust"},
{type:"tip",text:"Gift items to vendors → improves trust level. Higher trust = more items in stock."},
{type:"tip",text:"Read recipes first (permanent knowledge) → then sell/gift the scroll for silver + trust."},
{type:"heading",text:"Repurchase System"},
{type:"tip",text:"Sold an item? Open vendor's Repurchase tab to buy it back (at higher price)."},
{type:"tip",text:"Stays in repurchase tab for 2-3 in-game days, then disappears forever."},
{type:"tip",text:"Vendor-specific: can only repurchase from SAME vendor you sold to."},
{type:"tip",text:"TEMPORARY STORAGE TRICK: since no storage chests exist, use vendor repurchase tabs as makeshift storage."},
{type:"heading",text:"Sale Prices"},
{type:"tip",text:"Uniform sale prices — same silver for any item at any vendor. No need to shop around."},
{type:"tip",text:"Cooked fish sells well. Read recipes sell for surprising amounts. Refined armor flipping = reliable profit."},
{type:"heading",text:"Key Vendors"},
{type:"tip",text:"Provisioner: tools (pickaxe, axe, lantern), fishing rods, basic supplies."},
{type:"tip",text:"Back Alley Shop: masks (10 Copper), keys (30 Copper). Found in shady city areas."},
{type:"tip",text:"Saddlery (Annabella's NE Hernand): horse equipment. Shabby Horseshoes with stamina regen = essential."},
{type:"tip",text:"Elowen (Witch): Abyss Artifacts for purchase, recipes, alchemy materials."},
{type:"tip",text:"Finley (Nas River Dock): fish, fishing gear, Small Bag."},
{type:"tip",text:"Wandering Street Vendors: rotating stock at landmarks across southern Pywel. Good for consumables when far from town."},
{type:"heading",text:"Farming Money"},
{type:"tip",text:"Red Croton flowers (~1km SW of Hernand): collect in bulk, sell to any vendor."},
{type:"tip",text:"Goblin farming: Fundamentalist Goblins drop Crude Devil Masks — decent sell price."},
{type:"tip",text:"Diamond mining (Hernand Highlands Cavern): 6-8 per deposit, 2+ silver each."},
{type:"tip",text:"Armor flipping: buy/loot leather armor → refine at blacksmith → sell for more than material + base cost."}
]},
"camp":{category:"Base Building",title:"Greymane Camp Deep Dive",
tags:["camp","base","greymane","howling hill","dispatch","freesword","farm","ranch","wagon","expansion","comrades","ross","carl"],
content:[
{type:"intro",text:"Your expandable home base at Howling Hill. Unlocks Chapter 3. Inspired by RDR2's camp system. Grows from bare survival camp into thriving settlement with farm, ranch, workshops, and dispatch system."},
{type:"heading",text:"Unlocking & Starting"},
{type:"tip",text:"Unlocks during Ch3: Howling Hill - Homestead quest. Secure tent → haul supplies → plant banner."},
{type:"tip",text:"Expansion quest: Map → Factions tab → cursor on camp icon → Inspect → Mission List → 'Expand the Camp at Howling Hill.' NOT triggered by NPC or journal."},
{type:"tip",text:"Needs 2+ Comrades (Luke + Ronald from main quest). Assign them → Dispatch → 17 in-game hours to complete."},
{type:"heading",text:"Key NPCs"},
{type:"tip",text:"Ross (helmet icon): Comrade manager + Dispatch Coordinator (unlocks at Camp Lv2). One-stop mission hub."},
{type:"tip",text:"Carl: Provisions. Supply Chest behind him = collects dispatch rewards + missed loot. Donate unwanted gear → converts to camp resources."},
{type:"tip",text:"Brice: Wagon Master. Timberturner Wainwright missions → unlock trade wagons."},
{type:"tip",text:"Cook + Quartermaster: unlock together via 'A Rumor at Glenbright Farm' mission."},
{type:"tip",text:"Naira: side quests unlock pets and color dyes for Kliff."},
{type:"heading",text:"Dispatch (Freesword) System"},
{type:"tip",text:"Send recruited Greymanes on resource-gathering missions across the world. Runs asynchronously while you adventure."},
{type:"tip",text:"Open map → Factions tab → highlight any map location → Inspect → Missions tab. Icons show mission type (wheat=farming, shield=bodyguard, etc.)."},
{type:"tip",text:"OR talk to Ross at camp for centralized Dispatch Coordinator screen."},
{type:"tip",text:"Match comrade skills to mission type for better yields. Engineering skill needed for Wainwright missions."},
{type:"tip",text:"Missions auto-restart when complete. Cancel manually to change tasks."},
{type:"tip",text:"Siege dispatch: send mercenaries to besiege enemy forts → reduced resistance when you visit. Camp management directly affects open-world difficulty."},
{type:"tip",text:"Keep missions running AT ALL TIMES. This is the most reliable resource stream."},
{type:"heading",text:"Facilities"},
{type:"tip",text:"Farm: plant seedlings → harvest crops on schedule. Grains for cooking."},
{type:"tip",text:"Ranch: chickens, cows, goats. Meat + milk + eggs."},
{type:"tip",text:"Emberwind Workshop: craft Cloudcarts (rideable hot air balloons)."},
{type:"tip",text:"Kilnden Workshop: produce Kuku Pots for storing puzzle pieces."},
{type:"tip",text:"Personal House: rest (advances time), alchemy, decoration. Grindstone + Anvil for pre-boss buffs."},
{type:"heading",text:"Resources & Upgrades"},
{type:"tip",text:"5 resource categories: Food, Timber, Stone, Armaments, Silver."},
{type:"tip",text:"4th Expansion: 1,500 armaments + 2,500 stone + 2,500 timber + 4,000 food + 100,000 silver. Armaments are the bottleneck."},
{type:"tip",text:"Buy Copper + Iron from camp weapons merchant to stockpile for upgrades."},
{type:"tip",text:"Donate unwanted gear to Carl → converts to camp resources."},
{type:"heading",text:"Post-Ch7: Pailune Reconstruction"},
{type:"tip",text:"After Ch7: Homecoming, unlock Pailune rebuilding — Pailune Council + Pailune Institute."},
{type:"tip",text:"Large-scale reconstruction projects. Dispatched recruits get meaningful long-term work."},
{type:"heading",text:"Commissions"},
{type:"stat",text:"27 total Greymane Commissions. Each rewards Medium Bag (+3 inventory slots) = up to +81 slots total."},
{type:"tip",text:"MANDATORY for comfortable late-game inventory management."},
{type:"heading",text:"Tips"},
{type:"tip",text:"Recruit scattered Greymanes ASAP — more comrades = more dispatch slots + camp features."},
{type:"tip",text:"'Rumor' quests at various locations lead to old comrades. Some unlock entire new features (shops, ranch, farm)."},
{type:"tip",text:"Supply Chest accumulates silently — check regularly. Rewards pile up from dispatches."},
{type:"warning",text:"No player storage at launch (coming in post-launch update). Inventory is your only general storage."},
{type:"tip",text:"Use bed rest to skip dispatch wait times. Sleep has cooldown (~12 hours in-game) so can't chain rest."},
{type:"links",pages:["faction-quests","trading-wagons","mining-gathering"]}
]},
"chapters":{category:"World Guide",title:"Chapter Overview",
tags:["chapter","walkthrough","story","main quest","progression","recommended","gear","boss order","spoiler"],
content:[
{type:"intro",text:"12 chapters, ~150 hours main story (200+ with side content). Here is each chapter's focus, key bosses, recommended gear level, and critical tips. SPOILER WARNING for boss names and locations."},
{type:"heading",text:"Prologue: Flames of Dawn"},
{type:"tip",text:"Tutorial. Meet the Greymanes. Fight Myurdin (scripted loss). Grab Bekker Axes from underbridge. Learn basics."},
{type:"heading",text:"Ch1-2: Hernand"},
{type:"stat",text:"Bosses: Matthias, Hornsplitter, Excavatron (side) | Gear: Defense 10+ | Skills: Health Lv3, Stamina Lv3"},
{type:"tip",text:"Explore Hernand thoroughly. Buy Canta Plate from Rhett. Grab Oath of Darkness earring (Bluemont). Do Rhett/Turnali/Renee quests for inventory expansion."},
{type:"tip",text:"Hornsplitter drops Sword of the Lord — your weapon for the next 30+ hours. Teach Evasive Roll via observation."},
{type:"heading",text:"Ch3: Homestead"},
{type:"stat",text:"Boss: Reed Devil | Gear: Defense 20+ | Skills: Health Lv4, Stamina Lv4, Keen Senses Lv2"},
{type:"tip",text:"Greymane Camp established. Damiane unlocks. Start dispatch missions immediately."},
{type:"tip",text:"FARM the Ch3 Totem area before killing Reed Devil. Totems spawn infinite enemies = unlimited Abyss Artifacts. Destroyed after boss."},
{type:"tip",text:"40+ Grilled Meat minimum for Reed Devil. 3 phases: parry melee → destroy 5 totems → dodge crescent projectiles."},
{type:"heading",text:"Ch4: The Price of Knowledge"},
{type:"stat",text:"Boss: Tenebrum (Abyss) | Gear: Defense 25+ | Skills: Forward Slash Lv3, Nature's Echo Lv1"},
{type:"tip",text:"Visit Scholastone — start Health cap research + Faded Artifact blueprint. Both critical long-term."},
{type:"tip",text:"Learn Focused Force Palm during Ch4 via Watch and Learn on road to Scholastone."},
{type:"heading",text:"Ch5: Uninvited Guest"},
{type:"stat",text:"Bosses: Crowcaller, Kearush | Gear: Defense 30+ | Skills: Keen Senses Lv3, Armed Combat Lv3+"},
{type:"warning",text:"Kearush is the hardest early boss. 3 HP bars. FIRE weakness. 100+ Grilled Meat. Dodge only, no blocking. Plate Helm prevents roar stun."},
{type:"tip",text:"Crowcaller drops Tauria Curved Sword. Combined with Nature's Echo = your endgame DPS combo."},
{type:"heading",text:"Ch6: Cracks in the Shield"},
{type:"stat",text:"Boss: Cassius Morten | Gear: Defense 35+ | Skills: Nature's Echo, Imbue Elements"},
{type:"tip",text:"First shield boss. R2 heavy attacks with Tauria + Nature's Echo damage through his guard. Story revelation about Black Bear conspiracy."},
{type:"heading",text:"Ch7: Incomplete Victory"},
{type:"stat",text:"Bosses: Multiple, Lava Myurdin | Character: Oongka unlocks | Longest chapter (19 quests)"},
{type:"warning",text:"Oongka unlocks at end. Make sure shared stat upgrades (Health/Stamina) are solid — they carry to him. Stock 100+ meat for Silverwolf Mountain."},
{type:"tip",text:"Battle at Silverwolf Mountain = landmark fight. Twisted Fate arc = major story revelation."},
{type:"heading",text:"Ch8: Blood Coronation"},
{type:"stat",text:"Bosses: Ludvig (Oongka forced), Gregor, Fortain | Gear: Defense 40+ refined | Critical chapter"},
{type:"warning",text:"Ludvig FORCES Oongka. Swap to dual swords (NOT great axe). Dodge lightning, don't block. Hunt animals near boss area for emergency meat."},
{type:"tip",text:"Fortain = most complex boss. Kill musket soldiers first. Force Palm to break shield. Ghost spirits are invincible — just dodge them."},
{type:"heading",text:"Ch9: Sage of the Desert"},
{type:"stat",text:"Bosses: Hexe Marie, Black Witch | Region: Cloister of Enlightenment"},
{type:"tip",text:"Spiritual tone. Complete Path of Trials for Frost Mantle. Tree of Slumber for Flame Strike."},
{type:"tip",text:"Black Witch: WEAK TO BLINDING FLASH. Six Pensive Statues before = puzzle reward."},
{type:"tip",text:"First Blackstar Dragon encounter at Urdavah. Need Stamina Lv5+ for riding sequence."},
{type:"heading",text:"Ch10: Gorthak"},
{type:"stat",text:"Boss: Mechanical enemies, Golden Star prep | Region: Delesyia | ATAG mech unlocks"},
{type:"tip",text:"Defend Ironflame Orcs at Gorthak. ATAG mech = walking tank. Upgrade at Gorthak Ironworks research institute."},
{type:"tip",text:"3 research institutes in Delesyia. Start all of them for late-game weapons and ATAG upgrades."},
{type:"heading",text:"Ch11: Truth and Reality"},
{type:"stat",text:"Boss: Golden Star Mecha Dragon | Reward: Blackstar Dragon mount (permanent)"},
{type:"tip",text:"Foreboding Shadow: Whispers in the Wind. Defeat Golden Star with ATAG + spear throws. Blackstar swoops in after."},
{type:"tip",text:"Dragon permanently unlocked: 15 min active, 50 min cooldown. Fireballs (R1), Fire Breath (R2). 5 dragons total in game."},
{type:"heading",text:"Ch12: Finale"},
{type:"tip",text:"Final boss fight. Prepare as for Kearush: max gear, 100+ food, all 3 characters upgraded, Palmar Pills stocked."},
{type:"tip",text:"~150 hours of main story to reach this point. Take your time with side content — the game rewards thorough exploration."},
{type:"links",pages:["boss-general","boss-early","boss-mid-late","skills-progression","regions-pywel"]}
]},
"regions":{category:"World Guide",title:"Regions of Pywel",
tags:["regions","hernand","pailune","demeniss","delesyia","crimson desert","abyss"],
content:[
{type:"intro",text:"~90 km² across five regions + Abyss."},
{type:"location",text:"Hernand: Starting. Grasslands, forests, Sicilian cities. 4+ hours of content before leaving."},
{type:"location",text:"Pailune: Frozen highlands. Greymanes' home. Paulenese Cloak essential."},
{type:"location",text:"Demeniss: Military center. 3 Contribution Shops. Castle = wall-scaling access."},
{type:"location",text:"Delesyia: Steampunk. Mechanical beings. Golden Star. ATAG. Trains."},
{type:"tip",text:"Crimson Desert: Red sands. 50°C on HUD. Ruins. Urdavah palace (Gold Vein Research)."},
{type:"tip",text:"Abyss: Floating islands. Puzzles, endgame. Kliff only."},
{type:"tip",text:"Travel anywhere immediately — but distant = overpowered enemies + faction complications."}
]},
"hidden":{category:"Tips & Tricks",title:"Hidden Mechanics",
tags:["hidden","mechanics","secrets","vendor","exploit"],
content:[
{type:"intro",text:"Things the game never tells you."},
{type:"heading",text:"Vendor"},
{type:"tip",text:"Restock midnight. Rest to skip. CTRL/LB in shops = hidden buy options. Recipes = good silver."},
{type:"heading",text:"Combat"},
{type:"tip",text:"Sprint + F/Y = flying kick. Healing Palm (R3→L3). Eat every 2 sec, infinitely. Inventory pauses game."},
{type:"tip",text:"Keep all boss weapons. Extract gears at Witch. Catapult (R3 x3) + Double Jump = massive height."},
{type:"tip",text:"Force Palm + Force Current blow up ore without tools."},
{type:"warning",text:"Some observation skills PERMANENTLY MISSABLE."},
{type:"heading",text:"Exploration"},
{type:"tip",text:"8 bells = entire map. Character swap = teleport. 30 pets for challenge. Horse double jump via trust."},
{type:"tip",text:"2 Sealed Artifacts at Meandering Hills (Prologue). Palmar Pill recipe: Shadow's Whisper Cave."},
{type:"tip",text:"200+ inventory slots via regional commissions. Gourmet gear enhances all food."},
{type:"tip",text:"Night (20:00+): Shadow-Wolves spawn for Mythical Pelts. Crimson Ginseng = high altitude only."},
{type:"tip",text:"Treasure Goblins drop Gold Bars. Hedgehogs find Golden Apples (follow ground sparkles)."},
{type:"heading",text:"Crime"},
{type:"warning",text:"Unequip mask when not stealing. Some recipes ONLY from theft. Castle vault = 90+ silver. Bank heist = 40+/chest."}
]},
"beginner":{category:"Tips & Tricks",title:"Top 20 Beginner Tips",
tags:["beginner","tips","starter","new player"],
content:[
{type:"intro",text:"First 8-10 hours = hardest part."},
{type:"tip",text:"1. USE A CONTROLLER. 2. Health Lv4 + Stamina Lv4 first."},
{type:"tip",text:"3. Don't buy Watch and Learn skills. 4. Cook ALL raw food."},
{type:"tip",text:"5. Ring EVERY bell tower. 6. Get a pet ASAP (auto-loot)."},
{type:"tip",text:"7. Upgrade default weapons first. 8. Parrying regens Stamina + Spirit."},
{type:"tip",text:"9. Targeted aiming locks ledges. 10. Palmar Pills (recipe: Shadow's Whisper Cave)."},
{type:"tip",text:"11. Buy Axe + Pickaxe. 12. Blinding Flash: burns vines, reveals cables, spots ruins."},
{type:"tip",text:"13. Notifications tab. 14. Grindstone + Anvil before bosses."},
{type:"tip",text:"15. Hernand commissions = 3 slots each. 16. Station characters for remote selling."},
{type:"tip",text:"17. Fall damage lethal — glide. 18. Some recipes only from theft."},
{type:"tip",text:"19. Keen Senses Lv2 = first priority. 20. First 8 hours = tutorial. Opens dramatically after."},
{type:"links",pages:["combat-basics","hidden","kliff-builds"]}
]},
"combat-advanced":{category:"Tips & Tricks",title:"Advanced Combat",
tags:["advanced","combo","wrestling","boss"],
content:[
{type:"intro",text:"Master-level techniques."},
{type:"tip",text:"Kill chain: stun on kill → rush. Weapon swap mid-combo (spear → blades → grapple)."},
{type:"tip",text:"Encounter (Keen Senses Lv3): attack before hit = interrupt."},
{type:"tip",text:"Nature's Snare absorbs ALL projectiles. Wrestling drags enemies off horses."},
{type:"tip",text:"Nature's Echo + Tauria Sword = best DPS. Rend Armor ignores super armor."},
{type:"tip",text:"Gourmet gear + cheap Grilled Meat = most efficient healing in the game."},
{type:"tip",text:"100+ Grilled Meat brute-forces any boss."}
]},
"exploration-secrets":{category:"Tips & Tricks",title:"Exploration Secrets",
tags:["exploration","secrets","hidden"],
content:[
{type:"intro",text:"Hidden content everywhere."},
{type:"tip",text:"Blinding Flash from high ground = shining beacons (gear, materials, secrets). Most loot blends with environment."},
{type:"tip",text:"Sealed Artifacts (purple) = free points. Mini-map bar → free Artifact."},
{type:"tip",text:"Ice arrows = water platforms. Force Palm on anything unusual."},
{type:"tip",text:"Weather: sandstorms/fog/blizzards affect gameplay + combat."},
{type:"tip",text:"Equipment in camps, sheds, bandit outposts. 'Decorations' may be lootable."}
]},
"early-power-spike":{category:"Tips & Tricks",title:"Early Power Spike Route",
tags:["early game","power spike","build","gear","upgrade","30 hours","earring","sword","shield","armor"],
content:[
{type:"intro",text:"A specific gear acquisition route that gives you a massive stat boost in the first 30 hours. Transforms Kliff from paper to tank."},
{type:"heading",text:"The Route (In Order)"},
{type:"stat",text:"Step 1: Grab free Two-Handed Sword south of Hernand Castle at crossroads. Excellent for 20+ hours."},
{type:"stat",text:"Step 2: Oakenshield Manor — enter after first Abyss visit. Steal Oath of Darkness Earring from strongbox (owl puzzle)."},
{type:"stat",text:"Step 3: Lioncrest Manor — parkour to side window. Steal Engraved Gold Earring from lockbox."},
{type:"stat",text:"Step 4: Buy full Canta Plate from Rhett's shop (10-15 Silver). Best early defense."},
{type:"stat",text:"Step 5: Build Rhett's trust to 100 (greet daily, complete quests). Buy Kite Shield from bottom of shop."},
{type:"stat",text:"Step 6: Smithy — upgrade ALL gear to Level 4 using iron, copper, cloth, wood. THIS is the power spike."},
{type:"stat",text:"Step 7: Farm bandits on roads for rings and necklaces. Fill all 6 accessory slots."},
{type:"heading",text:"Why This Works"},
{type:"tip",text:"Refinement level matters more than specific gear. Level 4 Canta Plate outperforms unrefined late-game drops."},
{type:"tip",text:"Two earrings + full armor + shield + upgraded weapon = cohesive build that looks and performs great."},
{type:"tip",text:"Don't craft new gear yet — upgrade what you have. Materials are scarce early."},
{type:"heading",text:"Horse Upgrade"},
{type:"tip",text:"Saddle pieces found SE of Hernand. Fishing quest (Annabella) unlocks saddlery access."},
{type:"tip",text:"Shabby Horseshoes with stamina regen = huge quality of life for long rides."},
{type:"heading",text:"What's Next After Power Spike"},
{type:"tip",text:"Ch2: Sword of the Lord from Hornsplitter. Extract Wind Slash at Witch."},
{type:"tip",text:"Ch3: Hwando from Lioncrest (key from Back Alley). Hollow Visage from waterfall cave."},
{type:"tip",text:"Ch5: Blackwing Leather Armor from Crowcaller (3 sockets). Fallen Kingdom pieces from Sanctums."},
{type:"tip",text:"Do life skill quests (Rhett, Turnali, Renee, Annabella) early — they teach systems AND give inventory expansions."},
{type:"links",pages:["kliff-builds","armor-system","unique-gear-locations","gear-refinement"]}
]},
"fishing":{category:"Side Content",title:"Fishing Deep Dive",
tags:["fishing","rod","bare hands","tench","annabella","finley","nas river","cooking","money"],
content:[
{type:"intro",text:"Two methods: rod fishing (minigame) and bare-hand grabbing (no minigame, faster). Free food, good money, and quest requirements. No bait needed."},
{type:"heading",text:"Getting a Rod"},
{type:"tip",text:"Earliest: Observe NPCs fishing after first Abyss exit (Sebastian cutscene) — look RIGHT, stare at fishermen until learning bar fills. Free rod."},
{type:"tip",text:"Backup: Stare at fishing rod in Hernand Provisioner shop display — same observation learning mechanic."},
{type:"tip",text:"Buy: Nas River Fishing Dock (Finley's shop) for 15 Copper. Also sells fish and a Small Bag (+1 slot)."},
{type:"tip",text:"Fine Fishing Rod: better reeling efficiency. Available at Greymane Camp from NPC after upgrades."},
{type:"tip",text:"Crafting book exists for rods — lets Turnali (city) or Alec (camp) craft them."},
{type:"heading",text:"Rod Fishing"},
{type:"tip",text:"Equip: F2/Left D-pad → weapon wheel bottom right → cycle to rod with mouse wheel/LT-RT."},
{type:"tip",text:"Cast: Q/LT to aim → release. Blue circle = valid spot. Red cross = bad spot (rocks, debris)."},
{type:"tip",text:"Wait for 3 splashes → fish bites → Hook with Right Mouse/RT."},
{type:"tip",text:"Reel: pull rod OPPOSITE direction of fish movement (WASD/Left Stick). Fish goes left → you pull right."},
{type:"tip",text:"Only reel in (mouse wheel/Right Stick rotate) when fish stops thrashing. If it fights, STOP reeling or line snaps."},
{type:"tip",text:"Repeat pull-opposite + reel-when-calm until caught. Identical to RDR2 fishing mechanics."},
{type:"tip",text:"Line snags on obstacles and NPCs — cast into clear open water."},
{type:"heading",text:"Bare-Hand Fishing"},
{type:"tip",text:"Wade into water → look down → spot fish models swimming near legs."},
{type:"tip",text:"Walk over fish → interaction prompt → press E/button → instant catch."},
{type:"tip",text:"NO minigame. Significantly faster than rod. Stock up before boss fights this way."},
{type:"heading",text:"Best Spots"},
{type:"location",text:"Three Saints Falls: first quest spot (Annabella's Request for Tench). Face upstream toward waterfall."},
{type:"location",text:"Nas River: closest to Greymane Camp. Fishing dock with Finley's shop."},
{type:"tip",text:"Fishing villages: shown as boat icons on map. Vendors sell rods + fish. Hover over unknown fish = learn species for Knowledge."},
{type:"heading",text:"Cooking & Selling"},
{type:"warning",text:"NEVER eat raw fish. Always cook for dramatically better healing."},
{type:"tip",text:"Cooked fish sells well — one of best early money methods."},
{type:"tip",text:"Feed fish to cats for trust building (+10 trust per fish)."},
{type:"tip",text:"Annabella's Request rewards: inventory expansion + dried fish + keep the rod."},
{type:"links",pages:["cooking-recipes","pets","economy"]}
]},
"side-activities":{category:"Side Content",title:"Side Activities",
tags:["fishing","hunting","mining","duels","archery","side quests"],
content:[
{type:"intro",text:"430+ quests. Side content is MECHANICALLY important — skills, gear, and inventory slots come from it."},
{type:"tip",text:"Fishing, Hunting (Force Palm Lv3 for herds), Mining, Woodcutting, Horse Taming."},
{type:"tip",text:"Duels, Archery (best early money), Fist Fighting, Spear Duelling, Gambling."},
{type:"tip",text:"Bounties, Strongholds, Abyss Puzzles, Sealed Artifact challenges (141 total)."},
{type:"tip",text:"Elowen's 4 Sanctums → Kuku weapons. Regional commissions → inventory slots."},
{type:"tip",text:"Main: 40-60h. Side: 100-180h. Full: 200+."}
]},
"pc":{category:"Technical",title:"PC Performance",
tags:["PC","settings","DLSS","FSR","specs"],
content:[
{type:"intro",text:"BlackSpace Engine. Ray-traced GI."},
{type:"stat",text:"Min (1080p/30): GTX 1060. Rec (1440p/60): RTX 2080. Ultra (4K/60): RTX 5070 Ti. SSD required, 150 GB."},
{type:"warning",text:"DLSS 4.5 / FSR 4 NOT enabled by default — turn on. RT = ~3-4 FPS cost, worth it."},
{type:"tip",text:"Intel Arc NOT supported. Denuvo present. Ultrawide: cutscene pillarboxing."}
]},
"console":{category:"Technical",title:"Console Performance",
tags:["console","PS5","Xbox"],
content:[
{type:"intro",text:"Varies by platform."},
{type:"stat",text:"PS5 Pro: 4K/60 Performance. Best console."},
{type:"stat",text:"PS5: Use Balanced (40fps/4K FSR 3). Avoid Performance mode."},
{type:"stat",text:"Series X: Quality 4K/30 + RT. Series S: 720p/40 or 1080p/30, no RT."},
{type:"tip",text:"HDR everywhere. Fully offline after day-one patch."}
]},
"gambling-minigames":{category:"Side Content",title:"Gambling & Minigames",
tags:["gambling","duo","five-card","arm wrestling","archery","fist fighting","spear duel","minigame","money"],
content:[
{type:"intro",text:"Optional activities for money, fun, and quest completion. Gambling is the FASTEST money method in the game if you save-scum."},
{type:"heading",text:"Duo (Card Game)"},
{type:"table",headers:["Location","Buy-In","Notes"],
rows:[
["Hernand Gambling Den (2F)","15 Silver","Good for learning"],
["Tomasso (NE map)","300 Silver","Highest stakes. No main quest here"],
["Beighen (Five-Card)","150 Silver","Northern village. Color-based rankings"]
]},
{type:"tip",text:"Locations: Hernand (15 Silver buy-in, good for learning) and Tomasso (300 Silver, northeast — highest stakes)."},
{type:"tip",text:"Rules: 5 sticks dealt. 3 auto-combine to sum of 10/20/30 (otherwise Bust). Remaining 2 = your Duo hand."},
{type:"tip",text:"Hand rankings: Ten Pair (both 10s, auto-win) > Pair (matching numbers, higher = better) > Perfect Nine (sum of 9) > Points (single digit sum, higher = better)."},
{type:"tip",text:"Cheating: can accuse opponents of cheating. Correct = they're removed. Wrong = YOU get banned from den for ~2 in-game days."},
{type:"heading",text:"Five-Card"},
{type:"location",text:"Location: Beighen village (northern map). 150 Silver buy-in. More complex — card colors (red/yellow) matter for rankings."},
{type:"tip",text:"Same core math but with color-based bonus hands."},
{type:"heading",text:"Save-Scum Strategy (Best Money Method)"},
{type:"tip",text:"MANUAL SAVE before entering gambling den. Always."},
{type:"tip",text:"Early round with decent hand (5+ Points in Duo, 7+ Pair in Five-Card) → go ALL-IN immediately."},
{type:"tip",text:"AI always calls all-in bets early. Up to 4 opponents all calling with terrible cards. Massive pot."},
{type:"tip",text:"Win = collect huge Silver. Lose = reload save. Repeat."},
{type:"tip",text:"AI plays conservatively in later rounds — early all-in is where the money is."},
{type:"tip",text:"1-3 opponents randomly each day. More opponents = bigger pot."},
{type:"heading",text:"Arm Wrestling"},
{type:"tip",text:"First encounter: Hernand Tavern during Ch1 'Where Rumors Gather' quest."},
{type:"tip",text:"Button-mashing + QTE (Quick Time Events). Wager Silver — win = doubled, lose = nothing."},
{type:"location",text:"Found in taverns across all towns."},
{type:"heading",text:"Other Minigames"},
{type:"tip",text:"Archery Contests: Lioncrest Manor (House Alfonso), NW Hernand. ~80 coins per round. Repeatable. Best early legal money."},
{type:"tip",text:"Fist Fighting: unarmed duels throughout Hernand. Teaches wrestling mechanics useful in real combat."},
{type:"tip",text:"Spear Duelling: 1v1 spear combat. Tests spacing and timing."},
{type:"tip",text:"Horse Racing: unlocks with horse trust. Wager-based."}
]},
"weather-daynight":{category:"World Guide",title:"Weather & Day/Night Cycle",
tags:["weather","day","night","cycle","rain","fog","sandstorm","blizzard","lantern","dark","temperature","wind"],
content:[
{type:"intro",text:"Fully dynamic weather calculated in real-time from biome, temperature, elevation, wind, and time. No two playthroughs see the same weather at the same moments."},
{type:"heading",text:"Darkness"},
{type:"tip",text:"Nights are TRULY dark — Dragon's Dogma level. You NEED a lantern to navigate. Many areas completely invisible without one."},
{type:"tip",text:"Explore during daytime when possible. Nighttime exploration is dangerous without preparation."},
{type:"heading",text:"Weather Effects on Gameplay"},
{type:"tip",text:"Wind direction affects gliding distance and stamina cost. Headwind = shorter glide."},
{type:"tip",text:"Fog reduces visibility AND enemy detection range — can be used for stealth approaches."},
{type:"tip",text:"Rain affects atmosphere. Whether it causes slippery climbing surfaces is unconfirmed."},
{type:"tip",text:"Desert = sandstorms. Alpine = blizzards. Coastal = fog/rain. Geographically consistent — no snow in the desert."},
{type:"heading",text:"Combat & Story"},
{type:"tip",text:"Boss fights inherit current weather and lighting. Same fight feels completely different at night vs rain vs noon."},
{type:"tip",text:"ALL cutscenes rendered in real-time. No 'canonical' look for any story moment."},
{type:"tip",text:"Some enemies ONLY spawn at night (Shadow-Wolves after 20:00)."},
{type:"heading",text:"NPC Behavior"},
{type:"tip",text:"NPCs follow daily routines tied to time of day."},
{type:"tip",text:"Enemy patrol patterns change between day and night."},
{type:"heading",text:"Time Management"},
{type:"tip",text:"Sleep at beds (3/6/12 hours). Can sleep in beds you don't own — area must be liberated first."},
{type:"warning",text:"Can't re-sleep until ~12 in-game hours pass (fatigue must set in)."},
{type:"tip",text:"Wait at cooking fires (Lantern → wait prompt). Same 3/6/12 hour options."},
{type:"tip",text:"Some quests require passing time — 'Pass Time' button appears on screen right side."},
{type:"tip",text:"No confirmed seasonal cycle — biome-specific weather patterns only."}
]},
"lantern-system":{category:"World Guide",title:"Lantern System",
tags:["lantern","light","dark","puzzles","memory","visione","night"],
content:[
{type:"intro",text:"Your essential tool for night exploration, puzzle-solving, and finding hidden content."},
{type:"heading",text:"Getting & Equipping"},
{type:"tip",text:"Unlocked in prologue (Unknown Space quest). Buy extras at Provisioner for 10 Copper."},
{type:"tip",text:"Equip via radial menu: F2 (PC) or Left D-pad (controller). Select lantern → On."},
{type:"tip",text:"Auto-toggle setting: lantern turns on/off automatically based on day/night."},
{type:"tip",text:"Attaches to belt — hands stay free for combat."},
{type:"heading",text:"Focused Beam"},
{type:"tip",text:"Hold L1/LB/CTRL to focus light in specific direction. Essential for puzzles, trails, and finding clues."},
{type:"heading",text:"Hidden Uses"},
{type:"tip",text:"Pulses BLUE near Memory Fragments — signal to use Visione ability to read them."},
{type:"tip",text:"Reveals trails and clues during tracking quests (Reed Devil hunt, etc.)."},
{type:"tip",text:"Blinding Flash works similarly but as a combat/puzzle skill rather than passive light."},
{type:"tip",text:"Use from high ground to spot points of interest in the distance — look for shining beacons."}
]},
"save-system":{category:"Technical",title:"Save System",
tags:["save","autosave","manual save","load","save file","backup","PC"],
content:[
{type:"intro",text:"Save Anytime is listed as an accessibility feature, but the manual save is HIDDEN in the menu. Here's where to find it."},
{type:"heading",text:"Manual Save"},
{type:"tip",text:"Menu → Others tab → Options → Save/Load Game. It's NOT in the main menu screen."},
{type:"tip",text:"Available at any time except mid-cutscene, loading screens, and certain boss sequences."},
{type:"tip",text:"Multiple save slots. Autosaves and manual saves are SEPARATE — they don't overwrite each other."},
{type:"heading",text:"Autosave"},
{type:"tip",text:"Extremely robust. Triggers on: puzzle completion, important items, NPC conversations, quest completion."},
{type:"tip",text:"Rarely lose more than a few minutes from unexpected death."},
{type:"tip",text:"Quick autosave trick: toggle any minor setting (brightness/audio) in Options, then exit. Forces an autosave."},
{type:"heading",text:"Best Practices"},
{type:"tip",text:"Manual save before EVERY boss fight. Before entering new regions. At major story milestones."},
{type:"tip",text:"Keep a 'clean' save at each region transition for revisiting."},
{type:"heading",text:"PC Save Files"},
{type:"location",text:"Location: %localappdata% → PearlAbyss folder. Hidden by default — enable hidden folders or use Win+R → %localappdata%."},
{type:"tip",text:"Create periodic manual backups of this folder."},
{type:"heading",text:"Quick Load"},
{type:"tip",text:"From title screen: E = load most recent. R = load specific save (PC)."},
{type:"heading",text:"Cross-Platform"},
{type:"tip",text:"Xbox Play Anywhere: saves sync between PC and Xbox."},
{type:"warning",text:"NO cross-save between PC↔PS5 or Xbox↔PS5."},
{type:"tip",text:"Console rest mode preserves session but always manual save before shutting down."},
{type:"links",pages:["controls","pc","console"]}
]},
"controls":{category:"Technical",title:"Controls & Keybinds",
tags:["controls","keybinds","keyboard","mouse","controller","remapping","PC","console"],
content:[
{type:"intro",text:"Combat uses layered modifier-based inputs. Feels awkward at first but becomes natural. Here's how to optimize."},
{type:"heading",text:"Controller"},
{type:"warning",text:"Controller remapping: NOT available natively on any platform."},
{type:"tip",text:"PC via Steam: Use Steam Input for custom profiles. In-game UI prompts WON'T match remapped buttons."},
{type:"tip",text:"PC mod exists for controller remapping."},
{type:"tip",text:"Xbox Elite / PS DualSense Edge: use their built-in software for remapping."},
{type:"heading",text:"Keyboard & Mouse"},
{type:"tip",text:"Fully remappable: Menu → Others → Settings → Input → Shortcuts and Input Settings."},
{type:"tip",text:"Recommended remaps: Evade (Alt is awkward → move to Tab), Lock-On (Caps Lock → something reachable), Axiom Force (Tab → R)."},
{type:"tip",text:"Mouse 4 and Mouse 5 inputs not properly recognized — avoid binding to them."},
{type:"heading",text:"Essential Controls"},
{type:"tip",text:"F2 / Left D-pad: Equipment radial (weapons, lantern, tools)."},
{type:"tip",text:"F3 / Right D-pad (hold): Consumables wheel. Tap to use equipped food."},
{type:"tip",text:"Hold L1/LB/CTRL: Focus mode (aim, lock-on, examine, pet horse)."},
{type:"tip",text:"Hold interaction button: auto-collect multiple nearby items sequentially."},
{type:"tip",text:"Hold ESC in menus: skip straight back to game world."},
{type:"heading",text:"Combat Input Philosophy"},
{type:"tip",text:"Layered modifiers, not isolated keys. Light/Heavy attacks combine with directional + modifier inputs for different skills."},
{type:"tip",text:"Skill inputs stay consistent between weapons but perform different moves based on equipped weapon."},
{type:"tip",text:"Will Powers: 'Think of it like riding a bike — comes naturally after you learn it.'"}
]},
"faction-quests":{category:"Side Content",title:"Faction Quests Guide",
tags:["faction","quests","side quests","hernand","commissions","bounty","rewards","greymane","house roberts","antumbra"],
content:[
{type:"intro",text:"16+ factions at launch. Side quests are NOT missable — can return across chapters. Essential for progression."},
{type:"heading",text:"Why They Matter"},
{type:"tip",text:"Faction quests are where inventory slots, observation skills, unique gear, and crafting recipes come from."},
{type:"tip",text:"Skipping side content doesn't just mean missing story — it means missing abilities and upgrades."},
{type:"tip",text:"Orange dot NPCs = quest givers. Purple minimap icons (notice boards) = bounty posters."},
{type:"heading",text:"Hernand Commissions (MANDATORY)"},
{type:"tip",text:"12+ tasks from townsfolk. Each rewards Medium Bag (+3 inventory slots) plus crafting materials."},
{type:"tip",text:"If you don't want to be over-encumbered every 10 minutes, do these chores."},
{type:"tip",text:"Notable: Turnali's Request rewards Logging Axe + Bekker Shield + 10 Timber."},
{type:"tip",text:"Weight of Knowledge rewards the Investigative Log item."},
{type:"heading",text:"Greymane Faction"},
{type:"tip",text:"Dictates growth of your Howling Hill camp. Rescuing refugees, managing squabbles."},
{type:"tip",text:"Unlocks dispatch Companions for gathering missions."},
{type:"stat",text:"99 total quests across 3 categories (34+38+27)."},
{type:"heading",text:"Best Reward Quests"},
{type:"tip",text:"House Roberts 'Estate in Dismay': Gold Vein Map + Mining Knuckledrill + Azurite x3 + Bloodstones x3 + Engraved Gold Earring. One of best single quest rewards."},
{type:"tip",text:"House Roberts 'Continuing Concern': Freya's Elixir + multiple Lesser Elixirs."},
{type:"tip",text:"'Extinguishing the Last Flames': Hernandian Banquet Cloak + Kinetic Counterweight."},
{type:"tip",text:"'Trembling Woods': Unlocks access to Pororin Forest Village — hugely impactful."},
{type:"tip",text:"Stone Quarry quests: Some of the best early side content."},
{type:"heading",text:"Faction Highlights"},
{type:"tip",text:"Witch of Wisdom: Blue Lavenders x20 + Peonies x20 + Small Bones x20 (alchemy materials)."},
{type:"tip",text:"Antumbra Order: Best late-game weapon and armor upgrade drops. Darkness Over the Sanctum rewards Abyss Artifact + Vessel of Dark Pursuit."},
{type:"tip",text:"Witches faction: chaotic combat scenarios cleansing sanctums."},
{type:"heading",text:"Menu Tips"},
{type:"tip",text:"Knowledge menu (Others): categories for people, factions, collectibles, bosses. Track everything."},
{type:"tip",text:"Guides menu (Others): reread missed tooltips about mechanics you've encountered."},
{type:"tip",text:"Notifications (Others): check any pop-ups you missed."}
]},
"trophies":{category:"Side Content",title:"Trophy & Achievement Roadmap",
tags:["trophy","achievement","platinum","100%","completionist","challenges","roadmap","missable"],
content:[
{type:"intro",text:"35 trophies (34 on Xbox/PC + PS5 Platinum). Estimated 300+ hours for Platinum. Difficulty 7/10. No difficulty settings. 0 permanently missable trophies — but a major tracking trap you must understand."},
{type:"table",headers:["Category","Key Trophies","Notes"],
rows:[
["Story","Expert Storyteller","Complete all main chapters. Unmissable"],
["Exploration","Expert Explorer, Lightbringer","Reveal entire map + complete all sanctums"],
["Combat","All weapon mastery trophies","Must prove proficiency with EVERY weapon type"],
["Abyss","Conqueror of the Abysses","Complete every Abyss puzzle island"],
["Minigames","True Gamer","Win various minigames (Duo, arm wrestling, etc)"],
["Faction","Lord of Honor, Protector of Pailune","Faction standing + liberate Pailune"],
["Collection","Grand Collector of Arms, Tamer of Legends","All weapons + legendary horses"],
["Strategy","Unvanquished Strategist, Brilliant Tactician","Battle challenges + operations"]
]},
{type:"heading",text:"THE TRACKING TRAP"},
{type:"warning",text:"Challenge progress does NOT count until you find the corresponding Sealed Abyss Artifact. Actions before finding the artifact are NOT tracked retroactively."},
{type:"tip",text:"This means: if you kill 50 enemies with a sword before finding the Sword Mastery artifact, those 50 kills don't count. You start from zero."},
{type:"tip",text:"SOLUTION: Find all 141 Sealed Artifacts FIRST. Unfog map with 8 bells, then sweep every road with lantern + Guiding Light (LB+RB)."},
{type:"tip",text:"Plan 25+ hours just for finding all Sealed Artifacts before making real trophy progress."},
{type:"heading",text:"Roadmap"},
{type:"stat",text:"Phase 1: Unfog map (8 bells, 5+ hours). Activate fast travel points in every region."},
{type:"stat",text:"Phase 2: Collect all 141 Sealed Abyss Artifacts along roads. Use Guiding Light ability."},
{type:"stat",text:"Phase 3: Play through main story. Do faction quests for inventory expansions along the way."},
{type:"stat",text:"Phase 4: Complete all challenge categories (weapon mastery, exploration, combat, life, minigames)."},
{type:"heading",text:"Important Warnings"},
{type:"warning",text:"Complete watchtower challenges (Sinking Fort + Barraging Cannon V) BEFORE liberating all enemy bases. May become impossible after."},
{type:"tip",text:"Pets challenge (Life 9: tame 30 pets) = most grindy. Start building trust early."},
{type:"tip",text:"Must use EVERY weapon type for mastery trophies — can't just use swords the whole game."},
{type:"tip",text:"Manual save before major story milestones. Autosave overwrites after cutscenes."},
{type:"tip",text:"No difficulty settings — gear refinement level and food supply determine your effective difficulty."},
{type:"links",pages:["puzzles-sealed-artifacts","bell-towers","gambling-minigames"]}
]},
"alchemy-recipes":{category:"Cooking & Crafting",title:"Alchemy Recipes & Elixirs",
tags:["alchemy","elixir","Palmar Pill","revive","cauldron","potion","buff","Freya","Meliara","Haiden"],
content:[
{type:"intro",text:"Brewed at Cauldrons (Witch locations). Palmar Pills revive on death. Elixirs provide powerful combat buffs. Essential for endgame."},
{type:"heading",text:"Palmar Pills (PRIORITY #1)"},
{type:"warning",text:"Revives you on death with 30% HP. Bring 3-5 to every boss fight. THE safety net."},
{type:"tip",text:"Recipe location: cave north of Hernand near Witch's house (Shadow's Whisper Cave). Grab this ASAP."},
{type:"tip",text:"Ingredients: 1x Abyss Cell (Abyss-corrupted creatures near Nexus points) + herbs."},
{type:"tip",text:"Scholastone research (12 Sv, 8 hrs) unlocks Faded Abyss Artifact Blueprint — craft at any Witch cauldron. Same cauldron for pills."},
{type:"heading",text:"Key Elixirs"},
{type:"table",headers:["Elixir","Effect","Recipe Source","Notes"],
rows:[
["Palmar Pill","Revive on death (30% HP)","Shadow's Whisper Cave, N Hernand","ESSENTIAL. Craft constantly."],
["Freya's Elixir","Major ATK boost (timed)","Scholastone research (120 Sv)","Pre-boss buff"],
["Meliara's Elixir","Major DEF boost (timed)","Mudridge Cabin strongbox","Pre-boss buff"],
["Haiden's Elixir","Stamina regen boost","Scholastone research (120 Sv)","Exploration + long fights"],
["Palmar Leaf Tonic","Health regen over time","Pororin research","Sustained healing"],
["Dye Bottles","Permanent dye unlock","Dyehouse SE Hernand","Cosmetic — not combat"]
]},
{type:"heading",text:"Cauldron Locations"},
{type:"tip",text:"Every Witch location has a cauldron. Hernand Witchwoods is the first (unlocks Ch3)."},
{type:"tip",text:"Pailune, Demeniss, and Crimson Desert regions each have Witch vendors with cauldrons."},
{type:"tip",text:"Buy Abyss Cores and Faded Artifacts from Witch vendors while you're there (28.50 Sv each, limited stock)."},
{type:"heading",text:"Alchemy Tips"},
{type:"tip",text:"Abyss Cells drop from corrupted creatures near Abyss Nexus fast travel points. Farm these during normal exploration."},
{type:"tip",text:"Elixir buffs stack with food. Use Freya's Elixir + Special Meal before boss fights for maximum output."},
{type:"tip",text:"Read alchemy manuals to permanently learn recipes, then sell the book. Saves inventory space."},
{type:"links",pages:["cooking-recipes","research-institutes","boss-general"]}
]},
"greymane-camp":{category:"Base Building",title:"Greymane Camp Deep Dive",
tags:["camp","Greymane","dispatch","farm","ranch","recruit","upgrade","supply","Carl","Ross","Luke","Marius","expansion"],
content:[
{type:"intro",text:"Your expandable home base. Unlocks Ch3 (Homestead quest). Grows from a tent to a thriving settlement. Farming, ranching, dispatch missions, crafting, and trade."},
{type:"heading",text:"Setup"},
{type:"tip",text:"Ch3: reconnect with Marius. Marquis Serkis grants fief. Secure tent, haul supplies, plant banner. Cook 2x Modest Clear Soup (tutorial). Escort Marius to camp."},
{type:"tip",text:"Carl and Ross join immediately. Carl = Supply Chest + Provisions. Ross = Comrade management + Dispatch Coordinator (after Lv2)."},
{type:"heading",text:"Camp Expansions"},
{type:"table",headers:["Expansion","Requirements","Unlocks"],
rows:[
["Level 2","2 recruits + 100 food + 250 Sv + 18h","Dispatch Coordinator (Ross). New recruitment quests."],
["Level 3","More recruits + resources","Smithy (Tranan), expanded facilities"],
["Level 4","Heavy resource investment","Farm + Ranch capability"],
["Pailune Rebuild (Ch7+)","Pailune Council + Institute","Large-scale reconstruction. Major late-game investment."]
]},
{type:"warning",text:"4th Expansion costs: 1,500 armaments + 2,500 stone + 2,500 timber + 4,000 food + 100,000 Silver. Start stockpiling early."},
{type:"heading",text:"Key NPCs"},
{type:"tip",text:"Carl: Supply Chest (collects mission loot). Manage Supplies → Support Camp Resources → donate funds/items."},
{type:"tip",text:"Ross: Comrade roster + Dispatch Coordinator. Helmet icon on map."},
{type:"tip",text:"Luke: handles dispatch assignments directly. Check recruit skill profiles before sending."},
{type:"tip",text:"Lonnie: Cook. Free Chewy Rice Cakes + Porridge daily (resets). Unlocked via A Rumor at Glenbright Farm."},
{type:"tip",text:"Tranan: camp blacksmith. Buys/sells gear + ammo + refinement items."},
{type:"tip",text:"Naira: side quests unlock pets + color dyes. Yann: Royal Trading system."},
{type:"heading",text:"Dispatch Missions"},
{type:"tip",text:"Open map → Factions tab → select location → Missions tab → choose mission → assign comrades → Dispatch."},
{type:"tip",text:"OR talk to Ross (Dispatch Coordinator) at camp for single-screen management."},
{type:"tip",text:"Missions auto-restart when complete. Cancel manually to change tasks."},
{type:"tip",text:"Match recruit skills to mission type: Farmer → farming, Logger → timber, Miner → ore. Matching = better yields + faster."},
{type:"heading",text:"Resource Loop"},
{type:"tip",text:"Smart chaining: Capra Pasture (1k bronze → 1k food) THEN Oakenshield Manor (120 food → 1.9k bronze). Profit on both."},
{type:"tip",text:"Mid-game money: Thornbriar Food Storage, Sungrove Manor, Azerian Manor in Demeniss."},
{type:"tip",text:"Late game: Gorthak Ironworks (Ch10+) = thousands of armaments per run."},
{type:"tip",text:"Five resource categories: Food, Timber, Stone, Armaments, Silver. Food drains fastest — run harvest/ranch missions constantly."},
{type:"heading",text:"Farm & Ranch"},
{type:"tip",text:"Farm: plant seedlings → harvest on schedule. Grows grains + vegetables for cooking. Unlocked via camp progression."},
{type:"tip",text:"Ranch: raise chickens, cows, goats. Produces meat + ingredients. Unlocked via Ben's quest chain (A Rumor in Goldleaf → Milk Harvest dispatch → construct ranch → Ben's Request)."},
{type:"tip",text:"Combined farm + ranch = self-sufficient food supply. Essential for endgame cooking."},
{type:"heading",text:"Other Facilities"},
{type:"tip",text:"Timberturner Wainwright: build trade wagons. Convert provisions → packaged goods → sell at trading posts. Requires Engineering skill recruit."},
{type:"tip",text:"Emberwind Workshop: craft Cloudcarts (rideable hot air balloons). Upgrade to Cloudcruiser via Scholastone research."},
{type:"tip",text:"Klinden Workshop: produce Kuku Pots for puzzle storage."},
{type:"tip",text:"Smithy (Tranan): refine weapons/armor, buy ammo and refinement stones."},
{type:"heading",text:"Camp Tips"},
{type:"tip",text:"Recruit every Greymane ASAP via Rumor faction quests. More recruits = more dispatch capacity = more resources."},
{type:"tip",text:"Camp growth boosts Hernandian Contribution reputation. Crime near camp hurts reputation + supply lines."},
{type:"tip",text:"Supply Chest collects items you couldn't pick up earlier. Check it after missions."},
{type:"tip",text:"Inventory expansion tools come from main + side quests. Each adds 3 slots. Do life skill quests early."},
{type:"links",pages:["cooking-recipes","trading-wagons","faction-rep","research-institutes"]}
]}
};


const categories = {};
Object.entries(guideData).forEach(function([key, val]) {
  if (!categories[val.category]) categories[val.category] = [];
  categories[val.category].push({ key: key, title: val.title });
});

const categoryOrder = [
  "Combat", "Characters & Builds", "Skills & Progression", "Boss Fights",
  "Gear & Equipment", "Puzzles", "Cooking & Crafting", "Exploration",
  "Economy & Reputation", "Base Building", "Side Content", "World Guide",
  "Tips & Tricks", "Technical"
];

const categoryIcons = {
  "Combat": "\u2694", "Characters & Builds": "\u25C6",
  "Skills & Progression": "\u25B2", "Boss Fights": "\u2620",
  "Gear & Equipment": "\u25C8", "Puzzles": "\u2726",
  "Cooking & Crafting": "\u2668", "Exploration": "\u25CE",
  "Economy & Reputation": "\u2B21", "Base Building": "\u2302",
  "Side Content": "\u2727", "World Guide": "\u25C9",
  "Tips & Tricks": "\u2605", "Technical": "\u2699"
};

function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 768);
  useEffect(function() {
    function h() { setM(window.innerWidth < 768); }
    window.addEventListener("resize", h);
    return function() { window.removeEventListener("resize", h); };
  }, []);
  return m;
}

export default function CrimsonDesertGuide() {
  const [activePage, setActivePage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState({});
  const [collapsed, setCollapsed] = useState({});
  const [showTop, setShowTop] = useState(false);
  const [allCol, setAllCol] = useState(false);
  const [hlIdx, setHlIdx] = useState(null);
  const contentRef = useRef(null);
  const bRefs = useRef({});
  const isMobile = useIsMobile();

  useEffect(function() { if (!isMobile) setSidebarOpen(true); }, [isMobile]);

  function toggleCat(cat) {
    setExpandedCats(function(prev) { return Object.assign({}, prev, { [cat]: !prev[cat] }); });
  }

  function navigateTo(key, bi) {
    if (key && !guideData[key]) return;
    setActivePage(key);
    setSearchQuery("");
    var colState = {};
    if (key && guideData[key]) {
      guideData[key].content.forEach(function(b, i) { if (b.type === "heading") colState[i] = true; });
    }
    setCollapsed(colState);
    setAllCol(true);
    setHlIdx(bi !== undefined ? bi : null);
    if (isMobile) setSidebarOpen(false);
  }

  useEffect(function() {
    var el = contentRef.current;
    if (!el) return;
    function h() { setShowTop(el.scrollTop > 400); }
    el.addEventListener("scroll", h, { passive: true });
    return function() { el.removeEventListener("scroll", h); };
  }, []);

  useEffect(function() {
    bRefs.current = {};
    if (!contentRef.current) return;
    if (hlIdx !== null) {
      setTimeout(function() {
        var ref = bRefs.current[hlIdx];
        if (ref) {
          ref.scrollIntoView({ behavior: "smooth", block: "center" });
          ref.classList.add("hl-flash");
          setTimeout(function() { ref.classList.remove("hl-flash"); }, 2200);
        }
      }, 100);
    } else {
      contentRef.current.scrollTop = 0;
    }
  }, [activePage, hlIdx]);

  var searchResults = useMemo(function() {
    if (!searchQuery.trim()) return null;
    var q = searchQuery.toLowerCase();
    var results = [];
    Object.entries(guideData).forEach(function([key, v]) {
      var tm = v.title.toLowerCase().includes(q);
      var tg = v.tags.some(function(t) { return t.includes(q); });
      var bb = -1;
      var sn = "";
      v.content.forEach(function(c, i) {
        if (c.text && c.text.toLowerCase().includes(q) && bb === -1) {
          bb = i;
          var idx = c.text.toLowerCase().indexOf(q);
          var s = Math.max(0, idx - 30);
          var e = Math.min(c.text.length, idx + q.length + 40);
          sn = (s > 0 ? "\u2026" : "") + c.text.substring(s, e) + (e < c.text.length ? "\u2026" : "");
        }
        if (c.type === "table" && bb === -1 && c.rows) {
          var found = c.rows.some(function(r) { return r.some(function(cl) { return cl.toLowerCase().includes(q); }); });
          if (found) { bb = i; sn = "Found in table"; }
        }
      });
      if (tm || tg || bb !== -1) {
        results.push({ key: key, title: v.title, category: v.category, blockIndex: bb, snippet: sn });
      }
    });
    return results;
  }, [searchQuery]);

  var pageData = activePage ? guideData[activePage] : null;

  var headings = useMemo(function() {
    if (!pageData) return [];
    return pageData.content
      .map(function(b, i) { return b.type === "heading" ? { text: b.text, index: i } : null; })
      .filter(Boolean);
  }, [activePage, pageData]);

  function toggleSection(hi) {
    setCollapsed(function(prev) { return Object.assign({}, prev, { [hi]: !prev[hi] }); });
  }

  function isVisible(bi) {
    if (!pageData || !pageData.content) return true;
    var lh = null;
    for (var i = bi - 1; i >= 0; i--) {
      if (pageData.content[i].type === "heading") { lh = i; break; }
    }
    if (lh !== null && collapsed[lh]) return false;
    return true;
  }

  function getCatNav() {
    if (!pageData || !pageData.category) return { prev: null, next: null };
    var cp = categories[pageData.category] || [];
    var idx = cp.findIndex(function(p) { return p.key === activePage; });
    return {
      prev: idx > 0 ? cp[idx - 1] : null,
      next: idx < cp.length - 1 ? cp[idx + 1] : null
    };
  }

  function scrollToTop() {
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleAll() {
    if (!pageData) return;
    var newState = {};
    var shouldCollapse = !allCol;
    pageData.content.forEach(function(b, i) {
      if (b.type === "heading") newState[i] = shouldCollapse;
    });
    setCollapsed(newState);
    setAllCol(shouldCollapse);
  }

  function setRef(i) {
    return function(el) { bRefs.current[i] = el; };
  }

  function renderBlock(block, i) {
    if (!isVisible(i) && block.type !== "heading") return null;

    if (block.type === "intro") {
      return (
        <div key={i} ref={setRef(i)} className="fj-intro">{block.text}</div>
      );
    }

    if (block.type === "heading") {
      var isCol = collapsed[i];
      return (
        <h2 key={i} ref={setRef(i)} id={"s-" + i} className="fj-heading"
          onClick={function() { toggleSection(i); }}>
          <span style={{ flex: 1 }}>{block.text}</span>
          <span className="fj-chev" style={{ transform: isCol ? "rotate(0)" : "rotate(90deg)" }}>{"\u25B6"}</span>
        </h2>
      );
    }

    if (block.type === "subheading") {
      return <h3 key={i} ref={setRef(i)} className="fj-sub">{block.text}</h3>;
    }

    if (block.type === "tip") {
      return (
        <div key={i} ref={setRef(i)} className="fj-tip ft-tip">
          <span className="ft-i">{"\u25B8"}</span><span>{block.text}</span>
        </div>
      );
    }

    if (block.type === "warning") {
      return (
        <div key={i} ref={setRef(i)} className="fj-tip ft-warn">
          <span className="ft-i">{"\u26A0"}</span><span>{block.text}</span>
        </div>
      );
    }

    if (block.type === "location") {
      return (
        <div key={i} ref={setRef(i)} className="fj-tip ft-loc">
          <span className="ft-i">{"\u2295"}</span><span>{block.text}</span>
        </div>
      );
    }

    if (block.type === "stat") {
      return (
        <div key={i} ref={setRef(i)} className="fj-tip ft-stat">
          <span className="ft-i">{"\u25C6"}</span><span>{block.text}</span>
        </div>
      );
    }

    if (block.type === "table" && block.headers && block.rows) {
      return (
        <div key={i} ref={setRef(i)} className="fj-tw">
          <table className="fj-tbl">
            <thead>
              <tr>
                {block.headers.map(function(h, j) {
                  return <th key={j}>{h}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(function(row, j) {
                return (
                  <tr key={j}>
                    {row.map(function(cell, k) {
                      return <td key={k}>{cell || ""}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    if (block.type === "links" && block.pages) {
      return (
        <div key={i} ref={setRef(i)} className="fj-links">
          <span className="fj-ll">See Also:</span>
          {block.pages.filter(function(p) { return guideData[p]; }).map(function(p) {
            return (
              <button key={p} className="fj-lc"
                onClick={function(e) { e.stopPropagation(); navigateTo(p); }}>
                {guideData[p].title}
              </button>
            );
          })}
        </div>
      );
    }

    return null;
  }

  var catNav = getCatNav();
  var catPrev = catNav.prev;
  var catNext = catNav.next;
  var pgCount = Object.keys(guideData).length;

  var sidebarStyle = {
    transform: (!isMobile || sidebarOpen) ? "translateX(0)" : "translateX(-100%)",
    transition: "transform .25s ease"
  };

  var hamLeft = isMobile ? 10 : (sidebarOpen ? 280 : 10);
  var hamZ = isMobile && sidebarOpen ? 150 : 200;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Alegreya','Georgia',serif", background: "#3b3228", overflow: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Alegreya:ital,wght@0,400;0,600;0,700;1,400&family=Alegreya+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
        ::-webkit-scrollbar{width:7px}::-webkit-scrollbar-track{background:#c4b49a}::-webkit-scrollbar-thumb{background:#8b6914;border-radius:4px;border:1px solid #a0906e}
        .fj-sb{background:linear-gradient(160deg,#2e2418 0%,#3b2f20 30%,#2a2118 70%,#1e1810 100%);display:flex;flex-direction:column;height:100vh;overflow:hidden;border-right:4px solid #5a4225;position:relative;box-shadow:inset -8px 0 16px rgba(0,0,0,.3)}
        .fj-sb::before{content:'';position:absolute;top:0;right:0;bottom:0;width:4px;background:linear-gradient(180deg,#b8860b22,#b8860b88,#b8860b44,#b8860b88,#b8860b22);z-index:1}
        .cat-btn{width:100%;text-align:left;background:none;border:none;color:#c4b49a;padding:10px 14px;cursor:pointer;font-family:'Alegreya Sans',sans-serif;font-size:12px;font-weight:600;display:flex;align-items:center;gap:9px;letter-spacing:.6px;text-transform:uppercase;transition:all .15s;position:relative;z-index:2}
        .cat-btn:hover{background:#44382a;color:#f0d58c}
        .pg-btn{width:100%;text-align:left;background:none;border:none;color:#9a8b72;padding:7px 14px 7px 36px;cursor:pointer;font-family:'Alegreya',serif;font-size:13px;font-style:italic;transition:all .15s;border-left:2px solid transparent;min-height:36px;display:flex;align-items:center;position:relative;z-index:2}
        .pg-btn:hover{color:#f0d58c;background:#3b2f20;border-left-color:#8b6914}
        .pg-btn.active{color:#f0d58c;background:#3b2f20;border-left-color:#d4a017;font-weight:600;font-style:normal}
        .sr{padding:11px 14px;cursor:pointer;border-bottom:1px solid #3b2f20;transition:all .15s;position:relative;z-index:2}
        .sr:hover{background:#44382a}
        .fj-main{position:relative;background:#e8dcc8}
        .fj-main::before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.45' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23p)' opacity='.07'/%3E%3C/svg%3E");pointer-events:none;z-index:1}
        .fj-main::after{content:none}
        .fj-vig{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:3;box-shadow:inset 0 0 80px rgba(90,60,20,.15),inset 0 0 200px rgba(60,40,10,.08);background:radial-gradient(ellipse at 15% 8%,rgba(139,105,20,.06) 0%,transparent 50%),radial-gradient(ellipse at 85% 92%,rgba(120,80,20,.08) 0%,transparent 45%),radial-gradient(ellipse at 5% 70%,rgba(100,70,20,.05) 0%,transparent 40%),linear-gradient(90deg,rgba(90,60,20,.08) 0%,transparent 4%,transparent 100%)}
        .fj-stain{position:absolute;border-radius:50%;pointer-events:none;z-index:2}
        .fj-intro{font-size:15px;line-height:1.7;color:#4a3828;margin-bottom:16px;padding:14px 18px;background:linear-gradient(135deg,rgba(220,205,180,.5),rgba(210,195,170,.3));border:1px solid #c4b49a;border-radius:3px;border-left:4px solid #8b1a1a;font-style:italic;position:relative;z-index:5}
        .fj-heading{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;color:#6b1515;margin:20px 0 7px;padding:6px 12px;border-bottom:2px solid #c4b49a;display:flex;align-items:center;cursor:pointer;user-select:none;border-radius:3px 3px 0 0;background:linear-gradient(135deg,rgba(220,205,180,.4),rgba(200,185,160,.2));transition:background .15s;position:relative;z-index:5}
        .fj-heading:hover{background:rgba(200,180,150,.5)}
        .fj-chev{font-size:9px;opacity:.3;transition:transform .2s;margin-left:8px;color:#6b1515}
        .fj-sub{font-family:'Alegreya Sans',sans-serif;font-size:12px;font-weight:600;color:#7a6020;margin:12px 0 5px;letter-spacing:.5px;text-transform:uppercase;position:relative;z-index:5}
        .fj-tip{display:flex;gap:9px;align-items:flex-start;padding:7px 13px;border-radius:0 3px 3px 0;margin-bottom:4px;font-size:13.5px;line-height:1.6;color:#3d3020;border-left:3px solid #c4a265;background:rgba(244,237,224,.6);transition:background .3s;position:relative;z-index:5}
        .ft-i{flex-shrink:0;font-size:11px;margin-top:3px;width:14px;text-align:center}
        .ft-tip{border-left-color:#b8960b}.ft-tip .ft-i{color:#9a7a08}
        .ft-warn{border-left-color:#8b1a1a;background:rgba(180,50,50,.06)}.ft-warn .ft-i{color:#8b1a1a;font-size:13px}
        .ft-loc{border-left-color:#2e6b5e;background:rgba(46,107,94,.05)}.ft-loc .ft-i{color:#2e6b5e;font-size:13px}
        .ft-stat{border-left-color:#5b3a8a;background:rgba(91,58,138,.04)}.ft-stat .ft-i{color:#5b3a8a}
        .hl-flash{animation:hlF .7s ease 2}
        @keyframes hlF{0%,100%{background:inherit}50%{background:rgba(184,134,11,.18);border-left-color:#b8860b}}
        .fj-tw{overflow-x:auto;margin:7px 0 10px;border-radius:3px;border:1px solid #c4b49a;position:relative;z-index:5;box-shadow:1px 1px 4px rgba(90,60,20,.08)}
        .fj-tbl{width:100%;border-collapse:collapse;font-family:'Alegreya Sans',sans-serif;font-size:12px}
        .fj-tbl th{background:#3b2f20;color:#e8d8a8;font-weight:600;text-align:left;padding:6px 9px;border-bottom:2px solid #8b6914;white-space:nowrap}
        .fj-tbl td{padding:5px 9px;border-bottom:1px solid #ddd2be;color:#3d3020}
        .fj-tbl tr:nth-child(even) td{background:rgba(200,185,160,.2)}
        .fj-tbl tr:hover td{background:rgba(184,134,11,.08)}
        .fj-links{display:flex;flex-wrap:wrap;gap:5px;align-items:center;margin:14px 0 6px;padding:9px 11px;background:rgba(220,205,180,.35);border-radius:3px;border:1px solid #c4b49a;position:relative;z-index:5}
        .fj-ll{font-family:'Alegreya Sans',sans-serif;font-size:10px;font-weight:600;color:#8b6914;text-transform:uppercase;letter-spacing:1px;margin-right:4px}
        .fj-lc{background:rgba(244,237,224,.7);border:1px solid #c4a265;border-radius:3px;padding:3px 8px;color:#6b1515;font-family:'Alegreya',serif;font-size:12px;cursor:pointer;transition:all .15s;white-space:nowrap;font-style:italic}
        .fj-lc:hover{background:#3b2f20;color:#f0d58c;border-color:#8b6914}
        .fj-toc{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px;padding:7px 10px;background:rgba(220,205,180,.35);border:1px solid #c4b49a;border-radius:3px;position:relative;z-index:5}
        .fj-tc{background:none;border:1px solid #b8a080;border-radius:3px;padding:3px 7px;color:#5a4228;font-family:'Alegreya Sans',sans-serif;font-size:10.5px;cursor:pointer;transition:all .15s;white-space:nowrap}
        .fj-tc:hover{color:#6b1515;border-color:#8b1a1a;background:rgba(244,237,224,.6)}
        .fj-sc{background:rgba(244,237,224,.6);border:1px solid #c4b49a;padding:10px 13px;border-radius:4px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:11px;position:relative;z-index:5}
        .fj-sc:hover{border-color:#8b1a1a;box-shadow:0 2px 8px rgba(139,26,26,.08)}
        .fj-hc{background:rgba(244,237,224,.5);border:1px solid #c4b49a;padding:10px;border-radius:4px;cursor:pointer;transition:all .2s;position:relative;z-index:5}
        .fj-hc:hover{border-color:#8b6914;box-shadow:0 2px 8px rgba(184,134,11,.1)}
        .fj-nb{background:rgba(244,237,224,.6);border:1px solid #c4b49a;border-radius:4px;padding:9px 11px;cursor:pointer;color:#3d3020;font-family:'Alegreya Sans',sans-serif;flex:1;min-height:44px;transition:all .15s;position:relative;z-index:5}
        .fj-nb:hover{border-color:#8b6914;background:rgba(220,205,180,.5)}
        .fj-ham{position:fixed;top:10px;z-index:200;background:#3b2f20;border:2px solid #8b6914;color:#e8d8a8;width:44px;height:44px;border-radius:5px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 2px 10px rgba(0,0,0,.3)}
        .fj-ov{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(30,24,16,.55);z-index:90}
        .fj-top{position:fixed;bottom:20px;right:20px;z-index:50;width:38px;height:38px;border-radius:50%;background:#3b2f20;border:2px solid #8b6914;color:#e8d8a8;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.25);transition:all .2s}
        .fj-top:hover{background:#5a4632;transform:scale(1.1)}
        .fj-div{text-align:center;color:#b8960b;font-size:12px;letter-spacing:6px;margin:5px 0;opacity:.5;position:relative;z-index:5}
        
        /* INK SPLATTERS - SVG-based decorative spots */
        .fj-ink1{position:absolute;top:7%;left:12%;width:55px;height:48px;background:radial-gradient(ellipse at 40% 50%,rgba(50,25,5,.14) 0%,rgba(50,25,5,.06) 40%,transparent 70%);border-radius:60% 40% 55% 45%;pointer-events:none;z-index:2;transform:rotate(20deg)}
        .fj-ink2{position:absolute;top:35%;right:6%;width:35px;height:40px;background:radial-gradient(ellipse at 50% 40%,rgba(45,18,3,.12) 0%,rgba(45,18,3,.05) 50%,transparent 75%);border-radius:45% 55% 50% 50%;pointer-events:none;z-index:2;transform:rotate(-30deg)}
        .fj-ink3{position:absolute;bottom:25%;left:8%;width:28px;height:30px;background:radial-gradient(circle,rgba(35,12,3,.15) 0%,rgba(35,12,3,.06) 40%,transparent 70%);border-radius:50%;pointer-events:none;z-index:2}
        .fj-ink4{position:absolute;top:60%;right:15%;width:20px;height:22px;background:radial-gradient(circle,rgba(55,22,8,.1) 0%,transparent 60%);border-radius:50%;pointer-events:none;z-index:2}


        /* AGED TORN EDGE on left side of content */
        .fj-torn{position:absolute;top:0;left:0;bottom:0;width:12px;pointer-events:none;z-index:4;background:linear-gradient(90deg,rgba(70,45,15,.1) 0%,rgba(70,45,15,.05) 40%,transparent 100%);border-right:1px dashed rgba(160,120,60,.08)}

        /* BURNED EDGE on top/bottom */
        .fj-burn-top{position:absolute;top:0;left:0;right:0;height:10px;pointer-events:none;z-index:4;background:linear-gradient(180deg,rgba(70,40,10,.15) 0%,rgba(70,40,10,.06) 50%,transparent 100%);border-top:1px solid rgba(120,80,20,.08)}
        .fj-burn-bot{position:absolute;bottom:0;left:0;right:0;height:10px;pointer-events:none;z-index:4;background:linear-gradient(0deg,rgba(70,40,10,.15) 0%,rgba(70,40,10,.06) 50%,transparent 100%);border-bottom:1px solid rgba(120,80,20,.08)}

        /* SEARCH HIGHLIGHT in results */
        .hl-match{color:#6b1515;font-weight:700;font-style:normal}

        /* EXPAND/COLLAPSE ALL button */
        .fj-toggle-all{background:none;border:1px solid #b8a080;border-radius:3px;padding:3px 8px;color:#5a4228;font-family:'Alegreya Sans',sans-serif;font-size:10px;cursor:pointer;transition:all .15s;margin-left:auto}
        .fj-toggle-all:hover{color:#6b1515;border-color:#8b1a1a;background:rgba(244,237,224,.6)}

        @media(max-width:767px){.fj-sb{position:fixed;top:0;left:0;z-index:100;width:85vw;max-width:320px;box-shadow:4px 0 30px rgba(0,0,0,.4)}.fj-tip{font-size:12.5px;padding:6px 10px}.fj-intro{font-size:13.5px}.fj-tbl{font-size:11.5px}.fj-heading{font-size:15px}}
        @media(min-width:768px){.fj-sb{width:270px;min-width:270px;position:relative}.fj-ov{display:none!important}}
      `}</style>

      {isMobile && sidebarOpen && <div className="fj-ov" onClick={function() { setSidebarOpen(false); }} />}

      <button className="fj-ham" onClick={function() { setSidebarOpen(!sidebarOpen); }}
        style={{ left: hamLeft, zIndex: hamZ }}>
        {sidebarOpen ? "\u2715" : "\u2630"}
      </button>

      {(sidebarOpen || !isMobile) && (
        <div className="fj-sb" style={sidebarStyle}>
          <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid #44382a", flexShrink: 0, position: "relative", zIndex: 2 }}>
            <div onClick={function() { navigateTo(null); setActivePage(null); }} style={{ cursor: "pointer" }}>
              <div style={{ fontFamily: "'Alegreya Sans',sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: 3, color: "#8b6914", textTransform: "uppercase", marginBottom: 2 }}>AN EXPLORER'S</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, color: "#e8d8a8", lineHeight: 1.1 }}>Field Journal</div>
              <div style={{ fontFamily: "'Alegreya',serif", fontSize: 11, color: "#8a7d6b", marginTop: 3, fontStyle: "italic" }}>{pgCount} pages of Pywel</div>
            </div>
            <div style={{ position: "relative", marginTop: 10 }}>
              <input type="text" value={searchQuery} placeholder="Search the journal\u2026"
                onChange={function(e) { setSearchQuery(e.target.value); setActivePage(null); }}
                style={{ width: "100%", padding: "8px 12px 8px 28px", background: "#221c14", border: "1px solid #5a4632", borderRadius: 3, color: "#c4b49a", fontFamily: "'Alegreya',serif", fontSize: 13, outline: "none", fontStyle: "italic" }} />
              <span style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", fontSize: 13, opacity: .35, color: "#a89880" }}>{"\u2315"}</span>
              {searchQuery && (
                <button onClick={function() { setSearchQuery(""); }}
                  style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#8a7d6b", fontSize: 16, cursor: "pointer", padding: 4, lineHeight: 1 }}>{"\u2715"}</button>
              )}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "2px 0" }}>
            {searchResults ? (
              <div>
                <div style={{ padding: "8px 14px", fontFamily: "'Alegreya Sans',sans-serif", fontSize: 10, color: "#8a7d6b", textTransform: "uppercase", letterSpacing: 1 }}>
                  {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                </div>
                {searchResults.map(function(r) {
                  return (
                    <div key={r.key + "-" + r.blockIndex} className="sr"
                      onClick={function() { navigateTo(r.key, r.blockIndex >= 0 ? r.blockIndex : undefined); }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#c4b49a", fontFamily: "'Alegreya',serif" }}>{r.title}</div>
                      <div style={{ fontSize: 10.5, color: "#8a7d6b", fontFamily: "'Alegreya Sans',sans-serif", marginTop: 2 }}>{r.category}</div>
                      {r.snippet && <div style={{ fontSize: 11, color: "#9a8b72", fontFamily: "'Alegreya',serif", marginTop: 4, lineHeight: 1.4, fontStyle: "italic" }}>{r.snippet}</div>}
                    </div>
                  );
                })}
                {searchResults.length === 0 && (
                  <div style={{ padding: "20px 14px", color: "#8a7d6b", textAlign: "center", fontFamily: "'Alegreya',serif", fontSize: 13, fontStyle: "italic" }}>Nothing found in these pages.</div>
                )}
              </div>
            ) : (
              categoryOrder.filter(function(c) { return categories[c]; }).map(function(cat) {
                return (
                  <div key={cat}>
                    <button className="cat-btn" onClick={function() { toggleCat(cat); }}>
                      <span style={{ fontSize: 13, width: 18, textAlign: "center", color: "#8b6914" }}>{categoryIcons[cat]}</span>
                      <span style={{ flex: 1 }}>{cat}</span>
                      <span style={{ fontSize: 9, color: "#8a7d6b", marginRight: 4 }}>{categories[cat].length}</span>
                      <span style={{ fontSize: 9, opacity: .3, transition: "transform .2s", transform: expandedCats[cat] ? "rotate(90deg)" : "rotate(0)", color: "#8b6914" }}>{"\u25B6"}</span>
                    </button>
                    {expandedCats[cat] && categories[cat].map(function(page) {
                      return (
                        <button key={page.key}
                          className={"pg-btn " + (activePage === page.key ? "active" : "")}
                          onClick={function() { navigateTo(page.key); }}>
                          {page.title}
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      <div ref={contentRef} className="fj-main" style={{ flex: 1, overflowY: "auto", padding: isMobile ? "56px 18px 28px" : "28px 44px 28px 60px" }}>
        <div className="fj-vig" />
        <div className="fj-stain" style={{ top: "12%", right: "8%", width: 90, height: 80, background: "radial-gradient(ellipse,rgba(150,110,50,.09) 0%,rgba(150,110,50,.05) 40%,transparent 70%)", transform: "rotate(-15deg)" }} />
        <div className="fj-stain" style={{ bottom: "18%", left: "5%", width: 120, height: 100, borderRadius: "50% 45% 55% 40%", background: "radial-gradient(ellipse,rgba(130,90,35,.08) 0%,transparent 75%)", transform: "rotate(25deg)" }} />
        <div className="fj-ink1" />
        <div className="fj-ink2" />
        <div className="fj-ink3" />
        <div className="fj-ink4" />
        <div className="fj-torn" />
        <div className="fj-burn-top" />
        <div className="fj-burn-bot" />

        {!activePage && !searchQuery ? (
          <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 5 }}>
            <div style={{ marginBottom: 18, textAlign: "center" }}>
              <div style={{ fontFamily: "'Alegreya Sans',sans-serif", fontSize: isMobile ? 9 : 10, fontWeight: 700, letterSpacing: 4, color: "#8b6914", textTransform: "uppercase", marginBottom: 4 }}>AN EXPLORER'S</div>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? 32 : 46, fontWeight: 700, color: "#6b1515", lineHeight: 1.05, marginBottom: 4 }}>Field Journal</h1>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: "#5a4228", fontStyle: "italic", marginBottom: 2 }}>Notes on the Continent of Pywel</p>
              <div className="fj-div">{"\u2014 \u2726 \u2014"}</div>
            </div>

            <div style={{ marginBottom: 16, padding: 13, background: "rgba(244,237,224,.6)", border: "2px solid #8b1a1a", borderRadius: 4, position: "relative", zIndex: 5 }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 15, fontWeight: 700, color: "#6b1515", marginBottom: 9 }}>{"\u2605"} New to Pywel? Begin Here</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 7 }}>
                {[
                  { key: "beginner", icon: "\u2605", desc: "First 10 hours survival guide" },
                  { key: "combat-basics", icon: "\u2694", desc: "How fighting works" },
                  { key: "kliff-builds", icon: "\u25C6", desc: "Build path for Kliff" }
                ].map(function(s) {
                  return (
                    <div key={s.key} className="fj-sc" onClick={function() {
                      setExpandedCats(function(p) { return Object.assign({}, p, { [guideData[s.key].category]: true }); });
                      navigateTo(s.key);
                    }}>
                      <div style={{ fontSize: 18, color: "#8b1a1a" }}>{s.icon}</div>
                      <div>
                        <div style={{ fontFamily: "'Alegreya Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#3b2f20" }}>{guideData[s.key].title}</div>
                        <div style={{ fontFamily: "'Alegreya',serif", fontSize: 11, color: "#8a7d6b", fontStyle: "italic" }}>{s.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill,minmax(190px,1fr))", gap: 6 }}>
              {categoryOrder.filter(function(c) { return categories[c]; }).map(function(cat) {
                return (
                  <div key={cat} className="fj-hc" onClick={function() {
                    setExpandedCats(function(p) { return Object.assign({}, p, { [cat]: true }); });
                    navigateTo(categories[cat][0].key);
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ fontSize: 16, width: 22, textAlign: "center", color: "#8b6914" }}>{categoryIcons[cat]}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "'Alegreya Sans',sans-serif", fontSize: 12, fontWeight: 700, color: "#3b2f20", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat}</div>
                        <div style={{ fontFamily: "'Alegreya',serif", fontSize: 10.5, color: "#8a7d6b", fontStyle: "italic" }}>{categories[cat].length} pages</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="fj-div" style={{ marginTop: 16 }}>{"\u2014 \u2726 \u2014"}</div>
            <div style={{ textAlign: "center", position: "relative", zIndex: 5 }}>
              <div style={{ fontFamily: "'Alegreya',serif", fontSize: 11, color: "#8a7d6b", fontStyle: "italic" }}>Tap headings to collapse sections</div>
            </div>
          </div>
        ) : pageData ? (
          <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 5 }}>
            <button onClick={function() { setActivePage(null); }}
              style={{ background: "none", border: "none", color: "#8b1a1a", cursor: "pointer", fontFamily: "'Alegreya Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8, padding: "4px 0", display: "flex", alignItems: "center", gap: 4, minHeight: 32 }}>
              {"\u2190 Journal Home"}
            </button>
            <div style={{ fontFamily: "'Alegreya Sans',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: 2, color: "#8b6914", textTransform: "uppercase", marginBottom: 2 }}>{pageData.category}</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: isMobile ? 24 : 34, fontWeight: 700, color: "#6b1515", marginBottom: 3, lineHeight: 1.15 }}>{pageData.title}</h1>
            <div className="fj-div" style={{ marginBottom: 12 }}>{"\u2014 \u2726 \u2014"}</div>

            {headings.length >= 3 && (
              <div className="fj-toc">
                {headings.map(function(h) {
                  return (
                    <button key={h.index} className="fj-tc" onClick={function() {
                      if (collapsed[h.index]) setCollapsed(function(p) { return Object.assign({}, p, { [h.index]: false }); });
                      setTimeout(function() {
                        var el = bRefs.current[h.index];
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 50);
                    }}>{h.text}</button>
                  );
                })}
                <button className="fj-toggle-all" onClick={function() { toggleAll(); }}>{allCol ? "Expand All" : "Collapse All"}</button>
              </div>
            )}

            {pageData.content.map(renderBlock)}

            {isMobile && (
              <button onClick={function() { setSidebarOpen(true); }}
                style={{ width: "100%", marginTop: 14, padding: 11, background: "rgba(220,205,180,.4)", border: "1px solid #c4b49a", borderRadius: 4, cursor: "pointer", color: "#6b1515", fontFamily: "'Alegreya Sans',sans-serif", fontSize: 12.5, fontWeight: 600, textAlign: "center", position: "relative", zIndex: 5 }}>
                {"\u2630 Browse All Pages"}
              </button>
            )}

            <div className="fj-div" style={{ marginTop: 16 }}>{"\u2014 \u2726 \u2014"}</div>

            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", marginTop: 10, gap: 7, position: "relative", zIndex: 5 }}>
              {catPrev ? (
                <button className="fj-nb" onClick={function() { navigateTo(catPrev.key); }} style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 9, color: "#8a7d6b", textTransform: "uppercase", letterSpacing: 1 }}>{"\u2190 Prev in " + pageData.category}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#6b1515", marginTop: 2, fontFamily: "'Alegreya',serif", fontStyle: "italic" }}>{catPrev.title}</div>
                </button>
              ) : !isMobile && <div style={{ flex: 1 }} />}
              {catNext ? (
                <button className="fj-nb" onClick={function() { navigateTo(catNext.key); }} style={{ textAlign: isMobile ? "left" : "right" }}>
                  <div style={{ fontSize: 9, color: "#8a7d6b", textTransform: "uppercase", letterSpacing: 1 }}>{"Next in " + pageData.category + " \u2192"}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#6b1515", marginTop: 2, fontFamily: "'Alegreya',serif", fontStyle: "italic" }}>{catNext.title}</div>
                </button>
              ) : !isMobile && <div style={{ flex: 1 }} />}
            </div>
          </div>
        ) : null}
      </div>

      {showTop && (
        <button className="fj-top" onClick={scrollToTop} title="Back to top">{"\u2191"}</button>
      )}
    </div>
  );
}
