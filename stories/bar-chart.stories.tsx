import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { BarChart } from '../src/charts';
import { range } from '../src/utilities/range';

function BarChartHarness() {
  const [bars, setBars] = React.useState<ReadonlyArray<number>>(range(0, 10));
  const [trigFn, setTrigFn] = React.useState<'sin' | 'cos'>('sin');

  const data = bars.map((x) => {
    const fn = trigFn === 'sin' ? Math.sin : Math.cos;
    return Math.abs(fn(((2 * Math.PI) / 20) * x) * 100);
  });

  const colors = [
    '#0B132B',
    '#1C2541',
    '#3A506B',
    '#5BC0BE',
    '#6FFFE9',
  ];

  return (
    <div>
      <BarChart data={data} colors={colors} />
      <div>
        <input
          type="range"
          min={1}
          max={50}
          value={bars.length}
          onChange={(e) => setBars(range(0, parseInt(e.target.value)))}
        />
      </div>
      <div>
        <label>
          Sin
      <input
            type="radio"
            name="trig-fn"
            value="sin"
            checked={trigFn === 'sin'}
            onChange={(e) => setTrigFn('sin')}
          />
        </label>
        <label>
          Cos
      <input
            type="radio"
            name="trig-fn"
            value="cos"
            checked={trigFn === 'cos'}
            onChange={(e) => setTrigFn('cos')}
          />
        </label>
      </div>
    </div>
  );
}

storiesOf('Bar Chart', module)
  .add('Animated', () => <BarChartHarness />);