// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import {Alert, Button} from "@mui/material";
// import {useEffect, useState} from "react";
//
//
// // // axios를 가져옵니다. API 통신 예시
// // import axios from 'axios';
// //
// // // 서버 URL
// // const serverUrl = 'http://localhost/api/crawl';
// //
// // // 서버로 GET 요청을 보내는 함수
// // const fetchDataFromServer = async () => {
// //   try {
// //     // Axios를 사용하여 GET 요청을 보냅니다.
// //     const response = await axios.get(`${serverUrl}/data`);
// //
// //     // 서버로부터 받은 데이터를 콘솔에 출력합니다.
// //     console.log('서버 응답 데이터:', response.data);
// //   } catch (error) {
// //     // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
// //     console.error('서버 요청 중 오류 발생:', error);
// //   }
// // };
// //
// // // fetchDataFromServer 함수 호출
// // fetchDataFromServer();
//
//
// export default function StockList({onSelectStock}) {
//   const [checked, setChecked] = React.useState([]);
//   // 각 종목의 투자 금액
//   const [investments, setInvestments] = useState([10000, 20000, 15000, 30000, 25000]);
//
//
//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];
//
//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }
//
//     setChecked(newChecked);
//     onSelectStock(value);
//     console.log("클릭된 labelId:", `${value + 1}번째 종목`);
//   };
//
//
//   // // 개별 종목 API 시세 예상 최대 3개, 통신 버튼
//   // const handleStockAnalysis = () => {
//   //   const selectedStocks = stockList.filter(stock => checked.includes(stock.code));
//   //   const selectedStockInfo = selectedStocks.map(stock => `${stock.code} - ${stock.name}`).join(', ');
//   //
//   //   console.log("선택한 종목 주가 예측", selectedStockInfo);
//   //   alert(`요청 종목 정보: ${selectedStockInfo}\n예상 주가 분석 중`);
//   // };
//
//
//
//   // 종목 코드와 종목 명 리스트
//   const stockList = [
//     { code: "005930", name: "삼성전자" },
//     { code: "000660", name: "SK하이닉스" },
//     { code: "035420", name: "NAVER" },
//     { code: "035720", name: "카카오" },
//     { code: "005380", name: "현대차" },
//       ]
//
//
//   return (
//       <div style={{marginBottom: 0,}}>
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',
//         // borderWidth: 20, borderColor: "black", borderStyle: "solid"
//         border: '2px solid black'}}>
//       {stockList.map((stock, index) => {
//           const labelId = `checkbox-list-label-${index}`;
//
//           return (
//             <ListItem
//               key={index}
//               disablePadding
//             >
//               <ListItemButton onClick={handleToggle(stock.code)} dense>
//                 <ListItemIcon>
//                   <Checkbox
//                     edge="start"
//                     checked={checked.indexOf(stock.code) !== -1}
//                     tabIndex={-1}
//                     disableRipple
//                     inputProps={{ 'aria-labelledby': labelId }}
//                   />
//                 </ListItemIcon>
//                 <ListItemText id={labelId} primary={stock.name} secondary={`투자금액: ${investments[index]}원`} />
//               </ListItemButton>
//             </ListItem>
//           );
//         })}
//       </List>
//       {/*<Button variant={"contained"} onClick={handleStockAnalysis} style={{marginTop: 20}}>*/}
//       {/*  예상 상승률 계산*/}
//       {/*</Button>*/}
//     </div>
//   );
// }
//
