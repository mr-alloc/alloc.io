---
layout: post
title: 물리 계층 (Physical Layer)
tags: [Network, Physical Layer, OSI, OSI 7 Layer]
date: 2021-02-04 19:54:00
thumbnail: /post/network/physical-layer/pin-map-of-cable.png
profile-image: /post/profile/profile1.jpg
current-company: Cubic INC
current-position: SI Researcher
summary: 물리 계층
excerpt-separator: <!--more-->
hide: false
---
네트워크 통신에서 물리 계층은 데이터를 전송하는 데 사용되는 하드웨어 장치와 전송 매체를 다룬다.
흔히 이더넷, Wi-Fi, 블루투스, 광섬유 케이블 등이 있고 일반적으로 우리가 접하는 랜선(UTP)이다.
<!--more-->
## 물리계층은 무엇인가?::what-is-physical-layer

물리 계층은 OSI 7계층 중 가장 하위 계층으로, 데이터를 전송하는 데 사용되는 하드웨어 장치와 전송 매체를 다룬다.
양끝 장치에서 전기 또는 빛을 이용해 데이터를 전달하며 데이터 전송의 물리적인 부분을 담당한다.

## 데이터 전송 방식::data-transfer-method

일반적으로 물리 계층은 이진 데이터를 전기신호 또는 빛 신호로 전달한다. 각 전송매체 마다 다르며 이는 아래와 같다:

* **유선 매체**: 전기 신호를 사용하는 유선 매체로는 전화선, 케이블, 광섬유 케이블 등이 있다.
* **무선 매체**: 무선 매체로는 라디오파, 마이크로파, 적외선, 블루투스, Wi-Fi 등이 있다.

이더넷을 기준으로 예를 들면, 이더넷은 랜선(UTP)위에서 전달되며, 전기신호를 사용한다.
전기신호는 [Bit](/wiki/bit)로 표현되며, 0과 1로 이루어진 데이터를 전달한다.

![UTP 케이블](/post/network/physical-layer/utp-cable.png)
: { "align": "center", "max-width": "400px", "description": "UTP 케이블" }

>UTP는 **U**nshielded **T**wisted **P**air의 약자로, 피복이 있는 작은 구리선들이 두 개씩 묶여 있는 케이블이다.
: { "type": "note", "icon": "info" }

각 페어로 데이터를 전송하거나 수신할 수 있는데 이는 아래와 같다:

## 전송 매체별 역할::role-of-transmission-media

[LAN]() 케이블은 총 8개의 회선이며,  4개의 페어로 구성되어 있다.

이더넷 규격별 특징은 아래와 같다:

1. 10BASE-T
   * 속도: 각 페어당 10Mbps
   * 변조방식: 멘체스터 인코딩(Manchester Encoding)
   * 사용페어: 2쌍만 사용
     * 1,2번 페어: 데이터 전송(TX)
     * 3,6번 페어: 데이터 수신(RX)
     * 4, 5번 & 7,8번 페어: 미사용
2. 100BASE-TX
   * 속도: 각 페어당 100Mbps
   * 변조방식: MLT-3(4B/5B 인코딩 포함) 
   * 사용페어: 2쌍만 사용
     * 1,2번 페어: 데이터 전송(TX)
     * 3,6번 페어: 데이터 수신(RX)
     * 4, 5번 & 7,8번 페어: 미사용
3. 1000BASE-T
   * 속도: 각 페어당 250Mbps *4 = 총 1Gbps
   * 변조방식: PAM-5(4B/5B 인코딩 포함)
   * 사용페어: 4쌍 모두 사용
     * 모든 페어가 양방향 통신
     * 각 페어가 송수신 동시 수행

![케이블 핀맵](/post/network/physical-layer/pin-map-of-cable.png)
: { "align": "center", "max-width": "600px", "description": "케이블 핀맵" }

## 데이터 처리::data-processing

물리 계층은 [데이터 링크 계층](/docs/network/data-link-layer)으로 받은 프레임을 트랜시버(Transceiver)를 이용해 비트 스트림으로 변환 및 직렬화하여 순차적으로 데이터를 전송한다.  
예: 10101110(1바이트) -> 1, 0, 1, 0, 1, 1, 1, 0(8비트)

이렇게 받은 비트들은 각 변조 방식으로 비트단위로 변조되어 전송된다.



