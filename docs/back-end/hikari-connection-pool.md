---
layout: post
title: 히카리 커넥션 풀
tags: [ Java, Hikari, Database, Connection Pool ]
date: 2025-04-15 08:42:00
thumbnail: /post/back-end/hikari-connection-pool.svg
current-company: NEOWIZ
current-position: Software Engineer
profile-image: /post/profile/profile1.jpg
summary: Hikari Connection Pool
excerpt_separator: <!--more-->
hide: true
---

Hikari Connection Pool 알아보기
<!--more-->

## 소개::introduction

Hikari Connection Pool (이하 히카리)은 자바 생태계에서 가장 인기있는 커넥션 풀 라이브러리이다.
매우 빠르고, 간단한 설계 그리고 적은 오버헤드가 모든걸 말해준다. 때문에 스프링 생태계에서도 기본 커넥션 풀로 채택되었다.

Brett Wooldridge가 처음 만들었으며, 오픈소스로 공개 되어있다.

### 특징::features

너무 많은 장점이 있지만, 내부 구조를 알지 못하면 그 장점을 이해할 수 없다.
내부 동작 과정과 특징을 알아보여 이해해보자.

> 히카리는 여러 커스텀 자료구조를 구현하며, 성능 중심적 최적화를 하였다. 코드는 Java로 설명된다.
:{ "type": "note", "icon": "info"}

## 동작 과정::mechanism


