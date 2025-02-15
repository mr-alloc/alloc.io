---
layout: post
title: HTTP (HyperText Transfer Protocol)
tags: [Network, TCP/IP, HTTP]
date: 2021-03-19 13:22:00
thumbnail: /post/network/http/index.png
profile-image: /post/profile/profile1.jpg
current-company: Cubic INC
current-position: SI Researcher
summary: HTTP
excerpt-separator: <!--more-->
hide: false
---
HTTP는 HyperText Transfer Protocol의 약자로, 웹 서버와 웹 클라이언트 간의 통신을 위한 프로토콜이다.
TCP 위에서, 요청/응답 방식으로 동작한다.
<!--more-->
## HTTP란?::what-is-http

**HTTP**(HyperText Transfer Protocol)는 웹 서버와 웹 클라이언트 간의 통신을 위한 프로토콜이다.
기본적으로 클라이언트가 서버에 요청을 보내고, 서버는 요청에 대한 응답을 보내는 방식으로 동작한다.

![HTTP 통신](/post/network/http/index.png)
:{ "align": "center", "max-width": "400px", "description": "HTTP 통신" }

HTTP의 일반적인 동작은 이미지처럼  [TCP](/docs/network/tcp-ip/transport-layer#tcp-3-way-handshake) 위에서 수행된다.
이미 연결이 맺어졌다는 가정하에, 메세지를 교환하는 방식이다.

각 장치에서는 TCP 세그먼트의 페이로드를 HTTP 메세지로, 표준화된 규격에 맞게 해석하여 처리한다.
[HTTP/1.1](https://www.rfc-editor.org/info/rfc2616)은 1999년에 표준화되었으며, 현재는 [HTTP/2](https://www.rfc-editor.org/info/rfc7540) 등 상위 버전도 나와있다.

## HTTP 메세지 구조::message-structure

HTTP는 상태가 없는(Stateless) 프로토콜이기 떄문에 서버에서 이전 요청들의 상태를 저장하지 않는다. 
메세지는 크게 요청(Request) 메세지와 응답(Response) 메세지로 나뉘며 각 메세지는 표준 규격을 따른다.

### 요청 메세지::request-message

![HTTP 요청 메세지](/post/network/http/request-format.png)
:{ "align": "center", "max-width": "600px", "description": "HTTP 요청 메세지" }

HTTP 메세지는 요청 라인, 헤더, 본문으로 구성된다. 예제에서는 이해를 위해 요청 라인과 헤더를 알아보자.

*Request Line*

* **Method**: 요청 방식을 나타낸다. (GET, POST, PUT, DELETE 등)
* **Request-URI**: 요청 대상의 리소스를 나타낸다.
* **Protocol**: HTTP 프로토콜의 버전을 나타낸다.

요청 라인에서는 클라이언트가 요청하는 리소스에 대하여 어떤 방식으로 요청하는지 와 어떤 프로토콜의 버전으로 처리에 대해 요청하는지를 나타낸다. 

*Header*

* **Host**: 요청 대상의 호스트를 나타낸다.
* **User-Agent**: 요청을 보내는 클라이언트의 정보를 나타낸다.
* **Accept**: 클라이언트가 받아들일 수 있는 컨텐츠 타입을 나타낸다.
* **Content-Type**: 요청 본문의 타입을 나타낸다.
* **Content-Length**: 요청 본문의 길이를 나타낸다.

헤더에서는 클라이언트가 요청하는 리소스에 대하여 추가적인 정보를 담고 있다. 
이미지에서는 일부 헤더가 생략 되었지만, 실제로 Content-Length 같이 요청의 끝을 알 수 없어 메세지 해석이 어려운 경우 TCP 연결종료 끝을 판단한다.
따라서 대부분은 HTTP 클라이언트는 기본적인 헤더를 포함되게 되어있다.


### 응답 메세지::response-message

![HTTP 응답 메세지](/post/network/http/response-format.png)
:{ "align": "center", "max-width": "600px", "description": "HTTP 응답 메세지" }

HTTP 응답 메세지는 상태 라인, 헤더, 본문으로 구성된다. 예제에서는 이해를 위해 상태 라인과 헤더를 알아보자.

*Status Line*

* **Protocol**: HTTP 프로토콜의 버전을 나타낸다.
* **Status-Code**: 요청에 대한 응답 상태 코드를 나타낸다.
  * | 전체 범위 | 정의된 범위 | 분류 |
    |:---:|:---:|:---:|
    | 1xx | 100 ~ 101 | 정보 |
    | 2xx | 200 ~ 206 | 성공 |
    | 3xx | 300 ~ 305 | 리다이렉션 |
    | 4xx | 400 ~ 415 | 클라이언트 에러 |
    | 5xx | 500 ~ 505 | 서버 에러 |
* **Reason-Phrase**: 상태 코드에 대한 설명을 나타낸다.
  * | 상태 코드 | 사유 구절 | 의미 |
    |:---:|:---:|:---:|
    | 200 | OK | 요청이 성공적으로 처리되었음 |
    | 404 | Not Found | 요청한 리소스를 찾을 수 없음 |
    | 500 | Internal Server Error | 서버 내부 에러로 요청을 처리할 수 없음 |

상태 라인에서는 서버가 클라이언트에게 응답하는 상태 코드와 그에 대한 설명을 나타낸다.  

상태 코드는 [RFC9110](https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes)에 정의되어 있으며, 상태 코드에 따라 클라이언트는 어떻게 처리해야 하는지 알 수 있다.
이는 사유구절과 한개의 상태 정보로 사용된다. 

*Header*

* **Server**: 서버의 정보를 나타낸다.
* **Content-Type**: 응답 본문의 타입을 나타낸다.
* **Content-Length**: 응답 본문의 길이를 나타낸다.
* **Date**: 응답을 보낸 시간을 나타낸다.
* **Connection**: 클라이언트와 서버의 연결 상태를 나타낸다.

## 메세지 본문::message-body

![HTTP 메세지 전문](/post/network/http/http-message.png)
:{ "align": "center", "max-width": "600px", "description": "HTTP 메세지 전문" }

`HTTP` 메세지의 **요청라인과 상태라인 그리고 헤더**가 메세지에 대한 설정 정보라면 본문은 실제 데이터를 담고 있는 부분이다.

HTTP 메세지 해석시 본문을 알기 위해서는, 메세지 전체를 볼 필요가있다. 
먼저 메세지 시작을 알기위해 `Header`와 `Body`를 구분하는 개행이 필요하다. http 메세지는 표준 스트림으로 읽기 때문에 끝을 알수가 없다.

따라서 메세지 헤더의 `Content-Length`를 통해 본문의 길이를 알 수 있으며, 이를 통해 본문의 끝을 알 수 있다.

이미지에는 요청 본문이 `application/x-www-form-urlencoded`형식으로 되어있고, 응답 본문에는 `application/html`형식으로 되어있는걸 알 수 있다.
메세지를 받는 대상이 올바르게 해석할 수 있도록 `Content-Type`을 통해 본문의 타입을 알려준다.


## HTTP Header Options::header-options

HTTP는 TCP 위에서 동작하기 때문에, HTTP 헤더 옵션으로 TCP의 기능을 사용할 수 있다.
예를 들어 `Keep-Alive` 헤더는 특정 시간동안 요청의 세션을 재사용할 수 있도록 지원한다.  

### Keep-Alive::keep-alive

`Keep-Alive`는 TCP 스펙의 지속 연결(`Persistent Connection`)을 이용하여, 클라이언트와 서버간의 연결을 유지하는 기능이다.

```http
GET /index.html HTTP/1.1
Host: www.example.com
Connection: Keep-Alive
Keep-Alive: timeout=60, max=1000
...
```

![Keep-Alive](/post/network/http/keep-alive.png)
:{ "align": "center", "max-width": "400px", "description": "Keep-Alive를 1분으로 설정" }

예를 들어 위와 같이 `Connection`은 `Keep-Alive`로 설정되어 있고, `Keep-Alive` 헤더에는 `timeout`과 `max`를 설정하였다.
이 경우 60초 동안 세션을 유지하고, 최대 1000개의 요청을 처리할 수 있으며 둘 중 하나가 먼저 도달하면 세션을 종료한다.

> 이렇게 지원되는 `Keep-Alive`는 세션 계층으로서의 구현이다.
: { "type": "note", "icon": "info" }
