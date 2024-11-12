---
layout: wiki
title: CPU와 인터럽트
categories: [computer, os]
tags: [Operating System, OS, Interrupt]
date: 2021-01-13 22:33:00 +0900
current-company: Cubic INC
current-position: SI Researcher
summary: 인터럽트란?
hide: false
---

## What is Interrupt?

interrupt `[ˌɪntəˈrʌpt]`
1. (말·행동을) 방해하다[중단시키다/가로막다]
2. (무엇을 잠깐) 중단시키다

사전 상의 `interrupt`(이하 인터럽트)는 위와 같은 어떤 행동이나 흐름을 중단시키는 의미로 등재 되어있다.
컴퓨터에서도 인터럽트는 어떤 흐름을 중지하는 역할을 한다.

[CPU]()는 순차적으로 명령어를 처리한다. 하지만 예상치못하거나 긴급한상황에 의도적으로 특별한 처리를 해야한다.
예를 들어 스타크래프트나 리그오브레전드처럼 3인칭시점에서 마우스로 지면을 클릭하는 경우, 해당위치로 캐릭터가 이동한다.
이 경우 이동이 끝나지 않아도, 우리는 새로운 위치를 클릭하여 방향을 바꿀수도있다. 

![캐릭터의 이동](/post/computer/move-unit.png)
:{ "max-width": "300px", "description": "눈꽃시비르의 방향을 조작하는 프로겐 선수" }

이 처럼 CPU가 명령을 실행하는중에도 긴급하거나, 실시간 처리가 필요한경우 [시스템버스]()를 통해, CPU에 인터럽트 신호를 보내 우선적으로 처리를 수행할 수 있다.

## 인터럽트의 종류


