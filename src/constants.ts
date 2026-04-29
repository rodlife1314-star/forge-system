import { Engine } from "./types";

const doctrinePatch = (item: any) => ({
  ...item,
  status: item.status ?? "ACTIVE",
  executionCard: item.executionCard ?? true,
  rootLayer: item.rootLayer ?? "Root layer pending final chef validation.",
  controlLaw: item.controlLaw ?? "No drift: execute only to locked spec.",
  timeLaw: item.timeLaw ?? "Time law pending final chef validation.",
  validationPoints: item.validationPoints ?? {
    postPrep: "Post-prep validation pending.",
    preService: "Pre-service validation pending.",
    atPass: "At-pass validation pending."
  },
  failureLaw: item.failureLaw ?? "Failure law pending final chef validation.",
  autoReject: item.autoReject ?? "Reject if unsafe, unstable, cold, collapsed, split, burnt, undercooked, or outside spec.",
  printCard: item.printCard ?? true,
  station: item.station ?? "GENERAL",
  allergens: item.allergens ?? [],
  pass: item.pass ?? "No pass criteria defined."
});

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
              "• Batch prep is strictly locked at 20 portions.",
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
        engine: "PIZZA",
        section: "PREP",
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
        engine: "PIZZA",
        section: "PREP",
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
        engine: "PIZZA",
        section: "CORE",
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
        engine: "PIZZA",
        section: "CORE",
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
        engine: "PIZZA",
        section: "CORE",
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
        engine: "PIZZA",
        section: "CORE",
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
        engine: "BURGER",
        section: "MAINS",
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
        engine: "BURGER",
        section: "MAINS",
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
        engine: "BURGER",
        section: "MAINS",
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
        engine: "BURGER",
        section: "MAINS",
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
        engine: "BURGER",
        section: "MAINS",
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
        engine: "BURGER",
        section: "MAINS",
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
          { title: "THE LAW", content: ["Both patties must finish simultaneously.", "No drift: execute only to locked spec."] },
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
        engine: "MAINS",
        section: "SPECIALS",
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
        engine: "MAINS",
        section: "CORE",
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
        engine: "MAINS",
        section: "CORE",
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
        engine: "MAINS",
        section: "CORE",
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
        engine: "MAINS",
        section: "PASTA",
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
        engine: "STARTERS",
        section: "HOT",
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
        engine: "STARTERS",
        section: "COLD",
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
        engine: "STARTERS",
        section: "HOT",
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
        engine: "STARTERS",
        section: "HOT",
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
        engine: "STARTERS",
        section: "COLD",
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
        engine: "STARTERS",
        section: "COLD",
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
        engine: "SIDES",
        section: "CORE",
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
        engine: "SIDES",
        section: "CORE",
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
        engine: "SIDES",
        section: "CORE",
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
        engine: "SIDES",
        section: "CORE",
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
        engine: "PREP",
        section: "PASTRY",
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
        type: "prep_component",
        category: "structural_fat_system",
        batchYield: "5kg yield · 50 portions",
        portionTool: "100g scoop",
        shelfLife: "5 days",
        ingredients: "2kg Flour · 1.5kg Butter · 1kg Sugar · 500g Oats",
        method: "ZERO DRIFT VERSION: Butter 1cm cubes (0-4°C) → Rub in dry → Stop at rubble stage → Chill",
        allergens: ["gluten", "dairy"],
        station: "Prep",
        pass: "Audible crunch · Golden brown clusters · No grease bleed · No moisture clumping",
        fellini: {
          identity: "Shortening / Contrast System",
          controlLaw: "FAT ENCAPSULATION LAW: Fat must encapsulate flour particles without melting to inhibit gluten formation and preserve discrete clusters. Failure of encapsulation = → Gluten activation → Structural collapse → Loss of crumble identity",
          pressurePoint: "THERMAL & FRICTION CONTROL: Butter temperature (0–6°C) and Max working temp (<8°C).",
          autoReject: [
            "Greasy/Oily residue → fat melt",
            "Powdery/Sand texture → overworked",
            "Flour pockets → incomplete encapsulation"
          ],
          validationPoints: {
            postPrep: "Texture: Rubble / irregular; No dust; Temp: ≤8°C",
            preService: "No moisture clumping; No butter bleed; Loose structure",
            atPass: "Crisp fracture; No grease bleed; Audible crunch"
          },
          conversionAction: "Bake 170°C (fan) / 180°C (deck) | Spread ≤ 2cm | 18–25 min | Target: Golden brown + Crisp clusters",
          verdict: "PASS — FULLY LOCKED (v2.5.2a)"
        },
        executionCard: {
          setup: ["Butter: 1cm cubes (0–4°C)", "Combine dry ingredients first", "Chilling space ready"],
          build: [
            "1. Add butter → pinch/rub using fingertips only",
            "2. STOP at “rubble” stage (pea → hazelnut clusters)",
            "3. DO NOT homogenise",
            "4. Tray spread ≤2cm (no compression)",
            "5. Bake 170°C (fan) 18–25 min (Turn 1x mid-bake)"
          ],
          timeLaw: "18–25 min Bake (Zero Drift)",
          failures: ["Greasy/Oily (Fat melt)", "Powder (Overworked)", "Flour pockets"],
          reset: ["IMMEDIATE DISCARD — NO CORRECTION PERMITTED"]
        },
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
        }
      },
      {
        id: "PREP-017",
        name: "House Mayo",
        batchYield: "5L yield · 250 portions",
        portionTool: "20g squeeze",
        shelfLife: "5 days (4°C)",
        ingredients: "Egg yolks · Pomace oil · Dijon mustard · Lemon juice",
        method: "1. Whisk yolks + mustard. 2. Slowly emulsify oil into yolks. 3. Finish with acid. 4. Season.",
        allergens: ["eggs", "mustard"],
        failureSigns: ["Split emulsion", "Too thin", "Bland"],
        correction: ["RECOVERY LAW: Start new base and whisk in split mix"],
        pass: "Thick · glossy · pale yellow · stable",
        station: "Prep",
        menuLayers: {
          core: "Egg Yolk Emulsion",
          bulk: "Oil suspension",
          wet: "Liquid Matrix",
          acid: "Lemon Juice",
          finish: "Salt"
        },
        specLayers: {
          functional: "Lecithin-stabilised oil-in-water emulsion.",
          control: "EMULSION LOCK v1: Oil Law + Split Law + Recovery Law.",
          output: "Stable, glossy base emulsion."
        },
        larousse: {
          principle: "EMULSION LOCK v1: ROOT LAYER: Oil-in-water emulsion → stable fat-water suspension.",
          method: [
            "OIL LAW: Add oil in a thin stream. Do not rush. No aggressive whisking after formation.",
            "TEMPERATURE LAW: Keep all ingredients ≤ 5°C. No exposure to heat.",
            "SPLIT LAW: Watch for grainy texture or oil droplets.",
            "RECOVERY LAW: If split, take fresh base (egg yolk/mayo) and slowly incorporate split mix.",
            "SERVICE LAW: Keep chilled. Stir before service."
          ],
          quality: ["Rich mouthfeel", "Clean acidity", "Stable structure"],
          faults: [
            "AUTO REJECT: Split / oily sheen",
            "AUTO REJECT: Curdled appearance",
            "AUTO REJECT: Raw egg taste (imbalance)"
          ],
          correction: ["Apply RECOVERY LAW immediately. Do not over-whisk."]
        }
      },
      {
        id: "PREP-018",
        name: "Chipotle Mayo",
        batchYield: "2L yield",
        portionTool: "30g ramekin",
        shelfLife: "5 days (4°C)",
        ingredients: "House mayo (1000g) · Chipotle paste (100g) · Lime juice (20ml)",
        method: "Fold chipotle and lime into house mayo base.",
        allergens: ["eggs", "mustard"],
        pass: "Glossy · smoky aroma · hold peak",
        station: "Prep",
        menuLayers: {
          core: "Mayonnaise Base",
          bulk: "30g portion",
          wet: "Emulsion Matrix",
          acid: "Lime Juice",
          finish: "Chipotle Flecks"
        },
        specLayers: {
          functional: "Capsaicin suspension in fat matrix.",
          control: "EMULSION LOCK v1: Ratio Law + Temp Law.",
          output: "Stable smoky emulsion."
        }
      },
      {
        id: "PREP-019",
        name: "Sriracha Mayo",
        batchYield: "2L yield",
        portionTool: "30g ramekin",
        shelfLife: "5 days (4°C)",
        ingredients: "House mayo (1000g) · Sriracha (120g) · Lemon (10ml)",
        method: "Whisk sriracha into mayo until uniform orange.",
        allergens: ["eggs", "mustard"],
        pass: "Uniform colour · sharp kick · glossy hold",
        station: "Prep",
        menuLayers: {
          core: "Mayonnaise Base",
          bulk: "30g portion",
          wet: "Emulsion Matrix",
          acid: "Sriracha Acidity",
          finish: "None"
        },
        specLayers: {
          functional: "Chilli oil suspension.",
          control: "EMULSION LOCK v1: Ratio Law.",
          output: "High-heat glossy emulsion."
        }
      },
      {
        id: "PREP-020",
        name: "Lemon Aioli",
        batchYield: "2L yield · 100 portions",
        portionTool: "30g ramekin",
        shelfLife: "3 days (4°C)",
        ingredients: "House mayo (1000g) · Roasted garlic (50g) · Lemon zest (2) · Black pepper",
        method: "1. Mash roasted garlic. 2. Fold into mayo. 3. Add zest and pepper. 4. Chill.",
        allergens: ["eggs", "mustard"],
        failureSigns: ["Garlic oxidation (grey)", "Zest bitterness", "Separation"],
        correction: ["RECOVERY LAW: Fold into fresh mayo base"],
        pass: "Creamy · punchy garlic · citrus finish",
        station: "Prep",
        menuLayers: {
          core: "House Mayo Base",
          bulk: "30g portion",
          wet: "Flavoured Emulsion",
          acid: "Lemon Zest",
          finish: "Black Pepper"
        },
        specLayers: {
          functional: "Aromatic suspension.",
          control: "EMULSION LOCK v1: Sequence Law (mash first).",
          output: "Garlic-forward stable cream."
        },
        larousse: {
          principle: "EMULSION LOCK v1: ROOT LAYER: Stable oil-in-water suspension. Garlic adds aromatic depth without breaking bind.",
          method: [
            "Roast garlic until soft and cool completely before folding.",
            "SEQUENCE LAW: Fold gently to avoid oil bleed from roasted garlic fat.",
            "TEMPERATURE LAW: Keep chilled ≤ 5°C."
          ],
          quality: ["Smooth texture", "Sweet garlic notes", "Bright citrus"],
          faults: [
            "AUTO REJECT: Grey appearance (oxidation)",
            "AUTO REJECT: Oil dots on surface",
            "AUTO REJECT: Bitter zest"
          ],
          correction: ["Apply RECOVERY LAW: 50g fresh mayo restart."]
        }
      },
      {
        id: "PREP-021",
        name: "Truffle Mayo",
        batchYield: "2L yield · 100 portions",
        portionTool: "30g ramekin",
        shelfLife: "5 days (4°C)",
        ingredients: "House mayo (1000g) · Truffle oil (20ml) · Truffle paste (30g)",
        method: "1. Whisk truffle paste into mayo. 2. Slowly fold in truffle oil. 3. Chill.",
        allergens: ["eggs", "mustard"],
        failureSigns: ["Aroma loss", "Oil separation", "Overpowering"],
        correction: ["RECOVERY LAW: Re-bind into fresh mayo base"],
        pass: "Glossy · strong truffle aroma · earthy finish",
        station: "Prep",
        menuLayers: {
          core: "House Mayo Base",
          bulk: "30g portion",
          wet: "Luxury Emulsion",
          acid: "None",
          finish: "Truffle scent"
        },
        specLayers: {
          functional: "Volatile oil suspension.",
          control: "EMULSION LOCK v1: Ratio Law (Oil limit) + Temp Law.",
          output: "Fragrant stable emulsion."
        },
        larousse: {
          principle: "EMULSION LOCK v1: Truffle oils are highly volatile and sensitive to heat.",
          method: [
            "OIL LAW: Maintain emulsion bind despite high external fat (truffle oil) addition.",
            "TEMPERATURE LAW: Hold ≤ 5°C to preserve aroma and bind.",
            "SERVICE LAW: Keep airtight until service."
          ],
          quality: ["Earthy aroma", "Rich texture", "Uniform colour"],
          faults: [
            "AUTO REJECT: Artificial smell",
            "AUTO REJECT: Oil slick on surface",
            "AUTO REJECT: No aroma"
          ],
          correction: ["Apply RECOVERY LAW if split."]
        }
      },
      {
        id: "PREP-022",
        name: "Bone Reduction (Batch)",
        batchYield: "10L yield",
        shelfLife: "5 days (4°C) / 30 days (Frozen)",
        ingredients: "Beef bones (roasted) · Mirepoix · Tomato paste · Red wine · Water",
        method: "1. Roast bones until deep brown. 2. Caramelise mirepoix + tomato paste. 3. Deglaze with wine. 4. Simmer 12-24h. 5. Strain + reduce by 50%.",
        allergens: ["none"],
        failureSigns: ["Thin/watery", "Bitter/burnt", "Cloudy"],
        correction: ["Reduce further", "Discard if bitter"],
        pass: "Deep mahogany · rich aroma · viscous when cold",
        station: "Prep",
        menuLayers: {
          core: "Roasted Bone Collagen",
          bulk: "Reduction Liquid",
          wet: "Base Extract",
          acid: "Red Wine Reduction",
          finish: "Mirepoix Sweetness"
        },
        specLayers: {
          functional: "Collagen extraction + Maillard concentration.",
          control: "CONTROL LAW: Time + Temperature. Low simmer (90°C) only.",
          output: "50% reduction by volume."
        },
        larousse: {
          principle: "ROOT LAYER: Collagen extraction and deep flavour concentration for sauce architecture.",
          method: [
            "Roast bones at 220°C until dark but not black.",
            "Do not boil aggressively; high heat causes fat emulsification and cloudiness.",
            "Strain through a fine chinoise/muslin."
          ],
          quality: ["Deep colour", "Rich aroma", "Gelatinous body when chilled"],
          faults: [
            "AUTO REJECT: Thin, watery body",
            "AUTO REJECT: Bitter or burnt notes (from scorched mirepoix)"
          ]
        }
      },
      {
        id: "PREP-023",
        name: "Galyons Gravy (Finish)",
        batchYield: "5L yield",
        portionTool: "50ml ladle",
        shelfLife: "3 days (4°C)",
        ingredients: "Bone Reduction (Base) · Roux (Butter/Flour) · Pan drippings · Salt/Pepper",
        method: "1. Bring base to simmer. 2. Whisk in roux slowly. 3. Add drippings for depth. 4. Reduction finish until nappe.",
        allergens: ["gluten", "dairy"],
        failureSigns: ["Lumps", "Greasy surface", "Salty"],
        correction: ["Strain through sieve", "Blend to re-emulsify fat", "Balance with unsalted stock"],
        pass: "Glossy · deep brown · coats back of spoon",
        station: "Prep / Hot Hold",
        menuLayers: {
          core: "Bone Reduction Extract",
          bulk: "Starch-thickened liquid",
          wet: "Glossy Matrix",
          acid: "None (salt/umami balance)",
          finish: "Butter Gloss"
        },
        specLayers: {
          functional: "Stable, glossy, service-ready sauce.",
          control: "GRAVY LAW: Always hot. Always glossy. Added at pass.",
          output: "Nappe consistency (coats spoon)."
        },
        larousse: {
          principle: "ROOT LAYER: Stable, glossy, service-ready sauce built from reduction and controlled thickening.",
          method: [
            "REDUCTION LAW: Never reduce aggressively. High heat causes side-wall scorching.",
            "RECOVERY LAW: If fat separation occurs, remove from heat and blend aggressively.",
            "Do not over-thicken; gravy must pour, not clump."
          ],
          quality: ["Stable hold", "Glossy finish", "Coats back of spoon"],
          faults: [
            "AUTO REJECT: Greasy surface",
            "AUTO REJECT: Lumps or gluey texture",
            "AUTO REJECT: Skin formation"
          ]
        }
      },
      {
        id: "PREP-024",
        name: "Pulled Pork",
        batchYield: "10kg yield · 60 portions",
        portionTool: "150g weigh-out",
        shelfLife: "3 days (4°C)",
        ingredients: "Pork shoulder · Dry rub · Apple juice",
        method: "1. Apply rub 24h before. 2. Slow roast 140°C for 8h. 3. Shred while warm. 4. Mix with natural juices.",
        allergens: ["none"],
        failureSigns: ["Dry strands", "Unrendered fat", "Sour smell"],
        correction: ["Add apple juice/BBQ sauce", "Roast longer", "Discard if sour"],
        pass: "Tender · moist · easily shredded · smoky aroma",
        station: "Prep",
        menuLayers: {
          core: "Slow-roasted Pork Shoulder",
          bulk: "150g serving",
          wet: "Natural Pork Juices",
          acid: "Apple Juice hydration",
          finish: "Dry Rub spices"
        },
        specLayers: {
          functional: "Collagen breakdown into gelatin.",
          control: "Time + Temp (8h/140°C) + Shredding timing.",
          output: "Succulent shredded meat."
        },
        larousse: {
          principle: "Low and slow cooking breaks down collagen into gelatin, providing moisture and mouthfeel.",
          method: ["Apply rub 24h before", "Keep covered to retain steam", "Shred by hand"],
          quality: ["Succulent meat", "Deep bark colour", "Rich flavour"],
          faults: ["Tough meat", "Greasy finish", "Bland centre"],
          correction: ["Increase cook time", "Drain excess fat", "Toss with more rub"]
        }
      },
      {
        id: "PREP-025",
        name: "Peppercorn Sauce",
        batchYield: "2L yield",
        portionTool: "50ml ladle",
        shelfLife: "3 days (4°C)",
        ingredients: "Bone Reduction (Base) · Double Cream · Green Peppercorns · Brandy",
        method: "1. Reduce brandy. 2. Add base reduction. 3. Finish with cream and peppercorns. 4. Simmer to nappe.",
        allergens: ["dairy"],
        pass: "Thick hold · sharp pepper heat · glossy cream finish",
        station: "Prep / Hot Hold",
        fellini: {
          identity: "Fat-Starch Emulsion",
          pressurePoint: "Reduction of peppercorn infusion.",
          controlLaw: "Sauce must hit nappe stage before fat enrichment. Emulsion must be held at 60-70°C.",
          watchPoint: "Fat bleed at high temp.",
          passSignals: [
            "glossy surface",
            "holds nappe on spoon",
            "uniform peppercorn suspension",
            "deep peppercorn aroma"
          ],
          failSignals: [
            "split fat",
            "grainy texture",
            "peppercorns puddled at base",
            "too thin"
          ],
          autoReject: [
            "split fat",
            "skin formation",
            "burnt base"
          ],
          verdict: "PASS: Glossy, nappe, stable.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Whisk in cold liquid hit."
        },
        menuLayers: {
          core: "Bone Reduction Base",
          bulk: "Cream Matrix",
          wet: "Peppercorn Emulsion",
          acid: "Brandy reduction",
          finish: "Whole Green Peppercorns"
        },
        specLayers: {
          functional: "Fat-reduction hybrid sauce.",
          control: "SAUCE LAW: Never reduce aggressively. Cream stability.",
          output: "50ml service."
        }
      },
      {
        id: "PREP-026",
        name: "Blue Cheese Sauce",
        batchYield: "2L yield",
        portionTool: "50ml ladle",
        shelfLife: "3 days (4°C)",
        ingredients: "Double Cream · Gorgonzola · Shallots · White Wine",
        method: "1. Sweat shallots. 2. Deglaze with wine. 3. Add cream. 4. Whisk in blue cheese gently until melted.",
        allergens: ["dairy"],
        pass: "Creamy ivory · pungent blue cheese aroma · thick holds shape",
        station: "Prep / Hot Hold",
        fellini: {
          identity: "Cultured Fat Emulsion",
          pressurePoint: "Cheese integration at low heat.",
          controlLaw: "Cheese must be folded into hot base off-heat to prevent graining.",
          watchPoint: "Grain from over-heating.",
          passSignals: [
            "visible blue cheese flecks",
            "smooth creamy base",
            "sharp pungent aroma",
            "deep ivory colour"
          ],
          failSignals: [
            "grainy cheese protein",
            "liquid/milk split",
            "grey oxidation",
            "bitter finish"
          ],
          autoReject: [
            "grainy",
            "split",
            "grey/dull"
          ],
          verdict: "PASS: Creamy, flecked, sharp.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Strain and add fresh base whisk."
        },
        menuLayers: {
          core: "Gorgonzola Cheese",
          bulk: "Cream Matrix",
          wet: "Dairy Emulsion",
          acid: "White Wine",
          finish: "Melting pockets"
        },
        specLayers: {
          functional: "Melted cheese suspension.",
          control: "EMULSION LOCK: Do not boil after cheese addition.",
          output: "50ml warm serve."
        }
      },
      {
        id: "PREP-027",
        name: "Fish Bisque Sauce",
        batchYield: "2L yield",
        portionTool: "40ml ladle",
        shelfLife: "2 days (4°C)",
        ingredients: "Prawn shells · Mirepoix · Tomato paste · Brandy · Fish stock · Cream",
        method: "1. Roast shells hard. 2. Flamme with brandy. 3. Simmer with stock. 4. Reduce + strain. 5. Finish with cream.",
        allergens: ["fish", "crustaceans", "dairy"],
        pass: "Vibrant orange · intense seafood aroma · velvet texture",
        station: "Prep / Hot Hold",
        fellini: {
          identity: "Shellfish-Fat Emulsion",
          pressurePoint: "Butter enrichment (Monté au Beurre).",
          controlLaw: "Butter must be whisked in cubes at 60°C to secure the emulsion.",
          watchPoint: "Breakage from boiling.",
          passSignals: [
            "deep coral colour",
            "glossy finish",
            "clean shellfish aroma",
            "nappe consistency"
          ],
          failSignals: [
            "oily surface",
            "grainy protein particles",
            "bitter/burnt notes",
            "separation at edges"
          ],
          autoReject: [
            "oil bleed",
            "burnt colour",
            "broken emulsion"
          ],
          verdict: "PASS: Coral, glossy, nappe.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Whisk in cold cream hit off-heat."
        },
        menuLayers: {
          core: "Shellfish reduction",
          bulk: "Cream reduction",
          wet: "Bisque Matrix",
          acid: "Brandy / Tomato",
          finish: "Smooth pass"
        },
        specLayers: {
          functional: "Carotenoid fat extraction from shells.",
          control: "REDUCTION LAW: Controlled simmer. High shell-to-liquid ratio.",
          output: "40ml velvet pour."
        }
      },
      {
        id: "PREP-028",
        name: "House Vinaigrette",
        batchYield: "2L yield",
        portionTool: "30ml squeeze",
        shelfLife: "14 days (4°C)",
        ingredients: "Extra virgin olive oil · White wine vinegar · Dijon mustard · Honey · Shallots",
        method: "1. Whisk vinegar, mustard, honey. 2. Slowly whisk in oil. 3. Fold in fine shallots.",
        allergens: ["mustard"],
        pass: "Stable emulsion · sharp tang · glossy coating",
        station: "Prep",
        menuLayers: {
          core: "Fat-Acid Emulsion",
          bulk: "Oil suspension",
          wet: "Dressing Matrix",
          acid: "White Wine Vinegar",
          finish: "Shallots"
        },
        specLayers: {
          functional: "Stable Temporary Emulsion.",
          control: "RATIO LOCK (3:1) + DRESS-TO-ORDER.",
          output: "Balanced plate-sharpener."
        }
      },
      {
        id: "PREP-029",
        name: "Marie Rose Sauce",
        batchYield: "2L yield",
        portionTool: "50g ramekin",
        shelfLife: "5 days (4°C)",
        ingredients: "House Mayo · Tomato Ketchup · Worcestershire Sauce · Tabasco · Lemon juice · Paprika",
        method: "1. Whisk all components into mayo base. 2. Balance with lemon.",
        allergens: ["eggs", "mustard", "fish (Worcestershire)"],
        pass: "Pale pink · creamy · spicy-sweet-acid balance",
        station: "Prep",
        menuLayers: {
          core: "House Mayo Base",
          bulk: "Emulsion Matrix",
          wet: "Prawn Coating",
          acid: "Lemon + Tomato Acidity",
          finish: "Cayenne dust"
        },
        specLayers: {
          functional: "High-acid stable emulsion.",
          control: "RATIO LOCK (Acid vs Fat).",
          output: "Glossy seafood binder."
        }
      },
      {
        id: "PREP-030",
        name: "Asian Slaw",
        engine: "PREP",
        section: "GARNISH",
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
        engine: "PREP",
        section: "PROTEIN",
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
        engine: "PREP",
        section: "INFUSIONS",
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
        name: "PREP ENGINE v2.5.2 — FAT / MARROW FLOW LAYER (LOCKED)",
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
            quote: "Zero waste loop. Higher perceived value. Consistent flavour. No drift under pressure."
          },
          {
            title: "RESULT",
            content: "Zero waste loop. Higher perceived value without menu change. Consistent flavour layer across engines. No drift under pressure."
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
              "3. SEQUENCE LAW: Soft systems must be built in the correct order; premature combination or incorrect staging creates irreversible drift.",
              "4. REST LAW: Creams, gels, and baked structural components require a defined rest/set window before service release.",
              "5. NO DRIFT LAW: Any bleed, grain, collapse, rubber set, grease leak, or structural inconsistency is an auto-reject."
            ],
            quote: "DESSERT CHECK — NO DRIFT: Cream = smooth + stable | Set = correct tension | Crumble = crisp + dry | No bleed / no grain / no collapse"
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
        engine: "SUNDAY",
        section: "CORE",
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
        portion: "3-4 slices",
        protein: "Beef Sirloin or Topside",
        trim: "Yorkshire pudding · Roast potatoes · Roots · Greens",
        cookTemp: "Target 52°C core (Pink)",
        cook: "High heat sear → Low heat roast → Rest 30 min",
        allergens: ["gluten", "dairy", "eggs"],
        pass: "Clean rims · pink beef · audible potato crunch",
        station: "Sunday Roast",
        menuLayers: {
          core: "Pink Roasted Beef",
          bulk: "Roast Potatoes + Yorkshire Pudding",
          wet: "Galyons Gravy (Finish)",
          acid: "Horseradish / Roots",
          finish: "Pan Juices"
        },
        specLayers: {
          functional: "Large muscle dry-roasting.",
          control: "Core Tech Law (52°C) + 30m Deep Rest.",
          output: "Uniform pink slices."
        },
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
        portion: "One half bird",
        protein: "Brined Chicken",
        trim: "Yorkshire pudding · Roast potatoes · Roots · Greens",
        cookTemp: "74°C core",
        cook: "Steam/Roast combination → High heat skin finish",
        allergens: ["gluten", "dairy", "eggs"],
        pass: "Crisp golden skin · juicy breast meat · vertical build",
        station: "Sunday Roast",
        menuLayers: {
          core: "Half Brined Chicken",
          bulk: "Roast Potatoes + Yorkshire Pudding",
          wet: "Galyons Gravy (Finish)",
          acid: "Seasonal Roots",
          finish: "Buttered Greens"
        },
        specLayers: {
          functional: "Brine-protected moisture + skin render.",
          control: "Skin Snap Law (Dry skin finish) + 74°C safety core.",
          output: "Vertical bird build."
        },
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
        portion: "Individual unit",
        protein: "Nut Roast or Mushroom Wellington",
        trim: "Yorkshire pudding · Roast potatoes · Roots · Veg gravy",
        cookTemp: "75°C core",
        cook: "Bake to order → Glaze roots → Finish with veg gravy",
        allergens: ["gluten", "dairy", "eggs", "nuts"],
        pass: "Equal authority to meat plates · vibrant colour · rich gravy",
        station: "Sunday Roast",
        menuLayers: {
          core: "Nut Roast / Wellington",
          bulk: "Roast Potatoes + Yorkshire Pudding",
          wet: "Vegetarian Gravy",
          acid: "Seasonal Roots",
          finish: "Fresh Herb Oil"
        },
        specLayers: {
          functional: "Umami-dense protein replacement.",
          control: "Heat Retention Law + Pastry Crisp Law (if Wellington).",
          output: "Abundant veggie vertical build."
        },
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
        portion: "4-5 per portion",
        cook: "Par-boil → Steam dry → Rough up → Roast in hot fat",
        allergens: ["none"],
        pass: "Deep golden · audible crust · fluffy centre",
        station: "Veg Station",
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
        portion: "1 large unit",
        cook: "Whisk batter → Rest → Pour into hot fat → Bake 200°C",
        allergens: ["gluten", "dairy", "eggs"],
        pass: "High rise · crisp shell · soft centre · no collapse",
        station: "Oven",
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
        portion: "Side bowl or plate",
        cook: "Blanch cauli → Coat in Béchamel → Add cheese → Bake",
        allergens: ["dairy", "mustard", "gluten"],
        pass: "Golden top · glossy bubbling interior · hot through",
        station: "Veg Station",
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
        portion: "Mixed portion",
        cook: "Prep even batons → Roast until edges colour → Glaze with honey",
        allergens: ["none"],
        pass: "Tender bite · light glaze · edge caramelisation",
        station: "Veg Station",
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
        portion: "Side serving",
        cook: "Blanch → Refresh → Reheat with butter/seasoning to order",
        allergens: ["dairy"],
        pass: "Bright green · hot · seasoned · no excess water",
        station: "Veg Station",
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
        portion: "Side serving",
        cook: "Top & Tail → Blanch → Refresh → Sauté in butter",
        allergens: ["dairy"],
        pass: "Bright green · seasoned · slight bite · no collapse",
        station: "Veg Station",
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
        portion: "Florets or Stems",
        cook: "Cut even florets → Blanch → Refresh → Finish in pan",
        allergens: ["dairy"],
        pass: "Bright colour · tender with bite · neatly presented",
        station: "Veg Station",
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
        portion: "Shredded portion",
        cook: "Slice even → Blanch → Sauté with butter/pepper",
        allergens: ["dairy"],
        pass: "Tender · seasoned · lightly glossy · no heavy liquor",
        station: "Veg Station",
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
        portion: "Side serving",
        cook: "Slow braise with apple/vinegar/spice until glossy",
        allergens: ["none"],
        pass: "Deep colour · glossy finish · tender texture · balanced profile",
        station: "Veg Station",
        menuLayers: {
          core: "Slow-roasted Cabbage",
          bulk: "Reduction Liquor",
          wet: "Syrup Matrix",
          acid: "Apple Cider Vinegar",
          finish: "Glossy reduction"
        },
        specLayers: {
          functional: "Anthocyanin protection via low pH.",
          control: "ANTHOCYANIN LOCK + Slow Reduction Law.",
          output: "Abundant purple gloss."
        },
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
        subtitle: "System Layer: Rejection / Standards / No Drift",
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
        engine: "DESSERT",
        section: "HOT",
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
        engine: "DESSERT",
        section: "PREP",
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
        engine: "DESSERT",
        section: "COLD",
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
        engine: "DESSERT",
        section: "COLD",
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
        engine: "DESSERT",
        section: "COLD",
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
        engine: "DESSERT",
        section: "HOT",
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
              "3. SEQUENCE LAW: Soft systems must be built in the correct order; premature combination or incorrect staging creates irreversible drift.",
              "4. REST LAW: Creams, gels, and baked structural components require a defined rest/set window before service release.",
              "5. NO DRIFT LAW: Any bleed, grain, collapse, rubber set, grease leak, or structural inconsistency is an auto-reject."
            ],
            quote: "DESSERT CHECK — NO DRIFT: Cream = smooth + stable | Set = correct tension | Crumble = crisp + dry"
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
            content: "Production locked in 20 unit batches. Prep scale: 1-20 (1x), 21-40 (2x), 41-60 (3x)."
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

