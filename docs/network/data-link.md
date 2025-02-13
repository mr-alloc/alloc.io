---
layout: post
title: 데이터 링크 계층 (Data Link Layer)
tags: [Network, Data Link Layer, OSI, OSI 7 Layer]
date: 2021-02-05 13:22:00
thumbnail: /post/network/data-link-layer/index.png
profile-image: /post/profile/profile1.jpg
current-company: Cubic INC
current-position: SI Researcher
summary: 데이터 링크 계층
excerpt-separator: <!--more-->
hide: false
---
데이터 링크는 물리계층 상위에 있고, 네트워크 프로토콜 관점에서 가장 기본이 되는 계층이다.
데이터는 "프레임"으로 다루며 MAC 주소 체계를 사용하여 통신한다.
<!--more-->
## 데이터 링크 계층이란?::what-is-data-link-layer

**데이터 링크 계층**은 OSI 7 계층 중 두 번째 계층으로, [물리 계층](/docs/network/physical-layer)에 데이터 전송을 지시할 수 있다.
흔히 **L2**(Layer 2)라고도 불리며 L2에서는 MAC 주소를 기반으로 주소지정을 사용한다.  

L2는 프레임 단위의 데이터를 전송하며, 신뢰성 있는 전송을 보장하기 위해 오류제어 및 흐름 제어를 수행한다.  
대표적인 프로토콜 기술로는 `Ethernet`, `PPP(Point-to-Point Protocol)`, `HDLC(High-Level Data Link Control)` 등이 있다.  

L2에는 Mac 주소 테이블이 있으며, 출발지 MAC을 테이블에 학습한다.

## NIC::network-interface-card

**NIC**(**N**etwork **I**nterface **C**ard)은 네트워크 장치로, 컴퓨터와 네트워크 간의 통신을 위한 하드웨어 장치이다.
컴퓨터에서는 `NIC`이 L2 계층의 역할로 여러가지 처리를 수행한다.

![NIC](/post/network/data-link-layer/network-interface-card.png)
:{ "align": "center", "max-width": "400px", "description": "L2 계층을 수행하는 랜카드(NIC)" }

**NIC의 주요 특징**

* 각 랜카드는 고유한 MAC 주소(48 Bit)를 가지고있다. (실제로 이 처리를 위해 [IEEE]()에서 관리한다.)
* 데이터를 프레임 단위로 전송하고 수신
* L1에서 받은 바이트 스트림을 검사하고 정상 적인 프레임이면 처리, 오류가 있으면 폐기한다.

## 프레임 구조::frame-structure

| Preamble |  SFD   | Destination MAC | Source MAC |  Type  |     Data     |  FCS   |
|:--------:|:------:|:---------------:|:----------:|:------:|:------------:|:------:|
| 7 Bytes  | 1Bytes |     6Bytes      |   6Bytes   | 2Bytes | 46~1500Bytes | 4Bytes |
:{ "type": "filled" }

L2에서는 각 데이터를 프레임으로 전송하며, 프레임은 위와 같은 구조로 이루어져있다.

* **Preamble**: 수신측의 클록 동기화를 위해 사용 되며, 7번 반복된 byte로 구성된다. (예: 10101010(AA) * 7)
* **SFD**(**S**tart **F**rame **D**elimiter): 프레임의 시작을 알리는 구분 값, 1byte로 구성된다. (예: 10101011(AB))
* **Destination MAC**: 목적지 MAC 주소, 6byte로 구성된다.
* **Source MAC**: 출발지 MAC 주소, 6byte로 구성된다.
* **Type**: 데이터의 종류를 나타내는 값 이며, IPv4는 `0x0800`, IPv6은 `0x86DD`, ARP는 `0x0806`으로 구성된다.
* **Data**: 실제 전송할 데이터, 최소 46byte에서 최대 1500bytes 까지 전송 가능하다.
* **FCS**(**F**rame **C**heck **S**equence): 오류 검출을 위한 값으로, 4byte로 구성된다. 이 값은 프레임이 손상되었는지 아닌 지를 판단하는 체크섬으로 사용한다.
  * 송신 장치(Sender Device)는 이 필드를 제외한 프레임의 포든 필드를 가져와 **CRC**(Cyclic Redundancy Check)라는 알고리즘으로 실행하고 결과로 FCS로 사용할 4byte 값을 생성하여 이 필드에 담는다.

L2에서는 Data를 제외 한 모든 필드를 프레임 헤더라고 하며 `NIC`에서는 이 헤더를 분석하고, Data를 추출하여 상위 계층으로 전달한다.



