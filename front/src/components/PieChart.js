import * as React from 'react';

import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import {useSelector} from "react-redux";



export default function PieChartStock() {
  const customColors = ['#0234FE', '#00C49F', '#FFBB28', '#FF8042', '#E70404',];
  const stocksData = useSelector((state) => state.stocks.selectedStocks);
  // console.log("piechart stocksdata :", stocksData)

//   //label = 종목 명, value = 종목 투자금액,
// const data = [
//   { label: '삼성전자', value: 10000, },
//   { label: 'SK하이닉스', value: 20000,  },
//   { label: 'NAVER', value: 15000,  },
//   { label: '카카오', value: 30000,  },
//   { label: '현대차', value: 25000,  },
// ];

  // stocksData 객체에서 label과 value를 추출하여 새로운 data 배열 생성
  const data = stocksData.map(stock => ({
    label: stock.name, // 종목 이름
    value: parseInt(stock.investment, 10), // 투자 금액을 숫자로 변환
  }));

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
