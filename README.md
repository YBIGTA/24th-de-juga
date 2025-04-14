# 24th-de-juga
24대 DE팀 프로젝트 - 분산 투자자(포트폴리오)를 위한 주가 예측 서비스

## 프로젝트 소개

이 프로젝트는 개별 종목이 아닌, 분산 투자된 포트폴리오 전체의 주가 변화를 예측하는 서비스입니다. 학부생으로서 대규모 트래픽을 직접 경험하기 어려운 한계를 극복하고자, 의도적으로 파이프라인을 세분화하고 시스템의 복잡도를 높여 프로젝트를 설계하였습니다. 
  
  가장 큰 챌린지는 복잡한 데이터 흐름을 기능 단위로 분리하고, 각 요소를 모듈화하는 아키텍처 설계였습니다. 이를 해결하기 위해 전체 시스템을 다음과 같은 독립적인 파이프라인과 서버 구조로 구성하였습니다. 먼저 데이터 수집 파이프라인에서는 KOSPI200의 1분봉 거래 데이터를 Daishin API를 통해 수집한 후, AWS S3에 저장하고, 해당 데이터를 Hadoop HDFS 기반의 대용량 저장소로 옮겨 Spark로 전처리를 수행하였습니다. 전처리된 데이터는 모델 학습 파이프라인으로 전달되어 주가 예측 모델 학습에 활용됩니다.

**서버 아키텍처는 역할별로 다음과 같이 분리하여 구성하였습니다.**

- Crawling Server (Django)는 Yahoo Finance API를 통해 예측에 필요한 데이터를 수집하고,
- Inference Server (Flask)는 학습된 모델을 이용해 주가 예측을 수행합니다.
- Main Server는 각 서버 간 요청을 조율하고, 프론트엔드와의 통신을 담당하며,
- Frontend (React)에서는 예측 결과를 시각화하고 사용자가 보유 중인 포트폴리오 정보를 UI로 제공합니다.


## DEMO

![image](https://github.com/YBIGTA/24th-de-juga/assets/108119782/2bbc5854-6af6-4a48-86d1-ce2c64baaa3b)

![image](https://github.com/YBIGTA/24th-de-juga/assets/108119782/9621dc5f-f535-44e2-b219-701bbb250429)



https://github.com/user-attachments/assets/da4b0649-918c-476c-b36d-c41365f0ac6e

