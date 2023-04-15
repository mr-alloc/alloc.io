---
layout: post
title: 타입스크립트 시작하기 1 (소개)
categories: [Development, Typescript]
tags: [Typescript, Javascript, Type]
date: 2023-04-15 19:01:00 +0900
current_company: NEOWIZ
current_position: Software Engineer
profile_image: /assets/blogging/profile/profile1.JPG
thumbnail: "/assets/blogging/typescript/typescript_getting_start.png"
summary: 타입스크립트 소개
excerpt_separator: <!--more-->
hide: true
---
타입스크립트 시작하기.
도대체 왜 사용하는거고, 뭐가 좋은걸까?
<!--more-->

## 우리가 아는 자바스크립트

사실 나도 타입스크립트를 처음 배우는 거고, 잘 알지 못한다. 하지만, 자바스크립트와 같이 **동적타입**의 언어는 결국 많은 문제를 유발 시킬수 있는걸 알고 있다.
일반 자바스크립트에는 타입이 없기 때문에 코드대로 그냥 변수로 받아야한다. 따라서 아래와 같은 일반 자바스크립트에서는 해괴한 연산도 가능하다.

```javascript{3,7}
//일반 자바스크립트 함수의 선언
function getNow() {
    return new Date()
}

var now = getNow();
var plus1Day = now + '1Day';
console.log('plusDay:', plus1Day) 
//출력결과 -> plusDay: Sat Apr 15 2023 19:12:32 GMT+0900 (한국 표준시)1Day
```

3번라인에서 보면 `getNow()` 함수는 `Date` 타입의 현재시간 값을 리턴한다. 근데, 7번라인에서 다시보면 `Date` 타입과 `string` 연산을 한다.
하지만, 어떠한 에러도 발생되지 않는다. 결과적으로 연산된 `plus1Day` 변수의 타입은 `string`이다.
`Date` 함수와 `string`의 덧셈에 결과타입이 `string`인 내용은, 타입스크립트를 알아보는 과정에서 별로 중요하지 않기에 넘어간다.

이 처럼 타입이 존재는 하지만, 변수가 타입에 연연하지않은 언어를 `동적타입 언어`라고 한다. 
우리가 일반적으로 알고있는 객체지향 언어는 모두 정적타입 언어 이다. 각 변수의 타입이 정해져있고, 정해진대로 연산을 하기 때문이다.
게다가 `javascript`는 ECMA Script(ES)라는 표준 스크립트 버전이 있는데, 현재 우리가 사용중인 브라우저는 ES5 버전만 해석할 수 있다.

`ES5`버전은 2009년에 공개된 버전이며, 현재까지 브라우저는 해당 버전이상의 자바스크립트는 해석할 수 없다.
이 이상의 버전을 사용하려면, Babel(Javascript Compiler)같은 특정도구를 이용해 브라우저가 해석할 수 있는 자바스크립트의 버전으로 컴파일 해줘야 한다.
이 외에도 `ES5`이상에서 지원되는 javascript 버전에는 여러가지 기능 및 문법들을 사용할수 있었다.

```javascript
//ES6 문법 const
const sum = (a, b) => {
    return a + b
}
```
위의 설명대로 브라우저는 `const`를 알 수 없다. 하지만 브라우저 내부에있는 js 엔진이 해석할 수 있기에 우리는 `ES`버전은 딱히 몰라도 상관없다.
타입스크립트를 배우기위해선, 위의 내용들을 알고있어야한다. `ES5`의 문법은 당연히 `ESNext(6, 7..)`에서 포함하고 있고, 이또한 `Typescript`에서 포함하고있다.
`타입스크립트`또한, `ESNext`와 동일하게 ES5로 `Transpile`을 해줘야 하는건 예외 없다. 

그럼 우리가 아는 자바스크립트를 그냥 사용해도 되는데, 왜 굳이 타입스크립트를 사용하는 걸까?

## 타입스크립트는 무엇인가?

간단하게 설명하면, 동적타입의 언어와 같이 모든 객체는 타입을 가지며, `Null-Sefe`한 연산을 할 수 있는 등 여러 장점이 있다.
예를 들어 다음과 같은 `Javascript` 코드에서 문제가 발생 했을 때, 쉽게 문제를 알수 없다.

```javascript
function makePerson(name, age) {
    return {
        name: name,
        age: age
    }
}

const person = makePerson(30, 'Kim')
```

하지만, 위와 같은 코드에 각 변수에대한 타입이 생긴다면, 작성할 때부터 문제를 알 수 있다.
만약 위에 코드에서 타입이 추가된다면 어떻게 달라질까?

```typescript
class Person {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}

function makePerson(name: string, age: number): Person {
    return new Person(name, age)
}

const person: Person = makePerson('Kim', 4)
```

좀 더 많은 코드가 작성되었다. 하지만, 각 변수는 타입을 가지며, 좀 더 견고한 어플리케이션을 만들수 있는 타입이 생겼다.
클래스 생성을 통해, 의도한 값을 가지는 타입의 객체가 생성되었다. 이는 정말 중요한 내용이다.
기존에 자바스크립트에서 할 수 없었던, 그리고 걱정하지 않아도 되었던, 코드를 작성할 수 있게된다.

## 타입스크립트의 주요 문법

앞서 말한것처럼 `Typescript`는 `ESNext`, `ES5`모두 포괄하고 있는 상위 집합이기에, 두가지 문법을 모두 사용할 수 있다.
