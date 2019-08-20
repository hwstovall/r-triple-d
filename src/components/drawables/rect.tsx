import * as React from 'react';

import { Drawable, DrawableComponent, DrawableValues } from './drawable';

interface RectValues extends DrawableValues {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}

class RectDrawable extends Drawable<RectValues> {
  protected animatedProperties = ['x', 'y', 'w', 'h'];
  protected animationDuration = 100;

  public draw(ctx: CanvasRenderingContext2D) {
    const {x, y, w, h} = this.values;

    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();

    super.draw(ctx);
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
