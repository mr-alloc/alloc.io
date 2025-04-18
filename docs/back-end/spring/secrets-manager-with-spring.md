---
layout: post
title: Spring에서 중요정보를 Secrets Manager로 관리하기
tags: [ Spring, Spring Boot, Secrets Manager, AWS ]
date: 2025-04-18 11:58:00
thumbnail: /post/back-end/spring/secrets-manager/with-spring.png
current-company: NEOWIZ
current-position: Software Engineer
summary: Spring AWS SecretsManager 적용하기
excerpt_separator: <!--more-->
hide: true
---

어플리케이션 개발 시 중요정보는 설정 파일로 관리된다.
하지만 이는 Git과 같은 VCS에서 노출되며, 이는 취약점으로 이어질 수 있다.

이를 해결하기 위해 AWS Secrets Manager에 중요정보를 보관하고, 런타임에 이를 불러와서 사용할 수 있다.
<!--more-->

## Secrets Manager::what-is-secretes-manager

[Secrets Manager](https://aws.amazon.com/ko/secrets-manager/) 서비스는 AWS 제공하는 보안 암호를 관리할 수 있는 매니지드 서비스이다.
DB 계정 정보, 웹서비스 자격 증명 등 여러가지 중요한 정보를 보관하고 애플리케이션에서 이를 분리할 수 있는 좋은 서비스이다.

::code-group

```yaml::application.yaml
datasource:
    username: dbuserid
    password: dbuserpassword
```

```json::보안 암호
{
  "datasource": {
    "username": "dbuserid",
    "password": "dbuserpassword"
  }
}
```

::

예를 들어 위와 같이 애플리케이션에서 저장하던 DB 정보를 Secrets Manager에 보안 암호를 생성하고, 보관한다면 애플리케이션에서는 민감 정보를 설정파일로 관리하지 않아도 된다.

## 사용 방법::how-to-use

```java
//자격 증명 제공
AwsCredentialsProvider provider = ProfileCredentialsProvider.builder()
                    .profileFile(ProfileFile.defaultProfileFile())
                    .profileName("service-app-profile")
                    .build();
//클라이언트 생성
SecretsManagerClient client = SecretsManagerClient.builder()
                    .credentialsProvider(provider)
                    .region(Region.of("ap-northeast-2"))
                    .build();

//요청 생성 (user-dev라는 이름의 보안암호를 지정)
GetSecretValueRequest request = GetSecretValueRequest.builder().secretId("user-dev").build();
GetSecretValueResponse response = client.getSecretValue(request);

//값 꺼내기
String secret = response.secretString();
```

기본적으로 AWS CLI를 이용해 값을 가져오는 방법은 간단하다.
사용 가능한 자격증명으로 클라이언트를 생성하고 요청을 보내 응답으로 보안 암호를 받는 방식이다.

## SpringBoot와 함께 사용하기::use-with-spring-boot

Spring Boot의 경우 어플리케이션 시작 시점에 DB 연결을 한다. 하지만
DB 정보를 Secrets Manager로 옮긴다면, 값설정은 DataSource 값이 초기화 되기전에 설정 되어야한다.

또한 너무 빨리 세팅을 해버린다면, DB 프로퍼티 세팅시 값이 덮어씌어 질 수 있다.
즉 아래와 같은 순서로 설정 되어야 의도되로 사용이 가능하다.

```
Spring Property Setting → Secrets Manager Setting → Make DB Property
``` 

이를 해결하기 위해 `EnvironmentPostProcessor`를 구현하여, 처리 할 수 있다.
`EnvironmentPostProcessor`는 `application.yaml`이 로드된 후에 `ApplicationContext`가 생성되기 전에 실행 되어야한다.

```java::SecretsManagerPropertyProcessor.java
public class SecretsManagerPropertyProcessor implements EnvironmentPostProcessor {
    
    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
         if (environment instanceof StandardServletEnvironment) {
            //프로퍼티 세팅
         }
    }
}
```


