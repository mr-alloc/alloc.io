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

| 포트   | 역할 |
|------|----|
| 5552 |    |