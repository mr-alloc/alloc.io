---
layout: post
title: Swift의 함수의 선언과 호출
categories: [Development, Swift]
tags: [Swift]
date: 2022-09-05 23:42:00 +0900
current_company: NEOWIZ
current_position: Software Engineer
summary: Swift 함수 사용하기
excerpt_separator: <!--more-->
hide: true
---
Swift는 다른언어와 비슷하게 기본함수를 지원합니다.
타입언어를 많이 경험해 보지 못해서 신기하지만, 클로져, 레이블 등 여러가지로 배울게 많은것 같아요.
<!--more-->

### 기본 함수의 선언

여타 언어와 비슷하게 국룰 함수문법을 자랑하는 Swift
```swift{1,5}
func sum(a: Int, b: Int) -> Int {
    return a + b
}

let sumResult = sum(a: 1, b: 2)

print("sumResult: \(sumResult)") //결과 sumResult: 3
```

> 라인 설명
> 1: a와 b는 받을 변수명이에요. 그냥 바인딩될 변수명을 지정한다`` 생각하면 편합니다. 다음으로 `-> Int`를 볼수 있는데요, 리턴이 `Int`타입임을 의미해요.
> 5: 마찬가지로 함수를 호출할때도 보낼값에 변수명을 맞춰줘야해요. 순서가다르면 에러가 발생해요.

매개변수가 없는 경우에도 그냥 동일하게 사용하면 됩니다.``
만약 매개 변수가 없고, 반환(예: `String`)값이 있다면 아래와 같이 할 수 있어요.

```swift
func greeing() -> String {
    return "No Parameter function."
}
```

신기한게 변수명으로 지정해서 보내니, 배열도 파라미터 중간으로 받을수 있네요.
```swift
func count(me: String, numbers: String..., people: String) {
    print("me: \(me)\nme: \(numbers)\npeople: \(people)")
}

count(me: "i can count numbers!", numbers: "1", "3", "2", "5", people: "Whaaaaaat!!!!?????")
/*
me: i can count numbers!
me: ["1", "3", "2", "5"]
people: Whaaaaaat!!!!?????
*/
```

### 조금더 심화된 고급함수 선언

#### 파라미터 기본값 세팅

만약 함수로 넘어오는 파라미터가 빈값이라면 대신 초기화해서 사용할 수 있는 방법이 있어요.
```swift
func greeting(friend: String, message: String = ", Hello! Nice day!") {
    print("\(friend)\(message)")
}

greeting(friend: "World", message: ", Hi!") // World, Hi!
greeting(friend: "Swift World") // Swift World, Hello! Nice day!
```

#### 레이블 지정

함수로 받는 파라미터에 레이블을 지정할 수 있어요.
근데 이것도 웃긴게 라벨 순서 맞춰야 돼요^^

```swift
func greeting(first friend: String, second me: String) {
    print("Hello \(friend)! I'm \(me)")
}

greeting(first: "World", second: "Korean")// Hello World! I'm Korean
```

#### 변수, 상수 저장

Swift는 함수형 프로그래밍 패러다임을 포함하는 다중 패러다임 언어이기 때문에, 함수는 일급객체입니다.
따라서 변수, 상수 등에 저장해서 쓸수 있어요.

```swift
function parseInt (str: String) -> Int {
    return (Int(str) +1)
}

funcion printInt(result: Int, 
```
