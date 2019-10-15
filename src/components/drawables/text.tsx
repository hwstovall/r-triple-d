import * as React from "react";

import { DrawableValues, Drawable, DrawableComponent } from "./drawable";

interface TextValues extends DrawableValues {
  readonly text: string;
  readonly x: number;
  readonly y: number;
  readonly maxWidth?: number;
  readonly font?: string;
}

class TextDrawable extends Drawable<TextValues> {
  public draw(ctx: CanvasRenderingContext2D) {
    const { text, x, y, maxWidth, font } = this.values;

    ctx.font = font;

    this.setContextValues(ctx);
    ctx.fillText(text, x, y, maxWidth);
    ctx.strokeText(text, x, y, maxWidth);
  }
}

export function Text(props: TextValues) {
  const drawable = React.useRef(new TextDrawable(props));
  React.useEffect(() => drawable.current.update(props), [props]);

  return <DrawableComponent drawable={drawable.current} />;
}
