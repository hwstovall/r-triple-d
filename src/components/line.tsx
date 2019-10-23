import * as React from 'react';

import * as d3 from 'd3';

import { useContextRequired } from '../types/utilities/react';
import { ScaleContext } from '../contexts/scale-context';
import { ValuesContext } from '../contexts/values-context';
import { LayoutContext } from '../contexts/layout-context';
import { ConfigContext } from '../contexts/config-context';

export const Line = () => {
  const { axes } = useContextRequired(ConfigContext);
  const { innerDimensions, margins, yAxisWidth } = useContextRequired(LayoutContext);
  const { data } = useContextRequired(ValuesContext);
  const { xScalePercent, yScalePercent } = useContextRequired(ScaleContext);

  const d = React.useMemo(() => {
    const line = d3
      .line<number>()
      .x((_, i) => xScalePercent(i))
      .y((d) => yScalePercent(d))
      .curve(d3.curveMonotoneX);

    return line(data as number[]);
  }, [data, xScalePercent, yScalePercent]);

  return (
    <svg
      preserveAspectRatio="none"
      width={innerDimensions.width - margins.left - yAxisWidth - axes.y.tickLength - 5}
      height={innerDimensions.height - margins.top}
      x={margins.left + yAxisWidth + axes.y.tickLength + 5}
      y={margins.top}
      viewBox="0 0 100 100"
    >
      <path vectorEffect="non-scaling-stroke" stroke="black" fill="none" strokeWidth="1px" d={d} />
    </svg>
  );
};
