
export interface CostItem {
  price: number;
  unit: "kg" | "L" | "each";
}

export const costMap: Record<string, CostItem> = {
  "WHOLE MILK": { price: 1.10, unit: "L" },
  "DOUBLE CREAM": { price: 2.80, unit: "L" },
  "HEAVY CREAM": { price: 2.80, unit: "L" },
  "EGG YOLKS": { price: 6.00, unit: "kg" }, 
  "SUCROSE": { price: 1.20, unit: "kg" },
  "DEXTROSE": { price: 2.00, unit: "kg" },
  "GLUCOSE SYRUP": { price: 2.50, unit: "kg" },
  "SKIM MILK POWDER": { price: 3.00, unit: "kg" },
  "70% DARK CHOCOLATE": { price: 8.50, unit: "kg" },
  "COCOA POWDER": { price: 6.00, unit: "kg" },
  "PISTACHIO PASTE": { price: 18.00, unit: "kg" },
  "STRAWBERRIES": { price: 3.00, unit: "kg" },
  "LEMON JUICE": { price: 2.00, unit: "L" },
  "MASCARPONE": { price: 4.50, unit: "kg" },
  "SAVOIARDI": { price: 3.00, unit: "kg" },
  "SAVOIARDI / SPONGE": { price: 3.00, unit: "kg" },
  "LOCUST BEAN GUM": { price: 40.00, unit: "kg" },
  "FINE SALT": { price: 0.50, unit: "kg" },
  "VANILLA": { price: 1.20, unit: "each" },
  "INSTANT COFFEE": { price: 10.00, unit: "kg" },
  "ESPRESSO REDUCTION": { price: 8.00, unit: "kg" },
  "STRONG ESPRESSO REDUCTION": { price: 8.00, unit: "kg" },
  "ESPRESSO LIGHT SOAK": { price: 2.00, unit: "L" }
};
