import requests

# Step 1: Django 서버에서 데이터 받아오기
django_url = 'http://127.0.0.1:8000/api/crawl/'  # Django 서버의 엔드포인트 URL
payload = {
    "ticker": "AAPL",
    "start_date": "2024-05-13"
}

response = requests.post(django_url, json=payload)
if response.status_code == 200:
    data = response.json()
else:
    print("Failed to get data from Django server")
    data = []

# Step 2: Flask 서버에 데이터 전송
flask_url = 'http://127.0.0.1:5000/inference/'

# Django 서버에서 받은 데이터를 하나씩 Flask 서버에 전송
for day_data in data:
    r = requests.post(flask_url, json=day_data)
    if r.status_code == 200:
        print("Response from Flask server:", r.json())
    else:
        print("Failed to get prediction from Flask server")
