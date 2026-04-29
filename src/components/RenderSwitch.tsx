import React from 'react';
import { DishItem, OperationalLayer } from '../types';
import { SpecTable } from './SpecTable';
import { ValidationStatusLayer } from './ValidationStatusLayer';

interface RenderSwitchProps {
  view: 'supply' | 'validation' | 'layer' | 'item' | 'idle';
  data: {
    item?: DishItem | null;
    layer?: OperationalLayer | null;
    engineItems?: DishItem[];
    allItems?: DishItem[];
    renderSupplyMatrix?: () => React.ReactNode;
    renderOperationalLayer?: (layer: OperationalLayer) => React.ReactNode;
    renderItemView?: (item: DishItem) => React.ReactNode;
    renderIdleView?: () => React.ReactNode;
  };
}

export const RenderSwitch: React.FC<RenderSwitchProps> = ({ view, data }) => {
  switch (view) {
    case 'supply':
      return data.renderSupplyMatrix ? <>{data.renderSupplyMatrix()}</> : <div>Supply Matrix Missing</div>;
    case 'validation':
      return <ValidationStatusLayer items={data.allItems || []} />;
    case 'layer':
      return data.layer && data.renderOperationalLayer ? <>{data.renderOperationalLayer(data.layer)}</> : <div>Layer Missing</div>;
    case 'item':
      return data.item && data.renderItemView ? <>{data.renderItemView(data.item)}</> : <div>Item Missing</div>;
    case 'idle':
    default:
      return data.renderIdleView ? <>{data.renderIdleView()}</> : <div>Idle View Missing</div>;
  }
};
