---
layout: post
title: Cloud Stream Configuration
tags: [ Spring, Spring Boot, Spring Cloud Stream, Configuration ]
date: 2025-04-29 09:34:00
thumbnail: /post/back-end/spring/cloud-stream-configuration/index.png
current-company: NEOWIZ
current-position: Software Engineer
summary: 클라우드 스트림 구성
excerpt_separator: <!--more-->
hide: true
---

서비스와 메시징플랫 폼을 연결하기 위해, Spring Cloud Stream 설정은 종류와 사용 방법을 알아보자.
<!--more-->

## 개요::introduction

이전에 [스프링 클라우드 스트림](/docs/back-end/spring/cloud-stream)에 대해 알아보았었다.
그렇다면 실제 서비스 적용을 위해 어떤 값을 설정하고, 어떻게 동작이 되는지 알아보자.

## Cloud Stream Properties::configuration-properties

**S**pring **C**loud **S**tream(이하 `SCS`)에서는 바인딩 관련 구성을 자동화하기 위해 다음의 과정으로 진행할 수 있다.

1. 연결 할 함수 정의(`spring.cloud.function`)
2. Cloud Stream 레벨의 추상화 바인딩 정의(`spring.cloud.stream.bindings`)
3. 메시징 플랫폼 바인더 설정(`spring.cloud.stream.{name}`)

### 1. 연결 함수 정의::define-functions

`definition` 프로퍼티(이하 `definition`)는 **함수를 정의한다.**
정확히는 함수의 이름, 파이프라인을 정의 한다. 프레임워크 내부적으로 `definition`이 해석될 때 두 가지의 방법으로 정의할 수 있다.

`SCS`에서는 추상화된 함수를 기차놀이처럼 여러개를 붙여서 한개의 함수로 만들수 도 있고, 독립적으로 한개의 함수만 그대로 사용할 수 있다.

> 한 가지 기억할것은 함수(한 개의 독립적인 함수든, 여러개를 합쳐서 만든 함수든)는 `;`로 구분된다는 것이다.
:{ "type": "tip", "icon": "lightbulb" }

**독립적으로 한개의 함수만 정의하기**

::code-group

```yaml::application.yaml
spring:
  cloud:
    funtion:
      definition: create-schedule;
```

```java::StreamFunctionConfiguration
@Bean("create-schedule")
public Consumeer<Message<CreateScheduleEvent>> createSchedule() {
  return (message -> {
      CreateScheduleEvent event = message.getPayload();
      //스케줄을 생성한다.
      scheduleUseCase.create(evnet);
  });
}
```

::

위 경우 스케줄 생성(`create-schedule`)이라는 독립적인 한개의 함수만 동작한다.

**함수 파이프라인을 구성하여 한개의 함수를 정의하기**

::code-group
```yaml::application.yaml
spring:
  cloud:
    function:
      definition: create-schedule|alert-operation;
```

```java::StreamFunctionConfiguration
@Bean("create-schedule")
public Function<Message<CreateScheduleEvent>, NotifiableEvent> createSchedule() {
    return (message -> {
        CreateScheduleEvent event = message.getPayload();
        Schedule created = scheduleUseCase.create(event);
        return new ScheduleCreateResponse(schedule);
    });
}

@Bean("alert-operation")
public Consumer<Message<NotifiableEvent>> alertOperation() {
    return (message -> {
        NotifiableEvent event = message.getPayload();
        alertUseCase.operate(event);
    });
}
```

::

함수 파이프라인을 구성하려면, `|`파이프 문자열(`,` 쉼표도 가능)로 함수의 정의를 묶어 정의할 수있다.

```
단일 함수
╭──── Function ───╮
│ create-schedule │
╰─────────────────╯
파이프라인 함수
╭─── Function1 ───╮    ╭─── Function2 ───╮
│ create-schedule │ ─→ │ alert-operation │
╰─────────────────╯    ╰─────────────────╯
```

파이프라인 함수는 처리한 함수의 출력값과 다음 함수에서 받을 입력값이 같아야한다.
그렇다면 여러 종류의 함수를 정의하려면 어떻게 할 수 있을까?

```yaml::여러종류의 함수를 정의
spring:
  cloud:
    function:
      definition: create-schedule|alert-operation; modify
```

> 각 함수 구분자(`;`)는 앞뒤로 공백이 있어도 되지만, 파이프라인 구분자(`|`)는 앞, 뒤로 공백이 있으면 안된다.
:{ "type": "caution", "icon": "warning-octagon" }

### 2. 추상화 바인딩 정의::define-abstract-biding

먼저 추상화 바인딩이 뭔지 간단하게 집고 넘어가자면, 다음과 같다.

1. SCS는 많은 메시징 플랫폼을 지원하지만, 실제 그 구현까지는 관여하지 않음.
2. SCS는 각 구현체인 Binder에 제어 넘기기 전까지 스프링에 구성된 함수형 컴포넌트와 연결되는 바인딩을 설정기반으로 준비함.

메세징 플랫폼과 연결되려면 각 Binder(`RabbitMQ`, `Kafka`)들과 연결되는 상위레벨 구성이 필요하고, 이를 SCS가 제공한다.

```
╭───────────╮     ╭────────────╮
│ Funtion 1 │     │ Function 2 │
╰────┐┌─────╯     ╰────┐┌──────╯
─────┤├────────────────┤├──────
 ╭───┘└─── Function ───┘└───╮
 │   Spring Cloud Stream    │
 ╰───┐┌────────────────┐┌───╯
─────┤├────────────────┤├──────
     ││                ││ 
╭─ Kafka ─╮    ╭─── Rabbit MQ ───╮
│  Topic  │    │ Exchange, Queue │
╰─────────╯    ╰─────────────────╯
```

```yaml::application.yaml
spring:
  cloud:
    function:
      definition: create-schedule; modify-schedule
    stream:
      bindings:
        create-schedule-in-0:
          destination: schedule-consume-exchange
          group: create-schedule-queue
        modify-schedule-in-0:
          destination: schedume-consume-exchange
          group: modify-schedule-queue
```

`SCS`의 바인딩 추상화는 실제 그 바인딩대상이 어떤 방향(생산 또는 소비)인지 모르기 때문에, 모든 설정에대한 구성을 받는다.
추가적인 속성은 바인딩 정보로서 추상화되며 아래의 내용을 포함한다:

* destination: 바인더가 바인드하는 브로커에서의 물리적인 이름을 의미한다.
  * `RabbitMq`의 경우 Exchange의 이름으로, Kafka의 경우 Topic의 이름으로 정의한다.
* group
  * 그룹의 경우 Consumer에게만 적영되며, 소속될 바인딩의 고유한 이름이다. 많은 컨슈머가 같은 그룹 내에서 구독을 공유한다.
  * null, 빈 문자열 값은 익명그룹을 나타내며 공유 되지않는다.
  * 즉 그룹은 각 미들웨어에서 컨슈머를 묶는 그룹으로 이해하면 된다. `RabbitMQ`의 경유 Queue, `Kafka`의 경우 Consumer Group과 연결된다.
* contentType
  * 이벤트 내에서 이 바인딩으로 사용될 콘텐츠의 유형을 의미한다. HTTP 스펙에서 사용되는 MIME Type과 동일하다. 기본값은 `application/json`
  * 메세지 헤더에 지정되지 않은 경우 이 바인딩에서 사용될 콘텐츠 유형을 지정한다.
* bindier
  * 여러개의 바인더가 사용 가능할 경우 이 바인딩에서 사용할 바인더명
  * 예: rabbit
* consumer
  * 추가적인 컨슈머 프로퍼티 (`ConsumerProperties`)
* producer
  * 추가적인 프로듀서 프로퍼티 (`ProducerProperties`)

### 메시징 플랫폼 바인더 설정::configuration-of-messaging-platform

`SCS`는 실제 메시징 플랫폼과 유연하게 연결되기 위해 `Binder`인터페이스를 제공한다.
또한 각 플랫폼 바인더 모듈은 이를 구현하여 브로커와 통신하며, 실제 스트림을 제공한다.

예를 들어 **RabbitMQ**라면 다음과 같이 구성할 수 있다.

```yaml::application.yaml
spring:
  cloud:
    function:
      definition: create-schedule; modify-schedule
    stream:
      #SCS 추상화를 위한 바인딩
      bindings:
        create-schedule-in-0:
          destination: schedule-consume-exchange
          group: create-schedule-queue
        modify-schedule-in-0:
          destination: schedume-consume-exchange
          group: modify-schedule-queue
```

`create-schedule`(스케줄 생성)의 경우 DLQ(Dead Letter Queue)를 설정하지 않고, `modify-schedule`(스케줄 변경)의 경우 설정하였다.

`RabbitExtendedBindingProperties`, `KafkaExtendedBindingProperties`


함수 등록 Bean
FunctionCatalog
FunctionRegistry
FunctionConfiguration(FunctionBindingRegistrar: Function Bean을 생성해서 BeanFactory에 넣음 (afterPropertiesSet() 참조)
BeanFactory
ConversionService
RabbitExchangeQueueProvisioner.autoBindDLQ

바인딩
컨슈머 시작 이벤트: AsyncConsumerStartedEvent
이벤트 메세지 멀티캐스트 SimpleApplicationEventMulticaster.multicastEvent()
RabbitExchangeQueueProvisioner

StreamBridge는 ApplicationListener 이다.

AnnotationConfigApplicationContext 에서 메세지 발행시 적절한 ApplicationContext 가 없으면 super인
AnnotationConfigServletWebServerApplicationContext로 publishEvent를 호출하고
그 내부에서, this.applicationMulticaster로 multicastEvent 한다.

간단하게 설명하면, Spring Core는 아래를 수행

1. 앱실행 (Bean refresh)
2. ServletWebServerApplicationContext에서 기본 Bean에대한 refresh가 끝나면 `finishRefresh()` 실행
3. `getLifecycleProcessor().onRefresh()` 실행 (`DefaultLifecycleProcessor`)
4. `DefaultLifecycleProcessor`에서 LifecycleGroup으로 각 `Phase`들을 그룹화
5. 그룹화 된 `Lifecycle Bean`들을 순차적으로 실행

이때 순차적으로 실행되는 Spring Cloud Stream 관련 Lifecycle은 아래를 수행

6. `InputBindingLifecycle`, `OutputBindingLifecycle` 등 doStartWithBindable 메서드로 바인딩을 실행
7. `InputBindingLifecycle` 의 경우 `BindableFunctionProxyFactory.createAndBindInputs(this.bindingService)`를 실행
8. `InputBindingLifecycle`는 매개변수로 받은 바인딩 서비스를 `bindingService.bideConsumer(...)`로 바인딩과정을 위임
9. `BindService`에서 사용할 `Binder`를 찾아 바인딩을 요청한다.

구현된 플랫폼 Binder는 아래를 수행

10. 요청을 받은 바인더(여기서는 `RabbitMessageChannelBinder`)는 전달받은 바인딩정보로 인바운드 목적지로 엔드포인트를 지정하여 또 다른 라이프 사이클을 시작한다.
11. `consumerEndpointWithLifecycle.start()`하게 되면 `AmqpInboundChannelAdapter`로 시작된다.
12. 이는 곧바로 `this.messageListenerContainer.start()`로 연결된다.
13. 내부적으로 비동기로 `AsyncMessageProcessingConsumer`를 실행하며 바인딩에 필요한 처리를한다.

여기서 `AsyncMessageProcessingConsumer`는 컨슈머 인스턴스 이며 바인딩된 이후 부터, 메세지 관리를 진행한다.


