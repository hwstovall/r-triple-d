import * as React from 'react';

import * as d3 from 'd3';

import { useContextRequired } from '../types/utilities/react';
import { ValuesContext } from '../contexts/values-context';
import { LayoutContext } from '../contexts/layout-context';
import { ScaleContext } from '../contexts/scale-context';
import { ConfigContext } from '../contexts/config-context';

interface XAxisProps {
  readonly maxTicks?: number;
}

export const YAxis = ({ maxTicks = 5 }: XAxisProps) => {
  const { axes } = React.useContext(ConfigContext);

  const { min, max } = useContextRequired(ValuesContext);
  const { yScale } = useContextRequired(ScaleContext);
  const { yLabelDimensions, setYLabelDimensions, margins, innerDimensions } = useContextRequired(
    LayoutContext,
  );

  const ref = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    const { width, height } = ref.current.getBoundingClientRect();
    setYLabelDimensions({ width: width + 2, height });
  }, [ref]);

  const ticks = d3.ticks(
    min,
    max,
    d3.min([Math.floor(innerDimensions.height / (yLabelDimensions.height + 30)), maxTicks]),
  );
  const maxTick = d3.max(ticks);

  return (
    <g className="axis y-axis">
      <line
        x1={margins.left + yLabelDimensions.width + 5 + axes.y.tickLength}
        x2={margins.left + yLabelDimensions.width + 5 + axes.y.tickLength}
        y1={0}
        y2={innerDimensions.height}
        stroke="black"
      />

      <g className="ticks y-ticks">
        {ticks.map((tick) => (
          <line
            key={`y-tick-${tick}`}
            className="tick y-tick"
            x1={margins.left + yLabelDimensions.width + 5}
            x2={margins.left + yLabelDimensions.width + 5 + axes.y.tickLength}
            y1={yScale(tick)}
            y2={yScale(tick)}
            stroke="black"
          />
        ))}
      </g>

      <g className="labels y-labels">
        {ticks.map((tick) => (
          <text
            key={`y-label-${tick}`}
            className="tick y-label"
            x={margins.left + yLabelDimensions.width}
            y={yScale(tick)}
            style={{ textAnchor: 'end', alignmentBaseline: 'middle' }}
          >
            {tick !== 0 ? tick : null}
          </text>
        ))}

        <g style={{ position: 'relative', left: -10000, top: -10000, opacity: 0 }} ref={ref}>
          <text className="tick y-tick-sizer">{maxTick}</text>
        </g>
      </g>
    </g>
  );
};
