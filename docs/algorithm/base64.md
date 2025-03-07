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

예를 들어 `JPA`, `JP`, `J` 문자열들을 각각 Base64로 인코딩하면 위와 같다. `JPA`는 3바이트 이므로 4개의 6비트로 딱맞게 변환된다.

반대로 `JP`와 `J`는 3바이트가 아니므로 패딩 문자인 `=`로 채워진다. 이때 비어있는 비트에 대해서 `A` 또는 `=`로 변환 될지는 바이트 범위 내에 있는지에 따라 다르다.
`JP`는 6비트로 쪼개었을때 3번째 그룹이 0으로 채워져있지만, 두번째 바이트 범위내에 있으므로 `A`로 변환된다.

하지만 `JP`의 4번째 그룹, `J`의 3번째 4번째 그룹은 모두 바이트 범위에 없으므로 패딩 문자인 `=`로 채워진다.

> 패딩 문자 =는 Base64 인코딩시에만 사용되며, Base64 디코딩시에는 무시된다.
:{ "type": "tip", "icon": "lightbulb" }

## 사용되는 이유::why-use-base64

Base64는 이진 데이터를 텍스트 데이터로 변한 되어 전송하기 때문에, 시스템간 데이터 손실을 방지하거나 특수 문자나 제어문자 없이 문자만으로 전송이 가능하다.
또한 ASCII 문자만 사용하기 때문에 인코딩 문제에서 자유로워 모든 시스템에서 안전하게 처리가 가능하다.

데이터가 조금 커지는 단점이 있지만, [RFC4648](https://datatracker.ietf.org/doc/html/rfc4648)에 표준화 되어있고 구현이 간단하기에 많은 프로토콜에서 사용되고 있다.