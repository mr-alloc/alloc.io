export class TocNode {
    grade: number
    title: string
    fragmentId: string
    children: TocNode []
    isSelected: boolean

    constructor(node: any) {
        this.grade = node._grade
        this.title = node._title
        this.fragmentId = node._fragmentId
        this.children = node._children
        this.isSelected = false
    }

    select(): void {
        this.isSelected = true
    }

}
