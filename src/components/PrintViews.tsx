import React from 'react';
import { DishItem, Engine } from '../types';

interface PrintProps {
  item: DishItem;
}

export const OperatorPrintCard: React.FC<PrintProps> = ({ item }) => {
  const CardA = () => (
    <div className="print-root print-page page a5 bg-white text-black font-mono break-after-page">
      <div className="border-[6px] border-black p-6 h-[190mm] relative overflow-hidden flex flex-col">
        <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-4">
          <div>
            <div className="text-[10px] tracking-[0.4em] mb-1 uppercase font-bold">FORGE · CARD A</div>
            <div className="text-[14px] font-black uppercase text-[#C84B31]">STATION EXECUTION</div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mt-1">{item.name}</h1>
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-widest uppercase font-bold">STATION</div>
            <div className="text-2xl font-black">{item.station}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-6 border-b-2 border-black pb-4 segment">
          {item.yieldBlock ? (
            <>
              <div>
                <div className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">Yield (6)</div>
                <div className="text-[14px] font-black uppercase">{item.yieldBlock.sixPortions}</div>
              </div>
              <div>
                <div className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">Yield (20)</div>
                <div className="text-[14px] font-black uppercase">{item.yieldBlock.twentyPortions}</div>
              </div>
            </>
          ) : (item as any).prepLevel ? (
            <>
              <div>
                <div className="text-[8px] font-bold text-orange-600 uppercase tracking-widest">Prep Level (6)</div>
                <div className="text-[12px] font-black uppercase">{(item as any).prepLevel}</div>
              </div>
              <div>
                <div className="text-[8px] font-bold text-orange-600 uppercase tracking-widest">Scale Yield (20)</div>
                <div className="text-[12px] font-black uppercase">{(item as any).scaleYield}</div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-[8px] font-bold text-[#6b7280] uppercase tracking-widest">Portion</div>
                <div className="text-[14px] font-black uppercase">{(item as any).portion || "---"}</div>
              </div>
              <div>
                <div className="text-[8px] font-bold text-[#6b7280] uppercase tracking-widest">Batch Yield</div>
                <div className="text-[14px] font-black uppercase">{(item as any).batchYield || "---"}</div>
              </div>
            </>
          )}
          <div>
            <div className="text-[8px] font-bold text-[#6b7280] uppercase tracking-widest">Shelf Life</div>
            <div className="text-[14px] font-black uppercase">{(item as any).shelfLife || "---"}</div>
          </div>
          <div>
            <div className="text-[8px] font-bold text-[#6b7280] uppercase tracking-widest">{(item as any).portionLogic ? "Portion Logic" : "Portion Tool"}</div>
            <div className="text-[14px] font-black uppercase truncate">{(item as any).portionLogic || (item as any).portionTool || "---"}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 border-b-2 border-black pb-4 segment">
          <div>
            <div className="text-[8px] font-bold text-[#6b7280] uppercase tracking-widest">Cook Temp</div>
            <div className="text-[13px] font-black uppercase">{item.cookTemp || "---"}</div>
          </div>
          <div>
            <div className="text-[8px] font-bold text-[#6b7280] uppercase tracking-widest">Cook Time</div>
            <div className="text-[13px] font-black uppercase">{item.cookTime || "---"}</div>
          </div>
          <div>
            <div className="text-[8px] font-bold text-[#6b7280] uppercase tracking-widest">Reheat</div>
            <div className="text-[13px] font-black uppercase truncate">{item.reheatMethod || "---"}</div>
          </div>
        </div>

        {/* DATA SYNTHESIS LAYER — PREVENTS BLANK RENDERING */}
        <div className="flex-1 overflow-visible segment border-2 border-dashed border-gray-100 p-1">
          <div className="flex justify-between items-baseline border-b-2 border-black mb-3">
            <div className="text-[12px] font-black uppercase tracking-widest">EXECUTION CARD</div>
            <div className="text-[14px] font-black text-[#C84B31]">
              LAW: {item.executionCard?.timeLaw || "≤60s (STD)"}
            </div>
          </div>
          
          <div className="space-y-4">
            {/* SETUP SECTION */}
            <div>
              <div className="text-[8px] font-bold text-[#6b7280] uppercase mb-1">Setup Sequence (≤5 min)</div>
              <div className="text-[11px] font-bold uppercase leading-tight space-y-1">
                {item.executionCard?.setup?.length 
                  ? item.executionCard.setup.map((s, i) => <div key={i}>• {s}</div>)
                  : item.mep6x6?.holding 
                    ? <div>• {item.mep6x6.holding}</div>
                    : <div className="text-gray-300 italic uppercase underline decoration-red-500">Missing Setup Data</div>
                }
              </div>
            </div>
            
            {/* BUILD SECTION */}
            <div>
              <div className="text-[8px] font-bold text-[#6b7280] uppercase mb-1">Build Sequence / Signals</div>
              <div className="text-[12px] font-black uppercase leading-tight space-y-1">
                {item.executionCard?.build?.length 
                  ? item.executionCard.build.map((s, i) => <div key={i}>{s}</div>)
                  : item.larousse?.method?.length
                    ? item.larousse.method.map((s, i) => <div key={i}>{s}</div>)
                    : <div className="text-gray-300 italic uppercase underline decoration-red-500">Missing Build Data</div>
                }
                {(item.executionCard?.buildSignal || item.fellini?.passSignal) && (
                  <div className="text-[#C84B31] italic">
                    SIGNAL: {item.executionCard?.buildSignal || item.fellini?.passSignal}
                  </div>
                )}
              </div>
            </div>

            {/* FAILURE SECTION */}
            <div className="bg-[#fef2f2] p-2 border border-[#C84B31]/30">
              <div className="text-[8px] font-bold text-[#C84B31] uppercase mb-1">NON-NEGOTIABLE FAILURES</div>
              <div className="text-[11px] font-black uppercase leading-tight text-[#C84B31] space-y-1">
                {item.executionCard?.failures?.length
                  ? item.executionCard.failures.map((s, i) => <div key={i}>❌ {s}</div>)
                  : item.larousse?.faults?.length
                    ? item.larousse.faults.map((s, i) => <div key={i}>❌ {s}</div>)
                    : <div className="text-[#C84B31]/30 italic uppercase underline decoration-red-500">Missing Failure Data</div>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[#d1d5db] flex justify-between text-[8px] text-[#9ca3af] tracking-widest uppercase">
          <span>FORGE STATION ENGINE · CARD A</span>
          <span>SYSTEMS LOCK v2.5.2a</span>
        </div>
      </div>
    </div>
  );

  const CardB = () => (
    <div className="print-root print-page page a5 bg-white text-black font-mono">
      <div className="border-[6px] border-black p-6 h-[190mm] relative overflow-hidden flex flex-col">
        <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-4">
          <div>
            <div className="text-[10px] tracking-[0.4em] mb-1 uppercase font-bold">FORGE · CARD B</div>
            <div className="text-[14px] font-black uppercase text-[#3b82f6]">FELLINI / SYSTEM</div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mt-1">{item.name}</h1>
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-widest uppercase font-bold">STATION</div>
            <div className="text-2xl font-black">{item.station}</div>
          </div>
        </div>

        {item.fellini && (
          <div className="border-4 border-black p-4 mb-6 bg-black text-white segment">
            <div className="text-[10px] tracking-[0.4em] font-black mb-3 border-b border-white/30 pb-1">FELLINI LIVE CONTROL</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Identity</div>
                <div className="text-[12px] font-black uppercase">{item.fellini.identity}</div>
              </div>
              <div>
                <div className="text-[8px] font-bold text-[#D46E8D] uppercase tracking-widest">Recovery</div>
                <div className="text-[12px] font-black uppercase text-[#D46E8D]">{item.fellini.recoveryMove}</div>
              </div>
              <div>
                <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Pressure Pt</div>
                <div className="text-[11px] font-bold uppercase">{item.fellini.pressurePoint}</div>
              </div>
              <div>
                <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Watch Pt</div>
                <div className="text-[11px] font-bold uppercase">{item.fellini.watchPoint}</div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-white/20">
              <div className="text-[8px] font-bold text-gray-400 uppercase">Control Law</div>
              <div className="text-[11px] font-bold italic leading-tight uppercase">{item.fellini.controlLaw}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 segment flex-1 overflow-hidden">
          <div className="space-y-4">
            <section>
              <div className="text-[10px] tracking-widest font-black border-b border-black mb-2">PASS SIGNALS</div>
              <div className="text-[11px] font-bold leading-tight uppercase text-green-700">
                {item.fellini?.passSignals ? (
                  <div className="space-y-0.5">
                    {item.fellini.passSignals.map((s, i) => (
                      <div key={i} className="flex gap-1">
                        <span>•</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  item.fellini?.passSignal
                )}
              </div>
            </section>
            <section>
              <div className="text-[10px] tracking-widest font-black border-b border-black mb-2">FAIL SIGNALS</div>
              <div className="text-[11px] font-bold leading-tight uppercase text-red-700">
                {item.fellini?.failSignals ? (
                  <div className="space-y-0.5">
                    {item.fellini.failSignals.map((s, i) => (
                      <div key={i} className="flex gap-1">
                        <span>•</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  item.fellini?.failureSignal
                )}
              </div>
            </section>
          </div>
          
          <div className="space-y-4">
            <section>
              <div className="text-[10px] tracking-widest font-black border-b border-black mb-2">PASS CRITERIA</div>
              <div className="text-[11px] font-black uppercase leading-tight">
                {item.passCriteria ? (
                  <div className="space-y-0.5">
                    {item.passCriteria.map((s, i) => (
                      <div key={i} className="flex gap-1">
                        <span>•</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  item.pass || "Not defined"
                )}
              </div>
            </section>
            <section>
              <div className="text-[10px] tracking-widest font-black border-b border-black mb-2">ALLERGENS</div>
              <div className="flex flex-wrap gap-1">
                {item.allergens?.map(a => (
                  <span key={a} className="text-[10px] font-black border border-black px-1.5 uppercase">{a}</span>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[#d1d5db] flex justify-between text-[8px] text-[#9ca3af] tracking-widest uppercase">
          <span>FORGE SYSTEM ENGINE · CARD B</span>
          <span>SYSTEMS LOCK v2.5.2a</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <CardA />
      <CardB />
    </>
  );
};

export const UnitSpecificationPrint: React.FC<PrintProps> = ({ item }) => {
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
                <div key={index} className="text-[11px] font-bold">
                  <span>{ingredient.name ?? "Ingredient"}</span>
                  <span className="mx-1">—</span>
                  <span>6: {ingredient.six ?? "—"}{ingredient.unit ?? ""}</span>
                  <span className="mx-2">|</span>
                  <span>20: {ingredient.twenty ?? "—"}{ingredient.unit ?? ""}</span>
                </div>
              );
            }

            return (
              <div key={index} className="text-[11px] flex items-start gap-1">
                  <span>•</span>
                  <span>{renderSafeValue(item)}</span>
              </div>
            );
          })}
        </div>
      );
    }

    if (typeof value === "object") {
      return (
        <div className="space-y-2 border-l-2 border-black/10 pl-3">
          {Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => (
            <div key={key}>
              <div className="text-[9px] uppercase font-bold text-gray-500 mb-0.5">{key}</div>
              <div className="pl-2">{renderSafeValue(nestedValue)}</div>
            </div>
          ))}
        </div>
      );
    }

    return String(value);
  };

  const Header = ({ title }: { title: string }) => (
    <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
      <div>
        <div className="text-[10px] tracking-[0.5em] font-bold text-[#6b7280] mb-2 uppercase">FORGE · {title}</div>
        <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">{item.name}</h1>
      </div>
      <div className="text-right">
        <div className="text-[10px] tracking-widest font-bold uppercase">STATION</div>
        <div className="text-xl font-bold">{item.station}</div>
      </div>
    </div>
  );

  const Footer = ({ layer }: { layer: string }) => (
    <div className="mt-auto pt-4 border-t border-[#d1d5db] flex justify-between text-[8px] text-[#9ca3af] tracking-widest uppercase">
      <span>FORGE DOCTRINE · {layer}</span>
      <span>PRINTED: {new Date().toLocaleString()}</span>
      <span>SYSTEMS LOCK v2.5.2a</span>
    </div>
  );

  return (
    <>
      {/* PAGE 1: CORE SPEC */}
      <div className="print-root print-page page a4 bg-white text-black font-mono print-section-a4 break-after-page flex flex-col">
        <Header title="UNIT SPECIFICATION" />

        <div className="grid grid-cols-2 gap-12 mb-10 overflow-hidden">
          <div className="space-y-6">
            <section className="segment">
              <h3 className="text-[10px] tracking-widest font-black border-b border-black mb-2 uppercase">UNIT METRICS</h3>
              <div className="text-[13px] space-y-1">
                {item.yieldBlock && (
                  <div className="grid grid-cols-2 gap-4 mb-4 bg-emerald-50 p-3 border border-emerald-200 rounded">
                    <div>
                      <div className="text-[9px] font-bold text-emerald-600 uppercase">Batch Yield (6)</div>
                      <div className="text-[16px] font-black">{item.yieldBlock.sixPortions}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-emerald-600 uppercase">Batch Yield (20)</div>
                      <div className="text-[16px] font-black">{item.yieldBlock.twentyPortions}</div>
                    </div>
                  </div>
                )}
                {(item as any).portion && <p><span className="font-bold">Portion:</span> {(item as any).portion}</p>}
                {(item as any).prepLevel ? (
                  <>
                    <p><span className="font-bold">Prep Level (6):</span> {(item as any).prepLevel}</p>
                    <p><span className="font-bold">Scale Yield (20):</span> {(item as any).scaleYield}</p>
                  </>
                ) : (
                  (item as any).batchYield && <p><span className="font-bold">Yield:</span> {(item as any).batchYield}</p>
                )}
                {(item as any).shelfLife && <p><span className="font-bold">Shelf Life:</span> {(item as any).shelfLife}</p>}
                {(item as any).ingredients && (
                  <div className="mt-2">
                    <span className="font-bold block mb-1">Ingredients:</span>
                    <div className="pl-4">{renderSafeValue((item as any).ingredients)}</div>
                  </div>
                )}
                {(item as any).serviceNotes && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                    <div className="text-[9px] font-bold text-blue-600 uppercase mb-1">Service Notes</div>
                    <ul className="text-[11px] space-y-1">
                      {(item as any).serviceNotes.map((note: string, i: number) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-blue-400">◈</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(item as any).texture && <p className="text-[#C84B31] font-black"><span className="font-bold uppercase tracking-tighter">Texture Lock:</span> {(item as any).texture}</p>}
              </div>
            </section>

            <section className="segment">
              <h3 className="text-[10px] tracking-widest font-black border-b border-black mb-2 uppercase">COMPONENT WEIGHTS</h3>
              <div className="text-[13px] space-y-4">
                {(item as any).dough && <div className="segment"><span className="font-bold block mb-1">Dough:</span> <div className="pl-2">{renderSafeValue((item as any).dough)}</div></div>}
                {(item as any).sauce && <div className="segment"><span className="font-bold block mb-1">Sauce:</span> <div className="pl-2">{renderSafeValue((item as any).sauce)}</div></div>}
                {(item as any).cheese && <div className="segment"><span className="font-bold block mb-1">Cheese:</span> <div className="pl-2">{renderSafeValue((item as any).cheese)}</div></div>}
                {(item as any).topping && <div className="segment"><span className="font-bold block mb-1">Topping:</span> <div className="pl-2">{renderSafeValue((item as any).topping)}</div></div>}
                {(item as any).build && <div className="segment"><span className="font-bold block mb-1">Build:</span> <div className="pl-2">{renderSafeValue((item as any).build)}</div></div>}
              </div>
            </section>

            <section className="segment">
              <h3 className="text-[10px] tracking-widest font-black border-b border-black mb-2 uppercase">COOK PARAMETERS</h3>
              <div className="text-[13px] space-y-4">
                {(item as any).cook && <div className="segment"><span className="font-bold block mb-1">Cook:</span> <div className="pl-2">{renderSafeValue((item as any).cook)}</div></div>}
                {(item as any).method && <div className="segment"><span className="font-bold block mb-1">Method:</span> <div className="pl-2">{renderSafeValue((item as any).method)}</div></div>}
                {(item as any).fry && <div className="segment"><span className="font-bold block mb-1">Fry:</span> <div className="pl-2">{renderSafeValue((item as any).fry)}</div></div>}
                {(item as any).cookTemp && <p><span className="font-bold">Temp:</span> {renderSafeValue((item as any).cookTemp)}</p>}
                {(item as any).cookTime && <p><span className="font-bold">Time:</span> {renderSafeValue((item as any).cookTime)}</p>}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="segment">
              <h3 className="text-[10px] tracking-widest font-black border-b border-black mb-2 uppercase">ALLERGEN MATRIX</h3>
              {(item.allergens || []).length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((a: string) => (
                    <span key={a} className="text-[11px] font-black border border-black px-2 py-0.5 uppercase">{a}</span>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] italic">None declared</p>
              )}
            </section>

            <section className="segment">
              <h3 className="text-[10px] tracking-widest font-black border-b border-black mb-2 uppercase">PASS CRITERIA</h3>
              <div className="text-[11px] font-bold leading-tight uppercase">
                {item.passCriteria ? (
                  <div className="space-y-0.5">
                    {item.passCriteria.map((s, i) => (
                      <div key={i} className="flex gap-1">
                        <span>•</span>
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  item.pass || "Not defined"
                )}
              </div>
            </section>
          </div>
        </div>
        <Footer layer="GALYONS 6×6" />
      </div>

      {/* PAGE 2: FELLINI LAYER */}
      {item.fellini && (
        <div className="print-root print-page page a4 bg-white text-black font-mono print-section-a4 break-after-page flex flex-col p-12">
          <Header title="FELLINI LIVE CONTROL" />
          <div className="flex-1 segment">
            <div className="grid grid-cols-3 gap-8 mb-8">
              <div className="col-span-2">
                <div className="text-[9px] font-bold tracking-[0.3em] text-[#6b7280] mb-1 uppercase">IDENTITY</div>
                <p className="text-[18px] font-black uppercase italic">"{item.fellini.identity}"</p>
              </div>
              {item.fellini.recoveryMove && (
                <div className="border-l-2 border-[#C84B31] pl-4">
                  <div className="text-[9px] font-bold tracking-[0.3em] text-[#C84B31] mb-1 uppercase">RECOVERY MOVE</div>
                  <p className="text-[14px] font-black uppercase text-[#C84B31]">{item.fellini.recoveryMove}</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div className="space-y-6">
                {item.fellini.pressurePoint && (
                  <section>
                    <div className="text-[10px] font-bold tracking-[0.3em] text-[#6b7280] mb-2 uppercase border-b border-black">PRESSURE POINT</div>
                    <p className="text-[13px] font-bold uppercase leading-tight">{item.fellini.pressurePoint}</p>
                  </section>
                )}
                {item.fellini.watchPoint && (
                  <section>
                    <div className="text-[10px] font-bold tracking-[0.3em] text-[#6b7280] mb-2 uppercase border-b border-black">WATCH POINT</div>
                    <p className="text-[13px] font-bold uppercase leading-tight">{item.fellini.watchPoint}</p>
                  </section>
                )}
                {item.fellini.stabiliserHydrationLaw && (
                  <section>
                    <div className="text-[10px] font-bold tracking-[0.3em] text-[#6b7280] mb-2 uppercase border-b border-black">HYDRATION LAW</div>
                    <p className="text-[13px] font-bold uppercase leading-tight italic">{item.fellini.stabiliserHydrationLaw}</p>
                  </section>
                )}
              </div>
              <div className="space-y-6">
                {item.fellini.passSignal && (
                  <section>
                    <div className="text-[10px] font-bold tracking-[0.3em] text-[#6b7280] mb-2 uppercase border-b border-black">PASS SIGNAL (VISUAL)</div>
                    <p className="text-[13px] font-bold uppercase leading-tight text-green-700">{item.fellini.passSignal}</p>
                  </section>
                )}
                {item.fellini.failureSignal && (
                  <section>
                    <div className="text-[10px] font-bold tracking-[0.3em] text-[#6b7280] mb-2 uppercase border-b border-black">FAILURE SIGNAL (REJECT)</div>
                    <p className="text-[13px] font-bold uppercase leading-tight text-red-700">{item.fellini.failureSignal}</p>
                  </section>
                )}
              </div>
            </div>

            <div className="mt-10 p-6 border-4 border-black bg-gray-50">
              <div className="text-[10px] font-black tracking-widest mb-2 uppercase">CONTROL LAW</div>
              <p className="text-[16px] font-black uppercase leading-tight">{item.fellini.controlLaw || "---"}</p>
            </div>

            {item.fellini.validationPoints && (
              <div className="mt-8 grid grid-cols-3 gap-4">
                {Object.entries(item.fellini.validationPoints).map(([key, value]) => (
                  <section key={key} className="border border-black p-3 bg-white">
                    <div className="text-[8px] font-bold tracking-widest text-[#6b7280] mb-1 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <p className="text-[11px] font-bold uppercase leading-tight">{value as string}</p>
                  </section>
                ))}
              </div>
            )}

            {item.fellini.autoReject && (
              <div className="mt-8 p-4 border-2 border-red-600 bg-red-50">
                <div className="text-[10px] font-black tracking-widest mb-2 uppercase text-red-600">AUTO REJECT PROTOCOL</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                  {item.fellini.autoReject.map((r, i) => (
                    <div key={i} className="text-[11px] font-black uppercase flex gap-2">
                       <span>❌</span> {r}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item.fellini.criticalAdditions && (
              <div className="mt-8 p-4 border-2 border-emerald-600 bg-emerald-50">
                <div className="text-[10px] font-black tracking-widest mb-2 uppercase text-emerald-600">CRITICAL ADDITIONS</div>
                <div className="space-y-1">
                  {item.fellini.criticalAdditions.map((a, i) => (
                    <div key={i} className="text-[11px] font-bold uppercase flex gap-2">
                       <span>▶</span> {a}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Footer layer="FELLINI CONTROL" />
        </div>
      )}

      {/* PAGE 3: LAROUSSE LAYER */}
      {item.larousse && (
        <div className="print-root print-page page a4 bg-white text-black font-mono print-section-a4 flex flex-col">
          <Header title="LAROUSSE LAYER" />
          <div className="flex-1">
            <div className="mb-12">
              <h3 className="text-[10px] tracking-widest font-black mb-2 uppercase text-[#6b7280]">PRINCIPLE</h3>
              <p className="text-[20px] font-black italic leading-tight">"{item.larousse.principle}"</p>
            </div>

            <div className="grid grid-cols-2 gap-12 overflow-hidden">
              <div className="space-y-8">
                <section className="segment">
                  <h4 className="text-[9px] font-bold tracking-[0.3em] text-[#6b7280] mb-2 uppercase border-b border-black pb-1">METHOD</h4>
                  <ul className="text-[13px] space-y-2 uppercase font-bold leading-tight">
                    {item.larousse.method?.map((x: string) => <li key={x}>• {x}</li>)}
                  </ul>
                </section>
                <section className="segment">
                  <h4 className="text-[9px] font-bold tracking-[0.3em] text-[#6b7280] mb-2 uppercase border-b border-black pb-1">QUALITY SIGNALS</h4>
                  <ul className="text-[13px] space-y-1 uppercase font-bold leading-tight">
                    {item.larousse.quality?.map((x: string) => <li key={x}>• {x}</li>)}
                  </ul>
                </section>
              </div>
              <div className="space-y-8">
                <section className="segment">
                  <h4 className="text-[9px] font-bold tracking-[0.3em] text-[#C84B31] mb-2 uppercase border-b border-black pb-1">FAULTS (REJECT)</h4>
                  <ul className="text-[13px] space-y-1 uppercase font-black text-[#C84B31] leading-tight">
                    {item.larousse.faults?.map((x: string) => <li key={x}>❌ {x}</li>)}
                  </ul>
                </section>
                <section className="segment">
                  <h4 className="text-[9px] font-bold tracking-[0.3em] text-blue-600 mb-2 uppercase border-b border-black pb-1">CORRECTION</h4>
                  <ul className="text-[13px] space-y-1 uppercase font-bold text-blue-600 leading-tight">
                    {item.larousse.correction?.map((x: string) => <li key={x}>🛠 {x}</li>)}
                  </ul>
                </section>
              </div>
            </div>
          </div>
          <Footer layer="LAROUSSE LAYER" />
        </div>
      )}
    </>
  );
};

export const PrintPackDocument: React.FC<{ items: DishItem[]; engineLabel: string }> = ({ items, engineLabel }) => {
  return (
    <div className="print-root">
      <div className="print-page page a4 bg-white flex flex-col items-center justify-center text-center p-20 border-[20px] border-black print-section-pack-header segment">
        <div className="text-[14px] tracking-[1em] font-black mb-12 uppercase">FORGE PRINT PACK</div>
        <h1 className="text-7xl font-black tracking-tighter mb-4 uppercase">{engineLabel}</h1>
        <div className="w-32 h-2 bg-black mb-12"></div>
        <div className="text-[18px] font-bold tracking-widest mb-2 uppercase">Galyons 6×6 — Unit Specification Pack</div>
        <div className="text-[12px] tracking-[0.4em] text-[#6b7280] uppercase">Total Items: {items.length}</div>
        
        <div className="mt-24 text-[10px] tracking-widest font-mono text-[#9ca3af]">
          {new Date().toLocaleDateString()} · SYSTEM VERSION 2.5.2a
        </div>
      </div>

      {items.map((item) => (
        <UnitSpecificationPrint key={item.id} item={item} />
      ))}
    </div>
  );
};

export const ExecutionCardPrint: React.FC<PrintProps> = ({ item }) => {
  return (
    <div className="print-root print-page page a5 bg-white p-8 text-black font-mono border-2 border-black print-section-a5">
      <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-6 segment">
        <div>
          <div className="text-[10px] tracking-[0.5em] font-bold text-[#6b7280] mb-1 uppercase">FORGE · A5 EXECUTION CARD</div>
          <h1 className="text-3xl font-black tracking-tighter uppercase">{item.name}</h1>
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-widest font-bold uppercase">TIME LAW</div>
          <div className="text-2xl font-black text-[#C84B31]">{item.executionCard?.timeLaw || "≤60s (STD)"}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <section>
            <h3 className="text-[10px] tracking-widest font-black border-b-2 border-black mb-2 uppercase">FRONT: SETUP & BUILD</h3>
            <div className="space-y-4">
              <div>
                <div className="text-[8px] font-bold text-[#6b7280] uppercase tracking-tighter mb-1">Setup (≤5 min)</div>
                <div className="text-[11px] font-bold leading-tight uppercase space-y-1">
                  {item.executionCard?.setup?.length 
                    ? item.executionCard.setup.map((s, i) => <div key={i}>• {s}</div>)
                    : item.mep6x6?.holding 
                      ? <div>• {item.mep6x6.holding}</div>
                      : <div className="text-gray-300 italic">PREP AS PER SPEC</div>
                  }
                </div>
              </div>
              <div>
                <div className="text-[8px] font-bold text-[#6b7280] uppercase tracking-tighter mb-1">Build Sequence</div>
                <div className="text-[11px] font-black leading-tight uppercase space-y-1">
                  {item.executionCard?.build?.length
                    ? item.executionCard.build.map((s, i) => <div key={i}>{s}</div>)
                    : item.larousse?.method?.length
                      ? item.larousse.method.map((s, i) => <div key={i}>{s}</div>)
                      : <div className="text-gray-300 italic">FOLLOW SYSTEM BUILD</div>
                  }
                  {(item.executionCard?.buildSignal || item.fellini?.passSignal) && (
                    <div className="text-[#C84B31] italic text-[9px] mt-2">
                      SIGNAL: {item.executionCard?.buildSignal || item.fellini?.passSignal}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6 bg-[#f8f9fa] p-4 border-l-2 border-black">
          <section>
            <h3 className="text-[10px] tracking-widest font-black border-b-2 border-black mb-2 uppercase text-[#C84B31]">BACK: FAILURE & RESET</h3>
            <div className="space-y-4">
              <div>
                <div className="text-[8px] font-bold text-[#C84B31] uppercase tracking-tighter mb-1">Non-Negotiable Failures</div>
                <div className="text-[10px] font-black leading-tight uppercase text-[#C84B31] space-y-1">
                  {item.executionCard?.failures?.length
                    ? item.executionCard.failures.map((s, i) => <div key={i}>❌ {s}</div>)
                    : item.larousse?.faults?.length
                      ? item.larousse.faults.map((s, i) => <div key={i}>❌ {s}</div>)
                      : <div className="text-[#C84B31] italic">❌ QUALITY DEFECT</div>
                  }
                </div>
              </div>
              <div className="pt-2 border-t border-black/10">
                <div className="text-[8px] font-bold text-[#6b7280] uppercase tracking-tighter mb-1">Reset Trigger</div>
                <div className="text-[10px] font-bold leading-tight uppercase space-y-1">
                  {item.executionCard?.reset?.length
                    ? item.executionCard.reset.map((s, i) => <div key={i}>↺ {s}</div>)
                    : item.fellini?.recoveryMove ? <div>↺ {item.fellini.recoveryMove}</div> : <div className="text-gray-300 italic">↺ CONTACT CHEF</div>
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-12 flex justify-between text-[7px] text-[#9ca3af] tracking-widest uppercase">
        <span>FORGE VOLUME 2 · {item.station} STATION</span>
        <span>SYSTEMS LOCK v2.5.2a</span>
      </div>
    </div>
  );
};

export const WeaponSystemPack: React.FC<{ items: DishItem[]; engineLabel: string }> = ({ items, engineLabel }) => {
  return (
    <div className="print-root">
      {/* Cover Page */}
      <div className="print-page page a4 bg-black flex flex-col items-center justify-center text-center p-20 border-[20px] border-[#D46E8D] segment">
        <div className="text-[10px] tracking-[1.2em] font-black mb-8 uppercase text-[#D46E8D]/80">OPERATION FELLINI</div>
        <h1 className="text-8xl font-black text-white uppercase tracking-tighter mb-2">WEAPON</h1>
        <div className="text-[24px] font-bold tracking-[0.5em] mb-4 uppercase text-[#D46E8D]">DESSERT SYSTEM PACK</div>
        <div className="text-[14px] tracking-[0.3em] text-[#6b7280] uppercase mb-12">
          Combined A4 Spec Pages + A5 Execution Cards
        </div>
        
        <div className="mt-auto text-[12px] tracking-widest font-mono font-bold text-white">
          {new Date().toLocaleDateString()} · VERSION 2.5.2a · MASTER LOCK
        </div>
      </div>

      {items.map((item) => (
        <React.Fragment key={item.id}>
          {/* A4 Section Header */}
          <div className="print-page page a4 bg-[#D46E8D] flex flex-col items-center justify-center text-center p-20">
            <h1 className="text-8xl font-black text-white uppercase tracking-tighter mb-4">{item.name}</h1>
            <div className="text-white/80 text-[18px] tracking-[0.5em] uppercase border-y border-white/30 py-4">A4 Spec + A5 Card</div>
          </div>
          
          {/* A4 Spec Page */}
          <UnitSpecificationPrint item={item} />
          
          {/* A5 Execution Card */}
          <div className="print-page page a5 bg-white p-12">
            <ExecutionCardPrint item={item} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export const FullSystemPackDocument: React.FC<{ engines: Record<string, Engine> }> = ({ engines }) => {
  return (
    <div className="print-root">
      {/* Cover Page */}
      <div className="print-page page a4 bg-white flex flex-col items-center justify-center text-center p-20 border-[30px] border-black segment">
        <div className="text-[16px] tracking-[1.2em] font-black mb-16 uppercase">FORGE DOCTRINE</div>
        <h1 className="text-8xl font-black tracking-tighter mb-6 uppercase leading-none">FULL SYSTEM PACK</h1>
        <div className="w-48 h-3 bg-black mb-16 mt-8"></div>
        <div className="text-[24px] font-bold tracking-[0.5em] mb-4 uppercase">GALYONS 6×6</div>
        <div className="text-[14px] tracking-[0.3em] text-[#6b7280] uppercase mb-24">
          Complete Operational Specification & Live Control Layer
        </div>
        
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-left w-full max-w-md mx-auto border-t-2 border-black pt-12">
          {(Object.entries(engines) as [string, Engine][]).map(([key, eng]) => (
            <div key={key} className="flex justify-between items-center border-b border-[#e5e7eb] pb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest">{eng.label}</span>
              <span className="text-[12px] font-mono">{eng.items.length}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto text-[12px] tracking-widest font-mono font-bold">
          {new Date().toLocaleDateString()} · VERSION 2.5.2a · ZERO POINT LOCK
        </div>
      </div>

      {/* Index Page */}
      <div className="print-page page a4 bg-white p-20 text-black font-mono">
        <div className="border-b-4 border-black pb-4 mb-12">
          <h2 className="text-4xl font-black uppercase tracking-tighter">SYSTEM INDEX</h2>
        </div>
        
        <div className="space-y-10">
          {(Object.entries(engines) as [string, Engine][]).map(([key, eng]) => (
            <div key={key}>
              <h3 className="text-[14px] font-black tracking-[0.3em] uppercase mb-4 border-b-2 border-black inline-block">
                {eng.label}
              </h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-2">
                {eng.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-baseline border-b border-dotted border-gray-300 pb-1">
                    <span className="text-[12px] uppercase font-bold">{item.name}</span>
                    <span className="text-[10px] text-gray-500 italic">{item.station}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Items */}
      {(Object.values(engines) as Engine[]).map((eng) => (
        <React.Fragment key={eng.label}>
          {/* Engine Divider Page */}
          <div className="print-page page a4 bg-white flex flex-col items-center justify-center text-center p-20 border-[15px] border-black">
            <div className="text-[12px] tracking-[0.8em] font-bold mb-8 uppercase text-gray-500">SECTION</div>
            <h1 className="text-6xl font-black tracking-tighter mb-4 uppercase">{eng.label}</h1>
            <div className="w-24 h-1.5 bg-black"></div>
          </div>
          
          {eng.items.map((item: any) => (
            <UnitSpecificationPrint key={item.id} item={item} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
