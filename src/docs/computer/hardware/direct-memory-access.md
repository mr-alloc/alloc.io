---
layout: wiki
title: Direct Memory Access (DMA)
categories: [computer, hardware]
tags: [Hardware, DMAC, Direct Memory Access Controller]
summary: DMA란?
hide: false
---

## DMA란 무엇인가?

DMA는 `IO 장치`와 `메모리`간의 데이터 전송을 위한 기술이다.

정확히는 모든 I/O장치는 아니고, 대용량 데이터 전송을 목적으로 하는 하드웨어와 연결되어있다.  
저장 장치의 경우 `HDD/SSD`, `CD/DVD` 그리고 멀티미디어의 경우 `그래픽 카드(GPU)`, `사운드 카드` 등이 있다.

[`PIO`]()방식에서는 [CPU]()가 한 워드 또는 바이트마다 전송하기 때문에, 속도가 빠른 **I/O 장치**의 경우 CPU의 실제 프로세스 작업 시간을 줄여 다른 작업을 수행하는데 방해가된다.  
이를 해결하기위해 등장한 DMA 기술은 `I/O 장치에서 메모리`로 또는 `메모리에서 I/O 장치`로 데이터를 CPU의 개입없이 전송하여 CPU의 부담을 줄여준다.

![메모리와 I/O 장치간의 데이터 전송](/post/computer/data-transfer-between-memory-and-io-device.png)
:{ "max-width": "400px", "align": "center", "wrapper-class": "justify-center", "description": "메모리와 I/O 장치간의 데이터 전송" }

## DMA는 어떻게 사용되는가?

**D**irect **M**emory **A**cess **C**ontroller (이하 `DMAC`)는 하드웨어 장치로서, [메모리]() 입출력 장치간의 데이터 전송을 DMA 기술로서 관리하는 장치이다.


### DMA 동작 순서

장치 A에서 장치 B로 `DMA` 요청이 들어왔다는 가정하에, 순서를 설명하자면 다음과 같다.

1. 장치 컨트롤러는 `DMAC`과 물리적으로 연결 되어있는 신호선에  DMA Request(`DMA 요청`)을 보낸 후 `DMAC`에서 요청을 받아들이면, 장치 컨트롤러로 DMA Acknowledge(`DMA 승인`) 신호를 보낸다.

![DMA 요청](/post/computer/dma-request.png)
:{ "max-width": "400px", "align": "center", "description": "장치 컨트롤러의 DMA 요청" }

2. `DMAC`는 데이터를 전송할 시스템 버스의 소유권을 얻기위해 CPU에게 제어 버스로 `Bus Request` 신호를 전송한다. CPU는 `Bus Grant`신호를 전송하여 버스 사용을 허가한다.

3. 버스의 소유권을 얻게된 DMAC은 각 장치들로 [시스템 버스]()를 제어하여 데이터를 전송한다.
   1. 주소 신호: 장치 A로 처리될 데이터의 주소를 전달한다.
   2. 제어 신호: 장치 A로 제어할 명령(read)을 전달한다.
   3. 주소 신호: 장치 B로 처리될 데이터의 주소를 전달한다.
   4. 제어 신호: 장치 B로 제어할 명령(write)을 전달한다.
   5. 데이터 전송: 장치 A에서 장치 B로 데이터를 전송한다.

    
4. 데이터 전송제어를 모두 마친 DMAC은 CPU에게 시스템 버스의 소유권을 반환한다.


**Cycle Stealing**





