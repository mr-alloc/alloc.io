---
layout: post
title: 전송 계층 (Transport Layer)
tags: [Network, Transport Layer, OSI, OSI 7 Layer, TCP/IP]
date: 2021-03-04 13:22:00
thumbnail: /post/network/tcp-ip/transport-layer/tcp-segment-structure.png
profile-image: /post/profile/profile1.jpg
current-company: Cubic INC
current-position: SI Researcher
summary: 전송 계층
excerpt-separator: <!--more-->
hide: false
---
전송 계층은 OSI 7 Layer 모델에서 L4에 구현되며, TCP와 UDP 프로토콜을 사용하며, 각 프로토콜에 맞게 필요한 처리를 제공한다.
<!--more-->
## 전송 계층이란?::what-is-transport-layer

L4는 송신자와 수신자 간의 데이터 전송을 관리하며, 종단 간(End-to-End) 통신을 제공한다.
포트번호를 이욜하기 때문에, 특정 어플리케이션이나 프로세스를 식별 할 수 있다.

여러 프로토콜중에는 `QUIC`, `RUDP`, `DCCP`, `SCTP` 등이 있지만, 대표적으로는 `TCP`와 `UDP`가 있다. 
L4는 운영체제 커널에 구현되며 네트워크 통신의 핵심으로서 데이터의 신뢰성, 전송 속도, 어플리케이션 식별을 담당한다.

## UDP 데이터그램 구조::datagram-structure

![UDP 데이터그램 구조](/post/network/tcp-ip/transport-layer/udp-datagram-structure.png)
: { "align": "center", "max-width": "700px", "description": "UDP 데이터그램 구조" }

**UDP**(User Datagram Protocol)는 전송 계층 프로토콜로, 데이터그램 방식으로 데이터를 전송한다.

비연결형 데이터그램 프로토콜로 간단하고 빠른 데이터 전송을 위한 프로토콜이다.
연결에 대한 설정과 TCP 3way handshake 과정이 없기 때문에 오버헤드 없이 빠른 전송이 가능하다.

때문에, 데이터 전송의 신뢰성은 보장하지 않지만, 실시간 스트리밍이나 DNS 등에서 사용된다.


## TCP 세그먼트 구조::segment-structure

![TCP 세그먼트 구조](/post/network/tcp-ip/transport-layer/tcp-segment-structure.png)
: { "align": "center", "max-width": "700px", "description": "TCP의 세그먼트 구조" }

**TCP**(Transmission Control Protocol)는 전송 계층 프로토콜로, 연결형 프로토콜로 데이터를 전송한다.

각 필드는 다음을 의미한다:

* **Source Port**: 송신지의 포트 번호
* **Destination Port**: 수신지의 포트 번호
* **Initial Sequence Number**: TCP 연결의 첫번째 패킷에 할당된 시퀀스 번호를 의미 (SYN)
* **Acknowledgment Number**: 연결시에는 ISN +1, 실제 데이터 수신시에는 + 데이터 크기 (Bytes Size)
* **Data Offset**: TCP 헤더의 길이를 4바이트 단위로 표현한 값
  * 이 필드는 Option 필드를 포함한 헤더의 길이를 계산하기 위해 사용된다. 
  * 32비트 체계에서 1 word는 4바이트이므로 4비트로 표현할 수 있는 값인 0000 ~ 1111은 0 ~ 15를 의미하고 이에 *4를 하여 0 ~ 60바이트라는 의미이다.
  * 하지만 TCP 헤더의 필수 표현 값이 20바이트이므로 최소 20(01000) ~ 최대 60(1111)이다.
*  **Reserved**: 예약된 필드로, 사용되지 않는다.
* **Flags**: TCP 제어플레그이다. (여기서는 필수 플래그만 다룬다.)
    * **SYN**(Synchronize Sequence Number): 세션 생성시 시퀀스 번호 동기화를 위한 세그먼트를 의미한다.
    * **ACK**(Acknowledgment): Acknowledgment Number 필드가 유효한 값을 가지고 있음을 의미한다.
    * **FIN**(Finish): 세션 종료 요청의 세그먼트를 의미한다.
* **Window Size**: 수신자가 수신할 수 있는 데이터의 양을 의미한다. (수신측, 발신측 모두 다음에 받게될 세그먼트에 대하여 자신의 버퍼상태를 포함한다.)
* **Checksum**: TCP 세그먼트의 오류 검출을 위한 필드로, 세그먼트의 데이터를 포함한 모든 필드의 체크섬을 계산하여 저장한다.
* **Urgent Pointer**: 긴급 데이터의 마지막 바이트를 가리키는 포인터이다.


## TCP 3-way Handshake::tcp-3-way-handshake

`TCP`는 연결 지향형 프로토콜이기 때문에, 연결에 대한 신뢰성을 보장하기위해 핸드쉐이크(악수)라는 개념을 사용한다.
핸드쉐이크는 말그대로 세션 연결을 하기전에, 상대방과의 연결을 확인하는 과정이다.

핸드쉐이크는 `SYN`, `SYN + ACK`, `ACK` 세그먼트를 통해 3가지의 과정으로 이루어져서 `3-way Handshake`라고 불린다.

### SYN::synchronize

![클라이언트에서 연결을 맺기위해 SYN을 보낸다.](/post/network/tcp-ip/transport-layer/syn-diagram-in-tcp.png)
: { "align": "center", "max-width": "400px", "description": "SYN 전송" }

예를 들어 `:58660` **클라이언트**에서 `:8955` **서버**로 세션을 맺기 위해 다음과같이 요청을 보낸다.

기본적으로 아무 연결을 맺지 않은 상태는 `Closed` 상태이다. 서버는 요청을 수신하기위해 `Listen` 상태로 대기한다. 
제일 먼저 발신지에서는 목적지로 세션을 맺기위해 `SYN` 세그먼트를 전송한다.

![WireShark로 캡쳐된 SYN 세그먼트](/post/network/tcp-ip/transport-layer/captured-segment-of-syn.png)
: { "description": "WireShark로 캡쳐된 SYN 세그먼트" }

위 이미지는 `WireShark`로 캡쳐된 `SYN` 세그먼트이다.
클라이언트에서 서버로 `4248590219`라는 임의의 시퀀스 번호를 가진 `SYN` 세그먼트를 전송 하는 모습을 볼 수 있다.

이때 서버의 상태는 `SYN_SENT` 상태이다.

### SYN + ACK::synchronize-acknowledgment

![서버에서는 연결을 수락하기 위해 SYN+ACK를 보낸다.](/post/network/tcp-ip/transport-layer/syn+ack-diagram-in-tcp.png)
: { "align": "center", "max-width": "400px", "description": "SYN + ACK 전송" }

서버는 클라이언트로부터 `SYN` 세그먼트를 받으면, 세션을 맺기위해 `SYN + ACK` 세그먼트를 전송한다.
이는 연결수락을 의미하는 세그먼트이다.

![WireShark로 캡쳐된 SYN + ACK 세그먼트](/post/network/tcp-ip/transport-layer/captured-segment-of-syn+ack.png)
: { "description": "WireShark로 캡쳐된 SYN + ACK 세그먼트" }

서버는 정확하게 `SYN`의 ISN +1을 `ACK`로 전송을 한것이 보인다. 
서버는 `1595116508`이라는 SYN을 보내며, 이때 서버의 상태는 `SYN_RECV` 상태이다.

>클라이언트의 ISN인 `4248590219`에 `1`을 더한 `4248590220`을 `ACK`로 전송한것을 확인할 수 있다.
: { "type": "note", "icon": "info" }

### ACK::acknowledgment

![클라이언트에서는 서버의 응답을 확인하기 위해 ACK를 보낸다.](/post/network/tcp-ip/transport-layer/ack-diagram-in-tcp.png)
: { "align": "center", "max-width": "400px", "description": "ACK 전송" }

클라이언트는 SYN + ACK 세그먼트를 받으면, 세션을 맺기위해 `ACK` 세그먼트를 전송한다.

![WireShark로 캡쳐된 ACK 세그먼트](/post/network/tcp-ip/transport-layer/captured-segment-of-ack.png)
: { "description": "WireShark로 캡쳐된 ACK 세그먼트" }

클라이언트는 서버의 ISN +1을 `ACK`로 전송하며, 이때 클라이언트의 상태는 `ESTABLISHED` 상태이다.

>서버의 ISN인 `1595116508`에 `1`을 더한 `1595116509`을 `ACK`로 전송한것을 확인할 수 있다.
: { "type": "note", "icon": "info" }

### 데이터 전송::data-send

![서버와 클라이언트는 데이터를 전송한다.](/post/network/tcp-ip/transport-layer/data-send-diagram-in-tcp.png)
: { "align": "center", "max-width": "400px", "description": "데이터 전송" }

`ACK`로 세션이 맺어지는 순간부터 데이터를 전송할 수 있고, 데이터를 전송할 때마다 `ACK`를 받아야 한다.
이는 수신측과 발신측 모두에 해당되는 내용이다.

![WireShark로 캡쳐된 데이터 전송 세그먼트](/post/network/tcp-ip/transport-layer/captured-segment-of-data.png)
: { "description": "WireShark로 캡쳐된 데이터 전송 세그먼트" }

위 네 개의 각 세그먼트는 클라이언트와 서버가 데이터를 주고받는 과정을 보여준다.
[HTTP]()는 `요청/응답` 방식이기 때문에 위처럼 클라이언트가 요청을 보내고, 서버가 응답을 보내는 방식으로 동작한다.

그렇기 때문에 `1`번에서 클라이언트가 `GET /greeting`을 요철 했을 때 `2`번 서버가 ACK를 보내는 것을 볼 수 있다.
반대로 서버가 `3`번에서 `200 OK`를 응답하면, 클라이언트가 `4`번에서 ACK를 보내는 것을 확인할 수 있다.

>요청/응답 구조는 HTTP 스펙이므로 TCP 기준으로만 봤을때는 데이터 전송에대한 응답으로 ACK를 보내는 것이다.
:{ "type": "important", "icon": "warning-octagon" }


### FIN::finish

연결 종료를 위한 통신과정은 `4-way Handshake`로 이루어 지며, `FIN`, `ACK`, `FIN`, `ACK` 세그먼트를 통해 처리된다.
`FIN`은 세션을 종료하기 위헤 보내는 세그먼트이다.

![클라이언트와 서버는 세션을 종료하기위해 FIN을 보낸다.](/post/network/tcp-ip/transport-layer/fin-diagram-in-tcp.png)
: { "align": "center", "max-width": "400px", "description": "FIN 전송" }

위의 이미지와 보는 보와 같이 세션이 연결 중인 상태(`ESTABLISHED`)에서 연결을 종료가 필요한 장치에서 `FIN` 세그먼트를 전송한다.
실제로는 서버와 클라이언트 어디쪽에서든지 먼저 연결종료 요청을 할수 있지만, 여기서는 클라이언트가 먼저 `FIN` 세그먼트를 전송하였다.

1. 클라이언트에서 연결종료를 위해 서버로 `FIN` 세그먼트로 전송하며, 이때 클라이언트의 상태는 `FIN_WAIT_1` 상태이다.
2. 서버는 `FIN` 세그먼트를 받으면, `ACK` 세그먼트로 응답을 전송하며, 이때 서버의 상태는 `CLOSE_WAIT` 상태이다.
3. 서버가 연결종료에 대한 준비를 모두 끝낸후 클라이언트에게 `FIN` 세그먼트를 전송하며, 이때 서버의 상태는 `LAST_ACK` 상태이다.
4. 클라이언트는 `FIN` 세그먼트를 받으면, `ACK` 세그먼트로 응답을 전송하며, 이때 클라이언트의 상태는 `TIME_WAIT` 상태이다.
5. 클라이언트는 `TIME_WAIT` 상태에서 `2MSL(Maximum Segment Lifetime)` 시간동안 대기하고, 이후에 연결이 종료되며, 이때 클라이언트의 상태는 `CLOSED` 상태이다.


>TCP는 연결의 신뢰성을 보장하기 위해서는 많은 네트워크 비용이 필요하다.
: { "type": "important", "icon": "warning-octagon" }
