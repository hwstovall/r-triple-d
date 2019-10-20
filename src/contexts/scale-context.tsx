import * as React from 'react';

import * as d3 from 'd3';

import { createContextRequired, useContextRequired } from '../types/utilities/react';
import { LayoutContext } from './layout-context';
import { ValuesContext } from './values-context';
import { ConfigContext } from './config-context';

interface ScaleContextValue {
  readonly xScale: any;
  readonly yScale: any;
}

export const ScaleContext = createContextRequired<ScaleContextValue>();

interface ScaleProviderProps {
  readonly children: React.ReactNode;
}

export const ScaleProvider = ({ children }: ScaleProviderProps) => {
  const { axes } = React.useContext(ConfigContext);

  const { labels, data } = useContextRequired(ValuesContext);
  const { margins, innerDimensions, yAxisWidth } = useContextRequired(LayoutContext);

  const xScale = React.useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, labels.length])
        .range([margins.left + yAxisWidth + axes.y.tickLength + 5, innerDimensions.width]),
    [labels, innerDimensions.width, margins.left],
  );

  const yScale = React.useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, d3.max(data)])
        .range([innerDimensions.height, margins.bottom]),
    [data, innerDimensions.height, margins.bottom],
  );

  return <ScaleContext.Provider value={{ xScale, yScale }}>{children}</ScaleContext.Provider>;
};
