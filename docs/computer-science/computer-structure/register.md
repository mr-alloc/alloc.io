---
layout: wiki
date: 2021-02-16 13:14:00
title: 레지스터 (Register)
tags: [ Hardware, CPU, Register ]
summary: 레지스터
hide: false
---

## 세그먼트 레지스터 (Segment Register)

세그먼트 레지스터는 메모리 주소를 논리적 단위로 나누어 관리하기 위한 레지스터이다.
각 구역의 **시작점**을 가리키는 주소이며, 모두 16비트로 구성되어있다:

* CS (Code Segment): 코드 영역
* DS (Data Segment): 데이터 영역
* SS (Stack Segment): 스택 영역
* ES (Extra Segment): 보조 영역
* FS: 추가 적인 보조영역 1
* GS: 추가 적인 보조영역 2

`FS`와 `GS`는 메모리 세그먼트의 추가적인 영역을 위해 `i386` 프로세서에서 도입되었지만, 64비트 Linux에서는 [메모리 페이징]() 기법이 추가되면서,
`FS`와 `GS` 레지스터는 더이상 세그먼트에 사용되지않고, thread-local storage (TLS)또는 per-CPU를 위해 사용된다.

**TLS (Thread Local Storage)와 per-CPU**

| 용도      | 적용범위              | 사용처                           | 예                          |
|---------|-------------------|-------------------------------|----------------------------|
| TLS     | 스레드별로 고유한 데이터를 저장 | 사용자 공간에서 스레드기반 어플리케이션이나 라이브러리 | 쓰레드마다 독립적인 전역 변수 사용        |
| per-CPU | CPU별로 고유한 데이터를 저장 | 운영체제 커널 수준                    | CPU별 통계, 커널 데이터구조, 리소스 사용량 |


(작성중)
