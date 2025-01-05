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
:{ "align": "center", "max-width": "500px", "description": "중앙처리장치의 코어 구조" }

CPU Core 안에서는 크게 제어장치와 처리장치 두가지로 나뉜다.

### Control Unit (제어장치)

제어장치는 `CPU`와 다른 주변 장치와의 데이터 흐름을 제어하며, 각 장치로 제어신호를 보내어 명령어를 실행하도록 한다.
CPU의 [명령어 사이클]()을 제어하며, 명령어를 해독하고 실행하는 역할을 한다.

**제어 장치에 속하는 대표적인 구성요소**

1. [명령어 디코더 (Instruction Decoder)]()
    * 명령어를 해독하고, 필요한 작업을 결정한다.
2. [제어 신호 생성기 (Control Signal Generator)]()
    * 명령어를 해독한 결과에 따라 제어 신호를 생성한다.
3. [인터럽트 컨트롤러 (Interrupt Controller)]()
    * 인터럽트가 발생하면, 해당 인터럽트를 처리한다.
4. [클럭 발생기 (Clock Generator)]()
    * CPU의 클럭을 생성한다.
5. [타이밍 신호 발생기 (Timing Signal Generator)]()
    * 클럭 발생기로 부터 주기신호를 받아 작업 흐름을 나눈다.
6. [명령어 사이클 제어기 (Instruction Cycle Controller)]()
    * 타이밍 신호를 받아 명령어 실행 순서를 관리한다.

### Data Processing Unit (처리장치)

처리장치는 제어장치가 명령어를 해독하고, 실행할 작업을 결정하면, 실제로 데이터를 처리하는 장치이다.

**제어 장치에 속하는 대표적인 구성요소**

1. [산술 논리 연산 장치 (Arithmetic And Logical Unit)]()
    * 산술(사칙: +, −, ✕, ÷)연산과 논리(AND, OR, NOT 등)연산을 처리한다.
2. [부동소수점 연산 장치 (Floating Point Unit)]()
    * 실수 데이터 연산을 처리한다.
3. [레지스터 (Register)]()
    * 데이터를 저장하고, 연산에 필요한 데이터를 임시로 저장한다.
4. [캐시 메모리 (Cache Memory)]()
    * 데이터를 빠르게 접근하기 위한 임시 저장소이다.
5. [파이프 라인 (Pipeline)]()
    * 명령어를 여러 단계로 나누어 병렬로 처리한다.
