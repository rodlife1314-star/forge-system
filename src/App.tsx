import { useState, useRef } from "react";
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
  Menu,
  Printer,
  Download,
  Calendar,
  FileText,
  FileDown,
  Copy,
  Check,
  ClipboardCheck
} from "lucide-react";
import { ENGINES, JEMMA_BURGER_VALIDATION_PATCH, BURGER_ENGINE_PATCH } from "./constants";
import { DishItem, JemmaMode, OperationalLayer } from "./types";
import { runJemmaValidation, buildJemmaPrompt, buildFullValidationPrompt } from "./services/geminiService";
import { exportJemmaPDF, exportJemmaDocx, copyCleanSpec } from "./services/exportService";
import { ExportWeaponPack as runWeaponExport } from "./lib/exportWeaponPack";
import { OperatorPrintCard, UnitSpecificationPrint, PrintPackDocument, FullSystemPackDocument, WeaponSystemPack } from "./components/PrintViews";
import { exportToPDF } from "./services/pdfService";
import { ValidationStatusLayer } from "./components/ValidationStatusLayer";

export default function App() {
  const [activeEngine, setActiveEngine] = useState("all");
  const [showValidationStatus, setShowValidationStatus] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DishItem | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<OperationalLayer | null>(null);
  const [jemmaOutput, setJemmaOutput] = useState("");
  const [jemmaLoading, setJemmaLoading] = useState(false);
  const [jemmaMode, setJemmaMode] = useState<JemmaMode | null>(null);
  const [locked, setLocked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [printMode, setPrintMode] = useState<null | "operator" | "unit" | "pack" | "system" | "weapon">(null);
  const [printItems, setPrintItems] = useState<DishItem[]>([]);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

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
    ? { label: "MASTER BIBLE", color: "#FFB347", station: "ALL STATIONS", items: Object.values(ENGINES).flatMap(e => e.items) }
    : ENGINES[activeEngine];

  const runJemma = async (mode: JemmaMode, item: DishItem | null = null) => {
    setJemmaLoading(true);
    setJemmaOutput("");
    setJemmaMode(mode);
    
    const prompt = mode === "item" && item
      ? buildJemmaPrompt(engine.label, item)
      : buildFullValidationPrompt(ENGINES, {
          burgerPatch: BURGER_ENGINE_PATCH,
          validationRules: JEMMA_BURGER_VALIDATION_PATCH
        });

    try {
      const text = await runJemmaValidation(prompt.system, prompt.user);
      setJemmaOutput(text);
      if (text.toLowerCase().includes("locked")) setLocked(true);
    } catch (error) {
      setJemmaOutput("JEMMA FAULT — connection failed.");
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
      let filename = "";
      if (mode === "system") {
        filename = "FORGE_FULL_SYSTEM_DOCTRINE";
      } else if (mode === "pack") {
        filename = `FORGE_PACK_${engine.label.replace(/\s+/g, '_')}`;
      } else if (mode === "weapon") {
        filename = `FORGE_EXPORT_WEAPON_${engine.label.replace(/\s+/g, '_')}`;
      } else {
        filename = `FORGE_${items[0].name.replace(/\s+/g, '_')}_${mode.toUpperCase()}`;
      }
      
      await exportToPDF("print-capture-root", filename);
      
      setPrintMode(null);
      setPrintItems([]);
      setIsExportingPDF(false);
    }, 500);
  };

  const renderSpecFields = (item: DishItem) => {
    const skip = ["name", "allergens", "pass", "station", "larousse", "fellini", "executionCard", "chefNote", "failurePoints"];
    return Object.entries(item)
      .filter(([k]) => !skip.includes(k))
      .map(([k, v]) => {
        let displayValue: any = v;
        if (Array.isArray(v)) {
          displayValue = v.join(" · ");
        } else if (v !== null && typeof v === "object") {
          displayValue = Object.entries(v)
            .map(([subK, subV]) => `${subK}: ${subV}`)
            .join(" · ");
        }

        const isFinancial = ["price", "cost", "gp"].includes(k);

        return (
          <div key={k} className="flex flex-col sm:flex-row sm:gap-4 mb-3 group">
            <div className={`sm:w-32 shrink-0 text-[11px] font-mono uppercase tracking-wider pt-0.5 group-hover:text-text-soft transition-colors ${isFinancial ? 'text-emerald-500 font-black' : 'text-text-mute'}`}>
              {k}
            </div>
            <div className={`text-[13px] leading-relaxed font-mono ${isFinancial ? 'text-emerald-400 font-black italic' : 'text-text-soft'}`}>
              {displayValue}
            </div>
          </div>
        );
      });
  };

  const renderExecutionCardLayer = (card: any) => {
    if (!card) return null;
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
                  {card.setup.map((s: string, i: number) => <div key={i}>• {s}</div>)}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-text-soft font-bold mb-1 opacity-60">BUILD SEQUENCE:</div>
                <div className="text-[13px] text-text-primary px-3 py-2 bg-bg/40 border-l border-orange-500/30">
                  {card.build.map((s: string, i: number) => <div key={i} className="mb-1">{s}</div>)}
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
                  {card.failures.map((s: string, i: number) => <div key={i}>❌ {s}</div>)}
                </div>
              </div>
              <div className="pt-2 border-t border-border-ui">
                <div className="text-[11px] font-bold mb-1 text-text-soft">RESET TRIGGER:</div>
                <div className="text-[13px] text-text-mute pl-4 italic">
                  {card.reset.map((s: string, i: number) => <div key={i}>🔄 {s}</div>)}
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

    const renderList = (title: string, items: string[]) => (
      <div className="mb-3">
        <div className="text-[9px] text-text-mute tracking-[2px] mb-1.5 uppercase">
          {title}
        </div>
        {items.map((item, i) => (
          <div key={i} className="text-[13px] text-text-soft leading-relaxed mb-1">
            • {item}
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
      ["PRESSURE POINT", fellini.pressurePoint],
      ["WATCH POINT", fellini.watchPoint],
      ["PASS SIGNAL", fellini.passSignal],
      ["FAILURE SIGNAL", fellini.failureSignal],
      ["RECOVERY MOVE", fellini.recoveryMove],
    ];

    return (
      <div className="bg-[#111315] border border-[#2A2F36] p-4 mt-3 fellini-layer">
        <div className="text-[10px] tracking-[3px] text-[#FFB347] mb-2.5 font-bold uppercase">
          🎬 FELLINI — LIVE CONTROL
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {fields.map(([label, value]) => (
            <div key={label}>
              <div className="text-[9px] text-[#777] tracking-[1px] mb-1 uppercase font-bold">
                {label}
              </div>
              <div className={`text-[12px] leading-relaxed ${label === 'RECOVERY MOVE' ? 'text-orange-500 font-bold' : 'text-[#EAEAEA]'}`}>
                {value}
              </div>
            </div>
          ))}
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
          Fellini / FORGE — Sunday Engine Control Layer | Zero Drift Execution
        </div>
      </div>
    );
  };

  const colorLine = (line: string) => {
    if (line.match(/^(JEMMA VALIDATION|TITLE|TYPE|SYSTEM VALIDATION|ROOT LAYER|CONTROL LAW|SEQUENCE LAW|AUTO REJECT|PASS CRITERIA|TECHNICAL FAULTS|VERDICT|ENGINE STATUS|DOCTRINE|PREP ENGINE|ALLERGEN|PRESSURE|SYSTEM VERDICT|CHEF'S NOTE|━)/))
      return "text-orange-500 font-black tracking-tight";
    if (line.match(/PASS|LOCKED|COMPLETE|CONFIRMED|PASSED|✓/i)) return "text-emerald-500 font-bold";
    if (line.match(/CONDITIONAL|WATCH|FLAG|RISK|GAP/i)) return "text-amber-500";
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
            <div className="text-[9px] uppercase tracking-[0.4em] text-text-mute mb-0.5">Octagon OS · Forge · MASTER BIBLE v2.5</div>
            <div className="text-lg sm:text-xl font-black tracking-tighter text-orange-500 flex items-center gap-2">
              FORGE BIBLE
              <span className="hidden sm:inline text-[10px] font-normal tracking-widest text-text-mute bg-panel-alt px-2 py-0.5 rounded ml-2">UNLIMITED</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <AnimatePresence>
            {locked && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden md:flex bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[10px] tracking-widest px-3 py-1.5 rounded items-center gap-2"
              >
                <ShieldCheck size={12} />
                SYSTEM LOCKED
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
              onClick={() => { setShowValidationStatus(true); setActiveEngine(""); setSelectedItem(null); setSelectedLayer(null); setJemmaOutput(""); setMobileMenuOpen(false); }}
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
              onClick={() => { setShowValidationStatus(false); setActiveEngine("all"); setSelectedItem(null); setSelectedLayer(null); setJemmaOutput(""); setMobileMenuOpen(false); }}
              className={`
                w-full text-left px-5 py-6 transition-all flex items-center justify-between group
                ${activeEngine === "all" && !showValidationStatus ? "bg-orange-500/10" : "hover:bg-panel-alt/50"}
              `}
              style={{ borderLeft: `3px solid ${activeEngine === "all" && !showValidationStatus ? "#FFB347" : "transparent"}` }}
            >
              <div>
                <div className="text-[12px] font-black tracking-[0.2em] flex items-center gap-2 mb-1" style={{ color: activeEngine === "all" ? "#FFB347" : "#8B949E" }}>
                  <Terminal size={16} /> MASTER BIBLE
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
                onClick={() => { setShowValidationStatus(false); setActiveEngine(key); setSelectedItem(null); setSelectedLayer(null); setJemmaOutput(""); setMobileMenuOpen(false); }}
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
          {showValidationStatus ? (
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
                      {selectedItem.pass}
                    </div>
                  </div>
                </div>

                {selectedItem.fellini && renderFelliniLayer(selectedItem.fellini)}
                {selectedItem.executionCard && renderExecutionCardLayer(selectedItem.executionCard)}
                {selectedItem.larousse && renderLarousseLayer(selectedItem.larousse)}
              </div>
            </motion.div>
          )}
        </section>

        {/* JEMMA PANEL */}
        <section className="bg-panel border-l border-border-ui flex flex-col h-[400px] lg:h-auto jemma-panel no-print">
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
                  <div>░ NO DRIFT TOLERATED</div>
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
                  "SCANNING FOR DRIFT",
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
                {jemmaOutput.split("\n").map((line, i) => (
                  <span key={i} className={`${colorLine(line)} block min-h-[1.2em]`}>
                    {line || " "}
                  </span>
                ))}
              </motion.div>
            )}
          </div>

          <footer className="p-4 border-t border-border-ui bg-bg/40 flex justify-between items-center text-[9px] tracking-[0.3em] text-text-mute">
            <span className="flex items-center gap-2">
              <ShieldCheck size={10} />
              FORGE UNIFIED ZERO POINT ENGINE · V2.6
            </span>
            <span className="text-orange-500/20 uppercase font-black tracking-[0.4em]">NO DRIFT</span>
          </footer>
        </section>
      </main>

      {/* PRINT LAYER */}
      <div ref={printRef} id="print-capture-root" className={printMode ? (isExportingPDF ? "pdf-export-visible" : "print-visible") : "print-hidden"}>
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
          left: -9999px; 
          top: 0;
          width: 210mm; /* A4 width */
          background: white;
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
