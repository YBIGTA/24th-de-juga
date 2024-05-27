# models.py

from django.db import models

class Holiday(models.Model):
    date = models.DateField(unique=True)

    def __str__(self):
        return self.date.strftime('%Y-%m-%d')
