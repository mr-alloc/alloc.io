---
layout: post
title: 도커 명령어
tags: [ Docker, CLI, Command ]
date: 2025-04-15 12:58:00
thumbnail: /post/infrastructure/kubernetes/linux-command.png
current-company: NEOWIZ
current-position: Software Engineer
summary: Docker Command
excerpt_separator: <!--more-->
hide: true
---

자주 사용하는 도커 명령어 모음
<!--more-->

## 도커 빌드 킷::docker-build-kit

도커의 BuildKit(빌드 킷)은 컨테이너 이미지를 빌드할수 있는 빌드 엔진이다.
실제 빌드를 수행하며, 병렬 빌드, 멀티플랫폼 및 다양한 드라이버를 지원하는 도커의 차세대 빌드 엔진이다.

여기서는 빌드 엔진을 이용해 이미지를 만들수 있는 여러 명령어를 소개한다.

### 빌더 인스턴스 생성::buildx-create

빌더 인스턴스와 BuildKit 인스턴스는 아래와 같은 관계이다.
하지만 빌더 인스턴스는 논리적인 개념이므로 CLI의 일부로서 실행되고 실행을 위한 인스턴스가 Pod등으로 생성되는건 아니다.

```
Builder Instance  (빌더 인스턴스 )
    └── Node (BuildKit 인스턴스)
          └── BuildKit Daemon(실제 빌드 수행)
```

```shell
docker buildx create --name docker-builder --bootstrap --use \
                     --platform=linux/amd64 \
                     --node ${CI_PROJECT_NAME}-builder-amd64-${CI_JOB_ID}
```

**옵션**

* `--name`: 빌더 인스턴스 이름. 미지정시 자동 생성
* `--node`: 빌더 아래의 BuildKit 빌드 엔진의 인스턴스 이름. 미지정시 자동 생성
* `--platform`: 해당 빌더가 지원할 플랫폼. OS/arch 형식으로 사용된다. 기본은 linux/amd64
* `--use`: 기본 빌더로 설정
* `--bootstrap`: 즉시 초기화, 없으면 나중에 수동 초기화 필요.
* `--driver`: 드라이버 지정. 기본이 `docker`
    1. `docker`
        * 기본값
        * 로컬 Dcoker 데몬 사용
        * 기본 적인 빌드가능
    2. `docker-container`
        * 격리된 컨테이너에서 BuildKit 실행
        * 더 나은 캐시 지원
        * 모든 BuildKit 기능 사용 가능
    3. `kubernetes`
        * 쿠버네티스 클러스터에서 BuildKit Pod 실행
        * 분산 빌드 가능
        * 리소스 관리 용이
    4. `remote`
        * 원격 BuildKit 인스턴스 사용

### 빌더 인스턴스 조회::buildx-ls

```shell
docker buildx ls
```

### 빌더 상태확인::buildx-inspect

```shell
docker buildx inspect ${BUILDER_NAME}
```

현재 사용중인 빌더가 있다면 빌더 이름을 생략할 수 있다.

**옵션**

* `--bootstrap`: 빌더 초기화. 생성시 진행하였다면 필요없다.

빌더들의 인스턴스 목록을 확인할 수 있다.

### 이미지 빌드::buildx-build

```shell
dcoker buildx build --platform linux/amd64 \
                    --tag ${DOCKER_REGISTRY}:${DOCKER_IMAGE_TAG}-amd64 \
                    --push .
```

**옵션**

* `--platform`: 어떤 플랫폼을 빌드할 것인지를 지정 (빌더는 여러가지 플랫폼을 지원할수 있음)
* `--tag`: 빌드의 태그를 지정
* `--push`: 빌드가 완료되면 레지스트리로 바로 push
* `--builder`: 빌더를 지정한다. create 옵션에서 `--use`를 사용했다면 따로 필요없음. (현재 세션 유지)

### 이미지 툴::buildx-imagetool

```shell
docker buildx imagetools --tag ${DOCKER_REGISTRY}:${DOCKER_IMAGE_TAG} \
                               ${DOCKER_REGISTRY}:${DOCKER_IMAGE_TAG}-amd64 \
                               ${DOCKER_REGISTRY}:${DOCKER_IMAGE_TAG}-arm64
```

한개의 메니페스트로 여러개의 이미지를 묶을 수 있다.
--tag 옵션으로 지정 가능하며, 클라이언트는 OS/arch에 맞는 이미지를 얻을 수 있다. 

## Dockerfile

* `FROM`: 사용할 기본 이미지
    * `${레지스트리 경로}/${이미지 이름}:${태그}` 형식으로 사용
* `RUN`: Shell 실행
* `ENV`: 환경변수 설정
* `ARG`: 빌드 시점에 사용되는 변수