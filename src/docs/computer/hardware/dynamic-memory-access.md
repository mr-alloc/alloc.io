---
layout: wiki
title: 메모리에 직접 접근할 수 있는 DMA
categories: [computer, hardware]
tags: [Hardware, DMAC, Dynamic Memory Access Controller]
summary: DMA란?
hide: false
---

## DMA란 무엇인가?

DMA는 `IO 장치`와 `메모리`간의 데이터 전송을 위한 기술이다.

정확히는 모든 I/O장치는 아니고, 대용량 데이터 전송을 목적으로 하는 하드웨어와 연결되어있다.  
저장 장치의 경우 `HDD/SSD`, `CD/DVD` 그리고 멀티미디어의 경우 `그래픽 카드(GPU)`, `사운드 카드` 등이 있다.

`PIO`방식에서는 CPU가 한 워드 또는 바이트마다 전송하기 때문에, 속도가 빠른 **I/O 장치**의 경우 CPU의 실제 프로세스 작업 시간을 줄여 다른 작업을 수행하는데 방해가된다.  
이를 해결하기위해 등장한 DMA 기술은 `I/O 장치에서 메모리`로 또는 `메모리에서 I/O 장치`로 데이터를 CPU의 개입없이 전송하여 CPU의 부담을 줄여준다.

![메모리와 I/O 장치간의 데이터 전송](/post/computer/data-transfer-between-memory-and-io-device.png)
:{ "max-width": "400px", "align": "center", "description": "메모리와 I/O 장치간의 데이터 전송" }

## DMA는 어떻게 사용되는가?

**D**ynamic **M**emory **A**cess **C**ontroller (이하 `DMAC`)는 하드웨어 장치로서, [메모리](/wiki/memory) 입출력 장치간의 데이터 전송을 DMA 기술로서 관리하는 장치이다.



  







