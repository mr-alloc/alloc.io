const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const keys = require('../../static/keys.json')
const packageJson = require('../../package.json')


module.exports = () => {
    const links = keys.map(key => {
        url: key
    })
    const stream = new SitemapStream({
        hostname: packageJson.domain
    })
    return streamToPromise(Readable.from(links).pipe(stream))
}
