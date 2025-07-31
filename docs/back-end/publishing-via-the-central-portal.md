---
layout: post
title: Publishing via the Central Portal
tags: [ Maven Central Repository, Publish, Artifact ]
date: 2025-08-01 06:30:00
thumbnail: /post/back-end/publishing-via-the central-portal/index.png
current-company: NEOWIZ
current-position: Software Engineer
summary: Central Portal 통해 발행하기
excerpt_separator: <!--more-->
hide: false
---

25년 6월 30일부로 OSSRH의 지원이 종료되었다.
오픈소스 라이브러리를 배포하기위해 새로 이전된 Central Portal 이용해보자
<!--more-->

## 개요::summary

기존에 Maven Cental에 오픈소스를 배포하려면 OSSRH(**O**pen **S**ource **S**oftware **R**epository **H**osting)를 이용해야 했다.
`Sonatype Jira`에 저장소 관련 이슈를 생성하고, 배포하는 방식이였다. 하지만, 24년 3월 12일 부터 모든 등록은 중앙 포털(Central Portal)로 이루어지게 변경되었고,
마침내 25년 6월 30일 부로 OSSRH의 지원이 종료되었다. 따라서 새로운 방식으로 배포를 해야하므로 이 문서에 그 내용을 설명한다.

## 시작하기::getting-started

### 구성요소 게시::publishing-your-components

네임스페이스(namespace) 인증한 후, Maven Central에 구성요소를 업로드할 준비가 된거다. 다음의 내용으로 참조:

* [Maven](https://central.sonatype.org/publish/publish-portal-maven/)
* [Publisher API](#publishing-by-using-the-portal-publisher-api)
* [Uploading a bundle](#publishing-by-uploading-a-bundle)
* [Gradle](#publishing-by-using-a-gradle-plugin)

#### 구성요소 검증::component-validation

업로드가 승인된 후, 중앙 게시자 포털(Central Publisher Portal)은 검증 절차를 시작한다:

![검증 절차](/post/back-end/publishing-via-the-central-portal/publishingsettings_deployment.png)

검증 절차는 구성 요소가 Maven Central의 모든 요구사항을 충족하는지 확인한다. 검증은 몇 분이상 걸리지 않으며, 새로고침(Refresh) 버튼 클릭으로 검증 절차의 상태를 볼 수 있다.

구성 요소가 모든 요구사항을 충족하지 않는다면, 배포는 실패한다. Deployment card 오른쪽에 검증 결과(Validation Results)라고 적혀있는 오른쪽 컬럼에 검증 실패에 대한 상세 내용이 나온다.
로컬 빌드에서 이러한 이슈를 해결한 후, 구성요소 발행(Publish Component) 버튼을 다시클릭하여 변경된 압축파일을 제출할 수 있는 새로운 배포를 시작할 수 있다.

검증이 성공한 후, 오류가 없다면 구성요소를 게시할 수 있다. 게시(Publish) 버튼을 눌러 Maven Cental에 자동으로 동기화 된다.

![배포 정보](/post/back-end/publishing-via-the-central-portal/deployment-publish-button.png)

> 릴리즈/게시 한 후에는 구성요소를 삭제/변경/수정 할 수 없다. wktpgks
> sodyddms [Central에서 구성요소를 변경(수정, 삭제, 업데이트)할  수 있나요?](https://central.sonatype.org/faq/can-i-change-a-component/) FAQ 정책을
> 확인하면 된다.
> 배포는 배포(Deployment) 탭에서 90일 간 확인 가능하다.
: { "type": "note", "icon": "info" }

## 웹훅 추가하기::adding-a-webhook

중앙 게시자 포탈은 특정 웹훅을 게시자에게 제공한다. 이는 **구성요소 검증 통과**, **Maven Central에 동기화가 승인** 후에 전송한다.
게시자는 메세징 시스템에 알리거나 게시자의 조직 내에서 다른 워크플로우를 트리거하기 위해 웹훅을 사용할 수 있다.

사용자 정보 하위에서 웹훅 보기(View Webhooks) 링크를 클릭하여 웹훅을 추가할 수 있다.

![View Webhooks Button](/post/back-end/publishing-via-the-central-portal/viewwebhooks.png)

웹훅을 호출하기위해 웹훅 URL, 사용자 정보(필요하다면 이름과 비밀번호)를 입력후 저장(Save)버튼을 누르면 변경사항을 저장할 수있다.

![Webhook Popup](/post/back-end/publishing-via-the-central-portal/webhook.png)

올바른 URL(과 추가적인 자격 증명)을 입력 했다면, 컴포넌트 배포하려고하면 즉시 호출된다.

## 웹훅 요청 상세::webhook-request-details

웹훅을 요청은 다음의 형식을 가진다:

| 이름             | 타입             | 설명                                                                                                     |
|----------------|----------------|--------------------------------------------------------------------------------------------------------|
| deploymentId   | string UUID(36 | 배포 고유 아이디                                                                                              |
| deploymentName | string         | 배포 이름                                                                                                  |
| timestamp      | long timestamp | 웹훅 알림 기준 타임스탬프                                                                                         |
| status         | string         | VALIDATED: 배포가 성공적으로 검증됨<br/>PUBLISHING: 배포가 게시중<br/>PUBLISHED: 배포가 성공적으로 게시됨<br/> FAILED: 검증 또는 게시 실패 |
| packageUrls    | string array   | 배포된 구성요소의 Package URL 목록                                                                               |
| centralPaths   | string array   | 배포된 구성요소의 repo1에 대한 URL                                                                                |

> **알려진 웹훅 알림 이슈**: `central-publishing-maven-plugin`의 autoPublish가 활성화 된 경우 VALIDATED 알림은 전송되지 않는다.
>게시 조건에 따라 PUBLISHED 알림은 완전히 누락되거나 중복될 수 있다.
: { "type": "note", "icon": info" }

#### 샘플 JSON 본문 전송

```json
{
  "deploymentId": "abcdefgh-1234-abcd-1234-abcdefghijkl",
  "timestamp": 1710000,
  "status": "VALIDATED",
  "packageUrls": [
    "pkg:maven/org.sonatype.central.test/exampl@1.0.0"
  ],
  "centralPaths": [
    "https://repo1.maven.org/maven2/org/sonatype/central/test/example/1.0.0/example-1.0.0.pom"
  ]
}
```

Sonatype이 웹훅을 보내는 샘플 요청 (CURL)

```shell
curl -X 'POST' '<your webhook url>' \
     -H 'content-type: application/json' \
     -H 'accept: application/json' \
     --data-raw '{"deploymentId":"abcdefgh-1234-abcd-1234-abcdefghijkl","timestamp":1710000000000,"status":"VALIDATED","packageUrls":["pkg:maven/org.sonatype.central.test/exampl@1.0.0"],"centralPaths":["https://repo1.maven.org/maven2/org/sonatype/central/test/example/1.0.0/example-1.0.0.pom"]}'
```

## Gradle 플러그인을 사용하여 게시하기::publishing-by-using-a-gradle-plugin

현재는 중앙게시포털을 통해 Maven Central로 게시할 수 있는 공식 Gradle 플러그인이 있지는 않다.
Sonatype은 Gralde을 통한 게시가 중요하다는 상당한 피드백을 받았고, Gradle 지원이 로드맵에 포함 되어 있다는 사실을 전달하고자 했다.

> **OSSRH API**: 현재 OSSRH를 통해 게시중이고 포털로 마이그레이션하려는 경우, 아래 옵션중 하나를 고려. 하지만 기존 플러그인을
선호하면 [포털 OSSRH Staging API](https://central.sonatype.org/publish/publish-portal-ossrh-staging-api/)를 활용.
: { "type": "note", "icon": info" }

커뮤니티 플러그인

**JReleaser**

[JReleaser](https://jreleaser.org/)
은 [중앙 게시자 포털을 통해 게시지원](https://jreleaser.org/guide/latest/examples/maven/maven-central.html#_portal_publisher_api)하며
Gradle 플러그인 통합을 통해 사용이 가능하다.

**다른 플러그인**

다른 옵션을 찾는 다면 다음의 프로젝트를 확인:

* [ani2fun/sonatype-maven-central-publisher](https://github.com/ani2fun/sonatype-maven-central-publisher)
* [DanySK/publish-on-central](https://github.com/DanySK/publish-on-central)
* [deepmedia/MavenDeployer](https://github.com/deepmedia/MavenDeployer)
* [GradleUp/nmcp](https://github.com/GradleUp/nmcp)
* [Im-Fran/SonatypeCentralUpload](https://github.com/Im-Fran/SonatypeCentralUpload)
* [Karlatemp/maven-central-publish](https://github.com/Karlatemp/maven-central-publish)
* [kernelflux/maven-central-gradle-plugin](https://github.com/kernelflux/maven-central-gradle-plugin)
* [lalakii/central-portal-plus](https://github.com/lalakii/central-portal-plus)
* [medivh-project/medivh-publisher](https://github.com/medivh-project/medivh-publisher)
* [moengage/gradle-maven-publish-plugin](https://github.com/moengage/gradle-maven-publish-plugin)
* [pkmer/pkmerboot-central-publisher](https://gitee.com/pkmer/pkmerboot-central-publisher)
* [SgtSilvio/gradle-maven-central-publishing](https://github.com/SgtSilvio/gradle-maven-central-publishing)
* [tddworks/central-portal-publisher](https://github.com/tddworks/central-portal-publisher)
* [thebugmc/sonatype-central-portal-publisher](https://gitlab.com/thebugmc/sonatype-central-portal-publisher)
* [vanniktech/gradle-maven-publish-plugin](https://github.com/vanniktech/gradle-maven-publish-plugin/)
* [yananhub/flying-gradle-plugin](https://github.com/yananhub/flying-gradle-plugin)

## 포털 게시자 API를 사용하여 게시하기::publishing-by-using-the-portal-publisher-api

> **대상 사용자**
> 이 문서는 포털 게시 API를 통해 게시하기위해 클라이언트 구현을 고려하는 유저들을 위해 의도 되었다. 자체 구성요소를 Maven Central로 게시하려는
> 경우, [Maven Client](https://central.sonatype.org/publish/publish-portal-maven/)를 사용하는것이 더 좋다.
: { "type": "note", "icon": info" }

이 문서는 웹 클라이언트를 통해 쿼리를 테스트하기 위한 대화형 환경을 제공하는 [OpenAPI 문서](https://central.sonatype.com/api-doc)를 보완한다.
이 문서의 목적상 예제에서 `curl`을 사용하지만, 기본적인 세부사항을 따라하므로써 어떤 HTTP 클라이언트 든지 API와 상호작용 할 수 있다.

### 인증/인가::authentication-authorization

> **사용자 토큰**
> [사용자 토큰을 생성](https://central.sonatype.org/publish/generate-portal-token/)하기
> 위해, [계정 페이지](https://central.sonatype.com/account)에 방문하여 사용자 토큰 생성(Generate User Token) 버튼을 클릭
: { "type": "note", "icon": info" }

API에 대한 요청은 사용자토큰 헤더를 통해 인증 되어야 한다. `example_username`이라는 사용자 이름과 `example_password`라는 사용자 토큰이 주어지면, `:`로 연결된 두개의 값은
base64로 계산된다.

```shell
$ printf "example_username:example_password" | base64
ZXhhbXBsZV91c2VybmFtZTpleGFtcGxlX3Bhc3N3b3Jk
```

인가(`Authentication`) 헤더는 `Bearer <the base64 encoded value>`형식이 된다. (예:
`Bearer ZXhhbXBsZV91c2VybmFtZTpleGFtcGxlX3Bhc3N3b3Jk`).

> **사용자토큰 토큰들**
> API는 같은 base64 인코딩 값으로 비표준 `UserToken`, `Authorization` 헤더도 허용하지만, 표준 `Bearer` 값 사용을 추천하며, 이후 버전의 API는 `UserToken`에 대한
> 지원을 중단될 수 있다.
: { "type": "note", "icon": info" }

### 배포 번들 업로드::uploading-a-deployment-bundle

[올바른 번들](https://central.sonatype.org/publish/publish-portal-upload/)이 생성되었고, 해당 번들이 `POST` 요청으로
`/api/v1/publisher/upload` 엔드 포인트에 업로드 될 수 있다고 가정하자.
엔드 포인트는 `multipart/formdata`의 `bundle`이라는 이름과 정의된 파일명을 가지는 `application/octet-stream` 단일 파트의 `Content-Type`을 예상한다.

```http request::파트별로 Content-Type을 가지는 multipart/formdata
POST /api/v1/publisher/upload HTTP/1.1
Host: central.sonatype.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Length: 1234567

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="bundle"; filename="entity-printer-1.0.12.jar"
Content-Type: application/octet-stream

[JAR 파일의 바이너리 데이터 - 실제로는 수천~수만 바이트]
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

엔드 포인트는 두개의 옵셔널 매개변수를 받는다. 첫째로 `name`, 배포에 대해 육안으로 읽을 수 있는 이름 제공을 허용한다.
둘째로 `publishingType` 다음의 값을 가질수 있다:

* `AUTOMATIC`: 배포는 검증을 통과하며, 통과한다면 자동으로 Maven Central에 게시한다.
* `USER_MANAGED`: (기본) 배포는 검증을 통과하며 Portal UI를 통해 유저에게 수동 게시를 요구한다.

번들을 업로드하는 예시 요청은 아래와 같다:

```shell
$ curl --request POST \
  --verbose \
  --header 'Authorization: Bearer ZXhhbXBsZV91c2VybmFtZTpleGFtcGxlX3Bhc3N3b3Jk' \
  --form bundle=@central-bundle.zip \
  https://central.sonatype.com/api/v1/publisher/upload
```

그리고 이에 대한 응답은 아래와 같다:

```shell
...
* We are completely uploaded and fine
< HTTP/2 201 
< date: Fri, 26 Jan 2024 17:45:29 GMT
< content-type: text/plain;charset=UTF-8
< content-length: 36
< vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers, Accept-Encoding
< 
* Connection #0 to host central.sonatype.com left intact
28570f16-da32-4c14-bd2e-c1acc0782365
```

반환된 값은 배포 ID이며, 배포 정보조회 등의 후속 작업에 필요하다.

#### 배포의 상태 검증하기::verify-status-of-the-deployment

배포 번들이 업로드 되고 해당 배포 ID가 조회된 후, 배포 ID를 포함하는 `id` 쿼리 파라미터를 `/api/v1/publisher/stats`로 `POST` 요청을 통해 배포의 상태를 요청할 수있다.

예시 요청은 다음과 같다:

```shell
$ curl --request POST \
  --verbose \
  --header 'Authorization: Bearer ZXhhbXBsZV91c2VybmFtZTpleGFtcGxlX3Bhca3N3b3JkCg==' \
  'https://central.sonatype.com/api/v1/publisher/status?id=28570f16-da32-4c14-bd2e-c1acc0782365' \
  | jq
```

그리고 응답은 다음과 같다:

```shell
{
  "deploymentId": "28570f16-da32-4c14-bd2e-c1acc0782365",
  "deploymentName": "central-bundle.zip",
  "deploymentState": "PUBLISHED",
  "purls": [
    "pkg:maven/com.sonatype.central.example/example_java_project@0.0.7"
  ]
}
```

`deploymentState` 필드는 다음의 값을 가질 수 있다:

* `PENDING`: 배포가 업로드되었으며 검증서비스로의 처리를 대기중
* `VALIDATING`: 배포가 검증 서비스에서 처리중
* `VALIDATED`: 배포가 검증을 통과 했고 Central Portal UI를 통해 유저가 수동 게시하는것을 대기중
* `PUBLISHING`: 배포가 자동/수동으로 게시되었고 Maven Central에 업로드 되는중
* `PUBLISHED`: 배포가 성공적으로 Maven Central에 업로드됨
* `FAILED`: 배포가 실패 됨(추가적은 내용은 `error` 필드로 보여짐)

#### 배포 게시 또는 제거하기::publish-or-drop-the-deployment

`publishingType`이 `USER_MANAGED`인 배포가 업로드 되고 `deploymentState`가 `VALIDATED`에 이르면,
배포 상태가 `PUBLISHING`으로 바뀌게 하는 POST `/api/v1/publisher/deployment/<deploymentId>`요청을 통해 게시가 가능하고,
거기서부터 PUBLISHED 상태로 진행되며 Maven Central에서 이용 가능하게 된다.

예시 요청:

```shell
$ curl --request POST \
  --verbose \
  --header 'Authorization: Bearer ZXhhbXBsZV91c2VybmFtZTpleGFtcGxlX3Bhc3N3b3Jk' \
  'https://central.sonatype.com/api/v1/publisher/deployment/28570f16-da32-4c14-bd2e-c1acc0782365
```

예시 응답:

```shell
< HTTP/2 204 
< date: Tue, 30 Jan 2024 16:31:14 GMT
< vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers
< 
* Connection #0 to host central.sonatype.com left intact
```

배포 상태가 `VALIDATED` 또는 `FAILED`라면, `DELETE /api/v1/publisher/deployment/<deploymentId>` 요청으로 제거가 가능하다.
이 요청은 의도되 지않은 게시에 대한 배포 히스토리를 지우는데 유용하다.

만약 Sonatype으로 `FAILED` 빌드에 대한 지원을 요청중이라면, 파일을 제거하지 않는것이 좋다.
배포와 관련된 파일들이 가끔씩 그런 요청에대해 유용하기 때문이다.

예시 요청:

```shell
$ curl --request DELETE \
  --verbose \
  --header 'Authorization: Bearer ZXhhbXBsZV91c2VybmFtZTpleGFtcGxlX3Bhc3N3b3Jk' \
  'https://central.sonatype.com/api/v1/publisher/deployment/28570f16-da32-4c14-bd2e-c1acc0782365
```

예시 응답:

```shell
...
< HTTP/2 204 
< date: Tue, 30 Jan 2024 16:31:14 GMT
< vary: Origin, Access-Control-Request-Method, Access-Control-Request-Headers
< 
* Connection #0 to host central.sonatype.com left intact
```

#### 배포 번들을 수동 테스트하기::manually-testing-a-deployment-bundle

번들의 유효성 검증이 완료된 후 선택한 빌드 도구에서 의존성으로 참조될 수 있다.
이 내용의 사용사례는 CI 환경에서 릴리즈를 빌드하고 Central에 배포하기 전에 로컬 환경에서 수동 테스트를 먼저 진행하는 것이다.

이 기능과 관련된 두개의 엔트포인트 `/api/v1/publisher/deployment/<deploymentId>/download/<relativePath>`와
`/api/v1/publisher/deployments/download/<relativePath>`가 있다.
첫 번째는 특정 배포에서 파일들을 참조하는 반면 두번째는 요청된 파일을 포함하는 검증된 배포를 참조한다.

**Gradle**

Gradle의 경우, [저장소 정의 문서](https://docs.gradle.org/current/userguide/declaring_repositories.html)가 이 기능을 위해 빌드를 구성하는 방법을 잘
설명하고 있다.

::code-group

```gradle::build.gradle
repositories {
    maven {
        name = "centralManualTesting"
        url "https://central.sonatype.com/api/v1/publisher/deployments/download/"
        credentials(HttpHeaderCredentials)
        authentication {
            header(HttpHeaderAuthentication)
        }
    }
    mavenCentral()
}
```

```properties::gradle.properties
centralManualTestingAuthHeaderName=Authorization
centralManualTestingAuthHeaderValue=Bearer ZXhhbXBsZV91c2VybmFtZTpleGFtcGxlX3Bhc3N3b3Jk
```

**Maven**

Maven의 경우 `settings.xml` 파일에 필수값 으로 `<server>`와 `<repository>`를 추가하는 구성이 요구된다.
`<server>`는 요청과 함께 사용할 HTTP 헤더를 지정해야하고, `<repository>`는 위에 언급된 URL이 필요하다. 예제 구성은 아래와 같다:

```xml::settings.xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <servers>
    <server>
      <id>central.manual.testing</id>
      <configuration>
        <httpHeaders>
          <property>
            <name>Authorization</name>
            <value>Bearer ZXhhbXBsZV91c2VybmFtZTpleGFtcGxlX3Bhc3N3b3Jk</value>
          </property>
        </httpHeaders>
      </configuration>
    </server>
  </servers>

  <profiles>
    <profile>
      <id>central.manual.testing</id>
      <repositories>
        <repository>
          <id>central.manual.testing</id>
          <name>Central Testing repository</name>
          <url>https://central.sonatype.com/api/v1/publisher/deployments/download</url>
        </repository>
      </repositories>
    </profile>
  </profiles>
</settings>
```

## 업로드 번들로 게시하기::publishing-by-uploading-a-bundle

중앙 게시자 포털에서는 구성 요소와 필수 파일(metadata, checksums, signatures)이 포함된 zip 파일을 업로드 할 수 있다.  
이 압축파일을 조립하는 것은 빌드도구와 프로세스에 따라 달라진다. 업로드용 압축파일 구성에 대한 기본 안내는
기존 [수동 배포 가이드](https://central.sonatype.org/publish/publish-manual/)에서 확인할 수 있다.

두 개 프로세스의 주요 차이점은 새로운 프로세스는 번들이 `.jar`파일일 필요는
없지만, [Maven Repository 레이아웃](https://maven.apache.org/repository/layout.html)폴더 규칙을 따르는 파일을 예상한다.
예를 들어, `com.sonatype.central.example` 네임 스페이스, `example_java_project` 컴포넌트, 그리고 `0.1.0` 버전은 다음의 폴더 구조로 압축 해제될 수도 있다:

```
$ tree
.
`-- com
    `-- sonatype
        `-- central
            `-- example
                `-- example_java_project
                    `-- 0.1.0
                        |-- example_java_project-0.1.0-javadoc.jar
                        |-- example_java_project-0.1.0-javadoc.jar.asc
                        |-- example_java_project-0.1.0-javadoc.jar.md5
                        |-- example_java_project-0.1.0-javadoc.jar.sha1
                        |-- example_java_project-0.1.0-sources.jar
                        |-- example_java_project-0.1.0-sources.jar.asc
                        |-- example_java_project-0.1.0-sources.jar.md5
                        |-- example_java_project-0.1.0-sources.jar.sha1
                        |-- example_java_project-0.1.0.jar
                        |-- example_java_project-0.1.0.jar.asc
                        |-- example_java_project-0.1.0.jar.md5
                        |-- example_java_project-0.1.0.jar.sha1
                        |-- example_java_project-0.1.0.pom
                        |-- example_java_project-0.1.0.pom.asc
                        |-- example_java_project-0.1.0.pom.md5
                        `-- example_java_project-0.1.0.pom.sha1
```

> **중요**
> 현재 중앙 게시자 포탈은 공통 아카이브 확장(예: zip, tar.gz)을 지원한다. 게시하는 요청당 한번 압축파일 한개를 업로드 할 수 있으며, 아카이브는 한개 이상의 컴포넌트를 포함할 수 있다.
> 아카이브는 1GB까지 업로드 가능하다. 업로드가 오류로 실패하거나 배포가 생성되지 않는 경우 먼저 파일의 크기가 1GB 미만인지 확인하고 로컬아카이브 추출 도구로 제대로 추출되는지 확인 해야한다.
> 아카이브가 유효하고 사이즈 제한에 딱 맞지만, 업로드가 되지않는 다면 [중앙 지원](mailto:central-support@sonatype.com)으로 이메일 요청하면 많은 지원 정보를 제공받는다.
: { "type": "note", "icon": info" }

최소 한개이상의 인증된 네임스페이스를 갖고 있는경우, Namespace 탭에서 "컴포넌트 게시(Publish Compoent)" 버튼을 누를 수있다.

![Publish Component in Namespace](/post/back-end/publishing-via-the-central-portal/verifiednamespace.png)
:{ "align": "center", "description": "Namespace 탭"}

또한 우측상단의 "Publish" 링크 또는 "Publish Settings" 하위 "Deployments" 탭에서 할 수도 있다.

![Publish Component in Deployments](/post/back-end/publishing-via-the-central-portal/publishsettings_deployments)
:{ "align": "center", "description": "Deployments 탭"}

여기서 "컴포넌트 게시(Publish Component)" 버튼을 누를 수 있다:

![Publish Component Popup](/post/back-end/publishing-via-the-central-portal/publishcomponent1.png)
:{ "align": "center", "description": "Publish Component 팝업"}

입력한 "배포 이름(Deployment Component)"은 게시하기 위해 시도하는 것이 무엇인지 식별하는데 도움이 된다(예를 들어 Maven Central에 게시하는 경우 좌표를 추가할 수 있다. 예: "
your.groupId:your.artifactId:0.0.your-version").
더 길고 선택적인 "설명"을 제공할 수도 있다.

Popup에서 스크롤을 내리면 업로드 파일(Uplaod File)버튼을 찾을 수 있다:

!["Upload File"  Button](/post/back-end/publishing-via-the-central-portal/publishcomponent2.png)
:{ "align": "center", "description": "업로드 파일 버튼"}

이 버튼을 누르면 로컬 컴퓨터의 파일을 선택할 수 있고, "컴포넌트 게시(Publish Component)"을 누르면 업로드를 시작한다.