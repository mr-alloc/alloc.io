---
layout: wiki
title: Base58 인코딩
date: 2020-12-04 21:34:00 +0900
tags: [Algorithm, Encoding, Base58]
summary: Base58
hide: true
---

## Base58란?::what-is-base58

**Base58** 인코딩은 주로 비트코인과 같은 암호화폐에서 사용되는 인코딩 방식으로, 숫자와 대소문자 알파벳을 이용하여 데이터를 표현하는 방법이다.  
더블클릭으로 드래그해도 한번에 모든 문자열이 선택되며, 특정 문자들을 제외하여 혼동을 줄이고 사람이 읽고 쓰기 쉽게 설계되었다.

위의 장점들은 다음과 같이 Base58의 문자집합을 보면 알수 있다:

* 대문자 알파벳: `A ~ Z` (단 `I`와 `O`를 제외)
* 소문자 알파벳: `a ~ z` (단 `l`을 제외)
* 숫자: `1 ~ 9`

육안으로 볼 때 혼동이 될 수 있는 문자들은 제외 되었으며, 이를 통해 사람이 쉽게 읽고 쓸 수 있도록 설계되었다.

> 구성되는 값: 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz
: 