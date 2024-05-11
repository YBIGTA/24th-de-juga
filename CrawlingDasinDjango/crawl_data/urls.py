from django.urls import path
from .views import crawl_data

urlpatterns = [
    path('crawl/', crawl_data, name='crawl-data'),
]
