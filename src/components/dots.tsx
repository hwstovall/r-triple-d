import * as React from 'react';

import { useContextRequired } from '../types/utilities/react';
import { ValuesContext } from '../contexts/values-context';
import { ScaleContext } from '../contexts/scale-context';

export const Dots = () => {
  const { data } = useContextRequired(ValuesContext);
  const { xScale, yScale } = useContextRequired(ScaleContext);

  return (
    <g className="data-points">
      {data.map((datum, i) => (
        <circle
          className="data-point"
          key={`data-point-${datum}-${i}`}
          cx={xScale(i)}
          cy={yScale(datum)}
          r={2}
        />
      ))}
    </g>
  );
};
