import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import packageJson from '~/package.json'
import keys from '~/static/keys.json'

export default () => {
    const links = keys.map(key => {
        return {
            //리디렉션
            url: key + '/'
        }
    })
    const stream = new SitemapStream({
        hostname: packageJson.domain
    });
    return streamToPromise(Readable.from(links).pipe(stream))
}

