import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Pizza, 
  Flame, 
  Beef, 
  ShieldCheck, 
  Activity, 
  AlertTriangle,
  Zap,
  Cpu,
  Terminal,
  Database,
  Salad,
  Utensils,
  Cake,
  IceCream,
  Menu,
  Printer,
  Download,
  Calendar,
  FileText,
  FileDown,
  Copy,
  Check,
  ClipboardCheck,
  Send,
  Globe,
  Shield,
  Plus,
  Trash2,
  Settings,
  MessageSquare,
  BookOpen
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ENGINES, JEMMA_BURGER_VALIDATION_PATCH, BURGER_ENGINE_PATCH } from "./constants";
import { DishItem, JemmaMode, OperationalLayer } from "./types";
import { buildJemmaPrompt, buildFullValidationPrompt } from "./services/geminiService";
import { runJemmaValidation as localJemmaValidation, renderJemmaResult } from "./lib/jemmaValidator";
import { exportJemmaPDF, exportJemmaDocx, copyCleanSpec } from "./services/exportService";
import { ExportWeaponPack as runWeaponExport } from "./lib/exportWeaponPack";
import { OperatorPrintCard, UnitSpecificationPrint, PrintPackDocument, FullSystemPackDocument, WeaponSystemPack } from "./components/PrintViews";
import { exportToPDF } from "./services/pdfService";
import { ValidationStatusLayer } from "./components/ValidationStatusLayer";
import { RenderSwitch } from './components/RenderSwitch';
import { getEngineByKey } from './forge/engines/forgeOutputRouter';
import { SpecTable } from './components/SpecTable';
import { generateIceCreamSupply, getSupplierFriendlyMapping, formatQuantity } from "./forge/engines/supplyEngine";
import { calculateBatchCost, formatCostReport } from "./forge/engines/costEngine";
import { calculatePricing, getPricingScenarios } from "./forge/engines/pricingEngine";

export default function App() {
  const [activeEngine, setActiveEngine] = useState("all");
  const [showValidationStatus, setShowValidationStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DishItem | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<OperationalLayer | null>(null);
  const [jemmaOutput, setJemmaOutput] = useState("");
  const [jemmaLoading, setJemmaLoading] = useState(false);
  const [jemmaMode, setJemmaMode] = useState<JemmaMode | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [printMode, setPrintMode] = useState<null | "operator" | "unit" | "pack" | "system" | "weapon">(null);
  const [showSupplyMatrix, setShowSupplyMatrix] = useState(false);
  const [printItems, setPrintItems] = useState<DishItem[]>([]);
  const [showFellini, setShowFellini] = useState(false);
  const [showJemmaOutput, setShowJemmaOutput] = useState(false);
  const [jemmaResult, setJemmaResult] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // TAB SELECTION FOR THE RIGHT SIDE JEMMA/HERMES PANEL
  const [jemmaTab, setJemmaTab] = useState<"audit" | "rag">("audit");
  
  // HERMES CO-PILOT CHAT STATES
  const [ragMessages, setRagMessages] = useState<Array<{
    id: string;
    role: "user" | "model" | "system";
    text: string;
    timestamp: Date;
    sources?: Array<{ title: string; uri: string }>;
  }>>([
    {
      id: "init",
      role: "model",
      text: "◈ HERMES SYSTEM ACTIVE ◈\n━\nI am HERMES, the Agentic RAG Co-Pilot for the FORGE OPERATING SYSTEM.\n\nReady to query internal spec doctrine layers of Galyons or scan local and external knowledge stores.\n\nWe have secured full integration for your requested architectures, loaded with:\n- **Galyons Culinary Laws & Recipes**\n- **Web Grounding Control Laws** (NVIDIA Workbench RAG inspired)\n- **Agentic Capability Registries** (NousResearch Hermes inspired)\n\nHow can I assist you with Galyons kitchen alignment today?",
      timestamp: new Date()
    }
  ]);
  const [ragInput, setRagInput] = useState("");
  const [webSearch, setWebSearch] = useState(true);
  const [accuracyGuard, setAccuracyGuard] = useState(true);
  const [ragTemperature, setRagTemperature] = useState(0.2);
  const [ingestedRepos, setIngestedRepos] = useState<string[]>([
    "https://github.com/NousResearch/hermes-agent.git",
    "https://github.com/NVIDIA/workbench-example-agentic-rag.git",
    "https://github.com/rodlife1314-star/forge-system.git"
  ]);
  const [newRepoUrl, setNewRepoUrl] = useState("");
  const [ragLoading, setRagLoading] = useState(false);

  const sendRagMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!ragInput.trim() || ragLoading) return;

    const userText = ragInput.trim();
    setRagInput("");

    // Append user message
    const userMsg = {
      id: Math.random().toString(36).substring(7),
      role: "user" as const,
      text: userText,
      timestamp: new Date()
    };
    setRagMessages(prev => [...prev, userMsg]);
    setRagLoading(true);

    // Build context
    let contextStr = ``;
    if (selectedItem) {
      contextStr += `ACTIVE INSPECTED SPEC: ${selectedItem.name}\n`;
      contextStr += `Station: ${selectedItem.station}\n`;
      contextStr += `Allergens: ${selectedItem.allergens?.join(", ") || "None"}\n`;
      if (selectedItem.passCriteria) contextStr += `Pass Criteria: ${JSON.stringify(selectedItem.passCriteria)}\n`;
      if (selectedItem.ingredients) contextStr += `Local Ingredients & Prep: ${JSON.stringify(selectedItem.ingredients)}\n`;
      if (selectedItem.fellini) contextStr += `Fellini Directives: ${JSON.stringify(selectedItem.fellini)}\n`;
      if (selectedItem.executionCard) contextStr += `Execution Guidelines: ${JSON.stringify(selectedItem.executionCard)}\n`;
      if (selectedItem.larousse) contextStr += `Larousse Classical Context: ${JSON.stringify(selectedItem.larousse)}\n`;
    } else {
      contextStr += `ACTIVE SYSTEM MODULES:\n`;
      Object.entries(ENGINES).forEach(([key, eng]) => {
        contextStr += `- Station: ${eng.station} (${eng.label}) has ${eng.items.length} locked specs.\n`;
      });
    }

    try {
      // Map message history into standard format
      const historyPayload = ragMessages.slice(1).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/gemini/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
          ragContext: contextStr,
          temperature: ragTemperature,
          accuracyGuard,
          webSearch,
          ingestedRepos
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Server connector error");
      }

      setRagMessages(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        role: "model",
        text: data.text,
        timestamp: new Date(),
        sources: data.sources
      }]);
    } catch (error: any) {
      console.error(error);
      setRagMessages(prev => [...prev, {
        id: Math.random().toString(36).substring(7),
        role: "model",
        text: `⚠️ HERMES CO-PILOT FAULT:\n\n${error.message || "Please check server is run or local API key is provided inside App Settings."}`,
        timestamp: new Date()
      }]);
    } finally {
      setRagLoading(false);
    }
  };

  const view: any = showSupplyMatrix ? "supply" : showValidationStatus ? "validation" : selectedLayer ? "layer" : selectedItem ? "item" : "idle";
  const allItems = Object.values(ENGINES).flatMap(e => e.items);

  const ExportWeaponPack = async () => {
    if (activeEngine !== 'dessert') return;
    setIsExportingPDF(true);
    
    try {
      await runWeaponExport({
        section: "weapon",
        title: `FORGE_EXPORT_WEAPON_${engine.label.replace(/\s+/g, '_')}`
      });
      
      // Still use our internal PDF capture for automated generation
      handleSavePDF("weapon", engine.items);
    } catch (error) {
      console.error("Export failed", error);
      setIsExportingPDF(false);
    }
  };

  const engine = activeEngine === "all" 
    ? { label: "FORGE OS UNIFIED", color: "#FFB347", station: "ALL STATIONS", items: Object.values(ENGINES).flatMap(e => e.items) }
    : ENGINES[activeEngine];

  // Helper to clear supply matrix view when changing engine
  const handleEngineChange = (key: string) => {
    setActiveEngine(key);
    setShowSupplyMatrix(false);
    setShowValidationStatus(false);
    setSelectedItem(null);
    setSelectedLayer(null);
    setJemmaOutput("");
    setMobileMenuOpen(false);
    setIsTransitioning(false);
  };

  const runJemma = async (mode: JemmaMode, item: DishItem | null = null) => {
    setJemmaLoading(true);
    setJemmaOutput("");
    setJemmaMode(mode);
    setIsTransitioning(false);
    
    // For single items, we use the local validator to avoid connection failures
    if (mode === "item" && item) {
      try {
        const result = localJemmaValidation(item);
        const output = renderJemmaResult(result);
        setJemmaOutput(output);
        if (result.verdict === "FAIL") setIsTransitioning(true);
      } catch (error) {
        setJemmaOutput("JEMMA FAULT — local validation failed.");
      } finally {
        setJemmaLoading(false);
      }
      return;
    }

    // For full validation, we still attempt the intelligence layer but with a local fallback
    try {
      const items = Object.values(ENGINES).flatMap(e => e.items);
      const results = items.map(i => localJemmaValidation(i));
      const failCount = results.filter(r => r.verdict === "FAIL").length;
      const condCount = results.filter(r => r.verdict === "CONDITIONAL").length;
      
      const summary = [
        "SYSTEM DOCTRINE AUDIT — FORGE OS UNIFIED",
        "━".repeat(40),
        `TOTAL SPECS AUDITED: ${items.length}`,
        `PASS: ${items.length - failCount - condCount}`,
        `CONDITIONAL: ${condCount}`,
        `FAIL: ${failCount}`,
        "━".repeat(40),
        failCount === 0 ? "✓ SYSTEM INTEGRITY CONFIRMED" : "🔄 SYSTEM TRANSITION ACTIVE",
        "ENGINE STATUS: " + (failCount === 0 ? "RELEASED" : "TRANSITIONING")
      ].join("\n");
      
      setJemmaOutput(summary);
      if (failCount > 0) setIsTransitioning(true);
    } catch (error) {
      setJemmaOutput("JEMMA FAULT — validation failed.");
    } finally {
      setJemmaLoading(false);
    }
  };

  const triggerPrint = (mode: "operator" | "unit" | "pack" | "weapon", items: DishItem[]) => {
    setPrintMode(mode);
    setPrintItems(items);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setPrintMode(null);
        setPrintItems([]);
      }, 1000);
    }, 250);
  };

  const handleSavePDF = async (mode: "operator" | "unit" | "pack" | "system" | "weapon", items: DishItem[]) => {
    setPrintMode(mode);
    setPrintItems(items);
    setIsExportingPDF(true);

    // Wait for React to render the print components
    setTimeout(async () => {
      const element = printRef.current;
      const fallback = document.getElementById("print-area");
      const targetElement = element || fallback;

      if (!targetElement) {
        console.error("PRINT AREA NOT FOUND via ref or fallback");
        setIsExportingPDF(false);
        return;
      }

      try {
        console.log("Starting PDF capture for mode:", mode);
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = 210;
        const pageHeight = 297;

        // Find all printable pages
        const pages = targetElement.querySelectorAll(".print-page, .page, [data-pdf-page]");
        
        if (pages.length > 0) {
          for (let i = 0; i < pages.length; i++) {
            const page = pages[i] as HTMLElement;
            
            const canvas = await html2canvas(page, {
              scale: 3, // MICHELIN GRADE BOOST
              useCORS: true,
              backgroundColor: "#ffffff",
              logging: false,
              windowWidth: 1200,
              onclone: (clonedDoc) => {
                // CRITICAL: Strip oklch/oklab from ALL styles and attributes
                const styleTags = clonedDoc.querySelectorAll('style');
                styleTags.forEach(tag => {
                  if (tag.textContent?.match(/oklch|oklab/i)) {
                    tag.textContent = tag.textContent.replace(/(oklch|oklab)\([^)]+\)/gi, '#000000');
                  }
                });
                
                const allElements = clonedDoc.querySelectorAll('*');
                allElements.forEach(el => {
                  const htmlEl = el as HTMLElement;
                  
                  // Check style attribute
                  if (htmlEl.style && htmlEl.style.cssText.match(/oklch|oklab/i)) {
                    htmlEl.style.cssText = htmlEl.style.cssText.replace(/(oklch|oklab)\([^)]+\)/gi, '#000000');
                  }

                  // Check common SVG color attributes
                  ['fill', 'stroke', 'stop-color', 'flood-color'].forEach(attr => {
                    const val = el.getAttribute(attr);
                    if (val && val.match(/oklch|oklab/i)) {
                      el.setAttribute(attr, '#000000');
                    }
                  });
                });

                // Ensure fonts are fully loaded in clone
                clonedDoc.fonts.ready.then(() => {
                  console.log("Fonts loaded in clone");
                });
              }
            });

            if (!canvas.width || !canvas.height) continue;

            const imgData = canvas.toDataURL("image/jpeg", 0.95);
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight, undefined, 'FAST');
          }
        } else {
          // Fallback for single container capture
          const canvas = await html2canvas(targetElement, {
            scale: 3, // MICHELIN GRADE BOOST
            useCORS: true,
            backgroundColor: "#ffffff",
            logging: false,
            windowWidth: 1200,
            onclone: (clonedDoc) => {
              // CRITICAL: Strip oklch/oklab from ALL styles and attributes
              const styleTags = clonedDoc.querySelectorAll('style');
              styleTags.forEach(tag => {
                if (tag.textContent?.match(/oklch|oklab/i)) {
                  tag.textContent = tag.textContent.replace(/(oklch|oklab)\([^)]+\)/gi, '#000000');
                }
              });
              
              const allElements = clonedDoc.querySelectorAll('*');
              allElements.forEach(el => {
                const htmlEl = el as HTMLElement;
                
                // Check style attribute
                if (htmlEl.style && htmlEl.style.cssText.match(/oklch|oklab/i)) {
                  htmlEl.style.cssText = htmlEl.style.cssText.replace(/(oklch|oklab)\([^)]+\)/gi, '#000000');
                }

                // Check common SVG color attributes
                ['fill', 'stroke', 'stop-color', 'flood-color'].forEach(attr => {
                  const val = el.getAttribute(attr);
                  if (val && val.match(/oklch|oklab/i)) {
                    el.setAttribute(attr, '#000000');
                  }
                });
              });
            }
          });

          if (!canvas.width || !canvas.height) {
            throw new Error(`Invalid canvas dimensions: ${canvas.width}x${canvas.height}`);
          }

          const imgData = canvas.toDataURL("image/jpeg", 0.95);
          const imgWidth = pageWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pageHeight;

          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pageHeight;
          }
        }

        let filename = "";
        if (mode === "system") {
          filename = "forge-system-doctrine.pdf";
        } else if (mode === "pack") {
          filename = `forge-pack-${engine.label.toLowerCase().replace(/\s+/g, '-')}.pdf`;
        } else if (mode === "weapon") {
          filename = `forge-weapon-${engine.label.toLowerCase().replace(/\s+/g, '-')}.pdf`;
        } else {
          filename = `forge-${items[0].name.toLowerCase().replace(/\s+/g, '-')}-${mode}.pdf`;
        }
        
        pdf.save(filename);
        console.log("PDF saved successfully:", filename);
      } catch (error) {
        console.error("PDF GENERATION FAULT:", error);
      } finally {
        setPrintMode(null);
        setPrintItems([]);
        setIsExportingPDF(false);
      }
    }, 1000); // Increased timeout to ensure components are fully rendered
  };

  const renderSafeValue = (value: unknown): React.ReactNode => {
    if (value === null || value === undefined) return "—";

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }

    if (Array.isArray(value)) {
      return (
        <div className="space-y-1">
          {value.map((item, index) => {
            if (
              item &&
              typeof item === "object" &&
              "name" in item &&
              ("six" in item || "twenty" in item)
            ) {
              const ingredient = item as {
                name?: string;
                six?: number | string;
                twenty?: number | string;
                unit?: string;
              };

              return (
                <div key={index} className="text-[13px] font-mono">
                  <span className="font-bold text-text-primary">{ingredient.name ?? "Ingredient"}</span>
                  <span className="text-text-mute mx-1">—</span>
                  <span className="text-emerald-400">6: {ingredient.six ?? "—"}{ingredient.unit ?? ""}</span>
                  <span className="text-text-mute mx-2">|</span>
                  <span className="text-emerald-500 font-bold">20: {ingredient.twenty ?? "—"}{ingredient.unit ?? ""}</span>
                </div>
              );
            }

            return (
              <div key={index} className="text-[13px] font-mono flex items-start gap-2">
                <span className="text-text-mute shrink-0">•</span>
                <span>{renderSafeValue(item)}</span>
              </div>
            );
          })}
        </div>
      );
    }

    if (typeof value === "object") {
      return (
        <div className="space-y-2 border-l border-border-ui/30 pl-3">
          {Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => (
            <div key={key}>
              <div className="text-[10px] uppercase tracking-tighter text-text-mute font-bold mb-1">{key}</div>
              <div className="pl-2">{renderSafeValue(nestedValue)}</div>
            </div>
          ))}
        </div>
      );
    }

    return String(value);
  };

  const renderSpecFields = (item: DishItem) => {
    const skip = ["name", "allergens", "pass", "passCriteria", "station", "larousse", "fellini", "executionCard", "chefNote", "failurePoints", "serviceNotes", "yieldBlock"];
    return Object.entries(item)
      .filter(([k]) => !skip.includes(k))
      .map(([k, v]) => {
        const isFinancial = ["price", "cost", "gp"].includes(k);

        return (
          <div key={k} className="flex flex-col sm:flex-row sm:gap-4 mb-4 group">
            <div className={`sm:w-32 shrink-0 text-[11px] font-mono uppercase tracking-wider pt-0.5 group-hover:text-text-soft transition-colors ${isFinancial ? 'text-emerald-500 font-black' : 'text-text-mute'}`}>
              {k}
            </div>
            <div className={`flex-1 ${isFinancial ? 'text-emerald-400 font-black italic font-mono' : ''}`}>
              {renderSafeValue(v)}
            </div>
          </div>
        );
      });
  };

  const renderExecutionCardLayer = (card: any) => {
    if (!card || typeof card !== "object") return null;
    return (
      <div className="bg-panel-alt border-2 border-orange-500/50 p-6 mt-6 rounded-lg shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Zap size={60} className="text-orange-500" />
        </div>
        <div className="text-[10px] tracking-[0.4em] text-orange-500 mb-6 font-bold flex justify-between border-b border-border-ui pb-3">
          <span>VOLUME 2 — A5 EXECUTION CARD</span>
          <span className="text-rose-500 italic">TIME LAW: {card.timeLaw}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-[9px] text-text-mute tracking-[2px] mb-3 uppercase font-bold">FRONT (SETUP & BUILD)</div>
            <div className="space-y-4">
              <div>
                <div className="text-[11px] text-text-soft font-bold mb-1 opacity-60">SETUP:</div>
                <div className="text-[13px] text-text-soft pl-4">
                  {card.setup.map((s: any, i: number) => <div key={i}>• {renderSafeValue(s)}</div>)}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-text-soft font-bold mb-1 opacity-60">BUILD SEQUENCE:</div>
                <div className="text-[13px] text-text-primary px-3 py-2 bg-bg/40 border-l border-orange-500/30">
                  {card.build.map((s: any, i: number) => <div key={i} className="mb-1">{renderSafeValue(s)}</div>)}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-bg/20 p-4 rounded border border-border-ui/50">
            <div className="text-[9px] text-rose-500 tracking-[2px] mb-3 uppercase font-bold">BACK (FAILURE & RESET)</div>
            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-bold mb-1 text-rose-400">FAILURES:</div>
                <div className="text-[13px] text-rose-300 pl-4">
                  {card.failures.map((s: any, i: number) => <div key={i}>❌ {renderSafeValue(s)}</div>)}
                </div>
              </div>
              <div className="pt-2 border-t border-border-ui">
                <div className="text-[11px] font-bold mb-1 text-text-soft">RESET TRIGGER:</div>
                <div className="text-[13px] text-text-mute pl-4 italic">
                  {card.reset.map((s: any, i: number) => <div key={i}>🔄 {renderSafeValue(s)}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderLarousseLayer = (larousse: any) => {
    if (!larousse) return null;

    const renderList = (title: string, items: any[]) => (
      <div className="mb-3">
        <div className="text-[9px] text-text-mute tracking-[2px] mb-1.5 uppercase">
          {title}
        </div>
        {items.map((item, i) => (
          <div key={i} className="text-[13px] text-text-soft leading-relaxed mb-1">
            • {renderSafeValue(item)}
          </div>
        ))}
      </div>
    );

    return (
      <div className="bg-panel-alt border border-border-ui p-4 mt-3 shadow-inner larousse-layer">
        <div className="text-[10px] tracking-[3px] text-orange-400 mb-2.5 font-bold">
          LAROUSSE LAYER
        </div>

        <div className="text-[13px] text-text-primary leading-relaxed mb-3 italic">
          "{larousse.principle}"
        </div>

        {renderList("METHOD", larousse.method || [])}
        {renderList("QUALITY", larousse.quality || [])}
        {renderList("FAULTS", larousse.faults || [])}
        {renderList("CORRECTION", larousse.correction || [])}
      </div>
    );
  };

  const renderFelliniLayer = (fellini: any) => {
    if (!fellini) return null;

    const fields = [
      ["IDENTITY", fellini.identity],
      ["CONTROL LAW", fellini.controlLaw],
      ["HYDRATION LAW", fellini.stabiliserHydrationLaw],
      ["PRESSURE POINT", fellini.pressurePoint],
      ["WATCH POINT", fellini.watchPoint],
      ["PASS SIGNAL", fellini.passSignal],
      ["FAILURE SIGNAL", fellini.failureSignal],
      ["RECOVERY MOVE", fellini.recoveryMove],
    ].filter(([_, v]) => v);

    return (
      <div className="bg-[#111315] border border-[#2A2F36] p-6 mt-3 fellini-layer rounded-lg shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB347]/5 rotate-45 translate-x-16 -translate-y-16" />
        
        <div className="text-[10px] tracking-[4px] text-[#FFB347] mb-6 font-bold uppercase border-b border-[#FFB347]/20 pb-2 flex justify-between items-center">
          <span>🎬 FELLINI — LIVE CONTROL</span>
          <span className="text-[8px] bg-[#FFB347]/10 px-1.5 py-0.5 rounded text-[#FFB347]/60">v2.5.2</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          {fields.map(([label, value]) => (
            <div key={label} className={label === 'CONTROL LAW' || label === 'HYDRATION LAW' ? 'sm:col-span-2' : ''}>
              <div className="text-[9px] text-[#777] tracking-[2px] mb-2 uppercase font-bold">
                {label}
              </div>
              <div className={`text-[13px] leading-relaxed ${label === 'RECOVERY MOVE' ? 'text-orange-500 font-bold' : label.includes('LAW') ? 'text-white italic' : 'text-[#EAEAEA]'}`}>
                {renderSafeValue(value)}
              </div>
            </div>
          ))}

          {fellini.validationPoints && (
            <div className="sm:col-span-2 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {fellini.validationPoints.postPrep && (
                <div className="bg-white/5 p-3 rounded border border-white/10">
                  <div className="text-[8px] text-[#777] tracking-widest uppercase mb-1 font-bold">POST-PREP</div>
                  <div className="text-[11px] text-emerald-400/80 leading-snug">{fellini.validationPoints.postPrep}</div>
                </div>
              )}
              {fellini.validationPoints.preService && (
                <div className="bg-white/5 p-3 rounded border border-white/10">
                  <div className="text-[8px] text-[#777] tracking-widest uppercase mb-1 font-bold">PRE-SERVICE</div>
                  <div className="text-[11px] text-emerald-400/80 leading-snug">{fellini.validationPoints.preService}</div>
                </div>
              )}
              {fellini.validationPoints.atPass && (
                <div className="bg-white/5 p-3 rounded border border-white/10">
                  <div className="text-[8px] text-[#777] tracking-widest uppercase mb-1 font-bold">AT PASS</div>
                  <div className="text-[11px] text-emerald-400/80 leading-snug">{fellini.validationPoints.atPass}</div>
                </div>
              )}
            </div>
          )}

          {fellini.autoReject && (
            <div className="sm:col-span-2 mt-4 p-4 border border-rose-500/30 bg-rose-500/5 rounded">
              <div className="text-[9px] text-rose-500 tracking-[2px] mb-2 uppercase font-bold">AUTO REJECT PROTOCOL</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                {fellini.autoReject.map((r: string, i: number) => (
                  <div key={i} className="text-[11px] text-rose-400/70 flex gap-2">
                    <span className="text-rose-600">⚠</span> {r}
                  </div>
                ))}
              </div>
            </div>
          )}

          {fellini.criticalAdditions && (
            <div className="sm:col-span-2 mt-4 p-4 border border-emerald-500/30 bg-emerald-500/5 rounded">
              <div className="text-[9px] text-emerald-500 tracking-[2px] mb-2 uppercase font-bold">CRITICAL ADDITIONS</div>
              <div className="space-y-1.5">
                {fellini.criticalAdditions.map((a: string, i: number) => (
                  <div key={i} className="text-[11px] text-emerald-200/80 flex gap-2">
                    <span className="text-emerald-500">▶</span> {a}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderServiceNotes = (notes: string[]) => {
    if (!notes || notes.length === 0) return null;
    return (
      <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-lg mt-6">
        <div className="text-[10px] tracking-[0.3em] text-blue-500 uppercase mb-4 font-bold flex items-center gap-2">
          <Terminal size={14} /> SERVICE NOTES
        </div>
        <div className="space-y-2">
          {notes.map((note: any, i: number) => (
            <div key={i} className="text-[13px] text-blue-300/80 flex gap-2">
              <span className="text-blue-500">◈</span> {renderSafeValue(note)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSupplyMatrix = () => {
    const iceCreamEngine = ENGINES["iceCream"];
    const dessertEngine = ENGINES["dessert"];
    
    const allRecipes = [...(iceCreamEngine?.items || []), ...(dessertEngine?.items || [])];
    const stock = generateIceCreamSupply(allRecipes);
    const orderList = getSupplierFriendlyMapping(stock);
    const costData = calculateBatchCost(stock);
    const costReport = formatCostReport(costData);

    const totalPortions = allRecipes.length * 20;
    const costPerPortion = costData.totalCost / totalPortions;
    const pricing = getPricingScenarios(costPerPortion);

    return (
      <div className="max-w-4xl mx-auto pb-20">
        <div className="border-b-2 border-emerald-500 pb-6 mb-10">
          <div className="text-[10px] tracking-[0.4em] text-text-mute uppercase mb-2">FORGE SUPPLY & PRICING ENGINE v1.0</div>
          <h1 className="text-3xl font-black tracking-tighter text-emerald-500 flex items-center gap-4">
            <Database size={32} />
            SUPPLY MATRIX (BATCH 20 AGGREGATED)
          </h1>
        </div>

        {/* Pricing Scenarios */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-panel border-2 border-emerald-500 p-6 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[9px] font-black px-2 py-0.5 uppercase">PREMIUM</div>
            <div className="text-[10px] text-text-mute uppercase tracking-widest mb-1">SELL PRICE</div>
            <div className="text-4xl font-black text-emerald-400">£{pricing.premium.sellPrice.toFixed(2)}</div>
            <div className="text-[11px] text-emerald-500/60 font-bold mt-2 uppercase tracking-tighter">
              GP: {(pricing.premium.actualGP * 100).toFixed(1)}% | COST: £{costPerPortion.toFixed(2)}
            </div>
          </div>
          <div className="bg-panel border border-emerald-500/30 p-6 rounded-lg shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-500 text-[9px] font-black px-2 py-0.5 uppercase">MARKET</div>
            <div className="text-[10px] text-text-mute uppercase tracking-widest mb-1">SELL PRICE</div>
            <div className="text-4xl font-black text-white">£{pricing.market.sellPrice.toFixed(2)}</div>
            <div className="text-[11px] text-text-mute font-bold mt-2 uppercase tracking-tighter">
              GP: {(pricing.market.actualGP * 100).toFixed(1)}% | COST: £{costPerPortion.toFixed(2)}
            </div>
          </div>
          <div className="bg-panel border border-emerald-500/10 p-6 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500/5 text-emerald-500/40 text-[9px] font-black px-2 py-0.5 uppercase">VOLUME</div>
            <div className="text-[10px] text-text-mute uppercase tracking-widest mb-1">SELL PRICE</div>
            <div className="text-4xl font-black text-text-mute">£{pricing.volume.sellPrice.toFixed(2)}</div>
            <div className="text-[11px] text-text-mute font-bold mt-2 uppercase tracking-tighter">
              GP: {(pricing.volume.actualGP * 100).toFixed(1)}% | COST: £{costPerPortion.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-8">
            <div className="bg-panel border border-border-ui p-8 rounded-lg shadow-xl relative overflow-hidden">
              <div className="text-[11px] tracking-[0.3em] text-text-mute uppercase mb-6 border-b border-border-ui pb-3">AGGREGATED STOCK LIST</div>
              <div className="space-y-4">
                {Object.entries(stock).sort((a,b) => a[0].localeCompare(b[0])).map(([name, data]) => (
                  <div key={name} className="flex justify-between items-center group">
                    <span className="text-[14px] text-text-soft font-bold group-hover:text-white transition-colors">{name}</span>
                    <span className="text-[14px] font-mono text-emerald-400">
                      {formatQuantity(data.quantity, data.unit)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-panel border border-border-ui p-8 rounded-lg shadow-xl relative overflow-hidden">
              <div className="text-[11px] tracking-[0.3em] text-rose-500/70 uppercase mb-6 border-b border-border-ui pb-3">COST BREAKDOWN</div>
              <div className="space-y-4">
                {costReport.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <span className="text-[13px] text-text-mute group-hover:text-text-soft transition-colors">{item.name}</span>
                    <span className="text-[13px] font-mono text-rose-400/80">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#111] border-2 border-emerald-500/30 p-8 rounded-lg shadow-2xl h-fit sticky top-4">
            <div className="text-[11px] tracking-[0.3em] text-emerald-500 uppercase mb-6 border-b border-emerald-500/20 pb-3 flex justify-between items-center">
              <span>CLEAN ORDER VERSION</span>
              <span className="text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded">SUPPLIER DIRECT</span>
            </div>
            <div className="space-y-4">
              {orderList.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 mt-2 shrink-0" />
                  <div>
                    <div className="text-[14px] font-black text-white group-hover:text-emerald-400 transition-colors">
                      {item.supplierFormat && typeof item.supplierFormat === 'string' ? item.supplierFormat.split(' — ')[0] : String(item.supplierFormat || '')}
                    </div>
                    <div className="text-[12px] text-emerald-400/60 font-mono italic">
                      {(item.supplierFormat && typeof item.supplierFormat === 'string' && item.supplierFormat.includes(' — ')) ? item.supplierFormat.split(' — ')[1] : '---'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-emerald-500/20 text-[11px] text-text-mute italic">
              * Order quantities adjusted for standard commercial packaging.
            </div>
          </div>
        </div>

        <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
          <div className="text-[10px] tracking-[0.3em] text-emerald-400 uppercase mb-4 font-bold flex items-center gap-2">
            <Zap size={14} /> NEXT PHASE: REVENUE ENGINE
          </div>
          <p className="text-[13px] text-emerald-200/60 leading-relaxed mb-4">
            System unified. Production, Procurement, and Pricing engines released for transition. Ready to layer daily volume projections and full revenue forecasting.
          </p>
          <button 
            className="px-4 py-2 bg-emerald-500 text-black text-[10px] font-black tracking-widest rounded hover:opacity-90 transition-all active:translate-y-0.5"
            onClick={() => alert("Revenue Layer incoming...")}
          >
            ADD REVENUE LAYER
          </button>
        </div>
      </div>
    );
  };

  const renderOperationalLayer = (layer: OperationalLayer) => {
    if (!layer) return null;

    return (
      <div className="max-w-3xl mx-auto space-y-8 pb-20">
        <div className="border-b-2 border-orange-500/50 pb-6 mb-10">
          <div className="text-[10px] tracking-[0.4em] text-text-mute uppercase mb-2">{layer.subtitle}</div>
          <h1 className="text-3xl font-black tracking-tighter text-orange-500">{layer.name}</h1>
        </div>

        <div className="grid gap-8">
          {layer.sections.map((section, idx) => (
            <div key={idx} className="bg-panel border border-border-ui p-6 sm:p-8 rounded-lg shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Terminal size={80} />
              </div>
              <div className="text-[11px] tracking-[0.3em] text-text-mute uppercase mb-4 border-b border-border-ui pb-3 flex justify-between items-center">
                {section.title}
                <Terminal size={14} className="opacity-20" />
              </div>
              
              <div className="space-y-3 relative z-10">
                {Array.isArray(section.content) ? (
                  section.content.map((line, i) => (
                    <div key={i} className="text-[14px] text-text-soft leading-relaxed flex gap-3">
                      <span className="text-orange-500/40">◈</span>
                      <span>{line}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-[14px] text-text-soft leading-relaxed">
                    {section.content}
                  </div>
                )}
              </div>

              {section.quote && (
                <div className="mt-6 pt-4 border-t border-border-ui/50 italic text-[13px] text-orange-400 relative z-10">
                  "{section.quote}"
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-10 border-t border-border-ui text-[10px] text-text-mute tracking-widest text-center italic opacity-50">
          Fellini / FORGE — Sunday Engine Control Layer | Stability Execution
        </div>
      </div>
    );
  };

  const colorLine = (line: string) => {
    if (line.match(/^(JEMMA VALIDATION|TITLE|TYPE|SYSTEM VALIDATION|ROOT LAYER|CONTROL LAW|SEQUENCE LAW|AUTO REJECT|PASS CRITERIA|TECHNICAL FAULTS|VERDICT|ENGINE STATUS|DOCTRINE|PREP ENGINE|ALLERGEN|PRESSURE|SYSTEM VERDICT|CHEF'S NOTE|━)/))
      return "text-orange-500 font-black tracking-tight";
    if (line.match(/PASS|UNLOCKED|RELEASED|COMPLETE|CONFIRMED|PASSED|STABILISE|STABILITY|✓/i)) return "text-emerald-500 font-bold";
    if (line.match(/CONDITIONAL|WATCH|FLAG|RISK|GAP|TRANSITION|TRANSITIONING/i)) return "text-amber-500";
    if (line.match(/NEEDS WORK|REJECTED|FAIL|INCOMPLETE|FAULT/i)) return "text-rose-500 font-black italic";
    return "text-text-mute";
  };

  const getEngineIcon = (key: string) => {
    switch (key) {
      case "pizza": return <Pizza size={16} />;
      case "burger": return <Beef size={16} />;
      case "mains": return <Flame size={16} />;
      case "starters": return <Salad size={16} />;
      case "sides": return <Utensils size={16} />;
      case "dessert": return <Cake size={16} />;
      case "iceCream": return <IceCream size={16} />;
      case "dashboard": return <Terminal size={16} />;
      case "prep": return <Database size={16} />;
      case "sunday": return <Calendar size={16} />;
      default: return <Activity size={16} />;
    }
  };

  return (
    <div className="bg-bg min-h-screen font-mono text-text-primary selection:bg-orange-500/30 selection:text-orange-500 print:bg-white">
      {/* HEADER */}
      <header className="bg-panel border-b border-border-ui px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 z-50 no-print">
        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-text-mute hover:text-text-primary"
          >
            <Menu size={20} />
          </button>
          <div className="hidden sm:block p-2 bg-orange-500/10 border border-orange-500/20 rounded">
            <Cpu className="text-orange-500" size={24} />
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-[0.4em] text-text-mute mb-0.5">Octagon OS · FORGE OPERATING SYSTEM v2.5</div>
            <div className="text-lg sm:text-xl font-black tracking-tighter text-orange-500 flex items-center gap-2">
              FORGE OS
              <span className="hidden sm:inline text-[10px] font-normal tracking-widest text-text-mute bg-panel-alt px-2 py-0.5 rounded ml-2">UNRELAXED</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <AnimatePresence>
            {isTransitioning ? (
              <motion.div 
                key="transition"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="hidden md:flex bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] tracking-widest px-3 py-1.5 rounded items-center gap-2 font-mono"
              >
                <Activity size={12} className="animate-pulse" />
                TRANSITION ACTIVE
              </motion.div>
            ) : (
              <motion.div 
                key="unlocked"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="hidden md:flex bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[10px] tracking-widest px-3 py-1.5 rounded items-center gap-2 font-mono"
              >
                <ShieldCheck size={12} />
                SYSTEM UNLOCKED · STABILIZED
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={() => handleSavePDF("system", [])}
            disabled={isExportingPDF}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-[10px] font-bold tracking-widest rounded hover:bg-blue-500 transition-all active:translate-y-0.5 shadow-lg shadow-blue-500/20"
          >
            <Download size={14} />
            FULL SYSTEM PDF
          </button>

          <button
            onClick={() => runJemma("full")}
            disabled={jemmaLoading}
            className={`
              flex items-center gap-2 px-3 sm:px-4 py-2 text-[10px] font-bold tracking-widest rounded transition-all
              ${jemmaLoading 
                ? "bg-panel-alt text-text-mute cursor-not-allowed border border-border-ui" 
                : "bg-orange-500 text-black hover:bg-orange-400 border border-orange-500 active:translate-y-0.5 shadow-lg shadow-orange-500/20"}
            `}
          >
            {jemmaLoading && jemmaMode === "full" ? (
              <>
                <Zap className="animate-pulse" size={14} />
                <span className="hidden sm:inline">JEMMA RUNNING...</span>
                <span className="sm:hidden">RUNNING...</span>
              </>
            ) : (
              <>
                <Activity size={14} />
                <span className="hidden sm:inline">FULL SYSTEM VALIDATION</span>
                <span className="sm:hidden">VALIDATE</span>
              </>
            )}
          </button>
        </div>
      </header>

      <main className="flex flex-col lg:grid lg:grid-cols-[280px_1fr_400px] h-[calc(100vh-73px)] overflow-hidden">
        {/* LEFT NAV */}
        <aside className={`
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          fixed lg:static inset-0 top-[73px] z-40 bg-panel border-r border-border-ui overflow-y-auto custom-scrollbar transition-transform duration-300 no-print
        `}>
          <div className="border-b border-border-ui">
            <button
              onClick={() => { setShowSupplyMatrix(true); setShowValidationStatus(false); setActiveEngine(""); setSelectedItem(null); setSelectedLayer(null); setJemmaOutput(""); setMobileMenuOpen(false); }}
              className={`
                w-full text-left px-5 py-4 transition-all flex items-center justify-between group
                ${showSupplyMatrix ? "bg-emerald-500/10 border-l-[3px] border-emerald-500" : "hover:bg-panel-alt/50 border-l-[3px] border-transparent"}
              `}
            >
              <div>
                <div className="text-[12px] font-black tracking-[0.2em] flex items-center gap-2 mb-1" style={{ color: showSupplyMatrix ? "#10b981" : "#8B949E" }}>
                  <Database size={16} /> SUPPLY ENGINE
                </div>
                <div className="text-[10px] text-text-mute tracking-wider text-emerald-500/60 font-bold">
                  PROCUREMENT AGGREGATOR
                </div>
              </div>
            </button>
          </div>

          <div className="border-b border-border-ui">
            <button
              onClick={() => { setShowValidationStatus(true); setShowSupplyMatrix(false); setActiveEngine(""); setSelectedItem(null); setSelectedLayer(null); setJemmaOutput(""); setMobileMenuOpen(false); }}
              className={`
                w-full text-left px-5 py-4 transition-all flex items-center justify-between group
                ${showValidationStatus ? "bg-orange-500/10 border-l-[3px] border-orange-500" : "hover:bg-panel-alt/50 border-l-[3px] border-transparent"}
              `}
            >
              <div>
                <div className="text-[12px] font-black tracking-[0.2em] flex items-center gap-2 mb-1" style={{ color: showValidationStatus ? "#FFB347" : "#8B949E" }}>
                  <ClipboardCheck size={16} /> VALIDATION COMMAND
                </div>
                <div className="text-[10px] text-text-mute tracking-wider text-orange-500/60 font-bold">
                  LIVE AUDIT DASHBOARD
                </div>
              </div>
            </button>
          </div>

          <div className="border-b border-border-ui">
            <button
              onClick={() => handleEngineChange("all")}
              className={`
                w-full text-left px-5 py-6 transition-all flex items-center justify-between group
                ${activeEngine === "all" && !showValidationStatus && !showSupplyMatrix ? "bg-orange-500/10" : "hover:bg-panel-alt/50"}
              `}
              style={{ borderLeft: `3px solid ${activeEngine === "all" && !showValidationStatus && !showSupplyMatrix ? "#FFB347" : "transparent"}` }}
            >
              <div>
                <div className="text-[12px] font-black tracking-[0.2em] flex items-center gap-2 mb-1" style={{ color: activeEngine === "all" ? "#FFB347" : "#8B949E" }}>
                  <Terminal size={16} /> FORGE OS UNIFIED
                </div>
                <div className="text-[10px] text-text-mute tracking-wider text-orange-500/60 font-bold">
                  {Object.values(ENGINES).flatMap(e => e.items).length} TOTAL SPECS
                </div>
              </div>
            </button>
            <AnimatePresence>
              {activeEngine === "all" && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-bg/40 max-h-[400px] overflow-y-auto custom-scrollbar"
                >
                  {Object.values(ENGINES).flatMap(e => e.items).map((item, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedItem(item); setSelectedLayer(null); setJemmaOutput(""); setMobileMenuOpen(false); }}
                      className={`
                        w-full text-left px-10 py-3 text-[12px] transition-all border-l-2
                        ${selectedItem?.name === item.name 
                          ? "text-orange-400 bg-orange-500/5 font-bold" 
                          : "text-text-mute hover:text-orange-400 hover:bg-orange-500/5"}
                      `}
                      style={{ borderLeftColor: selectedItem?.name === item.name ? "#FFB347" : "transparent" }}
                    >
                      {item.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {Object.entries(ENGINES).map(([key, eng]) => (
            <div key={key} className="border-b border-border-ui">
              <button
                onClick={() => handleEngineChange(key)}
                className={`
                  w-full text-left px-5 py-4 transition-all flex items-center justify-between group
                  ${activeEngine === key ? "bg-panel-alt" : "hover:bg-panel-alt/50"}
                `}
                style={{ borderLeft: `3px solid ${activeEngine === key ? eng.color : "transparent"}` }}
              >
                <div>
                  <div className="text-[11px] font-bold tracking-widest flex items-center gap-2 mb-1" style={{ color: activeEngine === key ? eng.color : "#8B949E" }}>
                    {getEngineIcon(key)} {eng.label}
                  </div>
                  <div className="text-[10px] text-text-mute tracking-wider">
                    {eng.station} · {eng.items.length} ITEMS
                  </div>
                </div>
                <div className={`text-[10px] px-2 py-0.5 rounded bg-bg text-text-mute group-hover:text-text-soft transition-colors`}>
                  {eng.tag}
                </div>
              </button>
              
              <AnimatePresence>
                {activeEngine === key && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-bg/40"
                  >
                    {eng.operationalLayers && eng.operationalLayers.map((layer, j) => (
                      <button
                        key={`layer-${j}`}
                        onClick={() => { setSelectedLayer(layer); setSelectedItem(null); setJemmaOutput(""); setMobileMenuOpen(false); }}
                        className={`
                          w-full text-left px-10 py-3 text-[11px] transition-all border-l-2 bg-orange-500/5
                          ${selectedLayer?.name === layer.name 
                            ? "text-orange-400 bg-panel-alt font-bold" 
                            : "text-text-mute hover:text-orange-400 hover:bg-panel-alt/50"}
                        `}
                        style={{ borderLeftColor: selectedLayer?.name === layer.name ? eng.color : "transparent" }}
                      >
                        <div className="flex items-center gap-2">
                          <ShieldCheck size={12} /> {layer.name}
                        </div>
                      </button>
                    ))}

                    {eng.items.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => { setSelectedItem(item); setSelectedLayer(null); setJemmaOutput(""); setMobileMenuOpen(false); }}
                        className={`
                          w-full text-left px-10 py-3 text-[13px] transition-all border-l-2
                          ${selectedItem?.name === item.name 
                            ? "text-text-primary bg-panel-alt/50 font-bold" 
                            : "text-text-mute hover:text-text-soft hover:bg-panel-alt/20"}
                        `}
                        style={{ borderLeftColor: selectedItem?.name === item.name ? eng.color : "transparent" }}
                      >
                        {item.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </aside>

        {/* SPEC PANEL */}
        <section className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-bg/50">
          {showSupplyMatrix ? (
            renderSupplyMatrix()
          ) : showValidationStatus ? (
            <ValidationStatusLayer items={Object.values(ENGINES).flatMap(e => e.items)} />
          ) : selectedLayer ? (
            renderOperationalLayer(selectedLayer)
          ) : !selectedItem ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <Terminal size={48} className="text-text-mute mb-4" />
              <div className="text-[11px] tracking-[0.3em] text-text-mute uppercase mb-8">{engine.label} — SELECT UNIT FOR INSPECTION</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                {engine.items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedItem(item); setJemmaOutput(""); }}
                    className="bg-panel border border-border-ui p-6 text-left hover:border-orange-500/50 hover:bg-panel-alt transition-all group relative overflow-hidden"
                    style={{ borderLeft: `4px solid ${engine.color}` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[15px] font-bold text-text-primary group-hover:text-white transition-colors">{item.name}</div>
                      <div className="text-[10px] tracking-widest uppercase" style={{ color: engine.color }}>{item.station}</div>
                    </div>
                    <div className="text-[12px] text-text-mute line-clamp-1">
                      {item.allergens?.join(" · ") || "NO ALLERGENS"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto print:opacity-100 print:translate-y-0"
            >
              {/* PRINT ONLY HEADER */}
              <div className="hidden print:block mb-8 border-b-2 border-black pb-4">
                <div className="text-[10px] uppercase tracking-[0.4em] mb-1">Forge · Spec Engine v2.2 · Galyons 6×6</div>
                <h1 className="text-3xl font-black tracking-tighter uppercase">{selectedItem.name}</h1>
                <div className="text-[10px] mt-2 text-gray-500">
                  PRINTED: {new Date().toLocaleString()} · STATION: {selectedItem.station}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10 no-print">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] tracking-[0.2em] text-text-mute uppercase">{engine.label}</span>
                    <span className="w-1 h-1 bg-border-ui rounded-full"></span>
                    <span className="text-[11px] tracking-[0.2em] text-text-mute uppercase">{selectedItem.station}</span>
                  </div>
                  <h1 className="text-[22px] sm:text-3xl font-black tracking-tighter text-text-primary leading-tight" style={{ color: engine.color }}>
                    {selectedItem.name.toUpperCase()}
                  </h1>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => selectedItem && triggerPrint("operator", [selectedItem])}
                    className="px-4 py-2 bg-panel border border-orange-500/30 text-text-soft hover:text-white hover:bg-panel-alt hover:border-orange-500 text-[10px] font-bold tracking-widest rounded flex items-center justify-center gap-2 transition-all active:translate-y-0.5 no-print"
                  >
                    <Printer size={12} className="text-orange-500" />
                    PRINT CARD
                  </button>

                  <button
                    onClick={() => selectedItem && handleSavePDF("operator", [selectedItem])}
                    disabled={isExportingPDF}
                    className="px-4 py-2 bg-panel border border-blue-500/30 text-text-soft hover:text-white hover:bg-panel-alt hover:border-blue-500 text-[10px] font-bold tracking-widest rounded flex items-center justify-center gap-2 transition-all active:translate-y-0.5 no-print disabled:opacity-50"
                  >
                    <Download size={12} className="text-blue-500" />
                    SAVE PDF
                  </button>

                  <div className="w-px h-8 bg-border-ui hidden sm:block mx-1" />

                  <button
                    onClick={() => selectedItem && triggerPrint("unit", [selectedItem])}
                    className="px-4 py-2 bg-panel border border-orange-500/30 text-text-soft hover:text-white hover:bg-panel-alt hover:border-orange-500 text-[10px] font-bold tracking-widest rounded flex items-center justify-center gap-2 transition-all active:translate-y-0.5 no-print"
                  >
                    <Printer size={12} className="text-orange-500" />
                    PRINT UNIT
                  </button>

                  <button
                    onClick={() => selectedItem && handleSavePDF("unit", [selectedItem])}
                    disabled={isExportingPDF}
                    className="px-4 py-2 bg-panel border border-blue-500/30 text-text-soft hover:text-white hover:bg-panel-alt hover:border-blue-500 text-[10px] font-bold tracking-widest rounded flex items-center justify-center gap-2 transition-all active:translate-y-0.5 no-print disabled:opacity-50"
                  >
                    <Download size={12} className="text-blue-500" />
                    SAVE PDF
                  </button>

                  <div className="w-px h-8 bg-border-ui hidden sm:block mx-1" />

                  <button
                    onClick={() => triggerPrint("pack", engine.items)}
                    className="px-4 py-2 bg-panel border border-orange-500/30 text-text-soft hover:text-white hover:bg-panel-alt hover:border-orange-500 text-[10px] font-bold tracking-widest rounded flex items-center justify-center gap-2 transition-all active:translate-y-0.5 no-print"
                  >
                    <Printer size={12} className="text-orange-500" />
                    PRINT PACK
                  </button>

                  <button
                    onClick={() => handleSavePDF("pack", engine.items)}
                    disabled={isExportingPDF}
                    className="px-4 py-2 bg-panel border border-blue-500/30 text-text-soft hover:text-white hover:bg-panel-alt hover:border-blue-500 text-[10px] font-bold tracking-widest rounded flex items-center justify-center gap-2 transition-all active:translate-y-0.5 no-print disabled:opacity-50"
                  >
                    <Download size={12} className="text-blue-500" />
                    SAVE PACK PDF
                  </button>

                  {activeEngine === 'dessert' && (
                    <button
                      onClick={ExportWeaponPack}
                      disabled={isExportingPDF}
                      className="px-4 py-2 bg-[#D46E8D] text-white text-[10px] font-black tracking-widest rounded flex items-center justify-center gap-2 transition-all active:translate-y-0.5 hover:opacity-90 shadow-lg shadow-[#D46E8D]/30 no-print disabled:opacity-50"
                    >
                      <Zap size={14} fill="currentColor" />
                      EXPORT WEAPON
                    </button>
                  )}
                  
                  <button
                    onClick={() => runJemma("item", selectedItem)}
                    disabled={jemmaLoading}
                    className={`
                      w-full sm:w-auto px-6 py-3 text-[11px] font-bold tracking-widest rounded flex items-center justify-center gap-3 transition-all no-print
                      ${jemmaLoading && jemmaMode === "item"
                        ? "bg-panel-alt text-text-mute cursor-not-allowed border border-border-ui"
                        : "text-black hover:opacity-90 active:translate-y-0.5 shadow-lg shadow-orange-500/10"}
                    `}
                    style={{ backgroundColor: jemmaLoading && jemmaMode === "item" ? undefined : engine.color }}
                  >
                    {jemmaLoading && jemmaMode === "item" ? (
                      <>
                        <Zap className="animate-pulse" size={14} />
                        RUNNING...
                      </>
                    ) : (
                      <>
                        <Activity size={14} />
                        JEMMA SPEC CHECK
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="bg-panel border border-border-ui p-6 sm:p-8 rounded-lg relative overflow-hidden group shadow-xl">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <Database size={120} />
                  </div>
                  <div className="text-[11px] tracking-[0.3em] text-text-mute uppercase mb-6 border-b border-border-ui pb-4 flex justify-between">
                    <span>UNIT SPECIFICATIONS</span>
                    {selectedItem.category && <span className="text-orange-500/60">{selectedItem.category}</span>}
                  </div>
                  {selectedItem.yieldBlock && (
                    <div className="grid grid-cols-2 gap-4 mb-6 bg-emerald-500/5 p-4 border border-emerald-500/10 rounded">
                      <div>
                        <div className="text-[9px] text-emerald-500/70 uppercase tracking-[0.2em] mb-1 font-bold">Standard Yield (6)</div>
                        <div className="text-[20px] font-black text-emerald-400">{selectedItem.yieldBlock.sixPortions}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-emerald-500/70 uppercase tracking-[0.2em] mb-1 font-bold">Scaling Yield (20)</div>
                        <div className="text-[20px] font-black text-emerald-500">{selectedItem.yieldBlock.twentyPortions}</div>
                      </div>
                    </div>
                  )}
                  <div className="grid gap-1">
                    {renderSpecFields(selectedItem)}
                  </div>
                  {selectedItem.chefNote && (
                    <div className="mt-8 pt-4 border-t border-border-ui italic text-[14px] text-text-mute flex gap-3">
                      <span className="text-orange-500/40">“</span>
                      <span>{selectedItem.chefNote}</span>
                    </div>
                  )}
                </div>

                {selectedItem.failurePoints && (
                  <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-lg">
                    <div className="text-[10px] tracking-[0.3em] text-rose-500 uppercase mb-4 font-bold flex items-center gap-2">
                      <AlertTriangle size={14} /> FAILURE POINTS (AUTO-REJECT)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                      {selectedItem.failurePoints.map((p, i) => (
                        <div key={i} className="text-[13px] text-rose-300/80 flex gap-2">
                          <span className="text-rose-500">◈</span> {p}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-panel border border-border-ui p-6 sm:p-8 rounded-lg shadow-xl">
                    <div className="text-[11px] tracking-[0.3em] text-text-mute uppercase mb-4 flex items-center gap-2">
                      <AlertTriangle size={12} className="text-rose-500" />
                      Allergen Matrix
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.allergens?.length ? (
                        selectedItem.allergens.map(a => (
                          <span key={a} className="bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[11px] font-bold tracking-widest px-3 py-1 rounded uppercase">
                            {a}
                          </span>
                        ))
                      ) : (
                        <span className="text-[13px] text-text-mute italic">No allergens declared</span>
                      )}
                    </div>
                  </div>

                  <div className="bg-panel border border-border-ui p-6 sm:p-8 rounded-lg shadow-xl">
                    <div className="text-[11px] tracking-[0.3em] text-text-mute uppercase mb-4 flex items-center gap-2">
                      <ShieldCheck size={12} className="text-emerald-500" />
                      Pass Criteria
                    </div>
                    <div className="text-[13px] text-emerald-500 font-bold leading-relaxed tracking-tight uppercase">
                      {selectedItem.passCriteria ? renderSafeValue(selectedItem.passCriteria) : (selectedItem.pass || "Not defined")}
                    </div>
                  </div>

                  {/* PRICING CARD */}
                  <div className="bg-panel border border-emerald-500/30 p-6 sm:p-8 rounded-lg shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-emerald-500/10 text-emerald-500 text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">
                      COMMERCIAL LAYER
                    </div>
                    <div className="text-[11px] tracking-[0.3em] text-text-mute uppercase mb-4 flex items-center gap-2">
                       <Database size={12} className="text-emerald-500" />
                       PRICING & MARGIN
                    </div>
                    {(() => {
                      const itemStock = generateIceCreamSupply([selectedItem]);
                      const itemCostData = calculateBatchCost(itemStock);
                      const itemCostPerPortion = itemCostData.totalCost / 20;
                      const itemPricing = calculatePricing({ costPerPortion: itemCostPerPortion, targetGP: 0.93 });
                      
                      return (
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="text-[10px] text-text-mute uppercase mb-1">COST PER PORTION</div>
                            <div className="text-[18px] font-black text-white">£{itemCostPerPortion.toFixed(2)}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-text-mute uppercase mb-1">RECOMMENDED SELL</div>
                            <div className="text-[18px] font-black text-emerald-400">£{itemPricing.sellPrice.toFixed(2)}</div>
                          </div>
                          <div className="col-span-2 pt-2 border-t border-border-ui flex justify-between items-center">
                            <div className="text-[10px] text-text-mute uppercase tracking-widest">GROSS PROFIT (GP)</div>
                            <div className="text-[14px] font-black text-emerald-500">{(itemPricing.actualGP * 100).toFixed(1)}%</div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {selectedItem.fellini && renderFelliniLayer(selectedItem.fellini)}
                {selectedItem.executionCard && renderExecutionCardLayer(selectedItem.executionCard)}
                {selectedItem.larousse && renderLarousseLayer(selectedItem.larousse)}
                {selectedItem.serviceNotes && renderServiceNotes(selectedItem.serviceNotes as string[])}
              </div>
            </motion.div>
          )}
        </section>

        {/* JEMMA PANEL WITH DUAL-MODE OPERATIONAL CONTROLS (AUDIT + AGENTIC RAG) */}
        <section className="bg-panel border-l border-border-ui flex flex-col h-[550px] lg:h-auto jemma-panel no-print">
          {/* TABS NAVIGATION */}
          <div className="flex border-b border-border-ui text-xs font-bold font-mono">
            <button
              onClick={() => setJemmaTab("audit")}
              className={`flex-1 py-4 flex items-center justify-center gap-2 border-r border-border-ui transition-all ${
                jemmaTab === "audit"
                  ? "bg-bg/40 text-orange-500 border-b-2 border-b-orange-500"
                  : "text-text-mute hover:text-text-soft hover:bg-bg/10"
              }`}
            >
              <Cpu size={14} className={jemmaTab === "audit" ? "text-orange-500" : "text-text-mute"} />
              AUDIT ENFORCER
            </button>
            <button
              onClick={() => setJemmaTab("rag")}
              className={`flex-1 py-4 flex items-center justify-center gap-2 transition-all ${
                jemmaTab === "rag"
                  ? "bg-bg/40 text-orange-500 border-b-2 border-b-orange-500"
                  : "text-text-mute hover:text-text-soft hover:bg-bg/10"
              }`}
            >
              <MessageSquare size={14} className={jemmaTab === "rag" ? "text-orange-500" : "text-text-mute"} />
              HERMES RAG
            </button>
          </div>

          {jemmaTab === "audit" ? (
            /* AUDIT ENFORCER PANEL VIEW */
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-6 border-b border-border-ui flex justify-between items-center bg-bg/20">
                <div>
                  <div className="text-[11px] tracking-[0.3em] text-text-mute uppercase mb-1 flex items-center gap-2">
                    <Cpu size={12} className="text-orange-500" />
                    JEMMA · VALIDATION ENFORCER
                  </div>
                  <div className="text-[11px] text-text-mute font-mono uppercase">
                    {jemmaMode === "item" && selectedItem ? `AUDIT: ${selectedItem.name}` :
                     jemmaMode === "full" ? "SYSTEM: FULL DOCTRINE AUDIT" : "STATUS: STANDBY"}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {jemmaOutput && !jemmaLoading && (
                    <div className="flex bg-panel-alt/50 p-1 rounded border border-border-ui mr-2">
                      <button
                        onClick={async () => {
                          const title = jemmaMode === "item" && selectedItem ? selectedItem.name : "System_Audit";
                          await exportJemmaPDF(title, jemmaOutput);
                        }}
                        title="Export PDF"
                        className="p-1.5 hover:bg-white/5 rounded text-text-mute hover:text-orange-500 transition-colors"
                      >
                        <FileDown size={14} />
                      </button>
                      <button
                        onClick={async () => {
                          const title = jemmaMode === "item" && selectedItem ? selectedItem.name : "System_Audit";
                          await exportJemmaDocx(title, jemmaOutput);
                        }}
                        title="Export Word (.docx)"
                        className="p-1.5 hover:bg-white/5 rounded text-text-mute hover:text-orange-500 transition-colors"
                      >
                        <FileText size={14} />
                      </button>
                      <button
                        onClick={async () => {
                          const success = await copyCleanSpec(jemmaOutput);
                          if (success) {
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }
                        }}
                        title="Copy Clean Spec"
                        className="p-1.5 hover:bg-white/5 rounded text-text-mute hover:text-orange-500 transition-colors"
                      >
                        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  )}

                  {jemmaLoading && (
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-bg/40 font-mono custom-scrollbar">
                {!jemmaOutput && !jemmaLoading && (
                  <div className="space-y-4 opacity-30">
                    <div className="text-[11px] leading-loose tracking-widest">
                      <div>░ JEMMA READY</div>
                      <div>░ SELECT SPEC → ENFORCE DOCTRINE</div>
                      <div>░ STABILITY MANDATORY</div>
                    </div>
                    <div className="text-[9px] leading-none text-text-mute break-all">
                      {Array(20).fill("01010101010101010101010101010101").join(" ")}
                    </div>
                  </div>
                )}

                {jemmaLoading && (
                  <div className="space-y-3">
                    <div className="text-orange-500 text-[11px] font-bold tracking-widest animate-pulse flex items-center gap-2">
                      <Zap size={12} />
                      ◈ INITIATING DOCTRINE AUDIT
                    </div>
                    {[
                      "INJECTING SYSTEM DOCTRINE", 
                      "INSPECTING ROOT LAYER", 
                      "ENFORCING CONTROL LAW",
                      "MAPPING AUTO REJECTS", 
                      "VERIFYING PASS CRITERIA", 
                      "MONITORING TRANSITION",
                      "RENDERING FINAL VERDICT"
                    ].map((s, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-text-mute text-[11px] flex items-center gap-2"
                      >
                        <span className="text-orange-500/50">◈</span> {s}
                      </motion.div>
                    ))}
                  </div>
                )}

                {jemmaOutput && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[13px] leading-relaxed whitespace-pre-wrap"
                  >
                    {(jemmaOutput && typeof jemmaOutput === 'string' ? jemmaOutput.split("\n") : [String(jemmaOutput || '')]).map((line, i) => (
                      <span key={i} className={`${colorLine(line)} block min-h-[1.2em]`}>
                        {line || " "}
                      </span>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            /* HERMES AGENTIC RAG CHAT VIEW */
            <div className="flex-1 flex flex-col min-h-0 bg-bg/25">
              {/* RAG PARAMS CONTROLS */}
              <div className="p-4 border-b border-border-ui bg-panel/30 text-[11px] font-mono space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-text-mute flex items-center gap-1">
                    <Settings size={12} className="text-orange-500/80" /> AGENT CONTROLS
                  </span>
                  
                  <div className="flex gap-2">
                    {/* ACCURACY CHANGER PRESETS */}
                    <button
                      onClick={() => setRagTemperature(0.0)}
                      className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${
                        ragTemperature === 0.0
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : "bg-panel border-border-ui text-text-mute hover:text-text-soft"
                      }`}
                      title="Tighter local code reasoning"
                    >
                      STRICT
                    </button>
                    <button
                      onClick={() => setRagTemperature(0.2)}
                      className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${
                        ragTemperature === 0.2
                          ? "bg-orange-500/15 text-orange-400 border-orange-500/30"
                          : "bg-panel border-border-ui text-text-mute hover:text-text-soft"
                      }`}
                      title="Optimal RAG grounding balance"
                    >
                      BALANCED
                    </button>
                    <button
                      onClick={() => setRagTemperature(0.7)}
                      className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${
                        ragTemperature === 0.7
                          ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                          : "bg-panel border-border-ui text-text-mute hover:text-text-soft"
                      }`}
                      title="Free external model ideas"
                    >
                      CREATIVE
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* SEARCH GROUNDING TOGGLE */}
                  <label className="flex items-center justify-between p-2 bg-panel rounded border border-border-ui cursor-pointer group hover:bg-panel-alt/55 select-none">
                    <span className="flex items-center gap-1.5 text-text-soft group-hover:text-white transition-colors">
                      <Globe size={11} className={webSearch ? "text-blue-400" : "text-text-mute"} />
                      WEB SEARCH
                    </span>
                    <input
                      type="checkbox"
                      checked={webSearch}
                      onChange={(e) => setWebSearch(e.target.checked)}
                      className="accent-orange-500 w-3 h-3 cursor-pointer"
                    />
                  </label>

                  {/* ACCURACY GUARD TOGGLE */}
                  <label className="flex items-center justify-between p-2 bg-panel rounded border border-border-ui cursor-pointer group hover:bg-panel-alt/55 select-none" title="Strict non-hallucination constraint and verification">
                    <span className="flex items-center gap-1.5 text-text-soft group-hover:text-white transition-colors">
                      <Shield size={11} className={accuracyGuard ? "text-emerald-400" : "text-text-mute"} />
                      ACCURACY GD
                    </span>
                    <input
                      type="checkbox"
                      checked={accuracyGuard}
                      onChange={(e) => setAccuracyGuard(e.target.checked)}
                      className="accent-orange-500 w-3 h-3 cursor-pointer"
                    />
                  </label>
                </div>

                {/* INGESTED SOURCES PANEL */}
                <details className="text-[10px] bg-panel-alt/20 rounded p-2 border border-border-ui/50">
                  <summary className="cursor-pointer font-bold flex items-center justify-between text-text-mute hover:text-text-soft">
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={11} className="text-orange-500/70" />
                      INGESTED SOURCES ({ingestedRepos.length + 1})
                    </span>
                  </summary>
                  
                  <div className="mt-2 space-y-1.5">
                    <div className="p-1 px-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded flex justify-between items-center">
                      <span>📦 INTERNAL GALYONS DATABASE (ACTIVE)</span>
                      <span className="text-[8px] font-bold uppercase py-0.2 px-1 bg-emerald-500/20 rounded">LOCAL</span>
                    </div>

                    {ingestedRepos.map((repo, idx) => (
                      <div key={idx} className="p-1 px-2 bg-bg border border-border-ui text-text-soft rounded flex justify-between items-center group/item">
                        <span className="truncate max-w-[240px] font-mono break-all text-[9.5px]">
                          🔗 {repo.replace("https://github.com/", "")}
                        </span>
                        <button
                          onClick={() => setIngestedRepos(prev => prev.filter((_, i) => i !== idx))}
                          className="opacity-0 group-hover/item:opacity-100 hover:text-rose-500 transition-all ml-1"
                          title="Eject Knowledge Store"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    ))}

                    {/* ADD URL ROW */}
                    <div className="flex gap-1.5 pt-1.5">
                      <input
                        type="text"
                        value={newRepoUrl}
                        onChange={(e) => setNewRepoUrl(e.target.value)}
                        placeholder="Ingest github registry URL..."
                        className="flex-1 bg-bg border border-border-ui rounded px-2 py-0.5 text-[9px] text-text-primary placeholder:text-text-mute font-mono outline-none focus:border-orange-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newRepoUrl.trim()) {
                            setIngestedRepos(p => [...p, newRepoUrl.trim()]);
                            setNewRepoUrl("");
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          if (newRepoUrl.trim()) {
                            setIngestedRepos(p => [...p, newRepoUrl.trim()]);
                            setNewRepoUrl("");
                          }
                        }}
                        className="p-1 bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-black border border-orange-500/30 rounded transition-all"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                </details>

                {selectedItem && (
                  <div className="text-[10px] text-orange-400/80 bg-orange-500/5 p-1.5 rounded border border-orange-500/20 flex justify-between items-center">
                    <span>📌 INSTRUCTING CONTEXT ON : {selectedItem.name}</span>
                    <button onClick={() => setSelectedItem(null)} className="text-text-mute hover:text-white font-black">×</button>
                  </div>
                )}
              </div>

              {/* CHAT FEED LIST */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-bg/10">
                {ragMessages.map((msg) => (
                  <div key={msg.id} className={`p-3 rounded-lg border max-w-[90%] transition-all ${
                    msg.role === "user"
                      ? "ml-auto bg-panel-alt/80 border-border-ui text-right"
                      : "mr-auto bg-panel/75 border-border-ui/50"
                  }`}>
                    <div className={`text-[9px] tracking-widest text-text-mute font-black uppercase mb-1.5 flex items-center gap-1.5 ${
                      msg.role === "user" ? "justify-end text-orange-500/70" : "text-emerald-500/70"
                    }`}>
                      {msg.role === "user" ? "◈ OPERATIONAL CHEF" : "◈ HERMES OS AGENT"}
                    </div>
                    
                    {/* CUSTOM PARSING OF MARDKOWN PRESET TO ENHANCE READABILITY */}
                    <div className="text-[12px] leading-relaxed font-mono whitespace-pre-wrap text-left break-words">
                      {msg.text.split("\n").map((line, lIdx) => {
                        let styledLine = line;
                        // Handle bullet lists
                        if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
                          return (
                            <div key={lIdx} className="pl-4 relative min-h-[1.2rem] my-0.5 text-text-soft">
                              <span className="absolute left-1 text-orange-500">▪</span>
                              {line.trim().replace(/^[-*]\s+/, "")}
                            </div>
                          );
                        }
                        return <div key={lIdx} className="min-h-[1.2rem]">{styledLine}</div>;
                      })}
                    </div>

                    {/* CITATION PILLS */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-border-ui/30 text-left">
                        <div className="text-[8.5px] font-bold text-text-mute tracking-wider mb-1">CITED WEBSOURCES:</div>
                        <div className="flex flex-wrap gap-1">
                          {msg.sources.map((s, sIdx) => (
                            <a
                              key={sIdx}
                              href={s.uri}
                              target="_blank"
                              rel="noreferrer"
                              referrerPolicy="no-referrer"
                              className="text-[9px] bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 border border-blue-500/20 rounded max-w-[130px] truncate block hover:border-blue-400/50 transition-all"
                              title={s.title}
                            >
                              🌐 {s.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* RETRIEVING LOAD INDICATOR */}
                {ragLoading && (
                  <div className="mr-auto bg-panel/40 border border-border-ui/40 p-3 rounded-lg flex items-center gap-2 max-w-[70%]">
                    <span className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          className="w-1.5 h-1.5 bg-orange-500 rounded-full inline-block"
                        />
                      ))}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-text-mute animate-pulse">HERMES AGENT RETRIEVING...</span>
                  </div>
                )}
              </div>

              {/* MESSAGE BAR FORM */}
              <form onSubmit={sendRagMessage} className="p-3 border-t border-border-ui bg-panel/80 flex items-center gap-2">
                <input
                  type="text"
                  value={ragInput}
                  onChange={(e) => setRagInput(e.target.value)}
                  placeholder="Ask Hermes: 'What is Galyons 6x6 law?' or recipes..."
                  disabled={ragLoading}
                  className="flex-1 bg-bg border border-border-ui rounded px-3 py-2 text-xs text-text-primary font-mono placeholder:text-text-mute outline-none focus:border-orange-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={ragLoading || !ragInput.trim()}
                  className="p-2 bg-orange-500 hover:bg-orange-400 disabled:bg-panel-alt text-black disabled:text-text-mute rounded transition-all active:translate-y-0.5 disabled:translate-y-0 disabled:opacity-50 shadow-md shadow-orange-500/10"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          )}

          <footer className="p-4 border-t border-border-ui bg-bg/40 flex justify-between items-center text-[9px] tracking-[0.3em] text-text-mute">
            <span className="flex items-center gap-2">
              <ShieldCheck size={10} />
              FORGE UNIFIED ZERO POINT ENGINE · V2.6
            </span>
            <span className="text-orange-500/20 uppercase font-black tracking-[0.4em]">STABILITY</span>
          </footer>
        </section>
      </main>

      {/* PRINT LAYER */}
      <div ref={printRef} id="print-area" className={printMode ? (isExportingPDF ? "pdf-export-visible" : "print-visible") : "print-hidden"}>
        {printMode === "operator" && printItems[0] && (
          <OperatorPrintCard item={printItems[0]} />
        )}

        {printMode === "unit" && printItems[0] && (
          <UnitSpecificationPrint item={printItems[0]} />
        )}

        {printMode === "pack" && printItems.length > 0 && (
          <PrintPackDocument items={printItems} engineLabel={engine.label} />
        )}

        {printMode === "system" && (
          <FullSystemPackDocument engines={ENGINES} />
        )}

        {printMode === "weapon" && printItems.length > 0 && (
          <WeaponSystemPack items={printItems} engineLabel={engine.label} />
        )}
      </div>

      {isExportingPDF && (
        <div className="fixed inset-0 bg-[#000000cc] backdrop-blur-sm z-[100] flex flex-col items-center justify-center text-white">
          <div className="w-12 h-12 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xl font-black tracking-widest uppercase">Generating PDF...</div>
          <div className="text-sm text-[#9ca3af] mt-2">Please wait while we render the doctrine pack</div>
        </div>
      )}

      <style>{`
        .print-visible { display: block; }
        .print-hidden { display: none; }
        .pdf-export-visible { 
          display: block !important; 
          position: fixed; 
          left: 0;
          top: 0;
          width: 210mm;
          z-index: -100;
          background: white;
          color: black;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2B3138;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f4751;
        }
      `}</style>
    </div>
  );
}
