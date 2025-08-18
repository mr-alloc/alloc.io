---
layout: post
title: Dead Letter Exchange
tags: [ Message Queue, RabbitMQ, Dead Letter Exchange ]
date: 2025-08-18 18:14:00
thumbnail: /post/back-end/message-queue/configure-rabbitmq/index.png
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

1.