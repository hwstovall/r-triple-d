import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { LineChart } from '../src/graphs/line-graph';

const stories = storiesOf('Line Graph', module);

stories.add('Default', () => {
  const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <div style={{ padding: '1em', height: '400px' }}>
      <LineChart labels={labels} data={labels.map((_, i) => Math.pow(i, 3))} />
    </div>
  );
});
