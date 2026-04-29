import React from 'react';
import { DishItem } from '../types';

interface SpecTableProps {
  item: DishItem;
}

export const SpecTable: React.FC<SpecTableProps> = ({ item }) => {
  const skip = [
    "name", "allergens", "pass", "passCriteria", "station", 
    "larousse", "fellini", "executionCard", "chefNote", 
    "failurePoints", "serviceNotes", "yieldBlock", "id", "engine", "section", "status"
  ];

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
          {value.map((val, index) => (
            <div key={index} className="text-[13px] font-mono flex items-start gap-2">
              <span className="text-text-mute shrink-0">•</span>
              <span>{renderSafeValue(val)}</span>
            </div>
          ))}
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

  return (
    <div className="grid gap-1">
      {Object.entries(item)
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
        })}
    </div>
  );
};
