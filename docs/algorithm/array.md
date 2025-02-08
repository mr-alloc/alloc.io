---
layout: post
title: 배열 (Array)
categories: [algorithm]
tags: [Data Structure, Array]
date: 2019-09-04 20:53:00
profile-image: /post/profile/profile0.jpg
thumbnail: /post/algorithm/array.png
current-company: Computer Academy
current-position: Student
summary: 배열
expose-images: true
excerpt-separator: <!--more-->
hide: false
---
배열은 프로그래밍 언어에서 지원되며, 가장 기본이 되는 자료구조이다.
배열에 대해 알아보자.
<!--more-->

## 배열이란?::what-is-array

**배열(Array)**은 동일한 자료형의 데이터를 연속적으로 저장하는 자료구조이다.
여러개의 데이터를 한번에 다룰 수 있으며, 색인(index)으로 각 데이터에 접근할 수 있다.

각 언어 별로 선언 방법이 다르지만, 내부적으로 저장되고 사용되는 매커니즘은 동일하다.

::code-group
```cpp::C++의 배열의 선언
int arr[5] = {1, 2, 3, 4, 5};
```

```java::Java의 배열 선언
int [] arr = {1, 2, 3, 4, 5};
```

```typescript::TypeScript의 배열 선언
var arr: number[] = [1, 2, 3, 4, 5];
```
::

배열은 선언시 크기를 정해야한다. 코드에서 명시한 5는 배열의 크기를 의미한다.
배열의 각 요소는 인덱스로 접근할 수 있는데, 책으로 치면 책의 쪽 번호와 같다.

예를 들어 위의 코드에서 `arr[0]`은 1, `arr[1]`은 2, `arr[2]`는 3, `arr[3]`은 4, `arr[4]`는 5를 가리킨다.
**인덱스는 0부터 시작하며**, 직관적으로 표현된 `[1, 2, 3, 4, 5]`를 그대로 보면된다.

배열의 크기는 물리적인 메모리를 할당 받는 것이기 때문에, 정해진 크기외의 인덱스로 접근시 오류가 발생한다.

## 배열의 특징::features

![배열의 주소](/post/algorithm/array.png)
:{ "align": "center", "max-width": "300px", "description": "배열의 요소" }

배열은 선언시 위와같이 할당된다. 왼쪽의 메모리 주소는 배열에 저장되는 타입의 크기에 따라 다르개 할당된다.
`int`배열 같은 경우 `4byte`를 차지하기 때문에, 연속적인 주소를 위해 `90..94..98` 처럼(끝에 두자리 예)증가한다.

기본형의 경우 자료형의 크기만큼 증가가되고, 참조형의 경우 컴퓨터 비트 체계를 따라 증가한다. (예: 64 비트 체계의 경우 `8byte` 단위로 증가)

어쨋든 위의 각각의 요소를 접근하기 위해서는 아래처럼 인덱스를 통해 접근한다.

```c++
int arr[5] = {9, 1, 4, 3, 6};
int first = arr[0]; // 9
int second = arr[1]; // 1
int third = arr[2]; // 4
int fourth = arr[3]; // 3
int fifth = arr[4]; // 6
```

이처럼 여러개의 요소를 한개의 변수로 관리할 수 있는 데이터 구조이다.

> 참조의 경우 배열의 요소에 참조 객체의 주소가 저장되므로 초기화 하지않는 다면 `0x0` 즉 null 상태이다.
:{ "type": "note", "icon": "info" }




