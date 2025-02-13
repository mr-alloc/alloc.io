---
layout: post
title: 스택 (Stack)
categories: [data-structure]
tags: [Data Structure, Array]
date: 2019-09-09 13:53:00
profile-image: /post/profile/profile0.jpg
thumbnail: /post/data-structure/stack/index.png
current-company: Computer Academy
current-position: Student
summary: 스택
expose-images: true
excerpt-separator: <!--more-->
hide: false
---
스택은 후입선출(LIFO, Last In First Out)의 자료구조로, 데이터를 쌓아 올리는 방식으로 저장한다.
<!--more-->

## 스택이란?::what-is-stack

![스택](/post/data-structure/stack/index.png)
:{ "description": "스택" }

스택은 후입선출(LIFO, Last In First Out)의 자료구조로, 데이터를 쌓아 올리는 방식으로 저장한다.
스택에 값을 넣는 행위를 **Push**, 값을 꺼내는 행위를 **Pop**이라고 한다.

이미지 처럼 9라는 값을 넣고(Push) 다시 꺼내어(Pop)도 9가 나오게 된다.
이 자료구조는 컴퓨터의 메모리 구조에서 함수 호출과 복귀 주소를 저장하는데 사용된다.

프로세스가 메모리에 올라가서 함수의 호출을 받으면, 함수의 호출 정보를 스택에 저장하고 함수가 종료되면 스택에서 꺼내어 복귀 주소로 사용한다.
스택은 [배열](/docs/data-structure/array)이나 [연결 리스트](/docs/data-structure/linked-list)로 구현할 수 있다.

## 스택의 필수기능 구현::core-operations

* peek(): 스택의 맨 위에 있는 데이터를 반환한다. 말그대로 훔쳐보는 것이기 때문에 데이터를 꺼내지 않는다.

```text
method peek(): Item is
    return stack[top]
```

* push(item): 스택의 맨 위에 데이터를 추가한다.
```text
method push(Item item) is
    if stack is full then
        throw StackOverflowException
    top = top + 1 //마지막으로 들어간 요소의 인덱스를 증가시킨다.
    stack[top] = item //새로운 요소의 값을 넣는다.
```

* pop(): 스택의 맨 위에 있는 데이터를 꺼내어 반환한다.
```text
method pop(): Item is
    if stack is empty then
        throw StackUnderflowException
    Item item = stack[top] //맨 위에 있는 요소를 꺼낸다.
    top = top - 1 //맨 위에 있는 요소를 꺼냈으므로 인덱스를 감소시킨다.
    return item
```

## 스택의 구현::implementation

이 예제에서는 배열과, 연결 리스트로 스택을 구현한다.

::code-group
```cpp::(c++) Stack 상위 클래스
template <typename T>
class Stack {
    public:
        // 가상 소멸자
        virtual ~Stack() = default;
        virtual void push(const T& item) = 0;
        virtual T pop() = 0;
        virtual T peek() = 0;
        virtual bool is_empty() = 0;
        virtual int size() = 0;
};
```

```java::(java) Stack 상위 클래스
public interface Stack<T> {
    void push(T item);
    T pop();
    T peek();
    boolean isEmpty();
    int size();
}
```
::

두 가지 방식 모두 구현하기 위해, 상위 클래스를 만들어 공통된 메서드를 정의한다.

::code-group
```cpp::(c++) 배열로 구현한 스택
#include <iostream>
#include "Stack.h"
using namespace std;

template <typename T>
class ArrayStack final : public Stack<T> {
private:
    T* arr;
    int top;
    int cap;
public:
    explicit ArrayStack(const int cap): top(-1), cap(cap) {
        arr = new T[cap];
    }

    ~ArrayStack() override {
        delete[] arr;
    }

    void push(const T& item) override {
        if (top == cap -1) {
            throw overflow_error("Stack is full");
        }
        arr[++top] = item;
    }

    T pop() override {
        if (is_empty()) {
            throw underflow_error("Stack is empty");
        }

        return arr[top--];
    }

    T peek() override {
        if (is_empty()) {
            throw underflow_error("Stack is empty");
        }

        return arr[top];
    }

    bool is_empty() override {
        return top == -1;
    }

    int size() override {
        return top + 1;
    }

    friend ostream& operator<<(ostream& os, const ArrayStack<T>& stack) {
        os << "Stack: [";
        for (int i = stack.top; i >= 0; i--) {
            os << stack.arr[i];
            if (0 < i) os << ",";
        }
        os << "]";
        return os;
    }
};
```
```java::(java) 배열로 구현한 스택
public class ArrayStack<T> implements Stack<T> {
    private T[] arr;
    private int top;
    private int cap;

    public ArrayStack(int cap) {
        this.top = -1;
        this.cap = cap;
        arr = (T[]) new Object[cap];
    }

    @Override
    public void push(T item) {
        if (top == cap - 1) {
            throw new StackOverflowError("Stack is full");
        }
        arr[++top] = item;
    }

    @Override
    public T pop() {
        if (isEmpty()) {
            throw new StackUnderflowError("Stack is empty");
        }
        return arr[top--];
    }

    @Override
    public T peek() {
        if (isEmpty()) {
            throw new StackUnderflowError("Stack is empty");
        }
        return arr[top];
    }

    @Override
    public boolean isEmpty() {
        return top == -1;
    }

    @Override
    public int size() {
        return top + 1;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Stack [");
        for (int i = 0; i <= top; i++) {
            sb.append(arr[i]);
            if (i < top) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }
}
```
::

::code-group
```cpp::(c++) 연결 리스트로 구현한 스택
#include "Stack.h"
#include <iostream>
using namespace std;


template <typename T>
class LinkedListStack : public Stack<T> {
private:

    //연결 리스트를 위한 Node 구조체
    struct Node {
        T data;
        Node* next;

        explicit Node(const T& value) : data(value), next(nullptr) {}
    };

    Node* top;
    int cap;

public:
    explicit LinkedListStack(int capacity) : cap(capacity), top(nullptr) {}
    ~LinkedListStack() override {
        while (top != nullptr) {
            Node* temp = top;
            top = top->next;
            delete temp;
        }
    }
    void push(const T &item) override {
        Node* newNode = new Node(item);
        newNode->next = top;
        top = newNode;
        cap++;
    }

    T pop() override {
        if (is_empty()) {
            throw underflow_error("Stack is empty");;
        }
        Node* temp = top;
        T popped = temp->data;
        top = top->next;
        delete temp;
        cap--;

        return popped;
    }

    T peek() override {
        if (is_empty()) {
            throw underflow_error("Stack is empty");;
        }
        return top->data;
    }

    bool is_empty() override {
        return top == nullptr;
    }

    int size() override {
        return top == nullptr ? 0 : cap;
    }

    friend ostream& operator<<(ostream& os, const LinkedListStack<T>& stack) {
        os << "Stack: [";
        Node* current = stack.top;
        while (current != nullptr) {
            os << current->data;
            if (current->next != nullptr) {
                os << ", ";
            }
            current = current->next;
        }
        os << "]";
        return os;
    }
};
```
```java::(java) 연결 리스트로 구현한 스택
public class LinkedListStack implements Stack {
    private Node top;
    private int cap;

    public LinkedListStack(int capacity) {
        this.cap = capacity;
        this.top = null;
    }

    @Override
    public void push(Object item) {
        Node newNode = new Node(item);
        newNode.next = top;
        top = newNode;
        cap++;
    }

    @Override
    public Object pop() {
        if (isEmpty()) {
            throw new StackUnderflowError("Stack is empty");
        }
        Node temp = top;
        Object popped = temp.data;
        top = top.next;
        temp.next = null;
        cap--;
        return popped;
    }

    @Override
    public Object peek() {
        if (isEmpty()) {
            throw new StackUnderflowError("Stack is empty");
        }
        return top.data;
    }

    @Override
    public boolean isEmpty() {
        return top == null;
    }

    @Override
    public int size() {
        return top == null ? 0 : cap;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Stack: [");
        Node current = top;
        while (current != null) {
            sb.append(current.data);
            if (current.next != null) {
                sb.append(", ");
            }
            current = current.next;
        }
        sb.append("]");
        
        return sb.toString();
    }
    
    public static class Node<T> {
        T data;
        Node next;
        
        public Node(T data) {
            this.data = data;
            this.next = null;
        }
    }
```
::

## 스택의 사용::usage

::code-group
```cpp::클라이언트 코드
LinkedListStack<int> stack(100);
stack.push(10);
stack.push(20);

cout << stack << endl;

const int popped = stack.pop();
cout << "popped: " << popped << endl;
cout << stack << endl;

stack.push(75);
cout << "pushed: " << 75 << endl;
cout << stack << endl;
```
```text::출력 결과
Stack [10,20]
popped: 20
Stack [10]
pushed: 75
Stack [10,75]
```
::
