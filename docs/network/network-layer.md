---
layout: post
title: 네트워크 계층 (Network Layer)
tags: [Network, Network Layer, OSI, OSI 7 Layer, TCP/IP]
date: 2021-03-01 11:50:00
thumbnail: /post/network/network-layer/ip-packet-structure.png
profile-image: /post/profile/profile1.jpg
current-company: Cubic INC
current-position: SI Researcher
summary: 네트워크 계층
excerpt-separator: <!--more-->
hide: false
---
네트워크 계층은 OSI 7 Layer, L3로 IP 주소 지정 방식으로 데이터를 전송하는 계층이다.
주요 동작으로는 IP 패킷을 생성하고 목적지까지 라우팅을 처리한다.
<!--more-->
## 네트워크 계층이란?::what-is-network-layer

네트워크 계층은 OSI 7 Layer 중 3번째 계층으로, 데이터를 전송하는 데 사용되는 IP 주소 지정 방식을 사용한다.

주요 기능으로는 출발지에서 목적지까지 데이터를 전송하기 위한 최적의 경로를 결정한다. 
IP 주소를 이용하여 논리적 주소지정 방식을 사용하는데, 이는 네트워크 상의 장치를 고유하게 식별한다.

네트워크 계층에서는 데이터 전송시, [전송계층]()으로 부터 전달받은 데이터를 패킷으로 분할한다. 또한 들어온 패킷을 재조립하여 상위 계층으로 전달한다.

## 패킷 구조::packet-structure

![IP 패킷 구조](/post/network/network-layer/ip-packet-structure.png)
: { "align": "center", "max-width": "700px", "description": "IP 패킷 구조" }

IP 패킷은 크게 헤더와 페이로드로 구성되며 IP 패킷은 [데이터 링크 계층](/docs/network/data-link-layer) 프레임의 페이로드이다.

일반적으로 헤더는 20바이트이며 나머지는 옵션과 페이로드(세그먼트)이다.

* **Version**: IP 버전을 나타내며 4비트로 표현된다.(IPv4: 0b0100, IPv6: 0b0110)
* **IHL**(**I**nternet **H**eader **L**ength): IP 헤더 길이를 나타내며 4비트로 표현된다. (최소 20바이트, 최대 60바이트)
* **DSCP**(**D**ifferentiated **S**ervices **C**ode **P**oint): 패킷의 우선순위와 처리방식을 나타내며, 6비트로 표현된다.
  * 0에서 63까지의 값을 가질 수 있으며 각 값은 특정한 서비스 클래스를 나타낸다.
* **ECN**(**E**xplicit **C**ongestion **N**otification): 네트워크의 혼잡을 알리는데 사용되며, 2비트로 표현된다.
* **Total Length**: IP 패킷의 전체 길이를 나타내며, 16비트로 표현된다.
* **Identification**: 패킷의 식별자로 패킷 조각들을 구분하는데 사용되며, 16비트로 표현된다.
* **Flags**: 패킷 조각화를 나타내는데 사용되며, 3비트로 표현된다.
* **Fragment Offset**: 조각화된 패킷의 상대적 위치를 나타내며, 13비트로 표현된다.
* **Time to Live**: 패킷이 네트워크에서 살아있을 수 있는 시간을 나타내며, 8비트로 표현된다.
* **Protocol**: 패킷의 전송계층의 프로토콜(TCP:6, UDP:7)을 나타내며, 8비트로 표현된다.
* **Header Checksum**: 헤더의 오류를 검출하는데 사용되며, 16비트로 표현된다.
* **Source IP Address**: 출발지 IP 주소를 나타내며, 32비트로 표현된다.
* **Destination IP Address**: 목적지 IP 주소를 나타내며, 32비트로 표현된다.
* **Options**: 옵션 필드로, 0바이트에서 40바이트까지 가질 수 있다.
  * 옵션필드는 IHL 필드에 의해 길이를 알 수 있기 떄문에, Payload의 시작을 알 수 있다.


## 라우팅::routing

라우팅은 네트워크 계층에서 목적지까지 데이터를 전송하기 위한 최적의 경로를 결정하는 과정이다.
각 L3 계층은 IP 주소 기반 라우팅 테이블을 갖고 있고, 이를 이용해 패킷의 목적지를 결정한다.

```text::mac의 라우팅 테이블
netstat -nr
Routing tables

Internet:
Destination        Gateway            Flags               Netif Expire
default            192.168.0.1        UGScg                 en0       
127                127.0.0.1          UCS                   lo0       
127.0.0.1          127.0.0.1          UH                    lo0       
169.254            link#12            UCS                   en0      !
192.168.0          link#12            UCS                   en0      !
192.168.0.1/32     link#12            UCS                   en0      !
192.168.0.1        0:1d:ec:83:2b:37   UHLWIir               en0   1199
192.168.0.11       32:f2:70:c7:90:20  UHLWIi                en0    943
192.168.0.67/32    link#12            UCS                   en0      !
192.168.0.67       f2:af:d9:77:b1:a1  UHLWI                 lo0       
224.0.0/4          link#12            UmCS                  en0      !
224.0.0.251        1:0:5e:0:0:fb      UHmLWI                en0       
255.255.255.255/32 link#12            UCS                   en0      !
```

