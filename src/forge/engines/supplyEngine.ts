
export interface IngredientAggregation {
  name: string;
  quantity: number;
  unit: string;
}

export const formatQuantity = (quantity: number, unit: string): string => {
  if (unit === "g" && quantity >= 1000) {
    return `${(quantity / 1000).toFixed(2)}kg`;
  }
  if (unit === "ml" && quantity >= 1000) {
    return `${(quantity / 1000).toFixed(2)}L`;
  }
  return `${quantity}${unit}`;
};

export const generateIceCreamSupply = (recipes: any[]): Record<string, { quantity: number; unit: string }> => {
  const stock: Record<string, { quantity: number; unit: string }> = {};

  const add = (rawName: string, qty: number | string, unit: string) => {
    // Clean up name for aggregation
    const name = String(rawName || "").trim();
    if (!name) return;
    const cleanName = name.toUpperCase();
    let numQty = typeof qty === "string" ? parseFloat(qty) : qty;
    let targetUnit = unit || "g";

    if (isNaN(numQty)) return;

    // Handle unit normalization during aggregation
    const normalizedUnit = targetUnit ? targetUnit.toLowerCase() : "g";

    if (normalizedUnit === "kg") {
      numQty *= 1000;
      targetUnit = "g";
    } else if (normalizedUnit === "l") {
      numQty *= 1000;
      targetUnit = "ml";
    }

    if (!stock[cleanName]) {
      stock[cleanName] = { quantity: 0, unit: targetUnit };
    }
    stock[cleanName].quantity += numQty;
  };

  recipes.forEach((recipe) => {
    // Standard ingredients array
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      recipe.ingredients.forEach((i: any) => {
        if (typeof i === "string") {
          // Regex for: "100g Ingredient" or "100 ml Ingredient"
          const matchA = i.match(/^([\d.]+)\s*(g|kg|ml|l|L|units?|pods?|slices?|pcs?|g)?\s+(.+)$/i);
          // Regex for: "Ingredient - 100g" or "Ingredient — 100ml"
          const matchB = i.split(/[—–-]/);

          if (matchA) {
            add(matchA[3], matchA[1], matchA[2]);
          } else if (matchB.length > 1) {
            const name = matchB[0].trim();
            const qtyPart = matchB[1].trim();
            const qtyMatch = qtyPart.match(/^([\d.]+)\s*(g|kg|ml|l|L|units?|pods?|slices?|pcs?|g)?$/i);
            if (qtyMatch) {
              add(name, qtyMatch[1], qtyMatch[2]);
            } else {
              add(name, 0, ""); // Fallback if no qty found but name exists
            }
          }
        } else {
          add(i.name, i.twenty, i.unit);
        }
      });
    }

    // Nested components (like in Tiramisu)
    if (recipe.components && typeof recipe.components === 'object') {
      Object.values(recipe.components).forEach((block: any) => {
        if (Array.isArray(block)) {
          block.forEach((i: any) => {
            add(i.name, i.twenty, i.unit);
          });
        }
      });
    }
  });

  return stock;
};

export const getSupplierFriendlyMapping = (aggregatedStock: Record<string, { quantity: number; unit: string }>) => {
  const mapping: Record<string, string> = {
    "WHOLE MILK": "WHOLE MILK — 6 L",
    "DOUBLE CREAM": "DOUBLE CREAM — 2 L",
    "HEAVY CREAM": "HEAVY CREAM — 0.25 L",
    "EGG YOLKS": "EGG YOLKS — 700g (or ~35 yolks)",
    "SUCROSE": "SUCROSE — 2 kg",
    "DEXTROSE": "DEXTROSE — 1 kg",
    "GLUCOSE SYRUP": "GLUCOSE SYRUP — 0.5 kg",
    "SKIM MILK POWDER": "SKIM MILK POWDER — 1 kg",
    "70% DARK CHOCOLATE": "70% DARK CHOCOLATE — 0.5 kg",
    "COCOA POWDER": "COCOA POWDER — 0.1 kg",
    "PISTACHIO PASTE": "PISTACHIO PASTE — 0.25 kg",
    "STRAWBERRIES": "STRAWBERRIES — 1.5 kg",
    "LEMON JUICE": "LEMON JUICE — 0.1 L",
    "MASCARPONE": "MASCARPONE — 0.5 kg",
    "SAVOIARDI": "SAVOIARDI (SPONGE) — 0.25 kg",
    "LOCUST BEAN GUM": "LOCUST BEAN GUM — 50g",
    "FINE SALT": "FINE SALT — 50g",
    "VANILLA PODS": "VANILLA PODS — 3",
    "INSTANT COFFEE": "INSTANT COFFEE — small jar"
  };

  return Object.entries(aggregatedStock).map(([name, data]) => {
    const formattedQty = formatQuantity(data.quantity, data.unit);
      
    return {
      name,
      aggregated: formattedQty,
      supplierFormat: mapping[name] || `${name} — ${formattedQty} (Calculated)`
    };
  });
};
