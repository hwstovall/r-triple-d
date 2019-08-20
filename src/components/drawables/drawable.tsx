import * as React from 'react';

import { CanvasContext } from '../canvas';

export abstract class Drawable<Values = {}> {
  protected abstract animatedProperties: ReadonlyArray<string>;
  protected abstract animationDuration: number;

  protected updatedAt: number;
  protected prevValues: Values;
  protected currentValues: Values;

  constructor(values: Values) {
    this.updatedAt = new Date().getTime();
    this.prevValues = this.currentValues = values;
  }

  public abstract draw(ctx: CanvasRenderingContext2D): void;

  public update(values: Values) {
    this.updatedAt = new Date().getTime();

    this.prevValues = this.currentValues;
    this.currentValues = values;
  }

  protected get values(): Values {
    const now = new Date().getTime();
    const percentage = (now - this.updatedAt) / this.animationDuration;

    if (percentage > 1) {
      return this.currentValues;
    }

    const updatedValues: { [property: string]: string | number } = {};
    for (const p of this.animatedProperties) {
      updatedValues[p] = this.prevValues[p] + (this.currentValues[p] - this.prevValues[p]) * percentage;
    }

    return {...this.currentValues, ...updatedValues};
  }
}

export abstract class DrawableComponent<D extends Drawable<{}>, P = {}, S = {}> extends React.Component<P, S> {
  static contextType = CanvasContext;
  context!: React.ContextType<typeof CanvasContext>;

  private symbol: Symbol;
  protected drawable: D;

  protected abstract createDrawable(): D

  protected abstract udpateDrawable(): void

  public componentDidMount() {
    this.symbol = Symbol();
    this.drawable = this.createDrawable();

    this.context.addDrawable(this.symbol, this.drawable);
  }

  public componentWillUnmount() {
    this.context.removeDrawable(this.symbol);
  }

  public componentDidUpdate() {
    this.udpateDrawable();
  }

  public render() {
    return null;
  }
}