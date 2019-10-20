import * as React from 'react';

import { createContextRequired } from '../types/utilities/react';
import { Margins, Dimensions } from '../types/types';

interface LayoutContextValue {
  readonly yAxisWidth: number;
  readonly margins: Margins;
  readonly dimensions: Dimensions;
  readonly innerDimensions: Dimensions;
  setYAxisWidth(width: number): void;
}

export const LayoutContext = createContextRequired<LayoutContextValue>();

interface LayoutContextProviderProps {
  readonly margins: Margins;
  readonly dimensions: Dimensions;
  readonly children: React.ReactNode;
}

export const LayoutProvider = ({ margins, dimensions, children }: LayoutContextProviderProps) => {
  const [yAxisWidth, setYAxisWidth] = React.useState<number>(0);

  const contextValue: LayoutContextValue = React.useMemo(
    () => ({
      yAxisWidth,
      margins,
      dimensions,
      setYAxisWidth,
      innerDimensions: {
        width: dimensions.width - margins.left - margins.right,
        height: dimensions.height - margins.top - margins.bottom,
      },
    }),
    [margins, dimensions],
  );

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
};
