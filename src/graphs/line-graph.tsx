import * as React from 'react';

import { YAxis } from '../components/y-axis';
import { XAxis } from '../components/x-axis';
import { ValuesContext } from '../contexts/values-context';
import { Dots } from '../components/dots';
import { Line } from '../components/line';
import { SVG } from '../components/svg';

interface LineChartProps {
  readonly labels: ReadonlyArray<string>;
  readonly data: ReadonlyArray<number>;
}

export const LineChart = ({ labels, data }: LineChartProps) => {
  const margins = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };

  return (
    <ValuesContext.Provider value={{ labels, data }}>
      <SVG margins={margins}>
        <Dots />
        <Line />

        <YAxis maxTicks={8} />
        <XAxis />
      </SVG>
    </ValuesContext.Provider>
  );
};
