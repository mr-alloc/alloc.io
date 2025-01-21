---
layout: post
title: Insertion Sort (삽입 정렬)
categories: [algorithm]
tags: [Java, Algorithm, Sort, Insertion Sort]
date: 2019-11-05 18:25:00 +0900
thumbnail: /post/algorithm/insertion-sort-intro.png
current-company: Computer Academy
current-position: Student
summary: 삽입 정렬
excerpt-separator: <!--more-->
hide: false
---

정렬 방식중 하나인, 삽입 정렬에 대해 알아보자.
<!--more-->

## 소개::intro

🌸 삽입정렬은 배열을 순회하며, 삽입할 위치를 찾고 요소들을 **한단계씩 밀어** 해당 위치에 삽입하며 정렬하는 알고리즘 이다.
삽입정렬 또한 선택정렬과 마찬가지로 정렬된 부분과 정렬되지 않은 부분으로 나뉜다.

> **한단계씩 밀어** 라는 말은 `[ 1 ][ 3 ][ 2 ]` 에서 2라는 요소를 임시로 빼고 1 과 3사이에 들어갈공간을 만들기 위해 뺀 2의 자리로 3을 한 단계밀어,
> `[ 1 ][    ][ 3 ]` 처럼 빈 공간을 만든 다는 의미이다.
:{ "type": "tip", "icon": "lightbulb"}

---

## 설명::how-to-make-insertion-sort

순회 인덱스 i: 3 (0, 1, 2는 요소가 1, 4, 7이므로 정렬이되어 있으므로, 넘어간다.)

[1, 4, `7`, 3, 2, 5] → [1, 4, **3**, `7`, 2, 5]

> 삽입정렬은 지나온 요소들과 비교하여 밀면서 정렬해 나간다. 위 배열에서 1, 4, 7 요소는 정렬 되있기 때문에,
> `j`는 (j = i - 1, 현재 3) 0이 될때까지 계속 순회하며 이전값과 비교하여 정렬 대상인지 아닌지를 판단한다.
:{ "type": "note", "icon": "info"}

순회 인덱스 i: 3

> 한번의 정렬이 끝났으니 `j`를 감소시켜 또다시 이전 요소 (3과 4)를 비교하여 정렬대상이 되었다.
> i는 현재 3이지만 `i` 이전의 인덱스를 가진 요소들은 정렬되지 않았기 때문에 `j`를 감소시켜가며 끝까지 정렬한다.
:{ "type": "note", "icon": "info"}

* 순회 인덱스 i: 3
* 내부 순회 인덱스 j: 2 → 내부 순회 인덱스 j: 1

[1, `4`, 3, 7, 2, 5] → [1, **3**, `4`, 7, 2, 5]

> 내부 순회 인덱스를 줄여가며 정렬을 하였고 현재 내부 순회 인덱스(`j`)인 1에대한 요소(3)가 비교할 인덱스 0에대한 요소(1)과 정렬되어있다고 판단 하기에,
> j는 더이상 감소시키지 않는다. 따라서 `i`를 다시 증가시키며 이과정을 반복하여 정렬한다.
> 이후의 과정은 아래와 같다.
:{ "type": "note", "icon": "info"}

* 순회 인덱스 i: 4
* 내부 순회 인덱스 j: 3 (i - 1)

[1, 3, 4, `7`, **2**, 5] -> [1, 3, 4, **2**, `7`, 5]  

* 순회 인덱스 i: 4
* 내부 순회 인덱스 j: 2 (j--)

[1, 3, `4`, **2**, 7, 5] -> [1, 3, **2**, `4`, 7, 5]

* 순회 인덱스 i: 4
* 내부 순회 인덱스 j: 1 (j--)

[1, `3`, **2**, 4, 7, 5] -> [1, **2**, `3`, 4, 7, 5]  

* 순회 인덱스 i: 5
* 내부 순회 인덱스 j: 4 (j - 1)

[1, 2, 3, 4, `7`, **5**] -> [1, 2, 3, 4, **5**, `7`]  

* 정렬 결과

[1, 2, 3, 4, 5, 7]

> 모든 정렬을 수행했으므로 정렬이 완료되었다.
:{ "type": "tip", "icon": "check-circle"}

## 예제코드::example-code

* 예제코드는 생각 보다 단순하다. 아래와 같이 배열을 순회하는 i가 있고, `array[1..i]`에서 정렬을 하는 방식이다.

```java::InsertionSort.java
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
