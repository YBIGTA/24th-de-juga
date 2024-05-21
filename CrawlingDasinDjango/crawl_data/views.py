from datetime import datetime, timedelta
from django.shortcuts import render
import yfinance as yf
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
import numpy as np

def add_business_days(start_date_str, add_days):
    start_date = np.datetime64(start_date_str, 'D')
    business_days_later = np.busday_offset(start_date, add_days, roll='forward')
    return business_days_later.astype(datetime)

def parse_date(date_str):
    try:
        return datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        raise ValueError("Invalid date format. Please use YYYY-MM-DD.")

@require_http_methods(["POST"])
def crawl_data(request):
    try:
        data = json.loads(request.body)
        ticker = data.get("ticker", "")

        start_date_str = data.get("start_date", "")
        end_date = add_business_days(start_date_str, 7)
        print(start_date_str, end_date)

        response_data = yf.download(ticker, start=start_date_str, end=end_date.strftime('%Y-%m-%d'))
        if response_data.empty:
            return JsonResponse({'error': 'No data available for the specified date range'}, status=404)

        response_data.index = response_data.index.strftime('%Y-%m-%d')
        return JsonResponse(response_data.to_dict())

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except ValueError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
