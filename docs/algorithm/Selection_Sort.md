---
layout: post
title: -Algorithm- Selection Sort (선택정렬 알고리즘) feat.java
categories: [Development, Algorithm]
tags: [Java, Algorithm, Sort, Selection Sort]
date: 2022-04-04 23:34:00 +0900
thumbnail: "/assets/blogging/algorithm/selection_sort_intro.png"
current_company: Herit Corporation
current_position: Backend Server Developer
summary: 선택 정렬
excerpt_separator: <!--more-->
hide: false
---
기본 정렬 알고리즘중 하나인 선택 정렬(Selection Sort)입니다.
간단한 그림과 함께 쉽게 이해할 수 있도록 정리했어요.
<!--more-->


## 선택정렬 (Selection Sort)


🌸 선택 정렬은 정렬할 배열을 순회하며, 어떤 원소로 대치할지 선택하여 정렬하는 알고리즘 입니다.
설명을 보기에 앞서, 통상적으로 정렬은 오름 또는 내림으로 배열의 수열을 맞추어 순서를 만드는 행위로 의미합니다.

---
  
  
  

<div class="array">
    <span>1</span>
    <span>4</span>
    <span>7</span>
    <span>3</span>
    <span>2</span>
    <span>5</span>
</div>


> 정렬을 하기위해 배열을 준비합니다. 또한, 해당 배열을 순회하면서 *나머지들의 값들중 가장작은 값으로 변경합니다.

순회 인덱스 i: 0

<div class="array">
    <span class="current">1</span>
    <span>4</span>
    <span>7</span>
    <span>3</span>
    <span>2</span>
    <span>5</span>
</div>

> 첫번째 순회요소는 나머지의 값들중 가장작은 값인 1 입니다. 따라서, 변경하지않습니다.

순회 인덱스 i: 1

<div class="array">
    <span class="over">1</span>
    <span class="current">4</span>
    <span>7</span>
    <span>3</span>
    <span class="target">2</span>
    <span>5</span>
</div>

> 두번째는 4입니다. 나머지의 요소들중 가장작은값이 2가 존재합니다. 4와 2를 변경합니다. 다음 부터는 정렬 순서가 동일합니다. 배열의 끝까지 순회하며 나머지 값들로 선택후 변경으로 정렬합니다.

순회 인덱스 i: 2

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="current">7</span>
    <span class="target">3</span>
    <span>4</span>
    <span>5</span>
</div>

순회 인덱스 i: 3

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="over">3</span>
    <span class="current">7</span>
    <span class="target">4</span>
    <span>5</span>
</div>

순회 인덱스 i: 4

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="current">7</span>
    <span class="target">5</span>
</div>

순회 인덱스 i: 5

<div class="array">
    <span class="over">1</span>
    <span class="over">2</span>
    <span class="over">3</span>
    <span class="over">4</span>
    <span class="over">5</span>
    <span class="over">7</span>
</div>

## 과정 코드

* 요소 교환
```java
    /**
     * i 와 j 값 변경
     * 각 인덱스로 접근하므로 시간복잡도는 상수시간을 갖는다. O(1)
     * @param array
     * @param i
     * @param j
     */
public static void swapElements(int [] array, int i, int j) {
    int temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
```

* 최소값 찾기
```java
/**
 * start 인덱스 부터 시작해서 끝까지 순회중 가장 작은 값을 리턴한다.
 * @param array
 * @param start
 * @return
 */
public static int indexLowest(int [] array, int start) {
    int lowIndex = start;

    for(int i = start;i < array.length;i++) {
        if(array[i] < array[lowIndex]) {
            lowIndex = i;
        }
    }
    return lowIndex;
}
```

* 최소값을 찾고, 변경
```java
/**
 * indexLowest 메서드를 통해 얻어온 가장작은값의 인덱스를 현재 인덱스와 변경한다.
 * @param array
 */
public static void selectionSort(int [] array) {
    System.out.printf("before selection sort : %s\n", Arrays.toString(array));
    for(int i = 0;i < array.length;i++) {
        int j = indexLowest(array, i);
        swapElements(array, i, j);

        System.out.printf("(i = %d) array : %s\n",i , Arrays.toString(array));
    }

}
```

### 호출

```java
import sort.selection_sort.SelectionSort;

public class Main {

    public static void main(String[] args) throws Exception {
    
        int [] needSort = {1, 4, 7, 3, 2, 5};
        
        SelectionSort.selectionSort(needSort);
    }
}
```

### 콘솔
```
before selection sort : [1, 4, 7, 3, 2, 5]
(i = 0) array : [1, 4, 7, 3, 2, 5]
(i = 1) array : [1, 2, 7, 3, 4, 5]
(i = 2) array : [1, 2, 3, 7, 4, 5]
(i = 3) array : [1, 2, 3, 4, 7, 5]
(i = 4) array : [1, 2, 3, 4, 5, 7]
(i = 5) array : [1, 2, 3, 4, 5, 7]
after selection sort : [1, 2, 3, 4, 5, 7]
```

> 풀이 또는 잘못된 설명은 아래 댓글로 말씀 부탁드립니다.

