from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from yahoo_fin.stock_info import get_data
from .models import StockData
from .serializers import StockDataSerializer

class StockDataAPIView(APIView): #class based view
    def post(self, request):
        ticker = request.data.get('ticker', 'AAPL')
        start_date = request.data.get('start_date', '2023-01-01')
        end_date = request.data.get('end_date', '2023-12-31')

        stock_data = get_data(ticker, start_date=start_date, end_date=end_date)

        for index, row in stock_data.iterrows():
            StockData.objects.update_or_create(
                ticker=ticker,
                date=index,
                defaults={
                    'open': row['open'],
                    'high': row['high'],
                    'low': row['low'],
                    'close': row['close'],
                    'volume': row['volume'],
                }
            )

        return Response({'status': 'success', 'message': f'Stock data updated for {ticker}'}, status=200)
