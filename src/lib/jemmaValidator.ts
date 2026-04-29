export type JemmaVerdict = "PASS" | "CONDITIONAL" | "FAIL";

export interface JemmaValidationResult {
  verdict: JemmaVerdict;
  audit: string;
  missingFields: string[];
  warnings: string[];
  autoReject: boolean;
}

const REQUIRED_FIELDS = [
  "id",
  "name",
  "engine",
  "section",
  "rootLayer",
  "controlLaw",
  "ingredients",
  "method",
  "holding",
  "service",
  "timeLaw",
  "validationPoints",
  "failureLaw",
  "autoReject",
  "status",
  "executionCard"
];

export function runJemmaValidation(item: any): JemmaValidationResult {
  const missingFields = REQUIRED_FIELDS.filter((field) => {
    const value = (item as any)[field];
    if (value === undefined || value === null) return true;
    if (typeof value === "string" && value.trim() === "") return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === "object" && Object.keys(value).length === 0) return true;
    return false;
  });

  const warnings: string[] = [];
  const vPoints = item.validationPoints;
  if (vPoints) {
    if (!vPoints.postPrep) warnings.push("Missing postPrep validation point.");
    if (!vPoints.preService) warnings.push("Missing preService validation point.");
    if (!vPoints.atPass) warnings.push("Missing atPass validation point.");
  }
  
  if (item.status !== "ACTIVE") warnings.push("Item is not marked ACTIVE.");
  if (item.executionCard !== true) warnings.push("executionCard is not true.");

  let verdict: JemmaVerdict = "PASS";
  if (missingFields.length > 0) {
    verdict = "FAIL";
  } else if (warnings.length > 0) {
    verdict = "CONDITIONAL";
  }

  return {
    verdict,
    audit: item.name ? `AUDIT: ${item.name}` : "AUDIT: UNKNOWN ITEM",
    missingFields,
    warnings,
    autoReject: !!item.autoReject
  };
}

export function renderJemmaResult(result: JemmaValidationResult): string {
  const lines = [
    "JEMMA VALIDATION SYSTEM — LOCAL AUDIT",
    "━".repeat(40),
    `TITLE: ${result.audit}`,
    `VERDICT: ${result.verdict}`,
    "━".repeat(40),
  ];

  if (result.missingFields.length > 0) {
    lines.push("TECHNICAL FAULTS (MISSING FIELDS):");
    result.missingFields.forEach(f => lines.push(`❌ ${f}`));
    lines.push("");
  }

  if (result.warnings.length > 0) {
    lines.push("WATCH POINTS / DOCTRINE GAPS:");
    result.warnings.forEach(w => lines.push(`⚠ ${w}`));
    lines.push("");
  }

  if (result.verdict === "PASS") {
    lines.push("✓ SYSTEM DOCTRINE CONFIRMED");
    lines.push("✓ NO DRIFT DETECTED");
  } else if (result.verdict === "CONDITIONAL") {
    lines.push("◈ SYSTEM DOCTRINE PARTIALLY CONFIRMED");
    lines.push("◈ MINOR DRIFT / WATCH POINTS DETECTED");
  } else {
    lines.push("REJECTED — MAJOR DOCTRINE FAILURE");
    lines.push("ENGINE STATUS: LOCKED");
  }

  if (result.autoReject) {
    lines.push("");
    lines.push("AUTO REJECT PROTOCOL: ACTIVE");
  }

  return lines.join("\n");
}
