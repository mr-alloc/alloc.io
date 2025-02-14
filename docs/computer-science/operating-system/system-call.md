---
layout: wiki
date: 2021-02-27 19:04:00
title: 시스템 콜 (System Call)
tags: [ Operating System, System Call ]
summary: 시스템 콜
hide: false
---

## 시스템 콜이란?::what-is-system-call

시스템 콜(System Call)은 사용자 프로그램 또는 시스템 프로그램이 시스템 자원을 사용하기 위해 커널에게 요청하는 인터페이스이다.
우리가 흔히 알고있는 표준 라이브러리(`C의 stdio.h: fopen(), fread(), fwrite()`)도 내부적으로는 시스템 콜(`C로 구현`)을 호출하여 커널에게 요청한다.

시스템 자원은 커널에서 관리하기 때문에 외부에서 직접적으로 사용할 수 없어, 이를 위해 커널에서 제공하는 인터페이스를 사용하여 시스템 콜을 호출할 수 있다.
이러한 호출은 일반적으로 C/C++로 작성된 함수 형태로 제공된다.

---

## 예제::example

::text-wrapping

![cp 명령으로 파일 복사](/post/computer-science/operating-system/system-call/copy-file.png)

예를 들어 한 파일로부터 데이터를 읽어서 다른 파일로 복사하는 간단한 프로그램을 작성한다 가정해 보자.

`UNIX`의 CP 명령(`cp in.txt out.txt`)은 두개의 파일 이름을 인자로 받아서 첫번째 파일로부터 데이터를 읽어서 두번째 파일로 데이터를 쓴다.
먼저 인자를 받고 나면 파일을 열고, 출력파일을 생성하여 출력 파일도 연다. 각각의 연산은 별개의 시스템콜(`open()`)을 호출한다.

하지만 이와 같은 경우는 파일을 복사하기전 모든 검증과정이 끝났을 때의 상황이다.
만약 입력 파일(`in.txt`)이 존재하지 않거나, 그 파일에 대한 접근이 금지된 경우 프로그램은 에러 메세지를 출력하고 비정삭적으로 종료(또 다른 시스템콜)를 해야한다.

입력 파일에 대한 검증이 완료되어도, 출력파일을 생성할 때, 동일한 이름을 가진 파일이 이미 존재하면 기존 파일을 삭제(delete)/변경(write) 또는 새로운 파일 이름으로 생성(create)할 수 있다.
이런 복사라는 과정에서도 다양한 시스템콜이 여러번 호출된다.

::{ "align": "right" }

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
    * read()함수 구현: [`/sysdeps/unix/sysv/linux/read.c`](https://sourceware.org/git/?p=glibc.git;a=blob;f=sysdeps/unix/sysv/linux/read.c)
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

읽기가 성공한 경우 읽어 들인 바이트 수(ssize_t)를 반환하고, 오류가 발생한 경우 `-1`을 반환한다.

> Unix/Linux 시스템에서는 `man read` 명령어로 man(manual) 페이지에서 시스템의 모든 명령어, 함수, 시스템콜 등에 대한 정보를 확인할 수 있다.
:{ "type": "tip", "icon": "lightbulb" }

![시스템 콜 호출](/post/computer-science/operating-system/system-call/process-of-system-call.png)
:{ "max-width": "400px", "align": "center", "description": "시스템 콜 호출 과정" }

시스템 콜 호출은 다음과 같이 처리된다.

1. 사용자 프로그램은 시스템 콜을 호출한다. (syscall_cp()): 운영체제 에서
   제공하는 [Wrapping API](https://git.musl-libc.org/cgit/musl/tree/src/unistd/read.c) 호출
2. 시스템 콜인터페이스는 사용자 요청을 검증(인자 유효성, 권한, 리소스 가용성 등)하고 커널에 전달한다.
3. 커널로 전달 전 CPU는 커널모드로 전환되고, 사용자
   요청을 [시스템 콜 테이블](https://github.com/torvalds/linux/blob/v5.6/arch/x86/entry/syscalls/syscall_64.tbl)을 통해 시스템 콜 번호로
   매핑한다.
4. CPU는 실행전 커널모드로 전환하여 커널 함수를 실행하고, 사용자모드로 전환하고 반환값은 사용자 프로그램으로 전달하며, 제어또한 사용자 프로그램으로 넘어간다.

### API와 시스템 콜::api-and-system-call

앞서 시스템 콜 인터페이스는 사용자의 요청을 검증하고 커널 함수로 전달하는 역할을 한다고 했다.
그렇다면 어떤 방식으로 사용자의 요청을 검증하는 것일까?

시스템에서 제공되는 Wrapping API는 사용자 공간에서 `libc`로 제공된다.  
사용자가 `read()` API(**glibc** 기준)를 사용하는 시점부터 알아보자.

```c::Wrapping API 호출
// include/unistd.h
extern ssize_t __libc_read (int __fd, void *__buf, size_t __n);

// sysdeps/unix/sysv/linux/read.c
ssize_t __libc_read (int fd, void *buf, size_t nbytes) {
  return SYSCALL_CANCEL (read, fd, buf, nbytes);
}

libc_hidden_def (__libc_read)

libc_hidden_def (__read)
weak_alias (__libc_read, __read)
libc_hidden_def (read)
weak_alias (__libc_read, read) //외부에서는 read()로 호출하며 alias로 __libc_read()를 호출한다.
```

`__libc_read()` 함수는 시스템콜 인터페이스(`SYSCALL_CANCEL`)로 read 시스템콜을 호출한다.
이 내부적으로 인자값을 어떻게 전달하고 내부적인 시스템콜 매크로를 어떻게 선택하는지 알 수 있다.

::code-group

```c::1. SYSCALL_CANCEL 매크로
//1. 연결된 인터페이스 매크로는 내부적으로 INLINE_SYSCALL_CALL() 매크로를 호출한다. 
# define SYSCALL_CANCEL(...) \
  __SYSCALL_CANCEL_CALL (__VA_ARGS__) //(__VA_ARGS__는 가변인자)
```

```c::2. __SYSCALL_CANCEL_CALL 매크로
#define __SYSCALL_CANCEL_CALL(...) \
  __SYSCALL_CANCEL_DISP (__SYSCALL_CANCEL, __VA_ARGS__)
```

```c::3. __INLINE_SYSCALL_DISP 매크로
//앞서 전달한 __SYSCALL_CANCEL 값을 b로 받는다.
//요청 당시 매개변수 (read, fd, buf, nbytes)를 __SYSCALL_CANCEL_NARGS()로 전달한다. 
#define __SYSCALL_CANCEL_DISP(b,...) \
  __SYSCALL_CANCEL_CONCAT (b,__SYSCALL_CANCEL_NARGS(__VA_ARGS__))(__VA_ARGS__)
//여기서 중요한점은 __SYSCALL_CANCEL_CONCAT은 매크로 이름을 만드는 매크로이다.
//즉 b: __SYSCALL_CANCEL 와 __SYSCALL_CANCEL_NARGS(__VA_ARGS__)의 결과값을 인자로 받는다.

//상위에 작성된 매크로 이름 생성 매크로 
#define __SYSCALL_CANCEL_CONCAT_X(a,b)     a##b //a와 b를 붙인다.
#define __SYSCALL_CANCEL_CONCAT(a,b)       __SYSCALL_CANCEL_CONCAT_X (a, b)
```

```c::4. __SYSCALL_CANCEL_NARGS 매크로
//NARGS는 "Number of Arguments"의 약자로, 가변인자의 개수를 반환한다.
#define __SYSCALL_CANCEL_NARGS_X(a,b,c,d,e,f,g,h,n,...) n
#define __SYSCALL_CANCEL_NARGS(...) \
  __SYSCALL_CANCEL_NARGS_X (__VA_ARGS__,7,6,5,4,3,2,1,0,)
//위처럼 되면 __SYSCALL_CANCEL_NARGS(read, fd, buf, nbytes)는 3를 반환한다.
//a=read, b=fd, c=buf, d=nbytes, e=7, f=6, g=5, h=4, n=3
```

```c::5. 호출할 매크로 선택
#define __SYSCALL_CANCEL_DISP(b,...) \
  __SYSCALL_CANCEL_CONCAT (b,__SYSCALL_CANCEL_NARGS(__VA_ARGS__))(__VA_ARGS__)
//해당 코드의 매크로를 치환하면 아래처럼 된다.
//b: __SYSCALL_CANCEL
//__SYSCALL_CANCEL_NARGS(read, fd, buf, nbytes): 3
//__SYSCALL_CONCAT(__SYSCALL_CANCEL, 3)(read, fd, buf, nbytes): __SYSCALL_CANCEL3(read, fd, buf, nbytes)

//결과적으로 __SYSCALL_CANCEL3(read, fd, buf, nbytes) 매크로를 호출한다.
```

::

위에서는 `__SYSCALL_CANCEL3(read, fd, buf, nbytes)` 매크로를 호출하였다.
이제 해당 매크로를 시점으로 어떻게 이어지는지 알아 보자

::code-group

```c::1. __SYSCALL_CANCEL3 매크로 호출
/* sysdeps\unix\sysv\linux\mips\mips64\n32\syscall_types.h */
typedef long long int __syscall_arg_t;
//Syscall Safe Convert		    
#define __SSC(__x) ((__syscall_arg_t) (__typeof__ ((__x) - (__x))) (__x))

/* sysdeps\unix\sysdep.h */
# define __SYSCALL_CANCEL7_ARG_DEF
# define __SYSCALL_CANCEL7_ARCH_ARG_DEF
# define __SYSCALL_CANCEL7_ARG

long int __syscall_cancel (__syscall_arg_t arg1, __syscall_arg_t arg2,
			   __syscall_arg_t arg3, __syscall_arg_t arg4,
			   __syscall_arg_t arg5, __syscall_arg_t arg6,
			   __SYSCALL_CANCEL7_ARG_DEF
			   __syscall_arg_t nr) attribute_hidden;
			   
#define __SYSCALL_CANCEL3(name, a1, a2, a3) \
  __syscall_cancel (__SSC (a1), __SSC (a2), __SSC (a3), 0, 0, 0,	\
		    __SYSCALL_CANCEL7_ARG __NR_##name)
```

```c::2. ntpl/cancellation.c 함수 호출
//Native POSIX Thread Library (NPTL)의 취소 기능을 위한 코드
long int
__syscall_cancel (__syscall_arg_t a1, __syscall_arg_t a2,
		  __syscall_arg_t a3, __syscall_arg_t a4,
		  __syscall_arg_t a5, __syscall_arg_t a6,
		  __SYSCALL_CANCEL7_ARG_DEF __syscall_arg_t nr)
{
  //__internal_syscall_cancel(fd, buf, nbytes, 0, 0, 0, 0)
  int r = __internal_syscall_cancel (a1, a2, a3, a4, a5, a6,
				     __SYSCALL_CANCEL7_ARG nr);
  return __glibc_unlikely (INTERNAL_SYSCALL_ERROR_P (r))
	 ? SYSCALL_ERROR_LABEL (INTERNAL_SYSCALL_ERRNO (r))
	 : r;
}
```

```c::3. ntpl/cancellation.c 함수 호출2
/* Called by the INTERNAL_SYSCALL_CANCEL macro, check for cancellation and
   returns the syscall value or its negative error code.  */
long int
__internal_syscall_cancel (__syscall_arg_t a1, __syscall_arg_t a2,
			   __syscall_arg_t a3, __syscall_arg_t a4,
			   __syscall_arg_t a5, __syscall_arg_t a6,
			   __SYSCALL_CANCEL7_ARG_DEF
			   __syscall_arg_t nr)
{
  long int result;
  struct pthread *pd = THREAD_SELF;
  
  ...

  /* Call the arch-specific entry points that contains the globals markers
     to be checked by SIGCANCEL handler.  */
  //__syscall_cancel_arch(&pd->cancelhandling, __NR_read, fd, buf, nbytes, 0, 0, 0)
  result = __syscall_cancel_arch (&pd->cancelhandling, nr, a1, a2, a3, a4, a5,
			          a6 __SYSCALL_CANCEL7_ARCH_ARG7);
			          
  ch = atomic_load_relaxed (&pd->cancelhandling);
  
  if (result == -EINTR && cancel_enabled_and_canceled (ch))
    __syscall_do_cancel ();

  return result;
}
```

```asm::4. 실제 시스템콜 호출
#include <sysdep.h>
#include <descr-const.h>
/* sysdeps/unix/sysv/linux/mips/x86_64/syscall_cancel.S */
/* long int [rax] __syscall_cancel_arch (volatile int *cancelhandling [%rdi],
					 __syscall_arg_t nr   [%rsi],
					 __syscall_arg_t arg1 [%rdx],
					 __syscall_arg_t arg2 [%rcx],
					 __syscall_arg_t arg3 [%r8],
					 __syscall_arg_t arg4 [%r9],
					 __syscall_arg_t arg5 [SP+8],
					 __syscall_arg_t arg6 [SP+16])  */

ENTRY (__syscall_cancel_arch)
	.globl __syscall_cancel_arch_start
__syscall_cancel_arch_start:

	/* if (*cancelhandling & CANCELED_BITMASK)
	     __syscall_do_cancel()  */
	mov    (%rdi),%eax
	testb  $TCB_CANCELED_BITMASK, (%rdi)
	jne    __syscall_do_cancel

	/* Issue a 6 argument syscall, the nr [%rax] being the syscall
	   number.  */
	mov    %rdi,%r11
	mov    %rsi,%rax
	mov    %rdx,%rdi
	mov    %rcx,%rsi
	mov    %r8,%rdx
	mov    %r9,%r10
	mov    8(%rsp),%r8
	mov    16(%rsp),%r9
	mov    %r11,8(%rsp)
	syscall

	.globl __syscall_cancel_arch_end
__syscall_cancel_arch_end:
	ret
END (__syscall_cancel_arch)
```

::

`__syscall_cancel` 함수에서 `__NR_read`값이 0으로 변경되는
이유는 [x86_64 시스템콜 매크로](https://sourceware.org/git/?p=glibc.git;a=blob;f=sysdeps/unix/sysv/linux/x86_64/64/arch-syscall.h;h=dfc10d0c7e8a8f1e3cfc81c00096bec4d016b3f0;hb=HEAD)
에 0으로 정의 되어있기 때문이다.  
실제 시스템콜 호출코드를 보면 [레지스터](/wiki/register)에 인자값들을 세팅하고 마지막에 `syscall` 명령어로 시스템 콜을 호출한다.
위 내용으로 Wrapping API(`glibc`)에서는 호출할 시스템콜 정보를 찾고 인자값을 레지스터에 적재하여 시스템콜을 호출하는 과정을 알 수 있다.

또한 `syscall` 명령은 하드웨어 레벨에서 커널모드로 전환하며, 커널의 시스템콜을 호출하는 역할을 한다.

### 시스템콜 인터페이스::system-call-interface

앞서 `glibc`에서 각 인자 값을 레지스터에 저장하고, `syscall` 명령어로 시스템콜을 호출하기 까지 과정을 보았었다.
이제 커널모드로 변경된 후 제어는 커널로 넘어가게 되는데, 이때 시스템콜 인터페이스를 통해 시스템콜을 호출한다.

`x86` 아키텍쳐 64비트 리눅스의 시스템콜 인터페이스의 시작점은 `arch/x86/entry/entry_64.S` 파일이다.
어셈블러로 작성된 이코드는 아래의 순서로 실행된다.

::code-group

```asm::1. entry_SYSCALL_64 레이블
SYM_CODE_START(entry_SYSCALL_64)
	UNWIND_HINT_ENTRY
	ENDBR

	swapgs
	/* tss.sp2 is scratch space. */
	movq	%rsp, PER_CPU_VAR(cpu_tss_rw + TSS_sp2)
	SWITCH_TO_KERNEL_CR3 scratch_reg=%rsp
	movq	PER_CPU_VAR(pcpu_hot + X86_top_of_stack), %rsp
```

```asm::2. entry_SYSCALL_64_safe_stack 레이블
SYM_INNER_LABEL(entry_SYSCALL_64_safe_stack, SYM_L_GLOBAL)
	ANNOTATE_NOENDBR

	/* Construct struct pt_regs on stack */
	pushq	$__USER_DS				/* pt_regs->ss */
	pushq	PER_CPU_VAR(cpu_tss_rw + TSS_sp2)	/* pt_regs->sp */
	pushq	%r11					/* pt_regs->flags */
	pushq	$__USER_CS				/* pt_regs->cs */
	pushq	%rcx					/* pt_regs->ip */
```

```asm::3. entry_SYSCALL_64_after_hwframe 레이블
SYM_INNER_LABEL(entry_SYSCALL_64_after_hwframe, SYM_L_GLOBAL)
	pushq	%rax					/* pt_regs->orig_ax */

	PUSH_AND_CLEAR_REGS rax=$-ENOSYS

	/* IRQs are off. */
	movq	%rsp, %rdi
	/* Sign extend the lower 32bit as syscall numbers are treated as int */
	//시스템콜 번호 검증
	movslq	%eax, %rsi

	/* clobbers %rax, make sure it is after saving the syscall nr */
	IBRS_ENTER
	UNTRAIN_RET
	CLEAR_BRANCH_HISTORY
	
	...
    //시스템콜 래퍼 함수 호출
	call	do_syscall_64		/* returns with IRQs disabled */

    ..
```

::

여기까지는 시스템콜 인터페이스에서 검증하는 코드였고, 이제 시스템콜 레퍼에서 실제 시스템콜을 호출하는 코드를 살펴보자.

::code-group

```c::common.c
static __always_inline bool do_syscall_x64(struct pt_regs *regs, int nr)
{
	/*
	 * Convert negative numbers to very high and thus out of range
	 * numbers for comparisons.
	 */
	unsigned int unr = nr;

	if (likely(unr < NR_syscalls)) {
		unr = array_index_nospec(unr, NR_syscalls);
		regs->ax = x64_sys_call(regs, unr);
		return true;
	}
	return false;
}
```

```c::syscall_64.c
#define __SYSCALL(nr, sym) __x64_##sym,
const sys_call_ptr_t sys_call_table[] = {
#include <asm/syscalls_64.h>
};
#undef  __SYSCALL

#define __SYSCALL(nr, sym) case nr: return __x64_##sym(regs);
long x64_sys_call(const struct pt_regs *regs, unsigned int nr)
{
	switch (nr) {
	#include <asm/syscalls_64.h>
	default: return __x64_sys_ni_syscall(regs);
	}
};
```

::

시스템콜 래퍼이다. 실제로 시스템콜을 매핑하는 코드는 빌드 타임에 동작으로 만들어진다.
[`Makefile`](https://github.com/torvalds/linux/blob/v5.6/arch/x86/entry/syscalls/Makefile)에는 시스템콜 테이블에 대해 시스템콜로 연결하는 코드를
생성하는 코드가 있다.
[시스템 콜 테이블](https://github.com/torvalds/linux/blob/v5.6/arch/x86/entry/syscalls/syscall_64.tbl)에도 아래와 같이 나와있다.

```text::syscall_64.tbl

# The __x64_sys_*() stubs are created on-the-fly for sys_*() system calls
#
# The abi is "common", "64" or "x32" for this file.
#
0	common	read			sys_read
1	common	write			sys_write
2	common	open			sys_open
...
```

즉 위에서 호출한 `__x64_sys_ni_syscall()` 함수는 전달하는 시스템 콜 번호로 시스템콜을 찾는다.
시스템콜 함수이름은 `__x64_sys_*`로 시작하는데, 이는 빌드타임에 생성되는 코드이다. 읽기를 예로 들면 `__x64_sys_read()` 함수를 호출한다.

`__x64_sys_read()` 함수는 실제로 정의되어 있지는 않지만 컴파일타임에 매크로를 통해 `SYSCALL_DEFINE3(read, ...)`으로 확장된다.
결과적으로 아래의 코드를 호출하게된다.

::code-group

```c::SYSCALL_DEFINE3 함수
SYSCALL_DEFINE3(read, unsigned int, fd, char __user *, buf, size_t, count)
{
	return ksys_read(fd, buf, count);
}
```

```c::ksys_read 함수
ssize_t ksys_read(unsigned int fd, char __user *buf, size_t count)
{
	CLASS(fd_pos, f)(fd);
	ssize_t ret = -EBADF;

	if (!fd_empty(f)) {
		loff_t pos, *ppos = file_ppos(fd_file(f));
		if (ppos) {
			pos = *ppos;
			ppos = &pos;
		}
		ret = vfs_read(fd_file(f), buf, count, ppos);
		if (ret >= 0 && ppos)
			fd_file(f)->f_pos = pos;
	}
	return ret;
}
```

::

여기까지가 커널코드고 `ksys_read` 커널 함수 내부에서 파일을 읽는 실제 로직을 수행한다.
커널함수의 결과는 시스템콜 인터페이스를 통해 다시 **사용자 프로그램으로 전달**된다.


---


## 시스템 콜의 유형::types-of-system-calls

시스템콜은 다섯가지 중요한 유형으로 나눌 수 있다:

1. 프로세스 제어
2. 파일 조작
3. 장치 관리
4. 정보 유지
5. 통신과 보호

### 프로세스 제어::process-control

* 생성(fork), 중지(abort), 종료(exit)
* 적재(load), 실행(execute)
* 프로세스 속성(attributes) 조회, 변경
* 시간 대기
* 이벤트 대기(wait event), 알림(signal event)
* 메모리 할당 및 자유화

### 파일 조작::file-manipulation

* 파일 생성(create file), 삭제(delete file)
* 열기(open), 닫기(close)
* 읽기, 쓰기, 위치 변경(reposition)
* 파일 속성 조회, 변경

### 장치 관리::device-management

* 장치 요청(request devices), 해제(release devices)
* 읽기, 쓰기, 위치 변경(reposition)
* 장치 속성(attributes) 조회, 변경
* 장치의 논리적 부착(attach), 분리(detach)

### 정보 유지::information-maintenance

* 시간, 날짜 조회, 변경
* 시스템 데이터 조회, 변경
* 프로세스, 파일, 장치의 속성(attribute) 조회, 변경

### 통신과 보호::communication-and-protection
* 통신 연결 생성, 제거
* 메세지 송신, 수신
* 상태 정보 전달
* 원격 장치의 부착(attach), 분리(detach)
* 파일 권한 조회, 변경
