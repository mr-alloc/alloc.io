const Parser = require("jekyll-markdown-parser")

const srcRE = /"(.*?)"/
const imgRE = /<img[^>]+src="([^"]+)"/g

//html string을 가져와 img  tag의 src를 출출하여 배열로 리턴
module.exports = (content) => {
    const md = Parser.parse(content)

    const matches = md.html.match(imgRE)
    return matches ? matches.map(match => srcRE.exec(match)[1]) : []
}
