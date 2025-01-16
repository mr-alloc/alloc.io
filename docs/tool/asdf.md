---
layout: post
title: 다중모듈 관리툴 asdf
categories: [tool]
tags: [Module, Multi Module]
date: 2023-02-14 22:14:00 +0900
thumbnail: /post/tool/asdf.png
current-company: Herit Corporation
current-position: Backend Server Developer
summary: asdf
excerpt-separator: <!--more-->
hide: false
---
다양한 모듈의 버전을 한번에 관리할 수 있는 asdf 
<!--more-->

asdf 는 다중 모듈 버전 관리 도구이다.
`nvm`이 node에 대한 버전을 관리할 수 있듯이, `asdf`는 java, node, go 등 다양한 모듈의 버전을 관리할 수 있다.
먼저 모듈 버전 관리를 하려면 사용할 모듈의 플러그인을 설치해야 한다. 설치할 수 있는 플러그인이 뭐가 있는지 확인하고, 플러그인을 설치해서 버전 관리를 하면 되는 구조다.

## 설치

1. `git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.15.0`
2. [OS 별 참조](https://asdf-vm.com/guide/getting-started.html#_3-install-asdf)


## 명령어

### 플러그인

```shell
$ asdf plugin list all # 전체 플러그인 조회
$ asdf plugin list all | grep <plugin-name> # 검색 (윈도우는 findStr)
$ asdf plugin add <plugin-name> # 플러그인 설치 
```

### 모듈

```shell
$ asdf list-all <plugin-name> #플러그인 모듈 조회
$ asdf list-all <plugin-name> | grep <module-name> # 검색 (윈도우는 findStr)
$ asdf latest <plugin-name> <version> #최신 버전 확인
$ asdf install <module-name> <version> #모듈 설치
$ asdf local <module-name> <version> #현재 디렉토리에서 참조할 모듈 버전 지정(선행 설치 필요)
$ asdf global <module-name <version> #전체 디렉토리에서 참조할 모듈 버전 지정 (선행 설치 필요)
```

[다른 명령어](https://asdf-vm.com/manage/commands.html);


## 설치 순서

1. 플러그인
2. 모듈-버전
