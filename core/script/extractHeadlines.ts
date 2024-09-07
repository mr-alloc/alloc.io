import TocNode from "~/core/classes/TocNode";

const headlineRE = /^(##{0,5})\s+([^\n]+)/gm
export default (content: string) =>  {
    const lines = content.split('\n');
    const rootNode = new TocNode(0, 'root');

    function addHeadline(node: TocNode) {
        initRecursive(rootNode, node)
    }

    function initRecursive(parent: TocNode, node: TocNode) {
        if (parent.grade < node.grade) {
            if (parent.hasChild() && parent.children[parent.children.length - 1].grade < node.grade) {
                initRecursive(parent.children[parent.children.length - 1], node)
                return
            }
            parent.grade < node.grade && parent.addChild(node)
        }
    }

    lines.filter(line => headlineRE.test(line))
        .forEach(line => {
            const executed = line.match(headlineRE) &&  headlineRE.exec(line)
            if (executed) {
                const node = new TocNode(executed[1].length, executed[2].trim())
                addHeadline(node)
            }
        })
    return rootNode
}
