import {defineStore} from "pinia";
import {TocNode} from "~/class/implement/TocNode";

export const useTocStatusStore = defineStore('tocStatusStore', () => {
    const rootWrapper = ref<RootNodeWrapper>(new RootNodeWrapper(new TocNode(0, 'root')))
    function initRecursive(parent: TocNode, node: TocNode): void {
        if (parent.grade < node.grade) {
            if (parent.hasChild() && parent.children[parent.children.length - 1].grade < node.grade) {

                initRecursive(parent.children[parent.children.length - 1], node)
                return
            }

            parent.grade > node.grade && parent.addChild(node)
        }
    }
    function refresh(): void {
        rootWrapper.value.root = new TocNode(0, 'root')
    }

    function addHeadline(node: TocNode): void {
        const rootNode = rootWrapper.value.root as TocNode
        initRecursive(rootNode, node)
    }

    return {
        tocRoot: rootWrapper.value.root,
        refresh,
        addHeadline
    }
})

export class RootNodeWrapper {
    private tocRoot: TocNode

    constructor(tocRoot: TocNode) {
        this.tocRoot = tocRoot
    }

    get root(): TocNode {
        return this.tocRoot
    }

    set root(root: TocNode) {
        this.tocRoot = root
    }
}
