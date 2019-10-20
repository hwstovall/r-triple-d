import * as React from 'react';

import useResizeAware from 'react-resize-aware';

import { Margins } from '../types/types';
import { LayoutProvider } from '../contexts/layout-context';
import { ScaleProvider } from '../contexts/scale-context';

interface SVGProps {
  readonly margins: Margins;
  readonly children: React.ReactNode;
}

export const SVG = ({ margins, children }: SVGProps) => {
  const [resizeListener, sizes] = useResizeAware();

  return (
    <LayoutProvider margins={margins} dimensions={sizes}>
      <ScaleProvider>
        <div style={{ position: 'relative', height: '200px' }}>
          {resizeListener}
          <svg width={sizes.width} height={sizes.height}>
            {children}
          </svg>
        </div>
      </ScaleProvider>
    </LayoutProvider>
  );
};
