import * as React from "react";

import { Drawable, DrawableComponent, DrawableValues } from "./drawable";

interface RectValues extends DrawableValues {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

class RectDrawable extends Drawable<RectValues> {
  protected animatedProperties = ["x", "y", "w", "h"];

  public draw(ctx: CanvasRenderingContext2D) {
    const { x, y, w, h } = this.values;

    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();

    super.draw(ctx);
  }
}

export function Rect(props: RectValues) {
  const drawable = React.useRef(new RectDrawable(props));
  React.useEffect(() => drawable.current.update(props), [props]);

  return <DrawableComponent drawable={drawable.current} />;
}
