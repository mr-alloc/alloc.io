const fs = require("fs")
const exclude = require("./excludeFileName")
const {FileType, FileNode} = require("./storeFileMap")
const fileNames = require("../site/file-name.json")
const readMarkdown = require("./readMarkdown")
const PostStore = require('./PostStore')

const __ROOT__ = process.env.PWD
const fileRE = /([^.]+)(?:(\.)([^.]+))?/g

function toFilePost (wholePath, file) {
    let filename, ext
    const post = readMarkdown(wholePath)
    const parsed_name = fileRE.exec(file.name)

    if(parsed_name != undefined) {
        ext = parsed_name[1]
        filename = parsed_name[3]
    }

    const nickname = post.header['summary'] != undefined
        ? post.header['summary']
        : file.name
    /* 포스팅 정보 추가 */
    PostStore.push(post)

    return new FileNode(wholePath.replace('.md', '').toLowerCase(), filename, ext, nickname, FileType.POST, false)
}

function toFileFolder(wholePath, file) {
    const nickname = fileNames[file.name] != undefined
        ? fileNames[file.name]
        : file.name
    const hasIcon = fs.existsSync(`${__ROOT__}/src/assets/icon/${file.name}.png`);

    return new FileNode(null, wholePath, file.name, '', nickname, FileType.DIR, hasIcon)
}

module.exports = (path) => {

    const files = fs.readdirSync(`${__ROOT__}/src${path}`, {
        withFileTypes: true,
        encoding: "utf-8"
    })

    return files
        .filter(file => exclude(file.name))
        .map((file) => {
            const wholePath = `${path}/${file.name}`

            return file.isDirectory()
                ? toFileFolder(wholePath, file)
                : toFilePost(wholePath, file)
        })
}
