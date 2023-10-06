const fs = require("fs")
const exclude = require("./excludeFileName.js")
const fileNames = require(`${process.env.PWD}/static/file-name.json`)
const readMarkdown = require("./readMarkdown.js")
const PostStore = require('./postStore.js')

const { FileType, FileNode } = require("./storeFileMap.js")

const __ROOT__ = process.env.PWD
const fileRE = new RegExp('([^.]+)(?:(\.)([^.]+))?', 'g')

function toFilePost (wholePath, file) {
    let filename, ext
    const post = readMarkdown(wholePath)
    const parsedName = fileRE.exec(file.name)

    if(parsedName) {
        filename = parsedName[1]
        ext = parsedName[3]
    }

    const nickname = post.header['summary'] != undefined
        ? post.header['summary']
        : file.name
    /* 포스팅 정보 추가 */

    const pathArray = wholePath.split('/')
        .filter(name => name !== '')
    const breadcrumbs = pathArray
        .slice(1, pathArray.length -1)
        .map(name => fileNames[name] ?? name)
    breadcrumbs.push(nickname)
    post.header['layout'] === 'post' && PostStore.push(post)
    post.header.breadcrumbs = breadcrumbs
    const group = pathArray[1] ?? 'etc'

    return new FileNode(wholePath.replace('.md', '').toLowerCase(), filename, ext, nickname, breadcrumbs, FileType.POST, false, group)
}

function toFileFolder(wholePath, file) {
    const nickname = fileNames[file.name] !== undefined
        ? fileNames[file.name]
        : file.name
    const hasIcon = fs.existsSync(`${__ROOT__}/public/assets/icon/${file.name}.png`)

    const splitedPath = wholePath.split('/').filter(name => name !== '')
    const breadcrumbs = splitedPath.map(name => fileNames[name])
    const group = splitedPath[0] ?? 'etc'
    return new FileNode(wholePath, file.name, '', nickname, breadcrumbs, FileType.DIR, hasIcon, group)
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
