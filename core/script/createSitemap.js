const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const keys = require('../../static/keys.json')


module.exports = () => {
    const links = keys.map(key => {
        const link = {
            url: key
        }
        return link
    })
    const stream = new SitemapStream({
        hostname: 'https://tech.salar.kr'
    })
    return streamToPromise(Readable.from(links).pipe(stream))
}
