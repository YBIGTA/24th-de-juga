from django.db import models

# Create your models here.
class StockData(models.Model):
    date = models.DateField()
    open = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    close = models.FloatField()
    volume = models.FloatField()
    ticker= models.CharField(max_length=10)
    
    
    def __str__(self):
        return f"{self.ticker} on {self.date}"