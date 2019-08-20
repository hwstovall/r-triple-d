import * as React from 'react';

import { Drawable, DrawableComponent, DrawableValues } from './drawable';

interface ArcValues extends DrawableValues {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly startAngle: number;
  readonly endAngle: number;
}

class ArcDrawable extends Drawable<ArcValues> {
  protected animatedProperties = ['x', 'y', 'radius', 'startAngle', 'endAngle'];
  protected animationDuration = 100;

  public draw(ctx: CanvasRenderingContext2D) {
    const { x, y, radius, startAngle, endAngle } = this.values;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.closePath();
    
    super.draw(ctx);
  }
}

export class Arc extends DrawableComponent<ArcDrawable, ArcValues> {
  public createDrawable() {
    return new ArcDrawable({ ...this.props, y: this.y });
  }

  public udpateDrawable() {
    this.drawable.update({ ...this.props, y: this.y });
  }

  private get y() {
    const { y } = this.props;
    return this.context.canvasHeight - y;
  }
}