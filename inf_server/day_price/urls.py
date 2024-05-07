# day_price/urls.py
from django.urls import path
from .views import StockDataAPIView

urlpatterns = [
    path('api/stockdata/', StockDataAPIView.as_view(), name='stockdata-api'),
]