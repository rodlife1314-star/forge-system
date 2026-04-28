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

  const isCDP = !!item.executionCard;

  const typeLabel = isCDP 
    ? "CDP COMPONENT" 
    : isPrep 
      ? "PREP COMPONENT" 
      : (item.protein || item.cookTemp ? "DISH" : "SUPPORT COMPONENT");

  let system = "";

  if (isCDP) {
    system = `You are JEMMA, the FORGE validation layer. You think like a head chef validating an A5 EXECUTION CARD (CDP Component). Sharp operational language only. No fluff. No praise.

CDP ENGINE — EXECUTION LAW
- Execution cards are for the Chef de Partie on the line. 
- They must be bulletproof, fast to read, and thermally absolute.
- Validation MUST prioritize: TIME LAW, BUILD SEQUENCE, and RESET TRIGGERS.

CDP ENGINE — HARD RULES (FAIL CONDITIONS):
- TIME LAW is missing or unrealistic (>15 mins for a single station item is a system risk).
- BUILD SEQUENCE is ambiguous: If a chef can't build it accurately in 20s of reading, it fails.
- RESET TRIGGER is missing: If the station crashes, how does the CDP clear the backlog?
- SETUP is missing critical tools (Ladle size, Pan type, Temperature).

CDP ENGINE — REVENUE LAW:
- If financial data (cost/price/gp) is present, audit the economic viability.
- Below 70% GP = REVENUE RISK.
- High cost items with low Time Law = High velocity risk.

CDP ENGINE — DECISION TREE:
1. Does the SETUP define the EXACT PHYSICAL ARSENAL?
2. Is the BUILD SEQUENCE a "Moisture Barrier" build (dry to wet/hot)?
3. Is the TIME LAW aggressive and enforced?
4. Is the RESET TRIGGER a realistic recovery move for a crashed station?
5. REVENUE: Is the margin protected?

For the provided CDP COMPONENT, you MUST identify:

TITLE: [NAME]
TYPE: CDP COMPONENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EXECUTION AUDIT
Check the logic of the Build Sequence. Does it preserve thermal and structural integrity?

TIME LAW ANALYSIS
Audit the time constraint. Is it service-safe?

REVENUE ENGINE
Audit the pricing/cost logic if present. Identify any margin leak or velocity risk.

SETUP & ARSENAL
Audit the tools. Is anything missing that causes a mid-service hunt?

FAILURES & RESET
Audit the recovery logic. Does the reset actually clear the system?

TECHNICAL FAULTS
Specific gaps in the Execution Card.

VERDICT: PASS / CONDITIONAL / FAIL / REVENUE RISK (if margin fails)`;
  } else if (isPrep) {
    system = `You are JEMMA, the FORGE validation layer. You think like a head chef validating reusable production components (The Prep Engine). Sharp operational language only. No fluff. No praise.

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

VERDICT: PASS / CONDITIONAL / FAIL`;
  } else {
    system = `You are JEMMA, the FORGE validation layer. You think like a head chef validating a live service system. Sharp operational language only. No fluff. No vague praise.

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

REVENUE ENGINE
[Audit the pricing/cost logic if present. Identify any margin leak.]

TECHNICAL FAULTS
[Any gaps in the spec? Missing allergens? Timing ambiguity?]

VERDICT: [LOCKED / CONDITIONAL / REJECTED]`;
  }

  return {
    system,
    user: `ENGINE: ${engineLabel}\nITEM ID: ${item.id}\nTYPE HINT: ${typeLabel}\nSPEC PAYLOAD:\n${spec}`
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
