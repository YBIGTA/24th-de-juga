from django.apps import AppConfig
from django.conf import settings
from apscheduler.schedulers.background import BackgroundScheduler

class SchedulerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'scheduler'

    def ready(self):
        if settings.SCHEDULER_DEFAULT:
            from config import runapscheduler
            runapscheduler.Command().handle()
