---
layout: wiki
title: 시스템 콜 (System Call)
tags: [ Operating System, System Call ]
summary: System Call
hide: false
---

## 시스템 콜이란?::what-is-system-call

시스템 콜(System Call)은 사용자 프로그램 또는 시스템 프로그램이 시스템 자원을 사용하기 위해 커널에게 요청하는 인터페이스이다.
우리가 흔히 알고있는 표준 라이브러리(`C의 stdio.h: fopen(), fread(), fwrite()`)도 내부적으로는 시스템 콜(`C로 구현`)을 호출하여 커널에게 요청한다.

시스템 자원은 커널에서 관리하기 때문에 외부에서 직접적으로 사용할 수 없어, 이를 위해 커널에서 제공하는 인터페이스를 사용하여 시스템 콜을 호출할 수 있다.
이러한 호출은 일반적으로 C/C++로 작성된 함수 형태로 제공된다.

## 예제::example

::text-wrapping

![cp 명령으로 파일 복사](/post/computer/copy-file.png)

예를 들어 한 파일로부터 데이터를 읽어서 다른 파일로 복사하는 간단한 프로그램을 작성한다 가정해 보자.

`UNIX`의 CP 명령(`cp in.txt out.txt`)은 두개의 파일 이름을 인자로 받아서 첫번째 파일로부터 데이터를 읽어서 두번째 파일로 데이터를 쓴다.
먼저 인자를 받고 나면 파일을 열고, 출력파일을 생성하여 출력 파일도 연다. 각각의 연산은 별개의 시스템콜(`open()`)을 호출한다.

하지만 이와 같은 경우는 파일을 복사하기전 모든 검증과정이 끝났을 때의 상황이다.
만약 입력 파일(`in.txt`)이 존재하지 않거나, 그 파일에 대한 접근이 금지된 경우 프로그램은 에러 메세지를 출력하고 비정삭적으로 종료(또 다른 시스템콜)를 해야한다.

입력 파일에 대한 검증이 완료되어도, 출력파일을 생성할 때, 동일한 이름을 가진 파일이 이미 존재하면 기존 파일을 삭제(delete)/변경(write) 또는 새로운 파일 이름으로 생성(create)할 수 있다.
이런 복사라는 과정에서도 다양한 시스템콜이 여러번 호출된다.

::
:{ "align": "left" }

**연속된 시스템 콜의 예**

1. 입력파일 이름 획득
    1. 화면에 프롬프트 출력
    2. 입력파일 받아들임
2. 출력파일 이름 획득
    1. 화면에 프롬프트 출력
    2. 출력파일 받아들임
3. 입력파일 열기
    1. 파일이 존재하지 않을 경우, 비정상적으로 종료
4. 출력파일 생성
    1. 파일이 존재할 경우, 비정상적으로 종료
5. 루프 (읽기가 실패할 때까지 반복)
    1. 입력파일로 부터 읽어 들임
    2. 출력파일에 쓰기
6. 입력파일 닫기
7. 출력파일 닫기
8. 화면에 완료 메세지 출력
9. 종료

## 시스템콜의 동작 과정::how-system-call-works

시스템 콜은 실제 동작이 아니다. 시스템 콜은 커널 수준에서 제공하는 인터페이스이며, 그 구현은 커널함수로 이루어지게 된다.
따라서 시스템 콜은 c로 만들어지더 라도 커널내에서 제어하려는 자원에 따라 [어셈블리어]() 또는 c로 작성된 함수로 구현된다.

c언어로 작성된 표준 라이브러리(`libc`)에 래핑 API가 제공되는데, 이는 아래와 같다:

1. glibc: GNU C 라이브러리
    * [저장소](https://sourceware.org/git/glibc.git)
    * read()함수 정의: [`/include/unistd.h`](https://sourceware.org/git/?p=glibc.git;a=blob;f=include/unistd.h)
    * read()함수 구현: [
      `/sysdeps/unix/sysv/linux/read.c`](https://sourceware.org/git/?p=glibc.git;a=blob;f=sysdeps/unix/sysv/linux/read.c)
    * 특징
        * Linux 배포판의 표준라이브러리
        * 가장 광범위하게 사용됨
        * 가장 완전한 POSIX 구현
    * 사용되는 시스템: Ubuntu, Fedora, CentOS, Debian 등
2. musl: musl libc
    * [저장소](https://git.musl-libc.org/cgit/musl)
    * read()함수 정의: [`/include/unistd.h`](https://git.musl-libc.org/cgit/musl/tree/include/unistd.h)
    * read()함수 구현: [`/src/unistd/read.c`](https://git.musl-libc.org/cgit/musl/tree/src/unistd/read.c)
    * 특징
        * 경량화된 C표준 라이브러리
        * 임베디드 시스템과 작은 Linux 배포판에 최적화
        * 최소한의 리소스 사용
    * 사용되는 시스템: Alpine Linux, Void Linux 등
4. BSD libc
    * [저장소](https://github.com/freebsd/freebsd-src)
    * read()함수 정의: [`/include/unistd.h`](https://github.com/freebsd/freebsd-src/blob/main/include/unistd.h)
    * read()함수 구현: [`/lib/libc/sys/read.c`](https://github.com/freebsd/freebsd-src/blob/main/lib/libc/sys/read.c)
    * 특징
        * BSD(Berkeley Software Distribution) 계열의 표준 라이브러리
        * POSIX 표준 준수
        * Unix 시스템 고유의 확장 기능 제공
    * 사용되는 시스템: FreeBSD, NetBSD, OpenBSD, MacOS/iOS 등

```c
#include <unistd.h> //unix standard

ssize_t read(int fd, void *buf, size_t count) {
    return syscall_cp(SYS_read, fd, buf, count);
}
```

이 코드는 `musl libc`의 read 시스템콜 래핑 API이다. 각 시그니처는 다음을 의미한다:

1. `fd`: 읽으려는 파일 디스크립터
2. `buf`: 데이터를 읽어들일 버퍼
3. `count`: 버퍼로 읽어 들일 수 있는 최대 바이트 수

읽기가 성공한 경우 읽어 들인 바이트 수(size_t)를 반환하고, 오류가 발생한 경우 `-1`을 반환한다.

> Unix/Linux 시스템에서는 `man read` 명령어로 man(manual) 페이지에서 시스템의 모든 명령어, 함수, 시스템콜 등에 대한 정보를 확인할 수 있다.
:{ "type": "tip", "icon": "lightbulb" }

![시스템 콜 호출](/post/computer/system-call-implementation.png)
:{ "max-width": "400px", "align": "center", "description": "시스템 콜 호출 과정" }

시스템 콜 호출은 다음과 같이 처리된다.

1. 사용자 프로그램은 시스템 콜을 호출한다. (syscall_cp()): 운영체제 에서
   제공하는 [Wrapping API](https://git.musl-libc.org/cgit/musl/tree/src/unistd/read.c) 호출
2. 시스템 콜인터페이스는 사용자 요청을 검증(인자 유효성, 권한, 리소스 가용성 등)하고 커널에 전달한다.
3. 커널로 전달 전 CPU는 커널모드로 전환되고, 사용자
   요청을 [시스템 콜 테이블](https://github.com/torvalds/linux/blob/v5.6/arch/x86/entry/syscalls/syscall_64.tbl)을 통해 시스템 콜 번호로
   매핑한다.
4. 연결된 커널함수를 찾아 실행하고, 사용자모드로 전환하고 반환값은 사용자 프로그램으로 전달하며, 제어또한 사용자 프로그램으로 넘어간다.

### 사용자 요청 검증

시스템 콜은 커널에게 요청하는 것이기 때문에, 잘못된 요청을 하지 않도록 검증이 필요하다.
예를 들어 포인터가 유효한 사용자 공간 주소를 가리키는지, 버퍼의 크기가 적절 한지, 파일 디스크립터가 유효한지 등 여러가지 검증을 수행한다.

## 시스템 콜의 유형::types-of-system-calls

시스템콜은 다섯가지 중요한 유형으로 나눌 수 있다:

1. 프로세스 제어
2. 파일 조작
3. 장치 관리
4. 정보 유지
5. 통신과 보호

### 프로세스 제어::process-control

중지(abort()), 종료(end())는 프로세스에 대해 비정상 또는 정상적으로 프로세스 수행의 완료를 요청한다.
