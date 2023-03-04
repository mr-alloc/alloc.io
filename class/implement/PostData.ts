import { MarkDownPost } from "@/class/implement/MarkDownPost";

export class PostData {
    index: number
    sha: string
    content: string
    markdownPost: MarkDownPost | null

    constructor(index: number, sha: string, content: string, markdownPost: MarkDownPost | null) {
        this.index = index
        this.sha = sha
        this.content = content
        this.markdownPost = markdownPost
    }
}
