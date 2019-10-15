import * as React from "react";

import { DrawableComponent, Drawable, DrawableValues } from "./drawable";

interface EllipseValues extends DrawableValues {
  readonly x: number;
  readonly y: number;
  readonly radiusX: number;
  readonly radiusY: number;
  readonly rotation: number;
  readonly startAngle: number;
  readonly endAngle: number;
  readonly anticlockwise?: boolean;
}

class EllipseDrawable extends Drawable<EllipseValues> {
  public draw(ctx: CanvasRenderingContext2D) {
    const {
      x,
      y,
      radiusX,
      radiusY,
      rotation,
      startAngle,
      endAngle,
      anticlockwise
    } = this.values;

    ctx.ellipse(
      x,
      y,
      radiusX,
      radiusY,
      rotation,
      startAngle,
      endAngle,
      anticlockwise
    );

    super.draw(ctx);
  }
}

export function Ellipse(props: EllipseValues) {
  const drawable = React.useRef(new EllipseDrawable(props));
  React.useEffect(() => drawable.current.update(props), [props]);

  return <DrawableComponent drawable={drawable.current} />;
}
