import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, AlertTriangle, Activity, RefreshCw, Trash2, CheckCircle2, Search } from "lucide-react";
import { DishItem } from "../types";

interface ValidationStatusLayerProps {
  items: DishItem[];
}

export const ValidationStatusLayer: React.FC<ValidationStatusLayerProps> = ({ items }) => {
  const getVerdictColor = (verdict?: string) => {
    if (!verdict) return "text-text-mute opacity-40";
    if (verdict.toLowerCase().includes("pass")) return "text-emerald-500 font-bold";
    if (verdict.toLowerCase().includes("fail") || verdict.toLowerCase().includes("reject")) return "text-rose-500 font-bold";
    return "text-amber-500 font-bold";
  };

  const getVerdictBg = (verdict?: string) => {
    if (!verdict) return "bg-border-ui/20";
    if (verdict.toLowerCase().includes("pass")) return "bg-emerald-500/10 border border-emerald-500/30";
    if (verdict.toLowerCase().includes("fail") || verdict.toLowerCase().includes("reject")) return "bg-rose-500/10 border border-rose-500/30";
    return "bg-amber-500/10 border border-amber-500/30";
  };

  const getNextAction = (item: DishItem) => {
    const verdict = item.fellini?.verdict?.toLowerCase() || "";
    if (verdict.includes("pass")) return { label: "RELEASE", icon: <CheckCircle2 size={12} />, color: "text-emerald-400" };
    if (item.fellini?.conversionAction) return { label: "CONVERT", icon: <RefreshCw size={12} />, color: "text-blue-400" };
    if (verdict.includes("fail") || item.fellini?.autoReject?.length) return { label: "DISCARD", icon: <Trash2 size={12} />, color: "text-rose-400" };
    return { label: "MONITOR", icon: <Search size={12} />, color: "text-amber-400" };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 p-4">
      <div className="border-b-2 border-orange-500/50 pb-6 mb-10">
        <div className="text-[10px] tracking-[0.4em] text-text-mute uppercase mb-2">Central Command · Live Audit</div>
        <h1 className="text-3xl font-black tracking-tighter text-orange-500">FORGE VALIDATION STATUS LAYER</h1>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border-ui bg-panel shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-bg/60 border-b border-border-ui">
            <tr>
              <th className="p-4 text-[11px] uppercase tracking-widest text-text-mute font-bold">Item Identifier</th>
              <th className="p-4 text-[11px] uppercase tracking-widest text-text-mute font-bold text-center">Checkpoints</th>
              <th className="p-4 text-[11px] uppercase tracking-widest text-text-mute font-bold text-center">Verdict State</th>
              <th className="p-4 text-[11px] uppercase tracking-widest text-text-mute font-bold text-center">Next Action</th>
              <th className="p-4 text-[11px] uppercase tracking-widest text-text-mute font-bold">Control Law</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-ui/50">
            {items.map((item, idx) => {
              const action = getNextAction(item);
              let checkpoints: string[] = [];
              
              if (item.fellini?.validationPoint) {
                checkpoints = item.fellini.validationPoint;
              } else if (item.fellini?.validationPoints) {
                checkpoints = Object.keys(item.fellini.validationPoints).filter(
                  key => item.fellini?.validationPoints?.[key as keyof typeof item.fellini.validationPoints]
                );
              }
              
              return (
                <motion.tr 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="p-4">
                    <div className="text-[14px] font-bold text-text-primary group-hover:text-orange-400 transition-colors uppercase">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-text-mute tracking-widest uppercase mt-1">
                      {item.station} · {item.category || "UNIT"}
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex justify-center gap-1">
                      {["postPrep", "preService", "atPass"].map(cp => (
                        <div 
                          key={cp}
                          className={`
                            px-2 py-0.5 rounded-[2px] text-[9px] font-black tracking-tighter uppercase
                            ${checkpoints.includes(cp as any) 
                              ? "bg-orange-500 text-black border border-orange-500" 
                              : "bg-bg text-text-mute border border-border-ui opacity-30"}
                          `}
                        >
                          {cp.replace(/([A-Z])/, ' $1')}
                        </div>
                      ))}
                    </div>
                  </td>
                  
                  <td className="p-4 text-center">
                    <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${getVerdictBg(item.fellini?.verdict)}`}>
                      <span className={getVerdictColor(item.fellini?.verdict)}>
                        {item.fellini?.verdict ? item.fellini.verdict.split(":")[0] : "PENDING"}
                      </span>
                    </div>
                  </td>
                  
                  <td className="p-4 text-center">
                    <div className={`flex items-center justify-center gap-2 font-mono text-[11px] font-black tracking-[0.1em] ${action.color}`}>
                      {action.icon}
                      {action.label}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="text-[11px] text-text-soft leading-relaxed line-clamp-2 max-w-md italic">
                      {item.fellini?.controlLaw || item.fellini?.identity || "NO CONTROL LAW DEFINED"}
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded">
              <ShieldCheck className="text-emerald-500" size={20} />
            </div>
            <div className="text-[12px] font-bold text-emerald-500 tracking-widest uppercase">System Stability</div>
          </div>
          <div className="text-[13px] text-text-soft leading-relaxed">
            Items marked 🟢 RELEASE have met all Fellini Pass Signals and are authorized for live service.
          </div>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/10 rounded">
              <Activity className="text-amber-500" size={20} />
            </div>
            <div className="text-[12px] font-bold text-amber-500 tracking-widest uppercase">State of Transition</div>
          </div>
          <div className="text-[13px] text-text-soft leading-relaxed">
            Items marked 🟡 MONITOR are in a state of transition (drift). Re-validation required at <strong>preService</strong> checkpoint for flow stabilization.
          </div>
        </div>

        <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-500/10 rounded">
              <AlertTriangle className="text-rose-500" size={20} />
            </div>
            <div className="text-[12px] font-bold text-rose-500 tracking-widest uppercase">Critical Failure</div>
          </div>
          <div className="text-[13px] text-text-soft leading-relaxed">
            Items marked 🔴 DISCARD or 🔵 CONVERT have failed structural integrity checks. Execute recovery move immediately.
          </div>
        </div>
      </div>
    </div>
  );
};
