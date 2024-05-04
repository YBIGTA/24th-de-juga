import csv
import win32com.client

# COM 객체 생성
instCpCodeMgr = win32com.client.Dispatch("CpUtil.CpCodeMgr")
codeList = instCpCodeMgr.GetStockListByMarket(1)

# CSV 파일을 쓰기 모드로 열기
with open('stock_list.csv', 'w', newline='', encoding='cp949') as file:
    writer = csv.writer(file)
    writer.writerow(['Index', '코드', '처리된 코드', '부구분 코드', '종목명'])

    # 각 종목 코드에 대한 정보를 순회하며 처리
    for i, code in enumerate(codeList):
        secondCode = instCpCodeMgr.GetStockSectionKind(code)
        if secondCode == 1:  # 여기서 secondCode 값을 체크
            # 코드가 'A'로 시작한다면 'A'를 제거하고 나머지를 그대로 사용
            processed_code = code[1:] if code.startswith('A') else code

            name = instCpCodeMgr.CodeToName(code)
            writer.writerow([i, code, processed_code, secondCode, name])  # 파일에 쓰기

print("CSV 파일이 생성되었습니다.")

