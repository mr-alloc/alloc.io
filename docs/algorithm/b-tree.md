---
layout: post
title: B-tree (Balanced Tree)
categories: [algorithm]
tags: [Data Structure, B-Tree]
date: 2021-01-04 19:30:00
profile-image: /post/profile/profile0.jpg
thumbnail: /post/algorithm/b-tree.png
current-company: Herit Corporation
current-position: Backend Server Developer
summary: B-tree
expose-images: true
excerpt-separator: <!--more-->
hide: false
---
B-tree는 Balanced Tree의 약자로 균형 트리를 의미한다.
B-tree는 현재까지도 데이터베이스, 파일 시스템 등 다양한 분야에서 사용되는 자료구조이다.
<!--more-->
## B-tree란?::what-is-b-tree

![B-tree](/post/algorithm/b-tree.png)
:{ "description": "B-tree 자료구조" }

**B-tree**는 Balanced Tree의 약자로 컴퓨터 과학에서 정렬된 데이터를 관리하고 `Log` 시간에서 검색, 순차접근, 삽입, 삭제가 가능한 자가균형 트리 자료구조이다.
대용량 데이터를 다룰 때 사용되며 데이터 베이스, 파일 시스템 등 다양한 분야에서 사용된다.

`B-tree`는 차수(`Degree, Order`)를 가지며 이 값에 따라 구성 정보가 다음과 같이 달라진다:

*degree: 4인 경우*

* 최대 자식 수: 4
* 최소 자식 수: 4 / 2 = 2
* 최대 키 개수: 4 - 1 = 3

> B-tree는 차수(m)에 따라 log~m~N의 시간 복잡도를 가진다.
:{ "type": "important", "icon": "warning-octagon" }

## B-tree의 구성요소::components

### 노드 (Node)::node

![B-Tree의 노드](/post/algorithm/node-of-b-tree.png)
:{ "align": "center", "max-width": "500px", "description": "B-Tree의 노드" }
