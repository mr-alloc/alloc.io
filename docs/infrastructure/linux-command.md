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

**set**

```shell
set #모든 환경변수 표시
set MY_VAR=value #변수 설정(세션에서 유지)

set -e #다음 명령어에서 에러 발생시 즉시 종료
set -x #명령어 추적
set -u #미정의 변수 없이 스크립트 중단
```

**wait**

```shell
some-command & #새로운 프로세스를 생성하여 명령어를 백그라운드에서 실행한다.
wait #현재 세션에서 &로 백그라운드 실행된 프로세스를 기다린다.
```

## 유틸::util

**sed**

`sed` 는 Stream Editor이며, 텍스트 변환 명령어이다.

```shell
# 텍스트 치환
sed 's/old/new/' file.txt # 각 줄의 첫 번째 'old'를 'new'로 변경
sed 's/old/new/g' file.txt # 모든 'old'를 'new'로 변경

# 특정 줄 삭제
sed '2d' file.txt # 2번째 줄 삭제
send '/pattern/d' file.txt # 패턴 매칭되는 줄 삭제
```

실제 예시:

```shell
# 파일 내용 변경
sed -i 's/localhost/127.0.0.1/' config.txt

# 여러 변경사항
sed -i 's/old/new/g; s/foo/bar/g' file.txt

# 특정 줄 앞/뒤에 텍스트 추가
sed '1i\First Line' file.txt   # 첫 줄 앞에 추가
sed '$a\Last Line' file.txt    # 마지막 줄 뒤에 추가
```

CI/CD에서 자주사용:

```shell
# 설정 파일 수정
sed -i "s/VERSION=.*/VERSION=${NEW_VERSION}/" config.env

# 환경변수 치환
sed -i "s|\${DB_HOST}|$DB_HOST|g" application.yml
```

**옵션**

* `-i`: 파일 직접 수정
* `-e`: 여러 명령어 실행
* `/g`: 전체 치환
* `s///`: 치환 명령어

**tee**

`tee`는 입력으로 받은 내용을 파일에 저장하는 명령어이다.
일반 적으로 단독으로 사용하는 경우는 거의 없고 파이프와 같이 사용한다.

```shell
# echo와 함께
echo "Hello world" | tee greeting.txt
# cat 과 
cat << EOF | tee greeting.txt
foo: bar
hello: world
EOF
```

**procps**  - 프로세스 모니터링 도구

```shell
ps      # 프로세스 상태
top     # 실시간 프로세스 모니터
free    # 메모리 사용량
vmstat  # 가상 메모리 통계
w       # 로그인 사용자 정보
```

**sysstat** - 시스템 성능 모니터링 도구

```shell
sar     # 시스템 활동 보고서
iostat  # CPU/디스크 통계
mpstat  # CPU 통계
pidstat # 프로세스별 통계
```

**busybox-extras** - 추가 네트워크 도구

```shell
telnet  # 텔넷 클라이언트
ftpd    # FTP 서버
tftp    # 간단한 파일 전송
httpd   # 간단한 웹 서버
```

**net-tools** - 네트워크 관리 도구

```shell
ifconfig  # 네트워크 인터페이스 설정
netstat   # 네트워크 연결 상태
route     # 라우팅 테이블 관리
arp       # ARP 테이블 관리
```

**tcpdump** - 네트워크 패킷 분석 도구

```shell
tcpdump                   # 기본 패킷 캡처
tcpdump -i eth0          # 특정 인터페이스 모니터링
tcpdump port 80          # 특정 포트 트래픽
tcpdump host 192.168.1.1 # 특정 호스트 트래픽
```