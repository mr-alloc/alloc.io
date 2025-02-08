---
layout: wiki
title: 비트 (Bit)
date: 2019-09-05 08:10:00
tags: [Language, C++, C]
summary: C++ 시작하기
hide: false
---

## 명명규칙::naming-convention

C++ 프로젝트의 주요 명명 규칙을 설명드리겠습니다:

파일명:
- 소스 파일: `.cpp`
- 헤더 파일: `.h` 또는 `.hpp`
- 파일명은 snake_case 또는 PascalCase 사용
    - 예: `user_interface.cpp`, `UserInterface.cpp`

클래스/구조체:
- PascalCase 사용
- 예: `class UserManager`, `struct PlayerData`

함수/메서드:
- camelCase 또는 snake_case
- 예: `void getUserInput()` 또는 `void get_user_input()`

변수:
- camelCase 또는 snake_case
- 예: `int playerScore` 또는 `int player_score`

상수/매크로:
- SCREAMING_SNAKE_CASE
- 예: `const int MAX_PLAYERS = 10`, `#define PI_VALUE 3.14159`

namespace:
- 소문자 snake_case
- 예: `namespace game_engine`

프로젝트 디렉토리:
```
project_name/
├── src/            (소스 파일)
├── include/        (헤더 파일)
├── lib/           (라이브러리)
├── test/          (테스트 파일)
└── docs/          (문서)
```



