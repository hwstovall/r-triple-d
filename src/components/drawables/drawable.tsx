import * as React from "react";

import { CanvasContext } from "../canvas";

export interface DrawableValues {
  readonly lineCap?: CanvasLineCap;
  readonly lineJoin?: CanvasLineJoin;
  readonly lineWidth?: number;
  readonly strokeStyle?: string;
  readonly fillStyle?: string;
}

export abstract class Drawable<V extends DrawableValues = {}> {
  protected values: V;

  constructor(values: V) {
    this.values = values;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const { strokeStyle, fillStyle } = this.values;

    this.setContextValues(ctx);
    strokeStyle && ctx.stroke();
    fillStyle && ctx.fill();
  }

  protected setContextValues(ctx: CanvasRenderingContext2D) {
    const {
      lineCap,
      lineJoin,
      lineWidth,
      strokeStyle,
      fillStyle
    } = this.values;

    ctx.lineCap = lineCap;
    ctx.lineJoin = lineJoin;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
  }

  public update(values: V) {
    this.values = values;
  }
}

interface DrawableComponentProps {
  readonly drawable: Drawable;
}

export function DrawableComponent(props: DrawableComponentProps) {
  const { drawable } = props;

  const { addDrawable, removeDrawable } = React.useContext(CanvasContext);
  const symbol = React.useRef(Symbol());

  React.useEffect(() => {
    addDrawable(symbol.current, drawable);
    return () => removeDrawable(symbol.current);
  });

  return null;
}
