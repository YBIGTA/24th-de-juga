# admin.py

from django.contrib import admin
from .models import Holiday

@admin.register(Holiday)
class HolidayAdmin(admin.ModelAdmin):
    list_display = ('date',)
    search_fields = ('date',)
