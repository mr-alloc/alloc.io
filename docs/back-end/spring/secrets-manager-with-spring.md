---
layout: post
title: Spring에서 Secrets Manager로 중요 정보 관리하기
tags: [ Spring, Spring Boot, Secrets Manager, AWS ]
date: 2025-04-18 11:58:00
thumbnail: /post/back-end/spring/secrets-manager/with-spring.png
current-company: NEOWIZ
current-position: Software Engineer
summary: 시크릿매니저 적용하기
excerpt_separator: <!--more-->
hide: false
---

애플리케이션 개발 시 중요정보는 설정 파일로 관리된다.
하지만 이는 Git과 같은 VCS에서 노출되며, 이는 취약점으로 이어질 수 있다.

이를 해결하기 위해 AWS Secrets Manager에 중요정보를 보관하고, 런타임에 이를 불러와서 사용할 수 있다.
<!--more-->

> 이 문서에서는 Secrets Manager의 보안암호 등록과정은 다루지 않는다.
:{ "type": "note", "icon": "info"}

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

```java::보안암호 요청 전송
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

Spring Boot의 경우 애플리케이션 시작 시점에 DB 연결을 한다. 하지만
DB 정보를 Secrets Manager로 옮긴다면, 값설정은 DataSource 값이 초기화 되기전에 설정 되어야한다.

또한 너무 빨리 세팅을 해버린다면, DB 프로퍼티 세팅시 값이 덮어씌어 질 수 있다.
즉 아래와 같은 순서로 설정 되어야, 의도처럼 사용이 가능하다.

```
Spring Property Setting → Secrets Manager Setting → Make DB Property
``` 

이를 해결하기 위해 `EnvironmentPostProcessor`를 구현하여, 처리 할 수 있다.
`EnvironmentPostProcessor`는 `application.yaml`이 로드된 후에 `ApplicationContext`가 생성되기 전에 실행 되어야한다.

```java::SecretsManagerPropertyProcessor.java
public class SecretsManagerPropertyProcessor implements EnvironmentPostProcessor, Ordered {
    private static final int ORDER = ConfigDataEnvironmentPostProcessor.ORDER + 1;
    
    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
         //이 부분은 SpringBoot 버전에 따라 다르므로, 어떤 Environment 클래스가 주입되는지 버전마다 확인해야한다.
         if (environment instanceof StandardServletEnvironment) {
            //프로퍼티 세팅시점
         }
    }
    
    @Override
    public int getOrder() {
        return DEFAULT_ORDER;
    }
}
```

`ConfigDataEnvironmentPostProcessor`는 `application.properties`, `application.yml` 등 기본 설정 파일을 로드하는 프로세스이므로, 실행시 주입되는 설정을
덮어쓰려면, 위와 같은 순서로 진행되어야한다. 먼저 애리케이션 실행 시 주입되었던, `AWS` 정보를 가져와서 새로운 프로퍼티를 만들수 있다.

```java::커스텀 설정 정보를 추출
private AwsSecretsManagerProperty getSecretsManagerProperty(ConfigurableEnvironment environment) {
    Binder binder = Binder.get(environment);
    //새로 생성할 커스텀 설정
    AwsSecretsManagerProperty property = new AwsSecretsManagerProperty();
    
    //실행 시 주입되었던 커스텀 설정을 추출하여, 새로운 설정으로 정리
    property.setEnable(binder.bind("aws.secrets-manager.enabled", Boolean.class).orElse(Boolean.FALSE));
    property.setRegion(binder.bind("aws.region", String.class).orElse(""));
    property.setName(binder.bind("aws.secrets-manager.secret-name", String.class).orElse(""));
    
    return property;
}
```

주입된 설정정보를 먼저 읽어와서, 해당 정보롤 `AWS Secrets Manager`에 요청하여 값을 받을 수 있다.

::code-group
```java::프로퍼티 추가
private void addProperties(ConfigurableEnvironment environment) {
    AwsSecretsManagerProperty property = getSecretsManagerProperty(environment);
    if ( ! propert.isEnabled()) {
        return;
    }
    
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
    
    addSecrets(response.secretString(), environment);
}
```
```java::보안암호 추가
private void addSecrets(String secret, String key, ConfigurableEnvironment environment) {
    try {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(secret);
        
        Map<String, Object> propertyMap = new LinkedHashMap<>();
        
        propertyMap.putAll(mapper.convertValue(node, new TypeReference<Map<String, Object>>(){}));
        
        if (propertyMap.isEmpty()) {
            return;
        }
        //프로퍼티 주입
        environment.getPropertySource().addFirst(new MapPropertySource("secretsProperties", convertHierarchy(propertyMap)));
    } catch (Exception ex) {
        log.error("Error Occurred at adding secrets, ex);
    }
}    
```
```java::convertHierarchy 메서드
public static Map<String, Object> convertHierarchy(Map<String, Object> hierarchyMap) {
    Map<String, Object properties = new HashMap();
    convertHierarchyToProperties("", hierarchyMap, properties);
    return properties;
}

public static void convertHierarchyToProperties(
    String prefix, 
    Map<String Object> hierarchyMap, 
    Map<String Object> properties
) {
    for (Map.Entry<String, Object> entry : hierarchyMap.entrySet()) {
        String key = prefix.isEmpty() ? entry.getKey() : prefix + "." + entry.getKey();
        Object value = entry.getValue();
        
        if (value instanceof Map nestedMap) {
            convertHierarchyToProperties(key, nestedMap, properties);
        } else {
            properties.put(key, String.valueOf(value));
        }
    }
}
```
::

> `convertHierarchy` 메서드는 계층 형태의 객체를 각 키의 경로로 구분지어 1차원적으로 만들어 준다.
:{ "type": "tip", "icon": "lightbulb"}

::code-group

```json::secrets.json
{
    "account": {
        "database": {
            "username": "dbuserid",
            "password" "dbuserpassword"
        }
    },
    "payment": {
        "database": {
            "username": "paymentuserid",
            "password" ""paymentuserpassword"
        }
    }
}
```

```json::보안암호 평탄화
{
  "account.database.username": "dbuserid",
  "account.database.password": "dbuserpassword",
  "payment.database.username": "paymentuserid",
  "payment.database.password": "paymentuserpassword"
}
```
::

## 기본값과 함께 적용하기::set-with-defaults

```json::보안 암호
{
    "service-authorizer": {
        "account": {
            "database": {
                "username": "dbuserid",
                "password": "dbuserpassword"
            }
        },
        "payment": {
            "database": {
                "username": "paymentuserid",
                "password": "paymentuserpassword"
            }
        }
    },
    "content-server": {
        "account": {
            "database": {
                "username": "dbuserid",
                "password": "dbuserpassword"
            }
        }
    }
}
```

여러개의 보안암호를 구성하기 어려운 경우, 한개의 보안 암호에서 특정 서비스별로 나눌 수도 있다.
위의 경우 `service-authorizer`나 `content-server`는 자신이 필요한 정보만 추출하여 다음의 방법으로 사용이 가능하다:

::code-group

```java::Property에 추가
private AwsSecretsManagerProperty getSecretsManagerProperty(ConfigurableEnvironment environment) {
    ... //기존로직
    property.setKey(binder.bind("aws.secrets-manager.specify-key", String.class).orElse(""));
    return property;
}
```

```java::호출부 수정
//addSecrets 호출시 특정 key전달
//여기서 Key는 프로퍼티에서 전달받은 서비스의 이름
addSecrets(response.secretString(), property.getKey(), environment);
```

```java::필요한 키만 추출
private void addSecrets(String secret, String key, ConfigurableEnvironment environment) {
    try {
        ... //기존 로직
        Map<String, Object> propertyMap = new LinkedHashMap<>();
        //키가 비어있다면, 전체 보안 암호를 추가
        if ( ! StringUtils.hasLength(key) {
            propertyMap.putAll(mapper.convertValue(node, new TypeReference<Map<String, Object>>(){}));
        } else {
            //해당 키를 가지고 있다면 추출하여 보안 암호를 추가
            if (node.has(key)) {
                propertyMap.putAll(mapper.convertValue(node.get(key), new TypeReference<Map<String, Object>>(){}));
            }
        }
        
        if (propertyMap.isEmpty()) {
            return;
        }
        ... //기존 로직
    } catch (Exception ex) {
        log.error("Error Occurred at adding secrets, ex);
    }
}  
```

::

> 이 방법은 여러서비스의 보안 암호를 한번에 구성하기에 좋은 방법이지만 환경까지 나누는건 권장하지 않는다.
:{ "type": "warning", "icon": "info" }

다시 돌아아와서 보안암호를 보자.

```json::보안 암호
{
    "service-authorizer": {
        "account": {
            "database": {
                "username": "dbuserid",
                "password": "dbuserpassword"
            }
        },
        "payment": {
            "database": {
                "username": "paymentuserid",
                "password": "paymentuserpassword"
            }
        }
    },
    "content-server": {
        "account": {
            "database": {
                "username": "dbuserid",
                "password": "dbuserpassword"
            }
        }
    }
}
```

위 보안 암호에서는 `service-authorizer`와 `content-server`가 사용하는 정보중 `account`는 같은 정보를 사용하는 걸로 보인다.
이 경우는 공통정보로 빼네어 사용할 수도 있다.

::code-group

```json::account 정보는 공통화
{
    "default": {
      "account": {
        "database": {
          "username": "dbuserid",
          "password": "dbuserpassword"
        }
      }
    },
    "service-authorizer": {
        "payment": {
            "database": {
                "username": "paymentuserid",
                "password": "paymentuserpassword"
            }
        }
    },
    "content-server": {
    }
}
```

```java::공통 정보를 적용
Map<String, Object> propertyMap = new LinkedHashMap<>();
if (!StringUtils.hasLength(key)) {
    propertyMap.putAll(mapper.convertValue(node, new TypeReference<Map<String, Object>>() {
    }));
} else {
    //default가 있다면 먼저 적용한다.
    if (node.has("default")) {
        propertyMap.putAll(mapper.convertValue(node.get("default"), new TypeReference<Map<String, Object>>() {
        }));
    }
    //default가 적용된 이후에, 덮어쓸 값이 남아있다면 적용한다.
    if (node.has(key)) {
        propertyMap.putAll(mapper.convertValue(node.get(key), new TypeReference<Map<String, Object>>() {
        }));
    }
}

if (propertyMap.isEmpty()) {
    return;
}
```

::

