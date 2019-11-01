import * as React from 'react';

import { createContextRequired } from '../types/utilities/react';
import { Margins, Dimensions } from '../types/types';

interface LayoutContextValue {
  readonly yLabelDimensions: Dimensions;
  readonly margins: Margins;
  readonly dimensions: Dimensions;
  readonly innerDimensions: Dimensions;
  setYLabelDimensions(dimensions: Dimensions): void;
}

export const LayoutContext = createContextRequired<LayoutContextValue>();

interface LayoutContextProviderProps {
  readonly margins: Margins;
  readonly dimensions: Dimensions;
  readonly children: React.ReactNode;
}

export const LayoutProvider = ({ margins, dimensions, children }: LayoutContextProviderProps) => {
  const [yLabelDimensions, setYLabelDimensions] = React.useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const contextValue: LayoutContextValue = React.useMemo(
    () => ({
      yLabelDimensions,
      margins,
      dimensions,
      innerDimensions: {
        width: dimensions.width - margins.left - margins.right,
        height: dimensions.height - margins.top - margins.bottom,
      },
      setYLabelDimensions,
    }),
    [margins, dimensions],
  );

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>;
};
