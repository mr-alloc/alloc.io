---
layout: post
title: 연결 리스트 (Linked List)
categories: [algorithm]
tags: [Data Structure, Linked List]
date: 2019-09-24 20:53:00
profile-image: /post/profile/profile0.jpg
thumbnail: /post/algorithm/linked-list.png
current-company: Computer Academy
current-position: Student
summary: 연결 리스트
expose-images: true
excerpt-separator: <!--more-->
hide: false
---
연결 리스트는 여러개의 노드가 연결된 자료구조로, 값의 변경(삽입, 삭제)이 용이하다.
배열과 다르게 각 노드를 연결하는 방식이라 크기가 동적으로 변할 수 있다.
<!--more-->

## 연결리스트란?::what-is-linked-list

::text-wrapping
![노드](/post/algorithm/node.png)

연결 리스트는 노드를 사용하여 구현하는데, 노드란 어떤 자료구조를 구성하기 위해 사용되는 각 요소를 의미한다. 값을 래핑하는 역할을 한다.  

사용하려는 자료 구조에 따라 노드를 연결하기위해 next, prev 등의 포인터를 사용한다.

::{ "align": "left", "max-width": "80px" }

일반적으로 연결 리스트에서는 노드에 `next` 포인터(다른 노드를 참조)를 추가하여 구현한다.

![연결 리스트](/post/algorithm/linked-list.png)
:{ "description": "연결 리스트" }

연결 리스트는 이미지처럼 노드의 `next` 필드가 다음 노드를 참조하고 있다. 
따라서 값을 추가 할때 마다 현재의 최상위 노드와 새로운 노드를 연결해줘야 한다.

이는 대략적으로 다음과 같은 구조가 된다.
```text
//노드
class Node<T> is
    T data
    Node<T> next
    
//연결 리스트
class LinkedList<T> is
    Node<T> head;
    Node<T> tail;
    ...
```

연결 리스트에 새로운 값을 추가하려면 새로운 노드의 `next`를 `head`로 설정하고, `head`를 새로운 노드로 설정한다.

![연결 리스트 추가](/post/algorithm/add-to-linked-list.png)
:{ "description": "연결 리스트에 새로운 노드를 추가" }

반대로 제거할 때도, `head`를 다음 노드로 설정하고, 제거할 노드를 해제한다.  


## 연결 리스트의 필수기능 구현::core-operations

좀 더 다양한 구현을 위해 이중 연결 리스트를 이용하여 앞, 뒤로 추가 및 제거를 구현 해본다.

* 맨 앞에 값 추가 (insert_front)

```text
method insert_front(Item item) is
    Node node = new Node(item)
    size++;
    
    
```


