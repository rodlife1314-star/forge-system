// src/forge/engines/iceCreamRecipes.ts

export const iceCreamRecipes = {
  id: "forge-ice-cream-recipes-v1",
  title: "FORGE Ice Cream Recipes — SIXES Core Systems",
  status: "ACTIVE",
  version: "1.0",
  parentDoctrine: "forge-ice-cream-engine-v1",

  systems: [
    {
      id: "vanilla-master-base",
      name: "Vanilla Bean Ice Cream",
      engine: "ICE_CREAM",
      section: "MASTER",
      rootLayer: "Classic egg-yolk custard suspension.",
      controlLaw: "82–84°C Custard Law: Nap Stage required for maximum shelf life.",
      status: "ACTIVE",
      executionCard: true,
      holding: "Harden at -18°C / Scoop at -12°C",
      service: "1 scoop per unit",
      timeLaw: "Ageing: 12h / Churn: 20 min",
      validationPoints: {
        postPrep: "Chill to ≤4°C within 30 minutes",
        preService: "Check for ice crystals",
        atPass: "Clean melt / Vanilla speckle"
      },
      failureLaw: "Icy texture / Eggy taste",
      autoReject: "Split fat / Grainy texture",
      type: "Custard Ice Cream",
      role: "MASTER_CALIBRATION_BASE",
      yieldBlock: {
        sixPortions: "600g",
        twentyPortions: "2000g",
      },
      ingredients: [
        { name: "Whole Milk 3.5%", six: 360, twenty: 1200, unit: "g" },
        { name: "Double Cream 36%", six: 120, twenty: 400, unit: "g" },
        { name: "Sucrose", six: 90, twenty: 300, unit: "g" },
        { name: "Dextrose", six: 24, twenty: 80, unit: "g" },
        { name: "Skim Milk Powder", six: 30, twenty: 100, unit: "g" },
        { name: "Egg Yolks", six: 60, twenty: 200, unit: "g" },
        { name: "Vanilla Bean", six: 1, twenty: 3, unit: "pod" },
        { name: "Locust Bean Gum", six: 1.2, twenty: 4, unit: "g" },
        { name: "Fine Salt", six: 1, twenty: 3, unit: "g" },
      ],
      method: [
        "Heat milk, cream, vanilla pod and seeds to 60°C; hold 10 minutes.",
        "Whisk sucrose, dextrose, milk powder and LBG together.",
        "Bring liquid to 45°C and add dry mix gradually while blending.",
        "Add yolks at 45–50°C while whisking.",
        "Cook to 82–84°C nappe stage. Do not exceed 85°C.",
        "Strain through fine chinois.",
        "Rapid chill to ≤4°C within 30 minutes.",
        "Age 6–12 hours at ≤4°C.",
        "Churn to -5°C draw temperature and harden at -18°C.",
      ],
      controlPoints: [
        "82–84°C custard cook",
        "≤4°C rapid chill",
        "6–12h ageing",
        "-5°C draw temperature",
      ],
      failureLaws: [
        "Icy texture",
        "Eggy taste",
        "Thin body",
        "Greasy finish",
        "Grainy dispersion",
      ],
      passCriteria: [
        "Smooth, homogeneous base (no split or grain)",
        "Correct viscosity at nappe stage (custards)",
        "Stable frozen structure (no ice crystals)",
        "Scoopable at -12°C to -14°C",
        "Clean melt (no water bleed, no fat separation)"
      ],
      allergens: ["DAIRY", "EGG"],
      serviceNotes: [
        "Scoop temp: -12°C to -14°C",
        "Hold time in cabinet: 4-6 hours optimal",
        "Allergen flags: Dairy, Egg"
      ],
      fellini: {
        identity: "VANILLA CALIBRATION SYSTEM v2.5",
        controlLaw: "82–84°C Custard Law: Nap Stage required for maximum shelf life + mouthfeel.",
        stabiliserHydrationLaw: "Pasteurisation Law: 82–84°C must be held for 30–60 seconds minimum.",
        validationPoints: {
          postPrep: "Chill to ≤4°C within 30 minutes (Cooling Law). Minimum 12h aging.",
          preService: "Check for ice crystals; verify uniform speck distribution.",
          atPass: "Clean melt; strong vanilla profile; no water bleed."
        },
        criticalAdditions: [
          "Salt Precision: 0.15–0.2% mandatory for flavour amplification.",
          "Cooling Law: Rapid thermal drop to ≤4°C is mandatory for food safety."
        ],
        verdict: "APPROVED — FULLY AUDITED",
      },
    },

    {
      id: "dark-chocolate-70-system",
      name: "Dark Chocolate Ice Cream 70%",
      engine: "ICE_CREAM",
      section: "CORE",
      rootLayer: "High-fat cocoa solid hybrid system.",
      controlLaw: "Hot Emulsion Lock: Shear blend hot base over dark chocolate immediately.",
      status: "ACTIVE",
      executionCard: true,
      holding: "Harden at -18°C / Scoop at -12°C",
      service: "1 scoop per unit",
      timeLaw: "Ageing: 12h / Churn: 20 min",
      validationPoints: {
        postPrep: "Glossy elastic base",
        preService: "High-shear blend pre-churn",
        atPass: "Dense texture / Slow melt"
      },
      failureLaw: "Grainy cocoa / Gray finish",
      autoReject: "Split base / Chalky texture",
      type: "Custard-Hybrid Ice Cream",
      role: "FAT_COCOA_SOLID_SYSTEM",
      yieldBlock: {
        sixPortions: "600g",
        twentyPortions: "2000g",
      },
      ingredients: [
        { name: "Whole Milk 3.5%", six: 330, twenty: 1100, unit: "g" },
        { name: "Double Cream 36%", six: 90, twenty: 300, unit: "g" },
        { name: "Sucrose", six: 75, twenty: 250, unit: "g" },
        { name: "Dextrose", six: 30, twenty: 100, unit: "g" },
        { name: "Skim Milk Powder", six: 24, twenty: 80, unit: "g" },
        { name: "Egg Yolks", six: 48, twenty: 160, unit: "g" },
        { name: "70% Dark Chocolate", six: 90, twenty: 300, unit: "g" },
        { name: "Alkalised Cocoa Powder", six: 12, twenty: 40, unit: "g" },
        { name: "Locust Bean Gum", six: 1.2, twenty: 4, unit: "g" },
        { name: "Fine Salt", six: 1, twenty: 3, unit: "g" },
      ],
      method: [
        "Whisk sucrose, dextrose, milk powder, cocoa powder and LBG together.",
        "Heat milk and cream to 45°C.",
        "Add dry mix gradually while blending.",
        "Add yolks at 45–50°C.",
        "Cook to 82–84°C while moving continuously.",
        "Pour hot base over chopped chocolate.",
        "Blend with immersion blender until fully emulsified.",
        "Rapid chill to ≤4°C within 30 minutes.",
        "Age 6–12 hours.",
        "Churn to -5°C draw temperature and harden at -18°C.",
      ],
      controlPoints: [
        "Full cocoa dispersion",
        "No fat separation",
        "82–84°C cook",
        "≤4°C rapid chill",
      ],
      failureLaws: [
        "Grainy cocoa texture",
        "Greasy mouthfeel",
        "Hard block",
        "Split base",
        "Chalky finish",
      ],
      passCriteria: [
        "Smooth, homogeneous base (no split or grain)",
        "Correct viscosity at nappe stage (custards)",
        "Stable frozen structure (no ice crystals)",
        "Scoopable at -12°C to -14°C",
        "Clean melt (no water bleed, no fat separation)"
      ],
      allergens: ["DAIRY"],
      serviceNotes: [
        "Scoop temp: -12°C to -14°C",
        "Hold time in cabinet: 4-6 hours optimal",
        "Allergen flags: Dairy"
      ],
      fellini: {
        identity: "COCOA EMULSION SYSTEM v2.5",
        controlLaw: "Hot Emulsion Lock: Hot base MUST be poured over chocolate and shear blended immediately.",
        stabiliserHydrationLaw: "Cocoa Dispersion Law: Cocoa powder must be fully hydrated before yolk addition.",
        validationPoints: {
          postPrep: "Verify zero graininess; base must be glossy and elastic.",
          preService: "High-shear blend pre-churn to unlock cocoa fats.",
          atPass: "Dense texture; slow melt; deep intensity."
        },
        autoReject: [
          "Grain/Chalkiness (Poor hydration/shear)",
          "Fat separation (Emulsion failure)",
          "Block set (Cocoa fat imbalance)"
        ],
        criticalAdditions: [
          "Fat Balance Warning: Excess cocoa fat will cause hard-set block at -18°C.",
          "Thermal Curve: Do not churn below -6°C to preserve fat structure."
        ],
        verdict: "APPROVED — FULLY AUDITED",
      },
    },

    {
      id: "sicilian-pistachio-gelato",
      name: "Sicilian Pistachio Gelato",
      engine: "ICE_CREAM",
      section: "ROTATIONAL",
      rootLayer: "Nut-paste lipid-stabilized system.",
      controlLaw: "Pistachio Temperature Law: Shear paste at 20°C into aged base.",
      status: "ACTIVE",
      executionCard: true,
      holding: "Harden at -18°C / Scoop at -12°C",
      service: "1 scoop per unit",
      timeLaw: "Ageing: 12h / Churn: 20 min",
      validationPoints: {
        postPrep: "Stable emulsion / no oil slick",
        preService: "Zero oil streaking",
        atPass: "Scoop holds clean edge"
      },
      failureLaw: "Oil separation / Dull color",
      autoReject: "Grainy LBG / Water bleed",
      type: "Gelato",
      role: "NUT_PASTE_HIGH_FAT_SYSTEM",
      yieldBlock: {
        sixPortions: "600g",
        twentyPortions: "2000g",
      },
      ingredients: [
        { name: "Whole Milk 3.5%", six: 360, twenty: 1200, unit: "g" },
        { name: "Heavy Cream 36%", six: 60, twenty: 200, unit: "g" },
        { name: "Sucrose", six: 90, twenty: 300, unit: "g" },
        { name: "Skim Milk Powder", six: 30, twenty: 100, unit: "g" },
        { name: "Pure Pistachio Paste 100%", six: 60, twenty: 200, unit: "g" },
        { name: "Locust Bean Gum", six: 1.5, twenty: 5, unit: "g" },
        { name: "Fine Salt", six: 1.5, twenty: 5, unit: "g" },
      ],
      method: [
        "Whisk sucrose, milk powder and LBG together.",
        "Incorporate into milk and cream.",
        "Heat to 85°C; HOLD 2 MINUTES (NON-NEGOTIABLE) for full LBG bloom.",
        "Rapid chill to ≤4°C.",
        "Age 6–12 hours.",
        "Temperate pistachio paste to ~20°C.",
        "Shear in paste with high-shear immersion blender into cold aged base.",
        "Churn to -5°C draw temperature and harden at -18°C.",
      ],
      controlPoints: [
        "85°C hydration (2 min hold)",
        "Paste tempered to 20°C",
        "Cold base shear phase",
        "Stable emulsion (no split)",
      ],
      failureLaws: [
        "Oil separation (shock)",
        "Weak hydration (icy)",
        "Grainy texture",
        "Dull color (oxidised)",
      ],
      passCriteria: [
        "Uniform green color",
        "Zero oil streaking",
        "Smooth, custard-like viscosity",
        "Clean edge scoop at -12°C",
      ],
      allergens: ["DAIRY", "NUT (PISTACHIO)"],
      serviceNotes: [
        "Scoop temp: -12°C to -14°C",
        "Hold time in cabinet: 4-6 hours optimal",
        "Allergen flags: Dairy, Nut (Pistachio)"
      ],
      fellini: {
        identity: "SICILIAN NUT SYSTEM v2.5",
        controlLaw: "Emulsion Integrity Law: Pistachio paste MUST be tempered to ~20°C and sheared into cold aged base (≤4°C). Prevents fat shock + oil separation.",
        stabiliserHydrationLaw: "Heat to 85°C, HOLD 2 MINUTES (NON-NEGOTIABLE) for full LBG bloom.",
        validationPoints: {
          postPrep: "Minimum 12 hours at ≤4°C; Base viscosity = thick custard; No grain / no separation.",
          preService: "Paste at ~20°C; High-shear immersion blend; Uniform green color; Zero oil streaking.",
          atPass: "Scoop holds clean edge at -12°C; No oil sweating; No rapid melt-off."
        },
        autoReject: [
          "Graininess (LBG/milk powder not hydrated)",
          "Oil slick (Emulsion failure/paste shock)",
          "Icing (Hardening failure)",
          "Dull colour (Oxidation/poor shear)",
          "Water bleed (Incomplete stabiliser activation)"
        ],
        criticalAdditions: [
          "Salt Law: 0.15% of total mix. Mandatory for fat balance.",
          "Paste Temperature Law: Paste MUST be tempered to 20°C. Cold paste = automatic instability risk."
        ],
        repeatability: "PASS",
        scalability: "PASS",
        stability: "PASS",
        verdict: "APPROVED",
      },
    },

    {
      id: "strawberry-brix-sorbet",
      name: "Strawberry Sorbet",
      engine: "ICE_CREAM",
      section: "SORBET",
      rootLayer: "Water-sugar-fruit suspension system.",
      controlLaw: "Brix Law: 28–32° Brix Mandatory (adjust for fruit variability).",
      status: "ACTIVE",
      executionCard: true,
      holding: "Harden at -18°C / Scoop at -12°C",
      service: "1 scoop per unit",
      timeLaw: "Ageing: 4h / Churn: 20 min",
      validationPoints: {
        postPrep: "Brix verified via refractometer",
        preService: "Vibrant color check",
        atPass: "Sharp fruit profile / No bleed"
      },
      failureLaw: "Icy texture / Slushy instability",
      autoReject: "Brix < 28 or > 32",
      type: "Brix-Controlled Sorbet",
      role: "FRUIT_WATER_PHASE_SYSTEM",
      yieldBlock: {
        sixPortions: "600g",
        twentyPortions: "2000g",
      },
      ingredients: [
        { name: "Fresh Strawberries Trimmed", six: 420, twenty: 1400, unit: "g" },
        { name: "Water", six: 60, twenty: 200, unit: "g" },
        { name: "Sucrose", six: 72, twenty: 240, unit: "g" },
        { name: "Dextrose", six: 30, twenty: 100, unit: "g" },
        { name: "Glucose Syrup DE40", six: 30, twenty: 100, unit: "g" },
        { name: "Lemon Juice", six: 12, twenty: 40, unit: "g" },
        { name: "Locust Bean Gum", six: 1, twenty: 3, unit: "g" },
        { name: "Fine Salt", six: 0.8, twenty: 2.5, unit: "g" },
      ],
      method: [
        "Blend strawberries to smooth purée.",
        "Pass through chinois if required.",
        "Whisk sucrose, dextrose and LBG together.",
        "Heat water and glucose to 40–45°C.",
        "Add dry mix while blending.",
        "Add fruit purée and blend thoroughly.",
        "Add lemon juice and salt.",
        "Rapid chill to ≤4°C.",
        "Check Brix target: 28–32°.",
        "Age 2–4 hours.",
        "Churn to -5°C draw temperature and harden at -18°C.",
      ],
      controlPoints: [
        "28–32° Brix",
        "No over-dilution",
        "Clean acidity",
        "No grainy stabiliser dispersion",
      ],
      failureLaws: [
        "Icy texture",
        "Slushy instability",
        "Flat flavour",
        "Weak colour",
        "Grainy texture",
      ],
      passCriteria: [
        "Brix 28–32 confirmed",
        "No ice crystal formation",
        "Bright, clean flavour",
        "Stable frozen structure (no ice crystals)",
        "Scoopable at -12°C to -14°C"
      ],
      allergens: ["NONE DECLARED (Produced in dairy environment)"],
      serviceNotes: [
        "Scoop temp: -12°C to -14°C",
        "Hold time in cabinet: 2-4 hours optimal",
        "Allergen flags: None"
      ],
      fellini: {
        identity: "BRIX WATER PHASE SYSTEM v2.5",
        controlLaw: "Brix Law: 28–32° Brix MUST be measured. Adjust sucrose ±5% based on fruit sweetness (Fruit Variability Law).",
        stabiliserHydrationLaw: "No Heat Law: Fruit purée must not be cooked beyond 45°C to preserve color/flavour.",
        validationPoints: {
          postPrep: "Brix verification (Refractometer mandatory).",
          preService: "Acid Balance Law: Lemon must sharpen, not dominate.",
          atPass: "Vivid color; no water bleed; sharp fruit profile."
        },
        criticalAdditions: [
          "Fruit Variability Law: Sucre level is a moving target based on fruit crop.",
          "Enzyme Control: Use fresh purée within 24h for maximum vibrancy."
        ],
        verdict: "APPROVED — FULLY AUDITED",
      },
    },

    {
      id: "tiramisu-signature-system",
      name: "Tiramisu Ice Cream",
      engine: "ICE_CREAM",
      section: "SIGNATURE",
      rootLayer: "Multilayered composite frozen system.",
      controlLaw: "Layering Integrity Law: Ripple must remain visible; no full integration.",
      status: "ACTIVE",
      executionCard: true,
      holding: "Harden at -18°C / Scoop at -12°C",
      service: "1 scoop per unit",
      timeLaw: "Ageing: 12h / Churn: 20 min",
      validationPoints: {
        postPrep: "Savoiardi lightly soaked only",
        preService: "Ripple temp matches base",
        atPass: "Distinct layers visible"
      },
      failureLaw: "Muddy texture / Soggy inclusions",
      autoReject: "Split ripple / Overmixed",
      type: "Composite Ice Cream",
      role: "SIGNATURE_BRAND_SYSTEM",
      yieldBlock: {
        sixPortions: "600g",
        twentyPortions: "2000g",
      },
      components: {
        coffeeBase: [
          { name: "Whole Milk", six: 330, twenty: 1100, unit: "g" },
          { name: "Double Cream", six: 90, twenty: 300, unit: "g" },
          { name: "Sucrose", six: 75, twenty: 250, unit: "g" },
          { name: "Dextrose", six: 30, twenty: 100, unit: "g" },
          { name: "Skim Milk Powder", six: 24, twenty: 80, unit: "g" },
          { name: "Egg Yolks", six: 48, twenty: 160, unit: "g" },
          { name: "Strong Espresso Reduction", six: 30, twenty: 100, unit: "g" },
          { name: "Instant Coffee Optional", six: 2, twenty: 6, unit: "g" },
          { name: "Locust Bean Gum", six: 1.2, twenty: 4, unit: "g" },
          { name: "Fine Salt", six: 1, twenty: 3, unit: "g" },
        ],
        mascarponeRipple: [
          { name: "Mascarpone", six: 90, twenty: 300, unit: "g" },
          { name: "Icing Sugar", six: 18, twenty: 60, unit: "g" },
          { name: "Double Cream", six: 30, twenty: 100, unit: "g" },
          { name: "Vanilla", six: 1, twenty: 3, unit: "g" },
        ],
        biscuitLayer: [
          { name: "Savoiardi / Sponge", six: 60, twenty: 200, unit: "g" },
          { name: "Espresso Light Soak", six: 20, twenty: 70, unit: "g" },
        ],
      },
      method: [
        "Prepare coffee ice cream base using Vanilla master protocol.",
        "Cook base to 82–84°C.",
        "Rapid chill to ≤4°C and age 6–12 hours.",
        "Whisk mascarpone ripple to soft pipeable consistency. Do not over-aerate.",
        "Lightly soak biscuit and dice into controlled cubes.",
        "Churn coffee base to -5°C.",
        "Layer ice cream, mascarpone ripple and biscuit pieces during extraction.",
        "Do not fully mix. Preserve distinct structure.",
        "Harden at -18°C for minimum 4 hours.",
      ],
      controlPoints: [
        "Coffee bitterness cuts through fat",
        "Ripple holds shape",
        "Biscuit not over-soaked",
        "Layered structure remains visible",
      ],
      failureLaws: [
        "Muddy texture",
        "Weak coffee",
        "Soggy inclusions",
        "Split ripple",
        "Flat flavour",
      ],
      passCriteria: [
        "Smooth, homogeneous base (no split or grain)",
        "Correct viscosity at nappe stage (custards)",
        "Stable frozen structure (no ice crystals)",
        "Scoopable at -12°C to -14°C",
        "Clean melt (no water bleed, no fat separation)"
      ],
      allergens: ["DAIRY", "EGG", "GLUTEN"],
      serviceNotes: [
        "Scoop temp: -12°C to -14°C",
        "Hold time: short controlled service window only",
        "Layered structure must remain visible",
        "Do not overmix ripple or biscuit layer"
      ],
      fellini: {
        identity: "SIGNATURE COMPOSITE SYSTEM v2.5",
        controlLaw: "Structure Law (Critical): Layering must remain visible—no full integration permitted.",
        stabiliserHydrationLaw: "Ripple Stability Law: Mascarpone component must be soft but NOT aerated.",
        validationPoints: {
          postPrep: "Moisture Control Law: Savoiardi must be lightly soaked—never saturated.",
          preService: "Verify ripple temperature (-5°C) matches base for clean layers.",
          atPass: "Short hold only; structural breakdown risk beyond 4–5 hours (Service Window Law)."
        },
        criticalAdditions: [
          "Service Window Law: Tiramisu systems decay faster than standard bases.",
          "Alcohol Management: Keep coffee soak at 12% ABV max to ensure freeze."
        ],
        verdict: "APPROVED — FULLY AUDITED",
      },
    },

    {
      id: "salted-caramel-wildcard",
      name: "Salted Caramel Ice Cream",
      engine: "ICE_CREAM",
      section: "ROTATIONAL",
      rootLayer: "Amber-reduction lipid emulsion.",
      controlLaw: "Caramel Temperature Law: 170–175°C Required (Hard Lock).",
      status: "ACTIVE",
      executionCard: true,
      holding: "Harden at -18°C / Scoop at -12°C",
      service: "1 scoop per unit",
      timeLaw: "Ageing: 12h / Churn: 20 min",
      validationPoints: {
        postPrep: "Deglaze with warm milk only",
        preService: "Check for crystal seeds",
        atPass: "Salt balance check"
      },
      failureLaw: "Bitter finish / Grainy crystallization",
      autoReject: "Burnt sugar / Oversalty",
      type: "Custard Ice Cream",
      role: "WILDCARD_ROTATIONAL_CONTROL",
      yieldBlock: {
        sixPortions: "600g",
        twentyPortions: "2000g",
      },
      ingredients: [
        { name: "Sucrose for Caramel", six: 90, twenty: 300, unit: "g" },
        { name: "Water for Caramel", six: 24, twenty: 80, unit: "g" },
        { name: "Whole Milk", six: 300, twenty: 1000, unit: "g" },
        { name: "Double Cream", six: 120, twenty: 400, unit: "g" },
        { name: "Dextrose", six: 30, twenty: 100, unit: "g" },
        { name: "Skim Milk Powder", six: 24, twenty: 80, unit: "g" },
        { name: "Egg Yolks", six: 48, twenty: 160, unit: "g" },
        { name: "Locust Bean Gum", six: 1.2, twenty: 4, unit: "g" },
        { name: "Fine Salt", six: 2, twenty: 6, unit: "g" },
      ],
      method: [
        "Heat sucrose and water to deep amber 170–175°C.",
        "Remove from heat and carefully deglaze with warm milk.",
        "Add remaining milk and cream.",
        "Heat to 45°C.",
        "Whisk dextrose, milk powder and LBG together.",
        "Add dry mix gradually while blending.",
        "Add yolks at 45–50°C.",
        "Cook to 82–84°C.",
        "Add salt after cook.",
        "Rapid chill to ≤4°C.",
        "Age 6–12 hours.",
        "Churn to -5°C and harden at -18°C.",
      ],
      controlPoints: [
        "170–175°C caramel",
        "No crystallisation",
        "Salt enhances, does not dominate",
        "Smooth caramel integration",
      ],
      failureLaws: [
        "Bitter finish",
        "Flat caramel",
        "Grainy crystallisation",
        "Over-salty profile",
        "Split base",
      ],
      passCriteria: [
        "Smooth, homogeneous base (no split or grain)",
        "Correct viscosity at nappe stage (custards)",
        "Stable frozen structure (no ice crystals)",
        "Scoopable at -12°C to -14°C",
        "Clean melt (no water bleed, no fat separation)"
      ],
      allergens: ["DAIRY", "EGG"],
      serviceNotes: [
        "Scoop temp: -12°C to -14°C",
        "Hold time in cabinet: 4-6 hours optimal",
        "Allergen flags: Dairy, Egg"
      ],
      fellini: {
        identity: "WILDCARD CARAMEL SYSTEM v2.5",
        controlLaw: "Caramel Law: 170–175°C only. Below = weak flavor; Above = bitter (Hard Lock).",
        stabiliserHydrationLaw: "Crystallisation Law: Zero agitation during dry caramel phase.",
        validationPoints: {
          postPrep: "Deglaze Control Law: Milk MUST be warm before addition to prevent thermal shock.",
          preService: "Check for crystal seeds; verify salt-fat suspension.",
          atPass: "Salt Balance Law: Salt must enhance, not dominate."
        },
        criticalAdditions: [
          "Deglaze Safety: Cold milk hitting 175°C sugar will cause explosive steam.",
          "Burn Risk: Caramel is non-forgiving. Second-stage cooling is vital."
        ],
        verdict: "APPROVED — FULLY AUDITED",
      },
    },
  ],

  globalServiceWindow: {
    storageTemperature: "-18°C",
    scoopTemperature: "-12°C to -14°C",
    drawTemperature: "-5°C",
    dairyAgeingWindow: "6–12 hours at ≤4°C",
    sorbetAgeingWindow: "2–4 hours at ≤4°C",
  },

  finalLock:
    "SIXES Ice Cream Recipe Systems are active, validated, and ready for FORGE v2.5.2 live testing.",
} as const;
