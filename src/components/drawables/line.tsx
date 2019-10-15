import * as React from "react";

import { Drawable, DrawableComponent, DrawableValues } from "./drawable";

interface LineValues extends DrawableValues {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly lineWidth?: number;
}

export class LineDrawable extends Drawable<LineValues> {
  public draw(ctx: CanvasRenderingContext2D) {
    const { x1, y1, x2, y2, lineWidth, strokeStyle } = this.values;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

export function Line(props: LineValues) {
  const drawable = React.useRef(new LineDrawable(props));
  React.useEffect(() => drawable.current.update(props), [props]);

  return <DrawableComponent drawable={drawable.current} />;
}
