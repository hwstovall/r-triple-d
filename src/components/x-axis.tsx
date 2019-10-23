import * as React from 'react';

import { useContextRequired } from '../types/utilities/react';
import { LayoutContext } from '../contexts/layout-context';
import { ScaleContext } from '../contexts/scale-context';
import { ValuesContext } from '../contexts/values-context';
import { ConfigContext } from '../contexts/config-context';

export const XAxis = () => {
  const { axes } = React.useContext(ConfigContext);

  const { xScale, xScalePercent } = useContextRequired(ScaleContext);
  const { labels } = useContextRequired(ValuesContext);
  const { yAxisWidth, margins, innerDimensions } = useContextRequired(LayoutContext);

  return (
    <g className="axis x-axis" style={{ transform: `translate(0, ${innerDimensions.height}px)` }}>
      <line
        x1={margins.left + yAxisWidth + axes.y.tickLength}
        x2={innerDimensions.width}
        y1={0}
        y2={0}
        stroke="black"
      />

      <svg
        className="ticks x-ticks"
        width={innerDimensions.width - margins.left - yAxisWidth - axes.y.tickLength - 5}
        x={margins.left + yAxisWidth + axes.y.tickLength + 5}
      >
        {labels.map((label, i) => (
          <line
            key={`x-tick-${label}`}
            className="tick x-tick"
            x1={`${xScalePercent(i)}%`}
            x2={`${xScalePercent(i)}%`}
            y1={0}
            y2={axes.x.tickLength}
            stroke="black"
          />
        ))}
      </svg>

      <svg
        className="labels x-labels"
        width={innerDimensions.width - margins.left - yAxisWidth - axes.y.tickLength - 5}
        x={margins.left + yAxisWidth + axes.y.tickLength + 5}
      >
        {labels.map((label, i) => (
          <text
            key={`x-label-${label}`}
            x={`${xScalePercent(i)}%`}
            y={axes.x.tickLength + 10}
            style={{ textAnchor: 'middle', alignmentBaseline: 'middle' }}
          >
            {label}
          </text>
        ))}
      </svg>
    </g>
  );
};
