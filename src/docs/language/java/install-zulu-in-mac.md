---
layout: post
title: Azul System의 OpenJDK Zulu 설치하기
categories: [language]
tags: [OpenJDK, Azul System, Zulu]
date: 2020-12-02 15:25:00 +0900
thumbnail: "/post/java/azul-java.webp"
profile-image: /post/profile/profile1.JPG
current-company: Cubic INC
current-position: SI Researcher
summary: OpenJDK Zulu 설치
excerpt-separator: <!--more-->
hide: true
---

Zulu는 Azul System에서 제공하는 OpenJDK의 빌드이다.
macOS에서 설치하는 방법을 요약했다.

<!--more-->

## macOS에서 Open JDK 설치

MacOS는 일반적으로 `/Library/Java/JavaVirtualMachines` 하위 경로에 jdk를 저장하고 사용한다.


### DMG Installer를 이용한 설치

1. [Azul 다운로드](https://www.azul.com/downloads/?os=macos&_gl=1*dkdl9*_ga*MTQ0NjY0MDg1OS4xNjg4NjM4NTAz*_ga_42DEGWGYD5*MTcwNjc5MTg0NC40LjEuMTcwNjc5MjMwNy4yOC4wLjA.#zulu)에서 Azul Zulu를 위한 DMG Installer 다운로드
2. 설치를 시작하기위해 파일 더블클릭하고, 설치 마법사 명령을 따르기

기본 설치폴더는 다음과같다.

```
/Library/Java/JavaVirtualMachines/<zulu_folder>/Contents/Home
```

`<zulu_folder>` 플레이스 홀더는 그 버전과 Azul Zulu 패키지(JDK or JRE)의 타입을 말한다. 

| 패키지 |      Azul Zulu 폴더명      |     예시      |
| :----: | :------------------------: | :-----------: |
|  JDK   | `zulu-<major_version>.jdk` | `zulu-11.jdk` |
|  JRE   | `zulu-<major_version>.jdk` | `zulu-11.jre` |
:{ "wrapper-class": "items-center" }

예를 들어, Azul Zulu JDK11을 위한 기본설치 폴더인경우:

```
/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home
```

3. Azul zulu 설치를 확인하기위해 터미널 창에서 `java` 명령어를 실행한다.

```bash
$ java -version
```

다음과 같이 출력돼야 한다.  

```
openjdk version "11.0.11" 2021-04-20 LTS
OpenJDK Runtime Environment Zulu11.48+21-CA (build 11.0.11+9-LTS)
OpenJDK 64-Bit Server VM Zulu11.48+21-CA (build 11.0.11+9-LTS, mixed mode)
```

### ZIP 또는 TAR.GZ로 설치

1. [Azul 다운로드](https://www.azul.com/downloads/?os=macos)에서 TAR.GZ 또는 ZIP으로 Azul Zulu 다운로드

2. **Finder** 실행 후 다운로드 폴더로 이동. 압축을 해제하기위해 더블클릭 한다. **사파리**에서 받았다면 자동으로 압축해제 된다.

하지만, 압축해제하기 위해 아래처럼 한번의 명령어를 사용할 수도 있다.

ZIP 인 경우

```bash
unzip <zulu_package>.zip
```

   TAR.GZ 인 경우

```
tar -zxvf <zulu_package>.tar.gz
```

압축 해제한 폴더가 Zulu Azul 설치 폴더 이다.

3. Azul Zulu 설치를 확인하기 위해, 터미널 창에서 다음의 커맨드를 실행한다.

```bash
$ <installation_folder>/bin/java -version
```

4. (선택사항) `<installation_folder>/bin/java` 을 `PATH` 환경변수에 추가하면, 특정한 전체 경로 없이 어디서는 `java` 를 실행할 수 있다.









