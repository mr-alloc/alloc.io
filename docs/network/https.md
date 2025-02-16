---
layout: post
title: HTTPS (HyperText Transfer Protocol Secure)
tags: [Network, TCP/IP, HTTP]
date: 2021-03-29 17:03:00
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

반대로 암호화된 HTTPS 프로토콜을 사용하게 되면, 중간에 누군가가 정보를 가로채도 암호화된 정보를 해독하기 어렵기 때문에 안전하다.
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

![TLS 계층 구조](/post/network/https/tls-layer-structure.png)
:{ "align": "center", "max-width": "600px", "description": "TLS 계층 구조" }

현재까지 사용되는 TLS는 1.2버전과 1.3버전이 있으며, 1.3버전이 보안성이 더 높다.

>TLS는 크게 2가지 Record Protocol과 Handshake Protocol로 나뉘어지지만, 사실상 Handshake은 Record 위에서 동작한다.
:{ "type": "note", "icon": "info" }

## TLS 1.2 동작 과정::how-tls-1.2-works-in
실제 `TLS 1.3`의 경우 Extensions의 `supported_versions` 확장 필드를 통해 `TLS 1.3`을 지원한다는 것을 알린다.


### 1. Client Hello(TLS 1.2)::client-hello-in-tls-1.2

![Client Hello](/post/network/https/client-hello.png)
:{ "align": "center", "max-width": "500px", "description": "Client Hello" }

먼저 [TCP 연결](/docs/network/tcp-ip/transport-layer#tcp-3-way-handshake)이 이루어지면 TLS Handshake가 시작된다.
클라이언트는 서버에게 `Client Hello` 메세지를 보내어, 서버와의 통신을 시작한다.

![WireShark로 캡쳐된 Client Hello](/post/network/https/captured-client-hello.png)
:{ "align": "center", "max-width": "400px", "description": "WireShark로 캡쳐된 Client Hello" }

* **Version**: 클라이언트가 지원하는 TLS 버전 0x0303(TLS 1.2)
* **Cipher Suite**
  * **키 교환**, **인증**, **암호화**, **해시 알고리즘** 등을 포함한 암호화 알고리즘의 조합
  * ![Cipher Suite 스펙](/post/network/https/specification-of-cipher-suite.png)
* **Random**
  *`Random` 필드는 클라이언트가 생성한 난수를 포함한다. 이는 세션을 생성할 때 사용되는 값이다. 일반적으로 32[비트](/wiki/bit)의 난수를 생성한다.
* **Compression Method**:  `null(0x00) - 압축하지 않음`으로 설정되어 있지만, `DEFLATE(0x01) - ZLIB 압축`, `LSZ(0x40) - LZS 압축` 등이 있다.
* **Session ID**: 클라이언트가 생성한 세션 ID (재연결 시)
  * 이 값은 `TLS 1.2`에서만 사용되고, `TLS 1.3`에서는 `Legacy Session ID`로 변경 되었으며, 하위 호환성을 위해 유지되었지만, 실제로는 사용되지 않는다.
* **Extensions**
  * TLS 1.2의 경우 선택적으로 사용되는 확장 필드이며, `TLS 1.3`에서는 필수로 사용된다.
  * **supported_versiosn**: 클라이언트가 지원하는 TLS 버전을 나타내는 확장 필드
  * **key_share**: `supported_groups`에서 명시한 그룹들에 대한 클라이언트의 공개키 값들
    * `1-RTT` 핸드쉐이크를 위해 미리 키를 생성
  * **pre_shared_key(선택사항)**: 클라이언트가 서버와 공유한 세션 ID
    * `0-RTT` 핸드쉐이크를 위해 사용

>클라이언트가 Client Hello 메세지를 보내면, TCP 계층에서 메세지를 받자마자 ACK가 전송한다. 
>하지만 TLS 레벨에서는 하위계층(TCP)의 통신은 알수 없기 떄문에, ACK 전송을 기다리지 않고 Server Hello를 전송한다.   
: { "type": "note", "icon": "info" }

### 2. Server Hello::server-hello

![Server Hello](/post/network/https/server-hello.png)
:{ "align": "center", "max-width": "500px", "description": "Server Hello" }

서버는 클라이언트가 보낸 `Client Hello` 메세지를 받으면 클라이언트에게 `Server Hello` 메세지를 보낸다.
클라이언트에서 보낸 `Client Hello` 메세지를 통해 서버는 클라이언트가 지원하는 암호화 알고리즘을 확인하고, 서버에서 사용할 암호화 알고리즘을 선택한다.

>**Version**, **Cipher Suite**, **Random**, **Compression Method** 필드들은 `Client Hello`와 동일하다.
: { "type": "note", "icon": "info" }

### 3. Certificate::certificate

![TLS 1.2의 Certificate](/post/network/https/certificate-in-tls-1.2.png)
:{ "align": "center", "max-width": "500px", "description": "TLS 1.2의 Certificate" }

Certificate 메세지에는 인증서 체인이 포함되어 있으며 각 인증서에는 공개키가 포함되어 있다.
인증서는 [ASN.1](https://en.wikipedia.org/wiki/ASN.1)(**A**bstract **S**yntax **N**otation One) 형식으로 작성된다.

X.509 인증서의 v3 디지털 인증서는 다음과 같은 필드를 포함한다:

* Certificate
  * Version Number
  * Serial Number
  * Signature Algorithm ID
  * Issuer Name
  * Validity period
    * Not Before
  * Not After
  * Subject name
  * Subject Public Key Info
    * Public Key Algorithm
  * Subject Public Key
  * Issuer Unique Identifier (optional)
  * Subject Unique Identifier (optional)
  * Extensions (optional)
    * ...
* Certificate Signature Algorithm
* Certificate Signature

아무튼 각 인증서는 X.509 규격을 따르는데, 중요한 점은 이곳에 `공개키`와 `서명`이 포함되어 있다는 것이다.
`클라이언트`는 `Certificate` 메세지를 받으면, 인증서 체인에 대해 각 인증서를 검증한다.

```text
[서버 인증서] -> [중간 CA 인증서] -> [ROOT CA 인증서]
```

예를 들어 이러한 구조로 인증서 체인이 있다면, 클라이언트는 서버인증서의 기본 필드, 확장 필드, 서명을 검증한다.
각 인증서를 검증 하는 방법은 이래와 같다.

![인증서의 공개키 검증](/post/network/https/hilarious-certificate.png)
:{ "align": "center", "max-width": "400px", "description": "인증서의 공개키" }

1. 인증서에서 `Certificate` 부분의 `ASN.1 DER` 인코딩된 바이트 문자열을 `Certificate Signature Algorithm`값을 이용해 해싱한다.
2. 상위 인증서의 공개키로 `Certificate Signature`를 복호화하여 해시값을 얻는다.
3. 1번에서 얻은 해시값과 2번에서 얻은 해시값을 비교하여 인증서의 유효성을 검증한다.

>Root CA의 인증서는 자체 서명(Self-Signed) 인증서이며, **브라우저**는 대부분의 Root CA 인증서를 내장하고 있다. 
> 내장된 인증서 목록과 인증서 체인의 Root 인증서를 비교하여 검증한다. 
:{ "type": "tip", "icon": "lightbulb" }


![브라우저의 인증서 검증](/post/network/https/hilarious-verification.png)
:{ "align": "center", "max-width": "400px", "description": "무서운 브라우저의 인증서 검증" }

>이는 Root CA가 제공하는 인증서가 신뢰할 수 있는 인증서인지를 검증하는 과정이다.
: { "type": "warning", "icon": "info" }

### 3-5. Server Key Exchange::server-key-exchange

![Server Key Exchange](/post/network/https/server-key-exchange.png)
:{ "align": "center", "max-width": "500px", "description": "Server Key Exchange" }

`Server Key Exchage` 메세지는 일반적인 상황에서는 전송되지 않지만, `Server Hello` 메세지의 `Cipher Suite`가 임시 교환 알고리즘을 사용하는 경우 전송된다.

임시 키 알고리즘은 DHE(Diffie-Hellman Ephemeral) 또는 ECDHE(Elliptic Curve Diffie-Hellman Ephemeral) 등이 있다.

![WireShark로 캡쳐된 Server Key Exchange](/post/network/https/captured-server-key-exchange.png)
:{ "align": "center", "max-width": "400px", "description": "WireShark로 캡쳐된 Server Key Exchange" }

`Server Key Exchange` 메세지를 받은 클라이언트는 서명을 확인 하고, 임시 공개키를 저장한다. 그후 키교환에 필요한 자체 임시 키 생성을 준비한다.

### 4. Client Key Exchange::client-key-exchange

TLS에서 메세지를 암호화 하고 복호화 하려면 어떤 세션키가 있어야한다. 하지만 그 세션키를 만드려면 먼저 `Premaster Secret`이라는 값이 만들어져야 한다.

하지만, 이 값은 `Cipher Suite`의 키교환 알고리즘에 따라 만드는 방식이 제각각이다. 아래는 알고리즘별 차이를 설명한다.

![Client Key Exchange](/post/network/https/client-key-exchange.png)
:{ "align": "center", "max-width": "500px", "description": "Client Key Exchange" }

* **RSA**:
  * 클라이언트의 `Premaster Secret`는 48바이트 이다.
  * 맨 앞의 2바이트는 TLS 프로토콜 버전인 `0x0303 0x0303`을 넣는다.
  * 나머지 46바이트에는 암호학적으로 안전한 난수 생성기로 랜덤값을 생성하여 만든다.
* **DHE**
  * 암호학 적으로 안전한 난수 생성기로 -1~(p-1) 사이의 랜덤한 큰 정수로 **개인키 A**를 만든다.
  * g^A mod p(g: 생성자, p: 소수, A: 개인키)로 **공개키**를 만든다.
* **ECDHE**
  * 암호학 적으로 안전한 난수 생성기로 1~(곡선차수-1) 사이의 랜덤한 큰 정수로 **개인키**를 만든다.
  * 타원 곡선(EC)의 기준점(Generator Point)에 개인키를 [스칼라]() 곱셈하여 새로운 포인트 좌표(**공개키**)를 만든다.

각 키 교환 알고리즘 별 생성된 정보는 `Client Key Exchange` 메세지에 담겨 서버로 전송된다.

>RSA의 경우 `Premaster Secret`을 생성후 서버 인증서의 공개키로 암호화 하여 `Client Key Exchange` 메세지에 담아 전송한다.
: { "type": "tip", "icon": "lightbulb" }

**RSA**는 서버로 암호화 된 `Premaster Secret`을 전송하였다. 이는 서버에서 자신의 개인키로 복호화하여 `Premaster Secret`을 얻을수 있지만,
**DHE**, **ECDHE**는 서버의 공개키와 전달받은 클라이언트의 공개키로 `Premaster Secret`을 생성한다.


![서버와 클라이언트의 공개키로 Premaster Secret을 만든다.](/post/network/https/hilarious-process-from-making-premaster-secret.png)
:{ "align": "center", "max-width": "400px", "description": "서버와 클라이언트의 공개키로 Premaster Secret을 만든다." }











## TLS 1.3 동작 과정::how-tls-1.3-works-in

### 1. Client Hello(TLS 1.3)::client-hello-in-tls-1.3

![Client Hello](/post/network/https/client-hello.png)
:{ "align": "center", "max-width": "500px", "description": "Client Hello" }

먼저 [TCP 연결](/docs/network/tcp-ip/transport-layer#tcp-3-way-handshake)이 이루어지면 TLS Handshake가 시작된다.
클라이언트는 서버에게 `Client Hello` 메세지를 보내어, 서버와의 통신을 시작한다.

![WireShark로 캡쳐된 Client Hello](/post/network/https/captured-client-hello.png)
:{ "align": "center", "max-width": "400px", "description": "WireShark로 캡쳐된 Client Hello" }

**Version**

`Version` 필드는 `TLS 1.2`, `TLS 1.3` 모두 `0x0303(TLS 1.2)`으로 설정 되어있다.
**Cipher Suite**

`Cipher Suite`는 클라이언트가 지원하는 암호화 알고리즘을 나타낸다. `TLS 1.2`에서 `TLS 1.3`으로 넘어오면서 암호화 알고리즘의 종류가 달라졌다.
* TLS 1.2: **키 교환**, **인증**, **암호화**, **해시 알고리즘**을 모두 포함
  * 예: `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`
* TLS 1.3: **암호화**와 **해시 알고리즘**만 포함
  * 예: `TLS_AES_128_GCM_SHA256`

>TLS 1.2에서 사라진 키 교환 및 인증 알고리즘은 Extensions 필드의 `key_share`와 `signature_algorithms` 확장 필드로 대체되었다.
: { "type": "tip", "icon": "lightbulb" }

`WireShark로 캡쳐된 Client Hello` 이미지에 보여진 것과 같이 `Cipher Suite`는 클라이언트가 지원하는 여러 알고리즘이 나와있다.
예: `TLS_AES_128_GCM_SHA256`, `TLS_AES_256_GCM_SHA384`, `TLS_CHACHA20_POLY1305_SHA256` 등등...

![Cipher Suite 스펙](/post/network/https/specification-of-cipher-suite.png)
:{ "align": "center", "max-width": "400px", "description": "Cipher Suite 스펙" }

`Cipher Suite`의 각 자리 별 의미는 위와 같다.

**Random**

`Random` 필드는 클라이언트가 생성한 난수를 포함한다. 이는 세션을 생성할 때 사용되는 값이다. 일반적으로 32[비트](/wiki/bit)의 난수를 생성한다.

* **Compression Method**: 클라이언트가 지원하는 압축 방식

일반 적으로 취약점 문제 때문에 `TLS 1.2`, `TLS 1.3` 모두 `null(0x00) - 압축하지 않음`으로 설정되어 있지만,
`DEFLATE(0x01) - ZLIB 압축`, `LSZ(0x40) - LZS 압축` 등이 있다.

>압축 방식은 `TLS 1.3`에서는 제거되었다.
:{ "type": "caution", "icon": "x-circle" }

* **Session ID**: 클라이언트가 생성한 세션 ID (재연결 시)
* 이 값은 `TLS 1.2`에서만 사용되고, `TLS 1.3`에서는 `Legacy Session ID`로 변경 되었으며, 하위 호환성을 위해 유지되었지만, 실제로는 사용되지 않는다.

**Extensions**

TLS 1.2의 경우 선택적으로 사용되는 확장 필드이며, `TLS 1.3`에서는 필수로 사용된다.
* **supported_versiosn**: 클라이언트가 지원하는 TLS 버전을 나타내는 확장 필드
* **key_share**: `supported_groups`에서 명시한 그룹들에 대한 클라이언트의 공개키 값들
  * `1-RTT` 핸드쉐이크를 위해 미리 키를 생성
* **pre_shared_key(선택사항)**: 클라이언트가 서버와 공유한 세션 ID
  * `0-RTT` 핸드쉐이크를 위해 사용

>클라이언트가 Client Hello 메세지를 보내면, TCP 계층에서 메세지를 받자마자 ACK가 전송한다.
>하지만 TLS 레벨에서는 하위계층(TCP)의 통신은 알수 없기 떄문에, ACK 전송을 기다리지 않고 Server Hello를 전송한다.
: { "type": "note", "icon": "info" }

### 2. Server Hello::server-hello-in-tls-1.3

![Server Hello](/post/network/https/server-hello.png)
:{ "align": "center", "max-width": "500px", "description": "Server Hello" }

서버는 클라이언트가 보낸 `Client Hello` 메세지를 받으면 클라이언트에게 `Server Hello` 메세지를 보낸다.
클라이언트에서 보낸 `Client Hello` 메세지를 통해 서버는 클라이언트가 지원하는 암호화 알고리즘을 확인하고, 서버에서 사용할 암호화 알고리즘을 선택한다.

>**Version**, **Cipher Suite**, **Random**, **Compression Method** 필드들은 `Client Hello`와 동일하다.
: { "type": "note", "icon": "info" }

#### 2-5. Encrypted Extensions::encrypted-extensions-in-tls-1.3

이 메세지는 `TLS 1.3`에서 추가된 메세지로, `Server Hello` 이후에 클라이언트에 전송된다.

`Server Hello`에서 `Extensions` 필드는 확장에 필요한 정보를 포함하지만, 모든 정보가 있는것이 아니다.
평문으로 보낼수 없는 `Extensions` 정보들은 `Server Hello`에서 선택된 `Cipher Suite`으로  암호화 하면, 그것이 `Encrypted Extensions`이다.

이 프로토콜에서는 다음과같은 확장 필드들이 포함된다:

* **supported_groups**: 클라이언트가 지원하는 그룹을 나타내는 목록
* **application_layer_protocol_negotiation (ALPN)**: 클라이언트가 지원하는 프로토콜 목록 (HTTP/1.1, HTTP/2, HTTP/3 등)
* **server_name (SNIndication)**: 여러 도메인을 호스팅하는 서버에서 클라이언트가 요청한 도메인
* **signature_algorithms**: 클라이언트가 지원하는 인증서의 서명과 디지털 서명을 검증할 때 사용 할 알고리즘 목록
* **compress_certificate**: 인증서 압축 지원 여부와 지원하는 압축 알고리즘
* **record_size_limit**: 클라이언트가 지원하는 최대 TLS 레코드 크기

>**Encrypted Extensions**는 `TLS 1.3`에서만 사용되며, `TLS 1.2`에서는 사용되지 않는다.
: { "type": "note", "icon": "info" }

### 3. Certificate::certificate-in-tls-1.3




