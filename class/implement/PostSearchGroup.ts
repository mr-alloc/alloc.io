import {PostSearchResult} from "~/class/implement/PostSearchResult";
import {SearchStatus} from "~/class/implement/SearchStatus";

export class PostSearchGroup {
    readonly _icon: string
    readonly _searchResults: Map<String, PostSearchResult>

    constructor(icon: string, result: PostSearchResult []) {
        this._icon = icon
        this._searchResults = toMap<String, PostSearchResult>(result, (e) => e.content.path)
    }

    get icon(): string {
        return this._icon
    }

    get results(): PostSearchResult [] {
        return [...this._searchResults.values()]
    }

    //같은 그룹 내에서 넣는 포스트
    update(newResults: PostSearchResult []) {
        newResults.forEach(result => {
            const key = result.content.path
            //기존 검색 결과 같은(Carry-on을 READY로 변경)
            if (this._searchResults.has(key)) {
                const existed = this._searchResults.get(key)
                if (existed?.is(SearchStatus.CARRY_ON) || existed?.is(SearchStatus.FINALIZE)) {
                    existed?.change(SearchStatus.READY)
                    //꺼내와서도 값이 변경되는 지 확인
                    return
                }
            }
            //Appear 상태로 신규결과 추가 (추가되는 연출)
            else {
                this._searchResults.set(key, result)
            }
        })

        //아직 까지 Carry-on으로 되어있다면, 신규 결과에 없다는 의미이므로, Finalize
        //Finalize변경되면서, 제거되는 연출)
        this.results.forEach(element => {
            if(element.is(SearchStatus.APPEAR)) {
                element.change(SearchStatus.READY)
            }

            if (element.is(SearchStatus.CARRY_ON)) {
                //Finalize 된 대상들은 이미 스타일이 제거 되었으므로, 실제로 데이터를 제거
                // element.change(SearchStatus.FINALIZE)
                this._searchResults.delete(element.content.path)
            }
        })

        //Finalize 된 대상들은 이미 스타일이 제거 되었으므로, 실제로 데이터를 제거
    }

    updateNewer() {
        this.results.forEach(element => {
            if(element.is(SearchStatus.APPEAR)) {
                element.change(SearchStatus.READY)
            }
        })
    }

    finalizeAllChild() {
        this.results.forEach(result => {
            result.change(SearchStatus.FINALIZE)
        })

    }
}
