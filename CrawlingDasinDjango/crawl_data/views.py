from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json


def crawl_data(request):
    # 여기에 크롤링 로직을 추가할 예정입니다.
    data = {"message": "This is a placeholder response"}
    return JsonResponse(data)

@require_http_methods(["POST"])
def sample_response(request):
    try:
        data = json.loads(request.body)
        code = data.get("code", "")
        # 데이터 처리 로직
        response_data = {
            # "name": data.get("name", ""),
            "2024-04-01 00:00": 4000,
            "2024-04-01 00:05": 5000
        }
        return JsonResponse(response_data)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
