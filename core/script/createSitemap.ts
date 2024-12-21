import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import packageJson from '~/package.json'
import {read} from "@core/util/FileUtil";

export default () => {
    const keys: Array<string> = JSON.parse(read('/src/static/keys.json'));
    const links = keys.map((key: string) => {
        return {
            //리디렉션
            url: key
        }
    })
    const stream = new SitemapStream({
        hostname: 'https://alloc.io'
    });
    return streamToPromise(Readable.from(links).pipe(stream))
}

