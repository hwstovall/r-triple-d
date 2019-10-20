import { GraphConfig } from '../types';

export class ConfigManager {
  constructor(private readonly config: GraphConfig) {}

  public get axes() {
    const { axes } = this.config;
    if ('x' in axes && 'y' in axes) {
      return axes;
    }

    return {
      x: axes,
      y: axes,
    };
  }
}
