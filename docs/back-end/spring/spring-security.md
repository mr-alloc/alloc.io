---
layout: post
title: 스프링 시큐리티 프로젝트 구성
tags: [ Spring, Spring Boot, Spring Security ]
date: 2025-03-26 12:58:00 +0900
thumbnail: /post/back-end/spring/spring-security.svg
current-company: NEOWIZ
current-position: Software Engineer
summary: 트랜잭션 관리자
excerpt_separator: <!--more-->
hide: true
---

스프링 시큐리티 프로젝트 구성시, 필요한 기능을 정리한다.
<!--more-->

## 임시 비밀번호::temporary-password

```
Using generated security password: c76d7851-5e89-4ef3-bc5d-cb04d5d5e365
```

스프링 시큐리티 의존성이 있는 프로젝트를 실행하면 위와 같이 UUID와 같은 임시 비밀번호를 부여 받는다.
스프링 시큐리티는 기본적으로 모든 엔드 포인트를 보호한다. 이말은 즉, 설정으로 특정 API의 자격증명을 요구하도록 하지않는 한 모든 엔드포인트는 자격증명을 요구한다는 말이다.

따라서 자격 증명을 준비할 수 없느 상황에 대비하여 임시 비밀번호로 자격증명을 사용하게 해주는 기능이다.

> 당연히 자격 증명을 대신하므로, 개발환경(또는 로컬)에서 만 사용하는것을 권장한다. 이 값은 서버를 다시 시작하면 새로 발급된다.
:{ "type": "caution", "icon": "info" }

## 보안 설정::configure-security

```java
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    ...
}
```

`Spring Security`는 간단한 설정으로 강력한 보안을 지원한다.
위와 같이 `@EnableWebSecurity` 어노테이션 추가시, 내부적으로 웹 보안과 관련된 여러 설정들을 가져온다.

```javascript
@Import({
    WebSecurityConfiguration.class, SpringWebMvcImportSelector.class, OAuth2ImportSelector.class,
    HttpSecurityConfiguration.class, ObservationImportSelector.class
})
```

어쨋든 기본 설정을 사용자화 하려면 `SecurityFilterChain`을 Bean으로 등록해주면 된다.

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http.build();
}
```

기본적으로 등록을하고, HttpSecurity 객체로 변경할 수 있다.

### 폼 로그인::form-login

임시 비밀번호로 받은 임의의 문자열은 `/login` 페이지에서 사용가능하다. 필터체인을 Bean으로 등록하지않는 이상 기본적으로 폼로그인은 활성화 된다.

먼저 폼 로그인은 Username에 `user` 그리고 Password에 [임시 비밀번호](#임시-비밀번호temporary-password)로 로그인이 가능하다.
폼 로그인은 다음과 같이 처리된다.

```java::비활성화 (다른 인증방법을 사용해야함)
http.formLogin(form -> form.disable());
```

```java::활성화 (폼로그인으로 사용)
http.formLogin(form -> form.permitAll());
```

만약 @Bean만 등록하고 폼 로그인에대해 설정하지 않는다면 비활성화이다 (Bean 자체가 빈 설정으로 등록됨).

### HTTP 기본인증::http-basic-authentication-scheme

HTTP 기본인증은 [RFC 2617](https://datatracker.ietf.org/doc/html/rfc2617) 사양의 `HTTP Basic Authentication Scheme`이다.

```java
http.httpBasic(basic -> basic.disable());
```

HTTP 기본 인증 스킴(`Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==`) 비활성화는 위와 같이 할 수있다.

