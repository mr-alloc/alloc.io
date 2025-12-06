---
layout: post
title: 나에겐 조금 어려웠던 인증서버 개발 회고
tags: [ Cryptographic, Token Store, Authentication Server ]
date: 2025-10-12 20:14:00
thumbnail: /post/back-end/auth-server-development/index.png
profile-image: /post/profile/worker-kkom.png
current-company: NEOWIZ
current-position: Software Engineer
summary: 우당탕탕 인증서버 개발기
excerpt_separator: <!--more-->
hide: false
---
인증서버 좀 만들어주세요.
키는 한 곳에서 관리했으면 좋겠고, 키가 교체되더라도 배포 없이 진행했으면 좋겠어요.
그리고 교체할 키를 등록할 때 잘못 된 거면 안쓰게 해주세요.
토큰별로 사용하는 알고리즘이나 만료기한이 바뀌어도 무중단 배포로 진행해야해요.
<!--more-->

## 서론::intro

최근 발생한 SKT, KT, 롯데카드 등에서 해킹사고가 주로 발생하였고, 우리도 보안 점검이 필요했다.
기존 인증서버는 키를 업로드 해두고 파일을 읽어서, 서명하는 방식으로 사용했었다. 사실 이 구조는 키교체가 상다히 까다로운 방식이었다.

키가 교체 되더라도 문제가 발생하면 롤백이 어려운 구조라서, 조금 더 **새로운** 인증서버가 필요했다.

운영을 하면서 불편했던 점과, 앞으로 어떤 방향으로 가야할지에 대해 논의한 결과, 요구 사항을 종합해 보면 다음과 같다:

1. 자유로운 키 교체
2. 스케일 아웃에도 보장 되는 키페어의 멱등성
3. 토큰 별 알고리즘 및 만료기한 설정을 무중단 배포로 적용
4. 잘못 된 키페어가 등록된 경우 서버에서 키생성을 제한 하도록 설계

생각 보다 고려할게 많은 스펙이였고, 기존 구조로는 개선이 불가능 했기에 새로 만들기로 했다.
이전에는 키교체를 한다고 하면 점검을 걸고 키교체 후 테스트를 하고 서비스를 열었었다.
게다가 키교체는 모든 서비스에 영향을 주는 작업이라, 굉장히 보수적으로 관리를 할 수 밖에없었다.

이를 해결하기 위해 위 요건을 충족하는 인증서버(토큰 스토어)를 신규로 서비스 해야했다.

## 기본적인 흐름::basic-flow

기존의 서비스는 앱에 올라간 개인키로 토큰을 서명하고, 이를 제공하는 방식이였다.

![기존의 인증 흐름](/post/back-end/auth-server-development/existing-verification-flow.png)
:{ "align": "center", "max-with": "500px", "description": "기존의 서비스 인증 방식" }

이 과정에서 기본적인 처리 방식은 다음과 같다:

1. [인증서버] 읽어 드린 비대칭 키페어 개인키 PEM을 파싱하여 PrivateKey 객체를 생성
2. [인증서버] JWT 라이브러리로 토큰을 생성 (`com.auth0.jwt` 라이브러리)
3. [인증서버] `1번`에서 생성한 개인키 정보로 토큰에 서명
4. [기타 애플리케이션] 토큰을 사용하는 애플리케이션(이하 `서비스 API`)에서 앱시작시 공개키정보를 설정하고 전달받은 토큰을 검증

키서명에 대해서는 일반적으로 비대칭키 키페어를 생성하여 **서명 시** 개인키, **검증 시** 공개키를 사용한다.
이 경우 공개키가 바뀌어야 되는 경우 사본을 서비스마다 읽을수 있도록 복제해서 올려 놓으며 이는 관리 포인트의 증가로 일어났다.

키가 추가 될 때마다 `서비스 API`에서 읽을 수 있도록 공개키 사본을 추가 해줘야 한다.

## 요구 사항 되짚어 보기::remind-requirements

### 1. 자유로운 키교체::seamless-key-rotation

이전에는 서비스를 위해 사용하는 키 교체는 수 많은 비용(서비스 중단, 인력 대기 등)이 들어가기 때문에 쉽게 진행할 수 없었다.
담당 부서에서 "이번달 점검일에 키 교체 진행" 한다는 공지가 오면 개발팀은 오픈 후 서비스 장애가 발생하는 꿈을 꾸며, 점검 당일까지 밤잠을 설치고,
점검 당일에는 모두가 긴장하고 꼭두 새벽에 일어나 출근한다.

새벽 4시에 출근하여 모든 서비스를 내리고, 서버에 등록된 PEM 파일을 교체한다. 
물론 점검 전날까지 여러 개발환경에서 테스트 했기 때문에 문제가 발생할 여지는 적지만, 발생하면 서비스 전체에 영향이 가기 때문에, 긴장할수 밖에 없다.

인증서버에서 바라보는 개인키 PEM을 새롭게 변경하고, 각 서버에서 바라보는 같은 키페어의 공개키 역시 새로운 PEM으로 교체한다.
모든 서버를 시작하고, 오픈전까지 여러 서비스를 테스트한다.

>만약 여기서 키검증이 제대로 되지 않거나, 문제가 발생한다면 위 과정을 다시 반복해야한다. 이 경우 라이브 환경에서 진행되는 모든 QA는 대기 해야한다.
: { "icon": "warning-diamond", "type": "caution" }

키교체는 필수적인 요소이므로, 이 요구사항은 매우 필요했다.

### 2. 스케일 아웃에도 보장 되는 키페어의 멱등성::idemptency-of-key-pairs

기존에는 개인키에 대해 한개밖에 설정할 수 없었기 때문에, 고려 대상이 아니였다.
하지만 만약 새로운 키가 등록되면, 스케일 아웃된 인증서버들은 새로운 키정보를 알아야 처리할 수 있다.

예를 들어, 개인키 `[A]` 가 등록되어 있다면 이때까지 동작 중인 인증서버들은 아래 처럼 참조하고 있을것이다.
```
인증서버 1: [A]
인증서버 2: [A]
```
그리고 만약 이 시점에 개인키 `B`가 추가되어 두 개의 `[A, B]` 개인키가 등록되어있는 상황이라면 새로운 `인증서버 3`가 실행되면 아래와 같이 된다.
```
인증서버 1: [A]
인증서버 2: [A]
인증서버 3: [A, B]
```
이 경우 `인증서버 3`로 연결 될때가 아니라면, `B`라는 개인키로 서명시 다른 `서비스 API`에서는 서명을 검증하지 못할 뿐더러, 다른 인증서버들은 새로운 개인키에 대해 알 수 조차 없다.
따라서 새로운 키가 추가 되어도 스케일 아웃일 될 때 키페어에 대해 멱등성을 보장하기 위해 필요한 내용이므로 포함시켰다.

### 3. 토큰 별 알고리즘 및 만료기한 설정을 무중단 배포로 적용::zero-downtime-deployment

키 교체는 두 가지 관점으로 나뉠수 있다. 첫번째는 키를 실제로 등록하는 과정, 두번째는 실제로 그 키를 사용하는 과정이다.
여기서 말하는 키교체는 첫번째를 의미한다. 키 변경시 라이브에서도 테스트 할 수 있도록, 키가 등록되어 있어도 사용하지 않는 시스템이 필요했다.

분명히 필요한 단계이므로 포함시켰다.

### 4. 잘못 된 키페어는 미사용::not-use-invalid-key-pair

만약 정상적인 키페어가 등록되었더라도, `JWT` 라이브러리에서 해당 알고리즘을 지원 안한다거나, 우리쪽(라이브러리 래퍼)에서도 대응 되지 않는 알고리즘이라면 어떻게 사용할까?
이 문제는 런타임에 발생하기 때문에, 사용하지 않게 하려면 강제로 오류를 발생시켜 서비스가 확장되지 않도록 하는 제어장치가 필요했기 때문에 포함 시켰다.


## 종합적인 요구사항 적용::apply-requirements

![새로운 인증 흐름](/post/back-end/auth-server-development/newer-verification-flow.png)
:{ "align": "center", "max-width": "500px", "description": "새로운 인증 방식" }

사실 **인증방법**에 대한 것은 바뀌지 않았다. 다만 기존에 다운타임이 발생하거나, 문제에 대응 할수 있는 좀 더 유연한 서비스로서 개선이 된 것이다.
인증서버는 여전히 개인키 정보로 서명하며, 서비스는 여전히 공개키의 정보로 검증한다.

### 키페어를 이용한 서명::signature-using-key-pairs

키페어를 저장할 수 있는 곳은 매우 많았다, 하지만 데이터 특성상 파일로 남기거나, 환경 변수에 저장하거나,
DB에 보관하는것은 위험한 결과를 만들 수 있기 때문에, 이미 검증된 `AWS Secrets Manager`를 사용했다.

![키페어가 가공되어 선택되기까지의 흐름](/post/back-end/auth-server-development/key-pair-data-flow.png)
:{ "align": "center", "max-with": "600px", "description": "키페어가 가공되어, 선택되기까지의 흐름" }

1차적으로 원본 데이터를 `Secrets Manager`에서 가져와서 내부적으로 쓸수 있는 규격으로 가공하며, 이 과정에서 생성된 키페어는 캐시한다.
그리고 가공된 키페어를 조회하여, 사용할 수 있는 알고리즘 별로 추려서 내부적으로 정한 우선순위에 따라 키페어를 캐시한다.

외부에서는 요청하는 알고리즘에 해당하는 키페어 정보를 받아 사용할 수 있다. 간략하게 코드를 보면 다음과 같다.

::code-group
```kotlin::원본 데이터 가공
@Cacheable("...")
override fun loadParsedKeyPairs(): List<ParsedKeyPair> {
    //시크릿 매니저에서 키 목록 조회
    val secretJson = loadSecretsPort.loadSecret("")

    val keyPairSecrets = try {
        objectMapper.readValue(secretJson, KeyPairSecrets::class.java)
    } catch (e: Exception) {
        throw InvalidSecretFormatException("Failed to parse key pair secrets", e)
    }

    return keyPairSecrets.keys.map {
        parseKeyPair(it.key, it.value)
    }
}
```
```kotlin::키페어 선택
@Cacheable("...")
override fun selectSignatureKeyPairByAlgorithm(algorithm: String): ParsedKeyPair {
    val keyPairs = loadParsedKeyPairPort.loadParsedKeyPairs()
    //적절한 우선 순위로 알고리즘에 해당하는 키페어 선택
    return keyPairs.sortedByDescending { it.keyId }
        .firstOrNull { it.metadata.alg == algorithm && it.metadata.use == "sig" }
        ?: throw KeyPairNotfoundException("Key pair does not exist with algorithm: $algorithm")
}
```
```kotlin::외부에서 사용
override fun generateAccessToken(accountId: String, issuedAt: Instant): String {
    ...
    val parsedKeyPair = selectKeyPairPort.selectSignatureKeyPairByAlgorithm(accessTokenInfo.algorithm)
    val claims = JwtClaims(parsedKeyPair.keyId, accountId, issuedAt, accessTokenInfo.expireSeconds)
    return jwtAdapter.sign(claims, parsedKeyPair)
}
```
::

정말 만약에 스케일 아웃이 되서 새롭게 선택된 키페어가 기존과 다를 경우, 
이를 대비하기 위해 검증할 수 있는 공개키의 정보는 [JWKS](https://datatracker.ietf.org/doc/rfc7517/) 스펙으로 제공한다.

>키페어의 변경에 대해서는 캐시를 모두 날려주는게 다중 인스턴스 환경에서 멱등성을 보장할 수 있다.
:{ "type": "tip", "icon": "lightbulb" }

### 키페어를 이용한 검증::verification-using-key-pairs

클라이언트로 부터 토큰을 전달 받은 `서비스 API`는 인증서버에서 제공하는 `JWKS`스펙에서 공개키를 선택해, 서명을 검증한다.
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

#### JWKS의 구조::structure-of-jwks

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

### 토큰 알고리즘, 만료시간 적용::apply-expiry-and-algorithm

기존의 토큰 알고리즘 및 만료시간은 코드에서 직접 지정하였다. 이를 무중단 배포와 함께 해결하기 위해.
설정으로 관리하여 코드 수정없이 재배포 만으로 적용할수있게 하였다.

```yaml::발행 토큰 관련설정
token:
  provider: jjwt
  access:
    algorithm: RS256
    # 1시간
    expire-seconds: 3600
  refresh:
    algorithm: Ed25519
    # 7일
    expire-seconds: 604800
```

인증 서버에서는 어떤 키를 사용하는지는 중요하지 않다. 어떤 알고리즘으로 얼마만큼의 만료시간을 주면 되는지에 대한 비즈니스 니즈가 있을 뿐이다.
또한 올라가있는 JWT 라이브러리가 특정 알고리즘 서명을 지원하지 않을수도 있을 수도 있기 때문에, 라이브러리 종속 코드를 지양하는 방향을 선택했다.

::code-group
```kotlin::동적 라이브러리 지정
@Bean
fun jwtAdapter(
    tokenProperties: TokenProperties,
    loadParsedKeyPairPort: LoadParsedKeyPairPort
): JwtAdapter {
    val adapter = when (tokenProperties.provider.lowercase()) {
        "auth0" -> Auth0JwtAdapter()
        "jjwt" -> JjwtAdapter()
        else -> throw IllegalArgumentException("Unknown JWT token provider: ${tokenProperties.provider.lowercase()}")
    }
    val keyPairs = loadParsedKeyPairPort.loadParsedKeyPairs()
    val passedKeys = keyPairs.filter { adapter.checkKeyPair(it) }
        .joinToString(", ") { it -> "\"${it.keyId}\"" }

    log.info { "[JWT Provider: ${tokenProperties.provider}] Successfully load key with id list: [$passedKeys]" }
    return adapter
}
```
```kotlin::외부에서의 어댑터 사용
@Component
class TokenManageAdapter(
    private val tokenProperties: TokenProperties,
    private val selectKeyPairPort: SelectKeyPairPort,
    private val jwtAdapter: JwtAdapter
) : GenerateTokenPort, VerifyTokenPort {

    override fun generateAccessToken(accountId: String, issuedAt: Instant): String {
        val accessTokenInfo = tokenProperties.access
        val parsedKeyPair = selectKeyPairPort.selectSignatureKeyPairByAlgorithm(accessTokenInfo.algorithm)
        val claims = JwtClaims(parsedKeyPair.keyId, accountId, issuedAt, accessTokenInfo.expireSeconds)
        return jwtAdapter.sign(claims, parsedKeyPair)
    }

    override fun generateRefreshToken(accountId: String, issuedAt: Instant): String {
        val refreshTokenInfo = tokenProperties.refresh
        val parsedKeyPair = selectKeyPairPort.selectSignatureKeyPairByAlgorithm(refreshTokenInfo.algorithm)
        val claims = JwtClaims(parsedKeyPair.keyId, accountId, issuedAt, refreshTokenInfo.expireSeconds)
        return jwtAdapter.sign(claims, parsedKeyPair)
    }

    override fun verify(token: String): TokenPayload {
        return jwtAdapter.verify(token)
    }

}
```
::

이 부분에서 요구사항 중 하나인 **"잘못 된 키페어는 서버에서 미사용"** 어댑터를 생성할 때, 
현재 적용된 라이브러리에서 사용할 수 없는 알고리즘(`adapter.checkKeyPair(it)`)이라면 애플리케이션을 종료하도록(인스턴스가 올라오지 못하도록) 만들었다.

트래픽이 갑자기 상승하거나 많을때는 키페어를 교체하지 않을 뿐더러, 어차피 교체시 문제가 발생해도 즉각 대응이 가능하므로 위와 같은 구조가 가능하다.

**여기서 중요한점**

라이브러리 어댑터에서는 지원되는 알고리즘만 별도로 정의해서 사용하도록 아래와같이 방어코드가 있다:

::code-group
```kotlin::com.auth0:jwt 라이브러리 어댑터
class Auth0JwtAdapter : JwtAdapter {

    private val algorithmCache = ConcurrentHashMap<String, Algorithm>()

    override fun checkKeyPair(parsedKeyPair: ParsedKeyPair): Boolean {
        algorithmCache.computeIfAbsent(parsedKeyPair.keyId) {
            AlgorithmFactory.create(parsedKeyPair)
        }
        return true
    }
    private object AlgorithmFactory {
        fun create(parsedKeyPair: ParsedKeyPair): Algorithm {
            val algorithm = parsedKeyPair.metadata.alg
            return when {
                ...
                algorithm.startsWith("ES") ->
                    createEC(
                        algorithm,
                        parsedKeyPair.publicKey as ECPublicKey,
                        parsedKeyPair.privateKey as ECPrivateKey
                    )
                else ->
                    throw IllegalArgumentException("Unsupported algorithm: ${algorithm}")
            }
        }

        private fun createEC(alg: String, publicKey: ECPublicKey, privateKey: ECPrivateKey): Algorithm {
            return when (alg) {
                "ES256" -> Algorithm.ECDSA256(publicKey, privateKey)
                "ES384" -> Algorithm.ECDSA384(publicKey, privateKey)
                "ES512" -> Algorithm.ECDSA512(publicKey, privateKey)
                else -> throw IllegalArgumentException("Unsupported EC algorithm: $alg")
            }
        }
    }
}
```
::

## 로직 검증을 위한 테스트 방향::testing-direction-for-inspection

`Secrets Manager`에서 조회한 키페어들은 실제로 가공이 가능한지 확인이 필요하다.
PEM 키 파싱은 `Bouncy Castle`을, JWT 생성은 `io.jsonwebtoken:jjwt`, `com.auth0:jwt`를 사용했다

::image-group

![공개키 파싱 테스트](/post/back-end/auth-server-development/public-key-test.png)

![개인키 파싱 테스트](/post/back-end/auth-server-development/private-key-test.png)

::

아무리 검증 된 라이브러리 일지라도, 래핑을 하려면 우리가 사용할 범위를 알아야한다. 
이를 간단히 테스트 하기위해 여러방법을 시도했지만, 좀 더 확실하게 하기위해 무식한 방법이지만 사용할 수 있는 모든 경우의 수를 작성하였다.

```kotlin::키페어를 직접 생성하여 테스트
context("EdDSA 개인키를 파싱한다") {
    it("[PKCS#8] Ed25519 개인키를 정상적으로 파싱한다(BEGIN PRIVATE KEY)") {
        val keyPair = KeyPairGenerator.getInstance("Ed25519")
            .generateKeyPair()

        val pem = toPrivatePem(keyPair.private)
        val privateKey = parser.parsePrivateKey(pem)

        privateKey shouldNotBe null
        privateKey.algorithm shouldBe "EdDSA"
    }
}
```

```kotlin::JWT 라이브러리 테스트
test("[$algorithm] 공개키 검증이 정상적으로 진행된다") {
    val keyId = "2024-12-31-rsa"
    val jwtClaims = JwtClaims(
        keyId,
        "01KBH3G1XFHXPXZVYE5A0GAP5D",
        TemporalUtils.now(),
        30
    )
    val keyPair = generateRsaKeyPair()
    val parsedKeyPair = ParsedKeyPair(
        keyId,
        keyPair.public,
        keyPair.private,
        KeyMetadata("sig", algorithm)
    )
    adapter.checkKeyPair(parsedKeyPair)
    val signed = adapter.sign(jwtClaims, parsedKeyPair)
    val verify = adapter.verify(signed)

    verify shouldNotBe null
    verify.subject shouldBe jwtClaims.subject
    verify.issuedAt.epochSecond shouldBe jwtClaims.issuedAt.epochSecond
    verify.expiresAt.epochSecond shouldBe jwtClaims.expiresAt.epochSecond
}
```

## 만들면서 겪었던 문제::problems-that-i-faced

![테스트 커버리지](/post/back-end/auth-server-development/test-reports.png)
:{ "align": "center", "max-width": "600px", "description": "프로젝트 전체 테스트 커버리지" }

**라이브러리 래퍼 분리**

사실 처음에 인증서버를 만들 때, 이렇게 까지 많이 손이 갈줄은 몰랐다. 경솔하게도 어렵지 않게 진행할줄 알았지만, 생각보다 많은 어려움이 있었다.

처음 개발 당시에는, JWT 라이브러리를 종속적으로 사용하게 만들어서, `com.auth0:jwt` 라이브러리에서 특정 알고리즘으로 서명이 불가능해서,
사용 가능한 알고리즘으로만 키를 만들었다. 
특정 기능이 라이브러리에 종속되는 문제를 피하기위해, 외부에서 라이브러리를 지정할 수 있도록 설정으로 분리시키는 기능도 이 때문에 만들었다.

**잘못 된 키페어는 미사용**

이 스펙은 참 고민을 많이했다. "잘못 된" 이라는 기준을 어떻게 세워야 할지, 범위가 너무 넓었다.
PEM 헤더를 봐야할지, 키를 파싱해서 정보를 확인할지, 메타데이터와 비교해서 판단해야할지 너무 어려웠기에, 
단순히 서명과 검증이 현재 라이브러리로 가능한지를 판단했다. 

미사용은 따로 구분할 방법이 없고, 잘못된 값이 올라갔을 때 애플리케이션을 종료하고 스페이스 알람으로 따로 별도처리 해두었다.
물론 키교체 동안에는 항상 모니터링하고 잘못된 키가 올라가면 다시 교체하겠지만, 
2단계 안전장치 정도로 분리하여 추후 누군가 비밀정보를 수정해서 문제가 발생하더라도 바로 대응할 수 있도록 하였다.

**끝내며**

MSA 환경에서 최대한 외부에 의존하지 않고, 각 기능으로서 수행할수 있는 아키텍쳐를 만들려고 했지만, 아직도 많이 부족하다 생각이든다.
사람들은 리스크가 큰 문제를 해결하고 싶지 않아하고, 나 또한 그렇다.

이 프로젝트를 수행하면서 가장 좋았던 점은, 그동안 섣불리 시도할 수 없는 키교체에 대해서 이제는 아주 간단히, 작은 비용으로 전혀 문제 조차로도 느껴지지 않는 자신감을 쌓은것이다.
