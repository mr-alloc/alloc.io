---
layout: post
title: Rabbit MQ Configuration
tags: [ Message Queue, RabbitMQ ]
date: 2025-08-08 14:34:00
thumbnail: /post/back-end/message-queue/configure-rabbitmq/index.png
current-company: NEOWIZ
current-position: Software Engineer
summary: RabbitMQ 구성
excerpt_separator: <!--more-->
hide: true
---

RabbitMQ 구성하기
<!--more-->

## 시작 하기전에::before-started

먼저 RabbitMQ는 도커로 간단하게 구성할 수 있다.

```bash
docker run -it --rm --name rabbitmq -p 5552:5552 -p 15672:15672 -p 5672:5672  \
    -e RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS='-rabbitmq_stream advertised_host localhost' \
    rabbitmq:4-management
```

### 포트 접근

| 포트          | 역할                                                                                    |
|-------------|---------------------------------------------------------------------------------------|
| 4369        | [epmd](https://www.erlang.org/docs/23/man/epmd), RabbitMQ 노드와 CLI 도구에서 사용하는 피어 검색 서비스 |
| 5672, 5671  | AMQP 0.9.1과 AMQP 1.0 클라이언트에서 TLS(5671)로 사용                                            |
| 5552, 5551  | [RabbitMQ 스트림 프로토콜]() 클라이언트에서 TLS(5551)로 사용                                           |
| 6000 ~ 6500 | [스트림](https://www.rabbitmq.com/docs/streams) 복제로 사용                                   |
| 25672       | 내부 노드와 CLI 도구 통신에 사용되며, 동적 범위로 할당됨.                                                   |