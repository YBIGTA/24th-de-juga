import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button, TextField} from "@mui/material";
import AddStockDialog from "./AddStockDialog";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addStock} from "../data/addStockAction";

const stockList = [
  { code: "005930", name: "삼성전자" },
  { code: "000660", name: "SK하이닉스" },
  { code: "373220", name: "LG에너지솔루션" },
  { code: "207940", name: "삼성바이오로직스" },
  { code: "005380", name: "현대차" },
  { code: "000270", name: "기아" },
  { code: "068270", name: "셀트리온" },
  { code: "005490", name: "POSCO홀딩스" },
  { code: "105560", name: "KB금융" },
  { code: "035420", name: "NAVER" },
  { code: "006400", name: "삼성SDI" },
  { code: "051910", name: "LG화학" },
  { code: "028260", name: "삼성물산" },
  { code: "055550", name: "신한지주" },
  { code: "003670", name: "포스코퓨처엠" },
  { code: "035720", name: "카카오" },
  { code: "012330", name: "현대모비스" },
  { code: "032830", name: "삼성생명" },
  { code: "086790", name: "하나금융지주" },
  { code: "066570", name: "LG전자" },
  { code: "138040", name: "메리츠금융지주" },
  { code: "000810", name: "삼성화재" },
  { code: "015760", name: "한국전력" },
  { code: "018260", name: "삼성에스디에스" },
  { code: "003550", name: "LG" },
  { code: "329180", name: "HD현대중공업" },
  { code: "034730", name: "SK" },
  { code: "323410", name: "카카오뱅크" },
  { code: "033780", name: "KT&G" },
  { code: "259960", name: "크래프톤" },
  { code: "009150", name: "삼성전기" },
  { code: "017670", name: "SK텔레콤" },
  { code: "024110", name: "기업은행" },
  { code: "011200", name: "HMM" },
  { code: "034020", name: "두산에너빌리티" },
  { code: "096770", name: "SK이노베이션" },
  { code: "012450", name: "한화에어로스페이스" },
  { code: "316140", name: "우리금융지주" },
  { code: "402340", name: "SK스퀘어" },
  { code: "090430", name: "아모레퍼시픽" },
  { code: "010130", name: "고려아연" },
  { code: "042660", name: "한화오션" },
  { code: "009540", name: "HD한국조선해양" },
  { code: "030200", name: "KT" },
  { code: "267260", name: "HD현대일렉트릭" },
  { code: "352820", name: "하이브" },
  { code: "010140", name: "삼성중공업" },
  { code: "010950", name: "S-Oil" },
  { code: "047050", name: "포스코인터내셔널" },
  { code: "450080", name: "에코프로머티" },
  { code: "003490", name: "대한항공" },
  { code: "161390", name: "한국타이어앤테크놀로지" },
  { code: "005830", name: "DB손해보험" },
  { code: "086280", name: "현대글로비스" },
  { code: "326030", name: "SK바이오팜" },
  { code: "051900", name: "LG생활건강" },
  { code: "022100", name: "포스코DX" },
  { code: "000100", name: "유한양행" },
  { code: "001570", name: "금양" },
  { code: "034220", name: "LG디스플레이" },
  { code: "010120", name: "LS ELECTRIC" },
  { code: "011070", name: "LG이노텍" },
  { code: "267250", name: "HD현대" },
  { code: "097950", name: "CJ제일제당" },
  { code: "241560", name: "두산밥캣" },
  { code: "028050", name: "삼성E&A" },
  { code: "047810", name: "한국항공우주" },
  { code: "251270", name: "넷마블" },
  { code: "377300", name: "카카오페이" },
  { code: "006800", name: "미래에셋증권" },
  { code: "011170", name: "롯데케미칼" },
  { code: "029780", name: "삼성카드" },
  { code: "302440", name: "SK바이오사이언스" },
  { code: "004020", name: "현대제철" },
  { code: "006260", name: "LS" },
  { code: "009830", name: "한화솔루션" },
  { code: "032640", name: "LG유플러스" },
  { code: "021240", name: "코웨이" },
  { code: "011790", name: "SKC" },
  { code: "361610", name: "SK아이이테크놀로지" },
  { code: "078930", name: "GS" },
  { code: "128940", name: "한미약품" },
  { code: "005940", name: "NH투자증권" },
  { code: "000720", name: "현대건설" },
  { code: "180640", name: "한진칼" },
  { code: "064350", name: "현대로템" },
  { code: "036570", name: "엔씨소프트" },
  { code: "071050", name: "한국금융지주" },
  { code: "011780", name: "금호석유" },
  { code: "001040", name: "CJ" },
  { code: "079550", name: "LIG넥스원" },
  { code: "272210", name: "한화시스템" },
  { code: "271560", name: "오리온" },
  { code: "016360", name: "삼성증권" },
  { code: "039490", name: "키움증권" },
  { code: "003410", name: "쌍용C&E" },
  { code: "035250", name: "강원랜드" },
  { code: "010620", name: "HD현대미포" },
  { code: "018880", name: "한온시스템" },
  { code: "000120", name: "CJ대한통운" },
  { code: "004990", name: "롯데지주" },
  { code: "002790", name: "아모레G" },
  { code: "001450", name: "현대해상" },
  { code: "175330", name: "JB금융지주" },
  { code: "138930", name: "BNK금융지주" },
  { code: "036460", name: "한국가스공사" },
  { code: "000150", name: "두산" },
  { code: "088350", name: "한화생명" },
  { code: "081660", name: "휠라홀딩스" },
  { code: "004370", name: "농심" },
  { code: "052690", name: "한전기술" },
  { code: "001440", name: "대한전선" },
  { code: "383220", name: "F&F" },
  { code: "003230", name: "삼양식품" },
  { code: "002380", name: "KCC" },
  { code: "282330", name: "BGF리테일" },
  { code: "112610", name: "씨에스윈드" },
  { code: "028670", name: "팬오션" },
  { code: "014680", name: "한솔케미칼" },
  { code: "012750", name: "에스원" },
  { code: "008930", name: "한미사이언스" },
  { code: "008770", name: "호텔신라" },
  { code: "030000", name: "제일기획" },
  { code: "073240", name: "금호타이어" },
  { code: "020150", name: "롯데에너지머티리얼즈" },
  { code: "007070", name: "GS리테일" },
  { code: "000880", name: "한화" },
  { code: "204320", name: "HL만도" },
  { code: "010060", name: "OCI홀딩스" },
  { code: "009420", name: "한올바이오파마" },
  { code: "023530", name: "롯데쇼핑" },
  { code: "026960", name: "동서" },
  { code: "000990", name: "DB하이텍" },
  { code: "103140", name: "풍산" },
  { code: "139480", name: "이마트" },
  { code: "042670", name: "HD현대인프라코어" },
  { code: "298050", name: "효성첨단소재" },
  { code: "111770", name: "영원무역" },
  { code: "007310", name: "오뚜기" },
  { code: "004170", name: "신세계" },
  { code: "000080", name: "하이트진로" },
  { code: "000240", name: "한국앤컴퍼니" },
  { code: "004490", name: "세방전지" },
  { code: "005850", name: "에스엘" },
  { code: "011210", name: "현대위아" },
  { code: "017800", name: "현대엘리베이" },
  { code: "047040", name: "대우건설" },
  { code: "051600", name: "한전KPS" },
  { code: "139130", name: "DGB금융지주" },
  { code: "145720", name: "덴티움" },
  { code: "192820", name: "코스맥스" },
  { code: "298020", name: "효성티앤씨" },
  { code: "375500", name: "DL이앤씨" },
  { code: "006280", name: "녹십자" },
  { code: "069620", name: "대웅제약" },
  { code: "336260", name: "두산퓨얼셀" },
  { code: "185750", name: "종근당" },
  { code: "014820", name: "동원시스템즈" },
  { code: "006360", name: "GS건설" },
  { code: "280360", name: "롯데웰푸드" },
  { code: "137310", name: "에스디바이오센서" },
  { code: "002710", name: "TCC스틸" },
  { code: "009240", name: "한샘" },
  { code: "004800", name: "효성" },
  { code: "005420", name: "코스모화학" },
  { code: "005300", name: "롯데칠성" },
  { code: "069960", name: "현대백화점" },
  { code: "120110", name: "코오롱인더" },
  { code: "161890", name: "한국콜마" },
  { code: "001120", name: "LX인터내셔널" },
  { code: "006110", name: "삼아알미늄" },
  { code: "004000", name: "롯데정밀화학" },
  { code: "003620", name: "KG모빌리티" },
  { code: "003090", name: "대웅" },
  { code: "001740", name: "SK네트웍스" },
  { code: "009970", name: "영원무역홀딩스" },
  { code: "000210", name: "DL" },
  { code: "192080", name: "더블유게임즈" },
  { code: "039130", name: "하나투어" },
  { code: "285130", name: "SK케미칼" },
  { code: "300720", name: "한일시멘트" },
  { code: "114090", name: "GKL" },
  { code: "001800", name: "오리온홀딩스" },
  { code: "006650", name: "대한유화" },
  { code: "105630", name: "한세실업" },
  { code: "271940", name: "일진하이솔루스" },
  { code: "093370", name: "후성" },
  { code: "069260", name: "TKG휴켐스" },
  { code: "032350", name: "롯데관광개발" },
  { code: "020560", name: "아시아나항공" },
  { code: "019170", name: "신풍제약" },
  { code: "016380", name: "KG스틸" },
  { code: "010780", name: "아이에스동서" },
  { code: "009900", name: "명신산업" },
  { code: "008730", name: "율촌화학" },
  { code: "005250", name: "녹십자홀딩스" },
  { code: "001680", name: "대상" },
  { code: "001430", name: "세아베스틸지주" },
  { code: "000670", name: "영풍" },
  { code: "178920", name: "PI첨단소재" },
];


  export default function DropDownList200({onSelect}) {
  const [stockCode, setStockCode] = React.useState("");
  const [stockName, setStockName] = React.useState("");
  const [open, setOpen] = useState(false);
  // const [selectedStocks, setSelectedStocks] = useState([]);
    const dispatch = useDispatch();
  const selectedStocks = useSelector((state) => state.stocks.selectedStocks);

  // const handleChange = (event) => {
  //   setStockCode(event.target.value);
  // };

    const handleChange = (event) => {
    const code = event.target.value;
    setStockCode(code);
    const selectedStock = stockList.find((stock) => stock.code === code);
    if (selectedStock) {
      onSelect(selectedStock.name, code);
      setStockName(selectedStock.name);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddStock = (stockCode, investment) => {
    const newStock = { code: stockCode, name: stockName, investment };
    // setSelectedStocks([...selectedStocks, newStock]);
    dispatch(addStock(newStock));
    console.log([...selectedStocks, newStock]);
    console.log(`종목 코드: ${stockCode}, 종목명: ${stockName}, 투자금액: ${investment}`);
  };


  // const handleAddButtonClick = () => {
  //   if (stockCode) { // Only perform action if a stock is selected
  //     handleOpen();
  //   }
  // };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">코스피 200</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stockCode}
            label="코스피 200"
            onChange={handleChange}
        >
          {stockList.map((stock) => (
              <MenuItem key={stock.code} value={stock.code}>
                {stock.name}
              </MenuItem>
          ))}
        </Select>
        <div>
        <Button
          onClick={stockCode ? handleOpen : undefined} // stockCode가 있을 때만 handleOpen 함수 호출
          variant="contained"
          color="primary"
          style={{ marginTop: '1em' }}
        >
          종목 추가
        </Button>

          <AddStockDialog open={open} onClose={handleClose} onAdd={handleAddStock} stockCode={stockCode} stockName={stockName}/>
        </div>
      </FormControl>
    </Box>
  );
  }
