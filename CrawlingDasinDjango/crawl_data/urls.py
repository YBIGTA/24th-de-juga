from django.urls import path
from .views import crawl_data, sample_response

urlpatterns = [
    path('crawl/', crawl_data, name='crawl-data'),
    path('data/', sample_response, name='sample-response'),
]
