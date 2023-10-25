const Parser = require("jekyll-markdown-parser")

const propertyRE = /src="([^"]+)"(?: alt="([^"]+)")?/
const imgRE = /<img.*?>/g

//html string을 가져와 img  tag의 src를 출출하여 배열로 리턴
module.exports = (content) => {
    const md = Parser.parse(content)
    const matches = md.html.match(imgRE)
    const map = new Map()
    return matches
        ? matches.map(match => {
            const executed = propertyRE.exec(match)
            return executed
                ? { src: executed[1], alt: executed[2] }
                : null
        }).filter(e => e != null)
        : []
}
