---
layout: post
title: 힙 정렬 (Heap Sort)
tags: [Java, Algorithm, Sort, Heap Sort, Heap]
date: 2022-05-25 12:44:00
profile-image: /post/profile/profile4.jpg
thumbnail: /post/algorithm/heap-sort/sort-8.svg
current-company: Herit Corporation
current-position: Backend Server Developer
summary: 힙 정렬
expose-images: true
excerpt-separator: <!--more-->
hide: false
---
이전에 학습 했던 우선순위큐 "heap"으로 간단히 정렬을 구현 해보자.
<!--more-->
### Heap을 이용해 정렬을 하는 방법::how-to-sort-by-heap

힙 정렬을 위해서는 사전에 완전 이진 트리를 힙으로 만들고, 정렬을 수행할 수 있습니다.
위에서 만든 힙을 통해 정렬을 하는 방법을 구현합니다.  
힙 정렬은 간단하게, 아래의 정렬하는 순서를 가지고있습니다.

1. 최상위 노드 `A`와 가장 끝의 노드 `B`를 바꾼다.
2. 바꿔진 A는 맨뒤로 가며,힙에서 제외한다. 
3. 바꾼 값 `B`는, 자신의 자식이 있다면, 두개를 비교하여 가장 큰 값과 맞 바꾼다.
4. `3.`의 내용을 힙이될때까지 반복한다.

정렬을 할 때는 Heap의 우선값을 이용해 진행하기 때문에 `최대 힙` 으로는 오름차순 정렬, `최소 힙`으로는 내림차순 정렬을 할 수 있다.

::image-group

![가장 우선순위가 높은 값을 뒤로 이동시키고 다시 루트노드부터 힙을 만든다. 이 때 노드의 범위에서 정렬된 개수 만큼만 제외한다.](/post/algorithm/heap-sort/sort-1.svg)

![두번째도 동일하게 루트를 뒤로 보내고 다시 힙을 만든다.](/post/algorithm/heap-sort/sort-2.svg)

![이 과정에서 제외된 범위는 오름차순으로 점점 정렬되는 것을 볼 수 있다.](/post/algorithm/heap-sort/sort-3.svg)

![정렬되는 요소가 많을 수 록 힙을 만드들기 위해 탐색하는 시간 또한 줄어든다.](/post/algorithm/heap-sort/sort-4.svg)

![각 요소마다 정렬되는 시간이 logN이기 때문이다.](/post/algorithm/heap-sort/sort-5.svg)

![](/post/algorithm/heap-sort/sort-6.svg)

![](/post/algorithm/heap-sort/sort-7.svg)

![마지막 요소까지 정렬](/post/algorithm/heap-sort/sort-8.svg)

::


## 구현 코드 (Java)::implementation-code

::code-group
```java::노드 비교
//== 노드와 그 자식중에서 더큰(또는 작은) 위치를 찾는 메소드 ==//
public static int findLargest(int arr[], int node, int eh) {
    // first child
    int fc = (2 * (node + 1)) - 1;

    if (fc + 1 < eh) {
        if (arr[fc] <= arr[fc + 1]) {
            return arr[fc + 1] <= arr[node] ? node : fc + 1;
        } else {
            return arr[fc] <= arr[node] ? node : fc;
        }
    }
    if (fc < eh && arr[node] < arr[fc]) {
        return fc;
    } else {
        return node;
    }
}
```
```java::값 교환
//== 값을 아래로 내리는 메소드 ==//
/**
 * 간단하게 보면 트리에서 마지막 힙의 위치를 구하고,
 * 루트 노드까지 역순으로 힙을 만들어갑니다.
 * 
 * 최대 힙(또는 최소 힙)의 조건에 따라 더큰(또는 더 작은)값을 기준으로,
 * 해당 노드를 위로올리고 변경된 대상은 아래로 내려가며 계속 바꿉니다.
 */
public static void pushDown(int arr[], int node, int eh) {
    do {
        System.out.println("j: " + node);
        int temp = arr[node];
        int large = findLargest(arr, node, eh);
        System.out.println(drawBinaryTree(arr));

        if (large == node)
            break;

        arr[node] = arr[large];
        arr[large] = temp;

        node = large;
    } while (node <= eh);
}
```

```java::정렬
public static void sort(int heap[]) {
    int last = arr.length;
    makeHeap(arr);

    while (--last >= 0) {

        int temp = arr[0];
        arr[0] = arr[last];
        arr[last] = temp;

        System.out.println("last: " + last);
        pushDown(arr, 0, last);
    }
    ;
}
```

```java::출력 메소드
public static String drawBinaryTree(int arr[]) {
    StringBuilder builder = new StringBuilder();

    int nol = (int) (Math.log(arr.length) / Math.log(2)) + 1;
    int max = (int) Math.pow(2, nol - 1);

    int printed = 0;
    for (int i = 0; i < nol; i++) {
        int perFloor = (int) Math.pow(2, i);
        int tab = (max - perFloor) / 2 + (max - perFloor) % 2;
        int last = printed + perFloor;

        for (int j = 0; j < tab; j++) {
            builder.append("  ");
        }
        for (int j = printed; (j < arr.length && j < last); j++) {
            builder.append(String.format("(%d)", arr[j]));
        }
        builder.append("\n");
        printed += perFloor;
    }

    return builder.toString();
}
```

::

```java::메인 함수
public static void sort(int [] heap) throws Exception {
    Heap.sort(arr);
}
```




