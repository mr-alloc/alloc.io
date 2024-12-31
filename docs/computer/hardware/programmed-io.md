---
layout: wiki
title: Programmed Input/Output (PIO)
tags: [Hardware, PIO]
summary: PIO란?
hide: false
---

## PIO란?

`Programmed I/O`(이하 PIO)는 말그대로 프로그램 입출력이다. `PIO` 방식은 [네트워크 어댑터]() 또는 [ATA]() 기억장치 같은 주변기기와 [CPU](/wiki/central-processing-unit) 사이에서 데이터를 주고 받는다.
CPU의 개입으로 처리되므로 성능에 영향을 주며, 이러한 단점을 극복하기 위해 [인터럽트](/wiki/interrupt)나 [DMA](/wiki/direct-memory-access)같은 방식이 고안되었다.


## PIO의 데이터 전송방식

`PIO`는 CPU가 데이터를 읽거나 쓸 장치에대해서 주소신호(대상주소)와 제어신호(IOR, IOW)로 I/O 활성화가 이루어지면 데이터버스를 통해 전송된다. 
