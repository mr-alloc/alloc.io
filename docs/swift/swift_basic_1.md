---
layout: post
title: -Swift- 1.조건문과 반복문
categories: [Development, Swift]
tags: [Swift]
date: 2022-09-05 23:42:00 +0900
current_company: NEOWIZ
current_position: Software Engineer
summary: 조건문과 반복문
excerpt_separator: <!--more-->
hide: false
---
Swift의 조건문과 반복문입니다.
아주 간단한 예제로 알아봅니다. 🧐
<!--more-->


## 조건문

### if Clause

```swift
let someInteger = 100

if someInteger < 100 {
    print("100 미만")
} else if someInteger > 100 {
    print("100 초과")
} else {
    print("100")
}
```

조건문에는 괄호를 사용하지 않는다.

### switch Clause
```swift{4,9}
switch someInteger {
case 0:
    print("zero")
case 1..<100:
    print("1 ~ 99")
case 100:
    print("100")
    print("say yes~")
case 101...Int.max:
    print("over 100")
default:
    print("unknown")
```

> 4, 9번 조건을 보면, 범위에 대해 확인 할 수있다.
> a ..< b는 a와 같거나 보다 크고, b보다 작음을 의미한다.
> a ... b는 a와 같거나 보다 크고, b와 같거나 보다 작음을 의미한다.

## 반복문

### For Clause
*normal for*
```swift
for i in 0 ..< 4 {
    print("\(i)")
}
```{
0
1
2
3
}



**결과**
```
0
1
2
3
```
*dictionary for*
```swift
for(k, v) in ["A": 1, "B": 2] {
    print("\"\(k)\": \(v)")
}
```

**결과**
```
"B": 2
"A": 1
```

### repeat and while Clause

*normal while*

```swift
var secs: Array<Int> = [1, 2, 3, 4]

while(!secs.isEmpty) {
    print("secs next element: \(secs.removeFirst())")
}
```

**결과**
```
secs next element: 1
secs next element: 2
secs next element: 3
secs next element: 4
```

*repeat while*
```swift
var integers = [1, 2, 3]

repeat {
    print("repeat \(integers.removeFirst())")
} while integers.count > 5
```

**결과**
```
repeat 1
```

* repeat while은 타언어의 `do while`과 비슷하다, 조건이 맞지 않아도 최조 한번은 수행한다.
