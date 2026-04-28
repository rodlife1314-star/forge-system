// src/forge/engines/iceCreamDoctrine.ts

export const iceCreamDoctrine = {
  id: "forge-ice-cream-engine-v1",
  title: "FORGE Engine — Ice Cream Doctrine v1.0",
  status: "ACTIVE",
  version: "1.0",
  parentSystem: "FORGE v2.5.2",
  engineType: "FROZEN_SYSTEMS_DESSERT_LAYER",
  linkedRecipeEngine: "forge-ice-cream-recipes-v1",

  corePrinciple:
    "Ice cream is not flavour-first. It is structure-first: fat, sugar, water, air, temperature, and stabilisation control.",

  rootLayer: {
    name: "Phase-Controlled Emulsion + Freezing Point Management",
    phases: [
      "Liquid Phase — pre-freeze base",
      "Semi-Frozen Phase — churn/extraction",
      "Solid Phase — storage/service",
    ],
  },

  primaryLaws: [
    {
      name: "Freezing Point Law",
      rule: "Sugar controls softness. Low sugar creates hard/icy structure. Excess sugar creates slushy instability.",
      failure: "Hard block or unstable slush.",
    },
    {
      name: "Emulsion Law",
      rule: "Fat and water must bind through heat control, shear, and stabilisation.",
      failure: "Split base, greasy mouthfeel, or visible separation.",
    },
    {
      name: "Water Control Law",
      rule: "Free water must be bound through milk solids, sugars, stabilisers, or Brix control.",
      failure: "Ice crystal formation.",
    },
    {
      name: "Stabilisation Law",
      rule: "All systems require egg yolk, hydrocolloid, milk solids, or equivalent stabilisation.",
      failure: "Weak body, collapse, syneresis, or icy finish.",
    },
    {
      name: "Aging Law",
      rule: "Custard and dairy systems require 6–12 hours ageing at ≤4°C unless otherwise defined.",
      failure: "Poor hydration, weak texture, unstable churn.",
    },
    {
      name: "Conversion Law",
      rule: "Frozen product must convert cleanly to scoopable, smooth-melting service state.",
      failure: "Grain, hard block, split, or dull melt.",
    },
  ],

  sixesCoreStructure: [
    {
      slot: 1,
      name: "Vanilla",
      role: "Master Base / Calibration System",
    },
    {
      slot: 2,
      name: "Dark Chocolate",
      role: "Fat + Cocoa Solid System",
    },
    {
      slot: 3,
      name: "Pistachio",
      role: "Nut Paste / High-Fat Gelato System",
    },
    {
      slot: 4,
      name: "Fruit",
      role: "Water Phase / Brix-Controlled Sorbet System",
    },
    {
      slot: 5,
      name: "Tiramisu",
      role: "Signature Composite System",
    },
    {
      slot: 6,
      name: "Wildcard",
      role: "Rotational Control Slot",
    },
  ],

  globalFailureLaws: [
    "Icy texture",
    "Greasy mouthfeel",
    "Hard block",
    "Slushy instability",
    "Grainy texture",
    "Split emulsion",
    "Weak flavour carry",
    "Uncontrolled inclusion bleed",
  ],

  validationCheckpoints: {
    postPrep: [
      "Base smooth and homogeneous",
      "No visible separation",
      "Temperature logged",
      "Ageing window defined",
    ],
    preService: [
      "Frozen structure stable",
      "No crystal growth",
      "Correct scoop temperature window",
      "No fat bloom or surface collapse",
    ],
    atPass: [
      "Scoopable at -12°C to -14°C",
      "Clean melt",
      "Gloss and structure intact",
      "Flavour balanced",
    ],
  },

  mandatoryRecipeFields: [
    "name",
    "type",
    "yieldBlock",
    "ingredientsGramWeight",
    "method",
    "temperatureControls",
    "agingWindow",
    "failureLaws",
    "felliniQualityGate",
  ],

  operatorRules: [
    "Do not chase flavour before structure.",
    "Do not skip ageing.",
    "Do not overload inclusions.",
    "Do not ignore temperature.",
    "Do not use vague measurements.",
    "Do not approve recipes without validation checkpoints.",
  ],

  felliniQualityGate: {
    controlLaw: "PASS",
    repeatability: "PASS",
    scalability: "PASS",
    stability: "PASS",
    verdict: "APPROVED",
  },

  systemLinks: [
    "DESSERT_ENGINE",
    "PREP_ENGINE",
    "SAUCE_AND_SAUCIER_PROTOCOLS",
    "FORGE_INTELLIGENCE_LAYER",
  ],

  finalLock:
    "ICE CREAM ENGINE is structured, governed, scalable, and zero-drift compliant.",
} as const;
