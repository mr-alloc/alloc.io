const fs = require("fs")
const exclude = require("./excludeFileName.js")
const fileNames = require("../static/file-name.json")
const readMarkdown = require("./readMarkdown.js")
const PostStore = require('./postStore.js')

const { FileType, FileNode } = require("./storeFileMap.js")

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
    const hasIcon = fs.existsSync(`${__ROOT__}/public/assets/icon/${file.name}.png`);

    return new FileNode(wholePath, file.name, '', nickname, FileType.DIR, hasIcon)
}

module.exports = (path) => {

    const files = fs.readdirSync(`${__ROOT__}${path}`, {
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
