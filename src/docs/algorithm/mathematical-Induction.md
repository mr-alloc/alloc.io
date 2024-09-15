---
layout: post
title: -Algorithm- Mathematical Induction (수학적 귀납법) feat.java
categories: [Development, Algorithm]
tags: [Java, Algorithm, Mathematical Induction]
date: 2022-04-11 21:54:00 +0900
thumbnail: "/blogging/algorithm/Mathematical_Induction.png"
current-company: Herit Corporation
current-position: Backend Server Developer
summary: 수학적 귀납법
excerpt-separator: <!--more-->
hide: false
---

이진탐색 주제의 전형적인 예로,
배열에서 특정값을 찾을수 있는 알고리즘을 기준으로,
수학적 귀납법을 조금이나마 쉽게 이해할 수 있어요.

<!--more-->


## 수학적 귀납법(Mathematical Induction)

🌸 정의: 수학적 귀납법은 모든 자연수가 어떤 주어진 성질을 만족시킨다는 명제를 증명하는 방법의 하나.  
  
위의 정의 처럼 배열내 최대값을 구하는(주어진 성질) 알고리즘이 어떤 명제에 의해 증명되는지 간단하게 정리 할 거에요.

## 가정 및 순서

* 가정
> 𝑵(>= 1) : 탐색범위에 있는 정렬된 정수들의 수 (배열의 길이)  
> 𝓍 : 찾는 정수

* 단계

1. 기본단계  
𝑵 = 1일 때 𝓍를 목록에 있는 하나뿐인 정수와 한 번만 비교하면 𝓍가 목록에 있는지 여부를 알 수 있으므로 이진탐색은 맞다.  
> 설명: 배열에 길이(𝑵)가 1이더라도 해당 요소와 "한 번" 비교하여 목록에 있는지 알 수 있기 때문에 이진탐색 이라는 의미.

2. 귀납적 가설  
𝑵 <= 𝓴(양의 정수)일 때 이진 탐색은 𝓍가 목록에 있는지 여부를 알려 준다고 가정하자.
> 설명: 배열의 길이(𝑵)가 무조건 양수(정수)인 경우에 그값이 한 개라도 있다면 비교가 가능하기에 있는지에 대한 여부를 확인할수 있다.

3. 귀납적 단계  
𝑵 = 𝓴 + 1일 때 이진 탐색은 𝓍가 목록에 있는지 여부를 알려 준다는 것을 증명하자. 이진탐색은 먼저 𝓍를 𝑵개의 정수들의 중간 요소와 비교한다. 비교 결과는 다음과 같이 세 가지 경우가 있다.
> 설명:  𝑵 = 𝓴 + 1라는 가정(배열내 요소가 존재)에서 이진탐색을 통해 𝓍가 목록에 있는지에 대한 여부를 알아 낼 수있다. 이진 탐색은 기본적으로 중간값 피벗을 정해두고 이를 기준으로 오른쪽(큰수) 또는 왼쪽(작은수)의 배열을 사용할 지를 구분할 수 있다.  
> 물론 이 기준은 현재의 상황에서 오름차순(또는 내림차순)으로 정렬되어있는 경우에 이진 탐색을 시도할 수 있다.  
> 만약 `[12, 22, 37, 39 ,50]`이라는 배열이 있고 찾는 값인 𝓍가 가운데 값인 `37`과 비교해서 어떤 배열(또는 37)에서 찾을 수 있는 지를 의미한다.  
> 찾는값이 37이상 이라면 아래처럼 왼쪽의 값들은 비교조차 안하며 초록색의 값들에서만 찾는다.


<div class="array">
    <span class="over">12</span>
    <span class="over">22</span>
    <span class="current">37</span>
    <span class="target">39</span>
    <span class="target">50</span>
</div>


<table class="case-table">
    <tbody>
        <tr>
            <th><span class="case-head">경우 1</span></th>
            <td><span class="case-body">𝓍가 중간요소와 같다.<br/>이 경우는 𝓍를 찾았으므로 이진 탐색은 맞다.</span></td>
        </tr>
        <tr>
            <th><span class="case-head">경우 2</span></th>
            <td><span class="case-body">𝓍가 중간 요소보다 작다.<br>이 경우는 𝓍를 목록의 왼쪽 반에서 찾아야한다. 목록의 왼쪽 반의 크기 𝑵'은 ⎣𝑵/2⎦이다. 𝑵' <= 𝓴이므로 귀납적 가설에 의해 이진탐색은 𝓍가 목록에 있는지 여부를 알려 준다.<br/>따라서 이진탐색은 맞다.</span></td>
        </tr>
        <tr>
            <th><span class="case-head">경우 3</span></th>
            <td><span class="case-body">𝓍가 중간요소보다 크다.<br/>이 경우는 경우 2와 비슷한 논리로 맞다.</span></td>
        </tr>
    </tbody>
</table>

따라서 이진탐색은 𝑵 = 𝓴 + 1일 때 맞다.

> 잘못 설명된 내용이 있거나, 부적절한 예시가 있다면, 아래 댓글로 조언 부탁드립니다.  
> 감사합니다.  😄
