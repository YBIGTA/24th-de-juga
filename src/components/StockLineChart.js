import * as React from 'react';
import {LineChart} from '@mui/x-charts/LineChart';

// 오늘 날짜 객체 생성
const today = new Date();

// 오늘을 포함하여 최근 6일의 날짜 계산
const recentDates = [];
for (let i = 5; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    recentDates.push(date);
}

// recentDates 배열에 있는 각 날짜를 'M/D' 형식으로 변환하여 출력
const sixDates = recentDates.map(date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
});



export default function StockLineChart({width, height, target}) {
  const customColor = ["#E7091B"]
    //5일치는 크롤링 시세, 6일째는 예상치
const sixDayData = [2000, 3000, 2000, 2780, 2890, target];
// const PredictedData = [2000, 2900, 2100, 2908, 2800, 3500, 3300];

  return (
    <LineChart
      width={width}
      height={height}
      colors={customColor}
      series={[
        { data: sixDayData, label: '종목 명' },
        // { data: PredictedData, label: 'Predicted' },
      ]}
      xAxis={[{ scaleType: "point", data: sixDates }]}
    />
  );
}
