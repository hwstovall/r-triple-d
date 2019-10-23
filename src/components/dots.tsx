import * as React from 'react';

import { useContextRequired } from '../types/utilities/react';
import { ValuesContext } from '../contexts/values-context';
import { ScaleContext } from '../contexts/scale-context';
import { LayoutContext } from '../contexts/layout-context';

export const Dots = () => {
  const { innerDimensions, margins, yAxisWidth } = useContextRequired(LayoutContext);
  const { data } = useContextRequired(ValuesContext);
  const { xScale, yScale, xScalePercent, yScalePercent } = useContextRequired(ScaleContext);

  return (
    <svg
      width={innerDimensions.width - margins.left - margins.right - yAxisWidth}
      height={innerDimensions.height - margins.top - margins.bottom}
      x={margins.left + yAxisWidth}
      y={margins.top}
    >
      <g className="data-points">
        {data.map((datum, i) => (
          <circle
            className="data-point"
            key={`data-point-${datum}-${i}`}
            cx={`${xScalePercent(i)}%`}
            cy={`${yScalePercent(datum)}%`}
            r={2}
          />
        ))}
      </g>
    </svg>
  );
};
