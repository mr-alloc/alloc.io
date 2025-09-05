---
layout: post
title: Cloud Stream Configuration
tags: [ Spring, Spring Boot, Spring Cloud Stream, Configuration ]
date: 2025-09-05 09:34:00
thumbnail: /post/back-end/spring/cloud-stream-configuration/index.png
current-company: NEOWIZ
current-position: Software Engineer
summary: 클라우드 스트림 구성
excerpt_separator: <!--more-->
hide: false
---

서비스와 메시징 플랫폼을 연결하기 위해, Spring Cloud Stream 설정의 종류와 사용 방법을 알아보자.
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
      definition: create-schedule|alert-operation; modify-schedule
```

> 각 함수 구분자(`;`)는 앞뒤로 공백이 있어도 되지만, 파이프라인 구분자(`|`)는 앞, 뒤로 공백이 있으면 안된다.
> 또한, `spring.cloud.function.routing.enabled` 옵션이 활성되 된다면 definition이 functionRouter로 덮어써지기 때문에 적용되지 않는다.
:{ "type": "caution", "icon": "warning-octagon" }

> 함수 구분자(`;`)는 구분에 쓰이기 때문에, `create-schedule|alert-operation; modify-schedule;`처럼 설정하면
> 실제로 구성시에 ["create-schedule|alert-operation", "modify-schedule", ""] 처럼 3 개의 설정으로 인식된다. 따라서 주의가 필요하다.
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
  * 그룹의 경우 Consumer에게만 적용되며, 소속될 바인딩의 고유한 이름이다. 많은 컨슈머가 같은 그룹 내에서 구독을 공유한다.
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

### 3. 메시징 플랫폼 바인더 설정::configuration-of-messaging-platform

`SCS`는 실제 메시징 플랫폼과 유연하게 연결되기 위해 `Binder`인터페이스를 제공한다.
또한 각 플랫폼 바인더 모듈은 이를 구현하여 브로커와 통신하며, 실제 스트림을 제공한다.

예를 들어 **RabbitMQ**라면 다음과 같이 구성할 수 있다.

```yaml::application.yaml
spring:
  cloud:
    function:
      definition: create-schedule
    stream:
      #SCS 추상화를 위한 바인딩
      bindings:
        create-schedule-in-0:
          destination: create-schedule-exchange
          group: create-schedule-queue
          binder: rabbit
      rabbit:
        bindings:
          create-schedule-in-0:
            consumer:
              auto-bind-dlq: false
```

`create-schedule`(스케줄 생성)의 경우 DLQ(Dead Letter Queue)를 설정하지 않고 Exchange와 Queue만 지정해주었다.
SCS에서는 채널의 이름(`*-out-0`, `*-in-0`)이 약속되어있기 때문에, 이름을 위해 커스텀 설정을 하지않는 이상 네이밍 룰을 따라야한다.
컨슈머(Consumer)는 기본적으로 `*-in-0`룰을 따르기 때문에 위와 같이 지정하였다.

![DLQ가 활성화 되지 않은 설정](/post/back-end/spring/cloud-stream-configuration/bind-without-dlq-config.png)
:{ "align": "center", "max-width": "600px", "description": "DLQ가 활성화 되지 않은 Exchange" }

```
╭──────── Exchange ────────╮
│ create-schedule-exchange │
╰────────────┐┌────────────╯
          ↓  ││  ↓ 
  ╭─────── Queue ─────────╮
  │ create-schedule-queue │
  ╰────────//───\\────────╯
          //     \\
      ╭───┘└╮   ╭┘└───╮
      │ App │   │ App │
      ╰─────╯   ╰─────╯
```

위 바인딩의 흐름을 간략히 본다면 위와 같다 App에서는 처리할 메세지의 Exchange 정보를 정의(App 구동시 동일한 정보가 없다면 생성)한다.
`auto-bind-dlq` 옵션을 활성화 하면 기본적으로 Dead Letter를 처리할 수 있는
Exchange를 [DLX](/docs/back-end/message-queue/dead-letter-exchange-in-rabbitmq)로 사용(없으면 생성)한다.

![dlq 설정 활성화](/post/back-end/spring/cloud-stream-configuration/activate-dlq-config.png)
:{ "align": "center", "max-width": "400px", "description": "DLQ 구성을 활성화 하였다." }

위 이미지는 `auto-bind-dlq` 옵션을 통해 DLQ 바인딩을 진행하였다. DLX는 `dead-letter-exchange` 옵션으로 dlq 이름을 지정하지 않는이상, 기본으로 사용된다.
이는 다른 큐들과 함께 DLX가 공유되며 Queue의 이름이 Routing Key로 사용된다.

각 바인더에서는 추상화된 설정을 구현하기 때문에, `spring.cloud.stream`하위의 개별 설정은 다음의 Properties를 참고하여 설정할 수 있다:

* `RabbitMQ`: RabbitExtendedBindingProperties.class
* `Kafka`: KafkaExtendedBindingProperties.class

여러 함수를 결합하기 위한 방법은 [함수 설정](/docs/back-end/spring/cloud-stream#function-properties)에서 선언할 수 았다.

## 설정기반 내부 동작::internal-process-based-on-configuration

`SCS`의 다양한 구성을 추상화 하기 위해 내부적으로 여러 설정들이 이루어진다.

```yaml::설정 예시
spring:
  cloud:
    function:
      definition: > 
        create-schedule,alert-operation; 
        create-user
    stream:
      bindings:
        create-schedule,alert-schedule-in-0:
          destination: create-schedule-exchange
          group: create-schedule-queue
          binder: rabbit
      ...
```

만약 위와 같은 설정으로 적용된다면,
실제 메세지 브로커와 의 연결이 이루어지기 까지 다음의 과정을 거친다:
::code-group

```text::1. 함수 Bean 생성
      Created!                 Created!
╭── Function Bean ──╮    ╭─ Function Bean ─╮
│ (create-schedule) │    │  alert-schedule │
╰───────────────────╯    ╰─────────────────╯
```

```text::2. 함수 Bean 결합(또는 단일)
╭─────────────── Function A ───────────────╮
│ ╭─ Function Bean ─╮  ╭─ Function Bean ─╮ │
│ │ create-schedule │==│  alert-schedule │ │
│ ╰─────────────────╯  ╰─────────────────╯ │
╰──────────────────────────────────────────╯
```

```text::3. 스프링 추상화를 통한 Consumer Instance와 연결
  ╭────────╮
  │ Broker │  1. 결합된 Function Bean을 소비자와 연결
  ╰───┐┌───╯  2. 컨슈머(인스턴스)는 브로커와 연결
      ││                            ╭─ Function A  ─╮
╭─────┘└ Consumer Instance ──────╮  │╭─────╮ ╭─────╮│
│ AsyncMessageProcessingConsumer │==││ ... │ │ ... ││
╰────────────────────────────────╯  │╰─────╯ ╰─────╯│
                                    ╰───────────────╯
```

::

위 처리를 진행하기 위해 `FunctionConfiguration`에서 설정하여 추상화 함수를 바인딩 하는 `BindableFunctionProxyFactory`를 생성한다.
먼저 설정은 아래와 같이 함수 단위로 진행한다:

```java::FunctionConfiguration.java
@Override
public void afterPropertiesSet() throws Exception {
    //spring.cloud.function.definition 프로퍼티로 함수이름 결정.
    //spring.cloud.stream.function.routing.enabled 활성화 시 모두 functionRouter로 덮어써짐 
    this.determineFunctionName(functionCatalog, environment);

    if (StringUtils.hasText(streamFunctionProperties.getDefinition())) {
        String[] functionDefinitions = this.filterEligibleFunctionDefinitions();
        //funtionDefinition = "create-schedule,alert-schedule"
        for (String functionDefinition : functionDefinitions) {
            //함수 조회
            FunctionInvocationWrapper function = functionCatalog.lookup(functionDefinition);
            if (function != null) {
                if (function.isSupplier(
                ...

                AtomicReference<BindableFunctionProxyFactory> proxyFactory = new AtomicReference<>();
                
                ...
                
                //"create-schedule,alert-schedule_binding"으로 Bean 등록
                ((GenericApplicationContext) this.applicationContext).registerBean(functionDefinition + "_binding",
                    BindableFunctionProxyFactory.class, proxyFactory::get);
            }
            else {
                logger.warn("The function definition '" + streamFunctionProperties.getDefinition() +
                        "' is not valid. The referenced function bean or one of its components does not exist");
            }
        }
    }

    this.createStandAloneBindingsIfNecessary(applicationContext.getBean(BindingServiceProperties.class));

}     
```

여기서 `functionDefinition + "_binding"`이라고 등록된 `BindableFunctionProxyFactory`를 바인딩 빈이라고 한다.
바인딩 빈은 바인딩을 위해 필요한 정보를 갖고 있고, 외부에서 `createAndBindInputs`으로 컨슈머 바인딩을, `createAndBindOutputs`으로 퍼블리셔 바인딩을 호출할 수있도록 제공한다.

위에서 소개 했던 각 역할을 나열해 보면 다음과 같다:

```text::SpringApplication.run()에서 라이프 사이클 실행 (RabbitMQ 기준)
╭─ DefaultLifecycleProcessor ────────────────────╮
│╭─ Binding Lifecycle Bean Start ───────────────╮│
││ ╭─ Bindable (Create And Bind)───────────────╮││
││ │╭─ BindingService ──╮ ╭─ Provisioner ─────╮│││   
││ ││ Reqiest Binding   │ │ Request Provision ├────────────╮
││ │╰─────────┬─────────╯ ╰───────────────────╯││    (Provisioning)   
││ ╰──────────│────────────────────────────────╯││  Create Exchange, Queue 
│╰────────────│─────────────────────────────────╯│         │
╰─────────────│──────────────────────────────────╯         │
              ▼                                            │
  ╭─ Binder (Lifecycle Start) ──╮                          ▼
  │╭─ AMQP Listener Container ─╮│           ╭───── RabbitMQ ──────────────╮ 
  ││  ╭─────────────────────╮  ││           │  ╭─────────╮  ┌────────────┐│
  ││  │ Consumer Instance 1 ├───── Binding! ──▶│ Queue 1 ■■■■ Exchange 1 ││  
  ││  ╰─────────────────────╯  ││           │  ╰─────────╯  └────────────┘│ 
  ││  ╭─────────────────────╮  ││           │  ╭─────────╮  ┌────────────┐│
  ││  │ Consumer Instance 2 ├───── Binding! ──▶│ Queue 1 ■■■■ Exchange 1 ││
  ││  ╰─────────────────────╯  ││           │  ╰─────────╯  └────────────┘│
  ││  ╭─────────────────────╮  ││           │  ╭─────────╮  ┌────────────┐│
  ││  │ Consumer Instance 3 ├───── Binding! ──▶│ Queue 1 ■■■■ Exchange 1 ││
  ││  ╰─────────────────────╯  ││           │  ╰─────────╯  └────────────┘│
  │╰───────────────────────────╯│           ╰─────────────────────────────╯ 
  ╰─────────────────────────────╯
     RabbitMessageChannelBinder
                
```

Exchange와 Queue 내부적으로 설정을 기반으로 프로비저닝하고, 구성된 함수와 바인딩한다.
AMQP Listener Conainer에서는 내부적으로 Consumer Instance (AsyncMessageProcessingConsumer)를 통해 RabbitMQ와 통신한다.
메세지 수신 컴포넌트(SimpleMessageListenerContainer)는 메세지를 비동기적으로 안전하게 수신하기 위해 사용되는 핵심 컴포넌트이다.

내부적으로 BlockingQueueConsumer를 통해 TransactionTemplate을 사용하여 메시지 수신의 원자성을 보장하며, 동시성 제어도 가능하다.
컨슈머 인스턴스는 바인딩이 된 이후부터 메시지 관리를 시작한다.