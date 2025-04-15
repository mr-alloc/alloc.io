---
layout: post
title: Gitlab CI 시작하기
tags: [ Gitlab, CI, CI/CD ]
date: 2025-04-01 12:58:00 +0900
thumbnail: /post/infrastructure/kubernetes/update-istio.webp
current-company: NEOWIZ
current-position: Software Engineer
summary: Gitlab CI
excerpt_separator: <!--more-->
hide: true
---

CI/CD는 반복적인 코드 변경 사항을 지속적으로 빌드, 테스트, 배포하고 모니터링하는 지속적인 소프트웨어 개발 방법이다.
이러한 반복적인 프로세스는 버그가 있거나 실패한 이전 버전을 기반으로 새로운 코드를 개발할 가능성을 줄이는 데 도움이 된다.

GitLab CI/CD를 사용하면 개발 주기 초기에 버그를 포착하고, 프로덕션에 배포된 코드가 기존 코드 표준을 준수하는지 확인하는 데 도움이 된다.
<!--more-->

## 시작하기

## 워크 플로우

```yml::.gitlab-ci.yml
workflow:
  rules:
    - if: '$CI_COMMIT_REF_NAME == "master"'
      variables:
        DEPLOY_KEY: $PRODUCTION_DEPLOY_KEY
    - when: always
      variables:
        DEPLOY_KEY: $DEVELOPMENT_DEPLOY_KEY  
```

위는 배포 브랜치에 따라 배포키를 설정하는 스크립트이다.
