
export interface PricingResult {
  costPerPortion: number;
  rawPrice: number;
  sellPrice: number;
  actualGP: number;
}

export const calculatePricing = ({
  costPerPortion,
  targetGP = 0.75, // 75% baseline
  rounding = 0.5
}: {
  costPerPortion: number;
  targetGP?: number;
  rounding?: number;
}): PricingResult => {
  if (costPerPortion <= 0) {
    return { costPerPortion: 0, rawPrice: 0, sellPrice: 0, actualGP: 0 };
  }
  
  const rawPrice = costPerPortion / (1 - targetGP);
  const roundedPrice = Math.ceil(rawPrice / rounding) * rounding;
  
  return {
    costPerPortion,
    rawPrice,
    sellPrice: roundedPrice,
    actualGP: 1 - (costPerPortion / roundedPrice)
  };
};

export const getPricingScenarios = (costPerPortion: number) => {
  return {
    premium: calculatePricing({ costPerPortion, targetGP: 0.93 }), // Approx £3.50 for £0.22 cost
    market: calculatePricing({ costPerPortion, targetGP: 0.91 }),  // Approx £2.50
    volume: calculatePricing({ costPerPortion, targetGP: 0.89 })   // Approx £2.00
  };
};
