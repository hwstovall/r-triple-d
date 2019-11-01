import * as React from 'react';

import * as d3 from 'd3';

import { useContextRequired } from '../types/utilities/react';
import { ScaleContext } from '../contexts/scale-context';
import { ValuesContext } from '../contexts/values-context';

export const Line = () => {
  const { datasets } = useContextRequired(ValuesContext);
  const { xScale, yScale } = useContextRequired(ScaleContext);

  const d = React.useMemo(
    () =>
      datasets.map((dataset) => {
        const line = d3
          .line<number>()
          .x((_, i) => xScale(i))
          .y((d) => yScale(d))
          .curve(d3.curveMonotoneX);

        return line(dataset.data as number[]);
      }),
    [datasets, xScale, yScale],
  );

  return (
    <g className="lines">
      {datasets.map((dataset, datasetIndex) => (
        <g className={`line line-${datasetIndex}`}>
          <path stroke="black" fill="none" strokeWidth="1px" d={d[datasetIndex]} />
        </g>
      ))}
    </g>
  );
};
