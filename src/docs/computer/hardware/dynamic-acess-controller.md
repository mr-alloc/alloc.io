---
layout: wiki
title: 하드웨어와 DMAC
categories: [computer, hardware]
tags: [Hardware, DMAC, Dynamic Memory Access Controller]
date: 2021-01-15 19:10:00 +0900
current-company: Cubic INC
current-position: SI Researcher
summary: Dynamic Memory Access Controller
hide: false
---

## DMAC란 무엇인가?

**D**ynamic **M**emory **A**cess **C**ontroller (이하 `DMAC`)는 하드웨어 장치로서, 메모리와 입출력 장치간의 데이터 전송을 관리하는 장치이다.
`DMAC`은 CPU의 개입없이 장치 컨트롤러의 요청을 받아 메모리와 장치간의 데이터 전송을 수행한다.  

정확히는 모든 I/O장치는 아니고, 대용량 데이터 전송을 목적으로 하는 하드웨어와 연결되어있다.  
저장 장치의 경우 `HDD/SSD`, `CD/DVD` 그리고 멀티미디어의 경우 `그래픽 카드(GPU)`, `사운드 카드` 등이 있다.

## DMAC은 어떻게 작동원리

앞서 DMAC은

