
const slugify = function (s) {
    return encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));
}

class TocNode {
    grade
    title
    fragmentId
    children
    isSelected = false

    constructor(grade, title) {
        this.grade = grade
        this.title = title
        this.fragmentId = slugify(title)
        this.children = []
    }

    addChild (child) {
        this.children.push(child)
    }

    hasChild() {
        return this.children.length > 0
    }
}

const headlineRE = /^(##{0,5})\s+([^\n]+)/gm
module.exports = (content) =>  {
    const lines = content.split('\n')
    const rootNode = new TocNode(0, 'root')

    function addHeadline(node) {
        initRecursive(rootNode, node)
    }

    function initRecursive(parent, node) {
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
