import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const ActualData = [2000, 3000, 2000, 2780, 2890, 3390, 3490];
const PredictedData = [2000, 2900, 2100, 2908, 2800, 3500, 3300];
const xLabels = [
  '4/1',
  '4/2',
  '4/3',
  '4/4',
  '4/5',
  '4/6',
  '4/7',
];

export default function SimpleLineChart() {
  return (
    <LineChart
      width={1000}
      height={600}
      series={[
        { data: ActualData, label: 'Actual' },
        { data: PredictedData, label: 'Predicted' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
