import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

// 오늘 날짜 객체 생성
const today = new Date();

// 오늘을 포함하여 최근 8일의 날짜 계산
const recentDates = [];
for (let i = 7; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    recentDates.push(date);
}

// recentDates 배열에 있는 각 날짜를 'M/D' 형식으로 변환하여 출력
const eightDates = recentDates.map(date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
});

export default function PortfolioLineChart({width, height, target}) {

  const eightDayData = [2000, 3000, 2000, 2780, 2890, 3100, 3200, target];
  const customColor = eightDayData[eightDayData.length - 1] > eightDayData[eightDayData.length - 2] ? ["#E7091B"] : ['#0066ff'];

  // const formattedSixDayData = sixDayData.map(value => `${value}원`);
// const xLabels = [
//   '4/1',
//   '4/2',
//   '4/3',
//   '4/4',
//   '4/5',
//   '4/6',
// ];

  return (
    <LineChart
      width={width}
      height={height}
      colors={customColor}
      series={[
        { data: eightDayData, label: "포폴"},
      ]}
      xAxis={[{ scaleType: 'point', data: eightDates }]}
    />
  );
}
