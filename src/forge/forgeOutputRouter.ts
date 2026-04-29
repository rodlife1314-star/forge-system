import { ENGINES } from '../constants';

export const getEngineByKey = (key: string) => {
  if (key === 'all') {
    const allItems = Object.values(ENGINES).flatMap(e => e.items);
    return {
      label: "MASTER BIBLE",
      color: "#FFB347",
      station: "ALL STATIONS",
      items: allItems,
      tag: "SYSTEM"
    };
  }
  return ENGINES[key] || null;
};

export const getEngineIcon = (key: string) => {
  const engine = ENGINES[key];
  return engine?.icon || "⚡";
};
