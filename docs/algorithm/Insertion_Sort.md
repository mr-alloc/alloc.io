---
layout: post
title: 삽입 정렬 알아보기(Java)
categories: [Development, Algorithm]
tags: [Java, Algorithm, Sort, Insertion Sort]
date: 2022-04-21 23:25:00 +0900
thumbnail: "/assets/blogging/algorithm/insertion_sort_intro.png"
current_company: Herit Corporation
current_position: Backend Server Developer
summary: 삽입 정렬 알아보기
excerpt_separator: <!--more-->
hide: false
---
이번 포스팅 순서는, 
기본 정렬 알고리즘중 하나인 삽입 정렬(Insertion Sort)입니다.

이전 포스팅의 선택정렬하고는 또 다른 맛이있네용 ㅋㅋ

지적 및 조언 댓글 환영입니다. ㅎㅎ
<!--more-->


## 삽입정렬 (Insertion Sort)


🌸 삽입정렬은 배열을 순회하며, 삽입할 위치를 찾고 요소들을 **한단계씩 밀어** 해당 위치에 삽입하며 정렬하는 알고리즘 입니다.
삽입정렬 또한 선택정렬과 마찬가지로 정렬된 부분과 정렬되지 않은 부분으로 나뉩니다.

> **한단계씩 밀어** 라는 말은 [ 1 ][ 3 ][ 2 ] 에서 2라는 요소를 임시로 빼고 1 과 3사이에 들어갈공간을 만들기 위해 뺀 2의 자리로 3을 한 단계밀어,
> [ 1 ][   ][ 3 ] 처럼 빈 공간을 만든 다는 의미입니다.


---

### 설명

순회 인덱스 i: 3 (0, 1, 2는 요소가 1, 4, 7이므로 정렬이되어 있으므로, 넘어갑니다.)

<div class="array">
    <span class="over">1</span>
    <span class="over">4</span>
    <span class="target">7</span>
    <span class="current">3</span>
    <span>2</span>
    <span>5</span>
</div>

> 삽입정렬은 선택정렬과 다르게 지나온 요소들과 비교하여 밀면서 정렬해 나갑니다. 위 배열에서 1, 4, 7 요소는 정렬 되있기때문에,
> j는(j = i - 1, 현재 3) 0이 될때까지 계속 순회하며 이전값과 비교하여 정렬 대상인지 아닌지를 판단합니다. 3은 7과 정렬 대상이기 때문에 정렬을 위해 밀고 삽입합니다.


순회 인덱스 i: 3 

<div class="array">
    <span class="over">1</span>
    <span class="over">4</span>
    <span class="target">7</span>
    <span class="current">7</span>
    <span>2</span>
    <span>5</span>
</div>

> 3의 값을 복사해두고 3의 자리로 7을 밀게됩니다. 그럼 위와 같은 상황이되고 삽입할 위치에 3을 삽입하여, 아래처럼 만들수있습니다.


순회 인덱스 i: 3

<div class="array">
    <span class="over">1</span>
    <span class="over">4</span>
    <span class="target">3</span>
    <span class="current">7</span>
    <span>2</span>
    <span>5</span>
</div>

> 한번의 정렬이 끝났으니 j를 감소시켜 또다시 이전 요소 (3과 4)를 비교하여 정렬대상이 되었습니다. 
> i는 현재 3이지만 i이전의 인덱스를 가진 요소들은 정렬되지 않았기 때문에 j를 감소시켜가며 끝까지 정렬합니다.


* 순회 인덱스 i: 3
* 내부 순회 인덱스 j: 2

<div class="array">
    <span class="over">1</span>
    <span class="target">4</span>
    <span class="current">4</span>
    <span class="over">7</span>
    <span>2</span>
    <span>5</span>
</div>

* 내부 순회 인덱스 j: 1

<div class="array">
    <span class="target">1</span>
    <span class="current">3</span>
    <span class="over">4</span>
    <span class="over">7</span>
    <span>2</span>
    <span>5</span>
</div>

> 내부 순회 인덱스를 줄여가며 정렬을 하였고 현재 내부 순회 인덱스(j)인 1에대한 요소(3)가 비교할 인덱스 0에대한 요소(1)과 정렬되어있다고 판단 하기에,
> j는 더이상 감소시키지 않습니다. 따라서 i를 다시 증가시키며 이과정을 반복하여 정렬합니다.
> 이후의 과정은 아래와 같습니다.

* 순회 인덱스 i: 4
* 내부 순회 인덱스 j: 3 (i - 1)

<div class="array">
    <span class="over">1</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="target">7</span>
    <span class="current">2</span>
    <span>5</span>
</div>

<div class="array">
    <span class="over">1</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="current">2</span>
    <span class="target">7</span>
    <span>5</span>
</div>

* 순회 인덱스 i: 4
* 내부 순회 인덱스 j: 2 (j--)

<div class="array">
    <span class="over">1</span>
    <span class="over">3</span>
    <span class="target">4</span>
    <span class="current">2</span>
    <span>7</span>
    <span>5</span>
</div>

<div class="array">
    <span class="over">1</span>
    <span class="over">3</span>
    <span class="current">2</span>
    <span class="target">4</span>
    <span class="over">7</span>
    <span>5</span>
</div>

* 순회 인덱스 i: 4
* 내부 순회 인덱스 j: 1 (j--)

<div class="array">
    <span class="over">1</span>
    <span class="target">3</span>
    <span class="current">2</span>
    <span class="over">4</span>
    <span class="over">7</span>
    <span>5</span>
</div>

<div class="array">
    <span class="over">1</span>
    <span class="current">2</span>
    <span class="target">3</span>
    <span class="over">4</span>
    <span class="over">7</span>
    <span>5</span>
</div>

* 순회 인덱스 i: 5
* 내부 순회 인덱스 j: 4 (j - 1)

<div class="array">
    <span class="over">1</span>
    <span class="over">3</span>
    <span class="over">2</span>
    <span class="over">4</span>
    <span class="target">7</span>
    <span class="current">5</span>
</div>

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="target">5</span>
    <span class="current">7</span>
</div>

* 정렬 결과

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="target">5</span>
    <span class="current">7</span>
</div>

> 모든 정렬을 수행했으므로 정렬이 완료되었습니다.


### 예제코드

* 예제코드는 생각 보다 단순합니다. 아래와 같이 배열을 순회하는 i가 있고, `array[1..i]`에서 정렬을 하는 방식입니다.


```java
public class InsertionSort {
    
    public static void sort(int [] array) {

        for (int i = 1; i < array.length; i++) {
            int current = array[i];
            int j = i - 1;

            while(array[j + 1] < array[j]) {
                array[j + 1] = array[j];
                array[j--] = current;
            }
        }
    }
}
```
