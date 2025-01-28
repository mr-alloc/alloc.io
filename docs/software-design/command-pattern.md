---
layout: post
title: 커맨드 패턴 (Command Pattern)
categories: [software-design, behavior]
tags: [Command Pattern, Design Pattern, Software Design]
date: 2020-06-17 18:34:00 +0900
thumbnail: /post/software-design/command-pattern-intro.svg
profile-image: /post/profile/profile0.jpg
current-company: Cubic INC
current-position: SI Researcher
summary: Command Pattern
excerpt-separator: <!--more-->
hide: true
---
커맨드 패턴은 처리 명령을 독립적인 실행가능 객체로 만들어, 일괄적으로 취소 또는 실행을 할 수 있도록 하는 디자인 패턴이다.

또한, 이 명령의 처리를 지연시키거나, 대기열에 넣을 수 있도록 하여 처리할 수 있다.
<!--more-->
## 핵심 구성요소::key-components

* **Command**: 명령을 나타내는 인터페이스/추상 클래스
* **ConcreteCommand**: 실제 명령을 나타내는 구상 클래스
* **Invoker**: 명령을 실행하는 객체
* **Receiver**: 명령의 수신자
* **Client**: ConcreteCommand 객체를 생성하고 Invoker 객체에게 전달하는 객체

```mermaid
---
config:
    class:
        hideEmptyMembersBox: true
---
classDiagram
    class Command {
        <<interface>>
        +execute(): void
        +undo(): void
    }
    class ConcreteCommand {
        -receiver: Receiver
    }    
    class Invoker {
        -commands: List~Command~
        +executeCommand(Command command): void
        +undoLastCommand(): void
    }
    class Receiver {
        ...
        +feature1(): void
        +feature2(): void
    }
    class Client {
        
    }
    ConcreteCommand --|> Command
    Invoker --> Command
    Client ..> ConcreteCommand
    Client --> Receiver
    Client --> Invoker
    ConcreteCommand --> Receiver
```

## 예제::example

예제를 통해 커맨드 패턴을 살펴보기 전에, 다음의 역할과 책임을 명심하자.

* `Invoker`
  * **역할**: 명령 호출자 객체이며, 명령을 목록을 관리한다.
  * **책임**: 명령을 실행하거나 취소한다.
* `Command`
  * **역할**: 실제 명령을 구현하는 객체는 비즈니스 논리 객체중 하나에게 호출을 전달한다.
  * **책임**: 명령에 대한 실행과 취소를 `Receiver` 객체를 이용해 수행한다.
* `Receiver`
  * **역할**: 외부에서 호출을 전달받는다.
  * **책임**: 전달 받은 호출에대한 비즈니스 로직을 수행한다.
* `Client`
  * **역할**: 실제 명령을 `Invoker`에게 전달한다.
  * **책임**: 실제 명령을 생성하여 `Invoker`와 연결하며, 실행흐름을 제어한다.


### 주문 처리 시스템::example-1

주문 처리에 대한 시스템을 만들고자 한다.
구매하는 상품에대한 주문이있고, 해당 주문에 대하여 생성하거나 변경하는 기능을 만들어보자. 

**Command**

수행하려는 주문 행위에 단위의 명령을 구현한다.

::code-group

```java::OrderCommand.java
public interface OrderCommand {

    void execute();

    void undo();
}
```

```java::CreateOrderCommand.java
public class CreateOrderCommand implements OrderCommand {

    private final OrderManager receiver;
    private final Order order;

    public CreateOrderCommand(OrderManager receiver, Order order) {
        this.receiver = receiver;
        this.order = order;
    }

    @Override
    public void execute() {
        this.receiver.createOrder(order);
    }

    @Override
    public void undo() {
        this.receiver.cancelOrder(order);
    }
}
```

```java::UpdateOrderCommand.java
public class UpdateOrderCommand implements OrderCommand {

    private OrderManager receiver;
    private Order order;
    private OrderStatus previousOrder;
    private OrderStatus newStatus;

    public UpdateOrderCommand(OrderManager receiver, Order order, OrderStatus newStatus) {
        this.receiver = receiver;
        this.order = order;
        this.newStatus = newStatus;
        this.previousOrder = order.getStatus();
    }

    @Override
    public void execute() {
        receiver.updateOrderStatus(order, newStatus);
    }

    @Override
    public void undo() {
        receiver.updateOrderStatus(order, previousOrder);
    }
}
```

::

**Invoker**

주문처리 행위에대한 명령들을 관리하며, 실행하거나 취소할 수 있다.

```java::OrderCommandInvoker
public class OrderCommandInvoker {
    private final List<OrderCommand> commands = new ArrayList<>();

    public void executeCommand(OrderCommand command) {
        command.execute();
        commands.add(command);
    }

    public void undoLastCommand() {
        if (!commands.isEmpty()) {
            OrderCommand lastCommand = commands.remove(commands.size() - 1);
            lastCommand.undo();
        }
    }

}
```


## 적용::applicability


## 장단점::pros-and-cons

**장점**

*

**단점**

* 
