import './App.css';
import JugaLineChart from './components/LineChart';
import {TextField} from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* MUI 그래프 */}
        <p>
          2024-1 DE팀 주가 프로젝트
        </p>
        <JugaLineChart />

          <div>
              <TextField id="outlined-basic" label="Open" variant="outlined" />
              <TextField id="outlined-basic" label="High" variant="outlined" />
              <TextField id="outlined-basic" label="Low" variant="outlined" />
              <TextField id="outlined-basic" label="Close" variant="outlined" />
              <TextField id="outlined-basic" label="Volume" variant="outlined" />
              <TextField id="outlined-basic" label="Date" variant="outlined" />
          </div>
          <br />
        
      </header>
    </div>
  );
}

export default App;
