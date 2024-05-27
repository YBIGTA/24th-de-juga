from datetime import datetime
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
import pandas as pd
from pandas.tseries.holiday import AbstractHolidayCalendar, Holiday as PandasHoliday
from pandas.tseries.offsets import CustomBusinessDay
import yfinance as yf
from .models import Holiday

class KoreaHolidayCalendar(AbstractHolidayCalendar):
    rules = [PandasHoliday("Holiday", year=d.date.year, month=d.date.month, day=d.date.day) for d in
             Holiday.objects.all()]

kr_trading_business_day = CustomBusinessDay(calendar=KoreaHolidayCalendar())


def subtract_business_days(end_date_str, subtract_days):
    end_date = pd.to_datetime(end_date_str)

    if end_date.weekday() >= 5 or end_date in kr_trading_business_day.holidays:
        end_date = end_date - kr_trading_business_day

    current_date = end_date
    days_subtracted = 0

    while days_subtracted < subtract_days:
        current_date -= pd.Timedelta(days=1)
        if current_date in kr_trading_business_day.holidays or current_date.weekday() >= 5:
            print(f"{current_date} is a holiday or weekend, skipping.")
        else:
            days_subtracted += 1
            print(f"Subtracting {current_date} as a business day.")

    return current_date


@require_http_methods(["POST"])
def crawl_data(request):
    try:
        data = json.loads(request.body)
        ticker = data.get("ticker", "")
        end_date_str = data.get("end_date", "")
        end_date = pd.to_datetime(end_date_str)
        end_date_inclusive = end_date + pd.Timedelta(days=1)

        start_date = subtract_business_days(end_date_str, 6)

        response_data = yf.download(ticker, start=start_date.strftime('%Y-%m-%d'), end=end_date_inclusive.strftime('%Y-%m-%d'))
        if response_data.empty:
            return JsonResponse({'error': 'No data available for the specified date range'}, status=404)

        response_data.drop(columns=['Adj Close'], inplace=True)
        response_data.rename(columns=lambda x: x.lower(), inplace=True)

        response_data.index = response_data.index.strftime('%Y-%m-%d')
        return JsonResponse(response_data.to_dict())

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except ValueError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
