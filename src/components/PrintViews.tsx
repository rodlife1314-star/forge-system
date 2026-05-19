import React from 'react';
import { DishItem, Engine } from '../types';

interface PrintProps {
  item: DishItem;
}

export const OperatorPrintCard: React.FC<PrintProps> = ({ item }) => {
  const CardA = () => (
    <div className="print-root print-page page a5 bg-white text-black font-sans break-after-page print-section-a5">
      <div className="border-[1px] border-gray-200 p-8 h-[210mm] relative overflow-hidden flex flex-col">
        {/* TOP ACCENT */}
        <div className="absolute top-0 right-0 p-4">
          <div className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-300">CARD ALPHA / STATION EXECUTION</div>
        </div>

        <div className="flex justify-between items-end mb-10 border-b-[8px] border-black pb-6 mt-4">
          <div className="flex-1">
            <div className="text-[10px] tracking-[0.5em] font-black text-[#C84B31] mb-2 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#C84B31]" />
              {item.engine || "CORE ENGINE"}
            </div>
            <h1 className="text-5xl font-serif font-black tracking-tighter uppercase leading-tight italic text-black pr-8">
              {item.name}
            </h1>
          </div>
          <div className="text-right pb-1">
            <div className="text-[10px] tracking-[0.3em] font-black uppercase text-gray-500 mb-1">STATION</div>
            <div className="text-3xl font-black uppercase tracking-tight">{item.station}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8 border-b border-gray-200 pb-8">
          <div className="bg-black text-white p-4">
            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1 italic">TIME LAW</div>
            <div className="text-[18px] font-black uppercase italic tracking-tight">{item.forgev3?.timeLaw || "≤60s SYSTEM"}</div>
          </div>
          <div className="p-4 border-2 border-black flex flex-col justify-center">
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">BATCH YIELD</div>
            <div className="text-[18px] font-black uppercase italic tracking-tight">{item.forgev3?.yield || "1 UNIT"}</div>
          </div>
        </div>

        <div className="flex-1 space-y-8 overflow-hidden z-10">
          <section className="bg-gray-50 p-6 border border-gray-200 relative">
            <div className="absolute top-0 right-0 p-2 text-[8px] font-black text-gray-300 uppercase rotate-90 origin-top-right">WMM PROTOCOL</div>
            <h3 className="text-[11px] font-black tracking-[0.4em] uppercase mb-4 border-b border-gray-300 pb-1">SEQ: EXECUTION</h3>
            <div className="space-y-3">
              {(item.forgev3?.wmm || []).map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-[13px] font-bold leading-tight uppercase italic">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-0 border-2 border-black">
            <div className="p-4 border-r-2 border-black">
              <div className="text-[10px] font-black tracking-widest text-[#C84B31] uppercase mb-3">CRITICAL FAILURES</div>
              <div className="space-y-2">
                {(item.forgev3?.rejectSignals || []).map((s, i) => (
                  <div key={i} className="text-[11px] font-black leading-none uppercase flex gap-2 italic">
                    <span>❌</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-amber-50">
              <div className="text-[10px] font-black tracking-widest text-amber-700 uppercase mb-3">RECOVERY PROTOCOL</div>
              <p className="text-[11px] font-black uppercase leading-tight italic">{item.forgev3?.recoveryProtocol}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-end text-[7px] font-mono text-gray-400 uppercase tracking-[0.4em]">
          <div>PROPERTY OF GALYONS KITCHEN SYSTEMS</div>
          <div className="font-bold text-black tracking-normal">SYSTEM LOCK v3.0</div>
        </div>
      </div>
    </div>
  );

  const CardB = () => (
    <div className="print-root print-page page a5 bg-white text-black font-sans print-section-a5">
      <div className="border-[1px] border-gray-200 p-8 h-[210mm] relative overflow-hidden flex flex-col">
        <div className="absolute top-0 right-0 p-4">
          <div className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-300">CARD BRAVO / FELLINI CONTROL</div>
        </div>

        <div className="flex justify-between items-end mb-10 border-b-[8px] border-black pb-6 mt-4">
          <div className="flex-1">
            <div className="text-[10px] tracking-[0.5em] font-black text-blue-600 mb-2 uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600" />
              FELLINI LIVE
            </div>
            <h1 className="text-5xl font-serif font-black tracking-tighter uppercase leading-tight italic text-black pr-8">
              {item.name}
            </h1>
          </div>
          <div className="text-right pb-1">
            <div className="text-[10px] tracking-[0.3em] font-black uppercase text-gray-500 mb-1">STATION</div>
            <div className="text-3xl font-black uppercase tracking-tight">{item.station}</div>
          </div>
        </div>

        {item.fellini ? (
          <div className="flex-1 flex flex-col space-y-8 overflow-hidden z-10">
            <div className="bg-black text-white p-8 border-4 border-black">
              <div className="text-[11px] font-black tracking-[0.5em] mb-4 text-gray-400 uppercase border-b border-gray-800 pb-2">FELLINI LIVE IDENTITY</div>
              <p className="text-[32px] font-serif font-black italic leading-[1] uppercase text-white">"{item.fellini.identity}"</p>
            </div>

            <div className="grid grid-cols-2 gap-0 border-2 border-black">
              <div className="p-5 border-r-2 border-black">
                <div className="text-[10px] font-black tracking-widest text-[#C84B31] mb-3 uppercase">PRESSURE POINT</div>
                <p className="text-[14px] font-black leading-tight uppercase italic">{item.fellini.pressurePoint}</p>
              </div>
              <div className="p-5">
                <div className="text-[10px] font-black tracking-widest text-blue-600 mb-3 uppercase">WATCH POINT</div>
                <p className="text-[14px] font-black leading-tight uppercase italic">{item.fellini.watchPoint}</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200">
              <div className="text-[10px] font-black tracking-[0.4em] mb-3 uppercase border-b border-gray-300 pb-1">PASS SIGNALS</div>
              <div className="grid grid-cols-1 gap-2">
                {(item.forgev3?.passSignals || [item.fellini.passSignal]).map((s, i) => (
                  <div key={i} className="text-[12px] font-black leading-tight uppercase flex gap-3 italic text-green-700">
                    <span>●</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto p-6 border-[8px] border-black bg-white">
              <div className="text-[12px] font-black tracking-[0.5em] mb-2 uppercase text-center">CONTROL LAW</div>
              <p className="text-[20px] font-black uppercase tracking-tight leading-tight text-center italic">
                {item.fellini.controlLaw || "---"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center border-4 border-dashed border-gray-200">
            <div className="text-gray-300 text-[14px] font-black tracking-[0.5em] uppercase italic">NO FELLINI LAYER</div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-end text-[7px] font-mono text-gray-400 uppercase tracking-[0.4em]">
          <div>GALYONS CORE DOCTRINE · CARD B</div>
          <div className="font-bold text-black tracking-normal italic uppercase">Zero Logic Fault Zero</div>
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
  const v3 = item.forgev3;

  const Header = () => (
    <div className="flex justify-between items-end border-b-8 border-black pb-6 mb-8">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-black text-white px-3 py-1 text-[10px] font-black tracking-[0.4em] uppercase">
            {item.engine || "CORE"}
          </div>
          <div className="text-[10px] tracking-[0.5em] font-bold text-gray-400 uppercase">
            {item.id} · SPECIFICATION v3.0
          </div>
        </div>
        <h1 className="text-6xl font-serif font-black tracking-tighter uppercase leading-tight text-black italic">
          {item.name}
        </h1>
      </div>
      <div className="text-right pb-1">
        <div className="text-[10px] tracking-[0.3em] font-black uppercase text-gray-500 mb-1">STATION COMMAND</div>
        <div className="text-3xl font-black uppercase tracking-tight">{item.station}</div>
      </div>
    </div>
  );

  const Footer = () => (
    <div className="mt-auto pt-6 border-t border-gray-200 flex justify-between items-end text-[8px] font-mono text-gray-400 uppercase tracking-[0.3em]">
      <div className="space-y-1">
        <div>GALYONS CORE DOCTRINE · MASTER BIBLE ARCHIVE</div>
        <div>AUTHORIZED FOR PRODUCTION USE ONLY · v2.5.2</div>
      </div>
      <div className="text-right">
        <div>PROPERTY OF GALYONS KITCHEN SYSTEMS</div>
        <div className="font-bold text-black mt-1 tracking-normal">ISSUED: {new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );

  return (
    <>
      <div className="print-root print-page page a4 bg-white text-black font-sans print-section-a4 break-after-page flex flex-col p-[15mm] border-[1px] border-gray-100 relative">
      {/* BACKGROUND GRID FOR THE MICHELIN LOOK */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <Header />

      <div className="grid grid-cols-12 gap-8 flex-1">
        {/* LEFT COLUMN: TECHNICAL DATA & WMM */}
        <div className="col-span-8 space-y-8">
          {/* ROOT LAYER & CONTROL LAW */}
          <div className="grid grid-cols-2 gap-6">
            <div className="border-l-4 border-black pl-4">
              <div className="text-[9px] font-black tracking-widest text-gray-400 uppercase mb-1">ROOT LAYER</div>
              <p className="text-[13px] font-medium leading-relaxed italic">{item.rootLayer}</p>
            </div>
            <div className="border-l-4 border-[#C84B31] pl-4">
              <div className="text-[9px] font-black tracking-widest text-[#C84B31] uppercase mb-1">CONTROL LAW</div>
              <p className="text-[13px] font-black leading-tight uppercase">{item.controlLaw}</p>
            </div>
          </div>

          {/* WMM - WORK METHOD MOVEMENT */}
          <section className="bg-gray-50 p-6 border border-gray-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 text-[8px] font-black text-gray-300 uppercase rotate-90 origin-top-right">WMM PROTOCOL</div>
            <h3 className="text-[11px] font-black tracking-[0.4em] uppercase mb-6 border-b border-gray-300 pb-2">WORK METHOD MOVEMENT</h3>
            <div className="space-y-6">
              {v3?.wmm.map((step, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-[12px] font-black shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-[15px] font-bold leading-tight uppercase pt-1 italic">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* PASS/REJECT SIGNALS */}
          <div className="grid grid-cols-2 gap-0 border-2 border-black">
            <div className="p-4 border-r-2 border-black">
              <div className="text-[10px] font-black tracking-widest text-green-600 uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                BINARY PASS SIGNALS
              </div>
              <ul className="space-y-3">
                {v3?.passSignals.map((s, i) => (
                  <li key={i} className="text-[12px] font-black leading-none uppercase flex gap-3 italic">
                    <span className="text-green-600">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-red-50">
              <div className="text-[10px] font-black tracking-widest text-red-600 uppercase mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                BINARY REJECT SIGNALS
              </div>
              <ul className="space-y-3">
                {v3?.rejectSignals.map((s, i) => (
                  <li key={i} className="text-[12px] font-black leading-none uppercase flex gap-3 italic decoration-red-200">
                    <span className="text-red-600">❌</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RECOVERY, SAFETY & DATA */}
        <div className="col-span-4 space-y-8 border-l border-gray-200 pl-8">
          {/* YIELD & TIME LAW */}
          <div className="space-y-4">
            <div className="p-4 bg-black text-white">
              <div className="text-[8px] font-black tracking-widest text-gray-400 uppercase mb-1">TIME LAW / THERMAL TARGET</div>
              <div className="text-[16px] font-black leading-none italic">{v3?.timeLaw}</div>
            </div>
            <div className="p-4 border-2 border-black">
              <div className="text-[8px] font-black tracking-widest text-gray-500 uppercase mb-1">YIELD OUTPUT</div>
              <div className="text-[18px] font-black leading-none italic uppercase">{v3?.yield}</div>
            </div>
          </div>

          {/* FAILURE LAW */}
          <section>
            <h3 className="text-[10px] font-black tracking-[0.2em] border-b-2 border-black pb-1 mb-2 uppercase text-red-600">CRITICAL FAILURE LAW</h3>
            <p className="text-[12px] font-black leading-tight uppercase italic">{v3?.failureLaw}</p>
          </section>

          {/* RECOVERY PROTOCOL */}
          <section className="p-4 border border-blue-200 bg-blue-50">
            <h3 className="text-[10px] font-black tracking-[0.2em] mb-2 uppercase text-blue-700 underline">RECOVERY PROTOCOL</h3>
            <p className="text-[12px] font-bold leading-tight uppercase italic">{v3?.recoveryProtocol}</p>
          </section>

          {/* INGREDIENTS LIST */}
          <section>
            <h3 className="text-[10px] font-black tracking-[0.2em] border-b border-gray-300 pb-1 mb-3 uppercase text-gray-400">COMPONENT WEIGHTS</h3>
            <ul className="space-y-1">
              {(item.ingredients || []).map((ing, i) => {
                const ingStr = typeof ing === 'string' ? ing : String(ing || '');
                const parts = ingStr.includes(' — ') ? ingStr.split(' — ') : [ingStr, ''];
                return (
                  <li key={i} className="text-[11px] font-bold border-b border-gray-100 pb-1 flex justify-between uppercase">
                    <span>{parts[0]}</span>
                    <span className="text-gray-300">{parts[1] || ''}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ALLERGENS */}
          <section>
            <h3 className="text-[10px] font-black tracking-[0.2em] border-b border-gray-300 pb-1 mb-2 uppercase text-gray-400">ALLERGENS</h3>
            <div className="flex flex-wrap gap-1">
              {item.allergens?.map(a => (
                <span key={a} className="text-[10px] font-black border border-black px-1.5 py-0.5 uppercase mb-1">{a}</span>
              ))}
            </div>
          </section>

          {/* MEMORY TAG & JEMMA MAPPING */}
          <div className="mt-auto pt-4 space-y-4">
            <div className="border-t border-dashed border-gray-300 pt-4">
              <div className="text-[8px] font-black text-gray-400 uppercase mb-1">JEMMA ERROR MAPPING</div>
              <div className="flex flex-wrap gap-1">
                {v3?.jemmaMapping.map(m => (
                  <span key={m} className="bg-red-600 text-white px-2 py-0.5 text-[8px] font-black uppercase">{m}</span>
                ))}
              </div>
            </div>
            <div className="bg-amber-100 p-3 flex items-center justify-between">
              <div className="text-[8px] font-black text-amber-700 uppercase">MEMORY TAG</div>
              <div className="text-[11px] font-black text-amber-900 uppercase">#{v3?.memoryTag}</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>

    {/* PAGE 2: FELLINI LAYER */}
      {item.fellini && (
        <div className="print-root print-page page a4 bg-white text-black font-sans print-section-a4 break-after-page flex flex-col p-[15mm] border-[1px] border-gray-100 relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <Header />
          
          <div className="flex-1 z-10">
            <div className="grid grid-cols-12 gap-12 mb-12">
              <div className="col-span-8">
                <div className="text-[10px] font-black tracking-[0.4em] text-gray-400 mb-3 uppercase">SYSTEM IDENTITY</div>
                <p className="text-[42px] font-serif font-black uppercase italic leading-none text-black">"{item.fellini.identity}"</p>
              </div>
              <div className="col-span-4 border-l-8 border-[#C84B31] pl-6 flex flex-col justify-center">
                <div className="text-[10px] font-black tracking-[0.4em] text-[#C84B31] mb-2 uppercase">RECOVERY MOVE</div>
                <p className="text-[20px] font-black uppercase text-black leading-tight">{item.fellini.recoveryMove}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-12 mt-12 bg-gray-50 p-8 border border-gray-200">
              <div className="space-y-10">
                {item.fellini.pressurePoint && (
                  <section>
                    <div className="text-[11px] font-black tracking-[0.3em] text-gray-500 mb-3 uppercase border-b-2 border-black">PRESSURE POINT</div>
                    <p className="text-[16px] font-bold uppercase leading-tight italic">{item.fellini.pressurePoint}</p>
                  </section>
                )}
                {item.fellini.watchPoint && (
                  <section>
                    <div className="text-[11px] font-black tracking-[0.3em] text-gray-500 mb-3 uppercase border-b-2 border-black">WATCH POINT</div>
                    <p className="text-[16px] font-bold uppercase leading-tight italic">{item.fellini.watchPoint}</p>
                  </section>
                )}
              </div>
              <div className="space-y-10">
                {item.fellini.passSignal && (
                  <section className="bg-white p-4 border-l-4 border-green-600">
                    <div className="text-[11px] font-black tracking-[0.3em] text-green-700 mb-2 uppercase">PASS SIGNAL (VISUAL)</div>
                    <p className="text-[15px] font-black uppercase leading-tight text-black">{item.fellini.passSignal}</p>
                  </section>
                )}
                {item.fellini.failureSignal && (
                  <section className="bg-white p-4 border-l-4 border-red-600">
                    <div className="text-[11px] font-black tracking-[0.3em] text-red-700 mb-2 uppercase">FAILURE SIGNAL (REJECT)</div>
                    <p className="text-[15px] font-black uppercase leading-tight text-black">{item.fellini.failureSignal}</p>
                  </section>
                )}
              </div>
            </div>

            <div className="mt-12 p-10 border-[10px] border-black relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 text-[12px] font-black tracking-[0.6em] uppercase">CONTROL LAW</div>
              <p className="text-[28px] font-black uppercase tracking-tighter leading-[0.9] text-center italic">
                {item.fellini.controlLaw || "---"}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {item.fellini.validationPoints && Object.entries(item.fellini.validationPoints).map(([key, value]) => (
                <section key={key} className="border border-gray-300 p-5 bg-white shadow-sm">
                  <div className="text-[9px] font-black tracking-widest text-gray-400 mb-2 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <p className="text-[13px] font-bold uppercase leading-tight">{value as string}</p>
                </section>
              ))}
            </div>
          </div>
          
          <Footer />
        </div>
      )}

      {/* PAGE 3: LAROUSSE LAYER */}
      {item.larousse && (
        <div className="print-root print-page page a4 bg-white text-black font-sans print-section-a4 flex flex-col p-[15mm] border-[1px] border-gray-100 relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <Header />
          
          <div className="flex-1 z-10">
            <div className="mb-16 border-l-[12px] border-black pl-8 py-4">
              <h3 className="text-[12px] tracking-[0.5em] font-black mb-4 uppercase text-gray-400">OPERATIONAL PRINCIPLE</h3>
              <p className="text-[32px] font-serif font-black italic leading-[1.1] text-black">
                "{item.larousse.principle}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-16">
              <div className="space-y-12">
                <section>
                  <h4 className="text-[11px] font-black tracking-[0.4em] text-gray-900 mb-6 border-b-2 border-black pb-2 uppercase">MASTER METHOD</h4>
                  <ul className="text-[15px] space-y-4 uppercase font-bold leading-tight italic">
                    {item.larousse.method?.map((x: string, i: number) => (
                      <li key={i} className="flex gap-4">
                        <span className="text-gray-300">[{i+1}]</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="text-[11px] font-black tracking-[0.4em] text-gray-700 mb-4 uppercase">QUALITY SIGNALS</h4>
                  <ul className="text-[14px] space-y-3 uppercase font-bold leading-tight">
                    {item.larousse.quality?.map((x: string, i: number) => (
                      <li key={i} className="flex gap-3 items-center">
                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
              <div className="space-y-12">
                <section className="p-8 border-4 border-red-600 bg-red-50 relative">
                  <div className="absolute top-0 right-0 p-3 text-[10px] font-black text-red-600 uppercase">SYSTEM REJECT</div>
                  <h4 className="text-[11px] font-black tracking-[0.4em] text-red-700 mb-6 uppercase">CRITICAL FAULTS</h4>
                  <ul className="text-[15px] space-y-4 uppercase font-black text-red-700 leading-tight italic">
                    {item.larousse.faults?.map((x: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <span>❌</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                {item.larousse.correction && (
                  <section className="p-6 border-2 border-blue-600 bg-blue-50">
                    <h4 className="text-[11px] font-black tracking-[0.4em] text-blue-800 mb-4 uppercase">CORRECTION PROTOCOL</h4>
                    <ul className="text-[14px] space-y-3 uppercase font-bold text-blue-900 leading-tight">
                      {item.larousse.correction.map((x: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <span>🛠</span>
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </div>
          </div>
          
          <Footer />
        </div>
      )}

    </>
  );
};

export const PrintPackDocument: React.FC<{ items: DishItem[]; engineLabel: string }> = ({ items, engineLabel }) => {
  return (
    <div className="print-root">
      <div className="print-page page a4 bg-white flex flex-col items-center justify-center text-center p-[40mm] border-[2px] border-black print-section-pack-header relative">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-black flex flex-col items-center justify-end pb-24 px-10">
          <div className="text-[16px] tracking-[1.5em] font-black mb-12 uppercase text-white opacity-40">GALYONS CORE</div>
          <h1 className="text-[100px] font-serif font-black tracking-tighter text-white uppercase leading-[0.8] italic">{engineLabel}</h1>
        </div>
        
        <div className="mt-[300px] flex flex-col items-center">
          <div className="w-24 h-1 bg-black mb-12"></div>
          <div className="text-[24px] font-serif font-black italic tracking-widest mb-2 uppercase">Unit Specification Pack</div>
          <div className="text-[14px] font-mono tracking-[0.5em] text-gray-400 uppercase mb-24">SYSTEM VERSION 3.0 · LOCK v2.5.2</div>
          
          <div className="grid grid-cols-3 gap-12 w-full text-left font-mono">
            <div>
              <div className="text-[10px] font-black text-gray-300 uppercase mb-2">AUTHORS</div>
              <p className="text-[11px] font-bold uppercase">KITCHEN OPS COMMAND</p>
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-300 uppercase mb-2">STATUS</div>
              <p className="text-[11px] font-bold uppercase text-green-600 tracking-widest">● LIVE PRODUCTION</p>
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-300 uppercase mb-2">TOTAL SPECS</div>
              <p className="text-[11px] font-bold uppercase">{items.length} ACTIVE ITEMS</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[40mm] text-[9px] font-mono text-gray-400 uppercase tracking-[0.4em]">
          PRIVILEGED SYSTEM ARCHIVE · NOT FOR PUBLIC RELEASE
        </div>
      </div>

      {items.map((item) => (
        <React.Fragment key={item.id}>
          <UnitSpecificationPrint item={item} />
          <OperatorPrintCard item={item} />
        </React.Fragment>
      ))}
    </div>
  );
};

export const WeaponSystemPack: React.FC<{ items: DishItem[]; engineLabel: string }> = ({ items, engineLabel }) => {
  return (
    <div className="print-root">
      {/* Cover Page */}
      <div className="print-page page a4 bg-[#000000] flex flex-col items-center justify-center text-center p-[40mm] border-[2px] border-white relative">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[#C84B31] flex flex-col items-center justify-end pb-24 px-10">
          <div className="text-[16px] tracking-[1.5em] font-black mb-12 uppercase text-white opacity-40">STRIKE ENGINE</div>
          <h1 className="text-[100px] font-serif font-black tracking-tighter text-white uppercase leading-[0.8] italic">WEAPON</h1>
        </div>
        
        <div className="mt-[300px] flex flex-col items-center text-white">
          <div className="w-24 h-1 bg-white mb-12"></div>
          <div className="text-[24px] font-serif font-black italic tracking-widest mb-2 uppercase">{engineLabel} SYSTEM PACK</div>
          <div className="text-[14px] font-mono tracking-[0.5em] text-gray-500 uppercase mb-24">WEAPONIZED SPECIFICATION · V3.0</div>
          
          <div className="grid grid-cols-2 gap-12 w-full text-left font-mono">
            <div>
              <div className="text-[10px] font-black text-gray-500 uppercase mb-2">CLASSIFICATION</div>
              <p className="text-[11px] font-bold uppercase text-[#C84B31]">RESTRICTED OPERATIONAL</p>
            </div>
            <div>
              <div className="text-[10px] font-black text-gray-500 uppercase mb-2">SYSTEM COUNT</div>
              <p className="text-[11px] font-bold uppercase">{items.length} DEPLOYED UNITS</p>
            </div>
          </div>
        </div>
      </div>

      {items.map((item) => (
        <React.Fragment key={item.id}>
          {/* A4 Section Header */}
          <div className="print-page page a4 bg-black flex flex-col items-center justify-center text-center p-20 border-[20px] border-[#C84B31]">
             <div className="text-[14px] tracking-[1em] font-black mb-12 uppercase text-gray-500">INITIATING PROTOCOL</div>
            <h1 className="text-[80px] font-serif font-black text-white italic uppercase tracking-tighter leading-none mb-4">{item.name}</h1>
            <div className="text-white/80 text-[14px] tracking-[0.5em] uppercase border-y border-white/30 py-4 mt-8 font-mono">
              SPECIFICATION ALPHA + EXECUTION BRAVO
            </div>
          </div>
          
          <UnitSpecificationPrint item={item} />
          <OperatorPrintCard item={item} />
        </React.Fragment>
      ))}
    </div>
  );
};

export const ExecutionCardPrint: React.FC<PrintProps> = ({ item }) => {
  return (
    <div className="print-root print-page page a5 bg-white p-8 text-black font-sans border border-gray-100 print-section-a5 relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
      
      <div className="relative z-10">
        <div className="flex justify-between items-end border-b-[6px] border-black pb-4 mb-8">
          <div>
            <div className="text-[9px] tracking-[0.4em] font-black text-gray-400 mb-1 uppercase">HYBRID EXECUTION CARD</div>
            <h1 className="text-3xl font-serif font-black tracking-tighter uppercase italic">{item.name}</h1>
          </div>
          <div className="text-right">
            <div className="text-[8px] tracking-widest font-black uppercase text-[#C84B31]">THERMAL LAW</div>
            <div className="text-xl font-black text-[#C84B31] italic uppercase">
              {typeof item.forgev3?.timeLaw === 'string' ? item.forgev3.timeLaw.split('|')[0] : "STD"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h3 className="text-[10px] tracking-[0.3em] font-black border-b-2 border-black mb-3 uppercase">FRONT: WMM</h3>
              <div className="space-y-2">
                {(item.forgev3?.wmm || item.larousse?.method || []).slice(0, 5).map((s, i) => (
                  <div key={i} className="text-[11px] font-bold uppercase leading-tight italic flex gap-3">
                    <span className="text-gray-300">[{i + 1}]</span>
                    {s}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6 bg-red-50 p-4 border-l-4 border-red-600">
            <section>
              <h3 className="text-[10px] tracking-[0.3em] font-black border-b border-red-400 mb-3 uppercase text-red-700">REJECT & RESET</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  {(item.forgev3?.rejectSignals || item.larousse?.faults || []).slice(0, 3).map((s, i) => (
                    <div key={i} className="text-[10px] font-black leading-tight uppercase text-red-600 flex gap-2">
                      <span>❌</span> {s}
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-red-200">
                  <div className="text-[8px] font-black text-red-400 uppercase mb-1">RECOVERY</div>
                  <div className="text-[10px] font-bold leading-tight uppercase italic text-red-800">
                    {item.forgev3?.recoveryProtocol || item.fellini?.recoveryMove || "REPORT FAULT"}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-12 flex justify-between text-[7px] text-gray-400 tracking-[0.4em] uppercase font-mono">
          <div>FORGE COMMAND · {item.station} STATION</div>
          <div>LOCK ARCHIVE 3.0</div>
        </div>
      </div>
    </div>
  );
};

export const FullSystemPackDocument: React.FC<{ engines: Record<string, Engine> }> = ({ engines }) => {
  return (
    <div className="print-root">
      {/* Cover Page */}
      <div className="print-page page a4 bg-[#000000] flex flex-col items-center justify-center text-center p-[40mm] border-[2px] border-white relative">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-white flex flex-col items-center justify-end pb-24 px-10">
          <div className="text-[16px] tracking-[1.5em] font-black mb-12 uppercase text-black opacity-40">GALYONS CORE</div>
          <h1 className="text-[100px] font-serif font-black tracking-tighter text-black uppercase leading-[0.8] italic">MASTER BIBLE</h1>
        </div>
        
        <div className="mt-[300px] flex flex-col items-center text-white">
          <div className="w-24 h-1 bg-white mb-12"></div>
          <div className="text-[24px] font-serif font-black italic tracking-widest mb-2 uppercase">Full System Doctrine Pack</div>
          <div className="text-[14px] font-mono tracking-[0.5em] text-gray-500 uppercase mb-24">COMPLETE OPERATIONAL ARCHIVE · V3.0</div>
          
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 w-full text-left font-mono">
             {(Object.entries(engines) as [string, Engine][]).map(([key, eng]) => (
              <div key={key} className="flex justify-between items-center border-b border-gray-800 pb-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{eng.label}</span>
                <span className="text-[11px] font-black">{eng.items.length}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-[40mm] text-[9px] font-mono text-gray-500 uppercase tracking-[0.6em]">
          PROPRIETARY OPERATING SYSTEM · v2.5.2a
        </div>
      </div>

      {/* Index Page */}
      <div className="print-page page a4 bg-white p-[25mm] text-black font-sans border-[1px] border-gray-100 relative">
        <div className="flex justify-between items-end border-b-8 border-black pb-6 mb-12">
          <div>
            <div className="text-[10px] tracking-[0.5em] font-black text-gray-400 mb-2 uppercase">SYSTEM CORE</div>
            <h2 className="text-6xl font-serif font-black uppercase tracking-tighter italic">Index</h2>
          </div>
          <div className="text-right pb-1">
            <div className="text-[10px] tracking-[0.3em] font-black uppercase text-gray-500">GALYONS 6×6</div>
          </div>
        </div>
        
        <div className="columns-2 gap-12 space-y-12">
          {(Object.entries(engines) as [string, Engine][]).map(([key, eng]) => (
            <div key={key} className="break-inside-avoid">
              <h3 className="text-[12px] font-black tracking-[0.4em] uppercase mb-4 border-b border-black inline-block">
                {eng.label}
              </h3>
              <div className="space-y-1.5">
                {eng.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-baseline border-b border-dotted border-gray-200 pb-1">
                    <span className="text-[11px] uppercase font-bold italic">{item.name}</span>
                    <span className="text-[8px] text-gray-400 font-mono italic">{item.id}</span>
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
          <div className="print-page page a4 bg-black flex flex-col items-center justify-center text-center p-20 relative">
             <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 -translate-y-1/2"></div>
             <div className="relative z-10 bg-black px-12">
                <div className="text-[14px] tracking-[1em] font-black mb-8 uppercase text-gray-500">INITIATING ENGINE</div>
                <h1 className="text-8xl font-serif font-black tracking-tighter mb-4 text-white uppercase italic">{eng.label}</h1>
                <div className="text-[10px] tracking-[0.5em] text-white opacity-40 uppercase font-mono">ESTABLISHING DOCTRINE LOCK...</div>
             </div>
          </div>
          
          {eng.items.map((item: any) => (
            <React.Fragment key={item.id}>
              <UnitSpecificationPrint item={item} />
              <OperatorPrintCard item={item} />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
