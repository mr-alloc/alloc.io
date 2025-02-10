---
layout: post
title: c++ 시작하기
categories: [algorithm]
tags: [Language, C++, C]
date: 2025-02-07 08:10:00
profile-image: /post/profile/profile0.jpg
thumbnail: /post/algorithm/cpp-getting-started.png
current-company: Computer Academy
current-position: Student
summary: C++
hide: true
---

## 문법::grammar

### 주요 연산자::operators

**포인터 선언**
```cpp
int* num = new int[5];
int* not_init;

int new_num = 10;
int* ptr = &new_num;

int lazy = 512;
*ptr = 20; //ptr이 가리키는 주소에 20 저장
ptr = &lazy; //ptr이 lazy의 주소를 가리킴
```
포인터 변수의 특징
* 초기화 필수 아님
* null 값 불가능
* 다른변수나 주소로 재할당 가능
* 더 복잡한 메모리 조작 가능
* 주소 연산 및 포인터 연산 가능

**참조 선언**
```cpp
int num = 10;
int& a = num; // 참조 연산자, num의 값을 a에 저장
```
참조 변수의 특징
* 선언시 반드시 초기화 해야함
* null 참조 불가능
* 재할당 불가능 (한 번 참조한 변수 고정)
* 문법적으로 더 간결하고 안전
* 원본 변수에 투명하게 접근 가능

**주소 연산자**
```cpp
int num = 10;

//int 인트에 대한 포인터 변수
int* a = &num; // 주소 연산자, num의 주소를 a에 저장
```
주소 연산자의 결과는 변수에대한 물리주소기 때문에 컴퓨터 bit 체계의 따른 메모리크기를 부여받는다.  
주소 정보이기 때문에 포인터 변수에만 담을 수 있다.





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



