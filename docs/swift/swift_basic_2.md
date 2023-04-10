---
layout: post
title: Swift 함수 만들기
categories: [Development, Swift]
tags: [Swift]
date: 2023-04-10 20:11:00 +0900
current_company: NEOWIZ
current_position: Software Engineer
summary: 함수생성 및 사용
excerpt_separator: <!--more-->
hide: false
---
Swift 함수 생성하기.
<!--more-->

# Swift 함수

## 함수 생성하기

```swift{5-7,9}
/*
 조건에따라 출력하는 함수
*/
func conditionPrint() -> Void {
    var isReady = true
    if !isReady {
        print("준비 완료")
    } else {
        print("준비중!")
    }
}
```

## 함수 호출하기
