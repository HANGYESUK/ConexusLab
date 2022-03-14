const survey = {
    "payload": {
      "id": 1,
      "title": "커넥서스랩 채용 설문조사",
      "event_type": "survey",
      "header_img": "https://www.enterjobedu.co.kr/static/media/b77ffa544f4374e684c15a82df8556f93ece43e1b2ee47f9327287d9.png",
      "created_datetime": "2022-02-14 10:55:04",
      "updated_datetime": "2022-02-14 10:55:04",
      "blocks": [
        {
          "id": 1,
          "block_type": "select",
          "option": {
            "title": "커넥서스랩에 지원한 이유는 무엇 때문인가요?",
            "paddingBottom": "15",
            "items": [
              "커넥서스랩 복지가 너무 좋아서",
              "엔터테인먼트 분야에 관심이 많아서",
              "잘하는 사람들과 함께 일하고 싶어서",
              "나의 워라밸을 지키고 싶어서",
              "기타"
            ],
            "limit": "1"
          },
          "updated_datetime": "2022-02-14 10:55:04"
        },
        {
          "id": 2,
          "block_type": "select",
          "option": {
            "title": "커넥서스랩의 인재상 중 어떤 모습들을 가지고 있나요? (중복 가능)",
            "paddingBottom": "30",
            "items": [
              "서비스 지향성",
              "업무 전문성",
              "능동적 도전성",
              "협업과 커뮤니케이션",
              "긍정 에너지"
            ],
            "limit": "5"
          },
          "updated_datetime": "2022-02-14 10:55:04"
        },
        {
          "id": 5,
          "block_type": "submit",
          "option": {
            "paddingBottom": "90",
            "submitMsg": "설문 참여가 완료되었습니다.",
            "width": "75",
            "btnImg": "https://www.enterjobedu.co.kr/static/media/152854257dcf89a9c15bdbad7bb11c0d7c3eef00e2d50ba9a6b4f131.png"
          },
          "updated_datetime": "2022-02-14 10:55:04"
        }
      ],
      "event_answer": {}
    }
  }
  
  export default survey;