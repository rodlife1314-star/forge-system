import { Engine } from "./types";

const doctrinePatch = (item: any) => {
  if (!item) return item;
  const name = String(item.name ?? item.title ?? "").trim();
  const patched = {
    ...item,
    name: name || "UNKNOWN ITEM",
    status: String(item.status || "ACTIVE").trim(),
    executionCard: item.executionCard ?? true,
    rootLayer: String(item.rootLayer || "Root layer pending final chef validation.").trim(),
    controlLaw: String(item.controlLaw || "State of Transition: Monitor for flow.").trim(),
    timeLaw: String(item.timeLaw || "Time law pending final chef validation.").trim(),
    validationPoints: item.validationPoints ?? {
      postPrep: "Post-prep validation pending.",
      preService: "Pre-service validation pending.",
      atPass: "At-pass validation pending."
    },
    failureLaw: String(item.failureLaw || "Failure law pending final chef validation.").trim(),
    autoReject: item.autoReject ?? "Reject if unsafe, unstable, cold, collapsed, split, burnt, undercooked, or outside spec.",
    printCard: item.printCard ?? true,
    station: String(item.station || "GENERAL").trim(),
    allergens: item.allergens ?? [],
    pass: String(item.pass || "No pass criteria defined.").trim()
  };

  if (patched.executionCard === true) {
    patched.executionCard = {
      setup: patched.ingredients || [],
      build: patched.method || [],
      timeLaw: patched.timeLaw || "AS PER SPEC",
      failures: [patched.failureLaw].filter(Boolean),
      reset: [patched.autoReject].filter(Boolean)
    };
  }

  return patched;
};

import { iceCreamDoctrine } from "./forge/engines/iceCreamDoctrine";
import { iceCreamRecipes } from "./forge/engines/iceCreamRecipes";

export const ENGINES: Record<string, Engine> = {
  dashboard: {
    label: "FORGE DASHBOARD",
    icon: "📊",
    color: "#00E0FF",
    station: "CENTRAL COMMAND",
    tag: "CONTROL",
    items: [],
    operationalLayers: [
      {
        name: "GALYONS CORE SYSTEM LAWS (v2.5.2a)",
        subtitle: "Global Technical Operations Mandate",
        sections: [
          {
            title: "1. FOUNDER RULE — YIELD WIDTH",
            content: [
              "• Live production window is capped at 6 active production items per service.",
              "• This is a production limitation, not a menu/archive limitation.",
              "• Master Bible archive remains unlimited and accessible."
            ]
          },
          {
            title: "2. 20 UNIT LAW — PRODUCTION DEPTH",
            content: [
              "• Batch prep is strictly stabilized at 20 portions.",
              "• No estimation. Repeatable batch cycles only.",
              "• 20 / 40 / 60 cover scaling for full governance."
            ]
          },
          {
            title: "3. 6x6 MEP LAW",
            content: "Every dish must be defined by: Core, Sauce, Texture, Garnish, Holding, Service. No thinking at the pass."
          },
          {
            title: "4. SERVICE LAW — ZERO COOKING",
            content: "No live cooking during service. ONLY: Plate → Finish → Send."
          },
          {
            title: "5. TEXTURE LAW",
            content: "Mandatory: Soft/Cream + Acid + Crunch. Missing texture = NO SEND."
          },
          {
            title: "6. PORTION LAW",
            content: "Hard pre-portioning. Tray items on hard grid cutting. No freehand."
          },
          {
            title: "7. SAUCE LAW (v2.5.2)",
            content: "No reduction. No scorching. If split → extract → blend immediately.",
            quote: "Control the number. Control the volume. Control the outcome."
          }
        ]
      }
    ]
  },
  pizza: {
    label: "PIZZA ENGINE",
    icon: "🍕",
    color: "#FF6B35",
    station: "Pizza",
    tag: "FOUNDATION",
    items: ([
      {
        id: "PIZZA-001",
        name: "Pizza Dough 65% / 44h",
        engine: "LUNA-001",
        section: "PREP",
        forgev3: {
          wmm: [
            "Flour (00): 3.1kg",
            "Water: 2.01kg (65%)",
            "Salt: 77g",
            "Yeast: 3g",
            "Method: Mix water/yeast/flour → Salt last → 23°C FDT (THE FERMENTATION LAW) → Ball 260g → 44h Cold Ferment"
          ],
          yield: "20 Balls",
          timeLaw: "23°C FDT | 44h Cold Set | 4h Temper before use",
          passSignals: ["Abundant internal aeration (leopard skin bubble)", "Elastic snap-back recovery", "Neutral/clean dough scent"],
          rejectSignals: ["Overproof stickiness (collapse)", "Sour lactic/acetic smell", "Dense/dead rim (underproof)"],
          failureLaw: "THE FERMENTATION LAW breach; deviation from 23°C FDT causes yeast metabolic transition—either excessive CO2 production (tearing) or dormancy (leathery crumb).",
          recoveryProtocol: "If underproof: Temper at 25°C for 60 mins. If overproof: REJECT.",
          jemmaMapping: ["METABOLIC TRANSITION", "STARCH GELATINIZATION FAILURE"],
          memoryTag: "FDT 23.0 Precision"
        },
        rootLayer: "48h fermentation system (65% hydration).",
        controlLaw: "THE FERMENTATION LAW — Time and temp define structure.",
        ingredients: [
          "Flour (00) — 3.10kg",
          "Water — 2.01kg",
          "Salt — 77g",
          "Yeast (fresh) — 3g"
        ],
        method: [
          "Mix water/yeast → add flour → salt last",
          "FDT 23°C",
          "Ball 260g",
          "44h cold ferment"
        ],
        holding: "Max 72h chilled",
        service: "Temper 2-4h before use",
        timeLaw: "FDT 23°C / Ferment 48h",
        validationPoints: {
          postPrep: "Elasticity test passed",
          preService: "Internally 18°C",
          atPass: "Aeration lock"
        },
        failureLaw: "Overproof (sticky) / Underproof (tight)",
        autoReject: "Snap-back / Sour smell",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PIZZA-002",
        name: "Tomato Base (San Marzano)",
        engine: "PREP",
        section: "PREP",
        forgev3: {
          wmm: [
            "San Marzano tomatoes: 10kg",
            "Sea salt: 100g",
            "Fresh basil: 50g",
            "Method: Hand crush only (THE ACID LAW) → Fold salt/basil → Chill 2h to stabilize pH"
          ],
          yield: "110 Portions (90g)",
          timeLaw: "2h Stabilization | No cook | Max 48h shelf",
          passSignals: ["Vibrant ruby-red particulate matrix", "Bright citric high-notes", "Zero water-pith separation"],
          rejectSignals: ["Metallic/Tinny profile", "Gassy/Fermented bubbles", "Grey/Oxidized surface"],
          failureLaw: "THE ACID LAW breach; machine blending ruptures tomato seeds, releasing bitter tannins and mechanical heat that degrades natural ascorbic acidity.",
          recoveryProtocol: "If bitter: REJECT. Hand-crush only.",
          jemmaMapping: ["OXIDATIVE DEGRADATION", "SEED RUPTURE BITTERNESS"],
          memoryTag: "Hand-crush only"
        },
        rootLayer: "Hand-crushed acid-balanced tomato matrix.",
        controlLaw: "THE ACID LAW — pH must remain bright, no sugar added.",
        ingredients: [
          "San Marzano tomatoes — 10kg",
          "Sea salt — 100g",
          "Fresh basil — 50g"
        ],
        method: [
          "Hand crush tomatoes",
          "Fold in salt and torn basil",
          "Chill 2h before use"
        ],
        holding: "Max 48h",
        service: "Ladle #2 (90g)",
        timeLaw: "Stabilize 2h",
        validationPoints: {
          postPrep: "Vibrant red",
          preService: "Chilled core",
          atPass: "Acid bite"
        },
        failureLaw: "Metallic taste / Watery separation",
        autoReject: "Gassy / Fermenting",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PIZZA-003",
        name: "Margherita",
        engine: "LUNA-001",
        section: "CORE",
        forgev3: {
          wmm: [
            "260g Dough / 90g Sauce / 100g Cheese",
            "Basil/EVOO",
            "Method: Stretch to 12\" → Spiral sauce → Dot cheese (THE BALANCE LAW) → Flash bake 430°C"
          ],
          yield: "1 Portion",
          timeLaw: "90-120s Bake @ 430°C | 30s build",
          passSignals: ["Cornicione leopard spotting", "Melted central cheese fusion", "Dry base (no sog)"],
          rejectSignals: ["Soggy 'souping' center", "Burnt floor bitterness", "Dense/flat rim"],
          failureLaw: "THE BALANCE LAW breach; excessive sauce application prevents base heat-reach, leading to starch gelatinization (soggy middle).",
          recoveryProtocol: "If soggy: REJECT. If pale: Flash for 20s.",
          jemmaMapping: ["THERMAL LOCKING (SAUCE)", "MAILLARD RATIO ERROR"],
          memoryTag: "90g Sauce Boundary"
        },
        rootLayer: "Triple-element balance (dough/acid/fat).",
        controlLaw: "THE BALANCE LAW — 90g sauce / 100g cheese max.",
        ingredients: [
          "260g dough",
          "90g tomato base",
          "100g mozzarella fiodilatte",
          "Fresh basil",
          "EVOO"
        ],
        method: [
          "Stretch to 12 inch",
          "Spiral sauce",
          "Dot cheese",
          "Flash bake 430°C"
        ],
        holding: "Immediate",
        service: "Plate → Basil finish",
        timeLaw: "Bake: 90-120 sec",
        validationPoints: {
          postPrep: "Uniform stretch",
          preService: "Floor 430°C",
          atPass: "Leopard spotting / Melted centre"
        },
        failureLaw: "Soggy middle / Flat rim",
        autoReject: "Dense dough / Burnt floor",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PIZZA-004",
        name: "Diavola",
        engine: "LUNA-001",
        section: "CORE",
        forgev3: {
          wmm: [
            "260g Dough / 90g Sauce / 90g Cheese",
            "Spicy Ventricina: 60g / Fresh chili",
            "Method: Salami on top layer (THE CURL LAW) → High heat bake → Lipid render focus"
          ],
          yield: "1 Portion",
          timeLaw: "90-120s Bake | Target fat-release bloom",
          passSignals: ["Curled/Crisp salami edges", "Glowing orange oil dispersion", "Intense heat-spice aroma"],
          rejectSignals: ["Pools of liquid grease", "Unrendered white pork fat", "Cold chili presence"],
          failureLaw: "THE CURL LAW breach; burying meat under cheese prevents top-down radiative heat from rendering fat and crisping edges.",
          recoveryProtocol: "If unrendered: Torch or return to oven for 15s top-heat.",
          jemmaMapping: ["LIPID POOLING", "RADIATIVE BLOCKAGE"],
          memoryTag: "Ventricina surface-exposure"
        },
        rootLayer: "High-fat heat system.",
        controlLaw: "THE CURL LAW — Salami must crisp and curl at edges.",
        ingredients: [
          "260g dough",
          "90g sauce",
          "90g cheese",
          "60g Spicy Ventricina",
          "10g fresh chilli"
        ],
        method: [
          "Standard build",
          "Layer salami last",
          "Bake for fat-release"
        ],
        holding: "Immediate",
        service: "Glowing oil sheen finish",
        timeLaw: "Bake: 90-120 sec",
        validationPoints: {
          postPrep: "Thin sliced meat",
          preService: "Floor 430°C",
          atPass: "Crisp meat edges"
        },
        failureLaw: "Grease pool / Bitter char",
        autoReject: "Cold chilli / Unrendered fat",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PIZZA-005",
        name: "Quattro Formaggi",
        engine: "LUNA-001",
        section: "CORE",
        forgev3: {
          wmm: [
            "260g Dough (Bianca) / 120g Multi-cheese mix",
            "Method: Ricotta base → Melting order lock (THE ORDER LAW) → Flash bake (Cooler floor 410°C)"
          ],
          yield: "1 Portion",
          timeLaw: "100-130s Bake | Floor temp 410°C target",
          passSignals: ["Multi-toned cheese blisters", "Creamy ricotta islands", "Velvet mouthfeel (non-greasy)"],
          rejectSignals: ["Uniform yellow-oil lake (split fats)", "Burnt blue cheese bitterness", "Cold cheese center"],
          failureLaw: "THE ORDER LAW breach; applying high-fat soft cheeses too early leads to lipid rupture and oily separation before the crust sets.",
          recoveryProtocol: "If oily: REJECT. If pale: Flash.",
          jemmaMapping: ["EMULSION BREAK", "MELT-POINT ANARCHY"],
          memoryTag: "Cheese layering hierarchy"
        },
        rootLayer: "Heterogeneous cheese-mass system (Bianca).",
        controlLaw: "THE ORDER LAW — Cheeses applied in melting point order.",
        ingredients: [
          "260g dough",
          "40g Mozzarella",
          "30g Gorgonzola",
          "30g Parmesan",
          "20g Ricotta"
        ],
        method: [
          "Stretch dough",
          "Layer cheeses Ricotta bottom",
          "Flash bake (lower floor)"
        ],
        holding: "Immediate",
        service: "Black pepper finish",
        timeLaw: "Bake: 100-130 sec",
        validationPoints: {
          postPrep: "Cheese weights accurate",
          preService: "Lower floor (410°C)",
          atPass: "Blisters on cheese"
        },
        failureLaw: "Split fat / Unmelted blue",
        autoReject: "Oily lake / Burnt base",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PIZZA-006",
        name: "Nduja & Honey",
        engine: "LUNA-001",
        section: "CORE",
        forgev3: {
          wmm: [
            "260g Dough / 90g Sauce / 90g Cheese",
            "Nduja: 40g / Hot Honey: 15ml",
            "Method: Spread Nduja dots → High heat bake → Spiral honey post-bake (THE DRIZZLE LAW)"
          ],
          yield: "1 Portion",
          timeLaw: "90-120s Bake | Post-fire finishing protocol",
          passSignals: ["Rendered Nduja pools", "Glossy honey spiral sheen", "Explosive spice-sugar contrast"],
          rejectSignals: ["Soggy/cloy center", "Unmelted Nduja clumps", "Asymmetric honey distribution"],
          failureLaw: "THE DRIZZLE LAW breach; applying honey pre-bake causes sugar caramelization/burning and moisture migration into the dough center.",
          recoveryProtocol: "If soggy: REJECT. If burnt: REJECT.",
          jemmaMapping: ["SUGAR CARBONIZATION", "STRUCTURAL MOISTURE WEAKNESS"],
          memoryTag: "Honey: POST-FIRE ONLY"
        },
        rootLayer: "Fat-spice-sugar balance system.",
        controlLaw: "THE DRIZZLE LAW — Spiral honey from centre only.",
        ingredients: [
          "260g dough",
          "90g sauce",
          "90g cheese",
          "40g Nduja",
          "15ml Hot Honey"
        ],
        method: [
          "Standard build with Nduja dots",
          "Bake as Diavola",
          "Drizzle honey post-bake"
        ],
        holding: "Immediate",
        service: "Glossy spicy finish",
        timeLaw: "Bake: 90-120 sec",
        validationPoints: {
          postPrep: "5g dots uniform",
          preService: "Honey at room temp",
          atPass: "Nduja rendered"
        },
        failureLaw: "Cloying sweetness / Soggy centre",
        autoReject: "Unbalanced honey / Burnt meat",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      }
    ] as any[]).map(doctrinePatch),
    operationalLayers: [
      {
        name: "PIZZA ENGINE — CONTROL LAYER",
        subtitle: "System Layer: Fermentation / Heat / Moisture Control",
        sections: [
          {
            title: "BUILD LAW",
            content: [
              "SAUCE RATIO: 90g max (Ladle #2). Over-saucing kills the base.",
              "CHEESE RATIO: 90g max. Over-cheesing steams the dough.",
              "THE EDGE RULE: 1 inch (2.5cm) clear rim (Cornicione) for gas expansion.",
              "MOISTURE LOCK: All wet toppings (Mushrooms, Peppers, Mozz) must be drained/pre-cooked."
            ],
            quote: "Dry base, aerated rim, balanced top. No exceptions."
          },
          {
            title: "OVEN LAW",
            content: [
              "DECK TEMP: 420–450°C. Below 400°C = tough crust. Above 460°C = burnt base/raw dough.",
              "ROTATION LOCK: 180° rotation at 60s. Essential for even heat dispersion.",
              "RECOVERY TIME: Allow 60s between pizzas for floor temp recovery."
            ],
            quote: "The floor temp is your primary engine. Control the floor."
          },
          {
            title: "TOMATO SYSTEM (ACID LOCK)",
            content: [
              "WATER LOCK: Tomato pulp must be sieve-drained if too watery. No soup centres.",
              "ACID BALANCE: San Marzano standard. Add 10g salt per 1kg tomatoes. No sugar."
            ]
          }
        ]
      }
    ]
  },
  burger: {
    label: "BURGER ENGINE",
    icon: "🍔",
    station: "GRILL",
    color: "#FFB347",
    tag: "CORE",
    items: ([
      {
        id: "BURGER-001",
        name: "Galyons Beef Burger (230g)",
        engine: "HELIOS",
        section: "MAINS",
        forgev3: {
          wmm: [
            "Beef patty: 230g",
            "Brioche bun: 1 unit",
            "Mature cheddar: 2 slices",
            "Garnish: Lettuce/Tomato/Sauce",
            "Method: Heavy salt seasoning → Hard sear 4 min (THE SEAR LAW) → Flip/Cheese → 72°C internal → Bun toast mandatory"
          ],
          yield: "1 Portion",
          timeLaw: "8 min Cook | 45s Build | Hold: Zero (Immediate service)",
          passSignals: ["Crust depth > 1mm", "Melted cheese veil", "Bun is handle-warm and resilient"],
          rejectSignals: ["Grey/Boiled meat surface", "Unmelted cheese edges", "Cold/Untoasted bun"],
          failureLaw: "THE SEAR LAW breach; failure to achieve Maillard crust at >220°C allows albumin leakage and juice loss.",
          recoveryProtocol: "If under-seared: Flash at 250°C for 30s. If raw: Return to HELIOS.",
          jemmaMapping: ["MAILLARD FAILURE", "THERMAL UNDER-PENETRATION"],
          memoryTag: "Grill surface temperature"
        },
        rootLayer: "Foundation beef 230g stack.",
        controlLaw: "THE SEAR LAW — Maximum crust, minimum juice loss.",
        ingredients: [
          "Beef patty — 230g",
          "Brioche bun — 1",
          "Mature cheddar — 2 slices",
          "Lettuce — 20g",
          "Tomato — 2 slices",
          "House burger sauce — 30g"
        ],
        method: [
          "Season patty heavily with salt",
          "Hard sear 4 min side A",
          "Flip → cheese immediately",
          "Cook to internal 72°C",
          "Bun toast mandatory"
        ],
        holding: "No holding — immediate build",
        service: "Open build — lid slightly offset",
        timeLaw: "Cook: 8 min / Build: 45 sec",
        validationPoints: {
          postPrep: "Patty uniform 230g",
          preService: "Grill at 220°C",
          atPass: "Melt confirmed / Sear depth > 1mm"
        },
        failureLaw: "Grey meat / No crust = fail",
        autoReject: "Uneven sear / Cold bun",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "BURGER-002",
        name: "Double Stack Burger (2x150g)",
        engine: "HELIOS",
        section: "MAINS",
        forgev3: {
          wmm: [
            "Beef patties: 2x150g",
            "Brioche bun: 1 unit",
            "Mature cheddar: 2 slices",
            "Pickles/Sauce",
            "Method: Simultaneous cook (THE SYNCHRONISATION LAW) → Single flip → Cheese both → Stack immediately"
          ],
          yield: "1 Portion",
          timeLaw: "8-9 min Cook | 20s Build | Synchronized finish mandatory",
          passSignals: ["Symmetrical vertical stack", "Dual cheese melt fusion", "Stability under compression"],
          rejectSignals: ["Sliding/Asymmetric stack", "Uneven patty doneness", "Excess oil drip from base"],
          failureLaw: "THE SYNCHRONISATION LAW breach; staggered finishing times lead to thermal mismatch and selective patty cooling.",
          recoveryProtocol: "If cold: REJECT. Stack cannot be safely separated post-melt.",
          jemmaMapping: ["THERMAL ASYMMETRY", "STRUCTURAL INSTABILITY"],
          memoryTag: "Patty flip timing"
        },
        rootLayer: "Speed-of-service double patty system.",
        controlLaw: "THE SYNCHRONISATION LAW — Both patties must finish simultaneously.",
        ingredients: [
          "2x beef patties — 150g each",
          "Brioche bun",
          "Mature cheddar — 2 slices",
          "Pickles — 20g",
          "Burger sauce — 30g"
        ],
        method: [
          "Cook patties simultaneously",
          "Flip once",
          "Cheese on both",
          "Stack immediately"
        ],
        holding: "No holding — immediate build",
        service: "Compact stack, tight build",
        timeLaw: "Cook: 8–9 min / Build: 20 sec",
        validationPoints: {
          postPrep: "Patties equal size",
          preService: "Station ready",
          atPass: "Melt, symmetry, stability"
        },
        failureLaw: "Uneven cook = rejection",
        autoReject: "Uneven patties / Sliding stack",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "BURGER-003",
        name: "Chipotle Buttermilk Chicken Burger",
        engine: "AETHER",
        section: "MAINS",
        forgev3: {
          wmm: [
            "Chicken thigh: 180g (Buttermilk)",
            "Flour dredge: Seasoned",
            "Brioche bun/Slaw/Chipotle mayo",
            "Method: Dredge to order → Fry 180°C (THE CRUST LAW) → Golden target + safety core → 1 min rest"
          ],
          yield: "1 Portion",
          timeLaw: "6-7 min Fry | 1 min Rest | Max 2 min hold post-fry",
          passSignals: ["Audible fracture crackle on bite", "Vibrant golden coating (no dark spots)", "Breast/Thigh is moist and steaming"],
          rejectSignals: ["Soft/Leathery skin", "Oil saturated coating", "Pale/Under-fried patches"],
          failureLaw: "THE CRUST LAW breach; low oil temp or over-crowding the fryer leads to lipid saturation of the starch dredge.",
          recoveryProtocol: "If soft: Return to 180°C for 60s. If dry: REJECT.",
          jemmaMapping: ["LIPID SATURATION", "CRUST FAILURE"],
          memoryTag: "Fryer load density"
        },
        rootLayer: "Crunch-first chicken system with heat-acid balance.",
        controlLaw: "THE CRUST LAW — Chicken must audibly crunch on bite.",
        ingredients: [
          "Chicken thigh — 180g (buttermilk marinated)",
          "Flour dredge (seasoned)",
          "Brioche bun",
          "Slaw — 40g",
          "Chipotle mayo — 30g"
        ],
        method: [
          "Dredge → fry at 180°C",
          "Cook until golden + internal temp safe",
          "Rest 1 min"
        ],
        holding: "Max 2 min post fry",
        service: "Sauce base / Chicken / Slaw top / Lid",
        timeLaw: "Fry: 6–7 min / Build: 30 sec",
        validationPoints: {
          postPrep: "Coating even",
          preService: "Oil temp stable",
          atPass: "Crunch intact, no oil bleed"
        },
        failureLaw: "Soft crust = fail / Oil soak = fail",
        autoReject: "Pale coating / Greasy finish",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "BURGER-004",
        name: "BBQ Pulled Pork Burger",
        engine: "HELIOS",
        section: "MAINS",
        forgev3: {
          wmm: [
            "Pulled pork: 180g",
            "Brioche bun: 1 unit",
            "BBQ sauce: 30g",
            "Apple slaw: 40g",
            "Method: Reheat pork gently (HELIOS) → Sauce lightly → Drain excess moisture (THE DRAIN LAW) → Build immediately on toasted bun"
          ],
          yield: "1 Portion",
          timeLaw: "5 min Reheat | 20s Build | Hold: Zero",
          passSignals: ["Glossy meat strands (not dripping)", "Dry bun base resilience", "Acid-bright slaw contrast"],
          rejectSignals: ["Soggy bun collapse", "Dry/Fibrous texture", "Sauce-heavy visual pooling"],
          failureLaw: "THE DRAIN LAW breach; failure to offset high-fat braising meat with adequate acidity and moisture drainage leads to bun saturation.",
          recoveryProtocol: "If soggy: Replace bun base. If dry: Reheat with extra BBQ glaze.",
          jemmaMapping: ["MOISTURE MIGRATION FAILURE", "SYRUP-FAT OVERLOAD"],
          memoryTag: "Liquid-meat ratio"
        },
        rootLayer: "Soft protein + acid cut system.",
        controlLaw: "THE BALANCE LAW — Fat must be cut by acidity (slaw mandatory).",
        ingredients: [
          "Pulled pork — 180g",
          "Brioche bun",
          "BBQ sauce — 30g",
          "Apple slaw — 40g"
        ],
        method: [
          "Reheat pork gently",
          "Sauce lightly",
          "Build immediately"
        ],
        holding: "Hot hold max 30 min (covered)",
        service: "Pork base / Slaw top / Clean close",
        timeLaw: "Reheat: 5 min / Build: 20 sec",
        validationPoints: {
          postPrep: "Pork moist",
          preService: "Slaw fresh",
          atPass: "Balance present"
        },
        failureLaw: "Dry pork = fail / No acid = heavy dish",
        autoReject: "Dry texture / Sauce overload",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "BURGER-005",
        name: "New York Burger (Pastrami)",
        engine: "HELIOS",
        section: "MAINS",
        forgev3: {
          wmm: [
            "Beef patty: 230g",
            "Pastrami: 60g",
            "Swiss cheese: 2 slices",
            "Mustard/Pickles",
            "Method: Cook beef as BURGER-001 → Heat pastrami separately (THE STACK LAW) → Melt Swiss over stack → Build tight"
          ],
          yield: "1 Portion",
          timeLaw: "10 min total cook | 30s build | Stability mandatory",
          passSignals: ["Vertical center-of-gravity lock", "Steaming pastrami layer", "Symmetrical melt"],
          rejectSignals: ["Leaning tower (overstack collapse)", "Cold/Waxy pastrami", "Unmelted Swiss edges"],
          failureLaw: "THE STACK LAW breach; failure to stabilize the multi-protein stack causes sliding during transit to pass.",
          recoveryProtocol: "If leaning: RESET STACK. If cold: Return to HELIOS.",
          jemmaMapping: ["STRUCTURAL COLLAPSE", "ASYMMETRIC MELT"],
          memoryTag: "Stack stability physics"
        },
        rootLayer: "Beef + pastrami umami stack.",
        controlLaw: "THE STACK LAW — Layers must remain stable under weight.",
        ingredients: [
          "Beef patty — 230g",
          "Pastrami — 60g",
          "Swiss cheese — 2 slices",
          "Mustard — 20g",
          "Pickles — 20g"
        ],
        method: [
          "Cook beef as BURGER-001",
          "Heat pastrami separately",
          "Stack tight, no overbuild"
        ],
        holding: "Minimal",
        service: "Stack tight, no overbuild",
        timeLaw: "Cook: 10 min / Build: 30 sec",
        validationPoints: {
          postPrep: "Components ready",
          preService: "Pastrami hot",
          atPass: "Stable stack"
        },
        failureLaw: "Overstack collapse / Cold pastrami",
        autoReject: "Structural failure / Imbalance",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "BURGER-006",
        name: "The Galyons Vegan (Specialist)",
        engine: "HELIOS",
        section: "MAINS",
        forgev3: {
          wmm: [
            "Beyond/House Mix patty: 1 unit",
            "Vegan Cheese: 2 slices",
            "Kimchi: 20g (Drained)",
            "Vegan Mayo/Sesame Bun",
            "Method: Pan-sear (Dedicated surface) → Melt vegan mozzarella → Drain kimchi (THE DRAIN LAW) → Upright stack"
          ],
          yield: "1 Portion",
          timeLaw: "8 min Cook | 30s Build | Cross-contamination zero-tolerance",
          passSignals: ["Pink plant-interior juicy bite", "Liquid cheese melt (vegan-standard)", "Crunch-drain kimchi texture"],
          rejectSignals: ["Soggy bun base (kimchi rot)", "Cold vegan cheese", "Rubbery over-seared protein"],
          failureLaw: "THE DRAIN LAW breach; failure to drain fermented components causes rapid acidity-driven breakdown of the plant protein structure.",
          recoveryProtocol: "If soggy: Replace bun base. If rubbery: REJECT (over-cooked).",
          jemmaMapping: ["STRUCTURAL COLLAPSE", "LIPID SATURATION (VEGAN)"],
          memoryTag: "Ferment-drain efficacy"
        },
        rootLayer: "High-protein plant matrix stabilization.",
        controlLaw: "THE DRAIN LAW — Kimchi must be drained to prevent bun rot.",
        ingredients: [
          "Beyond/House Mix",
          "Vegan Cheese",
          "Vegan Mayo",
          "Kimchi",
          "Sesame Bun"
        ],
        method: [
          "Pan-sear (separate surface)",
          "Melt vegan mozzarella",
          "Kimchi acid spike"
        ],
        holding: "No holding",
        service: "Upright stack + pink plant interior",
        timeLaw: "Cook: 8 min / Build: 30 sec",
        validationPoints: {
          postPrep: "Plant protein chilled",
          preService: "Dedicated surface ready",
          atPass: "Melt confirmed"
        },
        failureLaw: "Rubber texture / Cold cheese",
        autoReject: "Soggy base / Cross-contamination",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      }
    ] as any[]).map(doctrinePatch),
    operationalLayers: [
      {
        name: "THE SYNCHRONISATION LAW",
        subtitle: "PATTY SYNCHRONISATION",
        sections: [
          { title: "THE LAW", content: ["Both patties must finish simultaneously.", "State of Transition: Monitor for flow."] },
          { title: "DRIVE", content: ["Speed-of-service double patty system.", "Compact stack, tight build."] }
        ]
      },
      {
        name: "GLOBAL CARD — BURGER STATION LAW (v2.5.2a)",
        subtitle: "Protein Mass & Thermal Control Protocol",
        sections: [
          {
            title: "1. THE 230g PROTEIN STANDARD",
            content: [
              "• CORE MASS: All beef patties must be 230g (+/- 5g).",
              "• NO-PRESS LAW: Do not flatten protein. Retain volume/juice.",
              "• CLOCHE LAW: Mandatory cloche for 230g patties (final 2 mins)."
            ]
          },
          {
            title: "2. THERMAL WINDOWS",
            content: [
              "• Cook Target: 72°C (Beef) / 74°C (Chicken).",
              "• Rest Target: 3 Min (Mandatory for 230g mass).",
              "• Failure to rest = blood pooling on bun = reject."
            ]
          },
          {
            title: "3. PASS CRITERIA (AUTO-REJECT)",
            content: [
              "• Sliding stack (unstable geometry).",
              "• Soggy bottom bun (moisture barrier fail).",
              "• Temperature below target (safety fail).",
              "• Raw marrow butter (Forge Double error)."
            ],
            quote: "A burger is only as good as its moisture barrier."
          }
        ]
      }
    ]
  },

  mains: {
    label: "MAINS ENGINE",
    icon: "🔥",
    color: "#C84B31",
    station: "Grill / Hot / Fry",
    tag: "CORE",
    items: ([
      {
        id: "MAIN-001",
        name: "Aged Ribeye (300g)",
        engine: "HELIOS",
        section: "SPECIALS",
        forgev3: {
          wmm: [
            "300g Aged Ribeye: 1 unit",
            "Maldon salt/Bone marrow butter",
            "Method: Temper 30 mins → Grill high heat (HELIOS) → 52°C target (Med-Rare) → Rest 5 min (THE REST LAW)"
          ],
          yield: "1 Portion",
          timeLaw: "8 min Cook | 5 min Rest | No service if rest < 5 min",
          passSignals: ["Deep Maillard crust (mahogany)", "Zero blood pooling on plate", "Fat cap fully rendered/soft"],
          rejectSignals: ["Grey/Steamed surface", "Cold target center", "Active juice bleed on cut"],
          failureLaw: "THE REST LAW breach; insufficient capillary re-absorption of moisture leads to dramatic juice loss and dry internal fibers.",
          recoveryProtocol: "If cold: Flash rest 60s in HELIOS. If under-rested: DELAY SERVICE.",
          jemmaMapping: ["CAPILLARY LEAK", "MAILLARD UNDER-DEPTH"],
          memoryTag: "CAP PRESSURE / REST TIME"
        },
        rootLayer: "Fire-driven protein with precision rest.",
        controlLaw: "THE REST LAW — 5 min minimum rest mandatory.",
        ingredients: [
          "300g Aged Ribeye",
          "Maldon salt",
          "Bone marrow butter"
        ],
        method: [
          "Temper steak 30 mins",
          "Grill high heat 4 min per side",
          "Core temp 52°C for Med-Rare",
          "Rest 5 min warm area"
        ],
        holding: "5 min rest max before service",
        service: "Pre-heated plate",
        timeLaw: "Cook: 8 min / Rest: 5 min",
        validationPoints: {
          postPrep: "Steak tempered",
          preService: "Grill 250°C",
          atPass: "Maillard crust / No juice bleed"
        },
        failureLaw: "Grey band / Cold centre",
        autoReject: "Blood pooling / No crust",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "MAIN-002",
        name: "Chicken Parmigiana",
        engine: "AETHER",
        section: "CORE",
        forgev3: {
          wmm: [
            "Chicken breast: 200g (Panko)",
            "Tomato base: 60g",
            "Mozzarella: 60g",
            "Method: Hammer to 1cm → Flash fry (AETHER) → Sauce center (THE CRUMB LAW) → Broil 90s"
          ],
          yield: "1 Portion",
          timeLaw: "4 min Fry | 90s Broil | Hold: Zero",
          passSignals: ["Crisp breading perimeter", "Bubble-char mozzarella top", "Center-weighted sauce build"],
          rejectSignals: ["Soggy perimeter (sauce bleed)", "Leathery over-broiled chicken", "Cold sauce center"],
          failureLaw: "THE CRUMB LAW breach; contact between moisture-heavy sauce and the crispy breading perimeter causes rapid starch hydration.",
          recoveryProtocol: "If soggy: REJECT. Component is visually and structurally compromised.",
          jemmaMapping: ["STARCH HYDRATION", "THERMAL GRADIENT FAILURE"],
          memoryTag: "Sauce boundary control"
        },
        rootLayer: "Crisp + melt contrast dish.",
        controlLaw: "THE CRUMB LAW — No sauce contact on breading perimeter.",
        ingredients: [
          "200g Chicken breast",
          "100g Panko breading",
          "60g Tomato base",
          "60g Mozzarella"
        ],
        method: [
          "Hammer chicken to 1cm",
          "Standard breading station",
          "Flash fry → apply sauce center",
          "Top with mozzarella → broil 90s"
        ],
        holding: "No holding",
        service: "Center sauce build only",
        timeLaw: "Fry: 4 min / Broil: 90 sec",
        validationPoints: {
          postPrep: "Uniform thickness",
          preService: "Broiler high",
          atPass: "Melted top / Crisp edges"
        },
        failureLaw: "Soggy crumb / Tough chicken",
        autoReject: "Wet perimeter / Cold sauce",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "MAIN-003",
        name: "Pan-Seared Sea Bass",
        engine: "HELIOS",
        section: "CORE",
        forgev3: {
          wmm: [
            "Sea bass fillet: 140g",
            "Bone marrow butter: 10g",
            "Method: Dry skin (THE RENDER LAW) → High heat sear (HELIOS) → Spatula pressure 30s → Baste finish"
          ],
          yield: "1 Portion",
          timeLaw: "3 min Skin / 1 min Flesh | Total 4 min | Immediate service",
          passSignals: ["Glass-crush audible skin fracture", "Translucent/White flesh center", "Glossy butter coating"],
          rejectSignals: ["Rubbery/Soft skin", "Grey/Over-cooked flesh", "Albumin bleed on surface"],
          failureLaw: "THE RENDER LAW breach; failure to dehydrate the skin via dry-patting and constant pressure results in steam-locking the collagen.",
          recoveryProtocol: "If soft: Return to pan skin-side down with weight. If dry: REJECT.",
          jemmaMapping: ["COLLAGEN RENDER FAILURE", "THERMAL OVER-SHOOT"],
          memoryTag: "Skin-side pressure"
        },
        rootLayer: "Skin-crisp precision fish.",
        controlLaw: "THE RENDER LAW — Skin must be glass-like and fully rendered.",
        ingredients: [
          "140g Sea bass fillet",
          "10ml Pomace oil",
          "10g Bone marrow butter"
        ],
        method: [
          "Dry skin thoroughly",
          "Spatula pressure 30s",
          "Skin cook 3 min / Flesh 1 min",
          "Butter baste finish"
        ],
        holding: "Immediate",
        service: "Skin side up",
        timeLaw: "Cook: 4 min",
        validationPoints: {
          postPrep: "Skin dry",
          preService: "Pan smoking",
          atPass: "Audible crisp skin"
        },
        failureLaw: "Rubbery skin / Albumin bleed",
        autoReject: "Soft skin / Dry flesh",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "MAIN-004",
        name: "Ale Battered Fish & Chips",
        engine: "AETHER",
        section: "CORE",
        forgev3: {
          wmm: [
            "Haddock fillet: 180g",
            "Ale batter (PREP-015): Chilled <4°C",
            "Method: Dry fish → Flour dust → Cold batter dip (THE COLD LAW) → Fry 180°C (AETHER) for 6 min"
          ],
          yield: "1 Portion",
          timeLaw: "6 min Fry | Max 2 min shelf life | Fryer temp 180°C lock",
          passSignals: ["Shatter-crisp honeycombed batter", "Uniform golden aeration", "Moist/Steaming fish flakes"],
          rejectSignals: ["Greasy/Sodden shell", "Batter detachment from flesh", "Cold core temperature"],
          failureLaw: "THE COLD LAW breach; warm batter fails to trap CO2 upon heat contact, leading to a flat, dense, oil-saturated shell.",
          recoveryProtocol: "If greasy: REJECT. Battery density is irreversible.",
          jemmaMapping: ["CO2 RELEASE FAILURE", "LIPID SATURATION"],
          memoryTag: "Batter thermal delta"
        },
        rootLayer: "Fresh steam center in crisp starch shell.",
        controlLaw: "THE COLD LAW — Batter must be <4°C for high-temp expansion.",
        ingredients: [
          "180g Haddock fillet",
          "Ale batter (chilled)",
          "Triple cooked chips",
          "Tartare sauce"
        ],
        method: [
          "Dry fish fully",
          "Light flour dust",
          "Cold dip → 180°C drop",
          "Fry 5-7 min"
        ],
        holding: "Max 2 min shelf",
        service: "Tall build on paper",
        timeLaw: "Fry: 6 min",
        validationPoints: {
          postPrep: "Batter chilled",
          preService: "Oil 180°C",
          atPass: "Batter adherence / Steam release"
        },
        failureLaw: "Detached batter / Greasy shell",
        autoReject: "Pale color / Wet interior",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "MAIN-005",
        name: "Beef Lasagne",
        engine: "LUNA-003",
        section: "PASTA",
        forgev3: {
          wmm: [
            "House Ragu/Béchamel/Pasta/Parmesan",
            "Method: Layer cold → Oven 180°C (LUNA-003) for 15 min → 75°C core target → Rest 5 min (THE SET LAW)"
          ],
          yield: "1 Portion",
          timeLaw: "15 min Oven | 5 min Rest | Stable shelf hold at 65°C",
          passSignals: ["Visible distinct structured layers", "Glistening bechamel surface", "Zero structural slump on plate"],
          rejectSignals: ["Layer collapse (souping)", "Dry/Curled pasta edges", "Cold tomato core"],
          failureLaw: "THE SET LAW breach; serving before the 5 min rest window prevents the starches and fats from stabilizing into a vertical stack.",
          recoveryProtocol: "If cold: Return to LUNA-003. If collapsed: REJECT.",
          jemmaMapping: ["STRUCTURAL COLLAPSE", "THERMAL STABILIZATION FAILURE"],
          memoryTag: "Post-heat rest window"
        },
        rootLayer: "Structured pasta build.",
        controlLaw: "THE SET LAW — 5 min rest after oven is mandatory for layers.",
        ingredients: [
          "House Ragu",
          "Béchamel",
          "Pasta sheets",
          "Parmesan"
        ],
        method: [
          "Layer cold pre-batch",
          "Oven finish 180°C 15 min",
          "Core temp 75°C",
          "Rest 5 min"
        ],
        holding: "5 min rest in holding cabinet",
        service: "Clean vertical slice",
        timeLaw: "Oven: 15 min / Rest: 5 min",
        validationPoints: {
          postPrep: "Even layering",
          preService: "Oven checked",
          atPass: "Hot centre / No bleed"
        },
        failureLaw: "Layer collapse / Cold centre",
        autoReject: "Ragù puddle / Unmelted top",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      }
    ] as any[]).map(doctrinePatch),
    operationalLayers: [
      {
        name: "GLOBAL CARD — HOT STATION LAW (v2.5.2a)",
        subtitle: "Thermal & Textural Integrity Protocol",
        sections: [
          {
            title: "1. THE 'REST' LAW",
            content: [
              "• MASSIVE PROTEIN: Ribeye (300g) MUST rest 5 mins minimum. No bypass.",
              "• PRESSURE EQUALISATION: Resting allows muscle fibres to relax and juices to redistribute.",
              "• SERVING TEMP: Serve on pre-heated plates only."
            ]
          },
          {
            title: "2. SKIN INTEGRITY (SEA BASS)",
            content: [
              "• DRY SKIN: Paper towel dry skin side before hitting pan.",
              "• PRESSURE: Spatula pressure for first 30s ensures flat skin/full render.",
              "• NO FLIP-FLOP: 75% cook skin side. Flip once only."
            ]
          },
          {
            title: "3. BATTER INTEGRITY (FISH & CHIPS)",
            content: [
              "• COLD CHAIN: Batter must be <4°C.",
              "• SURFACE DRYNESS: Flour coat must be dry before batter dip.",
              "• REJECTION: Any batter separation = AUTO REJECT."
            ],
            quote: "Hot plates, cold batter, rested meat. The three pillars of the Hot Line."
          }
        ]
      }
    ]
  },
  starters: {
    label: "STARTERS ENGINE",
    icon: "🥗",
    color: "#4BA87D",
    station: "Cold / Hot",
    tag: "CORE",
    items: ([
      {
        id: "STARTER-001",
        name: "Calamari Fritti",
        engine: "AETHER",
        section: "HOT",
        forgev3: {
          wmm: [
            "150g Squid rings/tentacles",
            "Seasoned flour",
            "30g Lemon aioli",
            "Method: Dry squid (THE RECOVERY LAW) → Crust dust → Flash fry 180°C (AETHER) for 2 min → Instant salt"
          ],
          yield: "1 Portion",
          timeLaw: "2 min Fry | Oil 180°C Recovery mandatory | Zero shelf life",
          passSignals: ["Tender non-rubbery bite", "Pale golden aerated crust", "Shatter-crisp surface"],
          rejectSignals: ["Rubbery texture (overcooked)", "Oil-soaked soggy coating", "Lead-grey undercooked color"],
          failureLaw: "THE RECOVERY LAW breach; dropping product into <175°C oil prevents instant steam-expansion, causing the flour to absorb lipids rather than repel them.",
          recoveryProtocol: "If soggy: REJECT. Component cannot be re-fried without rubberizing the squid.",
          jemmaMapping: ["LIPID ABSORPTION", "THERMAL RECOVERY FAILURE"],
          memoryTag: "180°C Flash point"
        },
        rootLayer: "Flash-fried tender protein system.",
        controlLaw: "THE RECOVERY LAW — Oil must hit 180°C before every batch.",
        ingredients: [
          "150g Squid rings & tentacles",
          "Seasoned flour",
          "30g Lemon aioli",
          "Lemon wedge"
        ],
        method: [
          "Dry squid thoroughly",
          "Dust in seasoned flour",
          "Fry 180°C for 2 min",
          "Salt immediately out of oil"
        ],
        holding: "Immediate service only",
        service: "Hot bowl, lemon on side",
        timeLaw: "Fry: 2 min",
        validationPoints: {
          postPrep: "Squid dry",
          preService: "Oil 180°C",
          atPass: "Crisp pale gold / Tender bite"
        },
        failureLaw: "Rubbery texture / Soggy coating",
        autoReject: "Oil-soaked / Cold",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "STARTER-002",
        name: "Bruschetta Pomodoro",
        engine: "HELIOS",
        section: "COLD",
        forgev3: {
          wmm: [
            "Sourdough slices: 2 units",
            "Tomato mix: 100g",
            "Garlic/Basil/Balsamic",
            "Method: Char bread (HELIOS) → Garlic rub (THE CRUNCH LAW) → Build with marinated mix"
          ],
          yield: "1 Portion",
          timeLaw: "2 min Char | 1 min Build | Max 5 min shelf life",
          passSignals: ["Hard-charred structural crust", "Vibrant tomato-acid tang", "Aromatic raw garlic high-note"],
          rejectSignals: ["Soggy bread collapse", "Watery tomato pooling", "Burnt garlic bitterness"],
          failureLaw: "THE CRUNCH LAW breach; failure to achieve a deep Maillard char on the sourdough eliminates the moisture barrier, leading to rapid bread softening.",
          recoveryProtocol: "If soggy: REJECT. Bread must be toasted to 'glass' state before topping.",
          jemmaMapping: ["MOISTURE BARRIER FAILURE", "STARCH HYDRATION"],
          memoryTag: "Char-depth moisture lock"
        },
        rootLayer: "Simple texture contrast benchmark.",
        controlLaw: "THE CRUNCH LAW — Bread must be charred to provide moisture barrier.",
        ingredients: [
          "2 slices sourdough",
          "House tomato mix",
          "Garlic clove",
          "Basil",
          "Balsamic glaze"
        ],
        method: [
          "Char sourdough on grill",
          "Rub with raw garlic",
          "Top with marinated tomato mix",
          "Finish with balsamic and basil"
        ],
        holding: "5 min max post-build",
        service: "Cold top, hot base contrast",
        timeLaw: "Grill: 2 min / Build: 1 min",
        validationPoints: {
          postPrep: "Tomato cubed 5mm",
          preService: "Bread fresh sliced",
          atPass: "No bread collapse"
        },
        failureLaw: "Soggy bread / Unseasoned tomatoes",
        autoReject: "Burnt garlic / Watery tomatoes",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "STARTER-003",
        name: "Buffalo Wings (Fire)",
        engine: "HELIOS",
        section: "HOT",
        forgev3: {
          wmm: [
            "Chicken wings: 6 units",
            "Fire glaze: 40g",
            "Method: Grill wings (HELIOS) to core 75°C (THE BONE LAW) → Toss in glaze bowl → Flash high heat 1 min"
          ],
          yield: "1 Portion",
          timeLaw: "8 min Grill | 1 min Flash | Core temp 75°C mandatory",
          passSignals: ["Lacquered/Sticky skin sheen", "Searing heat-to-the-bone", "Clean meat release from bone"],
          rejectSignals: ["Flabby/Wet skin", "Cold/Pink bone center", "Dry/Fibrous meat fibers"],
          failureLaw: "THE BONE LAW breach; failure to reach 75°C at the bone marrow prevents collagen breakdown, resulting in a rubbery, 'bloody' joint attachment.",
          recoveryProtocol: "If cold: Return to HELIOS for 2 min. If dry: REJECT.",
          jemmaMapping: ["THERMAL PENETRATION FAILURE", "COLLAGEN STIFFNESS"],
          memoryTag: "Bone-core thermal target"
        },
        rootLayer: "Sticky charred protein system.",
        controlLaw: "THE BONE LAW — Internal bone temp must be searingly hot.",
        ingredients: [
          "6 chicken wings",
          "40g Fire glaze",
          "Spring onion",
          "Sesame seeds"
        ],
        method: [
          "Grill wings 8 min (total)",
          "Core 75°C",
          "Toss in glaze bowl",
          "Flash 1 min on high heat"
        ],
        holding: "Immediate service",
        service: "Sticky, lacquered finish",
        timeLaw: "Cook: 9 min",
        validationPoints: {
          postPrep: "Wings rendered",
          preService: "Glaze warm",
          atPass: "Hot to the bone"
        },
        failureLaw: "Flabby skin / Cold centre",
        autoReject: "Dry meat / Watery glaze",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "STARTER-004",
        name: "Arancini (Mushroom)",
        engine: "AETHER",
        section: "HOT",
        forgev3: {
          wmm: [
            "Risotto balls: 3x 50g",
            "Panko/Truffle mayo",
            "Method: Chilled risotto base → Double crumb (THE INTEGRITY LAW) → Fry 180°C (AETHER) for 4 min → Probe 75°C"
          ],
          yield: "3 units",
          timeLaw: "4 min Fry | Max 5 min shelf life | Probe check mandatory",
          passSignals: ["Shatter-crisp outer shell", "Molten/Lava risotto core", "Uniform golden breading"],
          rejectSignals: ["Cold/Grainy rice center", "Shell burst (leakage)", "Oily/Soggy coating"],
          failureLaw: "THE INTEGRITY LAW breach; gaps in the double-crust panko layer allow oil ingress and steam-rupture of the internal rice matrix.",
          recoveryProtocol: "If cold: Return to AETHER for 60s. If burst: REJECT.",
          jemmaMapping: ["BARRIER FAILURE", "THERMAL CORE LAG"],
          memoryTag: "Crust-integrity seal"
        },
        rootLayer: "Molten heart in structural shell.",
        controlLaw: "THE INTEGRITY LAW — Double-crumb must be gap-free.",
        ingredients: [
          "3x 50g Risotto balls",
          "Panko",
          "30g Truffle mayo",
          "Parmesan"
        ],
        method: [
          "Shape chilled risotto",
          "Double crumb station",
          "Fry 180°C for 4 min",
          "Probe core 75°C"
        ],
        holding: "Max 5 min hold",
        service: "Molten centre release",
        timeLaw: "Fry: 4 min",
        validationPoints: {
          postPrep: "Risotto fully set",
          preService: "Oil checked",
          atPass: "Crunch shell / No burst"
        },
        failureLaw: "Cold centre / Oily coating",
        autoReject: "Burst in fryer / Grainy rice",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "STARTER-005",
        name: "Burrata & Heritage Tomato",
        engine: "PREP",
        section: "COLD",
        forgev3: {
          wmm: [
            "Burrata: 125g",
            "Heritage tomatoes: 100g",
            "Method: Temper cheese 30 min (THE TEMPER LAW) → Slice tomatoes at room temp → Basil oil/Salt finish"
          ],
          yield: "1 Portion",
          timeLaw: "30 min Tempering | Max 10 min build shelf",
          passSignals: ["Luscious stracciatella flow on cut", "Juicy/Tender tomato skin", "Clean floral basil aroma"],
          rejectSignals: ["Ice-cold waxy core", "Mealy/Dry refrigerated tomatoes", "Split/Shedded burrata skin"],
          failureLaw: "THE TEMPER LAW breach; cold burrata fat remains solidified, preventing the release of the creamy internal matrix upon consumer interaction.",
          recoveryProtocol: "If cold: Gently warm container in hand. If split: REJECT.",
          jemmaMapping: ["LIPID SOLIDIFICATION", "THERMAL SENSITIVITY"],
          memoryTag: "Fat-flow temperature"
        },
        rootLayer: "Temperature sensitive fat-acid system.",
        controlLaw: "THE TEMPER LAW — Burrata core must be 18-20°C (not fridge cold).",
        ingredients: [
          "125g Burrata ball",
          "100g Heritage tomatoes",
          "Basil oil",
          "Sea salt"
        ],
        method: [
          "Temper burrata 30 mins room temp",
          "Slice tomatoes room temp",
          "Build and drizzle oil",
          "Salt finish"
        ],
        holding: "Assemble to order",
        service: "Stracciatella release on cut",
        timeLaw: "Temper: 30 min",
        validationPoints: {
          postPrep: "Tomato at peak sugar",
          preService: "Cheese tempered",
          atPass: "Floral basil aroma"
        },
        failureLaw: "Ice-cold centre / Mealy tomatoes",
        autoReject: "Refrigerated tomatoes / Split burrata",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "STARTER-006",
        name: "Antipasti Misto",
        engine: "PREP",
        section: "COLD",
        forgev3: {
          wmm: [
            "Prosciutto/Salami/Pickles",
            "Warm Focaccia",
            "Method: Sliced 0.5mm order (THE SLICE LAW) → Arrange with height → Serve with warm bread"
          ],
          yield: "1 Portion",
          timeLaw: "3 min Build | Sliced to order | Warm bread finish",
          passSignals: ["Translucent/Thin protein folds", "Vertical height/air between layers", "Glassy oil sheen on meat"],
          rejectSignals: ["Thick/Chewy meat slabs", "Flat/Compacted density", "Oxidized grey meat edges"],
          failureLaw: "THE SLICE LAW breach; slicing >0.5mm prevents the salt/fat from melting instantly on the palate, fundamentally altering the perceived texture.",
          recoveryProtocol: "If thick: REJECT. Re-slice at 0.5mm calibration.",
          jemmaMapping: ["TEXTURE DEFICIT", "LIPID-PALATE FAILURE"],
          memoryTag: "0.5mm Micron-depth"
        },
        rootLayer: "Curated cold assembly.",
        controlLaw: "THE SLICE LAW — Meats must be sliced 0.5mm for palate melt.",
        ingredients: [
          "Prosciutto",
          "Salami",
          "Olives",
          "Pickles",
          "Warm Focaccia"
        ],
        method: [
          "Slice meats to order",
          "Arrange with height",
          "Top with olives/pickles",
          "Serve with warm bread"
        ],
        holding: "Slice to order",
        service: "Glossy room temp finish",
        timeLaw: "Build: 3 min",
        validationPoints: {
          postPrep: "Slicer calibrated",
          preService: "Bread warming",
          atPass: "Vertical height / Sheen"
        },
        failureLaw: "Thick cuts / Cold bread",
        autoReject: "Oxidised grey meat",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      }
    ] as any[]).map(doctrinePatch),
    operationalLayers: [
      {
        name: "GLOBAL CARD — STARTER STATION LAW (v2.5.2a)",
        subtitle: "Flash Heat & Ambient Control",
        sections: [
          {
            title: "1. THE FRY LAW",
            content: [
              "• RECOVERY TIME: Oil must hit 180°C before every batch. No exceptions.",
              "• MOISTURE: Calamari must be dry before dusting. Wet squid = soggy coating.",
              "• SALT: Season immediately. The first 5 seconds out of the oil determines taste."
            ]
          },
          {
            title: "2. THE TEMPERING LAW (COLD STATION)",
            content: [
              "• CHEESE TEMPERATURE: Burrata must never be served 'fridge cold'.",
              "• ROOM TEMP: 30 minutes minimum tempering for optimal stracciatella flow.",
              "• FRUIT CARE: Tomatoes kept at 18-20°C. Never refrigerated."
            ]
          }
        ]
      }
    ]
  },
  sides: {
    label: "SIDES ENGINE",
    icon: "🍟",
    color: "#6D5D6E",
    station: "Fry / Cold",
    tag: "SUPPORT",
    items: ([
      {
        id: "SIDE-001",
        name: "Triple Cooked Chips",
        engine: "AETHER",
        section: "CORE",
        forgev3: {
          wmm: [
            "Maris Piper potatoes: 5kg",
            "Salted water: 10L",
            "High-heat oil",
            "Method: Cut 15mm → Blanch till friable edges → Steam-dry (THE DRYING LAW) → 1st Fry 130°C → 2nd Fry 180°C to order"
          ],
          yield: "20 Portions",
          timeLaw: "8-10 min Blanch | 3-4 min Final Fry | Serves <60s from fryer",
          passSignals: ["Glass-like audible fracture", "Deep golden surface tension", "Internal steam release on break"],
          rejectSignals: ["Limp/Soggy structure", "Pale/White patches", "Oil-soaked oily residue"],
          failureLaw: "THE DRYING LAW breach; residual moisture in the starch network prevents the formation of the dehydrated 'glass' crust during the final fry.",
          recoveryProtocol: "If soft: Return to 190°C for 60s. If oily: REJECT.",
          jemmaMapping: ["STARCH DEHYDRATION FAILURE", "LIPID SATURATION"],
          memoryTag: "Surface friability / Moisture exit"
        },
        rootLayer: "Three-stage cooking process for crisp exterior + fluffy interior.",
        controlLaw: "THE DRYING LAW — Chips must be completely dry before final fry or they will not crisp.",
        ingredients: [
          "Maris Piper potatoes — 5kg",
          "Oil — for frying",
          "Salt — to finish"
        ],
        method: [
          "1. Cut 12–15mm chips",
          "2. Rinse → remove starch",
          "3. Blanch 130°C → soft centre",
          "4. Cool + dry fully",
          "5. Fry 180°C → golden + crisp"
        ],
        holding: "- Post-blanch: ambient (drying) | - Post-second fry: max 30–45 min hold",
        service: "- Final fry to order | - Season immediately",
        timeLaw: "Blanch: 8–10 min | Final fry: 3–4 min",
        validationPoints: {
          postPrep: "Uniform cut, fully dry",
          preService: "Blanched + staged",
          atPass: "Crisp exterior, fluffy centre"
        },
        failureLaw: "- Wet chips = failure | - Pale colour = rejection",
        autoReject: "Soft/limp chips",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "SIDE-002",
        name: "Parmesan & Truffle Fries",
        engine: "AETHER",
        section: "CORE",
        forgev3: {
          wmm: [
            "Skin-on fries: 200g",
            "Truffle oil: 5ml",
            "Grated parmesan: 15g",
            "Truffle salt/Chives: 3g",
            "Method: Fry 180°C → Drain 10s (THE GREASE LAW) → Toss with oil/salt → Top with cheese"
          ],
          yield: "1 Portion",
          timeLaw: "3.5 min Fry | 10s Mandatory Drain | 20s build",
          passSignals: ["Snow-like parmesan dusting (no clumps)", "Aggressive truffle aroma", "Steam-dry crispy fries"],
          rejectSignals: ["Clumped cheese-oil sludge", "Soft base fries", "Faint aroma"],
          failureLaw: "THE GREASE LAW breach; failure to drain surface oil causes the parmesan protein to melt and clump rather than sit as a fine powder.",
          recoveryProtocol: "If clumped: REJECT. Component is visually and structurally dead.",
          jemmaMapping: ["LIPID-PROTEIN CLUMPING", "THERMAL DEGRADATION"],
          memoryTag: "Drain duration accuracy"
        },
        rootLayer: "Skin-on fries with premium aromatic finishing system.",
        controlLaw: "THE GREASE LAW — Fries must be drained for 10s before tossing to prevent oil-soaked cheese clump.",
        ingredients: [
          "Skin-on fries — 200g",
          "Truffle oil — 5ml",
          "Grated parmesan — 15g",
          "Truffle salt — 2g",
          "Chives — 1g"
        ],
        method: [
          "1. Fry 180°C until crisp",
          "2. Drain 10s onto rack",
          "3. Toss in warm bowl with oil + salt",
          "4. Top with parmesan + chives"
        ],
        holding: "No holding — build to order",
        service: "Tall pile in warm bowl",
        timeLaw: "Fry: 3.5 min | Toss: 20 sec",
        validationPoints: {
          postPrep: "Fridge par lock",
          preService: "Finesse kit ready",
          atPass: "Aromatic, cheese uniform"
        },
        failureLaw: "- Sogginess = failure | - Cold center = rejection",
        autoReject: "Clumped cheese",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "SIDE-003",
        name: "House Slaw",
        engine: "PREP",
        section: "CORE",
        forgev3: {
          wmm: [
            "White cabbage/Carrot/Red onion: 1.4kg",
            "House mayo: 250g",
            "Lemon juice: 30ml",
            "Method: Ultra-fine slice → 30 min salt drain → Bind with mayo/acid → 4h rotation (THE OXIDATION LAW)"
          ],
          yield: "15 Portions",
          timeLaw: "15 min Prep | 30 min Drain | 4h shelf life dressed",
          passSignals: ["High-definition snap-crunch", "Zero liquid pooling in base", "Bright white/orange contrast"],
          rejectSignals: ["Limp/Grey vegetables", "Watery mayo suspension", "Oxidized onion bleed"],
          failureLaw: "THE OXIDATION LAW breach; enzyme activity in sliced brassicas causes rapid softening and color shift if held >4h dressed.",
          recoveryProtocol: "If watery: Drain briefly and add 5% fresh mayo. If grey: REJECT.",
          jemmaMapping: ["ENZYMATIC SOFTENING", "OSMOTIC COLLAPSE"],
          memoryTag: "Dressed rotation window"
        },
        rootLayer: "Acid-cut crunch system for rich proteins.",
        controlLaw: "THE OXIDATION LAW — Slaw must be prepped in 4h cycles to prevent cabbage discoloration.",
        ingredients: [
          "White cabbage — 1kg (shredded)",
          "Carrot — 300g (grated)",
          "Red onion — 100g (fine sliced)",
          "House mayo — 250g",
          "Lemon juice — 30ml"
        ],
        method: [
          "1. Slice veg ultra-fine",
          "2. Salt lightly → drain 30 min",
          "3. Bind with mayo/acid",
          "4. Chill until service"
        ],
        holding: "Max 4h once dressed",
        service: "Cold portion (ramakin/pile)",
        timeLaw: "Prep: 15 min | Drain: 30 min",
        validationPoints: {
          postPrep: "Fine cut uniform",
          preService: "Chilled core",
          atPass: "Snap-crunch present"
        },
        failureLaw: "- Watery base = failure | - Dull veg = rejected",
        autoReject: "Watery/limp slaw",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "SIDE-004",
        name: "Truffle Mayo (Dip)",
        engine: "PREP",
        section: "CORE",
        forgev3: {
          wmm: [
            "House mayo: 500g",
            "Truffle paste: 50g",
            "Truffle oil: 10ml",
            "Method: Gentle fold (THE STABILITY LAW) → Portion 30g → Lid/Label → Chill"
          ],
          yield: "18 Portions",
          timeLaw: "5 min Prep | 3 day shelf life",
          passSignals: ["Glossy grey-speckled emulsion", "Pungent truffle scent", "Zero oil separation"],
          rejectSignals: ["Oil bleed on surface", "Discolored top skin", "Faint scent"],
          failureLaw: "THE STABILITY LAW breach; over-working the mayo with high-speed whisking during the fold ruptures the emulsion-air matrix.",
          recoveryProtocol: "If split: REJECT. Emulsion cannot be safely rebound with added oils.",
          jemmaMapping: ["EMULSION RUPTURE", "LIPID BLEED"],
          memoryTag: "Fold intensity level"
        },
        rootLayer: "High-fat emulsion stabilizer system.",
        controlLaw: "THE STABILITY LAW — Mayonnaise must not split under heat exposure.",
        ingredients: [
          "Standard mayo — 500g",
          "Truffle paste — 50g",
          "White truffle oil — 10ml",
          "Lemon juice — 10ml"
        ],
        method: [
          "1. Fold ingredients gently",
          "2. Do not over-work oil",
          "3. Portion into 30g units",
          "4. Lid and label"
        ],
        holding: "Chilled — 3 days",
        service: "Cold dip ramakin",
        timeLaw: "Prep: 5 min",
        validationPoints: {
          postPrep: "Emulsion smooth",
          preService: "Chilled core (below 5°C)",
          atPass: "Glossy, aromatic"
        },
        failureLaw: "- Split oil = failure",
        autoReject: "Discolored top",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      }
    ] as any[]).map(doctrinePatch),
    operationalLayers: [
      {
        name: "GLOBAL CARD — SIDES & SUPPORT LAW (v2.5.2a)",
        subtitle: "Texture & Thermal Continuity",
        sections: [
          {
            title: "1. THE STARCH LAW",
            content: [
              "• CRISP vs SOGGY: Any side involving a fryer MUST be served in <60s of exit.",
              "• AIRFLOW: Never pile fries too high; they steam themselves and lose the snap.",
              "• SALT TIMING: Salt IMMEDIATELY. Once the oil surface sets, salt won't stick."
            ]
          },
          {
            title: "2. THE EMULSION LAW (MASH)",
            content: [
              "• STARCH ABUSE: Over-whipping mash releases starch chains, turning velvet into glue.",
              "• THERMAL HOLD: Mash must be held at 65-70°C. Below 60°C is a safety fail. Above 75°C is a texture fail."
            ]
          }
        ]
      }
    ]
  },
  prep: {
    label: "PREP ENGINE",
    icon: "🧬",
    color: "#4BA87D",
    station: "Prep Kitchen",
    tag: "SYSTEM",
    items: ([
      {
        id: "PREP-001",
        name: "FORGE Pizza Dough",
        engine: "PREP",
        section: "FOUNDATION",
        forgev3: {
          wmm: [
            "Flour (00): 3.1kg",
            "Water (20°C): 2.01kg",
            "Salt: 77g / Yeast: 3g",
            "Method: Water/Yeast → Flour → Salt → Mix to 23°C FDT (THE TEMPERATURE LAW) → 260g balls → 44h cold ferment"
          ],
          yield: "20 Balls",
          timeLaw: "23°C FDT target | 48h Total Ferment (44h cold/4h temper)",
          passSignals: ["23°C precision FDT", "Elastic recovery on stretch", "Uniform carbonation pockets"],
          rejectSignals: ["Overproof stickiness", "Sour/Vinegar aroma", "Dense center (underproof)"],
          failureLaw: "THE TEMPERATURE LAW breach; deviation from 23°C FDT results in uncontrolled enzyme activity—either thermal death or stagnant dormancy.",
          recoveryProtocol: "If cold: Temper at 25°C. If hot: REJECT.",
          jemmaMapping: ["THERMAL GRADIENT TRANSITION", "YEAST METABOLIC COLLAPSE"],
          memoryTag: "FDT 23.0 stability"
        },
        rootLayer: "48h cold-ferment high-hydration (65%) system.",
        controlLaw: "THE TEMPERATURE LAW — Target 23°C FDT to regulate yeast activity.",
        ingredients: [
          "Flour (00) — 3.1kg",
          "Water (20°C) — 2.01kg",
          "Salt — 77g",
          "Fresh Yeast — 3g"
        ],
        method: [
          "Water + yeast → dissolve",
          "Add flour → salt last",
          "Mix to 23°C FDT",
          "Scale 260g balls → 44h cold ferment"
        ],
        holding: "72h max chilled",
        service: "Temper 2-4h before stretching",
        timeLaw: "Total ferment: 48h",
        validationPoints: {
          postPrep: "23°C Final Dough Temp",
          preService: "Elastic stretch to 12\"",
          atPass: "Abundant air pockets"
        },
        failureLaw: "Overproof (sticky) / Underproof (tight)",
        autoReject: "Snap-back (underproof) / Sour smell",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-002",
        name: "Bone Reduction (Gravy Base)",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Beef/Veal bones: 10kg",
            "Mirepoix: 2kg / Red wine: 1L",
            "Method: Roast dark mahogany → Deglaze → Extract 85-90°C (THE LIPID LAW) for 16h → Continuous skimming → Reduce 50%"
          ],
          yield: "8L Reduction",
          timeLaw: "16h Extraction | Constant 85-90°C | No boil lock",
          passSignals: ["Deep mahogany clarity", "Stable gelatinous gel at 4°C", "Glossy nappe texture"],
          rejectSignals: ["Cloudy/Emulsified appearance", "Greasy top-layer residue", "Bitter scorched notes"],
          failureLaw: "THE LIPID LAW breach; boiling during extraction causes grease particles to incorporate into the water phase, creating a permanent cloudy emulsion.",
          recoveryProtocol: "If cloudy: REJECT. Component is visually fatally flawed.",
          jemmaMapping: ["LIPID EMULSIFICATION", "THERMAL TURBULENCE"],
          memoryTag: "85°C simmer limit"
        },
        rootLayer: "16h collagen extraction foundation.",
        controlLaw: "THE LIPID LAW — Continuous skimming + NO boiling (85-90°C) to prevent clouding.",
        ingredients: [
          "Beef/Veal bones — 10kg",
          "Mirepoix — 2kg",
          "Tomato paste — 200g",
          "Red wine — 1L",
          "Cold water — 20L"
        ],
        method: [
          "Roast bones/mirepoix (dark mahogany)",
          "Deglaze with wine → cover with water",
          "Extract 85-90°C for 16h with active skimming",
          "Strain → chill → remove fat cap → reduce 50%"
        ],
        holding: "7 days chilled / 3 months frozen",
        service: "Base for all jus/gravy",
        timeLaw: "Extraction: 16h",
        validationPoints: {
          postPrep: "Deep mahogany clarity",
          preService: "Stable gel at 4°C",
          atPass: "Glossy nappe finish"
        },
        failureLaw: "Cloudy appearance / Greasy mouthfeel",
        autoReject: "Boiled/Grey emulsion / Bitter burnt notes",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-003",
        name: "House Burger Sauce",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Mayo: 1kg / Ketchup: 300g",
            "American Mustard: 100g / Pickles: 100g",
            "Method: Whisk bases → Fold in texturals (THE BALANCE LAW) → Rest 2h for marriage"
          ],
          yield: "1.5kg yield",
          timeLaw: "10 min Prep | 2h Flavor maturation | 5 day shelf",
          passSignals: ["Uniform pink/orange hue", "Visible but integrated pickle suspension", "Sharp acid-sugar balance"],
          rejectSignals: ["Watery moisture separation", "Coarse/Large pickle chunks", "Dominant vinegar scent"],
          failureLaw: "THE BALANCE LAW breach; failure to finely dice texturals leads to uneven distribution and structural instability in the emulsion.",
          recoveryProtocol: "If split: Whisk in 5% fresh mayo. If unbalanced: Adjust mustard.",
          jemmaMapping: ["TEXTURE DISTRIBUTION ERROR", "EMULSION INSTABILITY"],
          memoryTag: "Acid-Fat PIERCE"
        },
        rootLayer: "Emulsified fat-acid-sugar system.",
        controlLaw: "THE BALANCE LAW — Acidity from pickles must pierce the mayonnaise fat cap.",
        ingredients: [
          "Mayonnaise — 1kg",
          "Ketchup — 300g",
          "American mustard — 100g",
          "Diced pickles — 100g",
          "Smoked paprika — 10g"
        ],
        method: [
          "Whisk mayo/ketchup/mustard",
          "Fold in diced items and spices",
          "Rest 2h for flavour marriage"
        ],
        holding: "5 days chilled",
        service: "30g per burger unit",
        timeLaw: "Prep: 10 min",
        validationPoints: {
          postPrep: "Pink/orange uniform hue",
          preService: "No moisture separation",
          atPass: "Uniform spread"
        },
        failureLaw: "Separation / Overly sweet",
        autoReject: "Split emulsion / Coarse pickle chunks",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-004",
        name: "Chipotle Lime Mayo",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Mayo: 1kg",
            "Chipotle in adobo: 150g (Blended)",
            "Lime: 50ml / Cumin: 5g",
            "Method: Blend chipotle paste (THE SMOKE LAW) → Whisk into mayo → Stabilize with fresh lime"
          ],
          yield: "1.2kg yield",
          timeLaw: "5 min Prep | 5 day shelf",
          passSignals: ["Opaque terracotta hue", "Consistent smokey heat (Tier 2)", "Sharp lime top-note"],
          rejectSignals: ["Grey/Muddied color", "Chipotle chunks (unblended)", "Flat acid profile"],
          failureLaw: "THE SMOKE LAW breach; failure to pre-blend chipotle in adobo creates hot-spots and prevents uniform integration into the fat matrix.",
          recoveryProtocol: "If chunky: Strain and re-blend. If flat: Increase lime 10%.",
          jemmaMapping: ["PARTICULATE TRANSITION", "ACID SUPPRESSION"],
          memoryTag: "Smokey heat-depth"
        },
        rootLayer: "High-heat smoke-acid emulsion.",
        controlLaw: "THE SMOKE LAW — Chipotle intensity must remain consistent (Tier 2 heat).",
        ingredients: [
          "Mayonnaise — 1kg",
          "Chipotle in adobo — 150g (blended)",
          "Lime juice (fresh) — 50ml",
          "Cumin — 5g"
        ],
        method: [
          "Blend chipotle to fine paste",
          "Whisk into mayo with lime",
          "Adjust seasoning with sea salt"
        ],
        holding: "5 days chilled",
        service: "Squeeze bottle or pot",
        timeLaw: "Prep: 5 min",
        validationPoints: {
          postPrep: "Smoky terracotta colour",
          preService: "Smooth, no chunks",
          atPass: "Sharp lime acid hit"
        },
        failureLaw: "Lack of heat / Flat acid profile",
        autoReject: "Grey colour / Split fat",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-005",
        name: "Kitchen Tartare Sauce",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Mayo: 1kg / Capers: 150g / Cornichons: 150g",
            "Method: Squeeze pickles/capers till DRY (THE DRAIN LAW) → Fold into mayo → Finish with fresh dill/zest"
          ],
          yield: "1.4kg yield",
          timeLaw: "15 min Prep | 3 day shelf life",
          passSignals: ["Thick/Scoopable structural mount", "High-definition herb green flecks", "Instant pickle-acid pop"],
          rejectSignals: ["Watery thinning after 1h", "Oxidized brown herbs", "Limp pickle texture"],
          failureLaw: "THE DRAIN LAW breach; residual brine in the capers/cornichons undergoes osmotic transition into the mayo, breaking the emulsion's viscosity.",
          recoveryProtocol: "If watery: REJECT. (Moisture is already bound to fat).",
          jemmaMapping: ["OSMOTIC THINNING", "EMULSION RUPTURE"],
          memoryTag: "Brine extraction prior to fold"
        },
        rootLayer: "Textured herb-acid suspension.",
        controlLaw: "THE DRAIN LAW — Capers and cornichons must be dry-squeezed to prevent sauce thinning.",
        ingredients: [
          "Mayonnaise — 1kg",
          "Capers (chopped) — 150g",
          "Cornichons (chopped) — 150g",
          "Shallots (fine) — 50g",
          "Fresh dill/parsley — 50g"
        ],
        method: [
          "Squeeze capers/pickles in cloth",
          "Fold all items into mayo",
          "Finish with lemon zest"
        ],
        holding: "3 days chilled",
        service: "Cold dip or burger base",
        timeLaw: "Prep: 15 min",
        validationPoints: {
          postPrep: "Thick, scoopable texture",
          preService: "Fresh herb aroma",
          atPass: "Bright green flecks"
        },
        failureLaw: "Watery consistency / Metallic caper note",
        autoReject: "Liquid separation / Brown herbs",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-006",
        name: "Master Slaw Dressing",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Cider vinegar: 500ml / Sugar: 200g",
            "Mayo (optional): 500g / Spices",
            "Method: Dissolve sugar in vinegar (THE SALT LAW) → Whisk in mayo/spices → Emulsify smooth"
          ],
          yield: "1.2L yield",
          timeLaw: "5 min Prep | 10 day shelf life | Room temp stable",
          passSignals: ["High-acid punch profile", "Ultra-smooth emulsion sheen", "Clear spice suspension"],
          rejectSignals: ["Grainy sugar crystals at base", "Dull/flat profile", "Fermenting odor"],
          failureLaw: "THE SALT LAW breach; applying dressing to cabbage >30 min before service causes osmotic collapse and liquid pooling.",
          recoveryProtocol: "If split: Vigorous whisking. If crystalline: Warm to 30°C to dissolve.",
          jemmaMapping: ["SOLUTE SATURATION ERROR", "OSMOTIC DISRUPTION"],
          memoryTag: "Sugar dissolution target"
        },
        rootLayer: "Acid-heavy seasoning matrix.",
        controlLaw: "THE SALT LAW — Apply dressing at pass only to prevent cabbage osmotic collapse.",
        ingredients: [
          "Cider vinegar — 500ml",
          "Sugar — 200g",
          "Celery salt — 20g",
          "Mayonnaise (optional) — 500g",
          "Black pepper — 10g"
        ],
        method: [
          "Dissolve sugar in vinegar",
          "Whisk in spices and mayo",
          "Emulsify until smooth"
        ],
        holding: "10 days chilled",
        service: "Toss with fresh slaw base (1:5 ratio)",
        timeLaw: "Prep: 5 min",
        validationPoints: {
          postPrep: "High acid punch",
          preService: "Chilled storage",
          atPass: "Crunch preserved"
        },
        failureLaw: "Soggy veg / Under-seasoned",
        autoReject: "Fermenting base / Grainy sugar",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-007",
        name: "Minted Pea Purée",
        engine: "PREP",
        section: "SIDES",
        forgev3: {
          wmm: [
            "Frozen petit pois: 2kg / Butter: 200g / Fresh mint: 50g",
            "Method: Blanch 2 min (THE VIBRANCY LAW) → Ice quench → Blend with butter/mint → Fine pass (Chinois)"
          ],
          yield: "2.2kg yield",
          timeLaw: "2 min Blanch | Immediate Ice Quench | 24h shelf life",
          passSignals: ["Neon green chlorophyll saturation", "Silk-smooth textural flow", "Instant clean mint aroma"],
          rejectSignals: ["Dull grey/olive hue (oxidation)", "Grainy/Skin-filled texture", "Weak/muddied flavor profile"],
          failureLaw: "THE VIBRANCY LAW breach; failure to quench immediately in ice water allows residual heat to continue cooking chlorophyll, triggering the enzymatic transition to pheophytin (grey).",
          recoveryProtocol: "If grey: REJECT. Color loss is chemically irreversible.",
          jemmaMapping: ["CHLOROPHYLL DEGRADATION", "THERMAL OVER-EXTRACTION"],
          memoryTag: "Ice-shock precision"
        },
        rootLayer: "Vibrant chlorophyll-dense starch system.",
        controlLaw: "THE VIBRANCY LAW — Ice bath quench mandatory to lock green colour.",
        ingredients: [
          "Frozen petit pois — 2kg",
          "Butter — 200g",
          "Fresh mint — 50g",
          "Sea salt — 15g"
        ],
        method: [
          "Blanch peas 2 min in salted water",
          "Quench in ice water → drain",
          "Blend with butter/mint until silk",
          "Pass through fine chinois"
        ],
        holding: "24h chilled (reheat to 65°C)",
        service: "Ladle or quenelle",
        timeLaw: "Prep: 10 min",
        validationPoints: {
          postPrep: "Neon green hue",
          preService: "Silk-smooth texture",
          atPass: "Clean mint aroma"
        },
        failureLaw: "Grey colour / Grainy skin",
        autoReject: "Oxidized (brown) / Cold centre",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-008",
        name: "Praline Crunch (Texture Lock)",
        engine: "PREP",
        section: "DESSERT",
        forgev3: {
          wmm: [
            "Sugar: 1kg / Hazelnuts: 500g",
            "Method: Dry caramelise to dark amber → Nuts in → Pour onto silicone → Cool → Break into 10g shards (THE MOISTURE LAW)"
          ],
          yield: "1.4kg yield",
          timeLaw: "20 min Prep | Airtight store with silica | 48h use window",
          passSignals: ["Glass-like audible crack on break", "Deep amber clarity", "Zero surface stickiness"],
          rejectSignals: ["Sticky/Tacky surface (humidity gain)", "Soft bend (moisture ingress)", "Bitter burnt carbon notes"],
          failureLaw: "THE MOISTURE LAW breach; exposure to ambient humidity triggers sugar hygroscopy, dissolving the caramel surface into a sticky film.",
          recoveryProtocol: "If sticky: REJECT. Structural integrity is compromised.",
          jemmaMapping: ["HYGROSCOPIC COLLAPSE", "CARAMEL RECRYSTALLIZATION"],
          memoryTag: "Silica-controlled environment"
        },
        rootLayer: "High-density caramel-nut matrix.",
        controlLaw: "THE MOISTURE LAW — Store with silica in airtight container; humidity = structural failure.",
        ingredients: [
          "Caster sugar — 1kg",
          "Toasted hazelnuts — 500g",
          "Sea salt — 10g"
        ],
        method: [
          "Dry caramelise sugar to dark amber",
          "Stir in toasted nuts → pour onto silicone",
          "Cool → break into 10g shards"
        ],
        holding: "48h dry store",
        service: "Top on desserts (Texture Lock)",
        timeLaw: "Prep: 20 min",
        validationPoints: {
          postPrep: "Audible snap",
          preService: "Dry to touch",
          atPass: "Golden amber shards"
        },
        failureLaw: "Sticky surface / Soft bend",
        autoReject: "Burnt bitter notes / Moisture melt",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-009",
        name: "Pickled Red Onions (2mm)",
        engine: "PREP",
        section: "GARNISH",
        forgev3: {
          wmm: [
            "Red onions: 3kg / Red wine vinegar: 2L / Sugar: 500g",
            "Method: Razor slice 2mm (THE SLICE LAW) → Boil brine → Pour HOT over onions → 24h steep"
          ],
          yield: "4kg yield",
          timeLaw: "24h Steep | 2mm Precision Slice | 14 day shelf",
          passSignals: ["Electric neon-pink appearance", "Translucent cellular structure", "Crunch-snap oral response"],
          rejectSignals: ["Dull grey color depth", "Limp/Flaccid texture", "Spontaneous fermentation bubbles"],
          failureLaw: "THE SLICE LAW breach; slicing >2mm prevents rapid thermal and acidic penetration of the onion's fibrous cell walls before they oxidize.",
          recoveryProtocol: "If soft: REJECT. If dull: Refresh with 5% red wine vinegar.",
          jemmaMapping: ["CELLULAR SATURATION FAILURE", "OXIDATIVE DARKENING"],
          memoryTag: "2mm Razor precision"
        },
        rootLayer: "Acid-driven cellular breakdown system.",
        controlLaw: "THE SLICE LAW — 2mm razor cut required for rapid acid penetration.",
        ingredients: [
          "Red onions — 3kg",
          "Red wine vinegar — 2L",
          "Sugar — 500g",
          "Peppercorns/Star anise"
        ],
        method: [
          "Slice onions to 2mm",
          "Boil brine → pour hot over onions",
          "Steep 24h before service"
        ],
        holding: "14 days chilled",
        service: "Cold garnish",
        timeLaw: "Steep: 24h",
        validationPoints: {
          postPrep: "Neon pink liquid",
          preService: "Crunchy bite",
          atPass: "Translucent visual"
        },
        failureLaw: "Dull/Grey colour / Mushy texture",
        autoReject: "Brown edges / Lack of acid",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-010",
        name: "Garlic & Marrow Butter",
        engine: "PREP",
        section: "BUTTER",
        forgev3: {
          wmm: [
            "Butter: 1kg / Roasted Marrow: 1kg",
            "Garlic/Parsley",
            "Method: Roast marrow → Cool to 20°C (THE EMULSION LAW) → Whip butter → Fold → Set in 10g discs"
          ],
          yield: "2kg yield",
          timeLaw: "30 min Prep | 20°C Target for fold | 7 day shelf",
          passSignals: ["Pale gold aerated body", "Uniform garden-green herb flecks", "Zero lipid bleed at 20°C"],
          rejectSignals: ["Visible oil separation (split)", "Cold marrow lumps", "Raw garlic bitterness"],
          failureLaw: "THE EMULSION LAW breach; folding marrow above its 20°C lipid-rupture point causes the whipped butter structure to melt into a heavy, oily pool.",
          recoveryProtocol: "If split: REJECT. If chunky: Warm slightly and re-fold. (Risk: Splitting).",
          jemmaMapping: ["LIPID STRUCTURAL COLLAPSE", "EMULSION RUPTURE"],
          memoryTag: "Marrow cooling target"
        },
        rootLayer: "Aerated dairy-animal fat emulsion.",
        controlLaw: "THE EMULSION LAW — Marrow must be cooled to 20°C before whipping to prevent fat split.",
        ingredients: [
          "Unsalted butter — 1kg",
          "Roasted bone marrow — 1kg",
          "Garlic (microplane) — 50g",
          "Parsley (fine) — 100g"
        ],
        method: [
          "Roast marrow → cool to 20°C",
          "Whip butter to double volume",
          "Fold in marrow/garlic/parsley",
          "Set in 10g disc moulds"
        ],
        holding: "7 days chilled",
        service: "Finish on steak/burger",
        timeLaw: "Prep: 30 min",
        validationPoints: {
          postPrep: "Pale gold aerated body",
          preService: "Uniform parsley fleck",
          atPass: "Melts on hot protein"
        },
        failureLaw: "Grease separation / Raw garlic burn",
        autoReject: "Rancid marrow scent / Split fat",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-011",
        name: "Chili-Lime Sugar",
        engine: "PREP",
        section: "GARNISH",
        forgev3: {
          wmm: [
            "Sugar: 1kg / Chilli flakes: 20g / Lime zest: 10 units",
            "Method: Dehydrate zest at 60°C (THE MOISTURE LAW) → Blitz with aromatics → Sift to fine grain"
          ],
          yield: "1.1kg yield",
          timeLaw: "4h Dehydration | 15 min Prep | 30 day shelf with silica",
          passSignals: ["Free-flowing fine granular texture", "Electric lime-oil scent", "Visible uniform chilli flecks"],
          rejectSignals: ["Lumpy/Clumping sugar", "Faded aroma (volatile loss)", "Gritty/Uneven particle size"],
          failureLaw: "THE MOISTURE LAW breach; residual moisture in the lime zest triggers local sugar dissolution, causing hard clumps and promoting microbial growth.",
          recoveryProtocol: "If clumped: Re-dehydrate at 50°C and sifter again. If dull: REJECT.",
          jemmaMapping: ["HYGROSCOPIC CLUMPING", "VOLATILE LOSS"],
          memoryTag: "Zest dehydration lock"
        },
        rootLayer: "Sugar-capsaicin-citrus matrix.",
        controlLaw: "THE MOISTURE LAW — Dehydrate zest fully to prevent clumping.",
        ingredients: [
          "Caster sugar — 1kg",
          "Chilli flakes — 20g",
          "Lime zest — from 10 limes"
        ],
        method: [
          "Dehydrate zest 4h at 60°C",
          "Blitz with sugar/chilli",
          "Sift to fine grain"
        ],
        holding: "30 days dry store (with silica)",
        service: "Rim glass / top dessert",
        timeLaw: "Prep: 15 min",
        validationPoints: {
          postPrep: "Fine, free-flowing grain",
          preService: "Aromatic lime scent",
          atPass: "Visible chilli flecks"
        },
        failureLaw: "Clumping / Gritty texture",
        autoReject: "Burnt sugar notes / Lack of lime",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-012",
        name: "Fermented Garlic Honey",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Raw Honey: 2kg / Garlic: 500g / ACV: 50ml",
            "Method: Crush garlic (release allicin) → Submerge in honey (THE PHYLLIS LAW) → Burp daily 14 days → Target pH 4.2"
          ],
          yield: "2.4kg yield",
          timeLaw: "14 day Fermentation | pH < 4.6 mandatory | 6 month shelf",
          passSignals: ["Runny/low-viscosity honey matrix", "Translucent garlic cloves", "Complex mellow umami-sweetness"],
          rejectSignals: ["Gas activity post-14 days", "pH > 4.6 (SAFETY FAIL)", "Opaque garlic (insufficient cure)"],
          failureLaw: "THE PHYLLIS LAW breach; failure to maintain pH below 4.6 in an anaerobic environment allows Clostridium botulinum growth.",
          recoveryProtocol: "If pH 4.7+: Add 10ml Apple Cider Vinegar increments and re-test. If foaming persists: REJECT.",
          jemmaMapping: ["pH-CONTROLLED FERMENTATION", "BOTULINUM GUARD"],
          memoryTag: "pH 4.2 Security lock"
        },
        rootLayer: "Enzymatic glucose-allicin breakdown.",
        controlLaw: "THE PHYLLIS LAW — pH must be <4.6 (Add ACV if needed to prevent botulism).",
        ingredients: [
          "Honey (raw) — 2kg",
          "Garlic (peeled/crushed) — 500g",
          "Apple cider vinegar — 50ml"
        ],
        method: [
          "Crush garlic lightly to release allicin",
          "Submerge in honey in sterilized jar",
          "Burp daily for 14 days",
          "Test pH (target 4.2)"
        ],
        holding: "6 months dark store",
        service: "Drizzle on pizza/cheese",
        timeLaw: "Ferment: 14 days",
        validationPoints: {
          postPrep: "Runny consistency",
          preService: "Garlic cloves translucent",
          atPass: "Mellow garlic sweetness"
        },
        failureLaw: "pH > 4.6 / Cloudy honey",
        autoReject: "Black mould / Rancid odor",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-013",
        name: "Truffle Honey (Ratio Lock)",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Honey: 1kg / Black truffle paste: 20g / Truffle oil: 10ml",
            "Method: Warm honey to 30°C (THE RATIO LAW) → Whisk in paste/oil until suspended → Cool/Bottle"
          ],
          yield: "1.03kg yield",
          timeLaw: "10 min Prep | 30°C Thermal limit | 3 month shelf stable",
          passSignals: ["Stable suspension (no oil slick)", "Intense/Pungent aroma punch", "Thick slow-drip viscosity"],
          rejectSignals: ["Artificial chemical scent dominance", "Visible oil pooling on top", "Grey/muddied color saturation"],
          failureLaw: "THE RATIO LAW breach; failure to maintain ≥1% paste particulate density prevents valid volatile capture, leading to rapid aroma decay.",
          recoveryProtocol: "If split: Warm to 25°C and vigorous manual whisk. If scentless: Add 5g paste.",
          jemmaMapping: ["VOLATILE LOSS", "SUSPENSION COLLAPSE"],
          memoryTag: "30°C Volatile lock"
        },
        rootLayer: "High-viscosity volatile capture.",
        controlLaw: "THE RATIO LAW — 1% Truffle paste minimum for structural integrity.",
        ingredients: [
          "Honey — 1kg",
          "Black truffle paste — 20g",
          "Truffle oil (natural) — 10ml"
        ],
        method: [
          "Warm honey to 30°C (Do not exceed)",
          "Whisk in paste and oil",
          "Cool and bottle"
        ],
        holding: "3 months shelf stable",
        service: "5g drizzle per unit",
        timeLaw: "Prep: 10 min",
        validationPoints: {
          postPrep: "Uniform dark flecks",
          preService: "Intense aroma",
          atPass: "Slow, thick pour"
        },
        failureLaw: "Separation / Weak aroma",
        autoReject: "Burnt honey / Rancid oil scent",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-014",
        name: "Smoked Bone Marrow Jus",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Bone Reduction (PREP-002): 2L / Roasted marrow: 200g",
            "Method: Reduce base to 500ml syrup (THE GLOSS LAW) → Whisk in marrow/smoke-salt → Monté au beurre (cold butter) → Fine pass"
          ],
          yield: "650ml yield",
          timeLaw: "2h Prep | 60°C Integration target | 3 day shelf life",
          passSignals: ["High-mirror reflective surface", "Zero visible lipid droplets", "Nappe (structural spoon coating)"],
          rejectSignals: ["Oil slick (split emulsion)", "Grainy/Lumpy marrow particles", "Salt-dominant flat profile"],
          failureLaw: "THE GLOSS LAW breach; failure to achieve specific gravity (syrup phase) before marrow enrichment leads to lipid incompatibility and split.",
          recoveryProtocol: "If split: High-RPM blend for 30s off-heat. If too thin: Further reduction.",
          jemmaMapping: ["LIPID REJECTION", "REDUCTION TRANSITION"],
          memoryTag: "Maillard-fat mirror"
        },
        rootLayer: "Fat-fortified reduction system.",
        controlLaw: "THE GLOSS LAW — Emulsify marrow at 60°C to secure the shine.",
        ingredients: [
          "Bone Reduction (PREP-002) — 2L",
          "Roasted bone marrow — 200g",
          "Smoked salt — 5g",
          "Cold butter — 50g"
        ],
        method: [
          "Reduce bone base to syrup (500ml)",
          "Whisk in marrow and smoked salt",
          "Monté au beurre (whisk in cold butter)",
          "Pass through fine chinois"
        ],
        holding: "3 days chilled",
        service: "Warm serve (65°C)",
        timeLaw: "Prep: 2h",
        validationPoints: {
          postPrep: "Reflective surface",
          preService: "No fat separation",
          atPass: "Coats spoon (Nappe)"
        },
        failureLaw: "Oil slick / Salty concentrate",
        autoReject: "Split emulsion / Grainy fat",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-015",
        name: "Habanero Pineapple Glaze",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Pineapple juice: 2L / Habanero: 50g / Honey: 200g",
            "Method: Reduce juice/chilli by 75% (THE HEAT LAW) → Blitz smooth → Add honey/lime → Viscosity check (slow drip)"
          ],
          yield: "600ml yield",
          timeLaw: "45 min Prep | 75% reduction target | 10 day shelf life",
          passSignals: ["Electric translucent orange hue", "Immediate heat-citrus high note", "Syrupy adhesive consistency"],
          rejectSignals: ["Bitter/Chlorophyll skin notes", "Watery/loose consistency", "Burnt sugar acrid scent"],
          failureLaw: "THE HEAT LAW breach; failure to sufficiently reduce the juice volume results in an imbalance where capsaicin overwhelms the fructose structure.",
          recoveryProtocol: "If thin: Simmer on low heat with 10g honey. If too hot: Dilute with 10% pineapple juice.",
          jemmaMapping: ["CAPSAICIN OVER-DOMINANCE", "REDUCTION TRANSITION"],
          memoryTag: "Sugar-heat equilibrium"
        },
        rootLayer: "Sugar-capsaicin-enzyme matrix.",
        controlLaw: "THE HEAT LAW — Scoville heat must be balanced by fruit sugar density.",
        ingredients: [
          "Pineapple juice — 2L",
          "Habanero (deseeded) — 50g",
          "Honey — 200g",
          "Lime juice — 100ml"
        ],
        method: [
          "Reduce juice and habanero by 75%",
          "Blitz until perfectly smooth",
          "Add honey and lime",
          "Check viscosity (Target: slow drip)"
        ],
        holding: "10 days chilled",
        service: "Wings / Pork glaze",
        timeLaw: "Prep: 45 min",
        validationPoints: {
          postPrep: "Electric orange hue",
          preService: "Syrupy consistency",
          atPass: "Immediate heat + fruit"
        },
        failureLaw: "Too thin / Bitter habanero skin",
        autoReject: "Burnt sugar smell / Overbearing heat",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-031",
        name: "Mascarpone Cream",
        engine: "PREP",
        section: "PASTRY",
        forgev3: {
          wmm: [
            "Mascarpone: 750g / Icing sugar: 150g / Cream: 100ml / Lemon",
            "Method: Whisk mascarpone/sugar until aerated → Stream in cream (THE MECHANICAL LAW) → STOP at stiff peak → Fold zest"
          ],
          yield: "1kg yield",
          timeLaw: "5 min prep | <5°C working temp | STOP before graining",
          passSignals: ["Stable pillowy peak", "Silk-gloss surface", "Bright citrus fragrance"],
          rejectSignals: ["Grainy/Coagulated texture (overwork)", "Loose/Runny consistency", "Butter-fleck (lipid rupture)"],
          failureLaw: "THE MECHANICAL LAW breach; induction of mechanical friction heat during over-whisking causes the fat globules to collide and form butter grains, destroying the emulsion.",
          recoveryProtocol: "If loose: Add 50g cold mascarpone and fold. If grainy: REJECT.",
          jemmaMapping: ["MECHANICAL THERMAL BREACH", "LIPID AGGLOMERATION"],
          memoryTag: "Friction-heat stop-point"
        },
        rootLayer: "Fat-stabilised dairy emulsion.",
        controlLaw: "THE MECHANICAL LAW — Do not over-whip; mechanical heat will break the emulsion.",
        ingredients: [
          "Mascarpone — 750g",
          "Icing sugar — 150g",
          "Double cream — 100ml",
          "Lemon zest — from 1 lemon"
        ],
        method: [
          "Whisk mascarpone and sugar until smooth",
          "Fold in cream and zest cautiously until combined"
        ],
        holding: "48h chilled",
        service: "Center of dessert / piped",
        timeLaw: "Prep: 10 min",
        validationPoints: {
          postPrep: "Smooth, thick consistency",
          preService: "No moisture bleed",
          atPass: "Ivory gloss"
        },
        failureLaw: "Graining / Melting",
        autoReject: "Split fat / Yellowing",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-032",
        name: "Sticky Toffee Sauce",
        engine: "LUNA-002",
        section: "PASTRY",
        forgev3: {
          wmm: [
            "Butter: 1kg",
            "Dark brown sugar: 1kg",
            "Double cream: 1L",
            "Method: Melt butter/sugar → Boil to 104°C exactly (THE THERMAL LAW) → Deglaze with cream → Whisk glossy"
          ],
          yield: "3L Batch",
          timeLaw: "15 min cook | Critical window: 104°C target",
          passSignals: ["Glossy deep amber finish", "Absolute smooth nappe (no crystallization)", "Rich caramel scent"],
          rejectSignals: ["Grainy texture (under-temp)", "Visible fat separation", "Burnt sugar smell"],
          failureLaw: "Failure to reach 104°C prevents full sugar-fat integration. Over 106°C leads to bitter caramelization.",
          recoveryProtocol: "If grainy: Reheat to 104°C and add 5% warm cream. If burnt: REJECT.",
          jemmaMapping: ["THERMAL TRANSITION", "EMULSION FAILURE"],
          memoryTag: "Crystallization point / Thermal accuracy"
        },
        rootLayer: "Butter-sugar-emulsion matrix.",
        controlLaw: "THE THERMAL LAW — Sauce must hit 104°C before deglazing with cream.",
        ingredients: [
          "Butter — 1kg",
          "Dark brown sugar — 1kg",
          "Double cream — 1L"
        ],
        method: [
          "Melt butter and sugar → boil to 104°C",
          "Deglaze with cream and whisk until glossy"
        ],
        holding: "10 days chilled",
        service: "Warm drizzle (60°C)",
        timeLaw: "Cook: 15 min",
        validationPoints: {
          postPrep: "Glossy deep amber",
          preService: "No sugar crystals",
          atPass: "Nappe (coats spoon)"
        },
        failureLaw: "Split fat / Grainy texture",
        autoReject: "Burnt sugar smell / Visible fat cap",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-016",
        name: "Crumble Mix",
        engine: "HELIOS",
        section: "STRUCTURAL",
        forgev3: {
          wmm: [
            "Flour: 2kg",
            "Butter (0-4°C): 1.5kg",
            "Sugar: 1kg",
            "Oats: 500g",
            "Method: Cube butter (1cm) → Pinch rub (fingertips) → STOP at rubble stage → Tray spread ≤2cm → Bake 170°C (22m)"
          ],
          yield: "5kg (50 portions)",
          timeLaw: "18–25 min Bake | Working window: <8°C internal temp",
          passSignals: ["Audible crunch on fracture", "Golden brown irregular clusters", "Dry feel (no grease bleed)"],
          rejectSignals: ["Uniform/Sand texture", "Oily/Greasy clusters", "Raw flour pockets"],
          failureLaw: "Friction heat during rubbing causes fat melt → leads to starch saturation and loss of cluster identity.",
          recoveryProtocol: "If fat melts: REJECT. Component is structurally compromised.",
          jemmaMapping: ["STRUCTURAL COLLAPSE", "THERMAL MELT (ENCAPSULATION BREACH)"],
          memoryTag: "Cluster size transition / Moisture bleed"
        },
        rootLayer: "Shortening / Contrast System (Dry-rub starch-fat).",
        controlLaw: "FAT ENCAPSULATION LAW — Fat must encapsulate flour particles without melting to inhibit gluten formation and preserve discrete clusters.",
        ingredients: [
          "2kg Flour",
          "1.5kg Butter (0-4°C)",
          "1kg Sugar",
          "500g Oats"
        ],
        method: [
          "1. Cut butter into 1cm cubes (0–4°C)",
          "2. Add butter to dry ingredients → pinch/rub using fingertips only",
          "3. STOP at “rubble” stage (pea → hazelnut clusters)",
          "4. DO NOT homogenise; preserve irregular clusters",
          "5. Tray spread ≤2cm; Bake 170°C for 18–25 min"
        ],
        holding: "5 days dry / 2 days baked",
        service: "100g scoop per portion; audible crunch finish",
        timeLaw: "18–25 min Bake (Stabilized)",
        validationPoints: {
          postPrep: "Texture: Rubble / irregular; No dust; Temp: ≤8°C",
          preService: "No moisture clumping; No butter bleed",
          atPass: "Crisp fracture; Audible crunch"
        },
        failureLaw: "Greasy/Oily (Fat melt) / Powder (Overworked) / Flour pockets",
        autoReject: "Oily residue / Sand texture / Raw flour pockets",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["gluten", "dairy"],
        larousse: {
          principle: "The prevention of moisture bleed through anhydrous barrier creation.",
          method: [
            "Use chilled, 1cm cubed butter (0-4°C)",
            "Work with fingertips ONLY",
            "Maintain cold working temp <8°C"
          ],
          quality: ["Irregular clusters", "Dry feel", "Cold pre-bake"],
          faults: ["Smooth/uniform (overworked)", "Sticky (warming)", "Dense (compressed)"],
          correction: ["FORBIDDEN: Added butter to sandy mix (Technique Failure)"]
        },
        fellini: {
          identity: "Shortening / Contrast System",
          controlLaw: "FAT ENCAPSULATION LAW",
          pressurePoint: "THERMAL & FRICTION CONTROL",
          watchPoint: "The rubble.",
          passSignal: "Audible crunch."
        }
      },
      {
        id: "PREP-017",
        name: "House Mayo",
        engine: "PREP",
        section: "BASES",
        forgev3: {
          wmm: [
            "Egg yolks: 10 units",
            "Pomace oil: 4L",
            "Dijon mustard: 100g",
            "Lemon juice: 50ml",
            "Fine salt: 20g",
            "Method: Whisk yolks/mustard → Slow micro-stream oil (prevent yolk saturation) → Finish with acid → Season → Chill"
          ],
          yield: "5L (250 portions)",
          timeLaw: "10 min prep | Stability decrease >72h",
          passSignals: ["Glossy mount that holds shape", "Pale yellow uniformity", "Sharp, clean acidic finish"],
          rejectSignals: ["Visible oil droplets on surface", "Grainy/Curdled texture", "Separation at container edges"],
          failureLaw: "EMULSION LOCK failure via excessive oil delivery speed or thermal rise (>8°C during prep).",
          recoveryProtocol: "Take 100g fresh base (egg yolk/mustard) and slowly whisk in the split mix.",
          jemmaMapping: ["EMULSION LOCK FAILURE", "PURITY BREACH (SPLIT)"],
          memoryTag: "Oil delivery speed / Thermal stability"
        },
        rootLayer: "Lecithin-stabilised oil-in-water emulsion system.",
        controlLaw: "EMULSION LOCK LAW — Oil must be added in a micro-stream to prevent yolk saturation and breakage.",
        ingredients: [
          "Egg yolks (fresh/pasteurised)",
          "Pomace oil",
          "Dijon mustard",
          "Lemon juice",
          "Fine salt"
        ],
        method: [
          "1. Whisk yolks and mustard until pale",
          "2. Slowly emulsify oil into yolks in a thin stream",
          "3. Maintain thick consistency throughout",
          "4. Finish with lemon juice to set the bind",
          "5. Season and chill immediately"
        ],
        holding: "5 days chilled (4°C)",
        service: "20g squeeze or as base for variants",
        timeLaw: "Prep time: 10 min",
        validationPoints: {
          postPrep: "Stable glossy mount",
          preService: "Chilled ≤ 5°C",
          atPass: "Thick nappe consistency"
        },
        failureLaw: "Split emulsion / Oily surface / Too thin",
        autoReject: "Visible oil droplets / Curdled texture",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["eggs", "mustard"],
        larousse: {
          principle: "EMULSION LOCK v1: ROOT LAYER: Oil-in-water emulsion → stable fat-water suspension.",
          method: [
            "OIL LAW: Add oil in a thin stream. Do not rush.",
            "TEMPERATURE LAW: Keep all ingredients ≤ 5°C.",
            "RECOVERY LAW: If split, take fresh base and slowly incorporate split mix."
          ],
          quality: ["Rich mouthfeel", "Clean acidity", "Stable structure"],
          faults: ["Split / oily sheen", "Curdled appearance", "Raw egg taste"]
        }
      },
      {
        id: "PREP-018",
        name: "Chipotle Mayo",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "House mayo: 1000g",
            "Chipotle paste: 100g",
            "Lime juice: 20ml",
            "Method: Weigh out House Mayo base → Fold in chipotle paste gently (RATIO LOCK) → Add lime juice"
          ],
          yield: "1.1kg yield",
          timeLaw: "5 min prep",
          passSignals: ["Stable smoky emulsion", "Uniform brick-red color", "Holds peak"],
          rejectSignals: ["Oil-slicked surface", "Faded smoky aroma", "Separation"],
          failureLaw: "RATIO LOCK breach; aggressive folding causes emulsion collapse.",
          recoveryProtocol: "If split: whisk in 10% fresh mayo base.",
          jemmaMapping: ["EMULSION TRANSITION"],
          memoryTag: "Smoky aroma intensity"
        },
        rootLayer: "Capsaicin-lipid emulsion system.",
        controlLaw: "RATIO LOCK LAW — Chipotle paste must be folded (not whisked) to preserve the base emulsion stability.",
        ingredients: [
          "House mayo (1000g)",
          "Chipotle paste (100g)",
          "Lime juice (20ml)"
        ],
        method: [
          "1. Weigh out House Mayo base",
          "2. Fold in chipotle paste until uniform",
          "3. Add lime juice for acidity balance",
          "4. Chill to set"
        ],
        holding: "5 days chilled (4°C)",
        service: "30g ramekin; smoky finish",
        timeLaw: "Prep time: 5 min",
        validationPoints: {
          postPrep: "Stable smoky emulsion",
          preService: "Held at 4°C",
          atPass: "Glossy · smoky aroma · hold peak"
        },
        failureLaw: "Separation / Too spicy / Too thin",
        autoReject: "Oil-slicked surface / Faded smoky aroma",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["eggs", "mustard"]
      },
      {
        id: "PREP-019",
        name: "Sriracha Mayo",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "House mayo: 1000g",
            "Sriracha: 120g",
            "Lemon juice: 10ml",
            "Method: Combine mayo and sriracha → Whisk until uniform orange (COLOR LOCK) → Add lemon finish"
          ],
          yield: "1.1kg yield",
          timeLaw: "5 min prep",
          passSignals: ["Uniform orange glow", "Glossy peak", "Sharp kick"],
          rejectSignals: ["Visible oil bleed", "Streaks of sriracha", "Uneven mixing"],
          failureLaw: "COLOR LOCK breach; improper distribution of capsaicin-oil suspension.",
          recoveryProtocol: "Re-whisk until perfectly uniform color achieved.",
          jemmaMapping: ["COLOR TRANSITION"],
          memoryTag: "Heat uniformity"
        },
        rootLayer: "Chilli-oil fat suspension.",
        controlLaw: "COLOR LOCK LAW — Whisk until perfectly uniform orange; any streaks = improper distribution.",
        ingredients: [
          "House mayo (1000g)",
          "Sriracha (120g)",
          "Lemon juice (10ml)"
        ],
        method: [
          "1. Combine mayo and sriracha",
          "2. Whisk until uniform colour achieved",
          "3. Add lemon finish",
          "4. Store in squeeze bottles"
        ],
        holding: "5 days chilled (4°C)",
        service: "30g ramekin; uniform orange look",
        timeLaw: "Prep time: 5 min",
        validationPoints: {
          postPrep: "Uniform color verified",
          preService: "Glossy hold",
          atPass: "Sharp kick · glossy peak"
        },
        failureLaw: "Streaky color / Split base / Low heat",
        autoReject: "Visible oil bleed / Uneven mixing",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["eggs", "mustard"]
      },
      {
        id: "PREP-020",
        name: "Lemon Aioli",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "House mayo: 1000g",
            "Roasted garlic (mash): 50g",
            "Lemon zest: 2 units",
            "Black pepper: To taste",
            "Method: Mash garlic to smooth paste (SEQUENCE LAW) → Fold paste into mayo base gently → Add zest/pepper"
          ],
          yield: "1.1kg yield",
          timeLaw: "10 min prep",
          passSignals: ["Smooth garlic integration", "Bright citrus scent", "Creamy finish"],
          rejectSignals: ["Grey tint (oxidation)", "Visible oil droplets", "Bitter zest"],
          failureLaw: "SEQUENCE LAW breach; adding un-mashed garlic causes structural pockets and fat-bleed.",
          recoveryProtocol: "If grainy: pass through fine sieve. If grey: REJECT (oxidation).",
          jemmaMapping: ["OXIDATION EVENT", "STRUCTURAL TRANSITION"],
          memoryTag: "Garlic roast depth"
        },
        rootLayer: "Aromatic fat-suspension emulsion.",
        controlLaw: "SEQUENCE LAW — Garlic must be mashed to paste before folding to prevent structural pockets of fat-bleed.",
        ingredients: [
          "House mayo (1000g)",
          "Roasted garlic (50g)",
          "Lemon zest (2 units)",
          "Black pepper"
        ],
        method: [
          "1. Mash roasted garlic until perfectly smooth paste",
          "2. Fold garlic paste into mayo base gently",
          "3. Add lemon zest and cracked black pepper",
          "4. Chill to allow aromatics to infuse"
        ],
        holding: "3 days chilled (4°C)",
        service: "30g ramekin; punchy garlic finish",
        timeLaw: "Prep time: 10 min",
        validationPoints: {
          postPrep: "Smooth garlic integration",
          preService: "Aromatic citrus scent",
          atPass: "Creamy · punchy garlic · citrus finish"
        },
        failureLaw: "Garlic oxidation (grey) / Zest bitterness / Separation",
        autoReject: "Grey tint (oxidation) / Visible oil droplets",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["eggs", "mustard"],
        larousse: {
          principle: "EMULSION LOCK v1: Stable oil-in-water suspension. Garlic adds aromatic depth without breaking bind.",
          method: [
            "Roast garlic until soft and cool completely before folding.",
            "SEQUENCE LAW: Fold gently to avoid oil bleed from roasted garlic fat.",
            "TEMPERATURE LAW: Keep chilled ≤ 5°C."
          ],
          quality: ["Smooth texture", "Sweet garlic notes", "Bright citrus"],
          faults: ["Grey appearance (oxidation)", "Oil dots on surface", "Bitter zest"]
        }
      },
      {
        id: "PREP-021",
        name: "Truffle Mayo",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "House mayo: 1000g",
            "Truffle oil: 20ml",
            "Truffle paste: 30g",
            "Method: Whisk truffle paste into mayo until uniform → Slowly fold in truffle oil (OIL LIMIT LAW) → Store airtight"
          ],
          yield: "1.05kg yield",
          timeLaw: "5 min prep",
          passSignals: ["Vertical glossy peak", "Strong truffle aroma", "Visible flecks"],
          rejectSignals: ["Oil slick on surface", "No aroma release", "Loss of peak"],
          failureLaw: "OIL LIMIT LAW breach; excessive truffle oil breaks the base emulsion bind.",
          recoveryProtocol: "Whisk in fresh mayo base in 100g increments until bind returns.",
          jemmaMapping: ["VOLATILE LOSS", "EMULSION FAILURE"],
          memoryTag: "Aroma retention time"
        },
        rootLayer: "Luxury volatile oil emulsion system.",
        controlLaw: "OIL LIMIT LAW — Truffle oil must not exceed 2% total mass to prevent emulsion breakage and palate fatigue.",
        ingredients: [
          "House mayo (1000g)",
          "Truffle oil (20ml)",
          "Truffle paste (30g)"
        ],
        method: [
          "1. Whisk truffle paste into mayo base until uniform",
          "2. Slowly fold in truffle oil to preserve the bind",
          "3. Chill in airtight container to trap volatiles"
        ],
        holding: "5 days chilled (4°C)",
        service: "30g ramekin; vertical glossy peak",
        timeLaw: "Prep time: 5 min",
        validationPoints: {
          postPrep: "Earthy aroma check",
          preService: "Visible truffle flecks",
          atPass: "Glossy · strong truffle aroma · earthy finish"
        },
        failureLaw: "Aroma loss / Oil separation / Artificial scent",
        autoReject: "Oil slick on surface / No aroma release",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["eggs", "mustard"],
        larousse: {
          principle: "EMULSION LOCK v1: Truffle oils are highly volatile and sensitive to heat.",
          method: [
            "Maintain emulsion bind despite high external fat addition.",
            "TEMPERATURE LAW: Hold ≤ 5°C to preserve aroma and bind.",
            "SERVICE LAW: Keep airtight until service."
          ],
          quality: ["Earthy aroma", "Rich texture", "Uniform colour"],
          faults: ["Artificial smell", "Oil slick on surface", "No aroma"]
        }
      },
      {
        id: "PREP-022",
        name: "Bone Reduction (Batch)",
        engine: "LUNA-001",
        section: "BASES",
        forgev3: {
          wmm: [
            "Beef bones (roasted): 10kg",
            "Mirepoix: 2kg",
            "Tomato paste: 200g",
            "Red wine: 1L",
            "Water: To cover",
            "Method: Roast bones (220°C) → Caramelise mirepoix/tomato paste → Deglaze wine (syrup) → Simmer 12-24h (92°C) → Strain → Reduce 50%"
          ],
          yield: "10L Batch",
          timeLaw: "12-24h Simmer | Failure threshold: >26h (bitterness extraction)",
          passSignals: ["Stable gelatinous body when cold", "Deep mahogany/translucent clarity", "Rich roasted aroma"],
          rejectSignals: ["Cloudy/greasy appearance", "Bitter or burnt notes", "Watery consistency at 4°C"],
          failureLaw: "Temperature >94°C (boiling) causes fat emulsification and permanent clouding.",
          recoveryProtocol: "If watery: further reduce. If cloudy: attempt secondary clarification. If bitter: REJECT.",
          jemmaMapping: ["REDUCTION TRANSITION", "EXTRACTION FAILURE (OVER-TEMP)"],
          memoryTag: "Gelatin density / Bitterness threshold"
        },
        rootLayer: "Collagen extraction + Maillard concentration system.",
        controlLaw: "LOW SIMMER LAW — Temperature must not exceed 92°C; boiling causes fat emulsification and permanent cloudiness.",
        ingredients: [
          "Beef bones (roasted)",
          "Mirepoix",
          "Tomato paste",
          "Red wine",
          "Water"
        ],
        method: [
          "1. Roast bones at 220°C until deep mahogany",
          "2. Caramelise mirepoix and tomato paste",
          "3. Deglaze with red wine; reduce to syrup",
          "4. Add bones and water; simmer 12-24h at 90°C",
          "5. Strain through fine chinois; reduce by 50%"
        ],
        holding: "5 days chilled / 30 days frozen",
        service: "Base for all luxury sauces",
        timeLaw: "Simmer: 12-24h / Reduce: 4h",
        validationPoints: {
          postPrep: "Viscous body when cold",
          preService: "Deep mahogany colour",
          atPass: "Rich aroma · translucent clarity"
        },
        failureLaw: "Thin/watery body / Bitter notes / Cloudy finish",
        autoReject: "Burnt/bitter notes / Greasy emulsion",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["none"],
        larousse: {
          principle: "ROOT LAYER: Collagen extraction and deep flavour concentration for sauce architecture.",
          method: [
            "Roast bones at 220°C until dark but not black.",
            "Do not boil aggressively; high heat causes fat emulsification.",
            "Strain through a fine chinoise/muslin."
          ],
          quality: ["Deep colour", "Rich aroma", "Gelatinous body when chilled"],
          faults: ["Thin, watery body", "Bitter or burnt notes"]
        }
      },
      {
        id: "PREP-023",
        name: "Galyons Gravy (Finish)",
        engine: "LUNA-003",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Bone Reduction (Base): 4L",
            "Roux (Butter/Flour): 400g",
            "Pan drippings: 200ml",
            "Salt/Pepper: To taste",
            "Method: Boil reduction → Whisk in roux → Reduce to simmer → Add pan drippings → Reduce to nappe → Butter whisk finish"
          ],
          yield: "5L Batch",
          timeLaw: "30 min finish | Must hold at 75°C+",
          passSignals: ["Deep mahogany mirror gloss", "Stable nappe (coats spoon)", "Intense savory umami profile"],
          rejectSignals: ["Skin formation", "Visible fat split (greasy)", "Floury/Raw starch aftertaste"],
          failureLaw: "Under-cooking roux or failing to whisk during incorporation leads to starch clumping.",
          recoveryProtocol: "If lumpy: pass through fine sieve. If greasy: blend at high RPM.",
          jemmaMapping: ["STARCH CLUMPING", "REDUCTION TRANSITION"],
          memoryTag: "Gloss stability / Salt concentration"
        },
        rootLayer: "Starch-thickened reduction liquid system.",
        controlLaw: "GRAVY LAW — Always hot (75°C+), always glossy, and nappe consistency; added at the absolute pass to maintain heat.",
        ingredients: [
          "Bone Reduction (Base)",
          "Roux (Butter/Flour)",
          "Pan drippings",
          "Maldon salt",
          "Black pepper"
        ],
        method: [
          "1. Bring Bone Reduction base to a rolling simmer",
          "2. Slowly whisk in roux to avoid lump formation",
          "3. Incorporate pan drippings for deep animal-fat complexity",
          "4. Reduce until nappe consistency (coats back of spoon)",
          "5. Finish with butter whisk for high-gloss surface"
        ],
        holding: "3 days chilled / 4h held hot (75°C)",
        service: "50ml ladle; glossy mirror finish",
        timeLaw: "Simmer/Reduce: 30 min",
        validationPoints: {
          postPrep: "Lump-free texture",
          preService: "Glossy surface (no fat split)",
          atPass: "Stable nappe · deep mahogany gloss"
        },
        failureLaw: "Lumps / Greasy surface split / Over-thickened (clumping)",
        autoReject: "Skin formation / visible fat separation / Burnt base notes",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["gluten", "dairy"],
        larousse: {
          principle: "ROOT LAYER: Stable, glossy, service-ready sauce built from reduction and controlled thickening.",
          method: [
            "REDUCTION LAW: Never reduce aggressively.",
            "RECOVERY LAW: If fat separation occurs, blend aggressively.",
            "Do not over-thicken; gravy must pour, not clump."
          ],
          quality: ["Stable hold", "Glossy finish", "Coats back of spoon"],
          faults: ["Greasy surface", "Lumps or gluey texture", "Skin formation"]
        }
      },
      {
        id: "PREP-024",
        name: "Pulled Pork",
        engine: "HELIOS",
        section: "PROTEIN",
        forgev3: {
          wmm: [
            "Pork shoulder (boneless): 10kg",
            "Signature House Rub: 500g",
            "Apple juice: 1L",
            "Cider vinegar: 200ml",
            "Method: Apply rub 24h prior (Dry Brine) → Slow roast (140°C) for 8h until internal 94°C → Hand-shred warm → Hydrate with juices/apple juice"
          ],
          yield: "10kg (60 portions)",
          timeLaw: "8 hours @ 140°C | failure threshold: Internal <92°C or >98°C",
          passSignals: ["Succulent finish", "Hand-shred texture", "Internal temp 94°C reached"],
          rejectSignals: ["Tough un-shreddable core", "Greasy residue pooling", "Dry strands"],
          failureLaw: "LOW & SLOW LAW breach; insufficient collagen breakdown if temp doesn't hit 94°C.",
          recoveryProtocol: "If tough: return to HELIOS for 60 min. If dry: hydrate with extra apple juice/vinegar spray.",
          jemmaMapping: ["THERMAL FAILURE", "COLLAGEN STASIS"],
          memoryTag: "Internal temp peak / Shred elasticity"
        },
        rootLayer: "Collagen-to-gelatin thermal breakdown system.",
        controlLaw: "LOW & SLOW LAW — Internal temperature must reach 94°C to fully dissolve intramuscular collagen into succulent gelatin.",
        ingredients: [
          "Pork shoulder (boneless)",
          "Signature House Rub",
          "Apple juice",
          "Cider vinegar"
        ],
        method: [
          "1. Apply house rub 24h prior to roasting (Dry Brine)",
          "2. Slow roast at 140°C for 8h until 'fork tender'",
          "3. Hand-shred while warm to preserve natural juices",
          "4. Incorporate pan juices and hit with apple juice for moisture"
        ],
        holding: "3 days chilled / 4h hot hold",
        service: "150g weigh-out for burgers/turtles",
        timeLaw: "Roast: 8 hours @ 140°C",
        validationPoints: {
          postPrep: "Internal temp 94°C check",
          preService: "Moisture levels (no dry strands)",
          atPass: "Succulent finish · hand-shred texture"
        },
        failureLaw: "Dry strands (over-shredded) / Unrendered fat / Sour smell",
        autoReject: "Tough/un-shreddable core / Greasy residue pooling",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["none"],
        larousse: {
          principle: "Low and slow cooking breaks down collagen into gelatin, providing moisture and mouthfeel.",
          method: ["Apply rub 24h before", "Keep covered to retain steam", "Shred by hand"],
          quality: ["Succulent meat", "Deep bark colour", "Rich flavour"],
          faults: ["Tough meat", "Greasy finish", "Bland centre"]
        }
      },
      {
        id: "PREP-025",
        name: "Peppercorn Sauce",
        engine: "LUNA-003",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Bone Reduction (Base): 2L",
            "Double Cream: 500ml",
            "Green Peppercorns: 100g",
            "Brandy: 100ml",
            "Shallots: 50g",
            "Method: Reduce brandy 80% → Add bone reduction/simmer → Add cream/reduce to nappe (NAPPE LAW) → Finish with peppercorns"
          ],
          yield: "2L yield",
          timeLaw: "20 min prep | Service hold at 65°C",
          passSignals: ["Glossy surface", "Uniform peppercorn suspension", "Stable nappe"],
          rejectSignals: ["Visible oil bleed", "Peppercorns puddled at base", "Split fat"],
          failureLaw: "NAPPE LAW breach; attempting fat enrichment before structural reduction.",
          recoveryProtocol: "If split: whisk in cold cream hit off-heat.",
          jemmaMapping: ["EMULSION FAILURE", "REDUCTION TRANSITION"],
          memoryTag: "Peppercorn suspension stability"
        },
        rootLayer: "Fat-Starch reduction emulsion system.",
        controlLaw: "NAPPE LAW — Sauce must achieve structural nappe before fat enrichment to prevent split-emulsion failure.",
        ingredients: [
          "Bone Reduction (Base)",
          "Double Cream",
          "Green Peppercorns (brined)",
          "Brandy (Cognac)",
          "Shallots"
        ],
        method: [
          "1. Reduce brandy by 80% with shallots",
          "2. Add bone reduction base and simmer",
          "3. Add cream and reduction until thick enough to coat spoon",
          "4. Finish with whole green peppercorns; season with salt",
          "5. Hold at 65°C to maintain stability"
        ],
        holding: "3 days chilled / 4h service (65°C)",
        service: "50ml ladle; sharp peppercorn kick",
        timeLaw: "Prep: 20 min",
        validationPoints: {
          postPrep: "Stable emulsion at 65°C",
          preService: "Uniform peppercorn suspension",
          atPass: "Glossy surface · clear peppercorn aroma"
        },
        failureLaw: "Split fat / Grainy texture / Peppercorns puddled at base",
        autoReject: "Visible oil bleed / Skin formation / Burnt base",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["dairy"],
        fellini: {
          identity: "Fat-Starch Emulsion",
          controlLaw: "Sauce must hit nappe stage before fat enrichment.",
          pressurePoint: "Reduction of peppercorn infusion.",
          watchPoint: "Fat bleed at high temp.",
          passSignal: "Glossy surface."
        }
      },
      {
        id: "PREP-026",
        name: "Blue Cheese Sauce",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Double Cream: 1.5L",
            "Gorgonzola Dolce: 500g",
            "Shallots: 50g",
            "White Wine: 100ml",
            "Method: Sweat shallots → Deglaze wine (syrup) → Add cream/reduce slightly → OFF-HEAT: Whisk Gorgonzola until silky (OFF-HEAT LAW)"
          ],
          yield: "2L yield",
          timeLaw: "15 min prep | Service hold at 60°C",
          passSignals: ["Silky ivory texture", "Visible blue flecks", "Pungent aroma"],
          rejectSignals: ["Grainy texture", "Split fat bleed", "Grey oxidation"],
          failureLaw: "Protein graining via excessive heat (>70°C) during cheese integration.",
          recoveryProtocol: "If grainy: non-recoverable (protein denatured). If thin: whisk in extra cheese.",
          jemmaMapping: ["PROTEIN GRAINING", "THERMAL BREACH"],
          memoryTag: "Cheese integration temperature"
        },
        rootLayer: "Cultured fat emulsion system.",
        controlLaw: "OFF-HEAT INTEGRATION LAW — Cheese must be folded into hot base off-heat (max 70°C) to prevent protein graining and loss of velvet texture.",
        ingredients: [
          "Double Cream",
          "Gorgonzola Dolce",
          "Shallots (fine brunoise)",
          "White Wine"
        ],
        method: [
          "1. Sweat shallots until translucent; no color",
          "2. Deglaze with white wine; reduce to syrup",
          "3. Add cream and reduce slightly",
          "4. Remove from heat; whisk in Gorgonzola until silky",
          "5. Pass through chinois if required; keep warm (60°C)"
        ],
        holding: "3 days chilled / 4h service (60°C)",
        service: "50ml warm serve; pungent blue aroma",
        timeLaw: "Prep: 15 min",
        validationPoints: {
          postPrep: "Silky ivory texture",
          preService: "Aroma check (pungency)",
          atPass: "Visible blue flecks · smooth base"
        },
        failureLaw: "Grainy cheese protein / Liquid split / Grey oxidation",
        autoReject: "Grainy texture / Split fat bleed / Bitter aftertaste",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["dairy"],
        fellini: {
          identity: "Cultured Fat Emulsion",
          controlLaw: "Cheese must be folded into hot base off-heat.",
          pressurePoint: "Cheese integration at low heat.",
          watchPoint: "Grain from over-heating.",
          passSignal: "Silky ivory cream."
        }
      },
      {
        id: "PREP-027",
        name: "Fish Bisque Sauce",
        engine: "LUNA-003",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Prawn shells: 1kg",
            "Mirepoix: 200g",
            "Tomato paste: 50g",
            "Brandy: 50ml",
            "Fish stock: 2L",
            "Double cream: 500ml",
            "Method: Roast shells (200°C) → Flamme brandy → Deglaze stock/simmer 45m → Strain (hard press) → Reduce 50%/Add cream → MONTE AU BEURRE at 60°C"
          ],
          yield: "2L yield",
          timeLaw: "Simmer 45m / Reduce 20m | Hold at 60°C",
          passSignals: ["Vibrant coral colour", "Velvety/Glossy finish", "Absolute nappe"],
          rejectSignals: ["Oil bleed", "Broken emulsion", "Burnt shell aroma"],
          failureLaw: "Shell boiling after butter enrichment causes emulsion breakage.",
          recoveryProtocol: "If split: whisk in cold cream hit off-heat. If bitter: REJECT.",
          jemmaMapping: ["EMULSION FAILURE", "CAROTENOID OXIDATION"],
          memoryTag: "Shell roast intensity"
        },
        rootLayer: "Shellfish-Fat carotenoid emulsion system.",
        controlLaw: "MONTE AU BEURRE LAW — Butter must be whisked in cold cubes into a 60°C base to secure the velvet coral emulsion.",
        ingredients: [
          "Prawn shells (roasted)",
          "Mirepoix",
          "Tomato paste",
          "Brandy (Cognac)",
          "Fish stock",
          "Double cream"
        ],
        method: [
          "1. Roast prawn shells hard at 200°C until fragrant and bright red",
          "2. Flamme with brandy; deglaze with fish stock",
          "3. Simmer for 45 min; strain through chinois (HARD press)",
          "4. Reduce liquid by 50%; add cream and reduce to nappe",
          "5. Finish with cold butter cubes whisked in off-heat"
        ],
        holding: "2 days chilled / 4h service (60°C)",
        service: "40ml velvet pour; coral finish",
        timeLaw: "Simmer: 45 min / Reduce: 20 min",
        validationPoints: {
          postPrep: "Vibrant coral colour",
          preService: "Intense seafood aroma",
          atPass: "Glossy · velvety · nappe coating"
        },
        failureLaw: "Oily surface bleed / Grainy protein / Bitter shell notes",
        autoReject: "Oil bleed / Burnt shell aroma / Broken emulsion",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["fish", "crustaceans", "dairy"],
        fellini: {
          identity: "Shellfish-Fat Emulsion",
          controlLaw: "Butter must be whisked in cubes at 60°C.",
          pressurePoint: "Butter enrichment (Monté au Beurre).",
          watchPoint: "Breakage from boiling.",
          passSignal: "Coral velvet."
        }
      },
      {
        id: "PREP-028",
        name: "House Vinaigrette",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "EVOO: 1.5L",
            "White wine vinegar: 500ml",
            "Dijon mustard: 100g",
            "Honey: 50ml",
            "Shallots: 50g",
            "Method: Whisk vinegar/mustard/honey → Slowly whisk in oil (3:1 RATIO LOCK) → Fold in fine shallots"
          ],
          yield: "2L yield",
          timeLaw: "10 min prep | Shelf 14 days",
          passSignals: ["Glassy coating on leaf", "Sharp acid balance", "Stable suspension"],
          rejectSignals: ["Total separation", "Oxidized shallots", "Greasy mouthfeel"],
          failureLaw: "RATIO LOCK breach; insufficient emulsifier for fat volume.",
          recoveryProtocol: "Add extra Dijon and re-whisk aggressively.",
          jemmaMapping: ["SUSPENSION FAILURE"],
          memoryTag: "Shallot oxidation speed"
        },
        rootLayer: "Temporary oil-acid shelf-stable suspension.",
        controlLaw: "RATIO LOCK LAW — 3:1 Oil-to-Acid ratio must be strictly maintained for palate balance.",
        ingredients: [
          "Extra virgin olive oil",
          "White wine vinegar",
          "Dijon mustard",
          "Honey (clear)",
          "Shallots (fine brunoise)"
        ],
        method: [
          "1. Whisk vinegar, mustard, and honey until homogenized",
          "2. Slowly whisk in olive oil to create a stable temporary emulsion",
          "3. Fold in fine shallots",
          "4. Store at room temp or 4°C (Whisk before use)"
        ],
        holding: "14 days chilled",
        service: "30ml squeeze per salad; glassy coating",
        timeLaw: "Prep: 10 min",
        validationPoints: {
          postPrep: "Stable emulsion (pre-separation)",
          preService: "Sharp acid tang balance",
          atPass: "Uniform coating · glossy leaf sheen"
        },
        failureLaw: "Total separation (lack of mustard) / Too acidic / Greasy",
        autoReject: "Oxidized shallots / Oil-only coating",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["mustard"]
      },
      {
        id: "PREP-029",
        name: "Marie Rose Sauce",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "House mayo: 1000g",
            "Ketchup: 200g",
            "Worcestershire: 20ml",
            "Tabasco: 5ml",
            "Lemon juice: 10ml",
            "Paprika: 5g",
            "Method: Combine mayo/ketchup (base consistency) → Balance with acid/spice → Chill to set"
          ],
          yield: "1.2kg yield",
          timeLaw: "5 min prep",
          passSignals: ["Pale pink velvet finish", "Spicy-sweet-acid triad balance", "Stable mount"],
          rejectSignals: ["Oily surface bleed", "Grey tint (oxidation)", "Sugar dominance"],
          failureLaw: "ACID BALANCE LAW breach; failure to offset ketchup carbohydrates with adequate citric acid.",
          recoveryProtocol: "Adjust with 10ml lemon juice increments until balanced.",
          jemmaMapping: ["PH TRANSITION", "EMULSION INSTABILITY"],
          memoryTag: "Acid-sugar ratio"
        },
        rootLayer: "High-acid stable cold emulsion system.",
        controlLaw: "ACID BALANCE LAW — Sauce must be finished with fresh lemon to offset the sweetness of ketchup and balance prawn fats.",
        ingredients: [
          "House Mayo",
          "Tomato Ketchup",
          "Worcestershire Sauce",
          "Tabasco",
          "Lemon juice",
          "Smoked Paprika"
        ],
        method: [
          "1. Use House Mayo as base",
          "2. Whisk in ketchup and spices until pale pink",
          "3. Balance with Worcestershire, Tabasco and lemon",
          "4. Chill to set flavor"
        ],
        holding: "5 days chilled (4°C)",
        service: "50g ramekin; pale pink velvet",
        timeLaw: "Prep: 5 min",
        validationPoints: {
          postPrep: "Uniform pale pink colour",
          preService: "Spicy-sweet-acid balance check",
          atPass: "Glossy · creamy · sharp finish"
        },
        failureLaw: "Sweetness dominance / Split mayonnaise / Grey tint",
        autoReject: "Oily surface / Clumpy texture / Dull color",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["eggs", "mustard", "fish (Worcestershire)"]
      },
      {
        id: "PREP-030",
        name: "Asian Slaw",
        engine: "PREP",
        section: "GARNISH",
        forgev3: {
          wmm: [
            "White cabbage: 2kg (fine shred)",
            "Carrots: 1kg (julienne)",
            "Mange tout: 500g (slivered)",
            "Soy-Ginger Dressing: 300ml",
            "Method: Fine shred vegetables to 1.5mm → Drain on perforated tray (THE DRAIN LAW) → Dress to order ONLY"
          ],
          yield: "3.5kg (35 portions)",
          timeLaw: "Draft: 30s | Build: 15s | Dress to order only",
          passSignals: ["Vibrant color transparency", "Crisp audible fracture when bitten", "Zero liquid pooling at base"],
          rejectSignals: ["Soggy/Wilted cabbage", "Oxidized (brown) carrot edges", "Liquor pooling in bowl"],
          failureLaw: "OSMOTIC FLOODING: Dressing before service pulls cellular moisture out, causing collapse and dilution.",
          recoveryProtocol: "If wilted: REJECT. If watery: Drain immediately and re-dress with 10% fresh dressing.",
          jemmaMapping: ["OSMOTIC COLLAPSE", "PURITY BREACH (WATERING)"],
          memoryTag: "Vegetable drain time / Dressing ratio"
        },
        rootLayer: "Fresh vegetable-acid-salt system.",
        controlLaw: "THE DRAIN LAW — Vegetables must be drained for 30 seconds before dressing to prevent osmotic flooding.",
        ingredients: [
          "White cabbage — 2kg (fine shred)",
          "Carrots — 1kg (julienne)",
          "Mange tout — 500g (slivered)",
          "Soy-Ginger Dressing — 300ml"
        ],
        method: [
          "Fine shred all vegetables to 1.5mm",
          "Drain on perforated tray",
          "Dress to order ONLY"
        ],
        holding: "Shift only (12h dry / 4h dressed)",
        service: "100g portion side/burger garnish",
        timeLaw: "Draft: 30 sec / Build: 15 sec",
        validationPoints: {
          postPrep: "Uniform shred consistency",
          preService: "Crunchy bite (no wilt)",
          atPass: "Vibrant color / balanced salt"
        },
        failureLaw: "Mushy texture / Watery pooling",
        autoReject: "Oxidized (brown) veg / Excess dressing liquor",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-033",
        name: "Roasted Bone Marrow (Service)",
        engine: "HELIOS",
        section: "PROTEIN",
        forgev3: {
          wmm: [
            "Center-cut beef bones: 10 units",
            "Fine salt: 20g",
            "Fresh parsley: 5g",
            "Method: Roast bones (200°C) for 15-20 min → Monitor internal lipid state → Finish with salt/parsley"
          ],
          yield: "10 Portions",
          timeLaw: "20 min cook | Must hit 65°C core | Serve immediately",
          passSignals: ["Center is molten and translucent", "Lipid remains cohesive (not fully liquid oil)", "Bone surface is handle-hot"],
          rejectSignals: ["Grey/Cold center", "Total lipid collapse into yellow oil", "Burnt bone edges"],
          failureLaw: "THE GEL LAW breach; failure to reach 65°C core leaves marrow waxy. Exceeding 75°C core causes structural collapse.",
          recoveryProtocol: "If under-done: return to HELIOS for 3 min. If collapsed: REJECT.",
          jemmaMapping: ["LIPID COLLAPSE", "THERMAL UNDER-EXTRACTION"],
          memoryTag: "Core temperature accuracy"
        },
        rootLayer: "High-density animal lipid system.",
        controlLaw: "THE GEL LAW — Marrow must reach 65°C core to achieve full lipid release without collapse.",
        ingredients: [
          "Center-cut beef bones — 10 units",
          "Salt — 20g",
          "Parsley — 5g"
        ],
        method: [
          "Oven roast at 200°C for 15-20 min",
          "Check core temp → 65°C",
          "Finish with salt and fresh parsley"
        ],
        holding: "No holding — cook to order only",
        service: "Serve on-bone with sourdough",
        timeLaw: "Cook: 20 min",
        validationPoints: {
          postPrep: "Center is molten but cohesive",
          preService: "Bone is handle-hot",
          atPass: "Oil is clear, not cloudy"
        },
        failureLaw: "Cold center / Greasy residue",
        autoReject: "Grey marrow / Burnt bone edges",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-034",
        name: "Salsa Verde",
        engine: "PREP",
        section: "SAUCES",
        forgev3: {
          wmm: [
            "Flat-leaf parsley: 300g",
            "Mint: 100g",
            "Capers: 50g",
            "Anchovies: 30g",
            "EVOO: 500ml",
            "Lemon juice: 50ml",
            "Method: Hand-chop herbs (THE OXIDATION LAW) → Whisk in oil/acid → Fold in crushed capers/anchovies"
          ],
          yield: "1L yield",
          timeLaw: "15 min prep | Best use within 6 hours",
          passSignals: ["Vibrant electric green color", "Coarse non-uniform texture (hand-cut)", "Aromatic herb scent"],
          rejectSignals: ["Dull grey/black tint", "Uniform puree texture (machine cut)", "Excess oil pooling"],
          failureLaw: "OXIDATION LAW breach; mechanical bruising (blender) ruptures cells and causes enzymatic browning.",
          recoveryProtocol: "If grey: REJECT. If split: Stir gently before service.",
          jemmaMapping: ["ENZYMATIC BROWNING", "CELLULAR BRUISING"],
          memoryTag: "Herb integrity / Oxidation speed"
        },
        rootLayer: "Herb-acid-oil suspension.",
        controlLaw: "THE OXIDATION LAW — Use hand-chopping for herbs to prevent bruising and grey-shift.",
        ingredients: [
          "Flat-leaf parsley — 300g",
          "Mint — 100g",
          "Capers — 50g",
          "Anchovies — 30g",
          "EVOO — 500ml",
          "Lemon juice — 50ml"
        ],
        method: [
          "Finely hand-chop herbs (no food processor)",
          "Whisk in oil and lemon",
          "Fold in crushed capers/anchovies"
        ],
        holding: "24h chilled (best use within 6h)",
        service: "Garnish for fish/lamb",
        timeLaw: "Prep: 15 min",
        validationPoints: {
          postPrep: "Electric green color",
          preService: "Aromatic herb scent",
          atPass: "Coats protein without running"
        },
        failureLaw: "Grey colour / Separation",
        autoReject: "Bruised herb scent / Excess oil pooling",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-035",
        name: "Garlic Confit",
        engine: "LUNA-002",
        section: "INFUSIONS",
        forgev3: {
          wmm: [
            "Garlic cloves (peeled): 500g",
            "Pomace oil: 1L",
            "Thyme/Rosemary: 1 sprig each",
            "Method: Submerge garlic in oil → LUNA cook at 85°C for 2h (THE BOTULISM LAW) → Chill immediately in ice bath"
          ],
          yield: "1.5L yield",
          timeLaw: "2h cook | Maximum life 7 days @ <4°C",
          passSignals: ["Cloves are translucent and butter-soft", "Oil is clear amber", "Mellow sweet flavor"],
          rejectSignals: ["Dark brown/Burnt cloves", "Cloudy oil suspension", "Fermentation bubbles"],
          failureLaw: "THE BOTULISM LAW breach; failure to chill rapidly or holding >4°C allows anaerobic bacterial growth.",
          recoveryProtocol: "If burnt: REJECT. If held at room temp >2h: REJECT.",
          jemmaMapping: ["BIOLOGICAL BREACH", "OVER-CARAMELIZATION"],
          memoryTag: "Thermal stability / Chilly speed"
        },
        rootLayer: "Low-temp lipid-aromatic infusion.",
        controlLaw: "THE BOTULISM LAW — Keep refrigerated at <4°C; maximum life 7 days.",
        ingredients: [
          "Garlic cloves (peeled) — 500g",
          "Pomace oil — 1L",
          "Thyme/Rosemary"
        ],
        method: [
          "Submerge garlic in oil",
          "Cook at 85°C for 2h until spreadable",
          "Chill immediately in ice bath"
        ],
        holding: "7 days chilled",
        service: "Fold into butters / sauce garnish",
        timeLaw: "Cook: 2h",
        validationPoints: {
          postPrep: "Cloves translucent/spreadable",
          preService: "Oil is clear amber",
          atPass: "Mellow, sweet flavour"
        },
        failureLaw: "Burnt garlic / Cloudy oil",
        autoReject: "Fermentation bubbles / Rancid odor",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-036",
        name: "Burrata (Tempering Protocol)",
        engine: "PREP",
        section: "CHEESES",
        forgev3: {
          wmm: [
            "Burrata (125g unit): 1 unit",
            "Method: Remove from chiller 30 min before (THE TEMPER LAW) → Check core softness → Plate at 18-20°C"
          ],
          yield: "1 Portion",
          timeLaw: "30 min tempering | 18-20°C target | 1h ambient max",
          passSignals: ["Skin is elastic and soft", "Core is molten/liquid stracciatella", "Ambient surface temp"],
          rejectSignals: ["Cold/Waxy center", "Skin rupture on touch", "Sour/Fermented liquid smell"],
          failureLaw: "THE TEMPER LAW breach; cold serving temperature prevents the internal panna/curd matrix from reaching its structural flow point, resulting in a waxy, unpleasant mouthfeel.",
          recoveryProtocol: "If cold: Cupped palm warmth for 60s. If split/sour: REJECT.",
          jemmaMapping: ["LIPID FLOW FAILURE", "THERMAL STASIS"],
          memoryTag: "Stracciatella release temp"
        },
        rootLayer: "Dual-texture dairy system.",
        controlLaw: "THE TEMPER LAW — Burrata MUST be held at 18-20°C for 30 min before service to unlock the stracciatella core.",
        ingredients: [
          "Burrata (125g unit) — 1 unit",
          "EVOO",
          "Sea salt"
        ],
        method: [
          "Remove from chiller 30 min before service",
          "Maintain controlled ambient environment",
          "Check core softness before plating"
        ],
        holding: "1h ambient max",
        service: "Cold/Ambient plate point",
        timeLaw: "Temper: 30 min",
        validationPoints: {
          postPrep: "Skin is intact",
          preService: "Center is molten/soft",
          atPass: "Creams bleed on first cut"
        },
        failureLaw: "Cold/Rubber center",
        autoReject: "Skin break / Sour liquid",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-037",
        name: "House Focaccia (Bake Protocol)",
        engine: "PREP",
        section: "BAKERY",
        forgev3: {
          wmm: [
            "Flour: 2kg / Water: 1.6kg / Yeast: 40g / Oil: 200ml",
            "Method: Bulk ferment 2h → Tray stretch → 1h proof → DIMPLE HARD (THE DIMPLE LAW) → Bake 220°C (25m)"
          ],
          yield: "2 Trays (20 portions)",
          timeLaw: "25 min Bake at 220°C | 2h + 1h Proofing cycle",
          passSignals: ["Golden topographical surface", "Audible base crunch", "High-moisture open crumb"],
          rejectSignals: ["Flat/Dense non-aerated crumb", "Pale top / Soggy base", "Raw flour center"],
          failureLaw: "THE DIMPLE LAW breach; shallow dimpling prevents oil from reaching the tray floor, resulting in 'bread-on-metal' sticking and lack of internal steam-pockets.",
          recoveryProtocol: "If pale: Return to 220°C for 5-8 min. If flat: REJECT (fermentation fail).",
          jemmaMapping: ["FERMENTATION STALL", "CRUST INTEGRITY FAILURE"],
          memoryTag: "Hydro-thermal dimple depth"
        },
        rootLayer: "High-hydration open-crumb system.",
        controlLaw: "THE DIMPLE LAW — Finger dimpling must reach floor of tray to create oil pockets.",
        ingredients: [
          "Strong bread flour — 2kg",
          "Water (tepid) — 1.6kg",
          "Yeast — 40g",
          "Olive oil — 200ml",
          "Maldon salt"
        ],
        method: [
          "Mix → bulk ferment 2h",
          "Stretch into oiled trays",
          "Second proof 1h → dimple hard",
          "Bake 220°C for 20-25 min"
        ],
        holding: "24h (refresh in oven 2 min)",
        service: "Square slice side",
        timeLaw: "Bake: 25 min",
        validationPoints: {
          postPrep: "Golden top / Oiled base",
          preService: "Springy crumb",
          atPass: "Aromatic olive oil finish"
        },
        failureLaw: "Flat/Dense crumb / Underside oil soak",
        autoReject: "Raw center / Burnt base",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "PREP-038",
        name: "Pickled Gherkins (Drain Law)",
        engine: "PREP",
        section: "GARNISH",
        forgev3: {
          wmm: [
            "Pickled gherkins: 1kg",
            "Method: Slice 3mm (THE DRAIN LAW) → Store in brine → Drain 30s on perforated tray prior to assembly"
          ],
          yield: "50-60 portions",
          timeLaw: "30s mandatory drain | 30 day shelf life",
          passSignals: ["Crisp snap on bite", "Dry-to-touch surface after drain", "Uniform 3mm depth"],
          rejectSignals: ["Limp/Soggy texture", "Residual brine pool in assembly bowl", "Discolored highlights"],
          failureLaw: "THE DRAIN LAW breach; residual acetic brine triggers rapid starch dissolution in the bun/bread, leading to structural 'soggy' failure.",
          recoveryProtocol: "If wet: Re-drain on fresh dry cloth. If soft/mushy: REJECT.",
          jemmaMapping: ["OSMOTIC BUN DEGRADATION", "MOISTURE MIGRATION"],
          memoryTag: "Structural brine-lock"
        },
        rootLayer: "Acid-stabilised vegetable garnish.",
        controlLaw: "THE DRAIN LAW — Slices must be drained on a perforated tray for 30s before assembly.",
        ingredients: [
          "Large pickled gherkins — 1kg",
          "Brine (from jar)"
        ],
        method: [
          "Slice to 3mm uniform rounds",
          "Store in own brine",
          "Drain 30s before use"
        ],
        holding: "30 days chilled",
        service: "Burger build anchor",
        timeLaw: "Drain: 30 sec",
        validationPoints: {
          postPrep: "Crisp snap retained",
          preService: "Cold and wet",
          atPass: "No juice bleed on bun"
        },
        failureLaw: "Soggy bun (poor drain)",
        autoReject: "Soft/Mushy texture",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
    ] as any[]).map(doctrinePatch),
    operationalLayers: [
      {
        name: "SAUCE & SAUCIER PROTOCOLS",
        subtitle: "System Layer: Liquid Foundations & Flavour Integrity",
        sections: [
          {
            title: "REDUCTION LAW",
            content: "Never reduce aggressively. High heat reduction causes side-wall scorching and bitterness contamination."
          },
          {
            title: "RECOVERY LAW",
            content: [
              "If fat separation occurs:",
              "• Remove from heat immediately",
              "• Blend aggressively to rebind",
              "• If separation persists → discard"
            ]
          },
          {
            title: "ACID LAW (THE JEMMA PROTOCOL)",
            content: [
              "1. RATIO LOCK (Oil:Acid): For all dressings, the working ratio is 3:1 (Fat:Acid). Deviations >10% require senior chef sign-off.",
              "2. THE DRAIN LAW: All pickled components (Gherkins, Jalapeños, Onions) MUST be drained for 30 seconds on a perforated tray before mounting to prevent bun/bread collapse.",
              "3. THE OXIDATION LOCK: Fresh citrus (lemon/lime) must be cut per-shift. Exposed surfaces covered with damp cloth.",
              "4. BRINE LAW: Standard pickling brine = 1 part Vinegar : 0.5 part Sugar : 0.5 part Water.",
              "5. DRESS-TO-ORDER: Leaf-based salads are dressed at points of plating only. No pre-dressed greens.",
              "6. ANTHOCYANIN LOCK: Red cabbage/onions REQUIRE acid (vinegar/lemon) to prevent 'grey shift' (alkaline reaction)."
            ],
            quote: "Acid defines flavour. Control the acid, control the plate."
          },
          {
            title: "ACID APPLICATION LAW",
            content: "Acid must never be applied early to hot or high-moisture systems. Acid is added at the final stage or at service to preserve structure, colour, and balance.",
            quote: "Stops cabbage greying, slaws collapsing, and sauces thinning."
          }
        ]
      },
      {
        name: "PREP ENGINE v2.5.2 — FAT / MARROW FLOW LAYER (RELEASED)",
        subtitle: "Marrow Transformation & Fat Lifecycle Control",
        sections: [
          {
            title: "PURPOSE",
            content: "Convert animal fat (marrow) into controlled, repeatable value across service: Premium (on bone) → Compound (butter) → Functional (jus/fat) → Exit"
          },
          {
            title: "CORE LAW STACK",
            content: [
              "1. ONE-WAY TRANSFORMATION LAW: Raw marrow → Cook → Butter. Butter → Conversion (Day 3). ❌ No reverse. No re-setting clocks.",
              "2. THERMAL SYNCHRONISATION LAW: Marrow integration window: 20–24°C. Below = clumping. Above = emulsion collapse.",
              "3. FAT LIFECYCLE LAW: Day 0–2: Precision finish (10 g discs). Day 3: Mandatory conversion. Day 4: ❌ Out.",
              "4. REDUCTION LAW (Inherited): No aggressive high heat on fat reductions. Prevent bitterness / side-wall burn.",
              "5. RECOVERY LAW (Inherited): If split: remove heat → mechanically rebind (blend/whisk). If not recoverable → convert immediately (no service use)."
            ]
          },
          {
            title: "MEP INSERT — DAILY EXECUTION WINDOW (FIRST 60–90 MIN)",
            content: [
              "A. RAW CHECK (ENTRY): Locate marrow (bottom shelf). Split: SERVICE (on bone) / CONVERSION (excess → roast).",
              "B. RENDER (CONVERSION PATH): Oven: 180–190°C, 20–30 min. Full liquefaction, no scorch. Strain → remove solids/particles.",
              "C. TEMPER: Cool to 20–24°C (non-negotiable).",
              "D. EMULSIFY (BUTTER BUILD): Whip unsalted butter (aerate). Fold marrow in stages. Add: Garlic confit paste + Parsley (fine).",
              "E. PORTION + STORE: 10 g discs. Airtight + film contact. Label: 'Marrow Butter — Day 0 / Time / Batch'. Place: Top shelf (finish control zone).",
              "F. TRACKING LOOP: Day 0–2: Finish steaks/burgers; enrich sauces off heat. Day 3: Convert all remaining: Jus enrichment (off heat) / Controlled cooking fat / Bread/upsell melt."
            ],
            quote: "MARROW TASK — DAILY: Check → Split (Service/Conversion) → Roast excess → Build butter → Label → Track Day 3 conversion"
          },
          {
            title: "STORAGE MAP & REJECT CRITERIA",
            content: [
              "STORAGE: Top Shelf (Marrow butter discs) | Mid (Prepped marrow for service) | Bottom (Raw bones sealed).",
              "AUTO-REJECT: Oil bleed / visible separation, Grey/brown clumps, Gritty texture (unrendered), Acrid garlic note, Missing label/time."
            ]
          },
          {
            title: "PASS CRITERIA & ENGINE INTEGRATION",
            content: [
              "PASS: Pale-gold, aerated, homogeneous. Clean 10 g disc release. Even herb suspension. Stable melt (no pooling).",
              "INTEGRATION: Grill/Mains (10g finish on rest) / Burger (melt disc post-cook) / Sauce (off-heat enrichment) / Bread (controlled upsell on Day 3)."
            ],
            quote: "Zero waste loop. Higher perceived value. Consistent flavour. Stable under pressure."
          },
          {
            title: "RESULT",
            content: "Zero waste loop. Higher perceived value without menu change. Consistent flavour layer across engines. Stable under pressure."
          }
        ]
      },
      {
        name: "DESSERT ENGINE GOVERNANCE — EMULSION + STRUCTURE CONTROL",
        subtitle: "Audit: Stability, Aeration & Thermal Integrity",
        sections: [
          {
            title: "EMULSION & STRUCTURE LAWS",
            content: [
              "1. TEMPERATURE SHOCK LAW: Any rapid mismatch between component temperatures risks split, grain, collapse, or set failure.",
              "2. OVERWORK LAW: Excess whipping, folding, or agitation damages structure and destabilizes fat systems.",
              "3. SEQUENCE LAW: Soft systems must be built in the correct order; premature combination or incorrect staging creates irreversible transition.",
              "4. REST LAW: Creams, gels, and baked structural components require a defined rest/set window before service release.",
              "5. STABILITY LAW: Any bleed, grain, collapse, rubber set, grease leak, or structural inconsistency is an auto-reject."
            ],
            quote: "DESSERT CHECK — STABILITY: Cream = smooth + stable | Set = correct tension | Crumble = crisp + dry | No bleed / no grain / no collapse"
          },
          {
            title: "GLOBAL FAIL SIGNALS",
            content: [
              "temperature shock",
              "overworked fat",
              "poor sequencing",
              "insufficient rest",
              "lack of strain/control",
              "bleed",
              "grain",
              "collapse"
            ],
            quote: "Any visual or structural inconsistency is a hard fail."
          }
        ]
      },
      {
        name: "SERVICE INTELLIGENCE & OPERATIONAL SEAL",
        subtitle: "System Layer: Par / Flow / Escalation",
        sections: [
          {
            title: "PAR LAW",
            content: [
              "1. PAR DEFINITION: Every prep component must have a defined Daily Par Level, Batch Size alignment, and Refill Trigger Point.",
              "2. TRIGGER TRIGGER: Refill sequence starts when stock hits 20% of the service requirement window.",
              "3. BATCH INTEGRITY: Batch sizes must be scaled to the equipment capacity to avoid over-reduction or thermal fatigue."
            ],
            quote: "Without par control, you have service chaos."
          }
        ]
      }
    ]
  },
  sunday: {
    label: "SUNDAY ENGINE",
    icon: "☀️",
    color: "#FFD700",
    station: "Sunday Roast / Pass",
    tag: "SUNDAY",
    items: ([
      {
        id: "SUNDAY-001",
        name: "Roast Leg of Lamb",
        engine: "HELIOS",
        section: "CORE",
        forgev3: {
          wmm: [
            "Leg of Lamb (bone-in): 3kg",
            "Garlic: 20g",
            "Rosemary: 10g",
            "Sea salt: 50g",
            "Method: Score fat/stud with aromatics → Roast 200°C (20 min) → Drop to 160°C → Cook to internal 55°C → REST 20 min (THE MINT LAW)"
          ],
          yield: "6-8 Portions",
          timeLaw: "2h Cook / 20m Rest | Failure: Internal >62°C (Grey shift)",
          passSignals: ["Uniform pink core", "Herb-scented crispy fat cap", "Zero clear juice leakage on plate"],
          rejectSignals: ["Grey/Dry muscle fibers", "Cold center", "Dull/Fatty unrendered skin"],
          failureLaw: "THE MINT LAW breach; carving before resting causes rapid fluid loss and structural toughening.",
          recoveryProtocol: "If under-temp: Return to HELIOS for 10 min. If over-temp: Slice thin and drench in hot Galyons Gravy.",
          jemmaMapping: ["THERMAL OVER-EXTRACTION", "FLUID EXPULSION"],
          memoryTag: "Resting duration / Core temp accuracy"
        },
        rootLayer: "Herb-infused whole muscle roast.",
        controlLaw: "THE MINT LAW — Must be rested for 20 minutes before carving to prevent juice bleed on plate.",
        ingredients: [
          "Leg of Lamb — 3kg (bone-in)",
          "Garlic — 20g",
          "Rosemary — 10g",
          "Sea salt — 50g"
        ],
        method: [
          "Score fat and stud with garlic/rosemary",
          "Roast 200°C for 20 min → drop to 160°C",
          "Cook to internal 55°C",
          "Rest 20 min"
        ],
        holding: "30 min hot hold (covered)",
        service: "3-4 thick slices per plate",
        timeLaw: "Cook: 2h / Rest: 20 min",
        validationPoints: {
          postPrep: "Core temp 55-58°C (Pink)",
          preService: "Resting window complete",
          atPass: "Hot plate / Pink center"
        },
        failureLaw: "Grey beef / Dry meat",
        autoReject: "Cold center / Over-done (grey)",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "SUNDAY-002",
        name: "Roast Beef",
        engine: "HELIOS",
        section: "CORE",
        forgev3: {
          wmm: [
            "Beef (Sirloin/Topside): 5kg",
            "Fine salt: 100g",
            "Method: High heat sear (Maillard) → Low roast (THE CORE TECH LAW) → Remove at 52°C → DEEP REST 30m"
          ],
          yield: "10-12 Portions",
          timeLaw: "30 min Deep Rest | Failure: Internal >56°C before rest",
          passSignals: ["Perfect edge-to-edge pink", "Savoury dark crust", "Moist, succulent fiber"],
          rejectSignals: ["Grey band >5mm from edge", "Blood pooling on plate (rest failure)", "Ragged texture"],
          failureLaw: "THE CORE TECH LAW breach; skipping the 30m carry-over rest results in fibre tension and juice loss.",
          recoveryProtocol: "If cold: Flash slices for 15s in hot reduction. If grey: Slice ultra-thin (1mm) for texture.",
          jemmaMapping: ["CARRY-OVER TRANSITION", "MAILLARD STALL"],
          memoryTag: "Resting temperature peak"
        },
        rootLayer: "Large muscle dry-roasting system (Sirloin/Topside).",
        controlLaw: "THE CORE TECH LAW — 52°C target core + 30m carry-over deep rest.",
        ingredients: [
          "Beef Sirloin or Topside",
          "Yorkshire pudding",
          "Roast potatoes",
          "Seasonal Roots",
          "Greens",
          "Galyons Gravy"
        ],
        method: [
          "High heat sear to develop Maillard crust",
          "Low heat roast until 52°C core",
          "Remove and deep rest for 30 min",
          "Slice thin against the grain"
        ],
        holding: "30 min warm rest (covered)",
        service: "3-4 thin slices per plate; vertical build",
        timeLaw: "30m Deep Rest",
        validationPoints: {
          postPrep: "52°C core reached",
          preService: "30m resting window complete",
          atPass: "Clean rims · pink beef · audible potato crunch"
        },
        failureLaw: "Grey beef / Dry meat / Ragged slicing",
        autoReject: "No blood pool on plate / Cold center",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["gluten", "dairy", "eggs"],
        larousse: {
          principle: "Maillard reaction on the surface must be achieved without toughening the interior muscle fibres.",
          method: ["Salt 24h prior", "Monitor core temp closely", "Slice thin for texture"],
          quality: ["Uniform pink", "Savoury crust", "Succulent bite"],
        },
        fellini: {
          identity: "Confident pink beef.",
          pressurePoint: "Ragged slicing from dull knife or no rest.",
          watchPoint: "The cut.",
          passSignal: "No blood pool on plate.",
          recoveryMove: "Adjust slice thickness."
        }
      },
      {
        id: "SUNDAY-003",
        name: "Half Roast Chicken",
        engine: "HELIOS",
        section: "CORE",
        forgev3: {
          wmm: [
            "Half Brined Chicken: 1 unit",
            "Butter: 30g",
            "Method: Roast/Steam combo (THE SKIN SNAP LAW) → High heat finish → Rest breast-down → Target 74°C leg joint"
          ],
          yield: "1 Portion",
          timeLaw: "Cook to 74°C internal | Skin loses snap after 20 min hold",
          passSignals: ["Audible skin snap", "Zero blood in leg joint", "Translucent juice flow"],
          rejectSignals: ["Rubbery/Soggy skin", "Red/Pink joint bone", "Dry stringy breast"],
          failureLaw: "SKIN SNAP LAW breach; holding in high-humidity environment or low roasting temps leads to fat saturation of skin.",
          recoveryProtocol: "If skin soft: 2 min flash at 240°C. If bloody: Return to HELIOS until join is clear.",
          jemmaMapping: ["LIPID SATURATION (SKIN)", "BIOLOGICAL BREACH"],
          memoryTag: "Skin dehydration level"
        },
        rootLayer: "Brine-protected moisture + skin render system.",
        controlLaw: "SKIN SNAP LAW — Dry skin finish + 74°C safety core requirement.",
        ingredients: [
          "Half Brined Chicken",
          "Yorkshire pudding",
          "Roast potatoes",
          "Seasonal Roots",
          "Buttered Greens",
          "Galyons Gravy"
        ],
        method: [
          "Steam/Roast combination cook",
          "High heat skin finish to render fat",
          "Rest breast-down to preserve moisture",
          "Check leg joint for zero-blood"
        ],
        holding: "20 min max before skin degradation",
        service: "One half bird; vertical build",
        timeLaw: "Cook to 74°C core",
        validationPoints: {
          postPrep: "Brine window met",
          preService: "Skin dry for roast",
          atPass: "Crisp golden skin · juicy breast meat · vertical build"
        },
        failureLaw: "Dry breast / Soggy skin / Blood in joint",
        autoReject: "Soft skin / Under 74°C core",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["gluten", "dairy", "eggs"],
        larousse: {
          principle: "The skin protects the flesh from drying; high surface heat renders the subcutaneous fat.",
          method: ["Dry skin thoroughly", "Roast at high temp", "Rest breast-down"],
          quality: ["Audible skin", "Moist joints", "Zero blood"],
        },
        fellini: {
          identity: "Juicy skin-on bird.",
          pressurePoint: "Soggy skin from steam/plating.",
          watchPoint: "Leg joint colour.",
          passSignal: "Snap of the skin.",
          recoveryMove: "Brief hot-pass flash."
        }
      },
      {
        id: "SUNDAY-004",
        name: "Vegetarian Sunday Roast",
        engine: "HELIOS",
        section: "CORE",
        forgev3: {
          wmm: [
            "Nut Roast / Mushroom Wellington: 1 unit",
            "Method: Bake to order (HEAT RETENTION LAW) → Glaze components separately → Finish with veg gravy"
          ],
          yield: "1 Portion",
          timeLaw: "Must hit 75°C core | Hold max 30 min",
          passSignals: ["Crisp pastry shell (if Wellington)", "Dense steaming core", "Rich dark glaze"],
          rejectSignals: ["Cold core center", "Soggy pastry base", "Dry/Crumbly fall-apart texture"],
          failureLaw: "HEAT RETENTION LAW breach; mass density prevents thermal penetration if initial oven temp is too low.",
          recoveryProtocol: "If cold: Microwave core 30s then flash in HELIOS for 2 min.",
          jemmaMapping: ["THERMAL PENETRATION FAILURE"],
          memoryTag: "Core density heat-soak"
        },
        rootLayer: "Umami-dense protein replacement (Nut Roast/Wellington).",
        controlLaw: "HEAT RETENTION LAW — Massive center must maintain 75°C to preserve structure and mouthfeel.",
        ingredients: [
          "Nut Roast or Mushroom Wellington",
          "Yorkshire pudding",
          "Roast potatoes",
          "Seasonal Roots",
          "Vegetarian Gravy",
          "Fresh Herb Oil"
        ],
        method: [
          "Bake to order in high heat environment",
          "Glaze roots separately",
          "Finish with hot vegetarian gravy",
          "Top with fresh herb oil"
        ],
        holding: "Hold warm; do not exceed 30 min",
        service: "Individual unit; abundant veggie vertical build",
        timeLaw: "Cook to 75°C core",
        validationPoints: {
          postPrep: "Wellington crispness verified",
          preService: "Core temp 75°C",
          atPass: "Equal authority to meat plates · vibrant colour · rich gravy"
        },
        failureLaw: "Cold center / Dry texture / Soggy pastry",
        autoReject: "Cold core / Grey visual",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["gluten", "dairy", "eggs", "nuts"],
        larousse: {
          principle: "Vegetarian replacements must provide structural integrity and savoury depth (umami).",
          method: ["Roast vegetables separately", "Use caramelised onion base for gravy", "Ensure heat retention"],
          quality: ["Complex texture", "Rich golden finish", "Seasoned throughout"],
        },
        fellini: {
          identity: "No-apology veggie roast.",
          pressurePoint: "Treated as an afterthought (cold/dry).",
          watchPoint: "Gravy consistency.",
          passSignal: "Abundant look.",
          recoveryMove: "Fresh herb oil top-up."
        }
      },
      {
        id: "SUNDAY-005",
        name: "Duck Fat Roast Potatoes",
        engine: "HELIOS",
        section: "VEG",
        forgev3: {
          wmm: [
            "Maris Piper potatoes: 5kg",
            "Duck fat: 1L",
            "Sea salt: 50g",
            "Method: Par-boil from cold (STARCH ROUGHING LAW) → Drain/Steam-dry till white & fluffy → Shake aggressively → Roast in smoking-hot fat (220°C)"
          ],
          yield: "20 Portions",
          timeLaw: "45-60 min Roast | Must serve within 15 min of bake completion",
          passSignals: ["Audible fracture on crust", "Deep golden glass-like finish", "Internal fluffiness (no waxy core)"],
          rejectSignals: ["Pale/Soggy skin", "Visible oil pooling on base", "Hard/Waxy internal core"],
          failureLaw: "STARCH ROUGHING LAW breach; failure to steam-dry or rough up surface prevent fat-starch binding and crunch formation.",
          recoveryProtocol: "If pale: Return to 240°C HELIOS for 5 min. If oily: Drain on wire rack immediately.",
          jemmaMapping: ["STARCH-FAT BIND FAILURE", "THERMAL STALL (CRUST)"],
          memoryTag: "Roughing intensity / Steam-dry duration"
        },
        rootLayer: "Surface-area starch-fat reaction system.",
        controlLaw: "STARCH ROUGHING LAW — Par-boil until edges friable; rough up aggressively to maximize surface area for fat-binding.",
        ingredients: [
          "Maris Piper potatoes",
          "Duck fat",
          "Sea salt"
        ],
        method: [
          "Par-boil from cold water",
          "Drain and steam-dry thoroughly (CRITICAL)",
          "Shake to rough up surface starch",
          "Roast in smoking-hot fat at 220°C"
        ],
        holding: "15 min max before loss of crunch",
        service: "4-5 units per portion; high-side arrangement",
        timeLaw: "Roast 45-60 min",
        validationPoints: {
          postPrep: "Steam-dry verified",
          preService: "Fat smoking hot",
          atPass: "Deep golden · audible crust · fluffy centre"
        },
        failureLaw: "Oily / Soggy / Pale / Flat colour",
        autoReject: "No audible crunch / Oily residue",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["none"],
        larousse: {
          principle: "Surface area is key; rough edges increase the number of locations for fat-starch reaction.",
          method: ["Cool fully before roasting", "Ensure fat is smoking hot", "Season while hot"],
          quality: ["High crunch", "Creamy interior", "Savory fat flavour"],
        },
        fellini: {
          identity: "The reason they come.",
          pressurePoint: "Soggy potatoes from stacking or low temp.",
          watchPoint: "Steam-off importance.",
          passSignal: "The crack.",
          recoveryMove: "High heat flash only."
        }
      },
      {
        id: "SUNDAY-006",
        name: "Giant Yorkshire Pudding",
        engine: "HELIOS",
        section: "VEG",
        forgev3: {
          wmm: [
            "Equal volume: Flour / Eggs / Milk",
            "Beef dripping or veg oil: 200ml",
            "Method: Whisk smooth → Rest 12h cold → Smoking hot fat in tray (THERMAL SHOCK LAW) → Pour cold batter → Bake 200°C (DO NOT OPEN DOOR)"
          ],
          yield: "12 Giant units",
          timeLaw: "20-25 min Bake | Collapse window: >15 min hold",
          passSignals: ["Defiance of gravity (high rise)", "Crisp golden shell with translucent oil sheen", "Hollow stable structure"],
          rejectSignals: ["Flat/Doughy collapse", "Oily/Greasy base soak", "Pale/Soft side walls"],
          failureLaw: "THERMAL SHOCK LAW breach; opening door or using warm batter prevents the rapid steam-driven expansion required for lift.",
          recoveryProtocol: "If soft: Flash in high-heat pass. If flat: REJECT (structural failure).",
          jemmaMapping: ["STRUCTURAL COLLAPSE", "THERMAL SHOCK FAILURE"],
          memoryTag: "Resting cycle / Heat recovery speed"
        },
        rootLayer: "Steam-driven gluten-expansion system.",
        controlLaw: "THERMAL SHOCK LAW — Batter MUST be cold; fat MUST be smoking hot; oven door MUST NOT open.",
        ingredients: [
          "Equal volume: Flour / Eggs / Milk",
          "Beef dripping or veg oil"
        ],
        method: [
          "Whisk batter till smooth → Rest 12h cold",
          "Preheat oil until smoking in tray",
          "Pour cold batter into hot oil",
          "Bake 200°C without opening door"
        ],
        holding: "10-15 min max before collapse risk",
        service: "1 large unit; highest point of the build",
        timeLaw: "Bake 20-25 min",
        validationPoints: {
          postPrep: "Batter rested 12h",
          preService: "Oil smoking hot",
          atPass: "High rise · crisp shell · soft centre"
        },
        failureLaw: "Collapse / Pale / Doughy centre",
        autoReject: "No rise / Oily / Underdone",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["gluten", "dairy", "eggs"],
        larousse: {
          principle: "Steam-driven rise requires immediate heat transfer and a gluten network strong enough to hold gas.",
          method: ["Equal parts by volume", "Do not open door", "Cold batter / hot oil"],
          quality: ["Height", "Vibrancy", "Lightness"],
        },
        fellini: {
          identity: "Theater on a plate.",
          pressurePoint: "Opening oven door mid-bake.",
          watchPoint: "The rise.",
          passSignal: "Defiance of gravity.",
          recoveryMove: "Warm on top of oven."
        }
      },
      {
        id: "SUNDAY-007",
        name: "Cauliflower Cheese",
        engine: "LUNA-002",
        section: "VEG",
        forgev3: {
          wmm: [
            "Cauliflower florets: 2kg",
            "Mornay Sauce: 1.5L",
            "Cheddar/Parmesan: 300g",
            "Method: Blanch cauli → Steam-dry (MOISTURE BARRIER LAW) → Coat in Mornay → Top with cheese → Glaze at 200°C"
          ],
          yield: "10 Portions",
          timeLaw: "10 min glaze | 30 min hold max",
          passSignals: ["Hard bubbly brown glaze", "Zero liquid separation in base", "Tender-crisp florets"],
          rejectSignals: ["Water pooling at base (split)", "Rubbery cauliflower stems", "Pale/Greasy sauce"],
          failureLaw: "MOISTURE BARRIER LAW breach; residual blanching water leeches into Mornay system causing emulsion breakage.",
          recoveryProtocol: "If watery: REJECT. If pale: Torch or flash at 240°C.",
          jemmaMapping: ["EMULSION BREAK (WATER-LEECH)", "GLAZE FAILURE"],
          memoryTag: "Drain efficiency / Steam-dry check"
        },
        rootLayer: "Mornay-fat vegetable-structural system.",
        controlLaw: "MOISTURE BARRIER LAW — Cauliflower must be drained and steam-dried before saucing; any water leech = split sauce (Hard Reject).",
        ingredients: [
          "Cauliflower florets",
          "Béchamel / Mornay sauce",
          "Mature Cheddar and Parmesan",
          "Mustard / Nutmeg"
        ],
        method: [
          "Blanch cauli until tender-crisp",
          "Drain → steam-dry thoroughly",
          "Coat in rich Mornay sauce",
          "Top with cheese mix → Bake at 200°C for hard glaze"
        ],
        holding: "30 min hot hold (covered)",
        service: "Side bowl or plate; glossy bubbling finish",
        timeLaw: "Bake 8-12 min",
        validationPoints: {
          postPrep: "Zero-water cauli",
          preService: "Sauce adherence checked",
          atPass: "Golden top · glossy bubbling interior"
        },
        failureLaw: "Split sauce / Watery base / Tough cauli",
        autoReject: "Water puddle in bowl / Separation",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["dairy", "mustard", "gluten"],
        larousse: {
          principle: "The Mornay sauce provides the fat bridge between the cruciferous vegetable and the palate.",
          method: ["Do not overcook cauli", "Season sauce with mustard/nutmeg", "Glaze hard"],
          quality: ["Cheese pull", "Nutty finish", "Creamy fold"],
        },
        fellini: {
          identity: "Comfort with structure.",
          pressurePoint: "Waterleech from cauliflower into sauce.",
          watchPoint: "Sauce adherence.",
          passSignal: "Bubble and brown.",
          recoveryMove: "Extra cheese topping."
        }
      },
      {
        id: "SUNDAY-008",
        name: "Honey Roast Carrots & Parsnips",
        engine: "HELIOS",
        section: "VEG",
        forgev3: {
          wmm: [
            "Carrots/Parsnips: 2kg",
            "Honey: 100ml",
            "Method: Roast batons dry at 190°C (THE GLAZE LAW) → Add honey final 5 mins → Toss to coat"
          ],
          yield: "10 Portions",
          timeLaw: "30 min Roast | Honey addition: last 5-8 min window",
          passSignals: ["Reflective amber glaze (not carbonized)", "Tender bite with slight resistance", "Uniform caramelization on edges"],
          rejectSignals: ["Black/Bitter honey patches (burnt)", "Limp/Soggy texture", "Pale/Dull appearance"],
          failureLaw: "THE GLAZE LAW breach; early honey addition leads to sugar carbonization before root structural softening.",
          recoveryProtocol: "If dry: Toss with 20ml warm water/honey mix. If burnt: REJECT.",
          jemmaMapping: ["SUGAR CARBONIZATION", "GLAZE FAILURE"],
          memoryTag: "Honey addition timing accuracy"
        },
        rootLayer: "Sugar-glaze vegetable-starch system.",
        controlLaw: "THE GLAZE LAW — Glazing involves the reduction of sugar-water into a film; honey must be added late to prevent carbonization.",
        ingredients: [
          "Carrots (batons)",
          "Parsnips (batons)",
          "Honey",
          "Vegetable oil",
          "Salt"
        ],
        method: [
          "Prep even batons for uniform cooking",
          "Roast dry at 190°C until edges colour",
          "Add honey in final 5-8 mins of cooking",
          "Toss to coat in reflective glaze"
        ],
        holding: "20 min max hot hold (covered)",
        service: "Mixed portion; vertical arrangement",
        timeLaw: "Roast 25-30 min",
        validationPoints: {
          postPrep: "Uniform baton sizing",
          preService: "Edges caramelised",
          atPass: "Tender bite · light glaze · reflective finish"
        },
        failureLaw: "Burnt honey / Soggy roots / Pale batch",
        autoReject: "Charred honey bitter notes / Watery glaze",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["none"],
        larousse: {
          principle: "Glazing involves the reduction of sugar-water into a film that reflects light and concentrates sweetness.",
          method: ["Roast roots dry first", "Add honey late to avoid burning", "Salt balance"],
          quality: ["Gloss", "Softest bite", "Golden edges"],
        },
        fellini: {
          identity: "Sweetness and edge.",
          pressurePoint: "Burning honey or soggy roots.",
          watchPoint: "Caramel status.",
          passSignal: "Reflective glaze.",
          recoveryMove: "Brief water splash/reduction."
        }
      },
      {
        id: "SUNDAY-009",
        name: "Peas",
        engine: "LUNA-003",
        section: "VEG",
        forgev3: {
          wmm: [
            "Garden peas: 1kg",
            "Salted butter: 50g",
            "Sea salt: 5g",
            "Method: Blanch rapidly to order (THERMAL POP LAW) → Drain fully (No water) → Toss with butter/salt"
          ],
          yield: "10 Portions",
          timeLaw: "60s Blanch | Hold <5 min",
          passSignals: ["Electric green vibrancy", "Explosive sweet pop", "Zero surface water"],
          rejectSignals: ["Dull grey/khaki tint", "Shrivelled skin", "Wet plate bleed"],
          failureLaw: "THERMAL POP LAW breach; over-cooking ruptures cell walls leading to starch degradation and color loss.",
          recoveryProtocol: "If grey: REJECT. Must be cooked fresh to order.",
          jemmaMapping: ["CHLOROPHYLL DEGRADATION"],
          memoryTag: "Vibrancy retention time"
        },
        rootLayer: "Rapid-heat chlorophyll preservation system.",
        controlLaw: "THERMAL POP LAW — Peas must be heated rapidly to preserve cellular sugar; do not boil (Hard Reject).",
        ingredients: [
          "Garden peas (frozen/fresh)",
          "Salted butter",
          "Sea salt"
        ],
        method: [
          "Blanch rapidly to order",
          "Drain thoroughly (mandatory)",
          "Reheat in pan with butter and seasoning",
          "Ensure bright green vibrancy"
        ],
        holding: "5 min max hot hold",
        service: "Side serving; bright sweet pop",
        timeLaw: "Blanch 1 min",
        validationPoints: {
          postPrep: "Zero-water drainage",
          preService: "Bright green check",
          atPass: "Vibrant sweet pop · no excess liquor"
        },
        failureLaw: "Grey colour / Shrivelled / Watery plate",
        autoReject: "Mushy texture / Grey tint",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["dairy"],
        larousse: {
          principle: "Simple vegetables expose sloppy handling; rapid heating preserves cellular integrity.",
          method: ["Do not overcook", "Drain thoroughly", "Use sea salt"],
          quality: ["Bright colour", "Sweetness", "Clean finish"],
        },
        fellini: {
          identity: "Simple standards.",
          pressurePoint: "Sitting in water (wet plate).",
          watchPoint: "The drain.",
          passSignal: "Vibrant sweet pop.",
          recoveryMove: "Fresh toss."
        }
      },
      {
        id: "SUNDAY-010",
        name: "Green Beans",
        engine: "LUNA-003",
        section: "VEG",
        forgev3: {
          wmm: [
            "Fine green beans: 1kg",
            "Salted butter: 50g",
            "Method: Blanch in saline boil (THE SNAP LAW) → Ice shock immediately → Flash sauté in butter to finish"
          ],
          yield: "10 Portions",
          timeLaw: "2-3 min Blanch | Finish in <60s",
          passSignals: ["Vivid green 'snap' upon fracture", "Glossy buttery sheen", "Architectural integrity (straight)"],
          rejectSignals: ["Limp/Flabby texture", "Dull grey tint", "Butter pooling at base"],
          failureLaw: "THE SNAP LAW breach; failure to ice-shock allows carry-over cooking to destroy structural hemicellulose.",
          recoveryProtocol: "If limp: REJECT. Component is structurally dead.",
          jemmaMapping: ["STRUCTURAL COLLAPSE", "CHLOROPHYLL TRANSITION"],
          memoryTag: "Ice-shock efficiency"
        },
        rootLayer: "Architectural snap preservation system.",
        controlLaw: "THE SNAP LAW — Beans must maintain 'structural snap'; over-cooking = total loss of architectural intent.",
        ingredients: [
          "Fine green beans",
          "Salted butter",
          "Sea salt"
        ],
        method: [
          "Top & Tail with precision",
          "Blanch in heavily salted water",
          "Ice shock immediately to set colour",
          "Flash sauté in butter to finish"
        ],
        holding: "5-8 min window",
        service: "Side serving; buttery sheen",
        timeLaw: "Blanch 2-3 min",
        validationPoints: {
          postPrep: "Ice shock complete",
          preService: "Vivid green colour",
          atPass: "Snap and gloss · seasoned"
        },
        failureLaw: "Flabby texture / Greying colour",
        autoReject: "Mushy batch / Dull grey tint",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["dairy"],
        larousse: {
          principle: "Al dente texture is preferred to maintain the bean's architectural snap.",
          method: ["Use heavily salted water", "Ice shock immediately", "Flash to order"],
          quality: ["Vivid green", "Crisp-tender", "Buttery sheen"],
        },
        fellini: {
          identity: "Crisp green snap.",
          pressurePoint: "Greying from over-holding.",
          watchPoint: "Bite strength.",
          passSignal: "Snap and gloss.",
          recoveryMove: "Discard if grey."
        }
      },
      {
        id: "SUNDAY-011",
        name: "Broccoli",
        engine: "LUNA-003",
        section: "VEG",
        forgev3: {
          wmm: [
            "Broccoli florets: 1kg",
            "Butter: 50g",
            "Method: Blanch in rolling boil → REVERSE DRAIN (upside-down) → Toss with butter/salt"
          ],
          yield: "10 Portions",
          timeLaw: "3-4 min Blanch | Must be served immediately",
          passSignals: ["Vibrant green florets", "Tender but firm stem", "Dry floret tips"],
          rejectSignals: ["Water logging in florets", "Grey shadow in head", "Mushy texture"],
          failureLaw: "REVERSE DRAIN LAW breach; trapping blanching water in florets dilutes flavour and creates soggy texture.",
          recoveryProtocol: "If watery: Drain aggressively on cloth. If grey: REJECT.",
          jemmaMapping: ["WATER LOGGING", "THERMAL OVER-EXTENDING"],
          memoryTag: "Drain position accuracy"
        },
        rootLayer: "Stem-density thermal management system.",
        controlLaw: "REVERSE DRAIN LAW — Broccoli must be drained upside-down to prevent water logging in floret tips.",
        ingredients: [
          "Broccoli florets/stems",
          "Butter",
          "Sea salt"
        ],
        method: [
          "Cut even florets; split thick stems",
          "Blanch in salted rolling boil",
          "Ice shock and drain upside down (CRITICAL)",
          "Finish in hot pan with butter"
        ],
        holding: "5-10 min hot hold",
        service: "Florets or Stems portion",
        timeLaw: "Blanch 2-3 min",
        validationPoints: {
          postPrep: "Uniform sizing",
          preService: "Dry florets",
          atPass: "Bright colour · tender with bite"
        },
        failureLaw: "Water-logged florets / Yellowing / Mushy",
        autoReject: "Yellow tint / Broken heads",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["dairy"],
        larousse: {
          principle: "Stem density determines cook time; uniform sizing is mandatory for even texture.",
          method: ["Split thick stems", "Season floret tips", "Drain upside down"],
          quality: ["Uniform green", "Tender bite", "Clean shape"],
        },
        fellini: {
          identity: "Structural green lift.",
          pressurePoint: "Broken heads from rough handling.",
          watchPoint: "Drainage.",
          passSignal: "Strong floret structure.",
          recoveryMove: "Handle with tongs only."
        }
      },
      {
        id: "SUNDAY-012",
        name: "Savoy Cabbage",
        engine: "LUNA-003",
        section: "VEG",
        forgev3: {
          wmm: [
            "Savoy cabbage leaves: 2kg",
            "Salted butter: 100g",
            "Black pepper: 10g",
            "Method: Remove outer ribs → Shred evenly → Blanch briefly (SULPHUR BLOCK LAW) → Ice shock → Sauté to order with butter/heavy pepper"
          ],
          yield: "20 Portions",
          timeLaw: "60s Blanch | 60s Sauté | Hold <5 min",
          passSignals: ["Emerald green edges", "Soft ruffle texture", "Mild sweet flavor (no sulphur)"],
          rejectSignals: ["Dull grey color", "Strong sulphuric aroma", "Mushy/Watery texture"],
          failureLaw: "SULPHUR BLOCK LAW breach; over-cooking or failure to ice-shock triggers anaerobic sulphur development and bitterness.",
          recoveryProtocol: "If grey: REJECT. If watery: Drain on cloth and re-sauté with fresh butter.",
          jemmaMapping: ["SULPHUR EVENT", "CHLOROPHYLL TRANSITION"],
          memoryTag: "Blanch timing precision"
        },
        rootLayer: "Emerald-leaf texture assembly.",
        controlLaw: "SULPHUR BLOCK LAW — Brief blanching + rapid cooling prevents development of sulphur notes; cabbage must remain sweet.",
        ingredients: [
          "Savoy cabbage leaves",
          "Salted butter",
          "Black pepper"
        ],
        method: [
          "Remove tough outer ribs → Shred evenly",
          "Blanch briefly in boiling water",
          "Ice shock and drain",
          "Sauté to order with butter and heavy pepper"
        ],
        holding: "5 min max hot hold",
        service: "Shredded portion; emerald edges",
        timeLaw: "Blanch 1 min / Sauté 1 min",
        validationPoints: {
          postPrep: "Ribs removed",
          preService: "Cold set active green",
          atPass: "Tender · seasoned · lightly glossy"
        },
        failureLaw: "Grey colour / Bitter notes / Mushy",
        autoReject: "Sulphuric aroma / Grey tint",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["dairy"],
        larousse: {
          principle: "Brassica vegetables develop sulphur compounds when overcooked; brief sautéing prevents this.",
          method: ["Remove tough outer ribs", "Butter emulsion finish", "Fresh black pepper"],
          quality: ["Soft ruffle texture", "Mild sweet flavor", "Emerald edges"],
        },
        fellini: {
          identity: "Soft textured green.",
          pressurePoint: "Turning grey/sulphuric.",
          watchPoint: "Heat exposure time.",
          passSignal: "Soft and sweet.",
          recoveryMove: "High heat butter flash."
        }
      },
      {
        id: "SUNDAY-013",
        name: "Braised Red Cabbage",
        engine: "LUNA-001",
        section: "VEG",
        forgev3: {
          wmm: [
            "Red cabbage: 5kg",
            "Bramley apple: 1kg (grated)",
            "Cider vinegar: 500ml",
            "Dark brown sugar: 300g",
            "Mulled spices: 20g",
            "Method: Shred cabbage → Add vinegar T-minus-0 (ANTHOCYANIN LOCK) → Slow braise 3h → Reduce liquor to syrup glaze"
          ],
          yield: "50 Portions",
          timeLaw: "2-3h Braise | Reduction window: until liquor is syrup",
          passSignals: ["Vibrant glowing purple (not blue)", "Deep reflective gloss", "Melt-in-mouth texture"],
          rejectSignals: ["Blue-grey oxidation tint", "Watery liquor pooling", "Tough/Stringy ribs"],
          failureLaw: "ANTHOCYANIN LOCK breach; delay in acid addition (vinegar) allows alkaline shift and permanent blue-grey oxidation.",
          recoveryProtocol: "If blue: Add 50ml cider vinegar and reduce further. If watery: Continue reduction to syrup.",
          jemmaMapping: ["PH TRANSITION (ALKALINE SHIFT)", "REDUCTION FAILURE"],
          memoryTag: "Initial acid timing / Viscosity target"
        },
        rootLayer: "Anthocyanin-protected slow-reduction system.",
        controlLaw: "ANTHOCYANIN LOCK — Ph must be lowered via acetic acid (vinegar) at T-minus-0 to lock vibrant purple hue and prevent blue-grey oxidation.",
        ingredients: [
          "Red cabbage (shredded)",
          "Bramley apple",
          "Cider vinegar",
          "Dark brown sugar",
          "Mulled spices (clove/cinnamon)"
        ],
        method: [
          "PH CONTROL: Add vinegar immediately to stabilize red hue",
          "Slow braise until cabbage is melt-in-mouth tender",
          "Reduce liquor to syrup for correct glaze viscosity",
          "Balance sugar/acid regularly during braise"
        ],
        holding: "5 days chilled / 4h warm hold",
        service: "Side serving; vertical glowing gloss",
        timeLaw: "Braise 2-3 hours",
        validationPoints: {
          postPrep: "Vibrant purple (not blue)",
          preService: "Syrup viscosity check",
          atPass: "Deep colour · glossy finish · spice depth"
        },
        failureLaw: "Blue-grey tint / Watery base / Tough ribs",
        autoReject: "Blue-grey tint (lack of acid) / Watery on plate",
        status: "ACTIVE",
        executionCard: true,
        printCard: true,
        allergens: ["none"],
        larousse: {
          principle: "Anthocyanin pigments require acidity to maintain a vibrant red-purple hue.",
          method: [
            "PH CONTROL: Add vinegar at start to 'lock' red hue.",
            "Reduce liquor to syrup for correct glaze viscosity.",
            "Balance sugar/acid regularly during braise."
          ],
          quality: ["Deep purple", "Melt-in-mouth", "Spice depth"],
          faults: [
            "AUTO REJECT: Blue/Grey tint (low acid)",
            "AUTO REJECT: Wet/runny on the plate (under-reduced)"
          ],
          correction: ["Add splash of vinegar if blue tint appears."]
        },
        fellini: {
          identity: "Acid-sweet counterweight.",
          pressurePoint: "Wet/runny on the plate.",
          watchPoint: "Reduction status.",
          passSignal: "Glowing gloss.",
          recoveryMove: "Reduce more."
        }
      }
    ] as any[]).map(doctrinePatch),
    operationalLayers: [
      {
        name: "SUNDAY ENGINE — CONTROL LAYER",
        subtitle: "System Layer: Enforcement / Timing / Pass Authority",
        sections: [
          {
            title: "SERVICE MODEL",
            content: [
              "Sunday service operates on a Wave System.",
              "No free-flow chaos.",
              "Tickets grouped and fired in controlled waves.",
              "Maximum clarity at pass."
            ],
            quote: "If you lose the wave, you lose the service."
          },
          {
            title: "WAVE RULE",
            content: "Max 6–8 plates per wave (based on team strength). Next wave does not start until current wave is stabilised."
          },
          {
            title: "CORE TIMING GRID",
            content: [
              "Lamb target: 55–58°C → rest → carve",
              "Beef target: 52–56°C → carry over to 55–58°C → slice",
              "Chicken: fully cooked, skin crisp, rest minimum 10 mins"
            ]
          },
          {
            title: "HOLDING WINDOWS",
            content: [
              "Beef/Lamb (post-rest): 20–30 mins max",
              "Chicken: 20 mins max before skin degradation",
              "Potatoes: 15–20 mins max before loss of crunch",
              "Yorkshire puddings: 10–15 mins max before collapse risk",
              "Greens: 5–8 mins max before colour loss",
              "Cauliflower cheese: 30 mins hot hold (covered)"
            ],
            quote: "Every component is dying. Timing is preservation."
          },
          {
            title: "PLATE BUILD ORDER",
            content: [
              "1. Protein placed first (6 o’clock anchor)",
              "2. Yorkshire positioned (height + structure)",
              "3. Potatoes placed (support + texture)",
              "4. Swede purée (clean quenelle or spoon)",
              "5. Carrots & parsnips (colour + glaze)",
              "6. Greens (final fresh layer)",
              "7. Gravy (last, controlled, never flood)"
            ],
            quote: "Build from structure, not emotion."
          },
          {
            title: "PASS AUTHORITY RULE",
            content: [
              "Only one voice at the pass (Head Chef / Operator).",
              "No self-sending. No guesswork.",
              "Call System: '2 Lamb, 1 Beef, 1 Chicken — walking'.",
              "Plates checked before leaving pass."
            ],
            quote: "If it didn’t pass the pass, it didn’t happen."
          },
          {
            title: "GRAVY LAW",
            content: [
              "Always hot. Always glossy.",
              "Never drown the plate.",
              "Added at pass, not before."
            ],
            quote: "Gravy supports. It never hides mistakes."
          }
        ]
      },
      {
        name: "SUNDAY ENGINE — FAILURE LAYER",
        subtitle: "System Layer: Rejection / Standards / Stability",
        sections: [
          {
            title: "HARD REJECT CONDITIONS (AUTO FAIL)",
            content: [
              "PROTEIN: Overcooked beef/lamb, No rest → juice loss, Ragged slicing",
              "POTATOES: No crunch, Pale colour, Oily or soggy",
              "YORKSHIRE: Collapse, Undercooked centre, No rise",
              "GREENS: Grey colour, Overcooked / mushy, Excess water",
              "CAULIFLOWER CHEESE: Split sauce, Watery base, Burnt or pale top",
              "PLATE BUILD: No structure, Flooded gravy, Dirty rim, No visual hierarchy"
            ],
            quote: "If one element fails, the plate fails."
          },
          {
            title: "SOFT FAIL (CORRECT BEFORE SEND)",
            content: [
              "Weak seasoning",
              "Slight potato softening (refry possible)",
              "Yorkshire losing heat (quick flash possible)",
              "Greens losing shine (refresh possible)"
            ],
            quote: "Fix fast or don’t send."
          },
          {
            title: "JEMMA VALIDATION PROMPTS",
            content: [
              "Is protein within temperature band?",
              "Are potatoes still within crunch window?",
              "Are greens still visually alive?",
              "Is plate build following structure?",
              "Is gravy controlled or flooding?"
            ],
            quote: "If any answer = NO → HOLD PLATE"
          },
          {
            title: "OPERATOR OVERRIDE LAW",
            content: "If system breaks: STOP sending. Reset station. Rebuild wave.",
            quote: "Better to pause than to bleed standards."
          },
          {
            title: "FINAL SUNDAY LAW",
            content: "Sunday is not about volume. Sunday is about consistency under pressure.",
            quote: "Every plate must feel like the first plate."
          }
        ]
      }
    ]
  },
  dessert: {
    label: "DESSERT ENGINE",
    icon: "🍰",
    color: "#D46E8D",
    station: "Pastry / Pass",
    tag: "SYSTEM",
    items: ([
      {
        id: "DESSERT-001",
        name: "Sticky Toffee Pudding",
        engine: "AETHER",
        section: "HOT",
        forgev3: {
          wmm: [
            "Medjool dates: 500g",
            "Boiling water: 600ml",
            "Bicarb: 10g",
            "Butter/Sugar/Eggs/Self-raising flour",
            "Method: Emulsify dates/water/bicarb (THE DATE LAW) → Cream butter/sugar → Fold in flour/date paste → Tray bake 160°C"
          ],
          yield: "20 Portions",
          timeLaw: "40 min Bake | 45s Reheat to order | Target 65°C core",
          passSignals: ["Steaming 65°C core", "Uniform dark crumb (no date chunks)", "Moist high-retention crumb"],
          rejectSignals: ["Fibrous date chunks", "Dry/Crumbly edges", "Cold center on pass"],
          failureLaw: "THE DATE LAW breach; failure to fully emulsify dates creates structural inconsistency and unpleasant fibrous texture.",
          recoveryProtocol: "If dry: Steam with 10ml toffee sauce. If chunks: REJECT Batch.",
          jemmaMapping: ["STRUCTURAL INCONSISTENCY", "THERMAL UNDER-PENETRATION"],
          memoryTag: "Date paste micron-level"
        },
        rootLayer: "Date-sugar sponge with high-moisture retention.",
        controlLaw: "THE DATE LAW — Dates must be emulsified into smooth paste to prevent 'fibrous bite' failure.",
        ingredients: [
          "Medjool dates — 500g",
          "Boiling water — 600ml",
          "Bicarb — 10g",
          "Unsalted butter — 250g",
          "Dark brown sugar — 300g",
          "Eggs — 5 units",
          "Self-raising flour — 350g"
        ],
        method: [
          "Soak dates in water/bicarb → blend to paste",
          "Cream butter/sugar → add eggs gradually",
          "Fold in flour → fold in date paste",
          "Tray bake 160°C for 35-40 min"
        ],
        holding: "3 days chilled / 30 min hot-hold sauce",
        service: "Reheat 45s → Plate → Heavy sauce glaze",
        timeLaw: "Bake: 40 min / Reheat: 45 sec",
        validationPoints: {
          postPrep: "Date paste smooth",
          preService: "Ambient sponge pre-cut",
          atPass: "Steaming core (65°C)"
        },
        failureLaw: "Dry edges / Cold centre",
        autoReject: "Fibrous date chunks / Split sauce",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "DESSERT-002",
        name: "Sea Salt Toffee Sauce",
        engine: "LUNA-002",
        section: "PREP",
        forgev3: {
          wmm: [
            "Double cream: 1L",
            "Dark brown sugar: 500g",
            "Unsalted butter: 200g",
            "Maldon salt: 15g",
            "Method: Melt butter/sugar → Boil to 104°C (THE EMULSION LAW) → Whisk in cream → Simmer 2m → Salt"
          ],
          yield: "1.5L yield",
          timeLaw: "10 min Cook | Hold at 60°C",
          passSignals: ["Glossy amber finish", "High viscosity (coats spoon)", "Zero sugar grain"],
          rejectSignals: ["Split fat surface", "Grainy mouthfeel", "Burnt/Bitter notes"],
          failureLaw: "THE EMULSION LAW breach; adding cream before 104°C prevents full protein-fat-sugar binding.",
          recoveryProtocol: "If split: Whisk in 5% cold cream off-heat. If grainy: REJECT.",
          jemmaMapping: ["EMULSION FAILURE", "THERMAL STALL"],
          memoryTag: "Sugar boil accuracy"
        },
        rootLayer: "High-viscosity butter-fat emulsion.",
        controlLaw: "THE EMULSION LAW — Sauce must hit 104°C before cream addition to prevent splitting.",
        ingredients: [
          "Double cream — 1L",
          "Dark brown sugar — 500g",
          "Unsalted butter — 200g",
          "Maldon sea salt — 15g"
        ],
        method: [
          "Melt butter/sugar → boil to 104°C",
          "Vigorously whisk in cream",
          "Simmer 2 min → add salt",
          "Cool and store"
        ],
        holding: "5 days chilled / Warm service hold",
        service: "Ladle or squeeze bottle",
        timeLaw: "Cook: 10 min",
        validationPoints: {
          postPrep: "No sugar grain",
          preService: "Held at 60°C",
          atPass: "Glossy finish"
        },
        failureLaw: "Grainy texture / Thin viscosity",
        autoReject: "Split fat / Burnt sugar notes",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "DESSERT-003",
        name: "Tiramisu Classico",
        engine: "AETHER",
        section: "COLD",
        forgev3: {
          wmm: [
            "Mascarpone: 1kg",
            "Egg yolks: 10 units",
            "Savoiardi: 60 units",
            "Espresso: 1L",
            "Method: Whisk yolks/sugar → Fold mascarpone → Fold whipped cream → 2s dip biscuits (THE SATURATION LAW) → Layer → Set 12h"
          ],
          yield: "20 Portions",
          timeLaw: "12h Set | 2s Dip per unit | 48h Shelf life",
          passSignals: ["Stable vertical cream layers", "Matte cocoa finish", "Clean 90° edge on slice"],
          rejectSignals: ["Liquid seepage from base", "Soggy sponge collapse", "Grainy cream texture"],
          failureLaw: "THE SATURATION LAW breach; >2s dip allows excess coffee to rupture the protein-fat matrix of the mascarpone.",
          recoveryProtocol: "If soggy: REJECT. If grainy: check mascarpone temp during fold.",
          jemmaMapping: ["STRUCTURAL COLLAPSE", "EMULSION INSTABILITY"],
          memoryTag: "Sponge saturation level"
        },
        rootLayer: "Coffee-saturated sponge in whipped fat matrix.",
        controlLaw: "THE SATURATION LAW — 2 second dip max per biscuit to prevent base collapse.",
        ingredients: [
          "Mascarpone — 1kg",
          "Egg yolks — 10 units",
          "Caster sugar — 300g",
          "Double cream — 1kg",
          "Strong espresso — 1L",
          "Savoiardi biscuits — 60 units"
        ],
        method: [
          "Whisk yolks/sugar → fold mascarpone",
          "Fold in soft-peak whipped cream",
          "Quick dip biscuits → layer structure",
          "Chill 12h for structural set"
        ],
        holding: "48h max chilled",
        service: "Lift clean slice → Heavy cocoa dust",
        timeLaw: "Set: 12h / Slice: 30 sec",
        validationPoints: {
          postPrep: "Stable cream layers",
          preService: "Pre-cut 90° edges",
          atPass: "Matte cocoa finish"
        },
        failureLaw: "Structural collapse / Soggy base",
        autoReject: "Liquid seepage / Grainy cream",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "DESSERT-004",
        name: "Flourless Chocolate Cake",
        engine: "AETHER",
        section: "COLD",
        forgev3: {
          wmm: [
            "70% Dark chocolate: 600g",
            "Unsalted butter: 400g",
            "Large eggs: 10 units",
            "Caster sugar: 300g",
            "Method: Melt choc/butter over water bath → Whisk eggs/sugar (No foam) → Combine → Bake in bain-marie 150°C (THE WOBBLE LAW) → Chill 6h"
          ],
          yield: "12 Portions",
          timeLaw: "30 min Bake | 6h Set | 3 day shelf life",
          passSignals: ["Cracked top surface crust", "Fudgy dense center (non-cakey)", "Clean cold wedge release"],
          rejectSignals: ["Cakey/Dry appearance", "Grainy mouthfeel", "Broken/Crumbled wedge"],
          failureLaw: "THE WOBBLE LAW breach; over-baking past the 'center jiggle' point causes protein coagulation to squeeze out fat, leading to dry/grainy texture.",
          recoveryProtocol: "If dry: Serve with extra Crème Fraîche. If split: REJECT.",
          jemmaMapping: ["LIPID EXTRUSION", "OVER-COAGULATION"],
          memoryTag: "Oven exit jiggle physics"
        },
        rootLayer: "High-density 70% cocoa fat system.",
        controlLaw: "THE WOBBLE LAW — Remove from oven with slight center jiggle to ensure fudge set.",
        ingredients: [
          "70% Dark chocolate — 600g",
          "Unsalted butter — 400g",
          "Large eggs — 10 units",
          "Caster sugar — 300g"
        ],
        method: [
          "Melt chocolate/butter over water bath",
          "Whisk eggs/sugar lightly (no foam)",
          "Combine → bake in bain-marie 150°C",
          "Chill 6h before slicing"
        ],
        holding: "3 days chilled",
        service: "Cold slice → Crème fraîche finish",
        timeLaw: "Bake: 30 min / Set: 6h",
        validationPoints: {
          postPrep: "Fudgy interior",
          preService: "Clean cold slice",
          atPass: "Cracked top crust"
        },
        failureLaw: "Cakey/Dry texture / Split fat",
        autoReject: "Grainy mouthfeel / Broken wedge",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "DESSERT-005",
        name: "Vanilla Bean Panna Cotta",
        engine: "AETHER",
        section: "COLD",
        forgev3: {
          wmm: [
            "Double cream: 1L",
            "Whole milk: 500ml",
            "Sugar: 150g",
            "Vanilla pods: 2 units",
            "Gelatin leaves: 6 (gold grade)",
            "Method: Bloom gelatin → Heat dairy to 60°C (THE JIGGLE LAW) → Dissolve gelatin → Strain → Set 6h"
          ],
          yield: "15 Portions",
          timeLaw: "6h Set | Bloom at 60°C maximum",
          passSignals: ["Audible wobble on plate", "Uniform vanilla speckle suspension", "Velvet-smooth surface"],
          rejectSignals: ["Rubbery/Hard set", "Liquid core (set failure)", "Vanilla clumped at bottom"],
          failureLaw: "THE JIGGLE LAW breach; boiling gelatin destroys its triple-helix structure, preventing the formation of a stable mesh network.",
          recoveryProtocol: "If liquid: Re-melt to 60°C and add 1 extra gelatin leaf. If rubbery: REJECT.",
          jemmaMapping: ["STRUCTURAL SET FAILURE", "VANILLA SEDIMENTATION"],
          memoryTag: "Gelatin thermal limit"
        },
        rootLayer: "Thermosetting dairy suspension.",
        controlLaw: "THE JIGGLE LAW — Gelatin must be bloom-dissolved at 60°C (not boiling).",
        ingredients: [
          "Double cream — 1L",
          "Whole milk — 500ml",
          "Sugar — 150g",
          "Vanilla pods — 2 units",
          "Gelatin leaves — 6 units"
        ],
        method: [
          "Bloom gelatin in cold water",
          "Heat cream/milk/sugar/vanilla to 60°C",
          "Stir in gelatin → strain through chinois",
          "Set in moulds 6h min"
        ],
        holding: "3 days chilled",
        service: "De-mould to plate centre",
        timeLaw: "Set: 6h",
        validationPoints: {
          postPrep: "Uniform vanilla speckle",
          preService: "Full structural set",
          atPass: "Audible wobble on plate"
        },
        failureLaw: "Rubbery set / Split layers",
        autoReject: "Liquid centre / Vanilla clumps",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      },
      {
        id: "DESSERT-006",
        name: "Apple & Sultana Crumble",
        engine: "AETHER",
        section: "HOT",
        forgev3: {
          wmm: [
            "Bramley apples: 3kg",
            "Sultanas: 200g",
            "Crumble Mix: 1 batch",
            "Method: Stew fruit → Bake crumble separately (THE SEPARATION LAW) → Assemble and reheat to order"
          ],
          yield: "20 Portions",
          timeLaw: "20 min Crumble Bake | Reheat fruit to 65°C | Hold separately",
          passSignals: ["Visible steam from center", "Audible crumble crunch", "Fruit holds structural shape"],
          rejectSignals: ["Soggy/Soft topping", "Mushy fruit puree", "Cold base center"],
          failureLaw: "THE SEPARATION LAW breach; storing crumble on wet fruit causes moisture migration into the starch matrix (sogginess).",
          recoveryProtocol: "If soggy: Remove topping and replace with fresh baked crumble.",
          jemmaMapping: ["MOISTURE MIGRATION", "STRUCTURAL COLLAPSE (TOPPING)"],
          memoryTag: "Assembly-at-point-of-fire"
        },
        rootLayer: "Acid-balanced fruit base with dry-rub starch cap.",
        controlLaw: "THE SEPARATION LAW — Fruit and crumble must be stored separately until reheat to maintain crispness.",
        ingredients: [
          "Bramley apples — 3kg",
          "Sultanas — 200g",
          "Cinnamon/Sugar mix",
          "Butter — 500g",
          "Flour — 750g",
          "Demerara sugar — 500g"
        ],
        method: [
          "Stew apples with sultanas/spice",
          "Rub butter into flour/sugar for crumble",
          "Bake crumble separately 180°C until gold",
          "Assemble for service reheat"
        ],
        holding: "2 days chilled (fruit) / 5 days dry (crumble)",
        service: "Heat fruit → Top with crisp crumble",
        timeLaw: "Fruit wash: 15 min / Crumble bake: 20 min",
        validationPoints: {
          postPrep: "Fruit holds shape",
          preService: "Crumble dry and crunchy",
          atPass: "Steam from fruit centre"
        },
        failureLaw: "Soggy topping / Mushy fruit",
        autoReject: "Pale crumble / Cold base",
        status: "ACTIVE",
        executionCard: true,
        printCard: true
      }
    ] as any[]).map(doctrinePatch),
    operationalLayers: [
      {
        name: "DESSERT ENGINE — EMULSION + STRUCTURE CONTROL (FELLINI_STANDARD_v1)",
        subtitle: "Global Audit: Stability, Aeration & Thermal Integrity",
        sections: [
          {
            title: "EMULSION & STRUCTURE LAWS",
            content: [
              "1. TEMPERATURE SHOCK LAW: Any rapid mismatch between component temperatures risks split, grain, collapse, or set failure.",
              "2. OVERWORK LAW: Excess whipping, folding, or agitation damages structure and destabilizes fat systems.",
              "3. SEQUENCE LAW: Soft systems must be built in the correct order; premature combination or incorrect staging creates irreversible transition.",
              "4. REST LAW: Creams, gels, and baked structural components require a defined rest/set window before service release.",
              "5. STABILITY LAW: Any bleed, grain, collapse, rubber set, grease leak, or structural inconsistency is an auto-reject."
            ],
            quote: "DESSERT CHECK — STABILITY: Cream = smooth + stable | Set = correct tension | Crumble = crisp + dry"
          },
          {
            title: "GLOBAL FAIL SIGNALS (AUTO-REJECT)",
            content: [
              "Temperature shock",
              "Overworked fat",
              "Poor sequencing",
              "Insufficient rest",
              "Lack of strain/control",
              "Bleed",
              "Grain",
              "Collapse"
            ],
            quote: "Any visual or structural inconsistency is a hard fail."
          }
        ]
      },
      {
        name: "FOUNDER RULE — 6 ITEM QTY + 20 SCALE PREP LAW",
        subtitle: "Founder Mandate: Governance & Scale",
        sections: [
          {
            title: "1. 6 ITEM QTY (FOUNDER RULE)",
            content: "Each section limited to 6 ACTIVE items in production. The Master Bible is an unlimited archive; the 6 QTY rule governs the Live Service window only."
          },
          {
            title: "2. PRODUCTION vs ARCHIVE",
            content: "Bible = Unlimited Arsenal. 6 QTY = Live Service selection. Innovation remains free; production remains controlled."
          },
          {
            title: "3. 20 SCALE PREP LAW",
            content: "Production stabilized in 20 unit batches. Prep scale: 1-20 (1x), 21-40 (2x), 41-60 (3x)."
          },
          {
            title: "3. FAILURE CONDITION",
            content: "Item count > 6 OR partial batch prep = SYSTEM FAILURE. Immediate reset to 6x20 baseline is mandatory.",
            quote: "Control the number. Control the volume. Control the outcome."
          }
        ]
      },
      {
        name: "GLOBAL CARD — DESSERT STATION LAW (v2.5.2a)",
        subtitle: "Thermal Control & System Integrity",
        sections: [
          {
            title: "FRONT (UNIVERSAL SETUP)",
            content: [
              "• All desserts pre-portioned (20 UNIT LAW)",
              "• Thermal Profiles enforced (Bake/Reheat/Set)",
              "• All garnishes prepped and allocated",
              "• All sauces held within thermal limits",
              "• All plates clean and ready"
            ]
          },
          {
            title: "BUILD SEQUENCE (UNIVERSAL)",
            content: [
              "1. Retrieve portion",
              "2. Heat (if required) — check Core Temp",
              "3. Plate centre",
              "4. Apply sauce / cream",
              "5. Apply Texture Lock (#C84B31)",
              "6. Final check → send"
            ],
            quote: "TIME LAW: ≤ 60 SECONDS — HARD LIMIT"
          },
          {
            title: "BACK (GLOBAL FAILURE LAW)",
            content: [
              "• Missing texture → ❌ NO SEND",
              "• Wrong portion → ❌ NO SEND",
              "• Cold where hot required → ❌ NO SEND",
              "• Sauce split → ❌ APPLY RECOVERY OR RESET"
            ]
          },
          {
            title: "RESET PROTOCOL",
            content: [
              "• Replace portion",
              "• Rebuild clean",
              "• Do not patch"
            ],
            quote: "The pass is not where food is made. It is where the system proves itself."
          }
        ]
      },
      {
        name: "DESSERT ENGINE — GLOBAL LAWS (v2.5.2a)",
        subtitle: "De Zühr Layer: Thermal Addendum",
        sections: [
          {
            title: "1. 20 UNIT LAW",
            content: "All desserts produced in batches of 20 portions (except premium flourless cake exception)."
          },
          {
            title: "2. THERMAL LAW — ENFORCED",
            content: "Every item must hit its specific bake/reheat/set window. No guesswork. Check Core Temp (65°C+) for hot items."
          },
          {
            title: "3. SERVICE LAW — ZERO COOKING",
            content: "No baking, no reduction, no construction thinking at the pass. Plate → Finish → Send."
          },
          {
            title: "4. TEXTURE LAW — MANDATORY",
            content: "Every dish MUST include Soft/Cream + Acid/Balance + Crunch/Texture. Failure = Incomplete."
          },
          {
            title: "5. HOLD PROFILE — TRACKED",
            content: "Monitor shelf life and hot-hold duration. Sticky Toffee Hot Hold: 30min MAX. Poseet/Cake: 3 Days."
          },
          {
            title: "6. SAUCE LAW — ENFORCED",
            content: "No aggressive reduction. No side-wall scorching. If split → remove from heat → blend immediately."
          }
        ]
      },
      {
        name: "GLOBAL WMM LAW (v2.5.2a)",
        subtitle: "Weights, Measures & Method Control",
        sections: [
          {
            title: "1. NO ESTIMATION",
            content: "No 'handful' or 'to taste' for core production. All measurements must be verified before combining."
          },
          {
            title: "2. GRAM-LOCK SYSTEM",
            content: "All core ingredients defined in grams/ml. Eggs converted to weight (50g per unit) where possible."
          },
          {
            title: "3. METHOD SEQUENCING",
            content: "Steps must be followed in exact order. No skipping, no combining, no 'shortcuts' during prep."
          },
          {
            title: "4. OUTPUT CONTROL",
            content: "Batch must yield exact 20 portions (or defined exception). Record yield deviations immediately."
          }
        ]
      },
      {
        name: "SERVICE EXECUTION MODEL (DESSERT)",
        subtitle: "Pass Flow & Failure Conditions",
        sections: [
          {
            title: "PASS FLOW (≤60 SECONDS)",
            content: [
              "1. Retrieve pre-portioned unit.",
              "2. Heat (if required) in staging oven.",
              "3. Plate clean (check rim).",
              "4. Apply pre-set sauce / garnish.",
              "5. Send."
            ]
          },
          {
            title: "FAILURE CONDITIONS",
            content: [
              "Plating time > 60 seconds.",
              "Inconsistent portion sizes.",
              "Missing texture contrast.",
              "Sauce split or reduced incorrectly.",
              "Mid-service component construction."
            ],
            quote: "Desserts are not an afterthought. They are the final control point."
          }
        ]
      }
    ]
  },
  iceCream: {
    label: "ICE CREAM ENGINE",
    icon: "🍦",
    color: "#FFB3DE",
    station: "Pastry / Frozen",
    tag: "SYSTEM",
    items: [...iceCreamRecipes.systems].map(doctrinePatch),
    operationalLayers: [
      {
        name: iceCreamDoctrine.title,
        subtitle: iceCreamDoctrine.engineType,
        sections: [
          {
            title: "CORE PRINCIPLE",
            content: iceCreamDoctrine.corePrinciple
          },
          {
            title: "ROOT LAYER: " + iceCreamDoctrine.rootLayer.name,
            content: [...iceCreamDoctrine.rootLayer.phases]
          },
          {
            title: "PRIMARY LAWS",
            content: iceCreamDoctrine.primaryLaws.map(law => `${law.name}: ${law.rule}`)
          },
          {
            title: "SIXES CORE STRUCTURE",
            content: iceCreamDoctrine.sixesCoreStructure.map(s => `Slot ${s.slot}: ${s.name} — ${s.role}`)
          },
          {
            title: "VALIDATION: POST-PREP",
            content: [...iceCreamDoctrine.validationCheckpoints.postPrep]
          },
          {
            title: "VALIDATION: PRE-SERVICE",
            content: [...iceCreamDoctrine.validationCheckpoints.preService]
          },
          {
            title: "VALIDATION: AT-PASS",
            content: [...iceCreamDoctrine.validationCheckpoints.atPass]
          },
          {
            title: "OPERATOR RULES",
            content: [...iceCreamDoctrine.operatorRules]
          },
          {
            title: "ENGINE STATUS",
            content: [
              `Status: ${iceCreamDoctrine.status}`,
              `Version: ${iceCreamDoctrine.version}`,
              `Parent: ${iceCreamDoctrine.parentSystem}`,
              `Linked Recipes: ${iceCreamDoctrine.linkedRecipeEngine}`
            ],
            quote: iceCreamDoctrine.finalLock
          }
        ]
      },
      {
        name: iceCreamRecipes.title,
        subtitle: `v${iceCreamRecipes.version} | Status: ${iceCreamRecipes.status}`,
        sections: [
          {
            title: "RECIPE SYSTEM METADATA",
            content: [
              `ID: ${iceCreamRecipes.id}`,
              `Parent Doctrine: ${iceCreamRecipes.parentDoctrine}`,
              `Status: ${iceCreamRecipes.status}`,
              `Version: ${iceCreamRecipes.version}`
            ]
          },
          {
            title: "SERVICE WINDOW",
            content: [
              `Storage: ${iceCreamRecipes.globalServiceWindow.storageTemperature}`,
              `Scoop: ${iceCreamRecipes.globalServiceWindow.scoopTemperature}`,
              `Draw: ${iceCreamRecipes.globalServiceWindow.drawTemperature}`,
              `Dairy Ageing: ${iceCreamRecipes.globalServiceWindow.dairyAgeingWindow}`,
              `Sorbet Ageing: ${iceCreamRecipes.globalServiceWindow.sorbetAgeingWindow}`
            ],
            quote: iceCreamRecipes.finalLock
          }
        ]
      }
    ]
  }
};

export const BURGER_ENGINE_PATCH = {
  globalRules: {
    buildRule: "Sauce must anchor base OR be integrated into stack. No uncontrolled top-layer sauces.",
    grillLoad: "Pulled pork removed from grill dependency → hot holding only.",
    allergenRule: "All sauces must declare base (egg / mustard / gluten / soy). No implicit allergens.",
    cookCore: {
      beef: "72°C",
      chicken: "74°C",
      pork: "75°C",
      veg: "75°C"
    }
  }
}

export const JEMMA_BURGER_VALIDATION_PATCH = {
  enforce: {
    identityUnique: true,
    allergenComplete: true,
    cookDefined: true,
    watchPointsPresent: true,
    recoveryMovesPresent: true
  },
  alerts: {
    missingAllergen: "FAIL",
    duplicateIdentity: "WARNING",
    undefinedCookTemp: "FAIL",
    grillOverload: "WARNING"
  }
}

export const BURGER_ENGINE = ENGINES.burger.items;
export const SIDE_ENGINE = ENGINES.sides.items;
export const STARTER_ENGINE = ENGINES.starters.items;
export const MAIN_ENGINE = ENGINES.mains.items;
export const PIZZA_ENGINE = ENGINES.pizza.items;
export const DESSERT_ENGINE = ENGINES.dessert.items;
export const PREP_ENGINE = ENGINES.prep.items;

