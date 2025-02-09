---
layout: post
title: 연결 리스트 (Linked List)
categories: [algorithm]
tags: [Data Structure, Linked List]
date: 2019-09-24 20:53:00
profile-image: /post/profile/profile0.jpg
thumbnail: /post/algorithm/linked-list.png
current-company: Computer Academy
current-position: Student
summary: 연결 리스트
expose-images: true
excerpt-separator: <!--more-->
hide: false
---
연결 리스트는 여러개의 노드가 연결된 자료구조로, 값의 변경(삽입, 삭제)이 용이하다.
배열과 다르게 각 노드를 연결하는 방식이라 크기가 동적으로 변할 수 있다.
<!--more-->

## 연결리스트란?::what-is-linked-list

::text-wrapping
![노드](/post/algorithm/node.png)

연결 리스트는 노드를 사용하여 구현하는데, 노드란 어떤 자료구조를 구성하기 위해 사용되는 각 요소를 의미한다. 값을 래핑하는 역할을 한다.  

사용하려는 자료 구조에 따라 노드를 연결하기위해 next, prev 등의 포인터를 사용한다.

::{ "align": "left", "max-width": "80px" }

일반적으로 연결 리스트에서는 노드에 `next` 포인터(다른 노드를 참조)를 추가하여 구현한다.

![연결 리스트](/post/algorithm/linked-list.png)
:{ "description": "연결 리스트" }

연결 리스트는 이미지처럼 노드의 `next` 필드가 다음 노드를 참조하고 있다. 
따라서 값을 추가 할때 마다 현재의 최상위 노드와 새로운 노드를 연결해줘야 한다.

이는 대략적으로 다음과 같은 구조가 된다.
```text
//노드
class Node<T> is
    T data
    Node<T> next
    
//연결 리스트
class LinkedList<T> is
    Node<T> head;
    Node<T> tail;
    ...
```

연결 리스트에 새로운 값을 추가하려면 새로운 노드의 `next`를 `head`로 설정하고, `head`를 새로운 노드로 설정한다.

![연결 리스트 추가](/post/algorithm/add-to-linked-list.png)
:{ "description": "연결 리스트에 새로운 노드를 추가" }

반대로 제거할 때도, `head`를 다음 노드로 설정하고, 제거할 노드를 해제한다.

> 연결 리스트는 여러 종류가 있지만, 단방향의 경우 `head`는 가장 마지막에 들어온 요소를 의미한다.
:{ "type": "tip", "icon": "lightbulb" }


## 연결 리스트의 필수기능 구현::core-operations

좀 더 다양한 구현을 위해 이중 연결 리스트를 이용하여 앞, 뒤로 추가 및 제거를 구현 해본다.

* 값 추가 (push_back)

```text
method push_back(Item item) is
    Node newNode = new Node(item)
    newNode.next = head
    head = newNode
    
    size++;
```

* 값 제거 (pop_back)

```text
method pop_back(): Item is
    if is_empty() then
        throw EmptyListException
    
    Node temp = head
    Item item = temp.data
    head = temp.next
    
    size--;
    
    return item
```

* 공백 확인 (is_empty)

```text
method is_empty(): boolean is
    return size == 0
```

## 연결 리스트의 구현::implementation

**Node Class**
::code-group

```cpp::c++
template <typename U>
struct Node {
    U data;
    Node *next;

    explicit Node(const U& data): data(data), next(nullptr) {}
};
```

```java::java
public class Node<T> {
    public T data;
    public Node<T> next;

    public Node(T data) {
        this.data = data;
        this.next = null;
    }
}
```
::

**LinkedList Class**

::code-group
```cpp::c++
template <typename T>
class LinkedList {
private:
    Node<T>* head;
    size_t size;
public:
    LinkedList(): head(nullptr), size(0) {}
    ~LinkedList();
    void push_back(T value);
    T pop_back();
    bool is_empty() const;
    friend ostream& operator<<(ostream& os, const LinkedList<T>& list) {
        os << "[";
        Node<T>* current = list.head;
        while (current != nullptr) {
            os << current->data;
            current = current->next;
            if (current != nullptr) {
                os << ", ";
            }
        }
        os << "]";
        return os;
    }
};
```
```java::java
public class LinkedList<T> {
    private Node<T> head;
    private int size;

    public LinkedList() {
        head = null;
        size = 0;
    }

    ...

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        Node<T> current = head;
        while (current != null) {
            sb.append(current.data);
            current = current.next;
            if (current != null) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }
}
```
::


**push_back 구현**
::code-group
```cpp::c++
template<typename T>
void LinkedList<T>::push_back(T value) {
    auto* newNode = new Node<T>(value);
    newNode->next = head;
    head = newNode;

    size ++;
}
```
```java::java
public void pushBack(T value) {
    Node<T> newNode = new Node<>(value);
    newNode.next = head;
    head = newNode;

    size++;
}
```
::

**pop_back 구현**

::code-group
```cpp::c++
template<typename T>
T LinkedList<T>::pop_back() {
    if (is_empty()) throw underflow_error("The linked list is empty");
    auto* current = head;
    T value = current->data;
    head = current->next;
    delete current;
    size --;
    return value;

}
```
```java::java
public T popBack() {
    if (isEmpty()) throw new EmptyListException();

    Node<T> current = head;
    T value = current.data;
    head = current.next;
    size--;

    return value;
}
```
::

**is_empty 구현**

::code-group
```cpp::c++
template<typename T>
bool LinkedList<T>::is_empty() const {
    return size == 0;
}
```
```java::java
public boolean isEmpty() {
    return size == 0;
}
```
::

