---
layout: post
title: 큐 (Queue)
categories: [algorithm]
tags: [Data Structure, Queue]
date: 2019-10-04 19:30:00
profile-image: /post/profile/profile0.jpg
thumbnail: /post/algorithm/queue.png
current-company: Computer Academy
current-position: Student
summary: 큐
expose-images: true
excerpt-separator: <!--more-->
hide: false
---
Queue는 무엇인가 기다리는 행렬을 의미한다.  
선입선출(FIFO, First In First Out)로 데이터를 관리하는 Queue를 알아보자. 
<!--more-->

## 큐란?::what-is-queue

![큐](/post/algorithm/queue.png)
:{ "description": "큐의 enqueue 와 dequeue" }

**Queue** 자료구조는 [배열](/docs/algorithm/array)로도 구현할 수 있고, [연결 리스트](/docs/algorithm/linked-list)로도 간단하게 구현할 수 있다.
위 이미지와 같이 `Queue`는 먼저 들어온 요소가 먼저 나올 수 있는 선입선출(FIFO, First In First Out)의 자료구조이다.

`Queue`에는 값을 넣을수 있는 `enqueue`와 값을 꺼낼 수 있는 `dequeue`를 구현한다.

이는 대략적으로 아래와 같은 구조를 가진다.

```text
//노드
class Node<T> is
    T data
    Node<T> next
    
//연결 리스트
class Queue<T> is
    Node<T> front
    Node<T> rear
    int size
    
    method is_empty(): boolean
    method peek(): T
    method enqueue(T item)
    method dequeue(): T
```


## 큐의 필수기능 구현::core-operations

* 값 추가 (enqueue)

```text
method enqueue(T item) is
    Node<T> newNode = new Node<>(item)
    if is_empty() then
        front = newNode // 큐가 비어있다면 새로운 노드로 front를 설정
    else
        rear.next = newNode //요소가 있다면, rear의 다음 노드로 설정
    rear = newNode
    size++
```

* 값 제거 (dequeue)

```text
method dequeue(): T is
    if is_empty() then
        throw EmptyQueueException
    T item = front.data // front의 데이터를 가져온다.
    front = front.next // front를 다음 노드로 설정
    
    // front가 null이면 rear도 null로 설정
    if (front == null) then
        rear = null
    
    size--
    return item
```

* 공백 확인 (is_empty)

```text
method is_empty(): boolean is
    return size == 0
```

* 값 확인 (peek)

```text
method peek(): T is
    if is_empty() then
        throw EmptyQueueException
    return front.data
```

## 큐의 구현::implementation

::code-group
```cpp::c++
using namespace std;

template <typename T>
class Queue {
private:
    struct Node {
        T data;
        Node *next;
        explicit Node(const T &data): data(data), next(nullptr) {}
    };  
    Node *front;
    Node *rear;
    size_t size;

public:
    Queue(): front(nullptr), rear(nullptr), size(0) {}
    ~Queue() {
        while (!is_empty()) {
            dequeue();
        }
    }
    bool is_empty() const {
        return size == 0;
    }
    void enqueue(T data) {
        Node *newNode = new Node(data);
        if (is_empty()) {
            front = newNode;
        } else {
            rear->next = newNode;
        }
        rear = newNode;
        size++;
    }
    T dequeue() {
        if (is_empty()) throw underflow_error("Queue is empty!");
        Node* temp = front;
        front = front->next;
        T data = temp->data;
        delete temp;

        if (front == nullptr) rear = nullptr;

        size--;
        return data;
    }
    T peek() const {
        if (is_empty()) throw underflow_error("Queue is empty!");
        return front->data;
    }
    friend ostream& operator<<(ostream& os, const Queue& q) {
        os << "[";
        Node* temp = q.front;
        while (temp != nullptr) {
            os << temp->data;
            if (temp->next != nullptr) os << ", ";
            temp = temp->next;
        }

        os << "]";
        return os;
    }
};
```
```java::java
public class Queue<T> {
    private class Node {
        T data;
        Node next;
        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }
    private Node front;
    private Node rear;
    private int size;

    public Queue() {
        front = null;
        rear = null;
        size = 0;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public void enqueue(T data) {
        Node newNode = new Node(data);
        if (isEmpty()) {
            front = newNode;
        } else {
            rear.next = newNode;
        }
        rear = newNode;
        size++;
    }

    public T dequeue() {
        if (isEmpty()) throw new RuntimeException("Queue is empty!");
        Node temp = front;
        front = front.next;
        T data = temp.data;
        temp = null;

        if (front == null) rear = null;

        size--;
        return data;
    }

    public T peek() {
        if (isEmpty()) throw new RuntimeException("Queue is empty!");
        return front.data;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        Node temp = front;
        while (temp != null) {
            sb.append(temp.data);
            if (temp.next != null) sb.append(", ");
            temp = temp.next;
        }
        sb.append("]");
        return sb.toString();
    }
}    
```
::

