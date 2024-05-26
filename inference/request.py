import json

import requests

# Step 1: Django 서버에서 데이터 받아오기
django_url = 'http://127.0.0.1:8000/api/crawl/'  # Django 서버의 엔드포인트 URL
ticker='000100.ks'
def convert_ticker(ticker):
    # 숫자 부분 추출
    number_part = ticker.split('.')[0]
    # 'A'를 앞에 추가
    converted_ticker = 'A' + number_part
    return converted_ticker
converted_ticker=convert_ticker(ticker)
print(f"Original ticker: {ticker}")
print(f"Converted ticker: {converted_ticker}")
payload = {
    "ticker": ticker
}

response = requests.post(django_url, json=payload)
if response.status_code == 200:
    data = response.json()
    data['ticker'] = converted_ticker
else:
    print("Failed to get data from Django server")
    data = []

# print(response.json())
# Step 2: Flask 서버에 데이터 전송
flask_url = 'http://127.0.0.1:5000/inference/'

# Django 서버에서 받은 데이터를 Flask 서버에 전송
r = requests.post(flask_url, json=data)
if r.status_code == 200:
    print("Response from Flask server:", r.json())
else:
    print("Failed to get prediction from Flask server")
