export class TocNode {
    grade: number
    title: string
    fragmentId: string
    children: TocNode []
    isSelected: boolean

    constructor(node: any) {
        this.grade = node.grade
        this.title = node.title
        this.fragmentId = node.fragmentId
        this.children = node.children
        this.isSelected = false
    }

    select(): void {
        this.isSelected = true
    }

}
