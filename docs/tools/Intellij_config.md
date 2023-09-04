---
layout: post
title: Intellij 단축키 와 설정
categories: [Development, Tools]
tags: [Intellij, Shortcut, 인텔리제이, 단축키, 기본설정]
date: 2023-08-28 19:42:00 +0900
profile_image: /assets/blogging/profile/winkkom.png
current_company: NEOWIZ
current_position: Software Engineer
thumbnail: /assets/blogging/tool/intellij_shortcut.png
summary: 단축키와 기본설정
excerpt_separator: <!--more-->
hide: false
---
Intellij에서 유용한 단축키 정리
<!--more-->

## 기본 단축키
| 단축키 <span class="key key-mac selected">`MAC`</span> <span class="key key-win">`Win`</span>     | 설명 |
|:-----------|:--|
| <span class="key-mac">`⌥` + `⌘` + `X`</span><br/><span class="key-win">`Ctrl` + `Alt` + `X`</span>   | 리턴타입이 있는 메소드 호출위에 커서를 두고 실행 |
| <span class="key-mac">`⌃` + `⇧` + `숫자`</span><br/><span class="key-win">`Ctrl` + `Shift` + `숫자`</span> | 북마크된 라인으로 이동은 `⌃`(win `Ctrl`) + `숫자` |

##  Live Template
Setting > Live Template 검색  
custom 으로 등록  
![Live Template 설정](/assets/blogging/intellij/intellij1.png)

## Build 환경 설정
Setting > Gradle 검색  
![Gradle 빌드 설정](/assets/blogging/intellij/intellij2.png)

위 `build` 설정은 testCase를 만들시 gradle에서 빌드하던것을 intellij 로 빌드 하도록 바꿔준 것이다.
testCase 빌드 안될시 체크.

## Annotation Error
![AnnotationError](/assets/blogging/intellij/tableAnnotationError.png)


### 테스트 인스턴스를 Method로 생성(Extract Method)

```java

//Before

Member member =  new Member();
member.setName("회원1");
member.setAddress(new Address("서울","강가","123-123"));
em.persist(member);

//After as Drag and ShortCuts
⌥ + ⌘ + M

private Member createMember() {
        Member member = new Member();
        member.setName("회원1");
        member.setAddress(new Address("서울", "강가", "123-123"));
        em.persist(member);
        return member;
    }
```  

### 메소드내 파라미터 생성 (Extract Parmeter)

```java

private Member createMember() {
        Member member = new Member();
        member.setName(Here);
        member.setAddress(new Address("서울", "강가", "123-123"));
        em.persist(member);
        return member;
    }
// Here의 위치에 변수명을 입력하고 아래 단축키입력시 자동 파라미터 등록
⌥ + ⌘ + P

```
### 이전 또는 이후 커서의 위치로 이동

`⌥` + `⌘` + ( `Left` or `Right` )

### 라인 북마크 등록 및 이동

- 등록  : `⌃` + `⇧` + `원하는 번호`
- 이동  : `⇧` + `등록한 번호`

### 자료형 및 변수명 자동생성

```java
public class Kimchi{

  ...

  public void kimchi(Source source){
    kimchiService.make(source);                 // 커서를 왼쪽끝에두고
    Kimchi kimchi = kimchiService.make(source); //사용후
  }

}
```  
`⌥` + `⌘` + 'V'

### 프로젝트 익스플로러로 이동

`⌘` + '1'
### 멀티라인 셀렉트

`⌥` + `⌥` 누른상태에서 `Down`
