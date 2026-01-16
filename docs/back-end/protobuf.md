---
layout: post
title: protobuf 이해하기 (Protocol Buffer)
tags: [ Protocol Buffer, protobuf, Serialize ]
date: 2026-01-16 06:30:00
thumbnail: /post/back-end/protobuf/index.png
current-company: NEOWIZ
current-position: Software Engineer
summary: protobuf
excerpt_separator: <!--more-->
hide: true
---
Google에서 만든 protobuf는 gRPC 통신을 하기위해 데이터를 직렬화 할 수 있게 도와주는 라이브러리이다.
이 protobuf의 직렬화를 이용해 어떻게 애플리케이션에 적용할 수 있는 지 알아보자.
<!--more-->

## proto 파일 이란::what-is-proto-file


## Gradle 플러그인 설치 및 태스크 작성::install-gradle-plugin-and-write-task

```gradle.kt::build.gradle.kt
plugins {
    ...
    id("com.google.protobuf") version "0.9.4"
}

protobuf {
    protoc {
        //Protocol Buffers Compiler
        artifact = "com.google.protobuf:protoc:4.33.4"
    }
}

sourceSets {
    main {
        resources {
            exclude("**/*.proto")
        }
        proto {
            srcDir("src/main/proto")
        }
    }
}
```

먼저 위 코드의 경우 정말 간단하게 `proto` 을 java 클래스로 매핑하기 위한 최소한의 설정이다.
proto 파일을 컴파일하고 변환하려면 `protoc`라는 컴파일러가 필요하다. `com.google.protobuf`에는 이 컴파일러를 포함하며, 
이를 protobuf 태스크에 정의해준 것이다.

`sourceSets`은 각 소스에 대해 올바르게 참조할 수 있도록 구분을 지어준 것이다.(미구분시 중복처리 오류)
이전에 작성해둔 `proto`파일과 위 설정으로 빌드만 해도 변환된 java 파일이 생성된다.

하지만, java 파일에서 참조되는 의존성은 아직 없는 상태라서 추가가 필요하다.

>`com.google.protobuf:protobuf-java:4.33.4` 의존성 추가로 java 파일에서 정상적으로 참조한다.
:{ "type": "tip", "icon": "lightbulb" }


