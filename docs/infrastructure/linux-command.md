---
layout: post
title: 리눅스 명령어
tags: [ Linux/Unix, CLI, Command ]
date: 2025-04-15 12:58:00
thumbnail: /post/infrastructure/kubernetes/linux-command.png
current-company: NEOWIZ
current-position: Software Engineer
summary: Linux Command
excerpt_separator: <!--more-->
hide: true
---

자주 사용하는 리눅스 명령어 모음
<!--more-->

## 세션::session

### set::set

```shell
set #모든 환경변수 표시
set MY_VAR=value #변수 설정(세션에서 유지)

set -e #다음 명령어에서 에러 발생시 즉시 종료
set -x # 명령어 추적
```

### wait::wait

```shell
some-command & #새로운 프로세스를 생성하여 명령어를 백그라운드에서 실행한다.
wait #현재 세션에서 &로 백그라운드 실행된 프로세스를 기다린다.
```
