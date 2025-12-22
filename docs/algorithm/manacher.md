---
layout: post
title: Manacher 알고리즘
tags: [ Palindrome, Algorithm ]
date: 2025-10-12 20:14:00
thumbnail: /post/back-end/auth-server-development/index.png
profile-image: /post/profile/worker-kkom.png
current-company: NEOWIZ
current-position: Software Engineer
summary: Manacher
excerpt_separator: <!--more-->
hide: true
---

마나처(Manacher) 알고리즘에 대해 알아보자
<!--more-->

## Manacher 알고리즘::what-is-manacher

`Manacher`는 O(N)시간에 각 문자열을 중심으로하는 팰린드롬의 반경을 구하는 알고리즘이다.
팰린드롬은 `기러기, 토마토, 스위스, 인도인, 별똥별, 우영우`같이 문자열을 반으로 나눴을 때, 좌우반전을 해도 변하지않는 문자열을 의미한다.

`소주만병만주소`도 이와 비슷한 예이다.

## 개념 이해하기::understanding-concepts

`Manacher` 알고리즘을 사용하려면 몇가지 순서가 필요하다.

### 1. 문자열 전처리::string-preprocessing

먼저 문자열에서 각문자 사이에 `#` 구분자를 넣는다. 맨 끝또한 마찬가지이다.

```text
예시 1.
Input: "abcabc"
Output: "#a#b#c#a#b#c"
예시 2.
Input: "abdba"
Output: "#a#b#d#b#a#"
```

이전처리는 홀수든, 짝수든 모두 홀수로 만들어준다.

### 2. 중심과 오른쪽 반경::center-and-right-boundary

* Center (C): 현재 처리 중인 팰린드롬의 중심
* Right (R): 지금까지 발견한 팰린드롬의 가장 오른쪽 끝
* Mirror: 현재 i 위치의 C기준 대칭점

팰린드롬 성질에 의해, 만약 i가 (C, R) 범위 내에 있다면, i의 mirror 뮈치에서 확인한 정보를 재사용할 수 있다.

### 3. P 배열::p-array

`P[i] = i`를 중심으로 하는 팰린드롬의 반경

::code-group

```text::i = 1, right = 0
문자열: # b # a # b # a # d #
인덱스: 0 1 2 3 4 5 6 7 8 9 10
       ↑ ^ ↑
확장:         
1. s[i-1] == s[i+1]이 같으므로 right는 1증가 -> P[1] = 1, right = 2
2. s[i-2] 값은 인덱스가 음수이므로 진행하지않음

P 배열: 0 **1** 0 0 0 0 0 0 0 0 0
```

```text::i = 2, right = 2
문자열: # b # a # b # a # d #
인덱스: 0 1 2 3 4 5 6 7 8 9 10
         ↑ ^ ↑
확장:         
1. s[i-1] != s[i+1]는 일차하므로 right는 1증가 -> P[2] = 1, right = 3

P 배열: 0 1 **0** 0 0 0 0 0 0 0 0
```

```text::i = 3, right = 3
문자열: # b # a # b # a # d #
인덱스: 0 1 2 3 4 5 6 7 8 9 10
           ↑ ^ ↑
확장:         
1. s[i-1] != s[i+1]는 일차하므로 right는 1증가 -> P[2] = 1, right = 4
2. s[i-2] == s[i+2]는 일치하므로 right는 1증가 -> P[2] = 2, right = 5
3. s[i-3] == s[i+3]는 일치하므로 right는 1증가 -> P[2] = 3, right = 6
```

::


