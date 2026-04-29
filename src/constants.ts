import { Engine } from "./types";
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
    items: [
      {
        id: "PIZZA-001",
        name: "Pizza Dough 65% / 44h",
        batchYield: "5.2kg / 20 balls @ 260g",
        portion: "260g per dough ball",
        portionTool: "Digital scale",
        hydration: "65%",
        ferment: "48h total (3–4h RT + 44h cold)",
        ingredients: "Flour (00): 3.10 kg · Water: 2.01 kg (65%) · Salt: 77 g (2.5%) · Yeast (fresh): 3 g",
        method: "1. MIX: Water in first (20°C) → Add yeast → Add flour → Add salt last. 2. TEMP: Achieve 23°C FDT. 3. BALLING: Scale 260g balls. 4. FERMENT: 48h cold ferment lock.",
        allergens: ["gluten"],
        shelfLife: "72h max",
        station: "Prep → Pizza",
        serviceReady: "Room temp temper 2–4h (Target 18°C internally)",
        failureSigns: ["Overproof (sticky)", "Underproof (tight)"],
        correction: ["Underproof → extend RT bench time"],
        pass: "Elastic · abundant air pockets · matte finish",
        larousse: {
          principle: "Pizza dough is a living system; fermentation creates the digestibility and the structure.",
          method: [
            "HYDRATION LAW: 65% fixed. No deviation without head chef audit.",
            "TEMPERATURE LAW: Target 23°C FDT to regulate yeast activity.",
            "FERMENTATION LOCK: 44h cold ferment minimum for enzymatic breakdown."
          ],
          quality: ["Smooth surface", "Stable gas retention", "High extensibility"],
          faults: ["Sticky surface", "Snap-back (underproof)", "Sour smell"],
          correction: ["Adjust water temp for seasonal drift."]
        },
        fellini: {
          identity: "The foundation of the entire pizza engine.",
          pressurePoint: "Ambient heat spikes destroying proofing window.",
          watchPoint: "FDT (23°C) and ball tension.",
          passSignal: "Elastic stretch to 12 inches without tearing.",
          failureSignal: "Sticky collapse or stubborn snap-back.",
          recoveryMove: "Underproof: move to warmer area. Overproof: move to coldest part of fridge."
        }
      },
      {
        id: "PIZZA-002",
        name: "Tomato Base (San Marzano)",
        batchYield: "10L (approx 110 pizzas)",
        portionTool: "Ladle #2 (90g)",
        shelfLife: "48h",
        ingredients: "San Marzano tomatoes · 100g Salt · 50g Fresh Basil",
        method: "Hand crush · season · chill 2h before use",
        allergens: ["none"],
        failureSigns: ["Metallic taste", "Watery separation", "Fermentation bubbles"],
        correction: ["Drain excess water", "Re-season if flat", "Discard if gassy"],
        pass: "Vibrant red · fresh aroma · chunks visible · no metallic taste",
        station: "Prep",
        larousse: {
          principle: "Tomato sauce for pizza should remain fresh, bright, and minimally worked.",
          method: [
            "Use hand-crush method, not blending.",
            "Season lightly to preserve tomato character.",
            "Avoid long cooking; freshness is the point."
          ],
          quality: [
            "Fresh red colour",
            "Balanced acidity",
            "No metallic or cooked-down heaviness"
          ],
          faults: [
            "Over-seasoned",
            "Too wet",
            "Too reduced"
          ],
          correction: [
            "Adjust salt carefully",
            "Drain excess liquid if needed",
            "Do not simmer down aggressively"
          ]
        },
        fellini: {
          identity: "Bright, raw acidity to cut through fat.",
          pressurePoint: "Oxidation and metallic taint from storage containers.",
          watchPoint: "Water separation; the pulp must hold the juice.",
          passSignal: "Vibrant red color with visible, non-macerated chunks.",
          failureSignal: "Dull orange hue or a thin, watery consistency.",
          recoveryMove: "Drain excess water through a sieve or re-season with 5g salt."
        }
      },
      {
        id: "PIZZA-003",
        name: "Margherita",
        portion: "12 inch / 260g dough",
        price: "£11.50",
        cost: "£3.12",
        gp: "73%",
        dough: "260g FORGE standard (48h)",
        sauce: "90g San Marzano Base",
        cheese: "100g Mozzarella Fiodilatte",
        finish: "Fresh basil · Extra virgin olive oil",
        cookTemp: "420–450°C",
        cookTime: "90–120 sec",
        cook: "420–450°C · 90–120 sec · 180° rotation at 60s",
        allergens: ["gluten", "dairy"],
        pass: "Leopard spotting on rim · cheese fully melted but not oily · dough fully aerated",
        station: "Pizza",
        larousse: {
          principle: "The Margherita is the benchmark for the entire engine; it requires perfect balance between water (mozzarella), acid (tomato), and heat (dough).",
          method: [
            "Stretch to 12 inches with uniform rim thickness.",
            "Ladle 90g sauce in a spiral from centre.",
            "Dot mozzarella evenly to prevent pooling.",
            "Flash bake at peak heat."
          ],
          quality: [
            "Charred 'leopard' spots",
            "Vibrant red/white/green visual",
            "Elastic, light crumb"
          ],
          faults: [
            "Over-saucing causes centre collapse.",
            "Too much cheese masks fermentation and weakens bake.",
            "Poor stretch destroys final structure."
          ],
          correction: [
            "Reduce sauce by 10g if base is wet",
            "Increase floor temp to 420°C",
            "Rotate faster to avoid hot-spot scorching"
          ]
        },
        fellini: {
          identity: "The system's fundamental calibration dish.",
          pressurePoint: "Dough hydration vs floor heat.",
          watchPoint: "The rim (cornicione) expansion.",
          passSignal: "Aerated rim · spotted base",
          failureSignal: "Dense dough · flat rim",
          recoveryMove: "Increase floor heat recovery time"
        }
      },
      {
        id: "PIZZA-004",
        name: "Diavola",
        portion: "12 inch / 260g dough",
        price: "£14.50",
        cost: "£3.85",
        gp: "73%",
        dough: "260g",
        sauce: "90g",
        cheese: "90g",
        topping: "60g Spicy Ventricina Salami + 10g fresh chilli (rounds)",
        cookTemp: "420–450°C",
        cookTime: "90–120 sec",
        cook: "420–450°C · 90–120 sec · 180° rotation at 60s",
        allergens: ["gluten", "dairy"],
        pass: "Salami crisp at edges · visible chilli · glowing red oil release",
        station: "Pizza",
        larousse: {
          principle: "The fat in the salami will render and emulsify with the tomato acid; ensure salami is sliced thin enough to crisp but not burn.",
          method: [
            "Layer salami last to catch direct radiant heat.",
            "Evenly distribute chilli rounds for consistent heat.",
            "Bake until fat release is active and bubbling."
          ],
          quality: [
            "Crisp meat edges",
            "Pungent chilli aroma",
            "Glossy oil sheen"
          ],
          faults: [
            "Burnt salami (bitter)",
            "Cold chilli centres",
            "Excessive grease pooling"
          ],
          correction: [
            "Increase rotation frequency",
            "Drain excess oil with paper towel if required post-bake",
            "Ensure salami is wafer-thin"
          ]
        },
        fellini: {
          identity: "High-fat, high-heat spice pizza.",
          pressurePoint: "Salami fat smoke point.",
          watchPoint: "The 'curl' of the salami.",
          passSignal: "Crisp edges · rendered fat",
          failureSignal: "Pool of liquid fat · burnt salami",
          recoveryMove: "Reduce cheese 10g to balance salami fat"
        }
      },
      {
        id: "PIZZA-005",
        name: "Quattro Formaggi",
        portion: "12 inch / 260g dough",
        price: "£15.50",
        cost: "£4.10",
        gp: "74%",
        dough: "260g",
        cheese: "40g Mozzarella · 30g Gorgonzola · 30g Parmesan · 20g Ricotta",
        cookTemp: "420–450°C",
        cookTime: "90–120 sec",
        cook: "420–450°C · 90–120 sec",
        finish: "Black pepper cracked",
        allergens: ["gluten", "dairy"],
        pass: "Molten cheese landscape · pungent blue notes · golden cheese crust",
        station: "Pizza",
        larousse: {
          principle: "A white pizza (Bianca) where the four cheeses must melt into a single heterogeneous layer while retaining their individual flavour pockets.",
          method: [
            "Apply cheeses in order of melting point: Ricotta → Mozzarella → Gorgonzola → Parmesan.",
            "Do not add tomato sauce; the fats from the cheese provide the moisture.",
            "Finish with pepper immediately out of the oven."
          ],
          quality: [
            "Rich, creamy texture",
            "Sharp parmesan bite",
            "Pungent blue cheese depth"
          ],
          faults: [
            "Split cheese fat (oily)",
            "Unmelted blue cheese clumps",
            "Burnt bottom base"
          ],
          correction: [
            "Lower floor heat slightly for white pizzas",
            "Whisk ricotta slightly to loosen before applying",
            "Ensure even distribution"
          ]
        },
        fellini: {
          identity: "Bianca (White) cheese-mass system.",
          pressurePoint: "Fat separation from high cheese volume.",
          watchPoint: "Bubble size; indicates water boiling off cheese.",
          passSignal: "Heterogeneous melt · golden blisters",
          failureSignal: "Grease lake in centre",
          recoveryMove: "Lower cheese mass by 5% total"
        }
      },
      {
        id: "PIZZA-006",
        name: "Nduja & Honey",
        portion: "12 inch / 260g dough",
        price: "£15.00",
        cost: "£3.90",
        gp: "74%",
        dough: "260g",
        sauce: "90g",
        cheese: "90g",
        topping: "40g Nduja (dotted) + 5g fresh red chilli (rounds)",
        finish: "15ml Hot Honey drizzle",
        cookTemp: "420–450°C",
        cookTime: "90–120 sec",
        cook: "420–450°C · 90–120 sec · 180° rotation at 60s",
        allergens: ["gluten", "dairy"],
        pass: "Nduja rendered · spicy oil sheen · sweet honey finish · vibrant red",
        station: "Pizza",
        larousse: {
          principle: "The Nduja provides intense heat and fat, which is perfectly balanced by the floral sweetness of the honey applied post-bake.",
          method: [
            "Apply Nduja in small 5g dots.",
            "Bake as standard.",
            "Drizzle honey in a spiral from centre after exiting oven."
          ],
          quality: [
            "Spice-sweet balance",
            "Glossy appearance",
            "Pungent aromatics"
          ],
          faults: [
            "Over-honeying (cloying)",
            "Burnt Nduja",
            "Soggy centre"
          ],
          correction: [
            "Control honey pour with precision nozzle",
            "Rotate frequently"
          ]
        },
        fellini: {
          identity: "Sweet/Heat balance pizza.",
          pressurePoint: "Honey viscosity and application timing.",
          watchPoint: "Balance of oil vs honey.",
          passSignal: "Red oil gloss · honey sheen",
          failureSignal: "Sticky mess · burnt meat",
          recoveryMove: "Apply honey sparingly"
        }
      }
    ],
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
              "ACID BALANCE: San Marzano standard. Add 10g salt per 1kg tomatoes. No sugar.",
              "MINIMAL WORK: Hand-crush only. Blending destroys cell structure and causes oxidation."
            ]
          }
        ]
      }
    ],
  },
  burger: {
    label: "BURGER ENGINE",
    icon: "🍔",
    color: "#E8B84B",
    station: "Grill / Assembly",
    tag: "CORE",
    items: [
      {
        id: "BURGER-001",
        status: "ACTIVE",
        name: "Galyons Beef Burger (230g)",
        station: "Grill",
        portion: "230g Patty",
        ingredients: "Beef patty (230g / 20% fat) · Brioche bun · American cheese (2 slices) · Lettuce (20g) · Tomato (2 slices) · House burger sauce (30g)",
        method: "1. Season patty just before cooking. 2. Sear high heat → 5 min first side. 3. Flip once (SINGLE FLIP LAW) → add cheese. 4. Cloche steam 60 sec. 5. Rest 3 min. 6. Toast bun, sauce base/top, stack vertical.",
        allergens: ["gluten", "dairy"],
        pass: "Cheese fully melted · Stack stable/vertical · No collapse · Audible bun toast",
        executionCard: {
          setup: ["High heat flat top / Grill", "Cloche", "Infrared thermometer", "Offset spatula"],
          build: ["Toast bun", "Sauce base + top", "Lettuce base", "Tomato", "Patty/Cheese", "Seal top"],
          timeLaw: "Cook: 10–11 min total | Rest: 3 min | Build: 30 sec",
          failures: ["Multiple flips (juice loss)", "No rest (soggy/dry finish)", "Overstack (collapse)"],
          reset: ["Clear station", "Scrape grill", "Check brioche par"]
        },
        fellini: {
          identity: "Protein Mass & Thermal Control System",
          controlLaw: "THE SINGLE FLIP LAW: Burger is flipped once only to preserve Maillard crust and ensure maximum juice retention in the 20% fat matrix.",
          validationPoints: {
            postPrep: "Patty shape intact (no tears), seasoning applied just-in-time.",
            preService: "Bun toasted to moisture-barrier stage, garnish chilled/ready.",
            atPass: "Cheese melted to 'velvet' stage, vertical stack alignment stable."
          },
          autoReject: ["Burnt crust", "Cold centre (<55°C if medium)", "Broken vertical stack"],
          verdict: "PASS"
        },
        larousse: {
          principle: "The vertical emulsion of fat/acid. Moisture barrier is key to structural integrity.",
          method: [
            "Maillard reaction must be locked on first side before flip.",
            "Resting phase (3 min) is non-negotiable for juice redistribution.",
            "High-heat cloche steam ensure cheese adhesion without overcooking."
          ],
          quality: ["Juicy interior", "Clean snap on garnish", "Soft but structured bun"],
          faults: ["Soggy bottom", "Raw centre", "Grease bleed from un-rested meat"],
          correction: ["Extend resting time", "Check grill surface temp (target 220°C+)"]
        }
      },
      {
        id: "BURGER-002",
        status: "ACTIVE",
        name: "Double Stack Burger (2x150g)",
        station: "Grill",
        portion: "2x 150g Patties",
        ingredients: "2x Beef patties (150g each) · Brioche bun · American cheese (2 slices) · Pickles (20g) · Burger sauce (30g)",
        method: "1. Cook patties simultaneously. 2. Flip once (SYNCHRONISATION LAW). 3. Cheese on both. 4. Stack immediately. 5. Compact stack, tight build.",
        allergens: ["gluten", "dairy"],
        pass: "Uniform melt · Balanced symmetry · Stable stack · Thermal integrity",
        executionCard: {
          setup: ["High heat flat top / Grill", "Cloche", "Offset spatula"],
          build: ["Simultaneous patty sear", "Paired cheese melt", "Compact vertical stack"],
          timeLaw: "Cook: 8–9 min | Build: 20 sec",
          failures: ["Uneven cook (rejection)", "Delay (cold stack)"],
          reset: ["Clear station", "Scrape grill"]
        },
        fellini: {
          identity: "Speed-of-service Double Protein System",
          controlLaw: "THE SYNCHRONISATION LAW: Both patties must finish simultaneously to ensure unified thermal core and consistent cheese adhesion across the stack.",
          validationPoints: {
            postPrep: "Patties equal size/mass, seasoning ready.",
            preService: "Grill surface temp verified, station clear.",
            atPass: "Melt symmetry, stack stability, tight build alignment."
          },
          autoReject: ["Uneven patties", "Sliding stack", "Cold core in secondary patty"],
          verdict: "PASS"
        },
        larousse: {
          principle: "Coordinated thermal transformation of multiple protein units.",
          method: [
            "Patties must be loaded in synchronized pairs.",
            "Cheese application must be simultaneous to lock heat.",
            "The compact build sequence must occur within the 20s window."
          ],
          quality: ["Symetrical build", "Even melt", "Compact mouthfeel"],
          faults: ["Staggered finish", "Loose stack", "Moisture loss from delayed build"],
          correction: ["Standardize plancha load zones", "Check paired spatula workflow"]
        }
      },
      {
        id: "BURGER-003",
        status: "ACTIVE",
        name: "Chipotle Buttermilk Chicken Burger",
        station: "Fry / Grill",
        portion: "180g Thigh",
        ingredients: "Chicken thigh (180g buttermilk marinated) · Seasoned flour dredge · Brioche bun · Slaw (40g) · Chipotle mayo (30g)",
        method: "1. Dredge chicken → fry at 180°C. 2. Cook until golden + internal temp safe. 3. Rest 1 min. 4. Sauce base, chicken, slaw top, lid.",
        allergens: ["gluten", "dairy", "mustard"],
        pass: "Audible crunch · No oil bleed · Golden coating · Vibrant slaw",
        executionCard: {
          setup: ["Deep fat fryer (180°C)", "Timer", "Internal thermometer", "Dredge station"],
          build: ["Sauce base", "Chicken (rested)", "Slaw top", "Lid"],
          timeLaw: "Fry: 6–7 min | Build: 30 sec",
          failures: ["Soft crust (fail)", "Oil soak (fail)"],
          reset: ["Check oil quality", "Clear crumbs from fry station"]
        },
        fellini: {
          identity: "Crunch-forward Protein System",
          controlLaw: "THE CRUST LAW: Chicken must audibly crunch on bite. The buttermilk/flour interface must be dehydrated in the fryer to create a rigid, non-greasy shield around the moist thigh matrix.",
          validationPoints: {
            postPrep: "Coating even (no bald patches), dredge fully hydrated before fry.",
            preService: "Oil temp verified 180°C, station clear.",
            atPass: "Crunch intact, no oil bleed on paper/bun."
          },
          autoReject: ["Pale coating", "Greasy finish", "Soft/Soggy crust"],
          verdict: "PASS"
        },
        larousse: {
          principle: "Dehydration of surface starch for textural preservation.",
          method: [
            "Maintain 180°C to prevent oil ingress during the cook.",
            "Resting phase (1 min) on wire rack is critical for structural setting.",
            "Acid/Heat balance from slaw and chipotle mayo provides the palate reset."
          ],
          quality: ["Uniform golden colour", "Moist interior", "Clean snap"],
          faults: ["Lead-heavy coating", "Undercooked core (near bone)", "Soggy slaw"],
          correction: ["Monitor dredge thickness", "Verify fryer recovery time"]
        }
      },
      {
        id: "BURGER-004",
        status: "ACTIVE",
        name: "BBQ Pulled Pork Burger",
        station: "Prep / Grill",
        portion: "180g Pulled Pork",
        ingredients: "Pulled pork (180g) · Brioche bun · BBQ sauce (30g) · Apple slaw (40g)",
        method: "1. Reheat pork gently (maintain moisture). 2. Sauce lightly with BBQ glaze. 3. Build immediately: Pork base, Apple slaw top. 4. Clean close.",
        allergens: ["gluten", "mustard"],
        pass: "Vibrant acid contrast · Moist pork texture · Clean stack · No sauce bleed",
        executionCard: {
          setup: ["Heat lamp / Induction", "Tongs", "Clean build surface"],
          build: ["Toasted bun", "BBQ Pulled Pork", "Apple Slaw", "Bun lid"],
          timeLaw: "Reheat: 5 min | Build: 20 sec",
          failures: ["Dry pork (fail)", "No acid cut (heavy dish)"],
          reset: ["Wipe build zone", "Refresh slaw garnish"]
        },
        fellini: {
          identity: "Soft Protein & Acid Cut System",
          controlLaw: "THE BALANCE LAW: The high lipid content of the pulled pork MUST be cut by the immediate application of fresh acidity (apple slaw). Failure to apply the acid component results in a 'heavy' palate failure and system rejection.",
          validationPoints: {
            postPrep: "Pork moist/tender (not mushy), BBQ base balanced.",
            preService: "Slaw freshly dressed (crisp), reheat temp verified.",
            atPass: "Structural balance, acid contrast, clean bun finish."
          },
          autoReject: ["Dry texture", "Sauce overload (drowning pork)", "Absence of acid component"],
          verdict: "PASS"
        },
        larousse: {
          principle: "Lipid vs. Acid synergy. Textural softness requires a crisp counterpoint.",
          method: [
            "Reheating must be moist-heat only (steam or covered induction).",
            "BBQ sauce is a seasoning, not a primary liquid volume.",
            "Apple slaw must provide the structural 'crunch' layer."
          ],
          quality: ["Deep smoke profile", "Bright apple acidity", "Soft yielding protein"],
          faults: ["Aggressive reheat (toughening)", "Soggy bun base", "Warm slaw"],
          correction: ["Recover with fresh slaw", "Check steam-table moisture levels"]
        }
      },
      {
        id: "BURGER-005",
        status: "ACTIVE",
        name: "New York Burger (Pastrami)",
        station: "Grill / Prep",
        portion: "230g Patty + 60g Pastrami",
        ingredients: "Beef patty (230g) · Sliced pastrami (60g) · Swiss cheese (2 slices) · Deli mustard (20g) · Pickles (20g) · Brioche bun",
        method: "1. Cook beef patty as BURGER-001 protocol. 2. Heat pastrami separately on plancha/steam. 3. Melt Swiss cheese over beef. 4. Layer mustard, pickles, beef/cheese, pastrami. 5. Stack tight, no overbuild.",
        allergens: ["gluten", "dairy", "mustard"],
        pass: "Stable vertical stack · Swiss cheese fully melted · Hot pastrami · Vibrant mustard line",
        executionCard: {
          setup: ["High heat flat top", "Steam cloche", "Spatula", "Deli paper"],
          build: ["Toasted brioche", "Mustard base", "Pickles", "Beef/Swiss", "Pastrami pile", "Lid"],
          timeLaw: "Cook: 10 min | Build: 30 sec",
          failures: ["Overstack collapse (fail)", "Cold pastrami (fail)"],
          reset: ["Clean grill", "Check pastrami par"]
        },
        fellini: {
          identity: "Beef + Pastrami Umami Stack System",
          controlLaw: "THE STACK LAW: Layers must remain stable under the specific gravitational weight of the pastrami density. Improper layering or lack of Swiss cheese 'glue' will result in structural system failure.",
          validationPoints: {
            postPrep: "Beef/Pastrami components ready and weighed.",
            preService: "Pastrami at thermal serving temp, station clear.",
            atPass: "Stable vertical alignment, no slide, optimal heat throughout stack."
          },
          autoReject: ["Structural failure (lean/slide)", "Cold pastrami", "Imbalance of protein mass"],
          verdict: "PASS"
        },
        larousse: {
          principle: "The amalgamation of cured and fresh bovine proteins.",
          method: [
            "Pastrami must be flashed with steam to restore moisture before stacking.",
            "Swiss cheese acts as the binding adhesive between the two protein layers.",
            "Deli mustard provides the necessary acid bridge to cut the dual fat loading."
          ],
          quality: ["Rich multi-layer umami", "Clean vertical cut", "Warm/Soft textures"],
          faults: ["Dry pastrami", "Un-melted Swiss", "Structural collapse"],
          correction: ["Increase steam time for pastrami", "Use weighted cloche for melt"]
        }
      },
      {
        id: "BURGER-006",
        name: "The Galyons Vegan (Specialist)",
        portion: "200g Plant Patty",
        price: "£15.00",
        cost: "£4.00",
        gp: "73%",
        ingredients: "Beyond/House Mix · Vegan Cheese · Vegan Mayo · Kimchi · Sesame Bun",
        method: "1. Pan-sear (separate surface). 2. Melt vegan mozzarella. 3. Kimchi acid spike.",
        allergens: ["gluten", "sesame"],
        pass: "Perfect plant-melt · fermentation spike · clean sesame toast",
        station: "Grill / Cold",
        larousse: {
          principle: "High-protein plant matrix stabilization. Umami substitute check.",
          method: [
            "Use separate dedicated surface for plant patties.",
            "Kimchi must be drained (DRAIN LAW) to prevent bun rot.",
            "Vegan cheese requires moisture (steam flash) to melt optimally."
          ],
          quality: ["Seared exterior", "Acid bite", "Clean melt"],
          faults: ["Rubber texture", "Cold cheese", "Soggy base"],
          correction: ["Increase pan heat for plant protein sear"]
        },
        fellini: {
          identity: "The clean plant profile with deep fermented secondary notes.",
          pressurePoint: "Cross-contamination + melt time.",
          watchPoint: "Kimchi drainage.",
          passSignal: "Upright stack + pink plant interior"
        }
      }
    ],
    operationalLayers: [
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
    items: [
      {
        id: "MAIN-001",
        name: "Aged Ribeye",
        portion: "300g (dry-aged 28 days)",
        price: "£28.50",
        cost: "£8.50",
        gp: "70%",
        weight: "300g (dry-aged 28 days)",
        cookTemp: "Grill",
        cookTime: "4 min per side",
        cook: "Grill 4 min per side · Core 52°C for Med-Rare",
        rest: "5 min in warm area (50°C)",
        allergens: ["none"],
        pass: "Deep Maillard crust · uniform internal colour · relaxed muscle fibres · no blood pooling",
        station: "Grill",
        larousse: {
          principle: "Aged beef requires high-intensity heat followed by a significant rest period to equalise internal pressure.",
          method: [
            "Temper steak for at least 30 mins before cooking.",
            "Season aggressively with coarse salt just before hitting the grill.",
            "Rest for a minimum of 5 minutes in a warm area."
          ],
          quality: ["Deep Maillard crust", "Uniform internal colour", "Relaxed muscle fibres"],
          faults: ["Grey band", "Cold centre", "Blood pooling"],
          correction: ["Increase grill temperature for better crust", "Rest longer if steak is thick"]
        },
        fellini: {
          identity: "Fire-driven protein with precision rest.",
          pressurePoint: "Overcook during service rush.",
          watchPoint: "Rest time + carryover heat.",
          passSignal: "Crust · correct doneness · juice retention",
          failureSignal: "Grey banding · dry cut",
          recoveryMove: "Shorter cook · longer rest"
        }
      },
      {
        id: "MAIN-002",
        name: "Chicken Parmigiana",
        portion: "200g breast",
        price: "£17.50",
        cost: "£3.95",
        gp: "77%",
        protein: "200g Chicken breast · hammered to 1cm uniform thickness",
        build: "Breaded chicken → 60g Tomato base (centre only) → 60g Mozzarella",
        cookTemp: "Oven / Broiler",
        cookTime: "90 sec flash",
        finish: "Broil 90s until bubbling · Garnish with fresh basil",
        allergens: ["gluten", "dairy", "eggs"],
        pass: "Melted top · hot centre · crisp breading perimeter · no sauce bleed",
        station: "Hot",
        larousse: {
          principle: "The Parmigiana is a balance of textures: crisp breading, bright sauce, and elastic cheese.",
          method: [
            "Ensure chicken is hammered to even thickness.",
            "Apply sauce only to the centre to keep edges crisp.",
            "Flash under broiler until cheese is bubbling."
          ],
          quality: ["Crisp breading", "Molten cheese", "Hot juicy chicken"],
          faults: ["Soggy breading", "Tough chicken", "Cold tomato sauce"],
          correction: ["Reduce sauce volume", "Use higher broiler heat"]
        },
        fellini: {
          identity: "Crisp + melt contrast dish.",
          pressurePoint: "Soggy crumb from sauce overload.",
          watchPoint: "Crumb integrity.",
          passSignal: "Crisp base · melted top",
          failureSignal: "Wet crumb",
          recoveryMove: "Reduce sauce before bake"
        }
      },
      {
        id: "MAIN-003",
        name: "Pan-Seared Sea Bass",
        portion: "140g fillet",
        price: "£22.50",
        cost: "£5.85",
        gp: "74%",
        protein: "140g Sea bass fillet · skin-on · scaled",
        cookTemp: "Pan",
        cookTime: "4 min total",
        method: "Pan sear in 10ml oil · Skin-side 3 min · Flesh finish 1 min",
        finish: "10g Bone marrow butter finish",
        allergens: ["fish", "dairy"],
        pass: "Skin fully rendered · audible crisp · no albumin flooding · moist translucent flesh",
        station: "Hot",
        larousse: {
          principle: "Fish skin must be rendered of its fat to achieve crispness, while the flesh remains delicate.",
          method: [
            "Dry the skin thoroughly before searing.",
            "Apply constant pressure with a spatula for 30s.",
            "Finish with butter and aromatics to baste flesh."
          ],
          quality: ["Glass-like skin", "Flaky moist flesh", "No albumin leakage"],
          faults: ["Rubbery skin", "Dry flesh", "Fish sticking"],
          correction: ["Increase pan heat", "Reduce flesh-side time"]
        },
        fellini: {
          identity: "Skin-crisp precision fish.",
          pressurePoint: "Skin softens instantly under delay.",
          watchPoint: "Pan heat + holding time.",
          passSignal: "Crisp skin · moist flesh",
          failureSignal: "Soft skin · albumin bleed",
          recoveryMove: "Dry skin · hotter pan"
        }
      },
      {
        id: "MAIN-004",
        name: "Ale Battered Fish & Chips",
        portion: "180g fillet",
        price: "£16.50",
        cost: "£3.65",
        gp: "78%",
        protein: "180g Haddock fillet · skinless",
        batter: "100ml Ale batter · chilled to 4°C",
        cookTemp: "Fryer",
        cookTime: "5-7 min",
        fry: "180°C · 5–7 min until deep gold",
        allergens: ["gluten", "fish"],
        pass: "Fully adhered batter · Crisp, dry shell · Moist, flaky fish · Even golden colour",
        station: "Fry",
        larousse: {
          principle: "Moisture management is key; fish must be bone-dry before battering to prevent steam separation.",
          method: [
            "Portion fillets to even thickness.",
            "MOISTURE LAW: Dry thoroughly with blue roll.",
            "Dip in batter and transfer to fryer within 10s."
          ],
          quality: ["Light bubbly batter", "Moist steamed fish", "Even gold color"],
          faults: ["Batter detached", "Greasy shell", "Pale color"],
          correction: ["Check oil temperature (180°C)", "Ensure batter is cold"]
        },
        fellini: {
          identity: "Fry benchmark dish focusing on moisture management.",
          pressurePoint: "Moisture trapped under batter causes separation.",
          watchPoint: "Surface dryness before flouring.",
          passSignal: "Crisp batter · dry finish · adhered shell",
          failureSignal: "Greasy batter · detached shell",
          recoveryMove: "Fry smaller batches · reset oil temp"
        }
      },
      {
        id: "MAIN-005",
        name: "Beef Lasagne",
        portion: "400g pre-batch portion",
        price: "£15.50",
        cost: "£3.45",
        gp: "78%",
        cookTemp: "Oven",
        cookTime: "15 min",
        method: "Oven finish 180°C · 15 min · Core 75°C",
        finish: "Grated parmesan + 5ml herb oil",
        allergens: ["gluten", "dairy", "eggs"],
        pass: "Hot centre · holds shape on plate · bubbling edges · golden top",
        station: "Hot",
        larousse: {
          principle: "A layered pasta dish where the ragu and béchamel must emulsify during the final bake.",
          method: [
            "Allow lasagne to rest for 5 min after oven to set layers.",
            "Ensure full sauce coverage to avoid dry pasta edges.",
            "Check core temp with probe."
          ],
          quality: ["Visible layers", "Rich ragu", "Stable béchamel"],
          faults: ["Cold centre", "Runny ragu", "Dry pasta edges"],
          correction: ["Increase bake time", "Ensure 5 min rest"]
        },
        fellini: {
          identity: "Structured pasta build.",
          pressurePoint: "Layer collapse from over-wet ragu.",
          watchPoint: "Ragu reduction in prep.",
          passSignal: "Clean vertical slice",
          failureSignal: " Ragù puddle",
          recoveryMove: "Flash bake to reduce moisture"
        }
      },
    ],
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
    items: [
      {
        id: "STARTER-001",
        name: "Calamari Fritti",
        portion: "150g Squid rings & tentacles · 30g Lemon aioli",
        price: "£9.50",
        cost: "£1.95",
        gp: "79%",
        cookTemp: "Fryer",
        cookTime: "2 min",
        method: "Dust in seasoned flour · Fry 180°C · 2 min",
        finish: "Lemon wedge · Fresh parsley",
        allergens: ["molluscs", "gluten", "eggs"],
        pass: "Crisp pale gold · tender bite · no rubberiness · salt visible",
        station: "Fry",
        larousse: {
          principle: "Squid requires either very fast or very slow cooking; the 'fritti' method relies on rapid heat to set the protein without toughening.",
          method: [
            "Ensure squid is completely dry before flouring to avoid 'clumping'.",
            "Shake off excess flour to prevent oil contamination.",
            "Salt immediately upon exiting the fryer while oil is still tacky."
          ],
          quality: ["Tender, non-chewy squid", "Light, crisp coating", "Clean oil flavour"],
          faults: ["Rubbery texture", "Soggy coating", "Excessive salt"],
          correction: ["Reduce fry time", "Check oil temp (180°C)", "Ensure flour is seasoned"]
        },
        fellini: {
          identity: "A flash-fried study in tenderness and salt.",
          pressurePoint: "Oil temperature recovery between batches.",
          watchPoint: "The shake; excess flour must be removed to prevent oil sludge.",
          passSignal: "A pale gold, crisp coating that shatters to reveal tender squid.",
          failureSignal: "Rubbery texture or a soggy, oil-soaked coating.",
          recoveryMove: "Salt immediately and serve; if rubbery, reduce fry time by 15s."
        }
      },
      {
        id: "STARTER-002",
        name: "Bruschetta Pomodoro",
        portion: "2 slices sourdough",
        price: "£7.50",
        cost: "£1.45",
        gp: "81%",
        cookTemp: "Grill",
        cookTime: "2 min",
        method: "Char sourdough → Rub with garlic → Top with tomato mix",
        finish: "Balsamic glaze · Fresh basil",
        allergens: ["gluten"],
        pass: "Crisp bread · vibrant seasoned tomatoes · aromatic garlic",
        station: "Cold",
        larousse: {
          principle: "The contrast between hot, charred bread and cold, seasoned tomatoes is the soul of this dish.",
          method: [
            "Dice tomatoes to 5mm cubes.",
            "Marinate with olive oil, sea salt, and basil for 30 mins.",
            "Char bread until dark grill lines appear."
          ],
          quality: ["Crisp base", "Juicy tomatoes", "Garlic punch"],
          faults: ["Soggy bread", "Unseasoned tomatoes", "Burnt garlic"],
          correction: ["Toast bread fresh", "Balance acidity", "Rub garlic gently"]
        },
        fellini: {
          identity: "Simple texture contrast benchmark.",
          pressurePoint: "Tomato juice soaking bread.",
          watchPoint: "Plating speed.",
          passSignal: "Crunch base",
          failureSignal: "Bread collapse",
          recoveryMove: "Drain tomato mix before topping"
        }
      },
      {
        id: "STARTER-003",
        name: "Buffalo Wings (Fire)",
        portion: "6 wings (approx 300g) · 40g Fire glaze",
        price: "£8.50",
        cost: "£1.85",
        gp: "78%",
        cookTemp: "Grill",
        cookTime: "8 min",
        method: "Grill 8 min (4 min per side) · Glaze in bowl · Flash 1 min",
        finish: "5g Sliced spring onion · 2g Sesame seeds",
        allergens: ["mustard", "sesame"],
        pass: "Sticky charred skin · hot to the bone · glaze fully reduced to a lacquer",
        station: "Grill",
        larousse: {
          principle: "Wings must be rendered of subcutaneous fat before glazing to ensure the sauce adheres to skin, not fat.",
          method: [
            "Cook wings to 75°C core before applying glaze.",
            "Toss in a warm bowl to ensure even coating.",
            "Flash on the hottest part of the grill to caramelise sugars in the sauce."
          ],
          quality: ["Crisp, rendered skin", "Succulent meat", "Balanced sweet/heat glaze"],
          faults: ["Flabby skin", "Cold bone centre", "Burnt glaze"],
          correction: ["Increase initial grill time", "Probe bone temp", "Move to cooler zone"]
        },
        fellini: {
          identity: "Sticky, charred, and hot to the bone.",
          pressurePoint: "Glaze reduction vs skin char.",
          watchPoint: "The bone temperature; it must be searingly hot.",
          passSignal: "A glossy, lacquered skin with a clean, spicy heat.",
          failureSignal: "Dry meat or a thin, watery glaze that doesn't stick.",
          recoveryMove: "Toss in a fresh bowl with extra glaze and flash on the grill."
        }
      },
      {
        id: "STARTER-004",
        name: "Arancini (Mushroom)",
        portion: "3 balls (50g each) · 30g Truffle mayo",
        price: "£8.00",
        cost: "£1.65",
        gp: "79%",
        cookTemp: "Fryer",
        cookTime: "4 min",
        method: "Fry 180°C · 4 min · Core 75°C",
        finish: "Grated parmesan · Micro-herbs",
        allergens: ["gluten", "dairy", "eggs", "mustard"],
        pass: "Crunchy shell · molten risotto core · uniform golden colour",
        station: "Fry",
        larousse: {
          principle: "The arancino must have a structural exterior that yields to a creamy, emulsified rice interior.",
          method: [
            "Ensure risotto is fully chilled before shaping.",
            "Use a double-crumb (panko) for extra crunch and protection.",
            "Fry from chilled to ensure the centre melts as the exterior crisps."
          ],
          quality: ["Crisp, dry exterior", "Creamy, seasoned rice", "Distinct truffle aroma"],
          faults: ["Bursting in the fryer", "Cold, grainy centre", "Oily coating"],
          correction: ["Ensure crumb is complete", "Increase fry time", "Check oil temp"]
        },
        fellini: {
          identity: "A crunchy, golden sphere with a molten, aromatic heart.",
          pressurePoint: "Shell integrity vs core melting point.",
          watchPoint: "The 'burst' in the fryer; indicates a gap in the crumb.",
          passSignal: "A dry, crunchy exterior that yields to a creamy, hot center.",
          failureSignal: "Oil-soaked coating or a cold, grainy rice core.",
          recoveryMove: "Check core temp with a probe; if cold, flash in the oven for 60s."
        }
      },
      {
        id: "STARTER-005",
        name: "Burrata & Heritage Tomato",
        portion: "125g Burrata ball · 100g Heritage tomatoes",
        price: "£10.50",
        cost: "£2.85",
        gp: "73%",
        cookTemp: "Ambient",
        cookTime: "Assembly only",
        build: "Sliced tomatoes → Burrata centre → 10ml Basil oil → 2g Sea salt",
        allergens: ["dairy"],
        pass: "Creamy centre release on cut · vibrant tomato colours · room temp burrata",
        station: "Cold",
        larousse: {
          principle: "The quality of this dish is entirely dependent on the temperature of the cheese and the ripeness of the fruit.",
          method: [
            "Temper Burrata at room temperature for 30 mins before service.",
            "Slice tomatoes to various shapes for visual texture.",
            "Do not refrigerate tomatoes; destroys cellular structure and flavour."
          ],
          quality: ["Molten stracciatella centre", "Sweet, ripe tomato profile", "Fragrant basil finish"],
          faults: ["Ice-cold cheese center", "Mealy tomatoes", "Excessive oil"],
          correction: ["Increase tempering time", "Use vine-ripened fruit", "Control oil pour"]
        },
        fellini: {
          identity: "The temperature-sensitive heart of the cold station.",
          pressurePoint: "Burrata core temperature vs ambient room temp.",
          watchPoint: "Tomato ripeness; they must be at peak sugar levels.",
          passSignal: "A molten stracciatella release when the burrata is pierced.",
          failureSignal: "Ice-cold cheese center or mealy, underripe tomatoes.",
          recoveryMove: "Temper the burrata in a warm area of the kitchen for 15 mins."
        }
      },
      {
        id: "STARTER-006",
        name: "Antipasti Misto",
        portion: "Sharing platter for 2",
        price: "£12.50",
        cost: "£3.85",
        gp: "69%",
        cookTemp: "Ambient",
        cookTime: "Assembly only",
        build: "Cured meats → Olives → Pickles → Focaccia",
        finish: "Herb oil drizzle",
        allergens: ["gluten"],
        pass: "Varied textures · fresh cuts · room temp meats",
        station: "Cold",
        larousse: {
          principle: "Meats must be sliced ultra-thin to allow for optimal melting on the palate.",
          method: [
            "Slice Prosciutto to 0.5mm thickness.",
            "Arrange loosely on board to create height.",
            "Serve with warm focaccia."
          ],
          quality: ["Sheen on meats", "Firm olives", "Tangy pickles"],
          faults: ["Thick meat cuts", "Cold bread", "Oxidised meats"],
          correction: ["Adjust slicer blade", "Warm bread fresh", "Slice to order"]
        },
        fellini: {
          identity: "Curated cold assembly.",
          pressurePoint: "Slicer speed vs board detail.",
          watchPoint: "Meat oxidation.",
          passSignal: "Vertical height and sheen",
          failureSignal: "Flat, grey appearance",
          recoveryMove: "Light oil brush on meats"
        }
      }
    ],
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
    items: [
      {
        id: "SIDE-001",
        name: "Triple Cooked Chips",
        portion: "250g portion · 5g Sea salt",
        batchYield: "Shift batch",
        price: "£5.50",
        cost: "£0.85",
        gp: "81%",
        shelfLife: "Post-second fry: 30–45 min max hold",
        ingredients: "Maris Piper potatoes · Sunflower oil · Sea salt",
        method: "1. Cut 12–15mm & Rinse clear. 2. Blanch fry (140°C / 6–8m). 3. Air-dry completely. 4. Second fry (170°C / 2–3m). 5. Final fry to order (190°C / 2–3m).",
        allergens: ["none"],
        pass: "Audible crisp shell · Dry surface (no oil sheen) · Fluffy interior · Even golden colour",
        station: "Fry",
        larousse: {
          principle: "ROOT LAYER: Moisture removal + starch gelatinisation → crisp exterior, fluffy core.",
          method: [
            "Cut to uniform 12–15 mm chips.",
            "Rinse cut chips until water runs clear.",
            "DRYING LAW: Chips must be visibly dry before second fry."
          ],
          quality: ["Audible crunch", "Steamy, floury interior", "Deep gold colour"],
          faults: ["Soggy texture", "Burnt edges", "Oily mouthfeel"],
          correction: ["Ensure chips are dry", "Check oil temp", "Reduce batch size"]
        },
        fellini: {
          identity: "OPERATOR TRUTH: Chips are not fried — they are dried in stages.",
          pressurePoint: "Moisture trapped in core. Holding kills texture.",
          watchPoint: "Surface dryness before second fry.",
          passSignal: "Audible glass-like crunch + fluffy centre",
          failureSignal: "Soft exterior or greasy sheen",
          recoveryMove: "Final flash at 190°C for 2 mins"
        }
      },
      {
        id: "SIDE-002",
        name: "Skin-on Fries",
        portion: "200g portion · 3g Sea salt",
        price: "£4.50",
        cost: "£0.65",
        gp: "82%",
        cookTemp: "Fryer",
        cookTime: "3 min",
        method: "Fry 180°C · 3 min · Shake vigorously",
        finish: "Sea salt touch",
        allergens: ["none"],
        pass: "Crisp and upright · uniform gold · dry surface",
        station: "Fry",
        larousse: {
          principle: "The smaller surface area of fries compared to chips means they lose heat faster; speed from fryer to table is critical.",
          method: [
            "Check oil temperature regularly (180°C).",
            "Salt immediately while oil is tacky.",
            "Do not over-fill the basket."
          ],
          quality: ["Snap crispness", "Hot core", "Clean taste"],
          faults: ["Soggy", "Cold", "Oily"],
          correction: ["Small batches only", "Fast service", "Dry fries well"]
        },
        fellini: {
          identity: "High-volume speed side.",
          pressurePoint: "Oil temp recovery.",
          watchPoint: "Salt adhesion.",
          passSignal: "Unerring crunch",
          failureSignal: "Limp fries"
        }
      },
      {
        id: "SIDE-003",
        name: "Buttered Seasonal Greens",
        portion: "150g mixed greens",
        price: "£4.50",
        cost: "£0.95",
        gp: "74%",
        cookTemp: "Stove / Pan",
        cookTime: "3 min",
        method: "Blanch 2 min → Sauté with butter and seasoned salt",
        finish: "Lemon zest touch",
        allergens: ["dairy"],
        pass: "Bright green · glossy butter coating · al dente bite",
        station: "Veg",
        larousse: {
          principle: "Chlorophyll preservation requires short cooking times and immediate serving.",
          method: [
            "Use salted water for blanching.",
            "Shock in ice water if not for immediate service.",
            "Emulsify butter with a touch of cooking water for a glossy coat."
          ],
          quality: ["Snap", "Vibrant green", "Butter sheen"],
          faults: ["Grey/Overcooked", "Dry", "Bland"],
          correction: ["Reduce cook time", "Mount with more butter", "Balance with salt"]
        },
        fellini: {
          identity: "Freshness benchmark.",
          pressurePoint: "Over-boiling in rush.",
          watchPoint: "Color transition from bright to dull.",
          passSignal: "Snap + gloss",
          failureSignal: "Grey wilt"
        }
      },
      {
        id: "SIDE-004",
        name: "Truffle & Parmesan Fries",
        portion: "200g Skin-on fries · 5ml Truffle oil · 5g Parmesan",
        price: "£6.00",
        cost: "£1.20",
        gp: "76%",
        cookTemp: "Fryer",
        cookTime: "3 min",
        method: "Fry 180°C · 3 min · Toss in warm bowl",
        finish: "Finely grated parmesan · Chopped parsley",
        allergens: ["dairy"],
        pass: "Evenly coated · fries remain crisp · strong truffle aroma",
        station: "Fry",
        larousse: {
          principle: "Truffle oil is volatile; it must be applied to hot fries to release aroma.",
          method: [
            "Toss in a stainless steel bowl for even distribution.",
            "Use microplane for parmesan snow.",
            "Serve in pre-warmed container."
          ],
          quality: ["Crisp fries", "Pungent aroma", "Melting cheese"],
          faults: ["Soggy", "Weak aroma", "Clumped cheese"],
          correction: ["Piping hot fries", "Toss vigorously", "Check oil volume"]
        },
        fellini: {
          identity: "Aroma-led premium side.",
          pressurePoint: "Oil saturation.",
          watchPoint: "Season timing.",
          passSignal: "Dry, aromatic finish",
          failureSignal: "Greasy/flat"
        }
      },
      {
        id: "SIDE-005",
        name: "House Side Salad",
        portion: "Mixed leaves · Radish · Vinaigrette",
        price: "£4.00",
        cost: "£0.65",
        gp: "80%",
        cookTemp: "Ambient",
        cookTime: "Assembly only",
        finish: "House dressing · Maldon salt",
        allergens: ["mustard"],
        pass: "Crisp upright leaves · even dressing coating · vibrant radish slices",
        station: "Cold",
        larousse: {
          principle: "The simpler the dish, the more visible the flaws. Leaves must be bone-dry.",
          method: [
            "Spin-dry leaves meticulously.",
            "Dress in a large bowl to avoid bruising.",
            "Radish sliced to transparency."
          ],
          quality: ["Crunch", "Brightness", "Zest"],
          faults: ["Bruised leaves", "Drowning in oil", "Wilted"],
          correction: ["New leaves", "Lighten dressing", "Ice-water refresh"]
        },
        fellini: {
          identity: "Clean palate cleanser.",
          pressurePoint: "Leaf bruising.",
          watchPoint: "Dressing volume.",
          passSignal: "Upright, glossy structure"
        }
      },
      {
        id: "SIDE-006",
        name: "Creamy Mash",
        portion: "200g portion",
        price: "£4.50",
        cost: "£0.85",
        gp: "77%",
        cookTemp: "Stove / Prep",
        cookTime: "Prep lead",
        method: "Rice potatoes → Beat in butter and cream (batch #2)",
        finish: "Chive oil or Plain butter",
        allergens: ["dairy"],
        pass: "No lumps · silky smooth · holds shape · glossy finish",
        station: "Hot Hold",
        larousse: {
          principle: "Mash is an emulsion of starch and fat. Cold milk/butter will split it.",
          method: [
            "Use riced, hot potatoes only.",
            "Warm the dairy before folding in.",
            "Do not over-beat (will go 'gluey' from starch breakdown)."
          ],
          quality: ["Silky", "Buttery", "Aromatic"],
          faults: ["Lumps", "Gluey texture", "Cold"],
          correction: ["Re-rice if possible", "Fold gently", "Check hold temp"]
        },
        fellini: {
          identity: "Texture-emulsion staple.",
          pressurePoint: "Starch development (gluey).",
          watchPoint: "The beat; must be airy, not heavy.",
          passSignal: "Velvet finish"
        }
      }
    ],
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
    items: [
      {
        id: "PREP-001",
        name: "FORGE Dough",
        batchYield: "5.2kg / 20 balls @ 260g",
        portion: "260g per dough ball",
        portionTool: "Digital scale",
        hydration: "65%",
        ferment: "48h total (3–4h RT + 44h cold)",
        ingredients: "Flour (00): 3.10 kg · Water: 2.01 kg (65%) · Salt: 77 g (2.5%) · Yeast (fresh): 3 g",
        method: "1. MIX: Water in first (20°C) → Add yeast → Add flour → Add salt last. 2. TEMP: Achieve 23°C FDT. 3. BALLING: Scale 260g balls. 4. FERMENT: 48h cold ferment lock.",
        allergens: ["gluten"],
        shelfLife: "72h max",
        station: "Prep → Pizza",
        serviceReady: "Room temp temper 2–4h (Target 18°C internally)",
        failureSigns: ["Overproof (sticky)", "Underproof (tight)"],
        correction: ["Underproof → extend RT bench time"],
        pass: "Elastic · abundant air pockets · matte finish",
        larousse: {
          principle: "Pizza dough is a living system; fermentation creates the digestibility and the structure.",
          method: [
            "HYDRATION LAW: 65% fixed. No deviation without head chef audit.",
            "TEMPERATURE LAW: Target 23°C FDT to regulate yeast activity.",
            "FERMENTATION LOCK: 44h cold ferment minimum for enzymatic breakdown."
          ],
          quality: ["Smooth surface", "Stable gas retention", "High extensibility"],
          faults: ["Sticky surface", "Snap-back (underproof)", "Sour smell"],
          correction: ["Adjust water temp for seasonal drift."]
        },
        fellini: {
          identity: "The foundation of the entire pizza engine.",
          pressurePoint: "Ambient heat spikes destroying proofing window.",
          watchPoint: "FDT (23°C) and ball tension.",
          passSignal: "Elastic stretch to 12 inches without tearing.",
          failureSignal: "Sticky collapse or stubborn snap-back.",
          recoveryMove: "Underproof: move to warmer area. Overproof: move to coldest part of fridge."
        }
      },
      {
        id: "PREP-002",
        name: "Tomato Base",
        batchYield: "10L (approx 110 pizzas)",
        portionTool: "Ladle #2 (90g)",
        shelfLife: "48h",
        ingredients: "San Marzano tomatoes · 100g Salt · 50g Fresh Basil",
        method: "Hand crush · season · chill 2h before use",
        allergens: ["none"],
        failureSigns: ["Metallic taste", "Watery separation", "Fermentation bubbles"],
        correction: ["Drain excess water", "Re-season if flat", "Discard if gassy"],
        pass: "Vibrant red · fresh aroma · chunks visible · no metallic taste",
        station: "Prep",
        larousse: {
          principle: "Tomato sauce for pizza should remain fresh, bright, and minimally worked.",
          method: [
            "Use hand-crush method, not blending.",
            "Season lightly to preserve tomato character.",
            "Avoid long cooking; freshness is the point."
          ],
          quality: [
            "Fresh red colour",
            "Balanced acidity",
            "No metallic or cooked-down heaviness"
          ],
          faults: [
            "Over-seasoned",
            "Too wet",
            "Too reduced"
          ],
          correction: [
            "Adjust salt carefully",
            "Drain excess liquid if needed",
            "Do not simmer down aggressively"
          ]
        },
        fellini: {
          identity: "Bright, raw acidity to cut through fat.",
          pressurePoint: "Oxidation and metallic taint from storage containers.",
          watchPoint: "Water separation; the pulp must hold the juice.",
          passSignal: "Vibrant red color with visible, non-macerated chunks.",
          failureSignal: "Dull orange hue or a thin, watery consistency.",
          recoveryMove: "Drain excess water through a sieve or re-season with 5g salt."
        }
      },
      {
        id: "PREP-003",
        name: "Bone Reduction (Base)",
        type: "prep_component",
        category: "Flavour & Structure Base (Sauce Engine Input)",
        prepLevel: "Level 6: 12-16h Extraction Window",
        batchYield: "Reduction to 50% volume (Target: Deep Mahogany)",
        portionTool: "N/A (Liquid Base)",
        shelfLife: "7 days (4°C gel state)",
        ingredients: "Bones (Beef/Veal) · Mirepoix · Tomato Paste (NIGHTSHADE) · Red Wine (SULFITES) · Cold Water",
        allergens: ["sulfites", "nightshade"],
        method: "1. ROAST: Deep mahogany bones/mirepoix. 2. DEGLAZE: Red wine reduce by 50%. 3. EXTRACTION: Cold water covers, 85-90°C Sub-simmer. 4. WINDOW: 12-16h extraction. 5. SKIM: Active skimming every 20-30m (3h) then 60-90m. 6. STRAIN: Chinois/Muslin pass. 7. DEGREASE: Chill ≤4°C, remove fat cap. 8. REDUCTION: Reduce by 50% to clean viscosity.",
        station: "Prep / Sauce",
        pass: "Deep mahogany · clean viscosity · glossy finish · balanced seasoning · stable gel at 4°C",
        conversionAction: "Reheat to 60–70°C | Liquid conversion",
        fellini: {
          identity: "Collagen Extraction Foundation",
          pressurePoint: "Protein-Fat Emulsification (Clouding)",
          watchPoint: "Surface Tension / Clarity",
          controlLaw: "Lipid Management Law — Continuous skimming + NO rolling boil (85-90°C). Post-cook degrease is non-negotiable.",
          passSignals: [
            "Holds stable gel at 4°C",
            "Deep mahogany lucidity",
            "No grease separation atop liquid",
            "Glossy spoon coat (nappe)"
          ],
          failSignals: [
            "Cloudy/Boiled appearance",
            "Greasy oil slick",
            "Bitter/Burnt note",
            "Weak gel/Unset"
          ],
          autoReject: [
            "Cloudy",
            "Greasy",
            "Bitter",
            "Missing degrease phase"
          ],
          verdict: "PASS: Fully degreased, collagen-locked base.",
          validationPoint: ["postPrep", "preService", "atPass"]
        },
        executionCard: {
          setup: ["Roasting trays ready", "Cold water source", "Muslin cloths", "Chilling space (≤4°C)"],
          build: [
            "1. Roast bones + mirepoix + tomato paste (Deep mahogany)",
            "2. Deglaze with red wine (Reduce 50%)",
            "3. Extract at 85–90°C (12–16h)",
            "4. Active skim (20–30m intervals first 3h)",
            "5. Strain through muslin",
            "6. Full Degrease (Post-cook chill ≤4°C)",
            "7. Final Reduction (50% volume)"
          ],
          buildSequence: "Roast → Extraction → Lipid Removal → Reduction",
          timeLaw: "12–16h Extraction Window",
          failures: ["Boiling", "Inadequate skimming", "Burnt mirepoix", "Incomplete degrease"],
          reset: ["Discard if cloudy/emulsified. No recovery for grease-saturation."]
        }
      },
      {
        id: "PREP-004",
        name: "Bone Marrow Butter",
        batchYield: "2kg yield · 200 portions",
        portionTool: "10g disc mould",
        shelfLife: "7 days",
        ingredients: "1kg Roasted marrow · 1kg Unsalted butter · 20g Garlic · 50g Parsley",
        method: "Whip butter · fold in cooled marrow · roll into 10g discs",
        allergens: ["dairy"],
        failureSigns: ["Split emulsion", "Gritty texture", "Rancid marrow taste"],
        correction: ["Re-whip if split", "Ensure marrow is finely minced", "Check marrow freshness"],
        pass: "Aerated · rich flavour · uniform discs · no marrow chunks",
        station: "Prep",
        larousse: {
          principle: "A compound butter where the animal fat of the marrow is emulsified into the dairy fat of the butter.",
          method: [
            "Roast marrow until fully rendered before cooling.",
            "Whip butter to double volume before folding.",
            "Store chilled at 4°C."
          ],
          quality: [
            "Smooth, spreadable texture",
            "Deep umami profile",
            "Vibrant green flecks"
          ],
          faults: [
            "Split emulsion",
            "Gritty texture",
            "Rancid marrow taste"
          ],
          correction: [
            "Re-whip if split",
            "Ensure marrow is finely minced",
            "Check marrow freshness"
          ]
        },
        fellini: {
          identity: "The ultimate umami bridge between land and sea.",
          pressurePoint: "Emulsion stability during the fold-in phase.",
          controlLaw: "Thermal Synchronisation Law — Marrow integration window: 20–24°C.",
          watchPoint: "Marrow temperature; it must be cool but not set.",
          passSignals: [
            "aerated, pale-gold butter",
            "uniform green flecks",
            "clean 10g disc release",
            "no visible grease pooling"
          ],
          failSignals: [
            "oil separation",
            "visible grey marrow clumps",
            "rancid marrow note",
            "grainy texture"
          ],
          autoReject: [
            "oil bleed",
            "grey clumps",
            "missing time label"
          ],
          verdict: "PASS: Pale-gold, aerated, homogeneous.",
          validationPoint: ["postPrep", "preService", "atPass"],
          conversionAction: "convert_to_jus",
          recoveryMove: "Re-whip on an ice bath to restore the emulsion."
        }
      },
      {
        id: "PREP-005",
        name: "Pickled Red Onion",
        batchYield: "5L yield · 100 portions",
        portionTool: "Blue tongs (approx 30g)",
        shelfLife: "14 days",
        ingredients: "3kg Red onions · 2L Red wine vinegar · 1L Water · 1kg Sugar · 20g Peppercorns",
        method: "Slice 2mm · boil brine · pour over onions · steep 24h",
        allergens: ["none"],
        failureSigns: ["Dull/grey colour", "Soggy texture", "Overly acidic"],
        correction: ["Add more sugar to balance", "Reduce brine temp next time", "Ensure red wine vinegar is used"],
        pass: "Bright pink · crunchy · sharp acidity · translucent edges",
        station: "Prep",
        menuLayers: {
          core: "Acid-set Onion Ribbons",
          bulk: "Brine Matrix",
          wet: "Liquid acidity",
          acid: "Red Wine Vinegar",
          finish: "Peppercorn aromatics"
        },
        specLayers: {
          functional: "Anthocyanin stabilisation via pH reset.",
          control: "BRINE LAW (1:0.5:0.5) + ANTHOCYANIN LOCK.",
          output: "Vibrant neon-pink spike."
        },
        larousse: {
          principle: "A quick pickle (mignonette style) that uses heat to soften the onion while the acid sets the colour.",
          method: [
            "Slice onions against the grain for better texture.",
            "BRINE LAW: 1 part Vinegar : 0.5 part Sugar : 0.5 part Water.",
            "ANTHOCYANIN LOCK: Ensure pH sits <4.0 to guarantee pink shift."
          ],
          quality: [
            "Neon pink colour",
            "Crisp bite",
            "Balanced sweet/sour"
          ],
          faults: [
            "Dull/grey colour",
            "Soggy texture",
            "Overly acidic"
          ],
          correction: [
            "Add more sugar to balance",
            "Reduce brine temp next time",
            "Ensure red wine vinegar is used"
          ]
        },
        fellini: {
          identity: "The neon-pink acid spike for heavy proteins.",
          pressurePoint: "Brine temperature; too hot and they turn to mush.",
          watchPoint: "The crunch; it must be audible.",
          passSignal: "Translucent pink edges with a firm, crisp bite.",
          failureSignal: "Dull grey color or a soft, limp texture.",
          recoveryMove: "Discard if grey; if soft, use only as a base layer under cheese."
        }
      },
      {
        id: "PREP-006",
        name: "Garlic Fire Oil",
        batchYield: "2L yield · 400 portions",
        portionTool: "Precision squeeze bottle",
        shelfLife: "30 days",
        ingredients: "2L Pomace oil · 200g Garlic · 50g Chilli flakes",
        method: "Infuse at 60°C for 2h · strain through muslin · chill",
        allergens: ["none"],
        failureSigns: ["Cloudy oil", "Bitter/burnt taste", "Weak flavour"],
        correction: ["Re-strain", "Discard if burnt", "Increase infusion time"],
        pass: "Clear vibrant orange · pungent garlic aroma · clean heat",
        station: "Prep",
        larousse: {
          principle: "Low-temperature infusion prevents the garlic from browning and turning bitter.",
          method: [
            "Use a thermometer; do not exceed 65°C.",
            "Mince garlic finely for maximum surface area.",
            "Store in dark bottles to prevent oxidation."
          ],
          quality: [
            "Bright, clear oil",
            "Strong garlic scent",
            "Consistent heat level"
          ],
          faults: [
            "Cloudy oil",
            "Bitter/burnt taste",
            "Weak flavour"
          ],
          correction: [
            "Re-strain",
            "Discard if burnt",
            "Increase infusion time"
          ]
        },
        fellini: {
          identity: "Aromatic precision without the bitterness of char.",
          pressurePoint: "Infusion temperature overshoot.",
          watchPoint: "Oil clarity; any sediment will burn in the oven.",
          passSignal: "A clear, vibrant orange oil that smells like fresh garlic.",
          failureSignal: "Cloudy appearance or a bitter, acrid smell.",
          recoveryMove: "Strain again through a double-layered muslin cloth."
        }
      },
      {
        id: "PREP-007",
        name: "Fire Sauce",
        batchYield: "5L yield · 250 portions",
        portionTool: "Ladle #4 (20g)",
        shelfLife: "5 days (4°C)",
        ingredients: "House mayo (1000g) · Sriracha (120g) · Smoked paprika (10g) · Lime juice (30ml)",
        method: "1. Scale Mayo. 2. Fold in sriracha and paprika. 3. Finish with lime juice. 4. Chill 1h.",
        allergens: ["eggs", "mustard"],
        failureSigns: ["Separation", "Thin consistency", "Lack of heat"],
        correction: ["Re-emulsify with fresh mayo", "Adjust sriracha balance"],
        pass: "Creamy orange · smoky heat · stable emulsion",
        station: "Prep",
        menuLayers: {
          core: "Mayonnaise Base",
          bulk: "20g portion",
          wet: "Emulsion Matrix",
          acid: "Lime Juice",
          finish: "Smoked Paprika"
        },
        specLayers: {
          functional: "Fat-water suspension with spice diffusion.",
          control: "EMULSION LOCK v1: Ratio Law (max 30ml acid) + Temp Law (≤5°C).",
          output: "Glossy, stable orange cream."
        },
        larousse: {
          principle: "EMULSION LOCK v1: ROOT LAYER: Oil-in-water emulsion → stable fat-water suspension. CONTROL LAW: Oil must remain bound to water phase.",
          method: [
            "OIL LAW: Oil phase must remain dominant but stable. No rapid additions.",
            "TEMPERATURE LAW: All emulsions held ≤ 5°C. No exposure to heat or pass.",
            "SEQUENCE LAW: 1. Add flavour components to mayo. 2. Fold gently (do not whisk aggressively). 3. Taste + adjust.",
            "RATIO LAW: Mayo base: 1000g. Acid threshold: 20–40ml max. Spice: 50–120g max.",
            "SERVICE LAW: Keep chilled until use. Use squeeze bottles. No exposure to heat lamps."
          ],
          quality: ["Glossy finish", "Balanced heat", "Thick consistency"],
          faults: [
            "AUTO REJECT: Split / watery",
            "AUTO REJECT: Over-acidic",
            "AUTO REJECT: Too loose (runs on plate)"
          ],
          correction: [
            "RECOVERY LAW: If split, take 50g fresh mayo and slowly incorporate split mix until re-bound."
          ]
        },
        fellini: {
          identity: "The creamy, smoky heat signature of the Galyons burger. [VERDICT: PATCHED — SERVICE SAFE]",
          pressurePoint: "Overworking during fold causes split.",
          watchPoint: "Glossiness; it indicates a stable emulsion.",
          passSignal: "A thick, stable orange cream that holds its shape.",
          failureSignal: "Thinning or visible oil droplets on the surface.",
          recoveryMove: "Apply RECOVERY LAW: fresh base start."
        }
      },
      {
        id: "PREP-008",
        name: "Ale Batter",
        batchYield: "Max 2.5L",
        portionTool: "100ml measure",
        shelfLife: "90 min optimal (2h hard cutoff)",
        ingredients: "Flour · Ale · Baking powder · Salt",
        method: "1. Sieve dry ingredients into chilled bowl. 2. Whisk in pre-chilled ale (≤4°C). 3. Maintain on ice bath. 4. Stagger production to preserve CO₂.",
        allergens: ["gluten"],
        failureSigns: ["Flat/no bubbles", "Too thick/doughy", "Separation"],
        correction: ["Add splash of fresh ale", "Thin with water", "Whisk to refresh"],
        pass: "Bubbly · cold (4°C) · coats finger evenly",
        station: "Prep",
        larousse: {
          principle: "ROOT LAYER: CO2 in the ale creates the aerated structure; temperature prevents gluten development.",
          method: [
            "TEMPERATURE LAW: All liquid inputs must be pre-chilled to ≤4°C before mixing. Any addition above this threshold results in immediate CO₂ loss and premature gluten activation.",
            "RATIO LAW: Flour : Ale = 1 : 1.5 (baseline working ratio). Adjust ±5% only to achieve correct coating viscosity.",
            "SEQUENCE LAW: Sieve dry → add chilled wet → minimal whisk → ice hold.",
            "TOOL LAW: Fine mesh sieve (mandatory) for all dry ingredients. Chilled stainless steel mixing bowl. Secondary ice bath container for holding.",
            "TIME LAW: Optimal use window: 0–90 minutes. Hard cutoff: 2 hours maximum. Beyond this point, batter must be discarded.",
            "BATCH CONTROL LAW: Maximum batch size: 2.5L. Production must be staggered during service to preserve CO₂ integrity. Do not hold large-volume batter for extended periods."
          ],
          quality: ["Light and airy", "Crisp when fried", "Golden colour"],
          faults: ["Heavy/leaden batter", "Oily soak", "Pale colour"],
          correction: ["Check ale carbonation", "Check oil temp", "Add pinch of sugar for browning"]
        },
        fellini: {
          identity: "A temporary CO2-powered pressure cooker for fish.",
          pressurePoint: "CONTROL LAW: Carbonation loss + Temperature management. TEMPERATURE LAW: Pre-chilled inputs (≤4°C) mandatory to avoid CO₂ loss.",
          watchPoint: "Viscosity + Temperature; it must stay at 4°C to prevent gluten.",
          passSignal: "A bubbly, cold liquid that leaves a thick, even coat on a finger.",
          failureSignal: "Flat, thin liquid or a doughy, heavy texture.",
          recoveryMove: "Whisk in a splash of fresh, cold ale just before use. [VERDICT: PATCHED — SERVICE SAFE]"
        }
      },
      {
        id: "PREP-009",
        name: "Herb Garnish",
        batchYield: "Daily batch (500g)",
        portionTool: "Pinch / 2g",
        shelfLife: "Shift only (12h)",
        ingredients: "250g Parsley · 150g Chives · 100g Mint",
        method: "Wash · spin dry · fine chop (1mm) · mix",
        allergens: ["none"],
        failureSigns: ["Black/bruised edges", "Wet/clumped texture", "Muddled flavours"],
        correction: ["Sharpen knife", "Dry herbs more thoroughly", "Refresh with ice water before chopping"],
        pass: "Dry · vibrant green · no bruising · uniform cut",
        station: "Prep",
        larousse: {
          principle: "Fresh herbs must be handled with minimal friction to prevent bruising and oxidation.",
          method: [
            "Use a razor-sharp knife.",
            "Do not 'saw' the herbs; use a single clean stroke.",
            "Store with a damp paper towel in an airtight container."
          ],
          quality: [
            "Bright green colour",
            "Fresh, distinct herb aromas",
            "Dry, fluffy texture"
          ],
          faults: [
            "Black/bruised edges",
            "Wet/clumped texture",
            "Muddled flavours"
          ],
          correction: [
            "Sharpen knife",
            "Dry herbs more thoroughly",
            "Refresh with ice water before chopping"
          ]
        }
      },
      {
        id: "PREP-010",
        name: "Chili-Lime Sugar",
        batchYield: "1kg yield · 200 portions",
        portionTool: "5g shaker",
        shelfLife: "30 days",
        ingredients: "1kg Caster sugar · 20g Dried chilli · 10 Limes (zest only)",
        method: "Dehydrate zest 4h · blitz with sugar/chilli · sift",
        allergens: ["none"],
        failureSigns: ["Clumping/moisture", "Large zest chunks", "Weak lime flavour"],
        correction: ["Re-dehydrate", "Re-blitz", "Add fresh zest"],
        pass: "Fine grain · aromatic · pale green flecks · sharp heat",
        station: "Prep",
        larousse: {
          principle: "The sugar acts as a carrier for the volatile oils in the lime zest and the capsaicin in the chilli.",
          method: [
            "Ensure zest is completely bone-dry before blitzing.",
            "Use a high-speed blender for uniform grain.",
            "Store with a silica pack to prevent clumping."
          ],
          quality: [
            "Free-flowing grain",
            "Zesty aroma",
            "Consistent spice"
          ],
          faults: [
            "Clumping/moisture",
            "Large zest chunks",
            "Weak lime flavour"
          ],
          correction: [
            "Re-dehydrate",
            "Re-blitz",
            "Add fresh zest"
          ]
        }
      },
      {
        id: "PREP-011",
        name: "Tiramisu Cream",
        portion: "150g",
        prepLevel: "6 Units (900g total output)",
        scaleYield: "20 Units (3kg total output)",
        "Quantity per portion": "150g",
        "Total batch output": "900g (Level 6) / 3kg (Scale 20)",
        "Tool/scoop size": "#12 Green Scoop",
        portionLogic: "150g per unit | #12 Green Scoop",
        shelfLife: "48h",
        ingredients: "2kg Mascarpone · 500g Egg yolks · 500g Sugar · 2L Cream",
        method: "Whisk yolks/sugar to ribbon · fold in mascarpone · fold in whipped cream",
        allergens: ["dairy", "eggs"],
        station: "Prep",
        pass: "Holds soft peak · pale ivory color · aerated texture · zero lumps",
        fellini: {
          identity: "Cold Emulsion",
          pressurePoint: "Temperature parity between ingredients.",
          controlLaw: "The cream must hold a stable, aerated structure at 4–6°C, with full integration of mascarpone and egg base. Any collapse, over-loosening, or fat separation = system failure.",
          watchPoint: "Folding speed (must preserve honeycomb air).",
          passSignals: [
            "Holds soft peak",
            "Pale ivory color",
            "Aerated texture",
            "Zero lumps",
            "Spoon drag leaves a defined, soft ridge"
          ],
          failSignals: [
            "Grainy texture",
            "Liquid pool in bottom of container",
            "Liquid collapse",
            "Under-aeration",
            "Yellowing or dull color"
          ],
          autoReject: [
            "grain formation",
            "liquid collapse",
            "acidic/sour aroma",
            "grey oxidation"
          ],
          verdict: "PASS: Aerated, smooth ivory foam.",
          validationPoint: ["postPrep", "preService", "atPass"],
          conversionAction: "discard",
          recoveryMove: "Chill bowl immediately · slow whisk salvage attempt."
        },
        executionCard: {
          timeLaw: "12 min (Batch)",
          setup: [
            "All ingredients strictly at 4°C",
            "Stainless mixing bowl sanitised and chilled",
            "Balloon whisk + large folding spatula ready",
            "Correct yield containers (1L or 5L) prepped"
          ],
          build: [
            "1. Whisk yolks + sugar to ribbon stage",
            "2. Smoothen mascarpone manually (no lumps)",
            "3. Fold mascarpone into yolk base",
            "4. Whisk cream to soft peaks",
            "5. Fold cream into base in 3 cautious stages"
          ],
          failures: ["Grainy texture", "Liquid collapse", "Under-aeration"],
          reset: ["Discard batch if split", "Review temp logic"]
        },
        larousse: {
          principle: "A stable foam created by the aeration of eggs and cream, supported by the fat structure of mascarpone.",
          method: [
            "Ensure all ingredients are at 4°C.",
            "Do not over-whisk; the fat will separate.",
            "Fold by hand to preserve air."
          ],
          quality: [
            "Velvety mouthfeel",
            "Stable structure",
            "Clean dairy flavour"
          ],
          faults: [
            "Grainy texture",
            "Collapsed/liquid cream",
            "Yellow/dense"
          ],
          correction: [
            "Fold more gently",
            "Check whisk speed",
            "Ensure yolks are fully aerated"
          ]
        }
      },
      {
        id: "PREP-012",
        name: "Coffee Soak",
        batchYield: "2L yield · 30 portions",
        portionTool: "50ml squeeze bottle",
        shelfLife: "72h",
        ingredients: "1.5L Espresso · 400ml Marsala · 100g Sugar",
        method: "Brew coffee · dissolve sugar while hot · add Marsala when cold",
        allergens: ["none"],
        failureSigns: ["Weak flavour", "Overly sweet", "Bitter/burnt coffee"],
        correction: ["Increase espresso concentration", "Reduce sugar", "Check coffee extraction"],
        pass: "Strong coffee punch · balanced sweetness · clear · cold",
        station: "Prep",
        larousse: {
          principle: "The soak must be concentrated enough to flavour the sponge without making it bitter or overly sweet.",
          method: [
            "Use high-quality espresso, not instant.",
            "Cool completely before use to prevent sponge collapse.",
            "Measure Marsala precisely."
          ],
          quality: [
            "Deep coffee colour",
            "Aromatic booze notes",
            "No sediment"
          ],
          faults: [
            "Weak flavour",
            "Overly sweet",
            "Bitter/burnt coffee"
          ],
          correction: [
            "Increase espresso concentration",
            "Reduce sugar",
            "Check coffee extraction"
          ]
        }
      },
      {
        id: "PREP-013",
        name: "Panna Cotta",
        batchYield: "2L yield · 20 units",
        portion: "100g",
        shelfLife: "72h",
        ingredients: "1.2L Double cream · 400ml Whole milk · 200g Sugar · 4 Gelatine leaves · 1 Vanilla pod",
        method: "Bloom gelatine · heat cream/milk/sugar/vanilla to 80°C (no boil) · whisk in gelatine · strain · pour · chill 6h min",
        allergens: ["dairy"],
        station: "Prep",
        pass: "Gentle wobble · glossy surface · clean edge",
        fellini: {
          identity: "Gel Emulsion",
          pressurePoint: "Gelatine blooming and integration temp.",
          controlLaw: "The cream must set with a uniform, trembling structure that holds form but yields instantly under pressure. Any rubber texture, loose center, or split layer = system failure.",
          watchPoint: "Straining (must remove all undissolved particles).",
          passSignals: [
            "gentle wobble",
            "clean unmould or spoon scoop",
            "no bubbles or holes",
            "even set edge to centre",
            "glossy surface",
            "clean dairy aroma"
          ],
          failSignals: [
            "rubbery texture",
            "loose or unset centre",
            "fat separation",
            "air bubbles from poor strain",
            "grainy mouthfeel",
            "broken surface"
          ],
          autoReject: [
            "rubber texture",
            "fat split",
            "air holes"
          ],
          verdict: "PASS: Trembling, uniform set.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "If unset: gently re-melt and adjust gelatine (last resort)."
        }
      },
      {
        id: "PREP-014",
        name: "Mascarpone Cream",
        batchYield: "1kg yield · 10 portions",
        portion: "100g",
        shelfLife: "48h",
        ingredients: "750g Mascarpone · 150g Icing sugar · 100ml Double cream · 1 Lemon (zest)",
        method: "Whisk mascarpone + sugar until smooth · fold in cream + zest cautiously",
        allergens: ["dairy"],
        station: "Prep",
        pass: "Smooth · thick · spreadable ivory cream",
        fellini: {
          identity: "Fat Emulsion",
          pressurePoint: "Mechanical heat from whisking.",
          controlLaw: "Mascarpone must remain plastic, smooth, and fully integrated. Temperature shock or overworking causes grain, stiffness, or collapse.",
          watchPoint: "Over-whipping (will split fat instantly).",
          passSignals: [
            "smooth thick spreadable texture",
            "no grain",
            "light shape retention",
            "clean dairy sweetness",
            "uniform pale colour"
          ],
          failSignals: [
            "grainy texture",
            "split or oily surface",
            "too loose from over-folding",
            "too stiff from over-whipping",
            "yellowing from overwork"
          ],
          autoReject: [
            "grainy",
            "split fat",
            "yellowing"
          ],
          verdict: "PASS: Smooth, spreadable, ivory.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Fold in a touch of cold cream to loosen if over-whipped."
        }
      },
      {
        id: "PREP-015",
        name: "Sticky Toffee Sauce",
        batchYield: "3L yield · 60 portions",
        portionTool: "50ml ladle",
        shelfLife: "10 days",
        ingredients: "1kg Butter · 1kg Brown sugar · 1L Double cream",
        method: "Caramelise sugar/butter · deglaze with cream · whisk until glossy",
        allergens: ["dairy"],
        failureSigns: ["Split/oily sauce", "Grainy sugar crystals", "Burnt/bitter"],
        correction: ["Whisk in a touch of cold cream to re-emulsify", "Ensure sugar is fully dissolved", "Discard if burnt"],
        pass: "Glossy · thick enough to coat spoon · deep amber · no crystals",
        fellini: {
          identity: "Fat Emulsion (Caramel)",
          pressurePoint: "Thermal stability of the cream-sugar bond.",
          controlLaw: "Sauce must hit exactly 104°C before cream addition to ensure emulsion stability. No split fat, no graining.",
          watchPoint: "Whisk speed during deglazing.",
          passSignals: [
            "glossy uniform surface",
            "thick enough to coat a spoon (nappe)",
            "deep amber/copper colour",
            "zero sugar crystals",
            "smells of toasted dairy"
          ],
          failSignals: [
            "split or oily surface",
            "grainy sugar crystals",
            "burnt or acrid aroma",
            "too thin (fails to coat)",
            "pale/underdeveloped colour"
          ],
          autoReject: [
            "split fat",
            "crystals",
            "burnt"
          ],
          verdict: "PASS: Glossy, stable, deep amber.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Whisk in 5% cold cream to re-emulsify if split."
        },
        station: "Prep",
        larousse: {
          principle: "A butter-sugar emulsion (toffee) stabilised by the addition of cream.",
          method: [
            "Melt butter and sugar slowly to avoid burning.",
            "Add cream in a steady stream while whisking.",
            "Strain through a fine sieve."
          ],
          quality: [
            "Smooth, velvety texture",
            "Rich caramel taste",
            "Consistent viscosity"
          ],
          faults: [
            "Split/oily sauce",
            "Grainy sugar crystals",
            "Burnt/bitter"
          ],
          correction: [
            "Whisk in a touch of cold cream to re-emulsify",
            "Ensure sugar is fully dissolved",
            "Discard if burnt"
          ]
        }
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
        batchYield: "5kg yield · 50 portions",
        portionTool: "100g scoop",
        shelfLife: "Shift only (12h)",
        ingredients: "Cabbage · Carrot · Mange tout · Soy-ginger dressing",
        method: "Fine shred vegetables · dress at service",
        allergens: ["soy", "sesame"],
        failureSigns: ["Wilting", "Watery base", "Discolouration"],
        correction: ["Refresh with ice water", "Drain before dressing", "Discard if limp"],
        pass: "Crunchy · vibrant · zingy · fresh aromatics",
        station: "Prep",
        menuLayers: {
          core: "Fresh Asian Veg",
          bulk: "100g serving",
          wet: "Soy-Ginger Dressing",
          acid: "Rice Wine Vinegar / Ginger",
          finish: "Fresh Coriander"
        },
        specLayers: {
          functional: "Raw vegetable crunch with fermented salt.",
          control: "DRAIN LAW + DRESS-TO-ORDER.",
          output: "Fragment aromatics."
        },
        larousse: {
          principle: "A fresh vegetable assembly where acidity and salt provide immediate seasoning.",
          method: [
            "Use mandoline for uniform cut.",
            "ACID LAW: Dress per-ticket only to prevent osmotic water loss.",
            "Keep covered in fridge until needed."
          ],
          quality: ["Crisp texture", "Bright colours", "Balanced dressing"],
          faults: ["Soggy", "Too salty", "Oxidised veg"],
          correction: ["Reduce dressing time", "Add more veg", "Keep covered"]
        }
      },
    ],
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
    items: [
      {
        id: "SUNDAY-001",
        name: "Roast Leg of Lamb",
        portion: "3-4 thick slices",
        protein: "Leg of Lamb (Garlic & Rosemary)",
        trim: "Yorkshire pudding · Roast potatoes · Roots · Greens",
        cookTemp: "Target 55-58°C core (Pink)",
        cook: "Roast hard → Slow finish → Rest 20 min",
        allergens: ["gluten", "dairy", "eggs"],
        pass: "Hot plate · pink lamb · crisp potatoes · glossy gravy",
        station: "Sunday Roast",
        menuLayers: {
          core: "Pink Roasted Lamb Leg",
          bulk: "Roast Potatoes + Yorkshire Pudding",
          wet: "Galyons Gravy (Finish)",
          acid: "Mint Sauce / Roots",
          finish: "Fresh Herb Garnish"
        },
        specLayers: {
          functional: "Bone-in heat conduction + fibre relaxation.",
          control: "Pink Lamb Law: Target 55-58°C + 20m rest.",
          output: "Abundant Sunday plate."
        },
        larousse: {
          principle: "Roasting on the bone provides depth; resting allows capillary action to redistribute juices for tenderness.",
          method: ["Temper meat 1h", "Stud with garlic/rosemary", "Carve against the grain"],
          quality: ["Pink tender meat", "Rendered fat", "Clean edges"],
        },
        fellini: {
          identity: "Pink lamb authority.",
          pressurePoint: "Overcooking due to carry-over heat.",
          watchPoint: "Resting time.",
          passSignal: "Rest before carve.",
          recoveryMove: "Flash in hot gravy if cold."
        }
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
    ],
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
    items: [
      {
        id: "DESSERT-001",
        name: "Sticky Toffee Pudding",
        portion: "150g square",
        batchYield: "20 units / tray",
        category: "Volume Engine",
        price: "£7.50",
        cost: "£1.80",
        gp: "76%",
        ingredients: "Dates (500g) · Water (600ml) · Bicarb (10g) · Butter (250g) · Sugar (300g) · Eggs (5/250g) · Flour (350g)",
        cookTemp: "160°C fan (Bake) / 140°C (Oven Reheat)",
        cookTime: "35–40 min (Bake) / 6–8 min (Reheat)",
        reheatMethod: "45s Microwave (covered) OR 140°C Oven (6-8m)",
        shelfLife: "3 days chilled",
        passHoldLimit: "30 min (Sauce) / 5 min (Plated)",
        method: "Bake sponge in tray (160°C fan, 35–40m) → pre-cut 20-unit grid → reheat portion (40–45s microwave covered OR 140°C oven 6–8m) → heat toffee sauce separately",
        sauce: "Toffee Sauce: Cream (1L) · Sugar (500g) · Butter (200g)",
        texture: "Mandatory Salted Pecan Crumb (10g)",
        allergens: ["gluten", "dairy", "eggs", "nuts"],
        pass: "Hot core (65°C+) · sticky glaze · vibrant texture contrast",
        station: "Pastry",
        mep6x6: {
          core: "Sticky Toffee Sponge (pre-cut square)",
          sauce: "Reduced Toffee Sauce (60°C)",
          texture: "Salted Pecan Crumb (#C84B31)",
          garnish: "Clotted Cream / Mint (optional)",
          holding: "Hot hold sauce (bain-marie) / ambient sponge",
          service: "Reheat sponge (45s) → Sauce → Crumb → Send"
        },
        failurePoints: [
          "Dry edges → reject",
          "Cold centre → reheat",
          "Sauce overheated → split risk",
          "Missing texture → NO SEND"
        ],
        larousse: {
          principle: "British comfort system engineered for volume — sweetness stabilised through salt and texture contrast.",
          method: [
            "1. Pour boiling water over dates + bicarb → rest 10 min.",
            "2. Cream butter + sugar until pale.",
            "3. Add eggs gradually (no split).",
            "4. Fold in flour.",
            "5. Fold in date mix.",
            "6. Tray bake → 160°C / 35–40 min.",
            "7. Cool → cut 20 portions (hard grid)."
          ],
          quality: [
            "Served hot",
            "Fully coated in toffee sauce",
            "Clean plate, controlled portion"
          ],
          faults: ["Dry centre", "Burnt edges", "Thin sauce"],
          correction: ["Increase sauce viscosity", "Adjust reheat time"]
        },
        fellini: {
          identity: "High-comfort Volume Emulsion",
          pressurePoint: "Reheat timing vs sauce temperature.",
          controlLaw: "Sauce must hit exactly 104°C before cream addition to ensure emulsion stability. No split fat, no graining.",
          watchPoint: "Internal core temp (must hit 65°C without drying).",
          passSignals: [
            "steaming active core",
            "deep amber/copper sauce glaze",
            "crunch integrity maintained",
            "sauce coats 100% of top surface",
            "clean plate release"
          ],
          failSignals: [
            "cold centre",
            "split or grainy sauce",
            "missing texture lock",
            "skin formation on sauce",
            "dry/ragged sponge edges"
          ],
          autoReject: [
            "cold centre",
            "split sauce",
            "missing texture lock"
          ],
          verdict: "PASS: Steaming hot, glazed, crisp crunch.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Flash in microwave 15s or fresh sauce hit."
        },
        executionCard: {
          setup: ["Square portion ready", "Toffee sauce warm (not boiling)", "Salted pecan crumb ready (#C84B31)"],
          build: [
            "1. Reheat sponge (45s)",
            "2. Plate centre",
            "3. Apply hot toffee glaze",
            "4. Apply Texture Lock — pecan crumb",
            "5. Add cream (optional)",
            "6. Send"
          ],
          buildSequence: "Sponge → Glaze → Texture Lock → Dairy",
          buildSignal: "Sauce must coat 100% of top surface, bleeding to 20% of base.",
          timeLaw: "≤60s",
          failures: ["Dry sponge", "Sauce split", "Missing crumb"],
          reset: ["New portion", "Reheat correctly", "Replate clean"]
        }
      },
      {
        id: "DESSERT-002",
        name: "Lemon Posset",
        portion: "120g pot",
        batchYield: "20 units",
        category: "Margin Engine",
        price: "£6.50",
        cost: "£1.20",
        gp: "81%",
        ingredients: "Double cream (2000g) · Caster sugar (400g) · Lemon juice (250g fresh)",
        cookTemp: "85°C (Simmer)",
        cookTime: "8-10 min",
        reheatMethod: "N/A (Cold-set service)",
        shelfLife: "3 days chilled",
        passHoldLimit: "15 min (Ambient pass) / 3 days (Chilled)",
        method: "Heat cream + sugar to ~85°C (light simmer, NO BOIL) → add lemon juice (acid-set trigger) → pour immediately → chill 4h min (overnight ideal)",
        texture: "Mandatory Shortbread Crumb (15g) + Raspberries",
        allergens: ["dairy", "gluten"],
        pass: "Clean set (slight jiggle) · sharp acidity · buttery crumb contrast",
        station: "Pastry",
        mep6x6: {
          core: "Lemon/Cream emulsion (set in pot)",
          sauce: "N/A (Acid profile integrated)",
          texture: "Shortbread Crumb (#C84B31)",
          garnish: "Fresh Raspberry + Lemon Zest",
          holding: "Chilled (3–4°C) — 3 day shelf life",
          service: "Retrieve pot → Garnish → Crumb → Send"
        },
        failurePoints: [
          "Boil → split",
          "Too much acid → grainy",
          "Under-set → no send",
          "No crunch → NO SEND"
        ],
        larousse: {
          principle: "Acid-controlled dairy system — minimal input, maximum structural precision.",
          method: [
            "1. Heat cream + sugar → ~85°C (no boil).",
            "2. Remove from heat.",
            "3. Add lemon juice (250ml) → stir once.",
            "4. Pour immediately.",
            "5. Chill minimum 4 hours (prefer overnight)."
          ],
          quality: [
            "Fully set, smooth texture",
            "Clean surface",
            "Finished with zest / garnish"
          ],
          faults: ["Liquid centre", "Grainy texture", "Over-set"],
          correction: ["Adjust lemon ratio (ACID LAW)"]
        },
        fellini: {
          identity: "Pure acid-fat emulsion set.",
          pressurePoint: "The set window (4h minimum).",
          controlLaw: "The cream must set with a uniform, trembling structure that holds form but yields instantly under pressure. Any rubber texture, loose center, or split layer = system failure.",
          watchPoint: "Acid application timing (Final step).",
          passSignals: [
            "gentle wobble",
            "clean unmould or spoon scoop",
            "no bubbles or holes",
            "even set edge to centre",
            "glossy surface",
            "clean dairy aroma"
          ],
          failSignals: [
            "rubbery texture",
            "loose or unset centre",
            "fat separation",
            "air bubbles from poor strain",
            "grainy mouthfeel",
            "broken surface"
          ],
          autoReject: [
            "liquid/unset",
            "rubber texture",
            "visible fat split"
          ],
          verdict: "PASS: Smooth set, sharp acid lift.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "None (Set failure = full batch loss)."
        },
        executionCard: {
          setup: ["Posset set and chilled", "Shortbread crumb ready (#C84B31)", "Zest ready"],
          build: ["1. Retrieve chilled portion", "2. Clean surface if needed", "3. Add zest", "4. Apply Texture Lock — crumb", "5. Final wipe", "6. Send"],
          buildSequence: "Retrieve → Garnish → Texture Lock",
          buildSignal: "Pot must be condensation-free. Crumb to cover 50% of surface.",
          timeLaw: "≤45s",
          failures: ["Not set", "Over-acid split", "No texture"],
          reset: ["Replace portion", "Do not attempt fix"]
        }
      },
      {
        id: "DESSERT-003",
        name: "Tiramisu",
        portion: "180g slice",
        batchYield: "20 portions",
        category: "Perception Dish",
        price: "£7.50",
        cost: "£2.10",
        gp: "72%",
        ingredients: "Mascarpone (1000g) · Egg yolks (10/200g) · Caster Sugar (300g) · Double Cream (1000g) · Espresso (1000g) · Savoiardi (60 units)",
        cookTemp: "Ambient assembly / Chilled set",
        cookTime: "N/A",
        reheatMethod: "N/A",
        shelfLife: "48 hours optimal",
        passHoldLimit: "10 min (Ambient pass)",
        method: "Build stable mascarpone cream (no post-assembly cooking) → layer coffee-soaked biscuits → repeat → chill 12h min → pre-cut grid before service",
        texture: "Mandatory Cacao Nibs (top) for bitter crunch",
        allergens: ["dairy", "gluten", "eggs", "alcohol"],
        pass: "Defined layers · coffee punch · velvet mascarpone",
        station: "Pastry",
        mep6x6: {
          core: "Layered Espresso Savoiardi / Mascarpone Cream",
          sauce: "N/A (Moisture from sponge)",
          texture: "Cacao Nibs / Dark Cocoa Dust",
          garnish: "Chocolate Shavings",
          holding: "Chilled (3–4°C) — 48h optimal window",
          service: "Lift pre-cut slice → Dust → Nibs → Send"
        },
        failurePoints: [
          "Over-soak → collapse",
          "Warm service → structure loss",
          "No bitterness → NO SEND"
        ],
        larousse: {
          principle: "Italian layered system — balance of fat, bitterness, and structure.",
          method: [
            "1. Whisk yolks + sugar → ribbon stage.",
            "2. Fold in mascarpone.",
            "3. Fold in whipped cream (soft peak).",
            "4. Dip biscuits quickly (no soak hold).",
            "5. Layer: biscuit → cream → repeat.",
            "6. Chill 12h minimum.",
            "7. Cut into 20 portions."
          ],
          quality: [
            "Clean cut",
            "Defined layers",
            "Fresh cocoa dust at pass"
          ],
          faults: ["Soggy base", "Liquid seepage", "Flat flavour"],
          correction: ["Drain mascarpone further before whipping"]
        },
        fellini: {
          identity: "Caffeine-fat-sugar stack.",
          pressurePoint: "Sponge saturation level.",
          controlLaw: "The cream must hold a stable, aerated structure at 4–6C, with full integration of mascarpone and egg base. Any collapse, over-loosening, or grain formation = system failure.",
          watchPoint: "Cutting integrity (No slump).",
          passSignals: [
            "smooth silk-like texture",
            "holds a clean peak when spoon is lifted",
            "pale uniform colour with no streaking",
            "no liquid separation at base",
            "spreads evenly without tearing sponge layer",
            "clean dairy and coffee aroma",
            "spoon drag leaves a defined ridge"
          ],
          failSignals: [
            "split or watery base",
            "grainy or curdled texture",
            "over-whipped stiff structure",
            "flat or collapsed aeration",
            "yellowing or dull colour",
            "heavy egg smell"
          ],
          autoReject: [
            "structural collapse",
            "liquid seepage",
            "grainy cream"
          ],
          verdict: "PASS: Defined layers, velvet cream.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "None (Structural failure = full loss)."
        },
        executionCard: {
          setup: ["Pre-cut portion ready", "Cocoa dust ready", "Cacao nibs ready (#C84B31)"],
          build: ["1. Lift clean slice", "2. Plate with structure intact", "3. Light cocoa dust", "4. Apply Texture Lock — nibs", "5. Clean edge", "6. Send"],
          buildSequence: "Lift → Plate → Dust → Texture Lock",
          buildSignal: "90-degree vertical edges. Dark cocoa must be matte, not wet.",
          timeLaw: "≤60s",
          failures: ["Collapse", "Over-soaked", "No bitterness"],
          reset: ["Replace slice", "Maintain structure"]
        }
      },
      {
        id: "DESSERT-004",
        name: "Apple & Berry Crumble",
        portion: "200g (150g fruit / 50g topping)",
        batchYield: "20 portions",
        category: "Control System",
        price: "£6.50",
        cost: "£1.50",
        gp: "77%",
        ingredients: "Apples (3000g) · Mixed Berries (250g) · Sugar (300g) · Cinnamon (5g) | Crumble: Butter (500g) · Flour (750g) · Sugar (500g)",
        cookTemp: "180°C (Crumble Bake)",
        cookTime: "15 min (Fruit) / 20 min (Crumble)",
        reheatMethod: "180°C Oven (4-5m) or Microwave (90s) for fruit only",
        shelfLife: "2 days (Fruit) / 5 days (Topping dry)",
        passHoldLimit: "5 min (Plated)",
        method: "Cook fruit gently (10–15m, hold shape) → bake crumble independently (180°C, 15–20m, golden) → assemble + reheat to order",
        texture: "Mandatory Crisp Topping (Toasted Oat & Demerara)",
        allergens: ["gluten", "dairy"],
        pass: "Bubbling fruit · golden crisp top · hot core",
        station: "Pastry",
        mep6x6: {
          core: "Stewed Apple & Berry Base",
          sauce: "Berry Jus / Custard (optional)",
          texture: "Oat & Demerara Topping (pre-baked)",
          garnish: "N/A",
          holding: "Ambient (topping) / Hot hold or Chilled (fruit)",
          service: "Heat fruit → Add topping → Custard → Send"
        },
        failurePoints: [
          "Wet topping → reject",
          "Overcooked fruit → mush",
          "No texture → NO SEND"
        ],
        larousse: {
          principle: "Moisture and texture separation system — eliminates degradation.",
          method: [
            "1. Cook fruit gently → 10–15 min (hold shape).",
            "2. Mix crumble → rub to coarse texture.",
            "3. Bake crumble separately → 180°C / 15–20 min.",
            "4. Store separately (critical system rule)."
          ],
          quality: [
            "Hot fruit base",
            "Crisp topping (never soft)",
            "Balanced sweetness"
          ],
          faults: ["Soggy topping", "Hard cores", "Too sweet"],
          correction: ["Add lemon to fruit (ACID LAW)"]
        },
        fellini: {
          identity: "The Comfort Engine.",
          pressurePoint: "Moisture migration into the topping.",
          controlLaw: "Crumble must bake into discrete, crisp clusters with no grease bleed and no flour dust. It must hold dry contrast against soft dessert elements.",
          watchPoint: "Fruit-to-Crumble ratio (3:1).",
          passSignals: [
            "golden even colour",
            "crisp bite",
            "soft interior within clusters",
            "distinct clusters not sand",
            "no oil residue on tray"
          ],
          failSignals: [
            "greasy texture",
            "powdery underbound mix",
            "burnt edges with pale centre",
            "slab formation",
            "floury raw finish"
          ],
          autoReject: [
            "soggy topping",
            "mushy fruit",
            "lack of heat"
          ],
          verdict: "PASS: Hot fruit, dry crisp topping.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Fresh crumble topping flash."
        },
        executionCard: {
          setup: ["Fruit base hot", "Crumble topping dry and ready (#C84B31)", "Cream/custard ready"],
          build: ["1. Heat fruit base", "2. Plate base", "3. Add crumble topping", "4. Add cream/custard", "5. Check crisp texture", "6. Send"],
          buildSequence: "Heat Fruit → Plate → Top → Garnish",
          buildSignal: "Topping must be stacked high, not spread flat. No fruit visible initially.",
          timeLaw: "≤60s",
          failures: ["Soggy topping", "Cold base", "Over-sweet"],
          reset: ["Reheat base", "Replace topping"]
        }
      },
      {
        id: "DESSERT-005",
        name: "Flourless Chocolate Cake",
        portion: "1 slice (100g)",
        batchYield: "12 portions (Premium Exception)",
        category: "Control Test",
        price: "£7.00",
        cost: "£1.90",
        gp: "73%",
        ingredients: "Dark chocolate (600g) · Butter (400g) · Eggs (10/500g) · Sugar (300g)",
        cookTemp: "150–160°C (Bain-marie)",
        cookTime: "25–35 min",
        reheatMethod: "N/A (Cold service point)",
        shelfLife: "3 days",
        passHoldLimit: "15 min (Ambient pass)",
        method: "Melt chocolate/butter (<50°C) → fold eggs/sugar → bake 150–160°C in bain-marie (25–35m) → target slight wobble centre → chill before slicing",
        texture: "Mandatory Sea Salt + Hazelnut Praline (10g)",
        allergens: ["dairy", "eggs", "nuts"],
        pass: "Fudgy centre · crackled top · intense chocolate hit",
        station: "Pastry",
        mep6x6: {
          core: "70% Flourless Chocolate Base",
          sauce: "N/A (High density fat)",
          texture: "Hazelnut Praline + Sea Salt",
          garnish: "Crème Fraîche",
          holding: "Chilled (3–4°C) — slice while cold",
          service: "Plate slice → Garnish → Praline → Salt → Send"
        },
        failurePoints: [
          "Overbake → dry",
          "Underbake → collapse",
          "No contrast → NO SEND"
        ],
        larousse: {
          principle: "High-density chocolate system — precision over volume.",
          method: [
            "1. Melt chocolate + butter (gentle heat).",
            "2. Whisk eggs + sugar lightly (no aeration overload).",
            "3. Combine mixtures.",
            "4. Bake → 150–160°C (bain-marie preferred).",
            "5. Bake 25–35 min (slight wobble centre).",
            "6. Chill → slice clean."
          ],
          quality: [
            "Clean slice",
            "Slight softness in centre",
            "Intense rich mouthfeel"
          ],
          faults: ["Grainy", "Dry/Cakey", "Split fat"],
          correction: ["Check melt temperature strictly"]
        },
        fellini: {
          identity: "Fat Emulsion (Structural)",
          pressurePoint: "Slice consistency (No starch = fragile).",
          controlLaw: "Temperature Shock Law — Any rapid mismatch between component temperatures risks split, grain, collapse, or set failure.",
          watchPoint: "Temperature at cut (Must be cold).",
          passSignals: [
            "smooth thick spreadable texture",
            "no grain",
            "light shape retention",
            "clean dairy sweetness",
            "uniform pale colour"
          ],
          failSignals: [
            "grainy texture",
            "split or oily surface",
            "too loose from over-folding",
            "too stiff from over-whipping",
            "yellowing from overwork"
          ],
          autoReject: [
            "broken slice",
            "split fat",
            "dry edges"
          ],
          verdict: "PASS: Fudgy, clean slice, intense.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Keep chilled until exact point of garnishing."
        },
        executionCard: {
          setup: ["Clean slice ready", "Praline crunch (#C84B31)", "Sea salt ready"],
          build: ["1. Plate slice", "2. Add cream (optional)", "3. Apply Texture Lock — praline", "4. Finish with sea salt", "5. Clean plate", "6. Send"],
          buildSequence: "Plate → Cream → Texture Lock → Salt",
          buildSignal: "Sharp wedge angle maintained. Salt crystals visible but not grouped.",
          timeLaw: "≤60s",
          failures: ["Dry slice", "Over-heavy", "Missing contrast"],
          reset: ["Replace slice", "Replate clean"]
        }
      },
      {
        id: "DESSERT-006",
        name: "Chocolate Fondant",
        portion: "120g individual fondant",
        batchYield: "20 units (Technical Batch)",
        category: "Premium Test",
        price: "£8.50",
        cost: "£2.20",
        gp: "74%",
        ingredients: "Dark Chocolate 70% (500g) · Butter (500g) · Eggs (10/500g) · Caster Sugar (250g) · Flour (100g)",
        cookTemp: "180°C (Exact)",
        cookTime: "12 min (Timer lock)",
        reheatMethod: "N/A (Bake to order)",
        shelfLife: "24h chilled raw",
        method: "Melt chocolate/butter → Whisk eggs/sugar to ribbon → Fold chocolate into eggs → Fold flour → Prep moulds with butter/cocoa → Bake 180°C for 12m → Rest 1m → De-mould",
        texture: "Mandatory Chocolate Soil or Honeycomb (10g)",
        allergens: ["gluten", "dairy", "eggs"],
        pass: "Liquid centre release on cut · set exterior · clean release from mould",
        station: "Hot / Pastry",
        mep6x6: {
          core: "Fondant Batter (pre-moulded)",
          sauce: "Raspberry Coulis (Batch #12)",
          texture: "Chocolate Soil (#C84B31)",
          garnish: "Vanilla Gelato (50g) · Mint",
          holding: "Raw chilled moulds (3-4°C)",
          service: "Bake (12m) → Rest (1m) → De-mould → Plate → Garnish → Send"
        },
        failurePoints: [
          "Fully cooked centre → REJECT",
          "Collapsed wall → REJECT",
          "Stuck to mould → REJECT"
        ],
        passHoldLimit: "5 min (Plated)",
        fellini: {
          identity: "Thermal Shock Masterpiece",
          pressurePoint: "Timer precision lock (±15s)",
          controlLaw: "Temperature Shock Law — Any rapid mismatch between component temperatures risks split, grain, collapse, or set failure.",
          watchPoint: "The 'wobble' + Symmetrical rise",
          passSignals: [
            "liquid centre release on cut",
            "set exterior shell",
            "clean release from mould",
            "symmetrical rise",
            "steaming core impact"
          ],
          failSignals: [
            "fully set sponge (overbaked)",
            "structural collapse (underbaked)",
            "ragged de-moulding",
            "cold centre",
            "leaking shell before cut"
          ],
          autoReject: [
            "internal set",
            "mould stick",
            "asymmetrical rise"
          ],
          verdict: "PASS: Molten core, stable shell.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Bake next unit -60s if over; +60s if under."
        },
        executionCard: {
          setup: ["Pre-moulded fondant ready", "Vanilla gelato ready", "Raspberry coulis ready"],
          build: ["1. Bake fondant (12m)", "2. Rest (1m)", "3. De-mould to plate centre", "4. Circle of coulis", "5. Add gelato scoop", "6. Texture Lock — soil", "7. Send"],
          buildSequence: "Bake → Rest → De-mould → Garnish → Texture Lock",
          buildSignal: "Core must be liquid-fluid. Exterior must support its own weight without bulge.",
          timeLaw: "≤60s (plating phase only)",
          failures: ["Internal set", "Leak before cut", "Broken shell"],
          reset: ["Start bake cycle 2", "Do not patch"]
        }
      },
      {
        id: "DESSERT-007",
        name: "Wood-Fired Pineapple",
        portion: "150g Pineapple wedge (1/8th)",
        batchYield: "20 units (5 pineapples)",
        category: "Seasonal / Special",
        price: "£7.00",
        cost: "£1.10",
        gp: "84%",
        ingredients: "Pineapple (5 units) · Chili-lime sugar: Zest (4 limes) · Chili flakes (10g) · Sugar (200g)",
        cookTemp: "350°C+ (Wood Fire)",
        cookTime: "6 min (Total)",
        reheatMethod: "N/A (Cook to order)",
        shelfLife: "2 days prepped",
        method: "Remove core → Score surface → Apply chili-lime sugar → Grill in pizza oven 6 min (turn 3 min) → Char edges heavily",
        texture: "Mandatory Coconut Sorbet (50g) + Chili-Lime Zest",
        allergens: ["none"],
        pass: "Caramelised edges · hot fruit fibre · balanced spice/acid",
        station: "Pizza Oven",
        passHoldLimit: "3 min (Plated)",
        mep6x6: {
          core: "Sugar-scored Pineapple Wedge",
          sauce: "Pineapple Jus (natural release)",
          texture: "Chili-Lime Sugar Crystallisation",
          garnish: "Coconut Sorbet (50g) · Lime Zest",
          holding: "Prepped wedges chilled (3-4°C)",
          service: "Grill (6m) → Plate → Top with Sorbet → Final Zest → Send"
        },
        fellini: {
          identity: "A tropical, charred collision of heat and acid.",
          pressurePoint: "Maillard reaction edge lock",
          controlLaw: "Char-Logic Index",
          watchPoint: "Fruit fibre breakdown vs Char intensity",
          passSignal: "Blackened caramelized peaks · Steaming interior · Sorbet starting to melt on impact",
          failureSignal: "Cold fruit core · No char (pale fruit) · Excessive bitterness from burnt sugar",
          recoveryMove: "Flash in high heat dome (30s) if core is cold."
        },
        executionCard: {
          setup: ["Pineapple wedges prepped", "Chili-lime sugar ready", "Coconut sorbet ready"],
          build: ["1. Grill pineapple (6m)", "2. Score check", "3. Plate wedge", "4. Add sorbet scoop", "5. Texture Lock — sugar hit", "6. Send"],
          buildSequence: "Grill → Score Check → Plate → Sorbet → Finish",
          buildSignal: "Char peaks must be matte black against golden fruit fibre. Internal heat must hit 55°C+.",
          timeLaw: "≤60s (plating phase)",
          failures: ["Cold centre", "Burnt sugar (bitter)", "Fibrous core"],
          reset: ["Re-score and re-grill", "Discard if bitter"]
        }
      },
      {
        id: "DESSERT-008",
        name: "Gelato Selection",
        portion: "3 scoops (150g total)",
        batchYield: "20 units (3L total)",
        category: "Control System",
        price: "£6.00",
        cost: "£1.40",
        gp: "76%",
        ingredients: "Defined by flavor (Gelato Base #4)",
        cookTemp: "-12°C (Service Point)",
        cookTime: "N/A",
        reheatMethod: "N/A",
        shelfLife: "7 days frozen",
        method: "Temper at -12°C for 20 mins before service → Use warm, dry scoop → 3 uniform spherical pulls → Serve in chilled bowl",
        texture: "Mandatory Wafer Curl + Mint",
        allergens: ["dairy", "variable"],
        pass: "Clean spherical scoops · no ice crystals · slow melt",
        station: "Cold Station",
        passHoldLimit: "2 min (Plated)",
        mep6x6: {
          core: "3 Scoops Gelato (Various)",
          sauce: "N/A",
          texture: "Wafer Curl",
          garnish: "Mint Leaf",
          holding: "Frozen (-18°C) / Tempered (-12°C)",
          service: "Scoop → Plate → Wafer → Send"
        },
        fellini: {
          identity: "Tempered Fat System",
          pressurePoint: "Freezer-to-Pass timing",
          controlLaw: "Any rapid mismatch between component temperatures risks split, grain, collapse, or set failure.",
          watchPoint: "Geometric sphere integrity",
          passSignals: [
            "velvet matte surface",
            "geometric sphere integrity maintained",
            "frosted bowl on service",
            "slow melting index",
            "zero visible ice crystals"
          ],
          failSignals: [
            "icy texture / crystals",
            "crystal bleed at base",
            "quick melt puddled in bowl",
            "collapsed sphere shape",
            "surface gloss (indicates melting)"
          ],
          autoReject: [
            "ice crystals",
            "melt puddle",
            "collapsed shape"
          ],
          verdict: "PASS: Sphere-locked, velvet, tempered.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Discard if crystallized. Check tempering probe."
        },
        executionCard: {
          setup: ["Gelato tempered", "Chilled bowls ready", "Wafers dry"],
          build: ["1. Pull 3 scoops", "2. Plate in triangle", "3. Apply Texture Lock — wafer", "4. Garnish mint", "5. Send"],
          buildSequence: "Pull → Plate → Texture Lock → Garnish",
          buildSignal: "No 'puddling' at base. Scoops must hold height index of 4cm+.",
          timeLaw: "≤30s",
          failures: ["Melted base", "Ice crystals", "Bowl condensation"],
          reset: ["New scoop", "Fresh bowl"]
        }
      },
      {
        id: "DESSERT-009",
        name: "Lemon Tart",
        portion: "1 slice (120g)",
        batchYield: "12 portions (Pattern Exception)",
        category: "Margin Engine",
        price: "£7.50",
        cost: "£1.60",
        gp: "78%",
        ingredients: "Pastry: Flour (300g) · Butter (150g) · Water (50ml) | Filling: Lemon Juice (300ml) · Caster Sugar (250g) · Eggs (6/300g) · Double Cream (150ml)",
        cookTemp: "140°C (Bake) / 3-4°C (Set)",
        cookTime: "35-45 min",
        reheatMethod: "N/A (Chilled Service)",
        shelfLife: "48h chilled",
        method: "Blind bake pastry → Combine filling → Bake at 140°C until slight wobble (35-45m) → Cool → Rest 12h min → Slice with hot knife into 12",
        texture: "Mandatory Fresh Raspberries + Lemon Zest",
        allergens: ["gluten", "dairy", "eggs"],
        pass: "Clean sharp edges · wobble-free set · intense citrus punch",
        station: "Pastry / Cold",
        passHoldLimit: "15 min (Ambient)",
        mep6x6: {
          core: "Pre-sliced Lemon Tart",
          sauce: "Raspberry Coulis (optional)",
          texture: "Shortcrust Pastry Snap",
          garnish: "Crème fraîche · Raspberries",
          holding: "Chilled (3–4°C)",
          service: "Lift Slice → Garnish → Send"
        },
        fellini: {
          identity: "Technical Emulsion",
          pressurePoint: "Acid-set integrity",
          controlLaw: "The cream must set with a uniform, trembling structure that holds form but yields instantly under pressure. Any rubber texture, loose center, or split layer = system failure.",
          watchPoint: "Opaque silk surface uniformity",
          passSignals: [
            "gentle wobble",
            "clean unmould or spoon scoop",
            "no bubbles or holes",
            "even set edge to centre",
            "glossy surface",
            "clean dairy aroma"
          ],
          failSignals: [
            "rubbery texture",
            "loose or unset centre",
            "fat separation",
            "air bubbles from poor strain",
            "grainy mouthfeel",
            "broken surface"
          ],
          autoReject: [
            "soggy pastry",
            "rubber curd",
            "curd slide"
          ],
          verdict: "PASS: Clean edge, opaque silk set.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Keep chilled. Discard if pastry is wet."
        },
        executionCard: {
          setup: ["Tart sliced", "Raspberries prepped", "Crème fraîche ready"],
          build: ["1. Lift slice", "2. Plate centre", "3. Quenelle cream", "4. Texture Lock — Raspberries", "5. Send"],
          buildSequence: "Lift → Plate → Quenelle → Finish",
          buildSignal: "90-degree slice edge. Cream must be tightly quenelled with zero bleed.",
          timeLaw: "≤45s",
          failures: ["Broken pastry", "Bleeding curd", "Messy edge"],
          reset: ["New slice", "Clean plate"]
        }
      },
      {
        id: "DESSERT-010",
        name: "Affogato",
        portion: "1 scoop Gelato · 1 shot Espresso",
        batchYield: "20 units (per service)",
        category: "Control System",
        price: "£5.50",
        cost: "£1.20",
        gp: "78%",
        ingredients: "Vanilla Gelato (50g) · Hot Espresso (30ml)",
        cookTemp: "Hot (Coffee) / Frozen (Gelato)",
        cookTime: "30s (Espresso pull)",
        reheatMethod: "N/A",
        shelfLife: "N/A (Instaneous)",
        method: "Place gelato in frozen bowl → Pull fresh espresso shot into warm jug → Serve components side-by-side → Pour at table",
        texture: "Mandatory Amaretti Biscuits (2) + Choc Shavings",
        allergens: ["dairy", "nuts"],
        pass: "Immediate melt contrast · crema visible · audible crunch",
        station: "Bar / Pastry Sink",
        passHoldLimit: "60s (Pour timing)",
        mep6x6: {
          core: "Vanilla Gelato Scoop",
          sauce: "Hot Espresso Shot",
          texture: "Amaretti Biscuits",
          garnish: "Dark Chocolate Shavings",
          holding: "Bowl pre-frozen (-18°C)",
          service: "Scoop Gelato → Draw Espresso → Plate → Garnish → Send"
        },
        fellini: {
          identity: "Theater Service Emulsion",
          pressurePoint: "Thermal Shock Timing",
          controlLaw: "Temperature Shock Law — Any rapid mismatch between component temperatures risks split, grain, collapse, or set failure.",
          watchPoint: "Immediate crema preservation",
          passSignals: [
            "steaming pour",
            "creamy islands forming",
            "immediate crema preservation",
            "hot/cold contrast locked",
            "audible amaretti crunch"
          ],
          failSignals: [
            "cold espresso",
            "melted gelato base on arrival",
            "missing/soggy crunch",
            "no crema visibility",
            "flat flavor profile"
          ],
          autoReject: [
            "melted base arrival",
            "cold espresso",
            "missing crunch"
          ],
          verdict: "PASS: Steaming, islands, contrast.",
          validationPoint: ["postPrep", "preService", "atPass"],
          recoveryMove: "Re-draw espresso if cooling."
        },
        executionCard: {
          setup: ["Frozen bowls ready", "Garnish prepped", "Coffee machine ready"],
          build: ["1. Prep cold bowl with gelato", "2. Draw espresso shot", "3. Add biscuits", "4. Send with espresso jug"],
          buildSequence: "Bowl Prep → Pull Shot → Garnish → Immediate Send",
          buildSignal: "Espresso must be steaming on arrival. Bowl must show frost layer.",
          timeLaw: "≤45s",
          failures: ["Melted gelato", "Weak coffee", "Missing crunch"],
          reset: ["Discard and rebuild"]
        }
      },
      {
        id: "DESSERT-011",
        name: "Seasonal Flex Slot",
        portion: "Defined by special",
        batchYield: "20 units (Hard Law)",
        category: "Flex Slot",
        price: "£7.50",
        cost: "£1.80",
        gp: "76%",
        ingredients: "Defined by seasonal availability",
        method: "Follow 6x6 MEP Law → batch prep 20 units → maintain server-side control",
        texture: "Mandatory Crunch Layer",
        allergens: ["variable"],
        pass: "Adheres to v2.5.2a quality lock",
        station: "Pastry",
        mep6x6: {
          core: "Defined by seasonal special",
          sauce: "Defined by seasonal special",
          texture: "Defined by seasonal special (Mandatory Crunch)",
          garnish: "Defined by seasonal special",
          holding: "Batch prepped / pre-portioned",
          service: "Plate → Finish → Send"
        },
        failurePoints: ["Inconsistency with core 5 items"],
        chefNote: "Slot reserved for seasonal variation. Must not exceed 6 items total.",
        larousse: {
          principle: "System flexibility within a fixed-mass framework.",
          method: ["Define spec", "Batch 20", "Service Lock"],
          quality: ["Consistent with core"],
          faults: ["Menu creep"],
          correction: ["Remove item"]
        },
        fellini: {
          identity: "The Innovation Valve.",
          pressurePoint: "Training lag on new item.",
          controlLaw: "Standard Compliance Lock",
          watchPoint: "Yield accuracy.",
          passSignal: "Perfect 20/20 batch.",
          failureSignal: "Partial batch prep.",
          recoveryMove: "Full batch reset."
        },
        executionCard: {
          setup: ["Special prep ready"],
          build: ["1. Assemble per seasonal spec", "2. Texture lock", "3. Send"],
          buildSequence: "Defined by Special",
          buildSignal: "Defined by Special",
          timeLaw: "≤60s",
          failures: ["Incomplete setup"],
          reset: ["Full teardown"]
        }
      },
      {
        id: "PREP-031",
        name: "Praline Crunch",
        type: "prep_component",
        category: "structural_sugar_fat_system",
        engine: "Dessert Engine / Texture Layer",
        purpose: "Provide structural crunch and contrast to soft dessert systems (cake, cream, gel). Acts as a texture lock in plated desserts.",
        prepLevel: "Level 6: 600g total output",
        scaleYield: "Scale 20: 2kg total output",
        portionLogic: "8–12g per dish | hand-broken shards",
        shelfLife: "24h (Max Life)",
        timeState: "fresh | softening | failed",
        ingredients: "Caster sugar · Hazelnuts or almonds (lightly toasted)",
        method: "Dry caramelise sugar to golden amber → add toasted nuts → pour onto silicone mat → break into shards",
        allergens: ["nuts"],
        station: "Pastry",
        pass: "Clean snap · dry structure · golden amber · stable shards",
        storage: "Dry storage · airtight container · protect from humidity",
        fellini: {
          identity: "Caramel Structure Law",
          pressurePoint: "Humidity absorption / Caramel stickiness",
          watchPoint: "Caramel color (Amber lock)",
          controlLaw: "Caramel Structure Law — Sugar must reach correct caramelisation stage and set into a dry, brittle structure. Any moisture, under-cook, or over-burn results in structural failure.",
          passSignals: [
            "Clean snap (audible crack)",
            "Dry, glass-like structure",
            "Golden amber colour",
            "Even nut distribution",
            "Breaks into shards, not crumbs",
            "No stickiness on contact"
          ],
          failSignals: [
            "Sticky or tacky surface",
            "Soft bend (not brittle)",
            "Bitter or burnt flavour",
            "Dull or pale colour",
            "Clumping into mass"
          ],
          autoReject: [
            "Moisture absorption present",
            "No snap",
            "Burnt caramel profile",
            "Collapsed structure"
          ],
          verdict: "PASS: Clean snap, dry structure, golden amber, stable shards",
          validationPoint: ["postPrep", "preService", "atPass"],
          conversionAction: "convert_to_crumble_base"
        },
        executionCard: {
          setup: ["Sugar measured", "Nuts toasted & warm", "Silicone mat ready", "Airtight container ready"],
          build: [
            "1. Dry caramelise sugar to golden amber",
            "2. Add nuts & coat",
            "3. Pour & spread thin",
            "4. Cool completely",
            "5. Break into shards"
          ],
          timeLaw: "15 min (Batch)",
          failures: ["Sticky caramel", "Soft texture", "Burnt sugar"],
          reset: ["Discard if sticky", "Recaramelise new batch"]
        }
      }
    ],
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
    items: iceCreamRecipes.systems as any,
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
