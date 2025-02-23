---
layout: wiki
title: Base64 인코딩
date: 2019-11-05 18:25:00 +0900
tags: [Algorithm, Encoding, Base64]
summary: Base64
hide: true
---

## Base64란?::what-is-base64

**Base64**는 이진 데이터를 6비트씩 끊어서 문자로 변환하는 인코딩 방식이다.
60년대 후반에서 70년대 초반, 최초의 이메일 시스템은 7bit ASCII 문자만 전송할 수 있었다. 이는 [SMTP]()(**S**imple **M**ail **T**ransfer **P**rotocol)가 7bit ASCII 기반으로 설계되었기 때문이다.

하지만 실제 데이터는 대부분 8bit 바이너리 형식이였고, 여기에 실행 파일, 이미지, 비디오 등이 포함 된다. 이 8bit 데이터를 7bit 채널로 전송하기 위한 해결책이 필요했고, 
이 문제를 해결하기위해 1987년 PSRG(**P**rivacy and **S**ecurity **R**esearch **G**roup)에서 Base64 인코딩 방식을 제안했다.

Base64는 3바이트(24bit)의 바이너리 데이터를 4개의 6bit 유닛으로 변환하며, 다음의 특징을 같는다:
* 6비트는 0-63까지의 값을 표현 할 수 있음
* 이 64개의 값을 ASCII 문자로 매핑(A-Z, a-z, 0-9, +, /)
* 패딩이 필요한 경우 `=` 문자를 사용

예를 들어 `Hello` 문자열을 Base64로 인코딩하면 아래와 같은 결과를 얻을 수 있다:

| H | e | l | l | o |
|---|---|---|---|---|
| 72 | 101 | 108 | 108 | 111 |
| 01001000 | 01100101 | 01101100 | 01101100 | 01101111 |
:{ "align": "center", "description": "Base64의 인코딩" }

