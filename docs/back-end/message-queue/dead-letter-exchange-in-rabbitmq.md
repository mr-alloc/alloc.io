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

정책을 사용하여 DLX를 지정하기 위해 "dead-letter-exchange" 키를 정책선언에 추가한다:

::code-group

```bash
rabbitmqctl set_policy DLX ".*" '{"dead-letter-exchange":"my-dlx"}' --apply-to queues --priority 7
```

```powershell

```

::