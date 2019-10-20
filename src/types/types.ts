export interface Margins {
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export type GraphData = ReadonlyArray<number>;

export interface Dimensions {
  readonly width: number;
  readonly height: number;
}

type AxesConfig = AxisConfig | { readonly x: AxisConfig; readonly y: AxisConfig };

interface AxisConfig {
  readonly tickLength: number;
  readonly tickThickness: number;
  readonly axisThickness: number;
}

export interface GraphConfig {
  readonly axes: AxesConfig;
}
