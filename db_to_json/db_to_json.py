import sqlite3
import json
import os

def export_tables_to_json(db_path,output_dir):
    # 데이터베이스에 연결
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # 모든 테이블 이름을 가져옴
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    # 각 테이블에 대해
    for table_name in tables:
        table_name = table_name[0]
        # 테이블 데이터를 가져옴
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()
        
        # 칼럼 이름을 가져옴
        columns = [description[0] for description in cursor.description]

        # 데이터를 JSON 형식으로 변환
        data = [dict(zip(columns, row)) for row in rows]

        # JSON 파일로 저장
        json_file_path = os.path.join(output_dir, f'{table_name}.json')
        with open(json_file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

    # 데이터베이스 연결 종료
    conn.close()

# 사용 예시: 'your_database.db'를 바꿔서 데이터베이스 경로를 입력하세요.
export_tables_to_json('D:/Project/24th-de-juga/Back/db/fin_kospi_stock.db','D:/Project/24th-de-juga/db_to_json/kospi_json')
