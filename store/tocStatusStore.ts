import {defineStore} from "pinia";
import {TocNode} from "~/class/implement/TocNode";

export const useTocStatusStore = defineStore('tocStatusStore', () => {
    const currentTocNode = ref<TocNode>(new TocNode(0, 'root'))

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
        currentTocNode.value = new TocNode(0, 'root')
    }

    function addHeadline(node: TocNode): void {
        const rootNode: TocNode = currentTocNode.value
        initRecursive(rootNode, node)
    }

    return {
        currentTocNode,
        refresh,
        addHeadline
    }
})
