import * as React from 'react';

import { Canvas } from '../components/canvas';
import { Arc } from '../components/drawables/arc';
import { sum } from 'd3';

interface PieChartProps {
  readonly data: ReadonlyArray<number>;
  readonly colors: ReadonlyArray<string>;
}

export function PieChart({ data, colors }: PieChartProps) {
  const total = sum(data);
  const adjusted = data.map((d) => d / total);

  let start = 0;

  return (
    <div>
      <Canvas>
        {adjusted.map((d, i) => (
          <Arc
            key={`arc-${i}`}
            x={75}
            y={75}
            radius={75}
            startAngle={start}
            endAngle={start += (2 * d * Math.PI)}
            fillStyle={colors[i % colors.length]}
          />
        ))}
      </Canvas>
    </div>
  );
}