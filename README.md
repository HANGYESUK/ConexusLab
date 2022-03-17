# ConexusLab 과제전형
- 설문 페이지 제작
  - 컴포넌트 나누어 생성(App -> Event -> Question -> Radio, Checkbox)
  - 라디오버튼과 체크버튼을 누르면(체크시 border로 체크여부 확인 가능) redux로 state전송
  - '보내기'버튼을 누르면 redux - radioReducer, checkReducer 로 완료된 설문 데이터(radio: string, check[i], string - 체크박스는 배열)를 로컬스토리지와 redux에 추가
  - 응답 완료후 설문완료 페이지 이동
  - '응답자 통계 보기' 버튼 클릭시 조회 페이지 이동
 

- 응답자 조회 페이지 제작
  - 로컬스토리지에 있는 데이터들을 설문응답 데이터에 반영
  - 응답자 통계 데이터 가공(value(object형태)의 키값이 string일때, value값이 비워져 있을때, 설문 항목의 개수보다 클 때 등 예외 처리)
  - 질문(라디오, 체크박스 구분)의 갯수로 각각 배열로 만들고 응답자 통계 데이터의 응답갯수를 세는 함수와 퍼센트를 구하는 함수 *체크박스는 value가 배열이라 함수를 하나 더 사용
  - 구해진 퍼센트지(배열)로 막대 그래프 width 구성

