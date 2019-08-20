import * as React from 'react';

import { Drawable, DrawableComponent } from './drawable';

export interface RectValues {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly strokeStyle: string;
  readonly fillStyle: string;
}

export class RectDrawable extends Drawable<RectValues> {
  protected animatedProperties = ['x', 'y', 'w', 'h'];
  protected animationDuration = 100;

  public draw(ctx: CanvasRenderingContext2D) {
    const values = this.values;

    ctx.fillStyle = values.fillStyle;
    ctx.strokeStyle = values.strokeStyle;
    ctx.fillRect(values.x, values.y, values.w, values.h);
    ctx.strokeRect(values.x, values.y, values.w, values.h);
  }
}


export class Rect extends DrawableComponent<RectDrawable, RectValues> {
  public createDrawable() {
    const { x, w, h, strokeStyle, fillStyle } = this.props;
    return new RectDrawable({ x, y: this.y, w, h, strokeStyle, fillStyle });
  }

  public udpateDrawable() {
    const { x, w, h, strokeStyle, fillStyle } = this.props;
    this.drawable.update({ x, y: this.y, w, h, strokeStyle, fillStyle });
  }

  private get y() {
    const { y, h } = this.props;
    return this.context.canvasHeight - y - h;
  }
}
