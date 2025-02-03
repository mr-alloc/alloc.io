---
layout: wiki
date: 2021-08-14 23:55:00
title: 시스템 서비스 (System Service)
tags: [ Operating System, System Service, System Utility, Daemon ]
summary: System Service
hide: true
---

## 시스템 서비스란?::what-is-system-service

![macOS 운영체제의 시스템 서비스(활성 상태 보기)](/post/computer/macos-activity-monitor.png)
:{ "description": "macOS 운영체제의 시스템 서비스(활성 상태 보기)" }

시스템 서비스(System Service)는 시스템 유틸리티(System Utility)로도 알려진 시스템 프로그램(System Program)이다.
시스템 사용을 위해 편리하게 제공되며 내부 구현은 복잡한 프로그램이다. 일부는 우리가 알고 있는 [시스템 API](/wiki/system-call#api-and-system-call)이다.

사용자는 **노래를 들으며**, 게임을 어떻게 할 수 있는지 알 필요가 없다. 사용자가 원하는 것을 쉽게 사용할 수 있도록 운영체제가 시스템 서비스를 제공한다.
예를 들어 크롬 브라우저에서 유튜브 뮤직을 재생하고 Stream 앱으로 게임을 실행하고 있어도 노래가 정지되지 않는다.

근본적으로는 노래가 재생되고 있는 `Chrome` 앱이 백그라운드로 전환 될때 오디오 시스템과 통신하는 데몬을 실행하기 때문에 사용자는 눈치채지 못한다.

> macOS의 경우 Chrome 앱이 백그라운드로 전환되면 `coreaudiod` 데몬이 실행되며 하드웨어 드라이버를 제어한다.
: { "type": "tip", "icon": "lightbulb" }

## 시스템 서비스의 종류::types-of-system-service

시스템 서비스는 포그라운드 서비스(Foreground Service)와 백그라운드 서비스(Background Service)로 나뉜다.


### 파일 관리::file-management

파일과 디렉토리를 생성하며, 삭제, 복사, 명명, 출력, 목록화 및 일반적인 조작을 수행한다.

*시스템 서비스의 기능는 다음과 같은 종류로 나눌 수 있다*:

* **파일 관리**: 파일과 디렉토리를 생성하며, 삭제, 복사, 명명, 출력, 목록화 및 일반적인 조작을 수행한다.
* **상태 정보**: 시스템의 상태정보를 제공한다. 예를들어 날짜, 시간, 가용 메모리 및 디스크, 사용자 수 등과 같은 상태정보를 제공한다. 이러한 기능을 제공하는 서비스들은 환경설정 정보를 저장하고 검색할 수 있는 등록(registry) 기능을 지원하기도 한다.
* **파일 변경**: 앞서 설명한 파일관리와 비슷하지만, 기능을 연계하여 파일을 변경(예: `text editor`)하거나 파일의 속성을 변경하는 기능을 제공한다.
* **프로그래밍 언어 지원**: 일반적인 프로그래밍 언어를 지원하기 위해 컴파일러, 링커, 디버거, 런타임 라이브러리 등을 제공한다. 예를들어 리눅스의 경우 기본적으로 `gcc` 컴파일러를 제공한다.
* **프로그램 적재와 수행**: 



