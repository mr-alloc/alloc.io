import TocNode from "@core/classes/toc-node";

const headlineRE = () => {
    return /^(#{2,3})\s+([^\n]+)/gm;
}


/**
 * 자신보다 높은 순위의 자식노드를 찾을 때까지 재귀
 * @param parent 탐색할 부모노드
 * @param node 현재노드
 */
function findRecursive(parent: TocNode, node: TocNode) {
    if (node.belongTo(parent)) {
        //탐색할 부모 노드에 마지막 자식노드의 순위보다 현재노드의 순위[오름차순]가 낮다면 자식노드에 추가
        if (parent.hasLargestRankChildThen(node)) {
            findRecursive(parent.children[parent.children.length - 1], node)
            return
        }

        parent.addChild(node);
    }
}

export default (content: string) =>  {
    const lines = content.split('\n').filter(line => headlineRE().test(line));
    const rootNode = new TocNode(0, 'root::root');

    for (let line of lines) {
        const executed = headlineRE().exec(line)
        if (executed) {
            const node = new TocNode(executed[1].length, executed[2].trim())
            findRecursive(rootNode, node)
        }
    }
    return rootNode
}
