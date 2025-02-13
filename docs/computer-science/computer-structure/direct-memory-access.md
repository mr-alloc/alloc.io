---
layout: wiki
date: 2020-08-02 13:22:00
title: Direct Memory Access (DMA)
tags: [Hardware, DMAC, Direct Memory Access Controller]
summary: DMA
hide: false
---

## DMA란 무엇인가?::what-is-dma

DMA는 `IO 장치`와 `메모리`간의 데이터 전송을 위한 기술이다.

정확히는 모든 I/O장치는 아니고, 대용량 데이터 전송을 목적으로 하는 하드웨어와 연결되어있다.  
저장 장치의 경우 `HDD/SSD`, `CD/DVD` 그리고 멀티미디어의 경우 `그래픽 카드(GPU)`, `사운드 카드` 등이 있다.

[`PIO`](/wiki/programmed-io)방식에서는 [CPU](/wiki/central-processing-unit)가 데이터를 한 워드 또는 바이트마다 전송하기 때문에, 속도가 빠른 **I/O 장치**의 경우 CPU의 실제 프로세스 작업 시간을 줄여 다른 작업을 수행하는데 방해가된다.  
이를 해결하기위해 등장한 DMA 기술은 `I/O 장치에서 메모리`로 또는 `메모리에서 I/O 장치`로 데이터를 CPU의 개입없이 전송하여 CPU의 부담을 줄여준다.

![메모리와 I/O 장치간의 데이터 전송](/post/computer/data-transfer-between-memory-and-io-device.png)
:{ "max-width": "400px", "align": "center", "wrapper-class": "justify-center", "description": "메모리와 I/O 장치간의 데이터 전송" }

## DMA는 어떻게 사용되는가?::how-dma-used-for

**D**irect **M**emory **A**cess **C**ontroller (이하 `DMAC`)는 하드웨어 장치로서, [메모리]() 입출력 장치간의 데이터 전송을 DMA 기술로서 관리하는 장치이다.


### DMA 동작 순서::sequence-of-dma

장치 A에서 장치 B로 `DMA` 요청이 들어왔다는 가정하에, 순서를 설명하자면 다음과 같다.

1. 장치 컨트롤러는 `DMAC`과 물리적으로 연결 되어있는 신호선에  DMA Request(`DMA 요청`)을 보낸 후 `DMAC`에서 요청을 받아들이면, 장치 컨트롤러로 DMA Acknowledge(`DMA 승인`) 신호를 보낸다.

   ![DMA 요청](/post/computer/dma-request.png)
   :{ "max-width": "400px", "align": "center", "description": "장치 컨트롤러의 DMA 요청" }

2. 데이터를 전송하기 전에 각 장치에 명령을 전달한다.

   * 데이터를 읽기위해 디스크 컨트롤러로 `주소 신호`(컨트롤러로 부터 전달받은 읽을 로컬버퍼 주소)와 `제어 신호` (읽기 명령)을 보낸다.  
   또한 메모리에는 `주소 신호`(전달받은 메모리에 쓰기 주소)와 `제어신호`(쓰기 명령)을 보내면 데이터를 전송할 준비가 완료 된다.

3. `DMAC`는 데이터를 전송할 시스템 버스의 소유권을 얻기위해 CPU에게 제어 버스로 `Bus Request(BR)` 신호를 전송한다. CPU는 `Bus Grant`신호를 전송하여 버스 사용을 허가한다.

   ![시스템버스로 연결되어 있는 각 장치들](/post/computer/cpu-and-io-devices.png)
   :{ "max-width": "400px", "align": "center", "description": "시스템 버스와 연결된 각 장치들" }

   * 실제로는 I/O 장치의 컨트롤러와 연결되어 있으며, `BR`과 `BG` 모두 제어버스를 통해 전달된다. 각 장치마다 데이터를 준비하는 과정이 다르긴 하지만, 장치 A(HDD)에서 장치 B(RAM)으로 데이터를 전송하는 과정에서 데이터를 준비는 다음과 같다.
   먼저 `CPU`가 디스크 읽기요청을 하드디스크 [드라이버]()로 전송한다. 이때 디스크의 읽을 섹터번호([LBA]()) 와 읽을 양, 쓰기가 필요한 메모리 주소 등을 전달한다.  

   * 디스크 드라이버는 전달받은 정보를 이용해 데이터를 읽고, 디스크 컨트롤러 로컬버퍼에 데이터를 임시로 저장한다. 그리고 데이터를 읽을준비가 완료되면, `DMAC`으로 `DMA 요청`을 전송한다.
   `DMAC`은 시스템 제어를 위해 `CPU`에게 `BR`을 보내고, `CPU`는 `BG`를 보낼어 제어 승인을 하며, 타임아웃을 정하여 [타이머](/wiki/interrupt#timer)를 설정한다. 

   > 만약 타임아웃이 발생한다면 타이머는 인터럽트를 발생시켜 CPU에게 알린다.
   :{ "type": "caution", "icon": "warning-octagon" }  

   * `BG`를 받는 경우 즉시 회로가 연결되어 시스템버스의 소켓특성으로 데이터가 전달된다.

4. 데이터 전송제어를 모두 마친 `DMAC`은 `CPU`에게 시스템 버스의 소유권을 반환한다.
   * 이 경우 [인터럽트](/wiki/interrupt)를 발생시켜 CPU에 작업완료를 알려 버스소유권을 반납한다. 

### DMA 동작모드::mode-of-dma

**사이클 스틸링(Cycle Stealing)**

`Cycle Stealing(이하 CS)`는 데이터를 Word 단위로 전송한다. 작은 단위의 데이터를 전송할 때 워드단위로 처리되기 때문에, 잦은 인터럽트가 발생된다.
따라서 DMA에 의한 인터럽트로 CPU `Cycle`을 훔치게 된다. (실제로 옛날의 컴퓨터 구조에서는 DMA 사용시 회로를 막아버림으로써 `Cycle`을 훔쳤다.) 

**버스트 모드(Bust mode)**

`Bust Mode`는 더큰 데이터를 DMA 할 때 사용되며 메모리의 Block 단위(`4KB`, `8KB`, `64KB`)로 처리된다.  
블록단위 전송으로서 인터럽트가 발생되기 때문에, 성능향상에 큰이점을 준다.
