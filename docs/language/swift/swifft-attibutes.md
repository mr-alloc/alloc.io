---
layout: post
title: Swift Attribute
tags: [ Swift, iOS ]
date: 2026-10-14 09:00:00
profile-image: /post/profile/worker-kkom.png
current-company: NEOWIZ
current-position: Software Engineer
summary: 스위프트 어트리뷰트
excerpt_separator: <!--more-->
hide: false
---
Swift의 흐름제어를 위한 어트리뷰트를 정리해보자
<!--mode-->


## 1. 동시성 관련 (Swift Concurrency)

### @MainActor

* 메인 액터(글로벌 액터)에 격리, 메인 스레드에서만 접근한다

실제 UI업데이트를 위한 State, ViewModel 객체에서 사용해야한다. 예를 들어 아래처럼 사용 시,해당 클래스의 메서드와 프로퍼티가 메인 액터에 격리된다. 

```swift
@MainActor
class ViewModel {
    var title: String = ""
    func update() { title = "Hello" }
}
```
### @Published

Combine 프레임워크의 프로퍼티 래퍼(Property Wrapper)이다. 값이 바뀌기 전후로 변경 이벤트를 발(publish)해서 구독자(주로 SwiftUI 뷰)가 자동으로 갱신되도록 해준다.

```swift
@MainActor
final class CounterViewModel: ObservableObject {
    @Published var count = 0

    func increment() {
        count += 1   // objectWillChange 발행 → 구독 중인 뷰 갱신
    }
}

struct CounterView: View {
    @StateObject private var vm = CounterViewModel()

    var body: some View {
        VStack {
            Text("\(vm.count)")
            Button("+1") { vm.increment() }
        }
    }
}
```

프로퍼티 값 자체가 바뀌면 그 사실을 알리는 신호가 나가는데, 이는 타입 자체를 `ObservableObject`로 채택해야 의미가 있다. 
`ObservableObject`는 `objectWillChange`라는 publisher를 가지고 있는데, `@Published`가 붙은 프로퍼가 바뀌면 이 publisher로 알림 전달된다.



@globalActor	자신만의 글로벌 액터를 정의할 때 붙이는 어트리뷰트
@Sendable	여러 동시성 도메인 사이에서 안전하게 전달 가능한 클로저/타입 표시
@preconcurrency	동시성 체크 이전에 작성된 코드를 경고 수준으로 완화
@unchecked Sendable	컴파일러 검사를 끄고 직접 스레드 안전성을 보장한다고 선언
2. 프로퍼티 래퍼 (SwiftUI / 상태 관리)
어트리뷰트	역할
@State	뷰 내부 상태. 값이 바뀌면 뷰 갱신
@Binding	부모 뷰의 상태를 양방향으로 참조
@Observable	Observation 프레임워크로 객체 변경을 추적 (iOS 17+)
@StateObject / @ObservedObject	ObservableObject 인스턴스의 생명주기 관리 방식 차이
@Environment / @EnvironmentObject	상위 뷰에서 주입된 값 사용

프로퍼티 래퍼는 "값 접근 방식을 감싸는 래퍼"라서, 같은 var라도 set/get 동작이 달라집니다.

3. Objective-C 연동
어트리뷰트	역할
@objc	Objective-C 런타임에 노출 (셀렉터, KVC 등 사용 시 필요)
@objcMembers	클래스 내 모든 멤버에 @objc 적용
@IBAction / @IBOutlet	스토리보드/XIB 연결용
@NSManaged	Core Data 관리 객체의 프로퍼티 표시
@dynamic	런타임에 메서드를 해석하도록 지정 (Objective-C 스타일)
4. 접근 제어 및 상속/재정의
어트리뷰트	역할
@available	특정 OS/플랫폼 버전에서만 사용 가능하도록 지정
@discardableResult	반환값을 쓰지 않아도 경고를 내지 않음
@inline(__always)	함수 인라인화 힌트
@frozen / @nonexhaustive	라이브러리 바이너리 호환성 관련
@escaping	클로저가 함수 실행 후에도 살아남을 수 있음을 표시
@autoclosure	인자를 자동으로 클로저로 감싸 지연 평가
@resultBuilder	SwiftUI의 @ViewBuilder처럼 DSL 빌더를 만들 때 사용
@propertyWrapper	직접 프로퍼티 래퍼를 정의할 때 사용
@main	앱의 진입점 지정
@testable	테스트 타겟에서 내부 접근 허용 (import 시 사용)
