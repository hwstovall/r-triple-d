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

  const { data } = useContextRequired(ValuesContext);
  const { yScale, yScalePercent } = useContextRequired(ScaleContext);
  const { yAxisWidth, setYAxisWidth, margins, innerDimensions } = useContextRequired(LayoutContext);

  const ref = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setYAxisWidth(rect.width);
  }, [ref]);

  const ticks = d3.ticks(0, d3.max(data), maxTicks);
  const maxTick = d3.max(ticks);

  return (
    <g>
      <line
        x1={margins.left + yAxisWidth + 5 + axes.y.tickLength}
        x2={margins.left + yAxisWidth + 5 + axes.y.tickLength}
        y1={0}
        y2={innerDimensions.height}
        stroke="black"
      />

      <svg
        className="ticks y-ticks"
        height={innerDimensions.height - margins.bottom + 4}
        y={margins.top - 2}
      >
        <g style={{transform: 'translate(0, 2px)'}}>
          {ticks.map((tick) => (
            <line
              key={`y-tick-${tick}`}
              className="tick y-tick"
              x1={margins.left + yAxisWidth + 5}
              x2={margins.left + yAxisWidth + 5 + axes.y.tickLength}
              y1={`${yScalePercent(tick)}%`}
              y2={`${yScalePercent(tick)}%`}
              stroke="black"
            />
          ))}
        </g>
      </svg>

      <g className="labels y-labels">
        {ticks.map((tick) => (
          <text
            key={`y-label-${tick}`}
            className="tick y-label"
            x={margins.left + yAxisWidth}
            y={yScale(tick)}
            style={{ textAnchor: 'end', alignmentBaseline: 'middle' }}
          >
            {tick > 0 ? tick : null}
          </text>
        ))}

        <g style={{ position: 'relative', left: -10000, top: -10000, opacity: 0 }} ref={ref}>
          <text className="tick y-tick-sizer">{maxTick}</text>
        </g>
      </g>
    </g>
  );
};
