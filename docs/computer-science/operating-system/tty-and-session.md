---
layout: post
title: TTY에 대해 알아보자
tags: [ Operating System, OS, tty, session ]
date: 2025-04-25 10:19:30
thumbnail: /post/computer-science/tty-and-session/index.png
current-company: NEOWIZ
current-position: Software Engineer
profile-image: /post/profile/profile1.jpg
summary: TTY
excerpt-separator: <!--more-->
hide: false
---

tty란 무엇일까?
<!--more-->

## 개요::overview

**T**ele**TY**pewriter는 전기-기계식 타자기와 전신 기술의 결합체를 의미한다. 원래 원격지 간 타이핑된 메세지를 주고받는 통신 장치 였다.
Telegraph (전신: 문자나 숫자를 전기신호로 바꾸어 전파나 전류를 보내는 통신)와 (Typewriter: 타자기)의 융합으로 탄생되었고 1846년 Royal Earl House의 인쇄 전신기로 최초 개발
되었다.

상용화는 1908년 즈음 시작되었으며, 1920-1960년대 황금기를 맞아 1950년대 부터 컴퓨팅 시대의 흐름에 따라 컴퓨터와 연결되었다.
여러 사용자가 텔레타이프를 통해 원격 접속이 가능해지며, 현대의 `/dev/tty` 개념의 발판이 되었다.

![Teletype Model 33](/post/computer-science/tty-and-session/tty-model-33.png)
:{ "align": "center", "max-width": "400px", "description": "대표적인 tty, TeleType Model 33"}

중요한 점은 컴퓨터와 사람 간 실시간 상호작용이 가능한점에 있다. 물리적 tty는 원래 다음과 같은 흐름으로 동작하였다:

```
╭─────╮
│ TTY ├──Input with───╮
╰──┬──╯    Keyboard   ↓
   ↑             ╭────┴────╮      ╭──────────╮
   │             │ Encoder ├──→───┤ Computer │
Output with      ╰─────────╯      ╰─────┬────╯
 Printer         ╭─────────╮            │
   ╰─────────────┤ Decoder ├──────←─────╯
                 ╰─────────╯
```

TTY에 내장된 키보드와 프린터를 통해 입출력을하고 Encoder와 Decoder를 통해 전기신호로 바뀌어 컴퓨터와 통신한다.
이러한 물리적 장치가 소프트웨어로 tty가 구현되면서, 사용자와 상호작용이 가능하게 되었다.

## tty란?::what-is-tty

TTY는 사실 AT&T의 자회사인 Teletype Corporation의 브랜드명이였다.
하지만 `Model 33`의 기점으로 UNIX 운영체제가 발전하며 tty가 소프트웨어로 구현되며 대명사적으로 컴퓨터와 사람간 인터렉션할 수 있는 장치를 tty로 부르기 시작하였다.

즉 tty는 터미널이다. tty는 아래와 같이 가상 콘솔과 유사 터미널이 있다.

* 가상 콘솔 (Virtual Console): `/dev/tty1` - `/dev/tty6`
* 유사 터미널 (Pseudo Terminal): `/dev/pts/*`

**가상 콘솔**은 배포판에 따라 다르지만 `/dev/tty1` - `/dev/tty6`까지 제공한다. 하나의 물리적 시스템에서 여러개의 텍스트 기반 터미널 세션을 제공하는 기능이다.
한개의 물리 시스템에 가상 콘솔을 생성하여 연결하기 때문에 호스트 시스템 자체에서만 접근이 가능하다.
또한 `Ctrl + Alt + F1` - `F6`으로 콘솔을 전환 가능하며 다중 사용자간에는 세션을 공유한다.

**유사 터미널**은 하드웨어 터미널을 소프트웨어적으로 에뮬레이션한 말그대로의 진정한 "유사" 터미널이다.
줄여서 `pty(Pseudo TeletYpe write)`라고 한다.

기본적으로 Master-Slave 구조를 가지며 ptmx(Pseudo Terminal Master Multiplexer)가 pts를(Pseudo Terminal Slave)생성한다.

ptmx의 장치 파일은 `/dev/ptmx`이며 터미널 에뮬레이터 프로그램이 제어한다. 예를 들어 새로운 세션 생성 요청이 들어오면 다음과 같이 동작한다:

1. 백그라운드에서 실행 중이던 **터미널 에뮬레이터**가 세션 생성 요청을 수신
2. PTY 쌍을 생성
    1. `open("/dev/ptmx", O_RDWR)` [시스템콜](/wiki/system-call)로 마스터 멀티플렉서(디바이스)를 열면, 커널에 마스터, 슬레이브 인스턴스 쌍을 생성하고
       fd([파일 디스크립터]())를 얻음
    2. 얻은 master_fd는 마스터 인스턴스를 참조하며 grantpt(master_fd)로 slave의 소유자 권한을 설정, unlockpt(master_fd)로 slave 장치의 잠금 해제
    3. `char *slave_name = ptsname(master_fd)`으로 생성된 slave 경로명만 조회 (예: `/dev/pts/0`)
3. 셸 시작
    1. `fork()`로 자식 [프로세스]() 생성
    2. `close(master_fd)`생성해 두었던 master_fd를 닫기(자식 프로세스에서는 더이상 master_fd가 필요 없음)
    3. `int slave_fd = open(slave_name, ORDWR)`슬레이브를 열어 파일 디스크립터 반환
    4. 생성된 PTY Slave 장치를 표준 입출력으로 설정. (세션에 연결되어 사용할 터미널이므로)
       ```c
       dup2(slave_fd, 0); //stdin
       dup2(slave_fd, 1); //stdout
       dup2(slave_fd, 2); //stderr
       ```
    5. `execl("/bin/bash", "bash", NULL)` 셸 실행

## tty의 데이터 흐름::data-flow-of-tty

세션을 연결하여 생성된 tty는 PTY Slave이다. 그렇다면 명령 실행에대한 데이터 흐름은 어떻게 될까?

```
╭────────────────────╮     ╭──────────╮  ╭────────────╮
│ Input From Keyboad ├────→│ Terminal │  │   Kernel   │
│  'ls -al' + Enter  │     │ Emulator ├──→╭──────────╮│ 
╰────────────────────╯     ╰──────────╯  ││  Master  ││
╭────────────────────╮   ╭────────────╮  ││ Instance ├──╮
│  Output to Display │ ←─┤    Line    ├──→╰==========╯╯ │
│  'ls -al'          │   │ Discipline │    ╭───────╮    │
╰────────────────────╯   ╰────────────╯    │ Shell │    │
                                ↑          ╰───────╯    │
                                │              ↑        │
                                │        ╭─────┴────╮   │
                                ╰────────┤  Slave   ├───╯
                                         │ Instance │ 
                                         ╰──────────╯
```

만약 `ls -al`이라는 명령을 입력 한다면 다음과 같이 처리된다.

1. 사용자가 `ls -al` + Enter를 입력
2. 터미널 에뮬레이터가 입력 이벤트를 마스터 FD에 `write()` 시스템 콜로 전송
3. 커널이 데이터를 마스터에서 슬레이브로 복사
4. 라인 디시플린이 각 문자를 처리하고 에코 기능으로 다시 마스터로 보냄
5. 터미널 에뮬레이터가 마스터 FD에서 에코된 문자를 읽어 화면에 표시
6. Enter 키가 입력되면 라인 버퍼의 내용이 셸에 전달
7. 셸이 슬레이브에서 `read()`시스템콜로 전체 명령어 `ls -al`을 읽음

Shell의 반대로 실행결과는  `Shell 프로세스` -> `PTY 슬레이브` ->  `마스터 인스턴스` -> `터미널 에뮬레이터` -> `화면 표시` 순서로 처리된다.

## 사용사례::use-case

그렇다면 사용자 입장에서 tty를 직접 적으로 사용하는 경우는 언제일까?
도커를 예로 들어보자 `docker exec -it {container id} /bin/bash` 명령어는 컨테이너로 세션을 붙을 때 사용할 수있다.
이 명령에서 `-i` 옵션은 표준 입력(input)을, `-t` 옵션은 `pt` 가상 터미널을 사용하겠다는 의미이다.

또한 원격사용자가 ssh로 접속할때마다 새로운 세션이 생성되면서 PTS가 할당된다. 만약 터미널 세션이 종료되면, `/dev/pts/N` 장치가 제거된다.