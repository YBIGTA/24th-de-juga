import './App.css';
import {Button} from "@mui/material";
import StockList from "./components/StockList";
import {useState} from "react";
import PieChartStock from "./components/PieChart";
import StockLineChart from "./components/StockLineChart";
import PortfolioLineChart from "./components/PortfolioLineChart";


// // axios를 가져옵니다.
// import axios from 'axios';
//
// // 서버 URL
// const serverUrl = 'http://your-server-url.com/api';
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

    //state 반대값으로 토글
    const portfolioAnalysis = () =>{
        console.log("포트폴리오 수익률 예측 실행")
        //if state == true 포트폴리오에 있는 모든 종목 예상 시세 계산 API
        setState(!state)
    }

  return (
    <div className="App">
      <header className="App-header">

        <div>
          <p>2024-1 DE팀 주가 프로젝트</p>
        </div>
        <div style={{display:'flex', flexDirection: "row",
         alignItems:"center",}}>
          <div style={{marginRight: "50px",}}>
            {/*  개별 종목 선택 -> 요청*/}
            <p>
              종목 선택
            </p>
            <StockList />

          </div>
          <div style={{display:'flex', flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
            <div style={{display:'flex', flexDirection: "row", marginBottom: 2}}>
              {/*미니 차트 TOP 3*/}
              <StockLineChart width={350} height={200} target={3390}/>
              <StockLineChart width={350} height={200} target={3800}/>
              <StockLineChart width={350} height={200} target={3120}/>
            </div>
            <div>
              {/*포트폴리오 수익률 차트*/}
                <div style={{padding: "50px", display: "flex", flexDirection:"column",}}>
                {state ?
                    <PortfolioLineChart width={1000} height={500}/>
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
