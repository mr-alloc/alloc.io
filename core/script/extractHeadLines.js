
const slugify = function (s) {
    return encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));
}

class TocNode {
    _grade
    _title
    _fragmentId
    _children

    constructor(grade, title) {
        this._grade = grade
        this._title = title
        this._fragmentId = slugify(title)
        this._children = []
    }

    addChild (child) {
        this._children.push(child)
    }

    hasChild() {
        return this._children.length > 0
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
        if (parent._grade < node._grade) {
            if (parent.hasChild() && parent._children[parent._children.length - 1]._grade < node._grade) {
                initRecursive(parent._children[parent._children.length - 1], node)
                return
            }
            parent._grade < node._grade && parent.addChild(node)
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
