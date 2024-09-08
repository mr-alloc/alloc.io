import MarkDownPost from "@/class/implement/MarkDownPost";

export default class PostData {
    private readonly _index: number
    private readonly _sha: string
    private readonly _content: string
    private readonly _markdownPost: MarkDownPost | null

    constructor(index: number, sha: string, content: string, markdownPost: MarkDownPost | null) {
        this._index = index
        this._sha = sha
        this._content = content
        this._markdownPost = markdownPost
    }


    get index(): number {
        return this._index;
    }

    get sha(): string {
        return this._sha;
    }

    get content(): string {
        return this._content;
    }

    get markdownPost(): MarkDownPost | null {
        return this._markdownPost;
    }
}
