---
layout: post
title: 해시 (Hash)
categories: [algorithm]
tags: [Data Structure, Hash]
date: 2019-10-04 19:30:00
profile-image: /post/profile/profile0.jpg
thumbnail: /post/algorithm/hash.png
current-company: Computer Academy
current-position: Student
summary: 해시
expose-images: true
excerpt-separator: <!--more-->
hide: false
---
hash는 프랑스어 hacher [aʃe]: 썰다/다지다 에서 유래한 단어로, 잘게 다져서 요리하는 음식을 말한다.  

컴퓨터 과학에서는 잘게 다진 데이터를 저장한다는 의미로 hash라는 용어를 사용한다.  
<!--more-->

## 해시란?::what-is-hash

[hash](https://en.wikipedia.org/wiki/Hash_(food))는 프랑스어 hacher [aʃe]: 썰다/다지다 에서 유래한 단어로, 잘게 다져서 요리하는 음식을 말한다. 
대표적인 예로 감자를 잘게 다져서 튀김으로 만드는 해시 브라운이 있다. 이러한 문맥으로 컴퓨터 과학에서 잘게 다져 저장하는 의미로 hash라는 용어를 사용한다.

`hash`에서는 빠질 수 없는 `Hash Function`이 있는데, 이는 임의의 길이의 데이터를 고정된 길이의 데이터로 매핑하는 함수이다.  
예를 들어 Java의 경우 아래와 같은 해시함수가 존재한다.

```java::자바의 해시함수
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

Java의 내용은 관련이 없지만 설명을 위해 hashCode도 같이 보는것이 좋다.  
먼저 `hashCode`를 얻는 방법은 아래와 같다. `UTF-16`의 경우 `Latin-1`의 상위 집합이지만, 한글과 같은 문자 때문에 필요하고 2byte 처리로 `hashCode`를 만든다. 

::code-group
```java::Latin-1
public static int hashCode(byte[] value) {
    int h = 0;
    for (byte v : value) {
        h = 31 * h + (v & 0xff);
    }
    return h;
}
```
```java::UTF-16
public static int hashCode(byte[] value) {
    int h = 0;
    int length = value.length >> 1;
    for (int i = 0; i < length; i++) {
        h = 31 * h + getChar(value, i);
    }
    return h;
}
```
::
아무튼 일반적으로 `😂`이나 `앨리스`와 같은 값으로 해싱을 하지는 않으니, 대부분 `Latin-1`을 사용한다는 가정하에 설명한다.  
여기서 "Alice"라는 문자열과 "Bob"이라는 문자열이 입력으로 들어온다면 다음의 과정으로 해시값을 얻을 수 있다.

::code-group
```text::"Alice"의 해시코드
1. 'A' (처음)
h = 31 * 0 + 65 = 65

2. 'l' (두번째)
h = 31 * 65 + 108
h = 2015 + 108 = 2123

3. 'i' (세번째)
h = 31 * 2123 + 105
h = 65813 + 105 = 65918

4. 'c' (네번째)
h = 31 * 65918 + 99
h = 2043458 + 99 = 2043557

5. 'e' (마지막)
h = 31 * 2043557 + 101
h = 63350267 + 101 = 63350368
```
```text::"Bob"의 해시코드
1. 'B' (처음)
h = 31 * 0 + 66 = 66

2. 'o' (두번째)
h = 31 * 66 + 111
h = 2046 + 111 = 2157

3. 'b' (마지막)
h = 31 * 2157 + 98
h = 66867 + 98 = 66965
```
::

결과적으로 `63350368`과 `66965`라는 해시코드가 나온다. 이 값으로 hash function을 돌리면 아래처럼 처리된다.

::code-group
```text::"Alice": hash(63350368)
1) hashCode를 2진수로 변환
63350368 = 0000 0011 1110 0011 0110 1100 0100 0000

2) h >>> 16 (상위 16비트를 하위 16비트로)
0000 0000 0000 0000 0000 0011 1110 0011

3) XOR 연산 (^)
0000 0011 1110 0011 0110 1100 0100 0000  (원래 해시코드)
0000 0000 0000 0000 0000 0011 1110 0011  (>>> 16한 값)
----------------------------------------
0000 0011 1110 0011 0110 1111 1010 0011  (최종 해시값) 66063523 (십진수)
```
```text::"Bob": hash(66965)
1) hashCode를 2진수로 변환
66965 = 0000 0000 0000 0001 0000 0101 1000 0101

2) h >>> 16 (상위 16비트를 하위 16비트로)
0000 0000 0000 0000 0000 0000 0000 0001

3) XOR 연산 (^)
0000 0000 0000 0001 0000 0101 1000 0101  (원래 해시코드)
0000 0000 0000 0000 0000 0000 0000 0001  (>>> 16한 값)
----------------------------------------
0000 0000 0000 0001 0000 0101 1000 0100  (최종 해시값) 66964 (십진수)
```
::

최종적으로 `Alice`는 `66063523`, `Bob`은 `66964`라는 해시값을 얻을 수 있다.
이렇게 얻어진 해시값을 통해 데이터를 저장하거나 검색할 수 있다.

> Hash는 데이터를 저장하거나 검색하기위해 인덱스로 사용되는 값이다.
:{ "type": "tip", "icon": "check-circle" }

## 해시 충돌::hash-collision

![해시 충돌](/post/algorithm/hash-collision.png)
:{ "description": "해시 충돌" }

**해시 충돌**은 해시들이 어떤 계산된 값에 의해 생성된 테이블 인덱스가 같은 경우를 말한다.
해시 값이 다르더라도, 가리키는 테이블 인덱스가 같은 경우 이미 다름값이 저장이 되어있기 때문에, 충돌이 발생한다.

이런 충돌 문제를 해결하기 위해 여러가지 방법들이 고안 되었다.

## 해시 충돌 해결 방법::how-to-solve-hash-collision

### 1. 체이닝::chaining

![체이닝](/post/algorithm/hash-chaining.png)
:{ "description": "노드를 연결 리스트로 묶는 체이닝" }

**체이닝**은 해시 충돌이 발생하면, 같은 테이블에 [연결 리스트](/docs/algorithm/linked-list)로 연결하는 방식이다.



