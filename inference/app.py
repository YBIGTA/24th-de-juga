from flask import Flask, request, jsonify
import torch
import pickle
import numpy as np
import pandas as pd
import os

from flask_cors import CORS

app = Flask(__name__)
#model_path='model/A000080.pth'
#scaler_path='model/A000080.pkl'
#모델과 스케일러 파일 경로 설정
def get_paths(ticker, base_model_path, base_scaler_path):
   model_path = os.path.join(base_model_path, f"{ticker}.pth")
   scaler_path = os.path.join(base_scaler_path, f"{ticker}.pkl")
   return model_path, scaler_path

#base_model_path = 'model'
#base_scaler_path = 'model'
#get_paths(converted_ticker, base_model_path, base_scaler_path)
#print(model_path, scaler_path)

# 예측 함수 정의
class GRU(torch.nn.Module):
    def __init__(self, num_classes, input_size, hidden_size, num_layers, seq_length):
        super(GRU, self).__init__()
        self.num_classes = num_classes
        self.num_layers = num_layers
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.seq_length = seq_length

        self.gru = torch.nn.GRU(input_size=input_size, hidden_size=hidden_size,
                                num_layers=num_layers, batch_first=True)
        self.fc_1 = torch.nn.Linear(hidden_size, 128)
        self.fc = torch.nn.Linear(128, num_classes)
        self.relu = torch.nn.ReLU()

    def forward(self, x):
        h_0 = torch.zeros(self.num_layers, x.size(0), self.hidden_size).to(x.device)
        output, hn = self.gru(x, h_0)
        out = self.relu(output[:, -1, :])
        out = self.fc_1(out)
        out = self.relu(out)
        out = self.fc(out)
        return out

def predict_next_close(df, model_path, scaler_path):
    print("Starting prediction...")  # 디버그 출력 추가
    print(f"Model path: {model_path}")  # 디버그 출력 추가
    print(f"Scaler path: {scaler_path}")  # 디버그 출력 추가
    if len(df) != 7:
        raise ValueError("Input DataFrame must have exactly 7 rows")
    
    # 스케일러 로드
    with open(scaler_path, 'rb') as f:
        scaler = pickle.load(f)
    
    # 모델 로드
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = GRU(num_classes=1, input_size=df.shape[1], hidden_size=64, num_layers=4, seq_length=7)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    
    # 데이터프레임 열 순서 확인
    df = df[['open', 'high', 'low', 'close', 'volume']]
    
    # 입력 데이터 스케일링
    scaled_data = scaler.transform(df)
    print("Scaled data:", scaled_data)  # 디버그 출력 추가
    
    # 텐서로 변환
    inputs = torch.tensor(scaled_data, dtype=torch.float32).unsqueeze(0).to(device)
    print("Input tensor:", inputs)  # 디버그 출력 추가
    
    # 예측 수행
    with torch.no_grad():
        output = model(inputs)
    print("Model output:", output)  # 디버그 출력 추가
    
    # 예측값 역변환
    prediction = output.cpu().numpy().reshape(-1, 1)
    prediction_full = np.zeros((1, scaled_data.shape[1]))
    prediction_full[:, -1] = prediction
    predicted_close = scaler.inverse_transform(prediction_full)[:, -1]
    
    print("Predicted close:", predicted_close)  # 디버그 출력 추가
    return predicted_close[0]

def convert_ticker(ticker):
    # 숫자 부분 추출
    number_part = ticker.split('.')[0]
    # 'A'를 앞에 추가
    converted_ticker = 'A' + number_part
    return converted_ticker

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:8888"]}}, supports_credentials=True)

@app.route('/')
def home():
    return 'This is Home!'

@app.route('/inference/', methods=['POST'])
def inference():
    try:
        # 데이터 받아오기 (price+ticker)
        data= request.get_json()
        print(f"Received data: {data}")
        # 티커만 추출하기 위해 pop() 함수 사용
        ticker = data.pop('ticker', None)
        if not ticker:
            raise ValueError("Ticker must be provided")

        ticker = convert_ticker(ticker)

        print(ticker)
        base_model_path = 'model'
        base_scaler_path = 'model'
        model_path, scaler_path = get_paths(ticker, base_model_path, base_scaler_path)


        # 데이터를 DataFrame으로 변환
        df = pd.DataFrame(data)
        print(df)

        # 예측 수행
        predicted_close = predict_next_close(df, model_path, scaler_path)
        
        # 예측값 반환
        return jsonify({'prediction': predicted_close})
    except Exception as e:
        print(f"Error: {str(e)}")  # 디버그 출력 추가
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
