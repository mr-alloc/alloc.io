---
layout: post
title: 힙 (Heap)
tags: [Java, Data Structure, Sort, Heap Sort, Heap]
date: 2022-05-06 20:53:00 +0900
profile-image: /post/profile/profile4.jpg
thumbnail: /post/data-structure/heap/index.svg
current-company: Herit Corporation
current-position: Backend Server Developer
summary: 힙
expose-images: true
excerpt-separator: <!--more-->
hide: false
---
"heap"이라는 단어는 원래 영어에서 "쌓아올린 더미"또는 "무질서하게 쌓아올린 것"을 의미한다.

데이터 구조로서 Heap이라는 이름이 붙게 된 것은 1964년 J.W.J. Williams가 발표한 논문에서 처음 사용되었다.

윌리엄즈는 이진트리를 배열로 표현하면서 부모-자식 관계가 마치 더미(heap)처럼 쌓여 있는 모양이라고 표현하였다.
<!--more-->

## 설명::intro

간단하게 말하여, 힙은 우선순위 큐 입니다. `JAVA`에서는 `PriorityQueue`라는 구현체를 통해 Heap 자료구조를 사용할 수 있어요.
힙은 두 종류가 있는데 `최대 힙`과 `최소 힙`이 있어요.
최대 Heap(최소 Heap)은 단어와 같이 최대 값(최소 값)을 우선순위로 판단하여, 어떠한 값이 들어와도, 항상 같은 순서의
트리를 유지하며, 언제든지 최고 우선순위의 값을 적은 비용으로 쉽게 얻을수 있는 자료구조 입니다.

### Heap의 속성 (성질)::temper

* 최대 힙(**또는 최소 힙**)은 `잎(leaf)`의 계층을 제외한 모든 노드는 자식의 노드 보다 큰(**또는 작은**) 값을 가지고 있어야합니다.
* 왼쪽부터 차례대로 채워져있는 `완전 이진 트리(Complete binary tree)`이어야 합니다.
* 같은 계층의 노드들과는 정렬하지 않습니다.
* 루트(뿌리)노드로 부터 내려오는 위치의 노드들 오름차순(**또는 내림차순**)입니다

![위 트리중 어떤것이 힙일까?](/post/data-structure/heap/tree-images.svg)

* 트리 A: 잎을 제외한 노드는 모두 정렬되었지만, 왼쪽부터 채워지지않아 Heap이 아닙니다.
* 트리 B: 왼쪽부터 채워졌지만, 2번노드의 값은 그 자식에값보다 작습니다. 따라서 Heap이 아닙니다.
* 트리 C: 잎을 제외한 모든 노드가 자식 또는 부모와 정렬 되어있고, 왼쪽부터 채워져있으므로 `Heap`입니다.

> 이를 정리하면 아래와 같습니다.   
> 1.`𝑛개`의 노드를 가진 힙은 정확히 하나만 있고 그 힙(트리)의 높이(height)는 `⎣log₂𝑛⎦`이다. 트리의 전체 노드의 개수가 `8`일경우 트리(힙)의 높이는 `3`이다. 즉 힢의 높이는 힙의 성질(속성)에 부합되는 노드들만 인정이 된다는 의미이다.  
> 2.힙의 루트 노드는 항상 최댓값(**또는 최솟값**)을 저장한다. 최대 힙(**또는 최소 힙**)은 쵀댓값(**또는 최솟값**)을 효율적으로 관리하기 위한 자료구조이며, 루트에는 항상 가장 큰(**또는 작은**)값을 유지한다.  
> 3.힙의 한 노드와 그 노드의 자손 노드들로 이루어진 부분 트리(subtree)도 힙이다. 힙은 힙으로 이루어져있으며 자식노드도 힙이 될수있지만, 노드의 자식이없다면 힙이될 수없다. 따라서 위 C 트리의 `4, 5, 6`번 노드는 힙이 아니다.  
:{ "type": "note", "icon": "info" }

### Heap을 만드는 방법::how-to-make-heap

힙을 구성 하기 위해서는 다음의 순서대로 진행됩니다.

1. 순회를 시작할 힙이되는 마지막 노드`⎣𝑛/₂⎦`를 찾는다.
2. 마지막 노드 i를 이용해 자식노드가 있는지, 또한 있다면 그 중 자신 보다 큰값을 자신과 찾는다.
3. 찾은 값과 자신을 바꾸고 바꾼 자신의 위치는 그값의 자식이 되며, 자신보다 큰값이 나오지 않을때까지 반복한다.
4. 다음 노드(i -1)에서 다시 `3.`을 반복한다.

> 자식 노드의 위치를 찾을때는 왼쪽`arr[2i]`값과 오른쪽`arr[2i + 1]`로 구할 수 있습니다.
:{ "type": "tip", "icon": "lightbulb" }

위 의 내용을 정리하면 아래와 같습니다.


![힙을 만드려면 완전 이진트리가 있어야 한다.](/post/data-structure/heap/first-iteration.svg)

> 위의 트리는 *완전 이진트리* 입니다. 힙은 완전이진트리에서 만들수 있으므로, 일반 이진트리는 Compact하게 완전이진트리로 바꿔야 힙을 만들수 있습니다.
> 왼쪽 트리의 마지막 힙의 값은 `15` 이며, 이는 자식(`6, 4`) 어느것 보다도 큰값입니다. 따라서 다음 순회로 넘어갑니다.
> 순회는 내부 노드의 마지막 힙의 위치에서 부터 1까지 이어집니다. 따라서 다음 인덱스인 3번 노드(9)로 넘어갑니다.
> 3번노드는 자신의 자식들 중 6번째, 7번째 (7, 12)와 비교하여 더 큰값을 가지는 12와 바꿉니다.
:{ "type": "note", "icon": "info" }

![만약 마지막 내부노드부터 순회할 때, 쵀대힙을 만드려면 위와 같이 만들수 있어요.](/post/data-structure/heap/other-iteration.svg)

> 이후 과정은 위와 같이 반복됩니다. 내부노드를 순회하며 자신의 자식노드가 있는지 확인하고 있다면, 자신과 비교하여 더큰 값으로 바꿉니다. 이는 바꾼이후에도 `3.`이 반복되게 됩니다. 순회되는 노드가 최상위노드가 되고 모든 내부노드가 힙이 될때, 전체 트리는 힙이 됩니다.   
> 마지막까지 바꾼 최종트리는 아래와 같습니다.
:{ "type": "note", "icon": "info" }

![최대힙을 만들어 이런 형태로 노드를 나눌수 있어요.](/post/data-structure/heap/last-iteration.svg)

* 최상위 노드(루트)가 가장 큰값이 되며, 위는 최대힙을 만드는 단계였습니다.
* 부모노드와 자식노드끼리는 순서의 값을 가지며, 항상 최대의 값을 가집니다.

### Heap이 우선 값을 유지하는 방법::how-to-keeping-priority-value

위에서는 완전이진트리로 힙을 어떻게 만드는지에 대해 알아봤습니다.
하지만, 힙은 언제나 새로운값이 들어와도 항상 우선 순위로 값을 관리합니다. 만약 저기서 더큰값이 추가된다면,
저 힙트리는 어떻게 바뀔까요? 새로운 값들을 추가해서 힙이 다시 어떻게 유지되는지 배워봅니다.

#### 값 추가::add-new-value

힙트리에서 값을 추가 할때는 마지막 노드로 붙여주고 위에서 했던것과 동일하게 힙을 만들어 줍니다.
만약 새로운 값 17이 힙에 들어온다면 순서는 아래와 같이 바뀝니다.

::image-group

![만약 다음의 힙에서 17이라는 값이 추가 된다면](/post/data-structure/heap/add-new-17.svg)

![이런식으로 부모노드와 바꿔가며, 다시 힙을 유지할 수 있어요.](/post/data-structure/heap/add-new-17-2.svg)

::


> A: 새로 들어온 값 17은 트리의 맨뒤인 10번노드로 들어갑니다.     
> 또한 마지막 내부노드이자 자신의 부모인 5번 노드(4)부터 다시 순회를 시작하며,  
> 자신보다 큰 값은 가진 자식 10번 노드(17)과 값을 바꿉니다.
> B: 값이 바뀐 10번 노드(4)는 자식을 가지고있지 않으므로 다음 순회로 넘어갑니다.  
> C: 다음 순회인 4번 노드(6)은 자식들보다 큰값이므로 다음 3번 노드(12)로 이동합니다. 하지만 이또한 자식들보다 값이 크므로, 2번 노드(8)로 이동합니다. 자신보다 큰값을 가지는 5번 자식노드(17)과 바꿉니다.  
> D: 값이 바뀐 5번 노드(8)은 자식들 보다 값이 커, 바꿀 필요가 없으므로 다음 순회인 1번 노드(15)로 이동합니다.  
> E: 현재 순회인 1번 노드(15)는 자신의 2번 노드(17)보다 값이 작으므로 바꿉니다.  
> F: 최종적으로 힙이 완성되었습니다.
:{ "type": "tip", "icon": "check-circle" }

## 구현 코드 (Java)::implementation-code

::code-group

```java::힙 만들기
//== 힙(Heap) 을 만드는 메소드 ==//
public static void makeHeap(int arr[]) {
    // last heap
    int lh = arr.length / 2;
    System.out.println("Normal Array = " + Arrays.toString(arr));
    int eh = arr.length;
    while (lh-- > 0) {

        System.out.println("i: " + lh);
        pushDown(arr, lh, eh);
    }

    System.out.println("Array as Max Heap = " + Arrays.toString(arr));
}
```

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
public static void main(String args []) throws Exception {
    //== 힙 으로 만들기==//
    int array [] = {1, 5, 8, 2, 74, 9, 12, 104, 87, 43};
    Heap.makeHeap(array);
}
```




