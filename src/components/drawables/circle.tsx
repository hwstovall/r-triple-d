import * as React from 'react';

import { DrawableValues } from './drawable';
import { Ellipse } from './ellipse';

interface CircleValues extends DrawableValues {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
}

export function Circle({x, y, radius, strokeStyle, fillStyle}: CircleValues) {
  return (
    <Ellipse
      x={x}
      y={y}
      radiusX={radius}
      radiusY={radius}
      rotation={0}
      startAngle={0}
      endAngle={2 * Math.PI}
      strokeStyle={strokeStyle}
      fillStyle={fillStyle}
    />
  );
}
