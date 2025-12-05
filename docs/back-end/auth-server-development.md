---
layout: post
title: 나에겐 조금 어려웠던 인증서버 개발 회고
tags: [ Cryptographic, Token Store, Authentication Server ]
date: 2025-11-25 20:14:00
thumbnail: /post/back-end/auth-server-development/index.png
current-company: NEOWIZ
current-position: Software Engineer
summary: 우당탕탕 인증서버 개발기
excerpt_separator: <!--more-->
hide: true
---

인증서버 뭐 그냥 인증만 하면 되는거아니야? 아니였다.
<!--more-->

## 서론::intro

최근 발생한 SKT, KT, 롯데카드 등에서 해킹사고가 주로 발생하였고, 우리도 보안 점검이 필요했다.
기존 인증서버는 키를 업로드 해두고 파일을 읽어서, 사용하는 방식으로 사용했었다. 사실 이 구조는 키교체가 상다히 까다로운 방식이었다.

키가 교체 되더라도 문제가 발생하면 롤백이 어려운 구조라서, 조금 더 **새로운** 인증서버가 필요했다.

요구 사항을 종합해 보면 다음과 같다.

1. 자유로운 키 교체
2. 스케일 아웃에도 보장 되는 키페어의 멱등성
3. 배포 없이 이루어지는 키교체
4. 토큰 별 알고리즘 및 만료기한 설정을 무중단 배포로 적용
5. 잘못 된 키페어가 등록된 경우 서버에서 키생성을 제한 하도록 설계

생각 보다 고려할게 많은 스펙이였고, 기존 구조로는 개선이 불가능 했기에 새로 만들기로 했다.
이전에는 키교체를 한다고 하면 점검을 걸고 키교체 후 테스트를 하고 서비스를 열었었다.
게다가 키교체는 모든 서비스에 영향을 주는 작업이라, 굉장히 보수적으로 관리를 할 수 밖에없었다.

이를 해결하기 위해 위 요건을 충족하는 인증서버(토큰 스토어)를 신규로 서비스 해야했다.

## 기본적인 흐름::basic-flow

기존의 서비스는 앱에 올라간 개인키로 토큰을 서명하고, 이를 제공하는 방식이였다.

![기존의 인증 흐름]()

이 과정에서 기본적인 처리 방식은 다음과 같다:

1. [인증서버] 읽어 드린 비대칭 키페어 개인키 PEM을 파싱하여 PrivateKey 객체를 생성
2. [인증서버] JWT 라이브러리로 토큰을 생성 (`com.auth0.jwt` 라이브러리)
3. [인증서버] `1번`에서 생성한 개인키 정보로 토큰에 서명
4. [기타 애플리케이션] 토큰을 사용하는 애플리케이션(이하 `서비스 API`)에서 앱시작시 공개키정보를 설정하고 전달받은 토큰을 검증

키서명에 대해서는 일반적으로 비대칭키 키페어를 생성하여 서명시 개인키, 검증시 공개키를 사용한다.
이 경우 공개키가 바뀌어야 되는 경우 사본을 서비스마다 읽을수 있도록 복제해서 올려 놓으며 이는 관리 포인트의 증가로 일어났다.

아직 토큰기반 인증을 사용하는 서버가 많지 않지만, 점차 이전 할 수록 공개키 사본을 추가 해줘야 한다.

## JWKS란?::what-is-jwks

**J**SON **W**eb **K**ey **S**et는 [`RFC 7517 (JSON Web Key)`](https://datatracker.ietf.org/doc/rfc7517/)에 정의된 표준 포맷이며,
`JWK`의 목록을 표현하는데 사용된다.

`JWK`의 주요 필드는 아래와 같다.

**공통 필드**

| 필드      | 이름             | 설명      | 예시                        |
|---------|----------------|---------|---------------------------|
| kty     | Key Type       | 키타입(필수) | `"RSA"`, `"EC"`, `"oct"`  |
| use     | Public Key Use | 용도      | `"sig"`: 서명, `"enc"`: 암호화 |
| key_ops | Key Operations | 가능한 작업  | `["sign", "verify"]`      |
| alg     | Algorithm      | 알고리즘    | `"RS256"`, `"ES256"`      |
| kid     | Key ID         | 키 식별자   | `"my-key-2025"`           |

:{ "align": "center", "max-with": "500px", "description": "JWK 공통 필드" }

**RSA 전용 필드 (`"kty": "RSA"`)**

| 필드 | 이름                  | 설명       | 공개 여부 |
|----|---------------------|----------|-------|
| n  | Modules             | RSA 모듈러스 | 공개    |
| e  | Exponent            | RSA 지수   | 공개    |
| d  | Private Exponent    | 개인키 지수   | 비밀    |
| p  | First Prime Factor  | 소인수 p    | 비밀    |
| q  | Second Prime Factor | 소인수 q    | 비밀    |

:{ "align": "center", "max-with": "400px", "description": "EC 전용 필드" }

**EC (타원곡선) 전용 필드 (`"key": "EC"`)**

| 필드  | 이름           | 설명    | 공개 여부 |
|-----|--------------|-------|-------|
| crv | Curve        | 곡선 타입 | 공개    |
| x   | X Coordinate | X 좌표  | 공개    |
| y   | Y Coordinate | Y 좌표  | 공개    |
| d   | Private Key  | 개인키   | 비밀    |

:{ "align": "center", "max-with": "400px", "description": "EC 전용 필드" }

위 필드를 보고 짚고 넘어가야하는 것은, `JWK` 자체는 키를 JSON으로 표현하는 **범용 포맷**이다. 따라서 공개키든 개인키든 모두 표현이 가능하다는 것이다.
즉, `JWKS`는 **공개키만 배포**하기 위한 용도이며, 이를 `JWK` 형식을 사용하는것이다.

> 만약 내부망에서만 개인키를 필요로 하는 경우 비밀정보를 포함하여 제공하면 된다.
:{ "type": "important", "icon": "warning-octagon" }

### JWKS의 구조::structure-of-jwks

```json::JWKS의 구조
{
  "keys": [
    {
      "kty": "RSA",
      "use": "sig",
      "kid": "2025-11-12-rsa",
      "alg": "RS256",
      "n": "0vx7agoebGcQSuu...",
      "e": "AQAB"
    },
    {
      "kty": "RSA", 
      "use": "enc",
      "kid": "2025-11-12-enc",
      "alg": "RSA-OAEP",
      "n": "xjlCRBqkOL6xKZhm91M1AIdpFxgeoLu03hdU...",
      "e": "AQAB"
    },
    {
      "kty": "EC",
      "use": "sig",
      "kid": "2025-11-12-ec",
      "crv": "P-256",
      "alg": "ES256",
      "x": "WKn-ZIGevcwGIyyrzFoZNBdaq9_TsqzGl96oc0CWuis",
      "y": "y77t-RvAHRKTsSGdIYUfweuOvwrvDD-Q3Hv5J0fSKbE"
    }
  ]
}
```

위와 같이 각 `JWK`들은 제공하는 키의 정보를 포함하여, 이를 사용하는 클라이언트에서 모두 규격을 맞출수 있도록 더나은 호환성을 제공한다.
위 `JWK`의 정보만으로 이 키가 검증,암호화 용도인지 명시적으로 알 수있고, `kid`로 키의 고유성을 판단할 수 있다.

새로운 키는 추가하면 되기 때문에, 해당 키를 추가하고 이를 이용해 암호화 한다면 클라이언트에서 검증시에도 무중단 배포에 적합하다.

## 애플리케이션 구현::implement-into-application

대략적인 `JWKS` 엔드포인트 구성 흐름은 다음과 같다:

1. `Secrets Manager`에서 보안 암호 조회
2. 보안 암호를 이용해, 키 데이터 추출
3. `JWK` 객체로 변환
3. 클라이언트에게 제공

### 1. 보안암호 조회::lookup-credentials

```json::Sig보안 암호
{
    "keys": {
        "2024-11-12-rsa": {
            "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADA...",
            "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgk...",
            "metadata": {
                "use": "sig",
                "alg": "RS256",
            }
        }
    }
    ...
}
```

주의 할점, Secrets Manager의 값이 잘못된 값으로 바뀐다면 결과적으로 서명 단계에서 오류가 발생하므로 키조회시 검증한다.
문제: 1. 배포없이 키 로테이션, 2. 키형식이 잘못된 경우 바로 배포시 문제 발생, 휴먼에러 발생가능 따라서 키를 파싱하는 과정에서 검열

공개키 형식

| 형식                                  | PEM 헤더                 | 지원 알고리즘                      | Java 지원              | 구조            |
|-------------------------------------|------------------------|------------------------------|----------------------|---------------|
| SubjectPublicKeyInfo<br/>(X.509 형식) | `BEGIN PUBLIC KEY`     | RSA, ECDSA, EdDSA 등<br/>(범용) | `X509EncodedKeySpec` | 알고리즘 정보 + 공개키 |
| PKCS#1                              | `BEGIN RSA PUBLIC KEY` | RSA                          | 변환 불필요               | RSA 공개키       |
| SEC1                                | `BEGIN EC PUBLIC KEY`  | EC                           | 변환 불필요               | EC 공개키        |

개인키 형식

| 형식               | PEM 헤더                        | 지원 알고리즘                | Java 지원               | 구조            |
|------------------|-------------------------------|------------------------|-----------------------|---------------|
| PKCS#8           | `BEGIN PRIVATE KEY`           | RSA, EC, DSA 등<br>(범용) | `PKCS8EncodedKeySpec` | 알고리즘 정보 + 개인키 |
| EKCS#1           | `BEGIN RSA PRIVATE KEY`       | RSA                    | 변환 불필요                | RSA 개인키       |
| SEC1             | `BEGIN EC PRIVATE KEY`        | EC                     | 변환 불필요                | EC 개인키        | 
| PKCS#8 Encrypted | `BEGIN ENCRYPTED PRIVATE KEY` | 범용                     | 패스워드 필요               | 암호화된 개인키      |

**글은 인증서버 개발후기 라는 방향으로 작성하는게 좋아보임, JWKS는 부수적인 내용이고, JWKS든, 암호화 알고리즘 라이브러리 및 JWT라이브러리를 왜 선택했는지가 중요**

**Java 내부에서 지원하는 서명 알고리즘은 여러가지가 있다.**

**어떠한 JWT 라이브러리라도 서명시 알고리즘이 필요하다.**

1. `com.auth0:jwt`: Algorithm.RSA256(...), 직접 지정
2. `io.jsonwebtoken:jjwt`: signWith(privateKey), 키타입에서 자동 추론
3. `nimbus JOSE`: JWSAlgorithm.RS256, 직접 지정

알고리즘 지정에 대한 부분은 라이브러리에 책임을 맡긴다. (어플리케이션에서 관여 X)

고려사항

1. 알고리즘 선택 우선순위 정책을 구성해야할까?
2. access, refresh token의 만료시간은 알고리즘별로 달라야할까? (**만료시간은 보안 정책의 문제, 관리 복잡도 상승**)
3. `com.auth0`을 사용하는 경우 KeyPair 정보 만으로 Algorithm을 미리 생성해 두는게 좋을까? (**사실 기능적으로 같다면 어떤 라이브러리라도 상관없지만, 최대한 유연하게 쓸 수 있는
   라이브러리를 선택하는 것이 중요하다.**)
4. 서명에서 검증까지 어떠한 기능단위로 나누는게 좋을까?
    1. 서명 알고리즘 선택 (select)
    2. JWT 생성
    3. 레이어 구조는 다음과같이 하는걸 추천
        1. 도메인 레이어: KeyPairInfo (키페어에 대한 자체 정보)
        2. 인프라스트럭쳐 레이어:
            1. KeyPairManage (키페어 관리를 담당, 목록, 활성화 키페어 조회?)
            2. JWtAlgorithmCache (`com.auth0`을 사용한다면 매번 알고리즘을 생성해야하므로 캐시를 위해)
            3. JWTTokenProvider (실제 토큰을 생성: 키페어 조회, 알고리즘 조회)

구현 흐름

1. 토큰 생성 요청 (GenerateTokenPort): 토큰 생성을 위한 Port이므로 access 및 refresh 토큰에 대한 expire를 알 책임이 있음
    1. 키페어 조회 (SelectKeyPairPort): 조회시 알고리즘 정보를 넘기고, 이에 대해 미리 앱 실행시 SecretsManager에서 조회 후 존재하는 알고리즘 인지 검증
    2. 실제 라이브러리를 래핑하는 Port로 토큰 생성 요청(SignTokenPort): 키페어 및 토큰에 담을 정보 전달
        1. `com.auth0:jwt`, `io.jsonwebtoken::jjwt` 라이브러리를 통해 토큰 생성 (라이브러리 래퍼별로 )

위 구조에서 각각 라이브러리를 래핑하는 객체는 미리 Bean으로 만들어놓고 런타임에는 어떤식으로 주입하는게 좋을지 고민

GenerateTokenPort에서 SelectTokenPort로 select 요청을 보낼 때 알고리즘을 선택하는게 맞을까?
그렇다면 GenerateTokenPort가 알고리즘을 선택할 책임을 갖는건데, 이는 SRP를 위반하는게 아닐까?

만약 프로퍼티로 받아서, 애플리케이션 로드시 런타임에 해당 알고리즘이 SecretManager에 등록되어있는지를 확인하면 더좋지 않을까?

비대칭키 알고리즘 준비는 대략적으로 아래 스펙으로 3가지 정도
RSA
ECDSA Elliptic Curve Digital Signature Algorithm
EdDSA Edwards Curve Digital Signature Algorithm

`io.jsonwebtoken:jjwt`는 아래처럼 자체적으로 내부에서 지원하는 알고리즘을 가지고 compact 메서드에서 검증한다

```java
public StandardSecureDigestAlgorithms() {
    super(NAME, Collections.of(
        NoneSignatureAlgorithm.INSTANCE,
        DefaultMacAlgorithm.HS256,
        DefaultMacAlgorithm.HS384,
        DefaultMacAlgorithm.HS512,
        RsaSignatureAlgorithm.RS256,
        RsaSignatureAlgorithm.RS384,
        RsaSignatureAlgorithm.RS512,
        RsaSignatureAlgorithm.PS256,
        RsaSignatureAlgorithm.PS384,
        RsaSignatureAlgorithm.PS512,
        EcSignatureAlgorithm.ES256,
        EcSignatureAlgorithm.ES384,
        EcSignatureAlgorithm.ES512,
        EdSignatureAlgorithm.INSTANCE
    ));
}
```

src/main/kotlin/com/example/auth
├── domain
│ └── model
│ ├── keypair
│ │ ├── KeyPairSecrets.kt
│ │ ├── KeyPairInfo.kt
│ │ └── KeyMetadata.kt
│ └── jwk
│ ├── JsonWebKey.kt
│ ├── JsonWebKeySet.kt
│ └── ParsedKeyPair.kt
│
├── application
│ ├── port
│ │ └── output
│ │ └── LoadSecretsPort.kt
│ └── service
│ ├── JwksService.kt
│ └── KeyPairSecretsDeserializer.kt
│
└── adapter
├── input
│ └── web
│ ├── JwksController.kt
│ ├── JwksResponse.kt
│ └── JwksResponseMapper.kt
└── output
├── secrets
│ └── AwsSecretsManagerAdapter.kt
└── crypto
└── PemKeyParser.kt