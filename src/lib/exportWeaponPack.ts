export type ExportSection = "operator" | "unit" | "pack" | "system" | "weapon";

type ExportWeaponPackOptions = {
  section?: ExportSection;
  title?: string;
  items?: any[];
  onComplete?: () => void;
};

function waitForNextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function ensurePrintRoot(): HTMLElement {
  const root = document.getElementById("print-area");
  if (!root) {
    throw new Error("Element with id print-area not found");
  }
  return root;
}

function setPrintMode(section: ExportSection) {
  document.body.setAttribute("data-export-section", section);
  document.body.setAttribute("data-export-mode", "true");
}

function clearPrintMode() {
  document.body.removeAttribute("data-export-section");
  document.body.removeAttribute("data-export-mode");
}

/**
 * Standardized Export Engine for GALYONS 6x6 Systems.
 * Handles the logic required to stabilize DOM and fire print/PDF capture.
 */
export async function ExportWeaponPack(
  options: ExportWeaponPackOptions = {}
): Promise<void> {
  const { section = "weapon", title = "FORGE Master Bible Export", onComplete } = options;
  const previousTitle = document.title;
  
  try {
    ensurePrintRoot();
    setPrintMode(section);
    document.title = title;
    
    // Controlled delay for hydration and font rendering
    await waitForNextFrame();
    await waitForNextFrame();
    
    // In our specific environment, we use the window.print() or the state-based exportToPDF
    // This function acts as the stabilization layer before that trigger
  } catch (error) {
    console.error("Export Engine Critical Failure:", error);
    throw error;
  } finally {
    // Cleanup handled by the caller or specialized hooks in App.tsx
  }
}
