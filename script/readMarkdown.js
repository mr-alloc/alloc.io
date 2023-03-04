const fs = require("fs");
const Parser = require("jekyll-markdown-parser")
const { PostData } = require("./storeFileMap")
const __ROOT__ = process.env.PWD


module.exports = (filePath) => {
    const content = fs.readFileSync(`${__ROOT__}/src${filePath}`, {
        encoding: 'utf-8'
    })

    const md = Parser.parse(content)
    const contentRegex = /(?:((.|\n)*)(<!--\s*more\s*-->)((.|\n)*))/g

    const header = md.parsedYaml
    header.date = header.date ? Date.parse(header.date) : 1999999999999
    const body = contentRegex.exec(md.markdown)

    return new PostData(
        filePath.replace('.md', '').toLowerCase(),
        (header != null ? header : {}),
        ((body != null && body.length >= 1) ? body[1] : ''),
        ((body != null && body.length) >= 4 ? body[4] : ''))
}
