import * as React from 'react';
import {LineChart} from '@mui/x-charts/LineChart';
import {useSelector} from "react-redux";

// 오늘 날짜 객체 생성
const today = new Date();

// 오늘을 포함하여 최근 7일의 날짜 계산
const recentDates = [];
for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    recentDates.push(date);
}

// recentDates 배열에 있는 각 날짜를 'M/D' 형식으로 변환하여 출력
const sevenDates = recentDates.map(date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
});

export default function StockLineChart({width, height, target, name}) {
    // 7일치는 크롤링 시세, 8일째는 예상값
  const sevenDayData = [2000, 3000, 2000, 2780, 2890, 3100, 2900];
  // 마지막 타겟값이 그 직전 날의 값보다 높은지 확인하여 색상 설정
  const customColor = sevenDayData[sevenDayData.length - 1] > sevenDayData[sevenDayData.length - 2] ? ["#E7091B"] : ['#0066ff'];

  return (
    <LineChart
      width={width}
      height={height}
      colors={customColor}
      series={[
        { data: sevenDayData, label: name },
      ]}
      xAxis={[{ scaleType: "point", data: sevenDates }]}
    />
  );
}
