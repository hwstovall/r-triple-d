import * as React from 'react';

import { YAxis } from '../components/y-axis';
import { XAxis } from '../components/x-axis';
import { ValuesProvider } from '../contexts/values-context';
import { Dots } from '../components/dots';
import { Line } from '../components/line';
import { SVG } from '../components/svg';
import { GraphDataSet } from '../types/types';

interface LineChartProps {
  readonly labels: ReadonlyArray<string>;
  readonly datasets: ReadonlyArray<GraphDataSet>;
}

export const LineChart = ({ labels, datasets }: LineChartProps) => {
  const margins = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  return (
    <ValuesProvider labels={labels} datasets={datasets}>
      <SVG margins={margins}>
        <Dots />
        <Line />

        <YAxis maxTicks={8} />
        <XAxis />
      </SVG>
    </ValuesProvider>
  );
};
