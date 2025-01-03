---
layout: wiki
title: 중앙처리장치 (CPU)
tags: [Hardware, CPU]
summary: CPU란?
hide: false
---

## CPU란?

**C**entral **P**rocessing **U**nit (이하 `CPU`)는 컴퓨터의 모든 연산을 실행하거나 처리하는 핵심적인 제어장치이며 `중앙처리장치`라고도 말한다. 
컴퓨터에 필수적인 4대 주요기능(`기억`, `해석`, `연산`, `제어`)을 관리하는 가장 중요한 장치이다.
1
처리기, 프로세서 등 여러 이름이 있으며 컴퓨터에 따라 한개 또는 그 이상의 장치가 들어간다. 일반적으로는 프로세서 칩 한개를 의미 하지만, 엔지니어 입장에서는 몇개가 존재하든 처리를 하는 역할은 변하지 않기에 프로세서라고 그냥 말 할 수 도 있다.  

![멀티코어 프로세서](/post/computer/multicore-processor.png)
:{ "max-width": "300px", "align": "center", "description": "멀티코어는 하나의 칩에 두개 이상의 코어를 가지는 설계를 의미한다." }

CPU의 코어는 실질적으로 연산을 수행하는 장치이다. 코어 내에는 연산하는 과정에서 임시로 적제할 여러 레지스터를 갖고 있다.
제조사별로 [캐시메모리]() 구조가 다르지만, 왼쪽의 경우는 `L2 캐시`는 프로세서 내에서 공유가 가능하다.  

때문에 `Level 1 캐시(이하 L1)`에는 접근이 매우 빠르지만 반대로 L2는 경합으로 인해 접근에 대한 [클럭]() 동기화로 시스템 시간을 맞추어 순차적인 접근이 필요하기 때문에 `L1`에 비해 느리다.
코어별로 `L2`를 내장하고 있는 CPU도 있고, L2 부터 공유하는 CPU도 있다.

[인텔의 메모리 성능 요약](https://www.intel.com/content/www/us/en/developer/articles/technical/memory-performance-in-a-nutshell.html)에 따르면 간단한 차이는 아래와 같다.

| 메모리      | 크기    | 시간     | 대역폭    |
|----------|-------|--------|--------|
| L1 cache | 32KB  | 1ns    | 1TB/s  |
| L2 cache | 256KB | 4ns    | 1TB/s  |
| L3 cache | 8MB < | 40ns < | 400GB/s | 
:{ "align": "center", "description": "인텔 캐시메모리의 성능 비교표" }

## Core의 구조

![CPU 코어](/post/computer/cpu-core-structure.png)
:{ "align": "center", "max-width": "300px", "description": "중앙처리장치의 코어 구조" }

`캐시메모리` 이외에도 제어장치(`Control Unit`), [ALU]()(`Arithmetic Logic Unit`), [레지스터]()(`Register`) 등이 있다.

### Control Unit

제어장치는 `CPU`와 다른 주변 장치와의 데이터 흐름을 제어하며, 각 장치로 제어신호를 보내어 명령어를 실행하도록 한다.
CPU의 [명령어 사이클]()을 제어하며, 명령어를 해독하고 실행하는 역할을 한다.

### Arithmetic Logic Unit (ALU)

`ALU`는 산술논리 연산장치라고도 하며, 숫자 연산(덧셈, 뺄셈, 곱셈, 나눗셈)과 논리 연산(AND, OR, NOT, XOR)을 수행하며 주로 산술적 계산과 조건부 연산을 담당한다.
구성요소로는 산술 연산(가산기, 감산기)와 논리연산 그리고 시프트 및 회전연산을 처리하기 위한 회로 등이 있다.

### Register

`레지스터`는 간단히 말해 어떤 값을 저장할 수 있는 작은 공간이다. CPU 내부에 있는 레지스터는 레지스터 파일이라고 하며, 레지스터 파일은 레지스터의 집합이다.
여러개의 플립플롭으로 구성되어 용도에 따라서는 `특수 목적 레지스터`와 `범용 레지스터`로 나뉜다.
