import {PostSearchResult} from "~/class/implement/PostSearchResult";
import {groupingBy} from "~/utils/settingUtils";

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
    update(results: PostSearchResult []) {
        //기존 결과 대상 finalize
        results.forEach(result => result.finalize())

        //결과 대상 유지 및 추가
        results.forEach(result => {
            const key = result.content.path
            //검색 결과가 기존 결과내 존재하지 않는 경우
            if ( ! this._searchResults.has(key)) {
                this._searchResults.set(key, result)
            } else {
                this._searchResults.get(key)?.carryOn()
            }
        })
        // 제거대상 삭제
        results.forEach(result => {
            if (result.isFinalize()) {
                result.disappear()
            }
        })
    }
}
