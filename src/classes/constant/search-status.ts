export enum SearchStatus {
    // 입장 (랜더링전 데이터만 추가 됨)
    APPEAR = 'appear',
    //준비 (데이터 랜더링)
    READY = 'ready',
    //유지 (다음 검색 목록을 받아와서 유지할지 판단하는 상태)
    CARRY_ON = 'carry-on',
    //제거 전(디랜더링)
    FINALIZE = 'finalize',
    //데이터 삭제
    DISAPPEAR = 'disappear'
}
