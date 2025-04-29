---
layout: post
title: Spring Cloud Stream
tags: [ Spring, Spring Boot, Spring Cloud Stream ]
date: 2025-04-29 09:34:00
thumbnail: /post/back-end/spring/spring-cloud-stream/index.png
current-company: NEOWIZ
current-position: Software Engineer
summary: 스프링 클라우드 스트림
excerpt_separator: <!--more-->
hide: true
---

Spring Cloud Stream은 주로 메시지 브로커를 위한 추상화 계층을 제공하는 데 특화되어 있다.
그렇다면 왜 Spring Cloud일까? 또한 어떻게 추상화를 지원하여 유연한 연결을 제공하는지 알아보자.
<!--more-->

## 개요::introduction

### Spring Cloud Stream의 탄생 배경::how-spring-cloud-stream-came-to-be

*"왜 Spring Cloud와 메시지 큐가 연결되었는가?"*

`Spring Cloud`는 클라우드 네이티브 애플리케이션과 마이크로 서비스 개발을 위한 도구 모음이다.
마이크로서비스 간 통신에서 메시지 큐는 핵심 컴포넌트로 비동기 통신을 가능하게 하기때문에 마이크로서비스 아키텍처에서 필요하게 되었다.

또한, 마이크로서비스 환경에서는 서비스간 느슨한 결합(loose coupling)이 중요하기 때문에,
메시지 큐로 서비스 간 비동기 통신을 제공하여 이 문제를 해결하여 분산 시스템 문제를 해결할 수 있다.

### Spring Cloud Stream이 만들어진 이유::why-spring-cloud-stream-was-created

현대에는 RabbitMQ, Kafka, Amazon SQS 등 다양한 메시지 브로커가 존재하며,
각각 사용법과 개념이 달라 애플리케이션 코드가 특정 기술에 종송되는 문제가 있기 때문에 여러 메시징 기술의 추상화가 필요했다.

`Spring Cloud Stream`은 바인더(Binder)라는 개념을 통해 다양한 메시징 시스템을 추상화하였다.
개발자는 기본 메시징 시스템을 알 필요 없이 동일한 코드로 작업하여 일관된 프로그래밍 모델을 제공할 수 있게되었다.

또한 간단한 설정 변경만으로 RabbitMQ에서 Kafka로 또는 반대로 전환이 가능하기 때문에, 기반 기술이 변경되어도 비즈니스 로직 코드는 그대로 유지된다.

> 즉, Spring Cloud Stream은 메시징 시스템의 복잡성을 추상화하고, 마이크로서비스 아키텍처에서 서비스간 통신을 더 쉽게 구현할 수 있도록 만들어졌다.
> 이를 통해 개발자는 비즈니스 로직에 집중하면서도 확장 가능한 분산 시스템을 구축할 수 있게 되었다.
:{ "type": "tip", "icon": "lightbulb" }

## 구조::structure

