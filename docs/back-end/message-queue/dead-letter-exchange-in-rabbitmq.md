---
layout: post
title: Dead Letter Exchange
tags: [ Message Queue, RabbitMQ, Dead Letter Exchange ]
date: 2025-08-27 18:14:00
thumbnail: /post/back-end/message-queue/dead-letter-exchange-in-rabbitmq/index.png
current-company: NEOWIZ
current-position: Software Engineer
summary: RabbitMQ의 DLX란 무엇일까?
excerpt_separator: <!--more-->
hide: false
---
RabbitMQ는 다양한 failover 메커니즘을 구현하였다. 그중 메세지 처리를 위한 DLX 개념을 알아보자.
<!--more-->

> 이 문서는 [원문](https://www.rabbitmq.com/docs/dlx)을 참조하여 작성하였습니다.
:{ "type": "tip", "icon": "lightbulb" }

## Dead Letter Exchange란?::what-is-a-dead-letter-exchange

큐에서 온 메세지는 "dead-lettered"상태가 될 수 있다. 즉, 다음의 4가지 이벤트 중 하나가 발생하면 이러한 메세지가 exchange에 재발행 된다.

1. 메세지가 다음 상황에서 [거부(부정적 승인)](https://www.rabbitmq.com/docs/confirms)인 경우
   * AMQP 1.0. 수신자가 [
     `rejected`](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-rejected) 결과를 사용하는
     경우
   * AMQP 0.9.1 소비자가 `requeue`파라미터를 `false`로 설정하여 `basic.reject`, `basic.nack`를 사용하는 경우

   > RabbitMQ에서는 프로토콜 버전에 따라 용어가 다르다 0.9.1(기본)에서는 메세지를 소비하는 개념으로서 Consumer(소비자)를 1.0에서는 메세지를 수신하는 개념으로서 Receiver(수신자)를
   사용한다.
   :{ "icon": "info", "type": "note" }

2. 메세지가 [per-message TTL](https://www.rabbitmq.com/docs/ttl) 때문에 만료된 경우
3. 메세지가 큐의 [길이 제한](https://www.rabbitmq.com/docs/maxlength) 초과로 삭제된 경우
4. 메세지가 [전달 제한](https://www.rabbitmq.com/docs/quorum-queues#poison-message-handling)보다 더 많은 횟수로 쿼럼 큐(Quorum Queue)에 반환된
   경우

큐 전체가 [만료](https://www.rabbitmq.com/docs/ttl#queue-ttl)되면, 큐에 있는 메세지는 dead-lettered 상태가 **아님**

Dead letter exchanges (DLXs)는 정상 exchange(교환소)들이다. DLX는 일반 Exchange를 사용하는거지 특별한 선언방식이나 사용방식이 있는게 아니다.
그냥 일반 Exchange를 DLX용도로 사용한다고 이해하면 된다.

## Dead Lettering이 구성되는 방식::how-dead-lettering-is-configured

어떤 주어진 큐에 대해, DLX는 클라이언트는 [`정책`](https://www.rabbitmq.com/docs/policies)을 사용하여 선언할 수 있다.
쿼럼 큐에서만 지원되는 것들을 포함하여 몇몇의 DLX 관련 정책 키들이 있다. 하지만 핵심적인 두가지는 다음과 같다:

* `dead-letter-exchange`: DLX를 사용하기 위한 이름
* `dead-letter-routing-key`: dead-lettering 메세지들일때 사용되는 라우팅 키

> 정책 키들은 [선택적인 매개변수](https://www.rabbitmq.com/docs/queues#optional-arguments)를 통해 큐 설정 시점에 어플리케이션에서 설정 가능하다.
>
>하드코딩된 `x-arguments`는 강력하게 권장하지 않는다. 왜냐하면 애플리케이션 없이는 변경할 수 없기 때문이다. 반면 정책은 언제든지 변경할 수 있다.
:{ "icon": "info", "type": "note" }

정책과 매개변수가 동시에 DLX를 지정하는 경우, 매개변수가 정책보다 우선적 적용된다.

대상 DLX 이름 외에도, 메세지가 dead-letter 될 때 사용할 라우팅키도 지정할 수있다. 라우팅키가 설정되지 않는다면, 메세지의 라우팅키가 사용된다.
DLX가 지정될 때, 선언된 큐에 일반 구성 권한 외에도, 사용자는 그 큐에 읽기 권한과 dlx에 쓰기 권한이 있어야한다.

> 일반 구성 권한(Queue/Exchange 생성, 삭제, 바인딩)만으로는 읽기(큐에서 메세지 수신) 권한이나, 쓰기(exchange에 메세지 발행) 권한까지 사용할 수 없다.
:{ "type": "warning", "icon": "warning-diamond" }

## 정책을 사용하여 DLX 구성하기::configuring-a-dead-letter-exchange-using-a-policy

정책을 사용하여 DLX를 지정하기 위해 "dead-letter-exchange" 키를 정책 선언에 추가한다:

::code-group

```bash::bash
rabbitmqctl set_policy DLX ".*" '{"dead-letter-exchange":"my-dlx"}' --apply-to queues --priority 7
```

```powershell::Power Shell
rabbitmqctl set_policy DLX ".*" "{""dead-letter-exchange"":""my-dlx""}" --apply-to queues --priority 7
```

```bash::rabbitmqadmin V2
rabbitmqadmin policies declare --name=DLX --pattern=".*" --definition='{"dead-letter-exchange":"my-dlx"}' --apply-to=queues --priority=7
```

```http::HTTP API
PUT /api/policies/%2f/DLX
    {"pattern": ".*",
     "definition": {"dead-letter-exchange":"my-dlx"},
     "priority": 7,
     "apply-to": "queues"}
```
::

위 예제에서는 모든 큐에 적용되고 "my-dlx"라는 교환소를 dead letter 대상으로 구성하는 "DLX"라는 정책을 선언했다.
이건 그냥 예제이고, 실무에서는 각각 일부 큐들에게만 적용하는 여러 정책들을 보는것이 일반적이다.

마찬가지로, 정책에 "dead-letter-routing-key"를 추가하여 명시적 라우팅키를 지정할 수 있다:

::code-group

```bash::bash
rabbitmqctl set_policy DLX ".*" '{"dead-letter-exchange":"my-dlx", "dead-letter-routing-key":"my-routing-key"}' --apply-to queues --priority 7
```

```powershell::Power Shell
rabbitmqctl set_policy DLX ".*" "{""dead-letter-exchange"":""my-dlx"", ""dead-letter-routing-key"":""my-routing-key""}" --apply-to queues --priority 7
```

```bash::rabbitmqadmin V2
rabbitmqadmin policies declare --name=DLX --pattern=".*" --definition='{"dead-letter-exchange":"my-dlx", "dead-letter-routing-key":"my-routing-key"}' --apply-to=queues --priority=7
```

```http::HTTP API
PUT /api/policies/%2f/DLX
    {"pattern": ".*",
     "definition": {"dead-letter-exchange":"my-dlx"},
     "priority": 7,
     "apply-to": "queues"}
```

::

### 선택적인 Queue 매개변수를 사용하여 DLX 구성하기::configuring-a-dead-letter-exchange-using-optional-queue-arguments

> 하드코딩된 `x-arguments`는 애플리케이션을 재배포하고 큐를 삭제한 후 재선언 되는것 없이 변경될 수 없기 때문에 강력하게 권장하지 않는다.
> 반면에 정책들은 언제든지변경이 가능하다.
:{ "type": "warning", "icon": "info" }

큐를 선언할 때 선택적인 `x-dead-letter-exchnage` 매개변수를 지정하여 큐에 대한 DLX를 설정 가능하다. 값은 동일한 가상 호스트의 교환소(Exchange)명이어야 한다:

```java
channel.exchangeDeclare("some.exchange.name", "direct");

// Important: prefer using policies over hardcoded x-arguments
Map<String, Object> args = new HashMap<String, Object>();
args.put("x-dead-letter-exchange", "some.exchange.name");
channel.queueDeclare("myqueue", false, false, false, args);
```

위의 코드는 `some.exchange.name`이라는 새로운 교환소(Exchange)를 선언하고 이 교환소를 새로 생성된 Queue에 대해 DLX로 설정한다.
참고로 큐가 선언될 때 교환소는 선언되지 않아도 되지만, 메세지들이 dead-letter가 될 시점에는 존재 해야한다.
해당 항목이 누락된다면, 메세지는 삭제된다.

대상 DLX 이름 외에도, 메세지가 dead letter 될 때 사용할 라우팅키도 설정할 수 있다. 라우팅 키가 설정되지 않으면 메세지의 라우팅키가 사용된다.

```java
// Important: prefer using policies over hardcoded x-arguments.
Map<String, Object> args = new HashMap<String, Object>();
args.put("x-dead-letter-exchange", "some.exchange.name");
args.put("x-dead-letter-routing-key", "some-routing-key");
```

DLX가 지정될 때, 선언된 큐에 대한 일반 구성 권한 외에도 사용자는 해당 큐에 대한 읽기 권한과 DLX에 대한 쓰기권한을 가져야한다.
권한은 큐가 선언될 때 검증된다.

## 데드레터가 된 메세지들 라우팅하기::routing-dead-lettered-messages

데드레터가 된 메세지들은 다음중 하나의 방법으로 해당 DLX에 연결된다:

* 큐에 지정된 라우팅 키로, 또는 이 값이 설정 되지 않았다면,
* 원래 발행할 때 사용한 동일한 라우팅키로

예를 들어, `foo`라우팅키로 교환소에 메세지를 발행하고, 그 메세지가 데드 레터가 된다면, `foo` 라우팅키로 해당 DLX에 발행된다.
메세지가 원래 도착한 큐가 `x-deade-letter-routing-key` 값이 `bar`로 설정하여 선언되었다면 메세지는 `bar`라우팅키로 해당 DLX에 발행된다.

참고로 특정 라우팅키가 큐에 대해 설정 되지 않았다면, 큐에 있는 메세지들은 모든 원래 라우팅키들로 데드레터가 된다.
이 데드레터는 `CC`와 `BCC` 헤더들(이 두 헤더에 대한 자세한 내용은 [발신자 선택 분산](https://www.rabbitmq.com/docs/sender-selected)을 참조)로 추가된 라우팅 키들을
포함한다.

### 데드레터 사이클::dead-letter-cycle

동일한 메세지가 동일한 큐에 두번 도달하는 사이클(메세지가 데드레터 되는)이 가능하다.
이 데드레터 사이클은 데드레터 라우팅키를 지정하지 않고 큐가 메세지들을 기본 교환소로 데드레터링 할 때 일어날 수있다.
만약 전체 사이클에서 거절이 없다면 RabbitMQ는 데드레터 사이클을 감지하고 메세지를 삭제하여 RabbitMQ 내의 메세지 무한루프를 방지한다.

## 안전::safety

데드 레터링(큐에서 메세지를 데드레터로 바꾸는)은 메세지 발행의 형식이고, 어떤 발행 형식이든 이것은 확실한 시나리오에서 실패할 수 있다.
예를 들어 데드 레터링이 온라인 쿼럼을 갖고 있지 않은 쿼럼 큐 사용에 구성되었다면, 발행은 실패하고, 데드레터링을 수행하는 노드는 다음과 같은 메세지를 로깅한다:

```
Cannot forward any dead-letter messages from source quorum queue 'qq.input' in vhost 'my-vhost'
with configured dead-letter-exchange exchange 'amq.topic' in vhost 'my-vhost'
and configured dead-letter-routing-key 'my-app.events.type.abc'
```

### 발행자 확인으로 재발행::re-publishing-with-publisher-confirms

기본적으로, 데드레터 된 메세지들은 내부적으로 활성화 된 발행자 [확인](https://www.rabbitmq.com/docs/confirms) 없이 재발행된다.
그러므로 RabbitMQ 클러스터링 환경에서 DLX를 사용하는 것은 안전하게 보장되지 않는다. DLX 대상 큐에 발행된 후 메세지는 원본큐에서 즉시 삭제된다.
이것은 브로커 리소스를 고갈시킬 수 있는 과도한 메세지 축적의 위험성이 없음을 보장하지만, 대상큐가 메세지를 받을 수 없는 상태라면, 메세지들은 유실 될 수 있다.

쿼럼 큐는 내부적으로 발행자 확인 옵션을 활성화하여 메세지가 재발행 되는 [최소 한번 데드레터링](https://www.rabbitmq.com/docs/quorum-queues#dead-lettering)을
지원한다.

## 메세지에서 데드레터링된 효과::dead-lettered-effects-on-messages

메세지를 데드레터링 하는것은 해당 헤더를 수정한다:

* 교환소 명은 가장 최신의 데드레터 교환소의 이름으로 대체된다.
* 라우팅키는 데드레터링을 수행하는 큐에서 지정된 값으로 대체될수 있다.(예: 설정한 `dead-letter-routing-key`)
* 위의 상황이 발생한다면, `CC` 헤더도 삭제된다, 그리고
* `BCC` 헤더는 [발신자 선택 분산(Sender-Selected Distribution)](https://www.rabbitmq.com/docs/sender-selected)에 따라 삭제된다.

단일 메세지는 여러번 데드레터링 될 수 있다. 메세지가 데드레터링 될 때 마다, 이 이벤트는 메세지 헤더 내에 저장된다.
무한히 늘어나는 헤더를 방지하기 위해, 데드레터 이벤트 이력이 `{Queue, Reason}`페어로 압축된다.

```text
메세지 어노테이션
    ├─ 키: x-opt-deaths (심볼릭 키)
    └─ 값: 맵들의 배열
```

`AMQP 1.0`
메세지는 [메세지 어노테이션](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-message-annotations)
을 포함하는데, 이는 `x-opt-deaths`라는 심볼릭
키와 [맵](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-types-v1.0-os.html#type-map)
들의 [배열](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-types-v1.0-os.html#type-array)이 되는 값을 가진다.
`AMQP 0.9.1` 메세지는 값이 배열이 되는 `x-death` 헤더를 포함한다. 두가지 프로토콜 모두에서 배열은 최신순으로 정렬 첫 번째 배열 요소에 저장된 가장 최신 데드레터링 이벤트이다.

다음의 표는 AMQP 1.0의 맵 키 밸류와 AMQP 0.9.1의 배열 요소들 구조를 설명한다. 모든 AMQP 1.0 키들은 `symbol`타입이다. AMQP 1.0 클라이언트는 맵의 키밸류 페어 순서에 의존하면
안된다.

| AMQP 1.0 키   | AMQP 1.0 값 타입   | AMQP 0.9.1 키        | AMQP 0.9.1 값 타입  | 설명                                                                   |
|--------------|-----------------|---------------------|------------------|----------------------------------------------------------------------|
| queue        | string          | queue               | longstr          | 메세지를 데드 레터링한 큐의 이름                                                   |
| reason       | symbol          | reason              | longstr          | 왜 이 메세지가 데드레터링 되었는 지(하단 설명)                                          |
| count        | ulong           | count               | long             | 이 원인으로 이 큐에서 데드 레터링된 횟수                                              |
| first-time   | timestamp       |                     |                  | 이 원인으로 이 큐에서 메세지가 처음 데드 레터링 된 시점                                     |
| last-time    | timestamp       |                     |                  | 이 원인으로 이 큐에서 메세지가 마지막에 데드 레터링 된 시점                                   |
|              |                 | time                | timestamp        | first-time과 동일                                                       |
| exchange     | string          | exchange            | longstr          | 메세지가 최초로 데드레터링 되기 전에 발행된 교환소                                         |
| routing-keys | array of string | routing-keys        | array of longstr | 이 메세지가 최초로 데드 레터링 되기 전의 라우팅키(`CC` 제외, `BCC` 포함)                      |
| ttl          | uint            |                     |                  | 메세지가 최초로 데드 레터링 되기전의 AMQP 1.0 헤더의 TTL (time to live in milliseconds) |
|              |                 | original-expiration | longstr          | 이 메세지가 최초로 데드레터링 되기전의 원본 `expiration` 속성                             |

AMQP 1.0 `ttl`과 AMQP 0.9.1 `original-expiration`은 선택적이며 기록된다. 이는 라우팅되는 모든 큐들에서 다시 만료되는걸 방지하기 위해, 데드 레터링 중에 원본 메세지의 TTL이
메세지에서 삭제되기 때문이다.

`reason`은 메세지가 데드 레터링 된 이유를 설명하는 이름으로, 다음 중 하나:

* `rejected`: 메세지가 거부됨
* `expired`: [메세지 TTL](https://www.rabbitmq.com/docs/ttl)이 만료됨
* `maxlen`: [최대 허용가능 큐길이](https://www.rabbitmq.com/docs/maxlength)가 초과 됨
* `delivery_limit`: 메세지 반환 횟수가 제한 값을 초과함 (쿼럼
  큐의 [전달 제한수](https://www.rabbitmq.com/docs/quorum-queues#poison-message-handling) 정책으로 설정)

추가적으로, 다음 6개 메세지 어노테이션(AMQP 1.0)또는 헤더(AMQP 0.9.1)는 최초 데드레터링 되는 이벤트에 대해 추가된다:

1. `x-first-death-queue`: 이 메세지가 데드레터링 된 첫 번째 큐
2. `x-first-death-reason`: 이 메세지가 처음에 데드 레터링 된 이유
3. `x-first-death-exchange`: 메세지가 처음 데드 레터링 되기 전에 발행된 교환소
4. `x-last-death-queue`: 이 메세지가 데드레터링 된 마지막 큐
5. `x-last-death-reason`: 이 메세지가 마지막에 데드 레터링 된 이유
6. `x-last-death-exchange`: 메세지가 마지막으로 데드 레터링 되기 전에 발행된 교환소

`x-first-*` 어노테이션은 수정되지 않는다. 메세지가 이후에 데드 레터링 될 때마다, `x-last-*` 어노테이션은 변경된다.