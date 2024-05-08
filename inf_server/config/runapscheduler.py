import logging
import os

from django.conf import settings

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from django.core.management.base import BaseCommand
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from django_apscheduler import util

logger = logging.getLogger(__name__)


def my_job_a():
  ## 실행시킬 Job
  #command = 'curl -X POST -H "Content-Type: application/json" -d "{\\"ticker\\":\\"AAPL\\",\\"start_date\\":\\"2015-07-11\\",\\"end_date\\":\\"2015-07-31\\"}" http://127.0.0.1:8000/day_price/api/stockdata/'
  #os.system(command)
  pass
  
def my_job_b():
  
  pass
class Command(BaseCommand):
  help="Runs APScheduler."
  def handle(self, *args, **options):
    scheduler = BackgroundScheduler(timezone=settings.TIME_ZONE) # BlockingScheduler를 사용할 수도 있습니다.
    scheduler.add_jobstore(DjangoJobStore(), "default") 

    scheduler.add_job(
      my_job_a,
      trigger=CronTrigger(second="*/10"),  # 10초마다 작동합니다.
      id="my_job",  # id는 고유해야합니다. 
      max_instances=1,
      replace_existing=True,
    )
    logger.info("Added job 'my_job_a'.")

    scheduler.add_job(
      my_job_b,
      trigger=CronTrigger(
        day_of_week="mon", hour="03", minute="00"
      ),  # 실행 시간입니다. 여기선 매주 월요일 3시에 실행합니다.
      id="my_job_b",
      max_instances=1,
      replace_existing=True,
    )
    logger.info("Added job 'my_job_b'.")

    try:
      logger.info("Starting scheduler...")
      scheduler.start() # 없으면 동작하지 않습니다.
    except KeyboardInterrupt:
      logger.info("Stopping scheduler...")
      scheduler.shutdown()
      logger.info("Scheduler shut down successfully!")