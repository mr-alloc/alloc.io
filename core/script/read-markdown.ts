import { parse } from 'jekyll-markdown-parser';
import PostData from "@core/classes/post-data";
import type Path from "@core/classes/path";
import {read} from "@core/util/file-util";
import FileAlias from "@core/constant/file-alias";

export default function (filePath: Path): PostData {

    const content = read(filePath.value);

    const md = parse(content);
    const contentRegex = new RegExp("([\\s\\S]*?)<!--more-->\\n?([\\s\\S]*)", 'gm')

    const header = Object.assign({}, md.parsedYaml);
    header.date = header.date ? Date.parse(header.date) : 1999999999999;
    header.breadcrumbs = filePath.array.slice(0, filePath.array.length -1)
        .map(node => FileAlias.toNameIfAbsent(node));

    const body: Array<string> = contentRegex.exec(md.markdown) ?? ['', '',md.markdown];


    let path = '/unknown';
    if (header.layout === 'post') {
        path = filePath.realValue.replace('.md', '').toLowerCase();
    } else if (header.layout === 'wiki') {
        const paths = filePath.realValue.replace('.md', '').toLowerCase().split('/');
        path = `/wiki/${paths[paths.length -1]}`;
    }

    return new PostData(
        path,
        header,
        ((body?.length >= 1) ? body[1] : ''),
        ((body?.length) >= 2 ? body[2] : ''))
}
