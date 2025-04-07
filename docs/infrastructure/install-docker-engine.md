---
layout: post
title: 도커 엔진 설치하기 (Ubuntu)
tags: [ Infrastructure, Docker, Container ]
date: 2025-04-02 14:23:00
thumbnail: /post/infrastructure/install-docker-engine.png
current-company: NEOWIZ
current-position: Software Engineer
summary: Ubuntu 도커 엔진 설치
excerpt_separator: <!--more-->
hide: false
---

유료 도커 데스크탑 말고, 무료 도커 엔진 사용하기
<!--more-->

> 다른 플랫폼은 [도커 엔진 설치](https://docs.docker.com/engine/install/) 에서 확인할 수 있다.
:{ "type": "tip", "icon": "check-circle" }

## 개요::summary

기업은 **연매출 $10M(천만)달러 이상** 또는 **직원 250명 이상** 시 도커 데스크탑 사용시 비용을 지불해야 한다.
따라서 이 기업에 속하면 유료로 도커 데스크탑 사용해야하기 때문에, 엔지니어답게 무료인 도커 엔진만 설치해서 사용한다.

## 사전 준비::prerequisites

### 방화벽 제한 사항::firewall-limitations

> 도커 설치하기 전에, 다음의 보안 영향과 방화벽 호환성 문제를 고려해야 한다.

* 방화벽 설정을 관리하기 위해 `ufw` 또는 `firewalld`를 사용하는 경우, 도커를 통해 컨테이너 포트를 노출할 때, 이 포트가 방화벽 규칙을 우회한다는 점을 주의 해야한다.
  자세한 사항은 [도커와 ufw](https://docs.docker.com/engine/network/packet-filtering-firewalls/#docker-and-ufw) 참조.
* 도커는 `iptables-nft`와 `iptalbes-legacy`만 호환된다. `nft`로 생성된 방화벽 규칙은 도커가 설치된 시스템에서 지원되지 않는다.
  사용하는 방화벽 규칙셋이 `iptables` 또는 `ip6tables`으로 생성되었는지 확인하고, 이를 `DOCKER-USER` 체인에 추가해야 한다. 자세한
  사항은 [패킷 필터링과 방화벽](https://docs.docker.com/engine/network/packet-filtering-firewalls/) 참조.

### OS 요구사항::os-requirements

도커 엔진을 설치하기위해 우분투 64비트 버전이 필요하다:

* Ubuntu Oracular 24.10
* Ubuntu Noble 24.04 (LTS)
* Ubuntu Jammy 22.04 (LTS)
* Ubuntu Focal 20.04 (LTS)

우분투 도커 엔진은 x86_64 (또는 amd_64), armhf, arm64, s390x 그리고 ppc64le (ppc64el) 아키텍쳐들과 호환된다.

> Linux Mint같은 우분투 파생 배포판에서의 설치는 공식적으로 지완되지않는다. (될 수도 있지만)
:{ "type": "note", "icon": "info" }

### 이전 버전 제거::uninstall-old-versions

도커 엔진을 설치하기전에, 충돌하는 패키지들을 제거해야 한다.

사용하는 리눅스 배포판은 도커가 제공하는 공식적인 패키지와 충돌할 수 있는 비공식적 도커 패키지를 제공할 수 있다. 도커 엔진의 공식버전을 설치하기전에 이러한 패키지를 삭제해야한다.

삭제해야할 비공식적 패키지:

* `docker.io`
* `docker-compose`
* `docker-compose-v2`
* `docker-doc`
* `podman-docker`

또한, 도커 엔진은 `containerd`와 `runc`에 의존한다. 도커 엔진은 이러한 의존성들을 한개 패키지로 번들링한다:
`containerd.io`. 이전에 `containerd` 또는 `runc`를 설치 했던 적이 있는 경우, 도커 엔진으로 패키징된 버전과의 충돌을 방지하기 위해 삭제해야 한다.

아래 명령으로 충돌나느 모든 패키지들을 삭제할 수 있다:

```shell
$ for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

`apt-get`에서 설치된 패키지가 없다고 나올수도 있다.

도커 제거 시 `/var/lib/docker/`에 저장된 이미지, 컨테이너, 볼륨 그리고 네트워크는 자동으로 지워지지 않는다.
클린 설치를 시작하고 싶고, 모든 존재하는 데이트를 정리하고 싶다면 [도커 엔진 제거](https://docs.docker.com/engine/install/ubuntu/#uninstall-docker-engine)
섹션을 읽으면 된다.

## 설치 방법::installation-methods

필요에 따라 다른 방법으로 도커엔진을 설치할 수 있다:

* 도커 엔진은 [리눅스용 도커 데스크탑](https://docs.docker.com/desktop/setup/install/linux/)에 포함되며, 이게 제일 쉽고 빠르게 시작하는 방법이다.
* [도커 `apt` 저장소](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)에서 도커 엔진 설치하기
* [수동으로 설치](https://docs.docker.com/engine/install/ubuntu/#install-from-a-package)하고 수동으로 업그레이 관리
* [편의 스크립트](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script) 사용. 개발 환경과 테스트에만 추천

### `apt` 저장소를 이용하여 설치::install-using-the-repository

새 호스트 머신에서 처음 도커 엔진을 설치하기 전에, 도커 `apt` 저장소를 설치해야 한다. 그 후에, 저장소에서 도커를 설치하거나 업데이트 할 수 있다.

1. 도커 `apt` 저장소 설치하기.
   ```shell
   # 도커 공식 GPG 키 추가
   sudo apt-get update
   sudo apt-get install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc
   
   # Apt 소스에 저장소 추가
   echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt-get update
   ```
2. 도커 패키지 설치.
    * 최신 버전
       ```shell
       $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
       ```
    * 특정 버전
       ```shell
       # 가능한 버전 확인
       $ apt-cache madison docker-ce | awk '{ print $3 }'
       
       5:28.0.4-1~ubuntu.24.04~noble
       5:28.0.3-1~ubuntu.24.04~noble
       ```
      원하는 버전 선택 및 설치
       ```shell
       $ VERSION_STRING=5:28.0.4-1~ubuntu.24.04~noble
       $sudo apt-get install docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io docker-buildx-plugin docker-compose-plugin
       ``` 
3. `hello-world` 이미지 실행으로 설치 성공 확인하기:
   ```shell
   $ sudo docker run hello-world
   ```
   이 명령어는 테스트 이미지를 다운로드 하고 컨테이너에서 실행한다. 컨테이너가 실행할 때, 확인 메세지를 출력하고 종료한다.

> 루트 계정으로 실행하지 않아서 에러가 나왔다면?
> `docker` 사용자 그룹은 존재하지만, 유저를 포함하지 않아서, 도커 명령을 실행하려면 `sudo`를 사용해야 한다.
> 권한이 없는 사용자가 도커 명령어를 실행할 수 있도록 허용하고 기타 선택적 설정 단계를
> 위해 [리눅스 postinstall](https://docs.docker.com/engine/install/linux-postinstall)를 계속 진행한다.
:{ "type": "tip", "icon": "lightbulb" }

### 도커 엔진 업그레이드::upgrade-docker-engin

[설치 명령](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)링크에서 설치를 원하는 새로운 버전을 선택하여 2번째 단계를
따라하면 도커 엔진을 업그레이드 할 수 있다.

## 패키지 매니저로 설치::install-from-a-package

도커 엔진을 설치하는데 `apt` 저장소를 사용할 수 없는 경우, `deb 파일로 릴리즈를 다운로드 받을 수 있고 수동으로 설치가 가능하다.
도커 엔진을 업그레이드 하고 싶다면, 매번 새로운 파일을 다운로드 해야한다.

1. [https://download.docker.com/linux/ubuntu/dists/](https://download.docker.com/linux/ubuntu/dists/?_gl=1*s1qa16*_ga*ODU1OTAyNzQxLjE3NDM1ODEyNzY.*_ga_XJWPQMJYHQ*MTc0Mzk5NDAzOC4yLjEuMTc0Mzk5NDc4NC42MC4wLjA.)
   방문
2. Ubuntu 버전 선택 (버전에 대한 코드네임은 `lsb_release -a`로 볼수 있다.)
3. `pool/stable/`로 들어가서 아키텍처 선택 (`amd64`, `armhf`, `arm64`, `s390x`)
4. 도커 엔진, CLI, containerd 및 도커 컴포즈 패키지들을 다음의 `deb` 파일로 다운로드
    * `containerd.io_<version>_<arch>.deb`
    * `docker-ce_<version>_<arch>.dev`
    * `docker-ce-cli_<version>_<arch>.deb`
    * `docker-buildx-plugin_<version>_<arch>.deb`
    * `docker-compose-plugin_<version>_<arch>.deb`
5. `deb` 패키지를 설치. 도커 패키지를 다운받은 다음의 예제 경로에서 업데이트
    ```shell
    $ sudo dpkg -i ./containerd.io_<version>_<arch>.deb \
      ./docker-ce_<version>_<arch>.deb \
      ./docker-ce-cli_<version>_<arch>.deb \
      ./docker-buildx-plugin_<version>_<arch>.deb \
      ./docker-compose-plugin_<version>_<arch>.deb
    ```
   도커 데몬은 자동으로 시작된다.
6. 설치는 `hello-world` 이미지 실행으로 성공으로 검증한다.
    ```shell
    $ sudo service docker start
    $ sudo docker run hello-world
    ```
   이 명령은 테스트 이미지를 다운로드하고 컨테이너에서 실행한다. 컨테이너가 실행할 때, 확인 메세지를 출력하고 종료한다.

이제 성공적으로 도커 엔진을 설치하고 시작했다.

> 루트 계정으로 실행하지 않아서 에러가 나왔다면?
> `docker` 사용자 그룹은 존재하지만, 유저를 포함하지 않아서, 도커 명령을 실행하려면 `sudo`를 사용해야 한다.
> 권한이 없는 사용자가 도커 명령어를 실행할 수 있도록 허용하고 기타 선택적 설정 단계를
> 위해 [리눅스 postinstall](https://docs.docker.com/engine/install/linux-postinstall)를 계속 진행한다.
:{ "type": "tip", "icon": "lightbulb" }

### 도커 엔진 업그레이드::upgrade-docker-engin-1

새로운 패키지 파일을 다운로드하고 새로운 파일을 지정하여 [설치 절차](#install-from-a-package)를 반복하면 도커 엔진을 업그레이드 할 수 있다.

## 편의 스크립트로 설치::install-using-the-convenience-script

도커는 개발 환경에 도커를 설치하기
위해 [https://get.docker.com/](https://get.docker.com/?_gl=1*mnqm5j*_ga*ODU1OTAyNzQxLjE3NDM1ODEyNzY.*_ga_XJWPQMJYHQ*MTc0Mzk5ODk2OS4zLjEuMTc0Mzk5ODk3MS41OC4wLjA.)
에서 비대화형 편의 스크립트를 제공한다.   
편의 스크립트는 운영 환경에서 권장되지 않지만, 필요에따라 적절한 프로비저닝 스크립트 생성에 유용하다.
패키지 저장소를 사용한 설치하는 방법을
알아보려면,[저장소를 이용한 설치가이드](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)를 참조
스크립트 코드는 오픈소스이며, [`docker-install` 깃헙 저장소](https://github.com/docker/docker-install)에서 확인할 수 있다.

인터넷에서 다운로드한 스크립트는 로컬 실행하기 전에 반드시 검토해야 한다. 설치 편의 스크립트의 잠재적 위험과 제한사항을 충분이 파악해야 한다.

* 스크립트는 실행하기 위해 `root` 또는 `sudo` 권한이 필수이다.
* 스크립트는 리눅스 배포판과 버전을 감지하고 패키지 관리 시스템을 설정하는것을 시도한다.
* 스크립트는 대부분의 설치 파라미터 변경을 허용하지 않는다.
* 스크립트는 확인 질문 없이 의존성과 권장사항을 설치한다. 이는 호스트 머신 현재 설정에 따라 크기가 큰 패키지를 다운로드 할 수 있다.
* 스크립트는 기본적으로 최신 안정화 버전의 도커, containerd 및 runc를 다운로드 한다. 이 스크립트로 머신을 프로비저닝 할 때, 이는 예상치 못한 도커의 메이저 버전 업그레이드를 초래할 수 있다.
  운영 환경에 배포하기 전에 테스트 환경에서 업그레이드를 테스트 해야 한다.
* 스크립트는 기존 도커 설치를 업그레이드 하기위해 설계되지 않았다. 기존 설치에 스크립트를 사용하는 경우, 의존성들은 예상 버전으로 업그레이드 되지 않을수 있고 결과적으로 오래된 버전이 생성된다.

> 실행 전 스크립트 절차를 미리 확인. 호출 시 어떤 단계로 스크립트가 실행되는지 알아보기 위해 `--dry-run` 옵션으로 스크립트를 실행할 수 있다:
> ```shell
> $ curl -fsSL https://get.docker.com -o get-docker.sh
> $ sudo sh ./get-docker.sh --dry-run
> ```
:{ "type": "tip", "icon": "lightbulb" }

이
예제는 [https://get.docker.com/](https://get.docker.com/?_gl=1*1bnqmxv*_ga*ODU1OTAyNzQxLjE3NDM1ODEyNzY.*_ga_XJWPQMJYHQ*MTc0NDAwODUxNy40LjEuMTc0NDAwODYzMC42MC4wLjA.)
에서 스크립트를 다운로드하고 리눅스에서 도커 최신 안정화 버전을 설치하기 위해 실행한다:

```shell
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh
Executing docker install script, commit: 7cae5f8b0decc17d6571f9f52eb840fbc13b2737
<...>
```

이제 도커 엔진을 설치하고 실행했다. 데비앙 기반 배포판에서는 `docker` 서비스가 자동으로 시작된다.
CentOS, Fedora, RHEL 또는 SLES같은 `RPM`기반 배포판에서는 적절한 `systemctl`이나 `service` 명령어를 이용하여 수동으로 시작해야한다.
메세지가 나타내는 것으로는, 메세지에 나와있듯이, 기본적으로 일반 유저는 도커 명령어를 실행할 수 없다.

> **권한이 없는 유저로 도커를 사용하거나 rootless 모드에서 설치하려면?**
>
> 설치 스크립트는 도커를 설치하고 사용하기 위해 `root` 또는 `sudo` 권한이 필요하다. 일반 유저가 도커에 접근하는데 권한을
> 주고싶다면, [리눅스를 위한 설치이후 단계](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user)를
> 참조한다.
> `root` 권한 없이도 도커를 설치하거나 rootless 모드에서 실행하기위해 설정할 수 있다. rootless 모드에서 도커를 실행하는
> 방법은 [일반 유저(rootless모드)로 도커 데몬 실행하기](https://docs.docker.com/engine/security/rootless/)를 참조한다.
:{ "type": "ignore", "icon": "none" }

### 사전 배포버전 설치

도커는 사전 배포버전 설치를
위한 [편의 스크립트](https://test.docker.com/?_gl=1*cdfrv6*_ga*ODU1OTAyNzQxLjE3NDM1ODEyNzY.*_ga_XJWPQMJYHQ*MTc0NDAwODUxNy40LjEuMTc0NDAwODYzMC42MC4wLjA.)
또한 제공한다.
이 스크립트는 `get.docker.com`에 있는 것과 같지만, 도커 패키지 저장소의 테스트 채널을 사용하기 위해 패키지 매니저를 설정한다. 테스트 채널은 안정화 및 사전배포(베타 버전, 배포 후보) 버전을 모두
포함한다.
새로운 배포 버전에 사전 접근하거나 안정화 버전으로 배포되기 전에 테스팅 환경에서 평가하기위해 이 스크립트를 사용한다.
