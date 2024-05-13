# day_price/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('crawl/', views.crawl_data, name='crawl-data'),
]