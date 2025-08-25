---
layout: post
title: Dead Letter Exchange
tags: [ Message Queue, RabbitMQ, Dead Letter Exchange ]
date: 2025-08-18 18:14:00
thumbnail: /post/back-end/message-queue/dead-letter-exchange-in-rabbitmq/index.png
current-company: NEOWIZ
current-position: Software Engineer
summary: RabbitMQ의 DLX란 무엇일까?
excerpt_separator: <!--more-->
hide: true
---
RabbitMQ는 다양한 failover 메커니즘을 구현하였다. 그중 메세지 처리를 위한 DLX 개념을 알아보자.
<!--more-->

> 이 문서는 [원문](https://www.rabbitmq.com/docs/dlx)을 참조하여 작성하였습니다.
:{ "type": "tip", "icon": "light-bulb" }

## Dead Letter Exchange란?::what-is-a-dead-letter-exchange

큐에서 온 메세지는 "dead-lettered"상태가 될 수 있다. 즉, 다음의 4가지 이벤트 중 하나가 발생하면 이러한 메세지가 exchange에 재발행 된다.

1. 메세지가 다음 상황에서 [거부(부정적 승인)](https://www.rabbitmq.com/docs/confirms)인 경우
   * AMQP 1.0. 수신자가 [
     `rejected`](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#type-rejected) 결과를 사용하는
     경우
    * AMQP 0.9.1 컨슈머가 `requeue`파라미터를 `false`로 설정하여 `basic.reject`, `basic.nack`를 사용하는 경우

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

This ensures that 이것은 보장한다
there is no chance of excessive message // 과도한 메세지의 기회가 없다는 것 (문맥상 chance는 부적적인 의미여야 하는 데 어떤의미로 chance를 사용한것인지 궁금함)
build up that 빌드업을
could exhaust broker resources. // 브로커 리소스를 exhaust 할 수 있는

이것은 과도한 메세지의 발생할 틈이 없는 것이 브로커 리소스를 exhaust 할수 있는 빌드업을 보장한다.

However, messages can be lost if the target queue
is not available to accept messages.