import './App.css';
import {Button} from "@mui/material";
import StockList from "./components/StockList_out";
import {useState} from "react";
import PieChartStock from "./components/PieChart";
import StockLineChart from "./components/StockLineChart";
import PortfolioLineChart from "./components/PortfolioLineChart";
import DropDownList200 from "./components/DropDownList";
import {StockTable} from "./components/StockTable";
import {useSelector} from "react-redux";
import axios from "axios";


// // axios를 가져옵니다.
// import axios from 'axios';
//
// // 서버 URL
// const serverUrl = 'http://http://localhost:8888/predict/{stock.code}';
//
// // 서버로 GET 요청을 보내는 함수
// const fetchDataFromServer = async () => {
//   try {
//     // Axios를 사용하여 GET 요청을 보냅니다.
//     const response = await axios.get(`${serverUrl}/data`);
//
//     // 서버로부터 받은 데이터를 콘솔에 출력합니다.
//     console.log('서버 응답 데이터:', response.data);
//   } catch (error) {
//     // 오류가 발생한 경우 콘솔에 오류 메시지를 출력합니다.
//     console.error('서버 요청 중 오류 발생:', error);
//   }
// };
//
// // fetchDataFromServer 함수 호출
// fetchDataFromServer();


function App() {
    const [state, setState] = useState(false)
    // useSelector 훅을 사용하여 리덕스 상태를 가져옴
  const selectedStocks = useSelector((state) => state.stocks.selectedStocks);
    console.log("redux 내용: ", selectedStocks)

    const handleSelect = (name, code) => {
    console.log(`Selected Stock Name: ${name}, Code: ${code}`);
    // 이곳에 선택된 주식에 대한 로직 추가
  };


    // //state 반대값으로 토글
    // const portfolioAnalysis = () =>{
    //     console.log("포트폴리오 수익률 예측 실행")
    //     //if state == false 포트폴리오에 있는 모든 종목 예상 시세 계산 API
    //     if (state === false) {
    //         alert("수익률 예측 요청")
    //     }
    //     setState(!state)
    // }

    const portfolioAnalysis = () => {
    console.log("포트폴리오 수익률 예측 실행")
    // if state == false 포트폴리오에 있는 모든 종목 예상 시세 계산 API
    if (state === false) {
        alert("수익률 예측 요청");

        // Redux에 저장된 모든 종목 코드를 사용하여 API 요청
        selectedStocks.forEach(stock => {
            const serverUrl = `http://127.0.0.1:8888/predict/${stock.code}.ks`;

            axios.get(serverUrl)
                .then(response => {
                    // 성공적으로 데이터를 받아온 경우의 처리
                    console.log(`예상 수익률 for ${stock.code}:`, response.data);
                })
                .catch(error => {
                    // 요청이 실패한 경우의 처리
                    console.error(`Error fetching prediction for ${stock.code}:`, error);
                });
        });
    }
    setState(!state);
}

    const top3Investments = selectedStocks
        .sort((a, b) => b.investment - a.investment)
        .slice(0, 3);


  return (
    <div className="App">
      <header className="App-header">

        <div style={{display: "flex", height: "100%", marginBottom: "10px"}}>
          <h3>2024-1 DE팀 주가 프로젝트</h3>
        </div>
        <div style={{display:'flex', flexDirection: "row",
         alignItems:"center",}}>
            <div style={{display: 'flex', flexDirection: "column", justifyContent: "center",
                alignItems: "center", marginRight: "50px"}}>
                <DropDownList200 onSelect={handleSelect}/>

                {/*  개별 종목 선택 -> 요청*/}
                <p>
                    나의 종목
                </p>
                {/*<StockList onSelectStock={setTop3Investments} />*/}
                <StockTable/>

            </div>
            <div style={{display: 'flex', flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
            <div style={{display:'flex', flexDirection: "row", marginBottom: 2}}>
              {/* 투자금액 큰 3종목 차트 시각화, stock.code , stock.name */}
            {top3Investments.map((stock, index) => (
        // <StockLineChart key={index} width={350} height={200} target={5000} name={stock.name} />
                <StockLineChart key={index} width={350} height={200} name={stock.name} />
      ))}
            </div>
            <div>
              {/*포트폴리오 수익률 차트*/}
                <div style={{padding: "50px", display: "flex", flexDirection:"column",}}>
                {state ?
                    <PortfolioLineChart width={1000} height={500} target={3000}/>
                    :
                    <PieChartStock />
                }
                    </div>
              <Button variant={"contained"} onClick={portfolioAnalysis}>
                  {state ? "포트폴리오 비율" : "포트폴리오 예상 수익률" }
              </Button>
            </div>
          </div>
        </div>


          <br />
      </header>
    </div>
  );
}

export default App;
