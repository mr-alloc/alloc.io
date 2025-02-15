---
layout: post
title: HTTPS (HyperText Transfer Protocol Secure)
tags: [Network, TCP/IP, HTTP]
date: 2021-03-19 13:22:00
thumbnail: /post/network/http/index.png
profile-image: /post/profile/profile1.jpg
current-company: Cubic INC
current-position: SI Researcher
summary: HTTPS
excerpt-separator: <!--more-->
hide: false
---
HTTPS(HyperText Transfer Protocol Secure)는 전송 계층에서 데이터를 암호화하여 보안을 강화한 프로토콜이다.
<!--more-->
## HTTPS란?::what-is-https

**HTTPS**(HyperText Transfer Protocol Secure)는 HTTP의 보안 버전으로, 전송 계층에서 데이터를 암호화하여 보안을 강화한 프로토콜이다.
기본 HTTP 프로토콜은 암호화되지 않은 텍스트로 통신하기 때문에, 중요한 정보를 주고 받을 때 보안에 취약하다.

![암호화 되지 않은 정보 전송](/post/network/https/http-without-encrypt.png)
:{ "align": "center", "max-width": "400px", "description": "암호화 되지 않은 정보 전송" }

예를 들어 어떤 사이트에 가입하려고 할 때, 계정 정보를 암호화 없이 전송하게 된다면, 중간에 누군가가 정보를 가로채어 악용할 수 있다.
인증서는 도메인을 기반으로 발급되기 때문에 `http://...`으로 접속한 경우 다른 사이트로 리다이렉트되어 악용될 수 있다. 

![암호화 된 정보 전송](/post/network/https/http-with-encrypt.png)
:{ "align": "center", "max-width": "400px", "description": "암호화 된 정보 전송" }

반대로 암호화된 HTTPS 프로토콜을 사용하게 되면, 중간에 누군가가 정보를 가로채도 암호화된 정보를 해독할 수 없기 때문에 안전하다.
또한 이 암호화의 간격이 짧아서, 암호화된 정보를 해독하는데 많은 시간이 소요되어 보안성이 높다.

## HTTPS 동작 방식::how-https-work

HTTPS는 [전송 계층](/docs/network/tcp-ip/transport-layer)과 **응용계층** 사이에서 동작 하기 때문에, 응용 계층의 구현과 상관없이 사용이 가능하다.

흔히 **SSL**(Secure Socket Layer) 또는 **TLS**(Transport Layer Security)이라고 불리우는 프로토콜을 사용하여 데이터를 암호화한다.
두 가지다 같은 내용이지만, 아래와 같이 구분된다:

* **SSL**
  * 넷스케이프(Netscape)에서 개발한 프로토콜
  * 1.0: 공개된적 없음 (Netscape 내부에서만 사용)
  * 2.0: 1995년 공개 (심각한 보안 취약점 존재로 2011년 공식 사용중단)
  * 3.0: 1996년 공개 (현재도 사용중이지만, 취약점 존재, 2015년 공식 사용 중단)
* **TLS**
  * IETF(Internet Engineering Task Force)에서 개발한 프로토콜
  * 1.0: 1999년 공개 (취약점 존재)
  * 1.1: 2006년 공개 (취약점 보완)
  * 1.2: 2008년 공개 (현재 사용중)
  * 1.3: 2018년 공개 (현재 사용중)

## HTTPS 동작 과정::how-https-works

![TLS 계층 구조](/post/network/https/tls-layer-structure.png)
:{ "align": "center", "max-width": "600px", "description": "TLS 계층 구조" }

현재까지 사용되는 TLS는 1.2버전과 1.3버전이 있으며, 1.3버전이 보안성이 더 높다.
`HTTPS`의 동작 과정을 알아보면서, 1.2 버전과 1.3버전의 차이점도 같이 공부해보자.

>TLS는 크게 2가지 Record Protocol과 Handshake Protocol로 나뉘어지지만, 사실상 Handshake은 Record 위에서 동작한다.
: { "type": "note", "icon": "info" }

### 1. Client Hello::client-hello

![Client Hello](/post/network/https/client-hello.png)
:{ "align": "center", "max-width": "500px", "description": "Client Hello" }

먼저 [TCP 연결](/docs/network/tcp-ip/transport-layer#tcp-3-way-handshake)이 이루어지면 TLS Handshake가 시작된다.
클라이언트는 서버에게 `Client Hello` 메세지를 보내어, 서버와의 통신을 시작한다.

**Version**

`Version` 필드는 `TLS 1.2`, `TLS 1.3` 모두 `0x0303(TLS 1.2)`으로 설정 되어있다. 
실제 `TLS 1.3`의 경우 `supported_versions` 확장 필드를 통해 `TLS 1.3`을 지원한다는 것을 알린다.

**Cipher Suite**

`Cipher Suite`는 클라이언트가 지원하는 암호화 알고리즘을 나타낸다. `TLS 1.2`에서 `TLS 1.3`으로 넘어오면서 암호화 알고리즘의 종류가 달라졌다.
* TLS 1.2: **키 교환**, **인증**, **암호화**, **해시 알고리즘**을 모두 포함
  * 예: `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256` 
* TLS 1.3: **암호화**와 **해시 알고리즘**만 포함
  * 예: `TLS_AES_128_GCM_SHA256` 

**Random**

`Random` 필드는 클라이언트가 생성한 난수를 포함한다. 이는 세션을 생성할 때 사용되는 값이다. 일반적으로 32[비트](/wiki/bit)의 난수를 생성한다.

* **Compression Method**: 클라이언트가 지원하는 압축 방식

일반 적으로 취약점 문제 때문에 `TLS 1.2`, `TLS 1.3` 모두 `null(0x00) - 압축하지 않음`으로 설정되어 있지만, 
`DEFLATE(0x01) - ZLIB 압축`, `LSZ(0x40) - LZS 압축` 등이 있다. 

* **Session ID**: 클라이언트가 생성한 세션 ID (재연결 시)

### 2. Server Hello::server-hello


