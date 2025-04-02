---
layout: post
title: istio 업데이트 (1.22.1 -> 1.25.0)
tags: [ Spring, Spring Boot, Spring Security ]
date: 2025-04-01 12:58:00 +0900
thumbnail: /post/infrastructure/kubernetes/update-istio.webp
current-company: NEOWIZ
current-position: Software Engineer
summary: istio 업데이트
excerpt_separator: <!--more-->
hide: false
---

관리하는 K8s 버전이 올라가면서, 필요한 istio 업데이트 진행을 간단히 정리해보자.
<!--more-->

## 선행 지식::prerequisites

1. 핵심 컴포넌트
    * istiod: 컨트롤 플레인 (istio-system namespace에 위치하며 워커 노드에 배포)
    * istio-proxy: 사이드카 프록시 (각 어플리케이션 Pod에 주입되며 istiod와 통신)
    * istio-ingressgateway: 인바운드 트래픽 처리
    * istio-egressgateway: 아웃바운드 트래픽 처리 (선택적)
2. 관리도구
    * istioctl: istio CLI 도구 (클라이언트)
    * kubectl: k8s CLI 도구 (클라이언트)
3. 리소스
    * Namespace: istio-system
    * Pod: 컨테이너 실행단위
    * Service: 서비스 디스커버리와 로드밸런싱
    * Deployment: Pod 관리 및 배포
4. 아키텍쳐 용어
    * Control Plane: 중앙 제어/관리 부분
    * Data Plane: 실제 트래픽을 처리하는 부분
    * Sidecar: 메인 컨테이너와 함께 실행되는 보조 컨테이너

## 설치::install-istio

먼저 istio를 설치하기전에 [kubectl](https://kubernetes.io/ko/docs/tasks/tools/install-kubectl-linux/)
과 [istioctl](https://github.com/istio/istio/releases)을 설치해야한다.

> kubectl을 설치하고 클러스터 설정이 되지않았다면, `aws eks update-kubeconfig --name 클러스터이름 --region 리전이름 --profile 프로필이름` 명령으로 설정할 수 있다.
:{ "type": "tip", "icon": "lightbulb" }

`istioctl`이 설치되었다면 다음의 명령으로 `kubectl context`에 설정된 클러스터의 검사를 진행한다.

```
> istioctl x precheck
✔ No issues found when checking the cluster. Istio is safe to install or upgrade!
  To get started, check out https://istio.io/latest/docs/setup/getting-started/.
```

위와 같이 나온다면, 정상적으로 설치가 가능한 상태이다.

```
> ./istioctl install --set revision=1-25-0
        |\
        | \
        |  \
        |   \
      /||    \
     / ||     \
    /  ||      \
   /   ||       \
  /    ||        \
 /     ||         \
/______||__________\
____________________
  \__       _____/
     \_____/

This will install the Istio 1.25.0 profile "default" into the cluster. Proceed? (y/N) y
✔ Istio core installed ⛵️
✔ Istiod installed 🧠
✔ Ingress gateways installed 🛬
✔ Installation complete
```

위 처럼 설치가 완료되었다면, service, pod, configmap을 모두 확인해보자.

```
> kubectl get svc -n istio-system
NAME                   TYPE           CLUSTER-IP       EXTERNAL-IP
istio-ingressgateway   LoadBalancer   {Clister IP}     {AWS ELB DNS Address}
istiod-1-22-1          ClusterIP      {Clister IP}     <none>
istiod-1-25-0          ClusterIP      {Clister IP}     <none>

> kubectl get pods -n istio-system
NAME                                   READY   STATUS    RESTARTS   AGE
istio-ingressgateway-655dc875b-sgsgm   1/1     Running   0          6m31s
istiod-1-22-1-94f886767-lxjdh          1/1     Running   0          77d
istiod-1-22-1-94f886767-qrccf          1/1     Running   0          77d
istiod-1-25-0-85c49d99c6-x8cv5         1/1     Running   0          6m43s

> kubectl get configmap -n istio-system
NAME                                  DATA   AGE
istio-1-22-1                          2      188d
istio-1-25-0                          2      7m54s
istio-ca-root-cert                    1      ...
istio-gateway-deployment-leader       0      ...
istio-gateway-status-leader           0      ...
istio-ip-autoallocate                 0      7m43s
istio-leader                          0      ...
istio-namespace-controller-election   0      ...
istio-sidecar-injector-1-22-1         2      188d
istio-sidecar-injector-1-25-0         2      7m54s
kube-root-ca.crt                      1      ...
```

설치가 정상적으로 된것으로 보인다.

## 버전 업데이트

안전한 업그레이드를 위해 현재 사용중인 Sidecar Injector ConfigMap을 백업 해두자.

```
k get configmap -n istio-system istio-sidecar-injector-1-25-0 -o yaml > istio-sidecar-injector-1.25.0.yaml
```

canary(신규 버전)와 stable(현재 버전) 태그로 안정적인 배포전략을 사용중이기 때문에, 태그설정이 필요하다.

```shell::태그 확인
> istioctl tag list
TAG    REVISION NAMESPACES
canary 1-22-1
stable 1-22-1   some-qa,some-staging
       1-25-0
```

현재는 `qa`와 `staging` namespace모두 stable로 적용되어있기 때문에 새로 변경할 1.25.0 revision을 canary로 바꿔줘야한다.

```shell::새로운 버전을 canary로 변경
> istioctl tag set canary --revision 1-25-0 --overwrite
Revision tag "canary" created, referencing control plane revision "1-25-0". To enable injection using this
revision tag, use 'kubectl label namespace <NAMESPACE> istio.io/rev=canary'
> istioctl tag show
TAG    REVISION NAMESPACES
stable 1-22-1   some-qa, some-staging
canary 1-25-0
```

## 레이블 적용 및 사이드카 주입::labeling-and-inject-sidecar

리비전 태그를 생성했다면, 이제 가이드 대로 레이블을 namespace에 적용할 수 있다.

```shell::레이블 적용 및 확인
> kubectl label namespace some-qa istio.io/rev=canary --overwrite
namespace/some-qa labeled
> k get ns -L istio.io/rev
NAME                     STATUS   AGE    REV
...
istio-operator           Active   188d
istio-system             Active   ...
...
some-qa                  Active   ....   canary
some-staging             Active   ....   stable
> k get ns --show-labels
NAME                     STATUS   AGE    LABELS
...
some-qa                  Active   509d   ...,istio.io/rev=canary,...
some-staging             Active   509d   ...,istio.io/rev=stable,...
```

레이블이 정상적으로 namespace에 적용된걸 확인 할 수 있다. 이제 배포를 하여, 사이드카가 정상적으로 들어가는지 확인이 필요하다.

::code-group

```shell::배포 전(1.22.1) 확인
> kubectl describe pod foo-pod -n some-qa | grep -A 10 "Init Containers:"
Init Containers:
  istio-init:
    Container ID:  containerd://...
    Image:         .../istio/proxyv2:1.22.1
    Image ID:      .../istio/proxyv2@sha256:...
    Port:          <none>
    Host Port:     <none>
    Args:
      istio-iptables
      -p
      15001
```

```shell::어플리케이션 재배포
> kubectl -n some-qa rollout restart deploy foo-pod
deployment.apps/foo-pod restarted
```

```shell::배포 후(1.25.0)
> kubectl describe pod foo-pod -n some-qa | grep -A 10 "Init Containers:"
Init Containers:
  istio-init:
    Container ID:  containerd://...
    Image:         .../istio/proxyv2:1.25.0
    Image ID:      .../istio/proxyv2@sha256:...
    Port:          <none>
    Host Port:     <none>
    Args:
      istio-iptables
      -p
      15001
```

::

namespace에 있는 `foo-pod` deployment의 모든 pod을 재시작 했다면, 위와 같이 sidecar injection이 정상적으로 되었을 것이다.
(`istioctl proxy-status`로 컨텍스트에 배포된 상태를 확인 할 수 있다.)

테스트가 완료되었다면, stable 태그를 새로운 버전으로 변경해주고, 나머지 운영 namespace를 다시 업데이트 해줘야한다.

```shell::태그 변경 및 레이블링
> istioctl tag set stable --revision 1-25-0 --overwrite
Revision tag "stable" created, referencing control plane revision "1-25-0". To enable injection using this
revision tag, use 'kubectl label namespace <NAMESPACE> istio.io/rev=stable'

> istioctl tag show
TAG    REVISION NAMESPACES
       1-22-1
canary 1-25-0   some-qa,some-staging
stable 1-25-0

> kubectl label namespace some-qa istio.io/rev=stable --overwrite
namespace/some-qa labeled
> kubectl label namespace some-staging istio.io/rev=stable --overwrite
namespace/some-staging labeled
```

```shell::Pod 재배포
> kubectl rollout restart -n some-qa foo-pod
> kubectl rollout restart -n some-staging foo-pod
```

배포가 정상적으로 되었고, 기존 버전을 사용하는 namespace가 없다면 제거해도 좋다.

```shell::기존버전 확인 및 삭제
# 1.25.0이외 버전을 사용하는지 확인
> istioctl proxy-status
NAME                                                  CLUSTER        CDS                LDS                EDS                RDS                ECDS        ISTIOD                             VERSION
...
foo-pod-6566b68d8f-8l7c6.some-qa                      Kubernetes     SYNCED (4m5s)      SYNCED (4m5s)      SYNCED (2m15s)     SYNCED (4m5s)      IGNORED     istiod-1-25-0-85c49d99c6-x8cv5     1.25.0
foo-pod-b649ff85-rz68n.some-staging                   Kubernetes     SYNCED (4m5s)      SYNCED (4m5s)      SYNCED (2m15s)     SYNCED (4m5s)      IGNORED     istiod-1-25-0-85c49d99c6-x8cv5     1.25.0

# 삭제
> istioctl uninstall --revision 1-22-1
No resources will be pruned from the cluster. Please double check the input configs

✔ Uninstall complete
```

## TL;DR::too-long-did-not-read

1. 설치전 클러스터 확인
    * `> istioctl x precheck`
2. istio 설치 (istiod Depoloyment, ConfigMap, Service 생성)
    * `> istioctl install --set revision=1-25-0`
3. 설치 확인
    * `kubectl get svc -n istio-system`
    * `kubectl get pods -n istio-sytem`
    * `kubectl get configmap -n istiosystem`
4. 필요한 ConfigMap 백업 (선택)
    * `kubectl get configmap -n istio-system istio-sidecar-1-25-0 -o yaml > istio-sidecar-injector-1.25.0.yaml`
5. 태그 설정 및 레이블 적용 (태그 확인: `istioctl tag show`)
    1. `istioctl tag set canary --revision 1-25-0 --overwrite`
    2. canary(테스트용): `kubectl label namepsace 네임스페이스명 istio.io/rev=canary`
        * canary는 배포 테스트를 위해 적용하는 임시적인 레이블
    3. stable(서비스용): `kubectl lable namespace 네임스페이스명 istio.io/rev=stable`
6. 서비스 배포 (배포 전 레이블 확인: `kubectl get ns --show-labels`)
    * `kubectl rollout restart deploy -n 네임스페이스명 파드명`
    * 서비스 배포후 정상적으로 동작한다면, 5-3 진행
7. 프록시 상태 확인 및 삭제
    * `istioctl proxy-status`
    * 삭제: `istioctl uninstall --revision 1-22-1`