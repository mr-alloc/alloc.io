const createNode = require('./createNode.js')

const explore = (path) => {
    const childFiles = createNode(path)

    for(const file of childFiles) {
        if(file.isDirectory()) {
            const filePath = `${path}/${file.name}`
            file.files = explore(filePath)
        }
    }

    return childFiles
}


module.exports = explore
