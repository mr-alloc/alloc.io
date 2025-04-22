import {PostSearchResult} from "@/classes/implement/post-search-result";
import {SearchStatus} from "@/classes/constant/search-status";
import {toMap} from "@/utils/collection-util";
import {usePostContentStore} from "@/store/post-content-store";

export class PostSearchGroup {
    private readonly _icon: string
    private readonly _searchResults: Map<string, PostSearchResult>

    constructor(icon: string, result: PostSearchResult []) {
        this._icon = icon
        const postContentStore = usePostContentStore();
        this._searchResults = toMap<string, PostSearchResult>(result, (e) => {
            return postContentStore.isWiki(e.content.path.last)
                ? `/wiki/${e.content.path.last}`
                : e.content.path.value;
        })
    }

    get icon(): string {
        return this._icon;
    }

    get results(): PostSearchResult [] {
        return [...this._searchResults.values()]
    }

    //같은 그룹 내에서 넣는 포스트
    public update(newResults: PostSearchResult []): void {
        const newResultMap = toMap(newResults, (e: PostSearchResult) => e.contentPath);
        const paths = [this.results.map(result => result.contentPath), newResults.map(result => result.contentPath)].flat();
        const pathSet = new Set<string>(paths);
        for (const path of pathSet) {
            const isOld = this._searchResults.has(path);
            const isNew = newResultMap.has(path);

            //계속 유지
            if (isOld && isNew) {
                const existed = this._searchResults.get(path)
                if (existed?.is(SearchStatus.CARRY_ON) || existed?.is(SearchStatus.FINALIZE)) {
                    existed?.change(SearchStatus.READY)
                    //꺼내와서도 값이 변경되는 지 확인
                }
            }
            //삭제 대상
            else if (isOld) {
                this._searchResults.delete(path);
            }
            //추가 대상
            else if (isNew) {
                const result = newResultMap.get(path)!;
                this._searchResults.set(result.contentPath, result);
            }

        }
    }

    public updateNewer(): void {
        this.results.forEach(element => {
            if(element.is(SearchStatus.APPEAR)) {
                element.change(SearchStatus.READY)
            }
        });
    }

    public finalizeAllChild(): void {
        this.results.forEach(result => {
            result.change(SearchStatus.FINALIZE)
        });
    }

    public deleteFinalized(): void {
        const target = this.results.filter(result => result.is(SearchStatus.FINALIZE))
            .map(result => {
                result.change(SearchStatus.DISAPPEAR);
                return result.contentPath;
            });
        setTimeout(() => {
            target.forEach(key => this._searchResults.delete(key))
        }, 300);
    }

    public renderAppeared(): void {
        this.results.filter(result => result.is(SearchStatus.APPEAR))
            .map(result => {
                result.change(SearchStatus.READY);
                return result.contentPath;
            });
    }
}
