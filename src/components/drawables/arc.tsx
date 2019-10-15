import * as React from "react";

import { Drawable, DrawableComponent, DrawableValues } from "./drawable";
import { CanvasContext } from "../canvas";

interface ArcValues extends DrawableValues {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly startAngle: number;
  readonly endAngle: number;
}

class ArcDrawable extends Drawable<ArcValues> {
  protected animatedProperties = ["x", "y", "radius", "startAngle", "endAngle"];

  public draw(ctx: CanvasRenderingContext2D) {
    const { x, y, radius, startAngle, endAngle } = this.values;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.closePath();

    super.draw(ctx);
  }
}

export function Arc(props: ArcValues) {
  const drawable = React.useRef(new ArcDrawable({ ...props }));
  React.useEffect(() => drawable.current.update({ ...props }), [props]);

  return <DrawableComponent drawable={drawable.current} />;
}
