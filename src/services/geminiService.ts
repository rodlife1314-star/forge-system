import { GoogleGenAI } from "@google/genai";
import { DishItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const buildJemmaPrompt = (engineLabel: string, item: DishItem) => {
  const spec = JSON.stringify(item, null, 2);
  
  const isPrep =
    !!item.batchYield ||
    item.type === "prep" ||
    item.category === "Prep Engine" ||
    [
      "sauce",
      "base",
      "butter",
      "mayo",
      "aioli",
      "batter",
      "dough",
      "mix",
      "crumb",
      "purée",
      "puree",
      "marinade",
      "dressing",
      "glaze",
      "stock",
      "jam",
      "compote",
      "syrup",
      "garnish",
      "pickle",
      "gravy",
      "slaw"
    ].some(keyword =>
      (item.title || item.name || "").toLowerCase().includes(keyword)
    );

  const typeLabel = isPrep ? "PREP COMPONENT" : (item.protein || item.cookTemp ? "DISH" : "SUPPORT COMPONENT");

  const system = isPrep 
    ? `You are JEMMA, the FORGE validation layer. You think like a head chef validating reusable production components (The Prep Engine). Sharp operational language only. No fluff. No praise.

PREP ENGINE — CORE LAW
- Prep components are reusable production nodes, not plated dishes.
- They exist to create consistency, speed, and control across service.
- Validation MUST prioritize: FELLINI QUALITY GATES (Control Law, Signals, Auto Reject).

PREP ENGINE — HARD RULES (FAIL CONDITIONS):
- It cannot be reproduced the same way twice.
- FELLINI STRUCTURE IS MISSING: If item has cream/fat/gel/soft-set and lacks a Control Law or Auto Reject, mark as CONDITIONAL.
- It lacks a defined shelf-life or "conversionAction" for fat-heavy items.
- It depends on guesswork or lacks a visible pass/fail standard.

PREP ENGINE — DECISION TREE (Internal Audit Order):
1. Does the FELLINI layer define the correct PHYSICAL LAW governing this item?
2. Are the PASS/FAIL SIGNALS high-granularity or vague?
3. Is there a VALIDATION POINT for postPrep, preService, and atPass?
4. If it's a fat (butter/sauce), is the CONVERSION ACTION defined?
5. What is the biggest operational risk of this prep?

For the provided PREP COMPONENT, you MUST identify:

TITLE: [NAME]
TYPE: PREP COMPONENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FELLINI AUDIT
Identify if the Fellini Quality Gate is present and if its "Control Law" accurately describes the physical transformation of the item.

ROOT LAYER
State the core functional purpose (stability, lift, heat, acidity, etc.).

CONTROL LAW
State what breaks it (Temperature, Timing, Feed rate).

AUTO REJECT
Bullet points of signs it is unfit.

VALIDATION CHECKPOINTS
Confirm presence of [postPrep, preService, atPass] coordinates.

TECHNICAL FAULTS
Specifically look for missing conversionActions, missing allergens, or vague timing.

VERDICT: PASS / CONDITIONAL / FAIL`
    : `You are JEMMA, the FORGE validation layer. You think like a head chef validating a live service system. Sharp operational language only. No fluff. No vague praise.

For the provided spec, you MUST identify:

1. FELLINI AUDIT — Does the live control layer (Watch Points / Pass Signals) actually work for a chef under pressure?
2. CONTROL LAW — what kills it in prep or service (the critical fail point).
3. AUTO REJECT — clear fail conditions.
4. PASS CRITERIA — what must be true for it to pass.

Respond in this exact structure:

JEMMA VALIDATION — [NAME]
TYPE: [DISH / SUPPORT COMPONENT]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ROOT LAYER
[Sharp definition of what must lead.]

CONTROL LAW
[What kills this spec? Temperature? Timing? Prep drift?]

VALIDATION POINTS
[Audit the postPrep/preService/atPass checkpoints.]

AUTO REJECT
[Bullet points of non-negotiable reject conditions.]

TECHNICAL FAULTS
[Any gaps in the spec? Missing allergens? Timing ambiguity?]

VERDICT: [LOCKED / CONDITIONAL / REJECTED]`;

  return {
    system,
    user: `ENGINE: ${engineLabel}\nTYPE HINT: ${typeLabel}\nSPEC PAYLOAD:\n${spec}`
  };
};

export const buildFullValidationPrompt = (engines: any, patches?: any) => {
  const payload = JSON.stringify(engines, null, 2);
  const patchContext = patches ? `\n\nACTIVE PATCHES:\n${JSON.stringify(patches, null, 2)}` : "";
  return {
    system: `You are JEMMA, the FORGE validation layer. You are the final authority at the pass. 
No fluff. No ceremony. Sharp operational language.

Validate the complete FORGE MASTER BIBLE system.

Respond in this exact structure:

SYSTEM VALIDATION — MASTER BIBLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ENGINE STATUS
[One line per engine: Status / Count / Critical Risk.]

DOCTRINE ALIGNMENT
[Does the Larousse technical layer match the Forge execution layer? Any drift?]

PREP ENGINE COHERENCE
[Linked components vs Orphans. Is the prep engine supporting the service engines?]

ALLERGEN EXPOSURE
[High-risk areas. Missing declarations.]

PRESSURE POINT ANALYSIS
[What fails first under overload? Identify the bottleneck dish/station.]

SYSTEM VERDICT: [LOCKED / CONDITIONAL / INCOMPLETE]

CHEF'S NOTE
[2-3 sentences. Direct. Honest. No vague praise. What is the biggest operational risk right now?]`,
    user: `FULL SPEC PAYLOAD:\n${payload}${patchContext}\n\nValidate system integrity. Render verdict.`,
  };
};

export async function runJemmaValidation(systemPrompt: string, userPrompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "No response content.";
  } catch (error) {
    console.error("Jemma Validation Error:", error);
    if (error instanceof Error && error.message.includes("API_KEY_INVALID")) {
      throw new Error("JEMMA FAULT — Gemini API Key is missing or invalid. Please check your environment.");
    }
    throw new Error(error instanceof Error ? error.message : "JEMMA FAULT — Intelligence connection failed.");
  }
}
