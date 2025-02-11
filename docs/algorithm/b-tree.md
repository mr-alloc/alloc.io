---
layout: post
title: B-tree (Balanced Tree)
categories: [algorithm]
tags: [Data Structure, B-Tree]
date: 2022-01-04 19:30:00
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

**B-tree**는 Balanced Tree의 약자로 정렬된 데이터를 관리하고 `Log` 시간에서 검색, 순차접근, 삽입, 삭제가 가능한 자가균형 트리 자료구조이다.
대용량 데이터를 다룰 때 사용되며 데이터 베이스, 파일 시스템 등 다양한 분야에서 사용된다.

`B-tree`는 차수(`Degree`)를 가지며 이 값에 따라 구성 정보가 다음과 같이 달라진다:

*degree: 4인 경우*

* 최대 자식 수: 4
* 최소 자식 수: 4 / 2 = 2
* 최대 키 개수: 4 - 1 = 3

>B-tree는 차수(m)에 따라 log~m~N의 시간 복잡도를 가진다.
:{ "type": "important", "icon": "warning-octagon" }


## 노드 (Node)::node

![B-tree의 노드](/post/algorithm/node-of-b-tree.png)
:{ "align": "center", "max-width": "500px", "description": "B-Tree의 노드" }

노드는 자식 노드들의 포인터들과 키들로 구성된다. 이미지에서 보이는 p1, p2...pn은 자식노드 들의 포인터를 의미한다.
s1, s2, s3는 키를 의미한다. 데이터를 검색할 때, 키들중에서 비교를 하고 사잇 값이라면 해당 범위의 자식노드로 이동한다.

## 데이터 검색::search

![B-tree 노드 내 검색](/post/algorithm/b-tree-node-search.png)
:{ "align": "center", "max-width": "300px", "description": "B-tree 노드 내 검색" }

검색은 루트 노드부터, 리프노드까지 순차적으로 이어지며 log~m~N의 시간 복잡도를 가진다.
노드 내에서 비교는 항상 `중앙(중간 값)`하고만 이루어지는데, 검색 과정에 따라 중앙이 바뀐다.

>중앙 인덱스는 각 인덱스의 (시작 + 끝) / 2로 계산된다.  
:{ "type": "tip", "icon": "lightbulb" }

**(`시작: 0, 중앙: 1, 끝: 3`)**    
위 이미지처럼 `시작: 0, 끝: 3`이라면 중앙은 `(0 + 3) / 2 = 1`이 된다. 이 공식으로 **범위가 정해질 때** 마다 중앙이 바뀐다.  
중앙 값이 정해지면, 비교를 시작하고 `중앙 < 찾는 값`이라면, 시작 포인터는 `중앙 +1: 2`가 된다.

>반대로 `찾는 값 < 중앙`이라면, 끝 포인터는 `중앙 -1: 1`이 된다.
:{ "type": "tip", "icon": "lightbulb" }

그럼 다시 `(2 + 3) / 2 = 2`가 중앙이 되고 다시 비교한다.   
**(`시작: 2, 중앙: 2, 끝: 3`)**  
이때 `찾는 값 < 중앙(2)`이라면 `시작(2)`보다 작은 값이기 때문에 `44`와 `79`사이의 포인터로 다음 자식노드로 이동하고, 
`중앙(2) < 찾는 값` 이라면 또다시 시작 포인터를 `중앙 +1: 3`으로 이동한다.

이 과정에서 만약 중앙 값과 비교할 때 같다면, 해당 값 탐색에 성공한것이다. 

이런 식으로 루트노드부터 검색이 이루어 지면 아래와 같이 처리된다.

::image-group

![루트 노드에서 각 키들과 비교하여 이동할 자식노드의 포인터를 찾는다.](/post/algorithm/b-tree-search-1.png)

![접근한 자식노드에서도 동일하게 포인터를 찾는다.](/post/algorithm/b-tree-search-2.png)

![리프노드에서 탐색하는 키들중 검색값을 찾는다.](/post/algorithm/b-tree-search-3.png)

::

>투 포인터(시작, 끝)로 범위 내 이분탐색이 되려면 먼저 노드내 정렬이 되어야 한다. 이는 B-tree가  정렬을 유지하는 자가균형 트리 이기 때문에 가능하다.
:{ "type": "note", "icon": "info" }

## 데이터 삽입::insertion

검색할 때와 마찬가지로 루트노드 붙어 리프노드까지 이동하며 삽입할 위치를 찾는다.  
실제 삽입은 리프노드에서 제일 먼저 일어나며, 그 과정들을 다음에 설명한다:

**일반 적인 데이터 추가**

![값 11이 추가 되면, 루트 노드에서 비교하여 끝 포인터를 찾아 자식 노드로 이동한다.](/post/algorithm/b-tree-add-1.png)
:{ "align": "center", "max-width": "300px", "description": "2번 포인터로 이동" }

위의 구조에서 값 11이 추가되면 루트 노드에서는 삽입 위치를 찾기위해 [검색](#search)에서 사용한 방법대로 이분탐색으로 이동할 포인터를 찾는다.

![리프노드까지 이동하여 삽입 위치를 찾았으므로 해당 위치에 삽입된다.](/post/algorithm/b-tree-add-2.png)
:{ "align": "center", "max-width": "300px", "description": "리프 노드까지 이동 및 삽입" }

자식노드의 포인터로 이동된 뒤, 기존의 키들과 비교하여 삽입할 위치를 찾고 **최대 키 개수**를 넘지 않았다면 그 자리로 삽입된다.

**데이터 추가에 대한 노드 확장**

![값 12가 추가 되면 이전과 동일하게 이동할 포인터를 찾는다.](/post/algorithm/b-tree-add-3.png)
:{ "align": "center", "max-width": "300px", "description": "2번 포인터로 이동" }

값 12가 추가 되면 이전과 동일하게 이동할 포인터를 찾는다.

![삽입 위치를 찾았지만 12가 삽입되면 최대 키 개수 위반이므로 노드를 분할한다.](/post/algorithm/b-tree-add-4.png)
:{ "align": "center", "max-width": "300px", "description": "최대 키 개수 위반! 노드 분할" }

기존 `[8, 9, 10, 11]`에서 `12`가 추가되면 `[8 ,9, 10, 11, 12]`가 되어 **최대 키 개수**를 위반하게 된다.

이 경우에는 중간 값(`10`)을 기준으로 노드를 분할하여, 중간값의 왼쪽 포인터를 `[8, 9]` 노드에 연결, 오른쪽 포인터를 `[11, 12]` 노드에 연결한다.
그리고 중간 값`10`은 부모노드로 이동하여, 부모노드에서도 삽입을 시도한다.

만약 부모노드에서도 최대 키 개수를 넘어가면, 부모노드도 분할하여 중간값을 부모노드로 이동하고, 부모노드의 부모노드로 이동하여 삽입을 시도한다.

>일반적으로 B-tree는 런타임에 차수를 수정할수 없으므로 해당 차수의 트리가 가질수 있는 모든 키의 개수에 도달한다면, 새로운 차수의 B-tree를 생성하여 데이터를 이동시킨다.
:{ "type": "important", "icon": "warning-diamond" }

## 데이터 삭제::deletion

