
import { costMap } from "./costMap";

const convertToKg = (grams: number) => grams / 1000;

export interface CostBreakdown {
  breakdown: Record<string, number>;
  totalCost: number;
}

export const calculateBatchCost = (stock: Record<string, { quantity: number; unit: string }>): CostBreakdown => {
  const breakdown: Record<string, number> = {};
  let total = 0;

  Object.entries(stock).forEach(([name, data]) => {
    const item = costMap[name];
    if (!item) return;

    let cost = 0;
    const qty = data.quantity;

    if (item.unit === "kg" || item.unit === "L") {
      // Assuming g maps to kg and ml maps to L basically by 1000
      cost = convertToKg(qty) * item.price;
    } else if (item.unit === "each") {
      // For items like vanilla pods or eggs, we might need more logic or just assume 1:1 if unit matches
      // In this system we often use grams for everything, but let's assume if it's 'each' we handle it.
      // If the quantity is very small (like 3g vanilla), we might actually mean pods?
      // For now, let's treat quantity as units if it's 'each'
      cost = qty * item.price;
    }

    breakdown[name] = cost;
    total += cost;
  });

  return {
    breakdown,
    totalCost: total,
  };
};

export const formatCostReport = (costData: CostBreakdown) => {
  return {
    total: `£${costData.totalCost.toFixed(2)}`,
    items: Object.entries(costData.breakdown)
      .sort((a,b) => b[1] - a[1]) // Sort by most expensive
      .map(([k, v]) => ({
        name: k,
        cost: `£${v.toFixed(2)}`
      })),
  };
};
