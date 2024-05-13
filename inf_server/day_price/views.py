from datetime import datetime, timedelta
from django.shortcuts import render
import yfinance as yf
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
import numpy as np
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt #0514_임시 테스트
def add_business_days(start_date_str, add_days):
    start_date = np.datetime64(start_date_str, 'D')
    business_days_later = np.busday_offset(start_date, add_days, roll='forward')
    return business_days_later.astype(datetime)

def parse_date(date_str):
    try:
        return datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        raise ValueError("Invalid date format. Please use YYYY-MM-DD.")

@csrf_exempt#0514_임시 테스트
@require_http_methods(["POST"])
def crawl_data(request):
    try:
        data = json.loads(request.body)
        ticker = data.get("ticker", "")

        start_date_str = data.get("start_date", "")
        end_date = add_business_days(start_date_str, 5)

        response_data = yf.download(ticker, start=start_date_str, end=end_date.strftime('%Y-%m-%d'))
        if response_data.empty:
            return JsonResponse({'error': 'No data available for the specified date range'}, status=404)
        
        # 0514 데이터 형식을 Model Team이 원하는 방식에 맞추어 수정
        transformed_data = []
        for index, row in response_data.iterrows():
            formatted_data = {
                "date": index.strftime('%Y%m%d%H%M'),
                "open": row['Open'],
                "high": row['High'],
                "low": row['Low'],
                "close": row['Close'],
                "volume": row['Volume']
            }
            transformed_data.append(formatted_data)

        return JsonResponse(transformed_data, safe=False)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except ValueError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
