from rest_framework import serializers
from .models import StockData

class StockDataSerializer(serializers.ModelSerializer): #converts model to json
    class Meta:
        model = StockData
        fields = ['date', 'open', 'high', 'low', 'close', 'volume','ticker']