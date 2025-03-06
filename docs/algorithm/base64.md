---
layout: wiki
title: Base64 인코딩
date: 2019-11-05 18:25:00 +0900
tags: [Algorithm, Encoding, Base64]
summary: Base64
hide: false
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

## Base64 변환 방법::how-to-convert

![Base64 테이블](/post/algorithm/base64/index-table.png)
:{ "align": "center", "max-width": "300px", "description": "Base64 인덱스 테이블" }

Base64는 64진법의 의미를 갖고 있으며 위의 64개의 테이블 데이터로 매핑한다. 원본 데이터를 6비트씩 끊어서 해당 테이블의 인덱스로 변환하며, 부족한 공간은 패딩 문자인 `=`로 채운다.

![Base64 인코딩](/post/algorithm/base64/encoding.png)
:{ "align": "center", "description": "Base64 인코딩" }

예를 들어 `Alloc`이라는 문자열을 6비트씩 끊어서 변환하면 `QWxsb2M=`로 변환된다. 여기서 중요한 점은 `=`이라는 패딩문자와 `A`라는 문자는 값이 0인 상황일때 변환되는데, 그 기준이 다르다.

3비트씩 끊는 Base64 특성상 1바이트가 모자르거나 2바이트가 모자를 수 있다. 만약 원본데이터가 `A`이라면 3바이트중 2바이트가 모자라다.
`A`는 6비트로 끊으면 `010000 01`로 변환된다. 이때 뒤 2바이트가 0으로 채워 지면 `010000 010000 000000 000000`이 되고 이를 변환하면, `QQ==`로 변환된다.
즉 원본데이터가 다음 6비트에 포함된다면, A가 되고, 그렇지 않다면 `=`로 패딩된다.