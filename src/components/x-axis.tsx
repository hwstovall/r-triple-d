import * as React from 'react';

import { useContextRequired } from '../types/utilities/react';
import { LayoutContext } from '../contexts/layout-context';
import { ScaleContext } from '../contexts/scale-context';
import { ValuesContext } from '../contexts/values-context';
import { ConfigContext } from '../contexts/config-context';

export const XAxis = () => {
  const { axes } = React.useContext(ConfigContext);

  const { xScale, yScale } = useContextRequired(ScaleContext);
  const { labels } = useContextRequired(ValuesContext);
  const { yLabelDimensions, margins, innerDimensions } = useContextRequired(LayoutContext);

  return (
    <g className="axis x-axis" style={{ transform: `translate(0, ${yScale(0)}px)` }}>
      <line
        x1={margins.left + yLabelDimensions.width + axes.y.tickLength}
        x2={innerDimensions.width}
        y1={0}
        y2={0}
        stroke="black"
      />

      <g className="ticks x-ticks">
        {labels.map((label, i) => (
          <line
            key={`x-tick-${label}`}
            className="tick x-tick"
            x1={xScale(i)}
            x2={xScale(i)}
            y1={0}
            y2={axes.x.tickLength}
            stroke="black"
          />
        ))}
      </g>

      <g className="labels x-labels">
        {labels.map((label, i) => (
          <text
            key={`x-label-${label}`}
            x={xScale(i)}
            y={axes.x.tickLength + 10}
            style={{ textAnchor: 'middle', alignmentBaseline: 'middle' }}
          >
            {label}
          </text>
        ))}
      </g>
    </g>
  );
};
