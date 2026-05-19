import { ENGINES } from '../../constants';
import { Engine } from '../../types';

export const getEngineByKey = (key: string): Engine | null => {
  if (key === 'all') {
    const allItems = Object.values(ENGINES).flatMap((e: Engine) => e.items);
    return {
      label: "MASTER BIBLE",
      color: "#FFB347",
      station: "ALL STATIONS",
      items: allItems,
      tag: "SYSTEM"
    } as Engine;
  }
  return (ENGINES[key] as Engine) || null;
};

export const getEngineIcon = (key: string) => {
  const engine = ENGINES[key];
  return engine?.icon || "⚡";
};
