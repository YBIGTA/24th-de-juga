import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

//label = 종목 명, value = 종목 투자금액,
const data = [
  { label: '삼성전자', value: 10000, color: '#0088FE' },
  { label: 'SK하이닉스', value: 20000, color: '#ed3820' },
  { label: 'NAVER', value: 15000, color: '#FFBB28' },
  { label: '카카오', value: 30000, color: '#FF8042' },
  { label: '현대차', value: 25000, color: '#00C49F' },
];

const sizing = {
  margin: { right: 5 },
  width: 250,
  height: 250,
  legend: { hidden: true },
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

export default function PieChartStock() {
  const customColors = ['#0234FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart
      series={[
        {
          outerRadius: 120,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      colors={customColors}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      {...sizing}
    />
  );
}