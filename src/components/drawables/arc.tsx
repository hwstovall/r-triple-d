import * as React from 'react';

import { Drawable, DrawableComponent } from './drawable';

interface ArcValues {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly startAngle: number;
  readonly endAngle: number;
  readonly fillStyle: string;
}

class ArcDrawable extends Drawable<ArcValues> {
  protected animatedProperties = ['x', 'y', 'radius', 'startAngle', 'endAngle'];
  protected animationDuration = 100;

  public draw(ctx: CanvasRenderingContext2D) {
    const { x, y, radius, startAngle, endAngle } = this.values;

    ctx.beginPath();
    ctx.moveTo(x, y);

    ctx.arc(x, y, radius, startAngle, endAngle)

    ctx.closePath();

    ctx.fillStyle = this.currentValues.fillStyle;
    ctx.strokeStyle = this.currentValues.fillStyle;
    ctx.stroke();
    ctx.fill();
  }
}

export class Arc extends DrawableComponent<ArcDrawable, ArcValues> {
  public createDrawable() {
    const { x, radius, startAngle, endAngle, fillStyle } = this.props;
    return new ArcDrawable({ x, y: this.y, radius, startAngle, endAngle, fillStyle });
  }

  public udpateDrawable() {
    const { x, y, radius, startAngle, endAngle, fillStyle } = this.props;
    this.drawable.update({ x, y: this.y, radius, startAngle, endAngle, fillStyle });
  }

  private get y() {
    const { y, radius } = this.props;
    return this.context.canvasHeight - y;
  }
}