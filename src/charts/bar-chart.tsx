import * as React from 'react';

import { Canvas } from '../components/canvas';
import { Rect } from '../components/drawables/rect';
import { color } from 'd3';

interface BarChartProps {
  readonly data: ReadonlyArray<number>;
  readonly colors: ReadonlyArray<string>;
}

export function BarChart({ data, colors }: BarChartProps) {
  return (
    <div>
      <Canvas>
        {data.map((d, i) => (
          <Rect
            key={`rect-${i}`}
            x={i * 10}
            y={0}
            w={8}
            h={d + 10}
            fillStyle={colors[i % colors.length]}
            strokeStyle="white"
          />
        ))}
      </Canvas>
    </div>
  );
}