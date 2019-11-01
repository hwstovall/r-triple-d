import * as React from 'react';

import { useContextRequired } from '../types/utilities/react';
import { ValuesContext } from '../contexts/values-context';
import { ScaleContext } from '../contexts/scale-context';

export const Dots = () => {
  const { datasets } = useContextRequired(ValuesContext);
  const { xScale, yScale } = useContextRequired(ScaleContext);

  return (
    <g className="data-points">
      {datasets.map((dataset, datasetIndex) => (
        <g key={`dots-dataset-${datasetIndex}`} className={`dots dots-dataset-${datasetIndex}`}>
          {dataset.data.map((datum, datumIndex) => (
            <circle
              className={`dot dot-${datumIndex} dot-dataset-${datasetIndex}`}
              key={`data-point-${datum}-${datumIndex}`}
              cx={xScale(datumIndex)}
              cy={yScale(datum)}
              r={2}
            />
          ))}
        </g>
      ))}
    </g>
  );
};
