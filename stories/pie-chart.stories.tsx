import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { BarChart } from '../src/charts';
import { range } from '../src/utilities/range';
import { PieChart } from '../src/charts/pie-chart';


function PieChartHarness() {
  const [data, setData] = React.useState<ReadonlyArray<number>>([10, 20, 30, 40, 50]);
  const colors = [
    '#FF9AA2',
    '#FFB7B2',
    '#FFDAC1',
    '#E2F0CB',
    '#B5EAD7',
    '#C7CEEA',
  ];

  return (
    <div>
      <PieChart data={data} colors={colors} />
      <button
        onClick={() => {
          setData([
            Math.round(Math.random() * 10) + 1,
            Math.round(Math.random() * 10) + 1,
            Math.round(Math.random() * 10) + 1,
            Math.round(Math.random() * 10) + 1,
            Math.round(Math.random() * 10) + 1,
          ]);
        }}>
        Randomize Data
      </button>
    </div >
  );
}

storiesOf('Pie Chart', module)
  .add('plain', () => <PieChartHarness />);
