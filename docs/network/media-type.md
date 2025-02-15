---
layout: wiki
title: 미디어 타입 (Media Type)
date: 2021-03-20 10:10:00
tags: [Network, HTTP, Media Type, MIME Type]
summary: 미디어 타입
hide: false
---

## 미디어 타입이란?::what-is-media-type

**미디어 타입**(Media Type)은 웹에서 전송되는 데이터의 형식을 나타내는 메타 정보이다.
웹에서는 주로 **MIME**(**M**ultipurpose **I**nternet **M**ail **E**xtensions) 타입이라고 불리며, 데이터의 형식을 나타내는 문자열이다.

`MIME`는 이메일을 위한 표준 포맷을 정의하였으며, 이를 확장하여 웹에서도 사용되고 있다.
서버에서는 전달할 자원의 확장자를 이용해 미디어 타입을 결정하며, 브라우저는 이를 통해 어떤 방식으로 자원을 처리할지 결정한다.

>이러한 미디어 타입은 표현 계층으로서의 구현이다. 
: { "type": "note", "icon": "info" }

(타입)/(서브타입)의 형식으로 이루어져 있으며, 서브타입은 타입에 따라 다양하게 나뉜다.

| MIME Type |                                       설명                                        | 일반 적인 서브타입 예시 |
|:---:|:-------------------------------------------------------------------------------:|:---:|
| text |                    텍스트를 포함하는 모든 문서를 나타내며 이론상 인간이 읽을수 있어야 한다.                    | plain, html, css, javascript |
| image | 모든 종류의 이미지를 나타내며, 애니메이션되는 이미지(animated gif 처럼)가 이미지타입에 포함되긴 하지만, 비디오는 포함되지 않는다. | jpeg, png, gif, svg |
| audio |                                모든 종류의 오디오 파일을 나타낸다.                                | mp3, wav, ogg |
| video |                                모든 종류의 비디오 파일을 나타낸다.                                | mp4, webm, ogg |
| application |                         모든 종류의 바이너리 데이터를 나타낸다.                         | octet-stream, json, pdf, zip |



