---
layout: wiki
title: Base58 인코딩
date: 2019-11-05 18:25:00 +0900
tags: [Algorithm, Encoding, Base64]
summary: Base48
hide: true
---

## Base58란?::what-is-base58

**Base58**는 이진 데이터를 6비트씩 끊어서 문자로 변환하는 인코딩 방식이다.
60년대 후반에서 70년대 초반, 최초의 이메일 시스템은 7bit ASCII 문자만 전송할 수 있었다. 이는 [SMTP]()(**S**imple **M**ail **T**ransfer **P**rotocol)가 7bit ASCII 기반으로 설계되었기 때문이다.

하지만 실제 데이터는 대부분 8bit 바이너리 형식이였고, 여기에 실행 파일, 이미지, 비디오 등이 포함 된다. 이 8bit 데이터를 7bit 채널로 전송하기 위한 해결책이 필요했고,
