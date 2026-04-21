export interface Larousse {
  principle: string;
  method: string[];
  quality: string[];
  faults?: string[];
  correction?: string[];
}

export interface Fellini {
  identity: string;
  pressurePoint: string;
  watchPoint: string;
  controlLaw?: string;
  passSignal?: string;
  failureSignal?: string;
  passSignals?: string[];
  failSignals?: string[];
  autoReject?: string[];
  verdict?: string;
  validationPoint?: ("postPrep" | "preService" | "atPass")[];
  conversionAction?: string;
  recoveryMove?: string;
}

export interface MenuLayers {
  core: string;
  bulk: string;
  wet: string;
  acid: string;
  finish: string;
}

export interface SpecLayers {
  functional: string;
  control: string;
  output: string;
}

export interface ExecutionCard {
  setup: string[];
  build: string[];
  buildSequence?: string;
  buildSignal?: string;
  timeLaw: string;
  failures: string[];
  reset: string[];
}

export interface DishItem {
  name: string;
  station: string;
  allergens: string[];
  pass: string;
  portion?: string;
  price?: string;
  cost?: string;
  gp?: string;
  category?: string;
  chefNote?: string;
  failurePoints?: string[];
  executionCard?: ExecutionCard;
  cookTemp?: string;
  cookTime?: string;
  reheatMethod?: string;
  batchYield?: string;
  portionTool?: string;
  shelfLife?: string;
  passHoldLimit?: string;
  failureSigns?: string[];
  correction?: string[];
  dependencies?: string[];
  larousse?: Larousse;
  fellini?: Fellini;
  menuLayers?: MenuLayers;
  specLayers?: SpecLayers;
  mep6x6?: {
    core: string;
    sauce: string;
    texture: string;
    garnish: string;
    holding: string;
    service: string;
  };
  [key: string]: any;
}

export interface OperationalLayer {
  name: string;
  subtitle: string;
  sections: {
    title: string;
    content: string | string[];
    quote?: string;
  }[];
}

export interface Engine {
  label: string;
  icon: string;
  color: string;
  station: string;
  tag: string;
  items: DishItem[];
  operationalLayers?: OperationalLayer[];
}

export interface PrepItem {
  name: string;
  linked: string[];
}

export type JemmaMode = 'item' | 'full';
