const Parser = require("jekyll-markdown-parser")

const getIfMatched = (regex, str) => {
    const executed =  regex.exec(str)
    const hasPath = executed && executed.length >= 2
    console.log('str: ', str)
    console.log('executed: ', hasPath && executed[1])
    console.log('real executed: ', executed)
    return hasPath ? executed[1] : null
}

module.exports = (name, content) => {
    console.log('content: ', content)
    const md = Parser.parse(content)
    const html = md.html

    //extract img tags in html string
    const imgRegex = /<img[^>]+src="([^"]+)"/g
    const images = html.split('\n').map(line => getIfMatched(imgRegex, line)).filter(line => line && line !== '')

    console.log(images)
}
